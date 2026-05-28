import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateRouteParam, validateAirtableIds } from "@/lib/security"
import { affectations } from '@/lib/airtable/affectations'
import { volunteers } from '@/lib/airtable/volunteers'
import { timeslots } from '@/lib/airtable/timeslots'
import { sectors } from '@/lib/airtable/sectors'
import { EnrichedAssignment } from '@/types/affectation.interface'

// ✅ ADD CACHING
interface CacheEntry {
  data: EnrichedAssignment[]
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

function setCache(key: string, data: EnrichedAssignment[], ttl: number = 3 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) return error

    const resolvedParams = await params

    // ✅ SECURITY: Validate route parameter with centralized function
    let volunteerId: string
    try {
      volunteerId = validateRouteParam(resolvedParams.benevole)
    } catch (validationError) {
      logger.warn(`Invalid volunteer ID in route: ${resolvedParams.benevole}`, {
        adminEmail: token.email,
        error: validationError
      })
      return NextResponse.json(
        { error: "ID de bénévole invalide" },
        { status: 400, headers }
      )
    }

    // ✅ PERFORMANCE: Check cache first
    const cacheKey = `volunteer-assignments-${volunteerId}`
    const cached = getFromCache(cacheKey)
    if (cached) {
      logger.info(`Cache hit for volunteer assignments: ${volunteerId}`)
      return NextResponse.json(cached, { headers })
    }

    console.log('Fetching assignments for volunteer:', volunteerId)

    // ✅ PERFORMANCE: Get volunteer data
    const volunteer = await volunteers.getById(volunteerId)
    if (!volunteer) {
      return NextResponse.json(
        { error: 'Bénévole non trouvé' },
        { status: 404, headers }
      )
    }

    console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

    // ✅ SECURITY: Extract and validate assignment IDs
    const assignmentField = volunteer.fields.affectations || volunteer.fields.assignments || volunteer.fields.assignedTxands || []
    const rawAssignmentIds = Array.isArray(assignmentField) ? assignmentField : assignmentField ? [assignmentField] : []

    // ✅ SECURITY: Filter out non-string IDs
    const stringIds = rawAssignmentIds.filter((id): id is string => typeof id === 'string')

    if (stringIds.length === 0) {
      const result: EnrichedAssignment[] = []
      setCache(cacheKey, result, 5 * 60 * 1000) // Cache empty result for 5 minutes
      return NextResponse.json(result, { headers })
    }

    // ✅ SECURITY: Validate all assignment IDs
    let validatedAssignmentIds: string[]
    try {
      validatedAssignmentIds = validateAirtableIds(stringIds)
    } catch (validationError) {
      logger.warn(`Invalid assignment IDs for volunteer ${volunteerId}:`, {
        ids: stringIds,
        error: validationError,
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: "IDs d'affectation invalides" },
        { status: 400, headers }
      )
    }

    console.log(`Volunteer has ${validatedAssignmentIds.length} valid assignment IDs:`, validatedAssignmentIds)

    // ✅ PERFORMANCE: Get assignments by IDs (targeted query)
    const assignments = await affectations.getByIds(validatedAssignmentIds)
    console.log(`Found ${assignments.length} assignments for volunteer`)

    if (assignments.length === 0) {
      const result: EnrichedAssignment[] = []
      setCache(cacheKey, result, 3 * 60 * 1000)
      return NextResponse.json(result, { headers })
    }

    // ✅ PERFORMANCE: Extract only needed timeslot and sector IDs
    const neededTimeslotIds = new Set<string>()
    const neededSectorIds = new Set<string>()

    assignments.forEach(assignment => {
      // Extract timeslot IDs
      const txandField = assignment.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : txandField ? [txandField] : []

      timeslotIds.forEach(id => {
        if (typeof id === 'string') {
          try {
            const validId = validateAirtableIds([id])[0]
            neededTimeslotIds.add(validId)
          } catch (error) {
            logger.warn(`Invalid timeslot ID in assignment ${assignment.id}:`, { id, error })
          }
        }
      })

      // Extract sector IDs
      const poleField = assignment.fields.pole
      const sectorIds = Array.isArray(poleField) ? poleField : poleField ? [poleField] : []

      sectorIds.forEach(id => {
        if (typeof id === 'string') {
          try {
            const validId = validateAirtableIds([id])[0]
            neededSectorIds.add(validId)
          } catch (error) {
            logger.warn(`Invalid sector ID in assignment ${assignment.id}:`, { id, error })
          }
        }
      })
    })

    // ✅ PERFORMANCE: Fetch only needed data in parallel
    const [relevantTimeslots, relevantSectors, allAffectationsForCounting] = await Promise.all([
      neededTimeslotIds.size > 0 ? timeslots.getByIds(Array.from(neededTimeslotIds)) : [],
      neededSectorIds.size > 0 ? sectors.getByIds(Array.from(neededSectorIds)) : [],
      affectations.getAll() // Still needed for counting volunteers per timeslot
    ])

    console.log(`Fetched ${relevantTimeslots.length} timeslots and ${relevantSectors.length} sectors`)

    // ✅ PERFORMANCE: Create lookup maps for O(1) access
    const timeslotMap = new Map(relevantTimeslots.map(ts => [ts.id, ts]))
    const sectorMap = new Map(relevantSectors.map(s => [s.id, s]))

    // ✅ PERFORMANCE: Process assignments with optimized lookups
    const enrichedAssignments = assignments.map(assignment => {
      // ✅ Ensure createdAt is always a string
      const createdAt = assignment.fields.createdAt || new Date().toISOString()
      // ✅ PERFORMANCE: O(1) timeslot lookups
      const txandField = assignment.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : txandField ? [txandField] : []
      const assignedTimeslots = timeslotIds
        .map(id => typeof id === 'string' ? timeslotMap.get(id) : null)
        .filter(Boolean)

      // ✅ PERFORMANCE: O(1) sector lookup
      const poleField = assignment.fields.pole
      const sectorIds = Array.isArray(poleField) ? poleField : poleField ? [poleField] : []
      const sector = sectorIds[0] && typeof sectorIds[0] === 'string' ? sectorMap.get(sectorIds[0]) : null

      // ✅ PERFORMANCE: Calculate timing info for first timeslot
      const firstTimeslot = assignedTimeslots[0]
      let timingInfo = null

      if (firstTimeslot) {
        const now = new Date()
        const startDate = firstTimeslot.fields.dateStart && typeof firstTimeslot.fields.dateStart === 'string'
          ? new Date(firstTimeslot.fields.dateStart)
          : null

        const daysUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
        const hoursUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60)) : null

        timingInfo = {
          daysUntilStart,
          hoursUntilStart,
          isToday: daysUntilStart === 0,
          isTomorrow: daysUntilStart === 1,
          isThisWeek: daysUntilStart !== null && daysUntilStart <= 7 && daysUntilStart >= 0,
          isPast: daysUntilStart !== null && daysUntilStart < 0,
          isUpcoming: daysUntilStart !== null && daysUntilStart > 0
        }
      }

      // ✅ PERFORMANCE: Count other volunteers in same timeslots (optimized filter)
      const otherVolunteersCount = timeslotIds.reduce((count, timeslotId) => {
        if (typeof timeslotId !== 'string') return count

        const timeslotAffectations = allAffectationsForCounting.filter(aff => {
          const affTxand = aff.fields.txand
          if (Array.isArray(affTxand)) {
            return affTxand.includes(timeslotId)
          }
          return affTxand === timeslotId
        })
        return Math.max(count, timeslotAffectations.length)
      }, 0)

      return {
        ...assignment,
        // ✅ ENHANCED: Enriched data with better structure
        createdAt,
        enriched: {
          sector: {
            id: sector?.id,
            name: sector?.fields.name || 'Secteur non défini',
            description: sector?.fields.description,
            color: sector?.fields.color || '#10b981'
          },
          timeslots: {
            count: assignedTimeslots.length,
            list: assignedTimeslots.map(ts => ({
              id: ts?.id,
              name: ts?.fields?.name || `Créneau ${ts?.id?.slice(-6)}`,
              dateStart: ts?.fields?.dateStart,
              dateEnd: ts?.fields?.dateEnd,
              duration: ts?.fields?.duration
            })),
            next: firstTimeslot ? {
              name: firstTimeslot.fields.name || `Créneau ${firstTimeslot.id.slice(-6)}`,
              dateStart: firstTimeslot.fields.dateStart,
              dateEnd: firstTimeslot.fields.dateEnd
            } : null
          },
          timing: timingInfo,
          team: {
            totalVolunteers: otherVolunteersCount,
            isTeamWork: otherVolunteersCount > 1
          },
          priority: {
            level: assignment.fields.priority || 'normal',
            isHigh: assignment.fields.priority === 'high' || assignment.fields.priority === 'Haute',
            isMedium: assignment.fields.priority === 'medium' || assignment.fields.priority === 'Moyenne'
          }
        }
      } as EnrichedAssignment
    })

    console.log(`Returning ${enrichedAssignments.length} enriched assignments`)

    // ✅ PERFORMANCE: Cache the result
    setCache(cacheKey, enrichedAssignments, 3 * 60 * 1000) // Cache for 3 minutes

    logger.info(`Enriched volunteer assignments accessed by admin: ${token.email}`, {
      volunteerId,
      volunteerName: volunteer.fields.name || volunteer.fields.firstname,
      assignmentCount: enrichedAssignments.length,
      timeslotsCount: relevantTimeslots.length,
      sectorsCount: relevantSectors.length,
      cached: false
    })

    return NextResponse.json(enrichedAssignments, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error('Error fetching volunteer assignments', err)

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
      { error: 'Erreur lors de la récupération des affectations' },
      { status: 500, headers }
    )
  }
}