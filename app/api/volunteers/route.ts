import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateInput, validateQueryParams } from "@/lib/security"
import { volunteers } from "@/lib/airtable"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// ✅ FIXED: Define proper TypeScript interfaces
interface EnrichedVolunteer {
  id: string
  fields: Record<string, unknown>
  createdTime: string
  metadata: {
    accountAge: number | null
    isNewVolunteer: boolean
    isExperienced: boolean
    totalTasks: number
    hasActiveTasks: boolean
    profileCompleteness: number
    isProfileComplete: boolean
    displayName: string
    initials: string
    status: string
    isReferent: boolean
    contactMethods: string[]
  }
}

interface VolunteersListResponse {
  volunteers: EnrichedVolunteer[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
    startIndex: number
    endIndex: number
  }
  filters: {
    search: string
    status: string
    sortBy: string
    sortOrder: string
    includeInactive: boolean
  }
  summary: {
    activeVolunteers: number
    totalVolunteers: number
    referents: number
    newVolunteers: number
  }
}

interface AirtableQueryOptions {
  view: string
  maxRecords: number
  sort: Array<{
    field: string
    direction: 'asc' | 'desc'
  }>
  filterByFormula?: string
}

interface VolunteerCreateData {
  name?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  [key: string]: unknown
}

// ✅ FIXED: Proper typing for cache
interface CacheEntry {
  data: VolunteersListResponse  // ✅ Fixed: VolunteersListResponse instead of any
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry>()

function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null

  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }

  return entry.data as T
}

function setCache(key: string, data: VolunteersListResponse, ttl: number = 2 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

function clearVolunteersListCache(): void {
  // Clear all volunteers list cache entries
  const keysToDelete = Array.from(cache.keys()).filter(key =>
    key.startsWith('volunteers-list')
  )
  keysToDelete.forEach(key => cache.delete(key))
}

export async function GET(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    // ✅ Get session (no admin requirement)
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      logger.warn("Unauthorized access attempt to /api/volunteers")
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401, headers }
      )
    }

    // ✅ Check if user is referent or admin
    const isAdmin = session.user.role === 'admin'
    // const isReferent = session.user.isReferent || isAdmin
    const isReferent = session.user.isReferent || isAdmin // ✅ FIXED: Use isReferent directly from session

    if (!isAdmin && !isReferent) {
      logger.warn(`Non-admin and non-referent access attempt by: ${session.user.email}`, {
        isAdmin,
        isReferent: session.user.isReferent,
        role: session.user.role
      })
      return NextResponse.json(
        { error: "Referent access required" },
        { status: 403, headers }
      )
    }

    // ✅ Add debug logging
    console.log("🔍 Volunteers access:", {
      email: session.user.email,
      role: session.user.role,
      isReferent: session.user.isReferent,
      isAdmin,
      finalIsReferent: isReferent,
      accessGranted: isAdmin || isReferent
    })

    // ✅ PERFORMANCE: Parse and validate query parameters
    const { searchParams } = new URL(req.url)

    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit') || '50'))) // Max 100, min 10, default 50
    const search = searchParams.get('search')?.trim() || ''
    const status = searchParams.get('status') || 'all'
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc'
    const includeInactive = searchParams.get('includeInactive') === 'true'

    // ✅ SECURITY: Validate query parameters
    try {
      validateQueryParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status,
        sortBy,
        sortOrder
      })
    } catch (validationError) {
      logger.warn(`Invalid query parameters in volunteers list`, {
        adminEmail: session.user.email,
        params: { page, limit, search, status, sortBy, sortOrder },
        error: validationError
      })
      return NextResponse.json(
        { error: "Paramètres de requête invalides" },
        { status: 400, headers }
      )
    }

    // ✅ PERFORMANCE: Build cache key based on query params
    const cacheKey = `volunteers-list-${page}-${limit}-${search}-${status}-${sortBy}-${sortOrder}-${includeInactive}`
    const cached = getFromCache<VolunteersListResponse>(cacheKey)
    if (cached) {
      logger.info(`Cache hit for volunteers list`, {
        adminEmail: session.user.email,
        cacheKey: cacheKey.substring(0, 50) + '...'
      })
      return NextResponse.json(cached, { headers })
    }

    console.log(`📋 Fetching volunteers list - Page: ${page}, Limit: ${limit}, Search: "${search}", Status: ${status}`)

    // ✅ FIXED: Build smart Airtable query with proper typing
    const airtableOptions: AirtableQueryOptions = { // ✅ Fixed: AirtableQueryOptions instead of any
      view: "Grid view",
      maxRecords: 500, // Fetch more records for better filtering, but still reasonable
      sort: [
        {
          field: sortBy === 'name' ? 'name' :
            sortBy === 'email' ? 'email' :
              sortBy === 'created' ? 'created' :
                sortBy === 'status' ? 'status' : 'name',
          direction: sortOrder === 'desc' ? 'desc' : 'asc'
        }
      ]
    }

    // ✅ PERFORMANCE: Build smart filter formula
    const filterConditions: string[] = []

    // Status filtering
    if (!includeInactive) {
      filterConditions.push("AND({status} != 'Inactif', {status} != 'Supprimé')")
    }
    if (status !== 'all') {
      if (status === 'active') {
        filterConditions.push("OR({status} = 'Actif', {status} = '')")
      } else if (status === 'inactive') {
        filterConditions.push("{status} = 'Inactif'")
      } else if (status === 'referent') {
        filterConditions.push("OR({isReferent} = 1, {referent} = 1)")
      }
    }

    // Search filtering (if provided)
    if (search && search.length >= 2) {
      const sanitizedSearch = validateInput(search)
      if (sanitizedSearch) {
        filterConditions.push(
          `OR(SEARCH(LOWER("${sanitizedSearch}"), LOWER({name})), ` +
          `SEARCH(LOWER("${sanitizedSearch}"), LOWER({firstname})), ` +
          `SEARCH(LOWER("${sanitizedSearch}"), LOWER({lastname})), ` +
          `SEARCH(LOWER("${sanitizedSearch}"), LOWER({email})))`
        )
      }
    }

    // Combine filter conditions
    if (filterConditions.length > 0) {
      airtableOptions.filterByFormula = filterConditions.length === 1
        ? filterConditions[0]
        : `AND(${filterConditions.join(', ')})`
    }

    console.log('📋 Airtable query options:', {
      maxRecords: airtableOptions.maxRecords,
      filterByFormula: airtableOptions.filterByFormula,
      sort: airtableOptions.sort
    })

    // ✅ PERFORMANCE: Fetch volunteers with optimized query
    const allVolunteers = await volunteers.getAll(airtableOptions)

    console.log(`📋 Fetched ${allVolunteers.length} volunteers from Airtable`)

    // ✅ PERFORMANCE: Apply pagination on filtered results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedVolunteers = allVolunteers.slice(startIndex, endIndex)

    // ✅ ENHANCED: Enrich each volunteer with calculated metadata
    const now = new Date()
    const enrichedVolunteers: EnrichedVolunteer[] = paginatedVolunteers.map(volunteer => {
      // Calculate account age
      const createdTime = (volunteer.fields.createdAt && (typeof volunteer.fields.createdAt === 'string' || typeof volunteer.fields.createdAt === 'number' || volunteer.fields.createdAt instanceof Date))
        ? new Date(volunteer.fields.createdAt)
        : null
      const accountAge = createdTime
        ? Math.floor((now.getTime() - createdTime.getTime()) / (1000 * 60 * 60 * 24))
        : null

      // Calculate task counts
      const affectationsCount = volunteer.fields.assignedTxands
        ? Array.isArray(volunteer.fields.assignedTxands)
          ? volunteer.fields.assignedTxands.length
          : 1
        : 0

      const missionsSource = volunteer.fields.assignedTasks ?? volunteer.fields.tasks
      const missionsCount = missionsSource
        ? Array.isArray(missionsSource)
          ? missionsSource.length
          : 1
        : 0

      // Calculate profile completeness
      const hasName = !!(volunteer.fields.name || volunteer.fields.firstname)
      const hasLastName = !!(volunteer.fields.lastname || volunteer.fields.nom)
      const hasEmail = !!volunteer.fields.email
      const hasPhone = !!(volunteer.fields.phone || volunteer.fields.telephone)
      const hasBirthdate = !!(volunteer.fields.birthdate || volunteer.fields.dateNaissance)

      const profileCompleteness = [hasName, hasLastName, hasEmail, hasPhone, hasBirthdate].filter(Boolean).length / 5

      return {
        id: volunteer.id,
        fields: volunteer.fields,
        createdTime: volunteer.fields.createdAt as string, // Ensure createdAt is a string
        // ✅ ENHANCED: Add computed metadata for list view
        metadata: {
          accountAge,
          isNewVolunteer: accountAge !== null && accountAge <= 30,
          isExperienced: accountAge !== null && accountAge > 365,
          totalTasks: affectationsCount + missionsCount,
          hasActiveTasks: affectationsCount > 0 || missionsCount > 0,
          profileCompleteness: Math.round(profileCompleteness * 100),
          isProfileComplete: profileCompleteness >= 0.8,
          displayName: typeof volunteer.fields.name === 'string' ? volunteer.fields.name : (typeof volunteer.fields.firstname === 'string' ? volunteer.fields.firstname : 'Sans nom'),
          initials: String(volunteer.fields.name || volunteer.fields.firstname || 'SN').charAt(0).toUpperCase() +
            String(volunteer.fields.lastname || volunteer.fields.nom || 'SN').charAt(0).toUpperCase(),
          status: typeof volunteer.fields.status === 'string' ? volunteer.fields.status : 'Actif',
          isReferent: Boolean(volunteer.fields.isReferent || volunteer.fields.referent),
          contactMethods: [
            hasEmail && 'Email',
            hasPhone && 'Téléphone'
          ].filter((method): method is string => Boolean(method))
        }
      }
    })

    // ✅ PERFORMANCE: Build pagination metadata
    const totalCount = allVolunteers.length
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    const response: VolunteersListResponse = {
      volunteers: enrichedVolunteers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, totalCount)
      },
      filters: {
        search,
        status,
        sortBy,
        sortOrder,
        includeInactive
      },
      summary: {
        activeVolunteers: allVolunteers.filter(v =>
          v.fields.status !== 'Inactif' && v.fields.status !== 'Supprimé'
        ).length,
        totalVolunteers: allVolunteers.length,
        referents: allVolunteers.filter(v =>
          v.fields.isReferent || v.fields.referent
        ).length,
        newVolunteers: allVolunteers.filter(v => {
          const created = (typeof v.fields.createdAt === 'string' || typeof v.fields.createdAt === 'number' || v.fields.createdAt instanceof Date)
            ? new Date(v.fields.createdAt)
            : null
          const age = created ? Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)) : null
          return age !== null && age <= 30
        }).length
      }
    }

    console.log(`📋 Returning ${enrichedVolunteers.length} enriched volunteers (page ${page}/${totalPages})`)

    // ✅ PERFORMANCE: Cache the result (2 minutes for list data)
    setCache(cacheKey, response, 2 * 60 * 1000)

    logger.info(`Volunteers list accessed by admin: ${session.user.email}`, {
      page,
      limit,
      totalCount,
      returnedCount: enrichedVolunteers.length,
      searchTerm: search || 'none',
      status,
      cached: false
    })

    return NextResponse.json(response, { headers })

  } catch (err: unknown) {
    console.error("API Error in volunteers list:", err)
    logger.error("Error in /api/volunteers:", err)

    // ✅ SECURITY: Enhanced error handling
    if (err instanceof Error) {
      if (err.message.includes('Invalid') || err.message.includes('format')) {
        return NextResponse.json(
          { error: "Données invalides détectées" },
          { status: 400, headers }
        )
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la récupération des bénévoles" },
      { status: 500, headers }
    )
  }
}

export async function POST(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(req)
    if (error) {
      logger.warn("Unauthorized create attempt to /api/volunteers", {
        ip: req.headers.get('x-forwarded-for') || 'unknown'
      })
      return error
    }

    // ✅ SECURITY: Validate and sanitize request body
    let volunteerData: VolunteerCreateData // ✅ Fixed: VolunteerCreateData instead of any
    try {
      volunteerData = await req.json()
    } catch (parseError) {
      logger.warn(`Invalid JSON in volunteer creation`, {
        adminEmail: token.email,
        error: parseError
      })
      return NextResponse.json(
        { error: "Données JSON invalides" },
        { status: 400, headers }
      )
    }

    if (!volunteerData || typeof volunteerData !== 'object') {
      logger.warn(`Invalid volunteer data in creation`, {
        adminEmail: token.email,
        receivedType: typeof volunteerData
      })
      return NextResponse.json(
        { error: "Données de bénévole invalides" },
        { status: 400, headers }
      )
    }

    // ✅ SECURITY: Sanitize string fields to prevent injection
    const sanitizedFields = Object.keys(volunteerData).reduce((acc, key) => {
      const value = volunteerData[key]
      if (typeof value === 'string') {
        const sanitized = validateInput(value)
        if (sanitized !== null) {
          acc[key] = sanitized
        } else {
          logger.warn(`Rejected invalid input for field ${key} in volunteer creation`, {
            adminEmail: token.email
          })
        }
      } else {
        // Non-string values pass through (arrays, numbers, etc.)
        acc[key] = value
      }
      return acc
    }, {} as Record<string, unknown>) // ✅ Fixed: unknown instead of any

    // ✅ VALIDATION: Ensure required fields
    if (!sanitizedFields.email && !sanitizedFields.name && !sanitizedFields.firstname) {
      return NextResponse.json(
        { error: "Au moins un email ou nom est requis" },
        { status: 400, headers }
      )
    }

    console.log(`👤 Creating new volunteer with fields:`, Object.keys(sanitizedFields))

    // ✅ PERFORMANCE: Create volunteer with sanitized data
    const newVolunteer = await volunteers.createOne(sanitizedFields)

    // ✅ PERFORMANCE: Clear volunteers list cache
    clearVolunteersListCache()

    logger.info(`Volunteer created by admin: ${token.email}`, {
      volunteerId: newVolunteer.id,
      volunteerEmail: newVolunteer.fields.email,
      volunteerName: newVolunteer.fields.name || newVolunteer.fields.firstname,
      fieldCount: Object.keys(sanitizedFields).length
    })

    console.log(`✅ Successfully created volunteer: ${newVolunteer.fields.name || newVolunteer.fields.firstname}`)

    return NextResponse.json(newVolunteer, { status: 201, headers })

  } catch (err: unknown) {
    console.error("API Error in volunteer creation:", err)
    logger.error("Error creating volunteer:", err)

    // ✅ SECURITY: Enhanced error handling
    if (err instanceof Error) {
      if (err.message.includes('Invalid') || err.message.includes('format')) {
        return NextResponse.json(
          { error: "Données invalides détectées" },
          { status: 400, headers }
        )
      }
      if (err.message.includes('duplicate') || err.message.includes('unique')) {
        return NextResponse.json(
          { error: "Un bénévole avec ces données existe déjà" },
          { status: 409, headers }
        )
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du bénévole" },
      { status: 500, headers }
    )
  }
}