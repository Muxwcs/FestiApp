import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateRouteParam, validateInput } from "@/lib/security"
import { volunteers } from '@/lib/airtable/volunteers'

// ✅ FIXED: Add proper TypeScript interfaces
interface EnrichedVolunteer {
  id: string
  fields: Record<string, unknown>
  createdAt: string
  enriched: {
    profile: {
      completeness: number
      isComplete: boolean
      missingFields: string[]
    }
    contact: {
      completeness: number
      isComplete: boolean
      hasPhone: boolean
      hasEmail: boolean
      hasAddress: boolean
      methods: string[]
    }
    activity: {
      assignmentsCount: number
      missionsCount: number
      totalTasks: number
      isActive: boolean
      hasAssignments: boolean
      hasMissions: boolean
    }
    account: {
      ageInDays: number | null
      createdAt: unknown
      isNewVolunteer: boolean
      isExperienced: boolean
      lastModified: unknown
    }
    status: {
      current: string
      isActive: boolean
      isReferent: boolean
      role: string
      permissions: unknown[]
    }
    skills: {
      list: unknown
      count: number
      hasSkills: boolean
    }
    availability: {
      general: unknown
      preferences: unknown
      constraints: unknown
    }
  }
}

interface UpdateData {
  fields?: Record<string, unknown>
  [key: string]: unknown
}

// ✅ FIXED: Proper typing for cache
interface CacheEntry {
  data: EnrichedVolunteer  // ✅ Fixed: EnrichedVolunteer instead of any
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

function setCache(key: string, data: EnrichedVolunteer, ttl: number = 5 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

function clearVolunteerCache(volunteerId: string): void {
  // Clear all related cache entries when volunteer is updated/deleted
  const keysToDelete = Array.from(cache.keys()).filter(key =>
    key.includes(volunteerId) || key.startsWith('volunteers-list')
  )
  keysToDelete.forEach(key => cache.delete(key))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    // 🔐 Security check
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params

    // ✅ SECURITY: Validate route parameter with centralized function
    let volunteerId: string
    try {
      volunteerId = validateRouteParam(resolvedParams.benevole)
    } catch (validationError) {
      logger.warn(`Invalid volunteer ID in details route: ${resolvedParams.benevole}`, {
        adminEmail: token.email,
        error: validationError
      })
      return NextResponse.json(
        { error: "ID de bénévole invalide" },
        { status: 400, headers }
      )
    }

    // ✅ PERFORMANCE: Check cache first
    const cacheKey = `volunteer-details-${volunteerId}`
    const cached = getFromCache<EnrichedVolunteer>(cacheKey)
    if (cached) {
      logger.info(`Cache hit for volunteer details: ${volunteerId}`)
      return NextResponse.json(cached, { headers })
    }

    console.log('👤 Fetching volunteer details for ID:', volunteerId)

    // ✅ PERFORMANCE: Get volunteer data (single targeted query)
    const volunteer = await volunteers.getById(volunteerId)

    if (!volunteer) {
      logger.warn(`Volunteer not found: ${volunteerId}`, {
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: 'Bénévole non trouvé' },
        { status: 404, headers }
      )
    }

    console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

    // ✅ ENHANCED: Enrich volunteer data with calculated fields
    const now = new Date()

    // ✅ FIXED: Calculate account age with proper syntax
    const createdAtValue = volunteer.fields.createdAt
    const createdTime = (typeof createdAtValue === 'string' || typeof createdAtValue === 'number' || createdAtValue instanceof Date)
      ? new Date(createdAtValue)
      : null
    const accountAge = createdTime
      ? Math.floor((now.getTime() - createdTime.getTime()) / (1000 * 60 * 60 * 24))
      : null

    // Calculate assignment/mission counts
    const affectationsCount = volunteer.fields.assignedTxands
      ? Array.isArray(volunteer.fields.assignedTxands)
        ? volunteer.fields.assignedTxands.length
        : 1
      : 0

    const assignedTasks = volunteer.fields.assignedTasks
    const tasks = volunteer.fields.tasks
    const missionsSource = assignedTasks ?? tasks
    const missionsCount = missionsSource
      ? Array.isArray(missionsSource)
        ? missionsSource.length
        : 1
      : 0

    // Calculate contact info completeness
    const hasPhone = !!(volunteer.fields.phone || volunteer.fields.telephone)
    const hasEmail = !!volunteer.fields.email
    const hasAddress = !!(volunteer.fields.address || volunteer.fields.adresse)
    const contactCompleteness = [hasPhone, hasEmail, hasAddress].filter(Boolean).length / 3

    // Calculate profile completeness
    const hasName = !!(volunteer.fields.name || volunteer.fields.firstname)
    const hasLastName = !!(volunteer.fields.lastname || volunteer.fields.nom)
    const hasBirthdate = !!(volunteer.fields.birthdate || volunteer.fields.dateNaissance)
    const hasEmergencyContact = !!(volunteer.fields.emergencyContact || volunteer.fields.contactUrgence)
    const profileCompleteness = [hasName, hasLastName, hasEmail, hasBirthdate, hasEmergencyContact].filter(Boolean).length / 5

    // ✅ FIXED: Build enriched response with proper structure
    const enrichedVolunteer: EnrichedVolunteer = {
      id: volunteer.id,
      fields: volunteer.fields,
      createdAt: typeof volunteer.fields.createdAt === 'string'
        ? volunteer.fields.createdAt
        : (volunteer.fields.createdAt instanceof Date
          ? volunteer.fields.createdAt.toISOString()
          : new Date().toISOString()), // ✅ Fixed: Use createdTime as fallback
      // ✅ ENHANCED: Enriched data with calculations
      enriched: {
        profile: {
          completeness: Math.round(profileCompleteness * 100),
          isComplete: profileCompleteness >= 0.8, // 80% threshold
          missingFields: [
            !hasName && 'Prénom',
            !hasLastName && 'Nom',
            !hasEmail && 'Email',
            !hasBirthdate && 'Date de naissance',
            !hasEmergencyContact && 'Contact d\'urgence'
          ].filter((field): field is string => Boolean(field))
        },
        contact: {
          completeness: Math.round(contactCompleteness * 100),
          isComplete: contactCompleteness >= 0.67, // 2/3 threshold
          hasPhone,
          hasEmail,
          hasAddress,
          methods: [
            hasEmail && 'Email',
            hasPhone && 'Téléphone',
            hasAddress && 'Adresse'
          ].filter((method): method is string => Boolean(method))
        },
        activity: {
          assignmentsCount: affectationsCount,
          missionsCount: missionsCount,
          totalTasks: affectationsCount + missionsCount,
          isActive: affectationsCount > 0 || missionsCount > 0,
          hasAssignments: affectationsCount > 0,
          hasMissions: missionsCount > 0
        },
        account: {
          ageInDays: accountAge,
          createdAt: volunteer.fields.createdAt,
          isNewVolunteer: accountAge !== null && accountAge <= 30, // Less than 30 days
          isExperienced: accountAge !== null && accountAge > 365, // More than 1 year
          lastModified: volunteer.fields.lastModified || volunteer.fields.createdAt
        },
        status: {
          current: typeof volunteer.fields.status === 'string' ? volunteer.fields.status : 'Actif',
          isActive: volunteer.fields.status !== 'Inactif' && volunteer.fields.status !== 'Supprimé',
          isReferent: Boolean(volunteer.fields.isReferent || volunteer.fields.referent),
          role: typeof volunteer.fields.role === 'string' ? volunteer.fields.role : 'Bénévole',
          permissions: Array.isArray(volunteer.fields.permissions) ? volunteer.fields.permissions : []
        },
        skills: {
          list: volunteer.fields.skills || volunteer.fields.competences || [],
          count: Array.isArray(volunteer.fields.skills)
            ? volunteer.fields.skills.length
            : Array.isArray(volunteer.fields.competences)
              ? volunteer.fields.competences.length
              : 0,
          hasSkills: !!(volunteer.fields.skills || volunteer.fields.competences)
        },
        availability: {
          general: volunteer.fields.availability || volunteer.fields.disponibilite,
          preferences: volunteer.fields.preferences || volunteer.fields.preferencesTaches,
          constraints: volunteer.fields.constraints || volunteer.fields.contraintes
        }
      }
    }

    console.log(`Returning enriched volunteer details for: ${volunteer.fields.name || volunteer.fields.firstname}`)

    // ✅ PERFORMANCE: Cache the result (5 minutes for profile data)
    setCache(cacheKey, enrichedVolunteer, 5 * 60 * 1000)

    logger.info(`Volunteer details accessed by admin: ${token.email}`, {
      volunteerId,
      volunteerEmail: volunteer.fields.email,
      volunteerName: volunteer.fields.name || volunteer.fields.firstname,
      profileCompleteness: Math.round(profileCompleteness * 100),
      totalTasks: affectationsCount + missionsCount,
      cached: false
    })

    return NextResponse.json(enrichedVolunteer, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error('Error fetching volunteer details', err)

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
      { error: 'Erreur lors de la récupération des détails du bénévole' },
      { status: 500, headers }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    // 🔐 Security check
    const { token, error } = await requireAdmin(request)
    if (error) {
      logger.warn("Unauthorized volunteer update attempt", {
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      })
      return error
    }

    const resolvedParams = await params

    // ✅ SECURITY: Validate route parameter
    let volunteerId: string
    try {
      volunteerId = validateRouteParam(resolvedParams.benevole)
    } catch (validationError) {
      logger.warn(`Invalid volunteer ID in update route: ${resolvedParams.benevole}`, {
        adminEmail: token.email,
        error: validationError
      })
      return NextResponse.json(
        { error: "ID de bénévole invalide" },
        { status: 400, headers }
      )
    }

    // ✅ SECURITY: Validate and sanitize request body
    let updateData: UpdateData // ✅ Fixed: UpdateData instead of any
    try {
      updateData = await request.json()
    } catch (parseError) {
      logger.warn(`Invalid JSON in volunteer update: ${volunteerId}`, {
        adminEmail: token.email,
        error: parseError
      })
      return NextResponse.json(
        { error: "Données JSON invalides" },
        { status: 400, headers }
      )
    }

    // ✅ SECURITY: Extract and validate fields data
    const fieldsData = updateData.fields || updateData

    if (!fieldsData || typeof fieldsData !== 'object') {
      logger.warn(`Invalid fields data in volunteer update: ${volunteerId}`, {
        adminEmail: token.email,
        receivedType: typeof fieldsData
      })
      return NextResponse.json(
        { error: "Données de champs invalides" },
        { status: 400, headers }
      )
    }

    // ✅ SECURITY: Sanitize string fields to prevent injection
    const sanitizedFields = Object.keys(fieldsData).reduce((acc, key) => {
      const value = fieldsData[key]
      if (typeof value === 'string') {
        const sanitized = validateInput(value)
        if (sanitized !== null) {
          acc[key] = sanitized
        } else {
          logger.warn(`Rejected invalid input for field ${key}`, {
            adminEmail: token.email,
            volunteerId
          })
        }
      } else {
        // Non-string values pass through (arrays, numbers, etc.)
        acc[key] = value
      }
      return acc
    }, {} as Record<string, unknown>) // ✅ Fixed: unknown instead of any

    console.log(`🔄 Updating volunteer ${volunteerId} with fields:`, Object.keys(sanitizedFields))

    // ✅ PERFORMANCE: Update volunteer with sanitized data
    const updatedVolunteer = await volunteers.updateOne(volunteerId, sanitizedFields)

    if (!updatedVolunteer) {
      logger.warn(`Volunteer not found for update: ${volunteerId}`, {
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: 'Bénévole non trouvé' },
        { status: 404, headers }
      )
    }

    // ✅ PERFORMANCE: Clear related cache entries
    clearVolunteerCache(volunteerId)

    logger.info(`Volunteer updated by admin: ${token.email}`, {
      volunteerId,
      volunteerEmail: updatedVolunteer.fields.email,
      updatedFields: Object.keys(sanitizedFields),
      fieldCount: Object.keys(sanitizedFields).length
    })

    console.log(`✅ Successfully updated volunteer: ${updatedVolunteer.fields.name || updatedVolunteer.fields.firstname}`)

    return NextResponse.json(updatedVolunteer, { headers })

  } catch (err: unknown) {
    console.error("API Error in volunteer update:", err)
    logger.error("Error updating volunteer", err)

    // ✅ SECURITY: Enhanced error handling
    if (err instanceof Error) {
      if (err.message.includes('Invalid') || err.message.includes('format')) {
        return NextResponse.json(
          { error: "Données invalides détectées" },
          { status: 400, headers }
        )
      }
      if (err.message.includes('not found')) {
        return NextResponse.json(
          { error: "Bénévole non trouvé" },
          { status: 404, headers }
        )
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du bénévole" },
      { status: 500, headers }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    // 🔐 Security check
    const { token, error } = await requireAdmin(request)
    if (error) {
      logger.warn("Unauthorized volunteer deletion attempt", {
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      })
      return error
    }

    const resolvedParams = await params

    // ✅ SECURITY: Validate route parameter
    let volunteerId: string
    try {
      volunteerId = validateRouteParam(resolvedParams.benevole)
    } catch (validationError) {
      logger.warn(`Invalid volunteer ID in delete route: ${resolvedParams.benevole}`, {
        adminEmail: token.email,
        error: validationError
      })
      return NextResponse.json(
        { error: "ID de bénévole invalide" },
        { status: 400, headers }
      )
    }

    console.log(`🗑️ Deleting volunteer: ${volunteerId}`)

    // ✅ SECURITY: Get volunteer data first for audit logging
    const volunteerToDelete = await volunteers.getById(volunteerId)

    if (!volunteerToDelete) {
      logger.warn(`Volunteer not found for deletion: ${volunteerId}`, {
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: 'Bénévole non trouvé' },
        { status: 404, headers }
      )
    }

    // ✅ PERFORMANCE: Delete volunteer
    await volunteers.deleteOne(volunteerId)

    // ✅ PERFORMANCE: Clear related cache entries
    clearVolunteerCache(volunteerId)

    // ✅ SECURITY: Comprehensive audit logging for deletion
    logger.warn(`Volunteer deleted by admin: ${token.email}`, {
      volunteerId,
      deletedVolunteerEmail: volunteerToDelete.fields.email,
      deletedVolunteerName: volunteerToDelete.fields.name || volunteerToDelete.fields.firstname,
      timestamp: new Date().toISOString(),
      adminIP: request.headers.get('x-forwarded-for') || 'unknown'
    })

    console.log(`🗑️ Successfully deleted volunteer: ${volunteerToDelete.fields.name || volunteerToDelete.fields.firstname}`)

    return NextResponse.json(
      {
        message: "Bénévole supprimé avec succès",
        deletedId: volunteerId
      },
      { headers }
    )

  } catch (err: unknown) {
    console.error("API Error in volunteer deletion:", err)
    logger.error("Error deleting volunteer", err)

    // ✅ SECURITY: Enhanced error handling
    if (err instanceof Error) {
      if (err.message.includes('Invalid') || err.message.includes('format')) {
        return NextResponse.json(
          { error: "Données invalides détectées" },
          { status: 400, headers }
        )
      }
      if (err.message.includes('not found')) {
        return NextResponse.json(
          { error: "Bénévole non trouvé" },
          { status: 404, headers }
        )
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la suppression du bénévole" },
      { status: 500, headers }
    )
  }
}