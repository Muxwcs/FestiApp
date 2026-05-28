import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateEmail, validateAirtableIds } from "@/lib/security"
import { volunteers, affectations, timeslots, sectors } from "@/lib/airtable"
import { TimeslotsResult } from "@/types/timeslot.interface"

// ✅ ADD CACHING
interface CacheEntry {
  data: TimeslotsResult
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

function setCache(key: string, data: TimeslotsResult, ttl: number = 2 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

export async function GET() {
  const headers = createSecureHeaders()

  try {
    // ✅ SECURITY: Enhanced session validation
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      logger.warn("Unauthorized timeslots access attempt")
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401, headers }
      )
    }

    const userEmail = session.user.email.toLowerCase()

    // ✅ SECURITY: Validate email format using centralized security function
    if (!validateEmail(userEmail)) {
      logger.warn(`Invalid email format: ${userEmail}`)
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400, headers }
      )
    }

    // ✅ PERFORMANCE: Check cache first
    const cacheKey = `my-timeslots-${userEmail}`
    const cached = getFromCache(cacheKey)
    if (cached) {
      logger.info(`Cache hit for user timeslots: ${userEmail}`)
      return NextResponse.json(cached, { headers })
    }

    console.log('Fetching timeslots for user:', userEmail)

    // ✅ PERFORMANCE: Use targeted query instead of getAll()
    const volunteer = await volunteers.getByEmail(userEmail)

    if (!volunteer) {
      logger.info(`No volunteer record found for email: ${userEmail}`)
      const result = {
        timeslots: [],
        message: "Aucun profil bénévole trouvé"
      }
      setCache(cacheKey, result, 5 * 60 * 1000) // Cache 5 minutes
      return NextResponse.json(result, { headers })
    }

    console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

    // ✅ SECURITY: Get affectation IDs from volunteer record with validation
    const affectationField = volunteer.fields.affectations || volunteer.fields.assignedTxands || []
    const rawAffectationIds = Array.isArray(affectationField) ? affectationField : affectationField ? [affectationField] : []

    // ✅ SECURITY: Filter out non-string IDs and validate Airtable ID format
    const stringIds = rawAffectationIds.filter((id): id is string => typeof id === 'string')

    if (stringIds.length === 0) {
      const result = {
        timeslots: [],
        message: "Aucun créneau assigné"
      }
      setCache(cacheKey, result, 2 * 60 * 1000)
      return NextResponse.json(result, { headers })
    }

    // ✅ SECURITY: Validate all affectation IDs using centralized security function
    let validatedAffectationIds: string[]
    try {
      validatedAffectationIds = validateAirtableIds(stringIds)
    } catch (error) {
      logger.warn(`Invalid affectation IDs for user ${userEmail}:`, { ids: stringIds, error })
      return NextResponse.json(
        { error: "IDs d'affectation invalides" },
        { status: 400, headers }
      )
    }

    console.log(`Volunteer has ${validatedAffectationIds.length} valid affectation IDs:`, validatedAffectationIds)

    // ✅ PERFORMANCE: Use targeted query with validated affectation IDs
    const volunteerAffectations = await affectations.getByIds(validatedAffectationIds)
    console.log(`Found ${volunteerAffectations.length} affectations for volunteer`)

    if (volunteerAffectations.length === 0) {
      const result: TimeslotsResult = {
        timeslots: [],
        message: "Aucune affectation trouvée"
      }
      setCache(cacheKey, result, 2 * 60 * 1000)
      return NextResponse.json(result, { headers })
    }

    // ✅ PERFORMANCE: Extract only needed timeslot IDs with security validation
    const neededTimeslotIds = new Set<string>()

    volunteerAffectations.forEach(affectation => {
      const txandField = affectation.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : txandField ? [txandField] : []

      timeslotIds.forEach(id => {
        if (typeof id === 'string') {
          // ✅ SECURITY: Validate each timeslot ID format
          try {
            const validId = validateAirtableIds([id])[0]
            neededTimeslotIds.add(validId)
          } catch (error) {
            logger.warn(`Invalid timeslot ID in affectation ${affectation.id}:`, { id, error })
            // Skip invalid IDs instead of failing the entire request
          }
        }
      })
    })

    if (neededTimeslotIds.size === 0) {
      const result: TimeslotsResult = {
        timeslots: [],
        message: "Aucun créneau valide trouvé"
      }
      setCache(cacheKey, result, 2 * 60 * 1000)
      return NextResponse.json(result, { headers })
    }

    // ✅ PERFORMANCE: Fetch only needed timeslots in parallel
    const [relevantTimeslots, allAffectationsForCounting] = await Promise.all([
      timeslots.getByIds(Array.from(neededTimeslotIds)),
      affectations.getAll() // Still needed for counting volunteers per timeslot
    ])

    // ✅ PERFORMANCE: Extract sector IDs from fetched timeslots with security validation
    const neededSectorIds = new Set<string>()

    relevantTimeslots.forEach(timeslot => {
      const sectorField = timeslot.fields.sector
      const sectorIds = Array.isArray(sectorField) ? sectorField : sectorField ? [sectorField] : []

      sectorIds.forEach(id => {
        if (typeof id === 'string') {
          // ✅ SECURITY: Validate each sector ID format
          try {
            const validId = validateAirtableIds([id])[0]
            neededSectorIds.add(validId)
          } catch (error) {
            logger.warn(`Invalid sector ID in timeslot ${timeslot.id}:`, { id, error })
            // Skip invalid IDs instead of failing the entire request
          }
        }
      })
    })

    // ✅ PERFORMANCE: Fetch only needed sectors
    const relevantSectors = neededSectorIds.size > 0
      ? await sectors.getByIds(Array.from(neededSectorIds))
      : []

    // ✅ PERFORMANCE: Create lookup maps for O(1) access
    const timeslotMap = new Map(relevantTimeslots.map(ts => [ts.id, ts]))
    const sectorMap = new Map(relevantSectors.map(s => [s.id, s]))

    // ✅ PERFORMANCE: Process affectations with optimized lookups
    const enrichedTimeslots = []

    for (const affectation of volunteerAffectations) {
      const txandField = affectation.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : txandField ? [txandField] : []

      for (const timeslotId of timeslotIds) {
        if (typeof timeslotId !== 'string') continue

        // ✅ PERFORMANCE: O(1) lookup instead of array.find()
        const timeslot = timeslotMap.get(timeslotId)
        if (!timeslot) continue

        // ✅ PERFORMANCE: O(1) sector lookup
        const sectorField = timeslot.fields.sector
        const sectorIds = Array.isArray(sectorField) ? sectorField : sectorField ? [sectorField] : []
        const sector = sectorIds[0] ? sectorMap.get(sectorIds[0]) : null

        // ✅ PERFORMANCE: Count volunteers for this timeslot
        const timeslotAffectations = allAffectationsForCounting.filter(aff => {
          const affTxand = aff.fields.txand
          if (Array.isArray(affTxand)) {
            return affTxand.includes(timeslotId)
          }
          return affTxand === timeslotId
        })

        // ✅ SECURITY: Safe date creation with proper validation
        const now = new Date()
        const startDate = timeslot.fields.dateStart && typeof timeslot.fields.dateStart === 'string'
          ? new Date(timeslot.fields.dateStart)
          : null
        // const endDate = timeslot.fields.dateEnd && typeof timeslot.fields.dateEnd === 'string'
        //   ? new Date(timeslot.fields.dateEnd)
        //   : null

        const daysUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
        const hoursUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60)) : null

        enrichedTimeslots.push({
          id: timeslot.id,
          name: typeof timeslot.fields.name === 'string' ? timeslot.fields.name : `Créneau ${timeslot.id.slice(-6)}`,
          dateStart: typeof timeslot.fields.dateStart === 'string' ? timeslot.fields.dateStart : undefined,
          dateEnd: typeof timeslot.fields.dateEnd === 'string' ? timeslot.fields.dateEnd : undefined,
          sectorName: typeof sector?.fields.name === 'string' ? sector.fields.name : 'Secteur inconnu',
          sectorDescription: typeof sector?.fields.description === 'string' ? sector.fields.description : 'Aucune description',
          sectorColor: typeof sector?.fields.color === 'string' ? sector.fields.color : '#6366f1',
          status: typeof affectation.fields.status === 'string' ? affectation.fields.status : 'Non défini',
          role: affectation.fields.role,
          totalVolunteers: timeslot.fields.totalVolunteers,
          currentVolunteers: timeslotAffectations.length,
          affectationId: affectation.id,
          // ✅ ADD TIMING ENRICHMENT
          timing: {
            daysUntilStart,
            hoursUntilStart,
            isToday: daysUntilStart === 0,
            isTomorrow: daysUntilStart === 1,
            isThisWeek: daysUntilStart !== null && daysUntilStart <= 7 && daysUntilStart >= 0,
            isPast: daysUntilStart !== null && daysUntilStart < 0,
            isUpcoming: daysUntilStart !== null && daysUntilStart > 0
          }
        })
      }
    }

    // ✅ PERFORMANCE: Enhanced sorting with null safety
    enrichedTimeslots.sort((a, b) => {
      if (!a.dateStart) return 1
      if (!b.dateStart) return -1
      const aDate = typeof a.dateStart === 'string' || typeof a.dateStart === 'number' ? new Date(a.dateStart).getTime() : 0
      const bDate = typeof b.dateStart === 'string' || typeof b.dateStart === 'number' ? new Date(b.dateStart).getTime() : 0
      return aDate - bDate
    })

    console.log(`Returning ${enrichedTimeslots.length} enriched timeslots`)

    const result = {
      timeslots: enrichedTimeslots,
      volunteer: {
        id: volunteer.id,
        name: volunteer.fields.name as string || volunteer.fields.firstname as string,
        email: volunteer.fields.email
      },
      // ✅ SECURITY: Add debug info only in development
      ...(process.env.NODE_ENV === 'development' && {
        debug: {
          affectationIdsFound: validatedAffectationIds.length,
          timeslotsFound: relevantTimeslots.length,
          sectorsFound: relevantSectors.length,
          cacheHit: false
        }
      })
    }

    // ✅ PERFORMANCE: Cache the result
    setCache(cacheKey, result, 2 * 60 * 1000) // Cache for 2 minutes

    logger.info(`User timeslots retrieved: ${userEmail}`, {
      volunteerName: volunteer.fields.name || volunteer.fields.firstname,
      timeslotCount: enrichedTimeslots.length,
      cached: false,
      validatedIds: validatedAffectationIds.length
    })

    return NextResponse.json(result, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error("Error fetching user timeslots", err)

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
      { error: "Erreur interne du serveur" },
      { status: 500, headers }
    )
  }
}