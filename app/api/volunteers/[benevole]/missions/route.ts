import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateRouteParam, validateAirtableIds } from "@/lib/security"
import { tasks } from '@/lib/airtable/tasks'
import { volunteers } from '@/lib/airtable/volunteers'
import { DeadlineInfo, EnrichedMission } from '@/types/missions.interface'

// ✅ ADD CACHING
interface CacheEntry {
  data: EnrichedMission[]
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

function setCache(key: string, data: EnrichedMission[], ttl: number = 3 * 60 * 1000): void {
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
      logger.warn(`Invalid volunteer ID in missions route: ${resolvedParams.benevole}`, {
        adminEmail: token.email,
        error: validationError
      })
      return NextResponse.json(
        { error: "ID de bénévole invalide" },
        { status: 400, headers }
      )
    }

    // ✅ PERFORMANCE: Check cache first
    const cacheKey = `volunteer-missions-${volunteerId}`
    const cached = getFromCache(cacheKey)
    if (cached) {
      logger.info(`Cache hit for volunteer missions: ${volunteerId}`)
      return NextResponse.json(cached, { headers })
    }

    console.log('🆔 Fetching missions for volunteer ID:', volunteerId)

    // ✅ PERFORMANCE: Get volunteer data to extract mission IDs
    const volunteer = await volunteers.getById(volunteerId)

    if (!volunteer) {
      logger.warn(`Volunteer not found for missions: ${volunteerId}`, {
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: 'Bénévole non trouvé' },
        { status: 404, headers }
      )
    }

    // ✅ SECURITY: Extract and validate mission IDs from volunteer data
    const missionField = volunteer.fields.missions || volunteer.fields.tasks || volunteer.fields.assignedTasks || []
    const rawMissionIds = Array.isArray(missionField) ? missionField : missionField ? [missionField] : []

    console.log('📋 Mission IDs from volunteer:', rawMissionIds)

    // ✅ SECURITY: Filter out non-string IDs
    const stringIds = rawMissionIds.filter((id): id is string => typeof id === 'string')

    if (stringIds.length === 0) {
      console.log('📋 No missions found for volunteer')
      const result: EnrichedMission[] = []
      setCache(cacheKey, result, 5 * 60 * 1000) // Cache empty result for 5 minutes
      return NextResponse.json(result, { headers })
    }

    // ✅ SECURITY: Validate all mission IDs
    let validatedMissionIds: string[]
    try {
      validatedMissionIds = validateAirtableIds(stringIds)
    } catch (validationError) {
      logger.warn(`Invalid mission IDs for volunteer ${volunteerId}:`, {
        ids: stringIds,
        error: validationError,
        adminEmail: token.email
      })
      return NextResponse.json(
        { error: "IDs de mission invalides" },
        { status: 400, headers }
      )
    }

    console.log(`Volunteer has ${validatedMissionIds.length} valid mission IDs:`, validatedMissionIds)

    // ✅ PERFORMANCE: Get missions by IDs (targeted query)
    const missions = await tasks.getByIds(validatedMissionIds)
    console.log('📋 Missions found:', missions?.length || 0)

    if (!missions || missions.length === 0) {
      const result: EnrichedMission[] = []
      setCache(cacheKey, result, 3 * 60 * 1000)
      return NextResponse.json(result, { headers })
    }

    // ✅ ENHANCED: Enrich missions with calculated fields based on actual schema
    const enrichedMissions: EnrichedMission[] = missions.map(mission => {
      // ✅ TIMING: Calculate deadline timing
      const now = new Date()
      const deadline = mission.fields.daysUntilDeadline && typeof mission.fields.daysUntilDeadline === 'string'
        ? new Date(mission.fields.daysUntilDeadline)
        : null

      let deadlineInfo: DeadlineInfo | null = null
      if (deadline) {
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        const hoursUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60))

        deadlineInfo = {
          daysUntilDeadline,
          hoursUntilDeadline,
          isOverdue: daysUntilDeadline < 0,
          isDueToday: daysUntilDeadline === 0,
          isDueTomorrow: daysUntilDeadline === 1,
          isDueThisWeek: daysUntilDeadline <= 7 && daysUntilDeadline >= 0,
          isUrgent: daysUntilDeadline <= 2 && daysUntilDeadline >= 0
        }
      }

      // ✅ DATE RANGE: Calculate task duration if dateStart and dateEnd exist
      let durationInfo = null
      if (mission.fields.dateStart && mission.fields.dateEnd) {
        const startRaw = mission.fields.dateStart
        const endRaw = mission.fields.dateEnd
        const startDate = (typeof startRaw === 'string' || typeof startRaw === 'number' || startRaw instanceof Date) ? new Date(startRaw) : null
        const endDate = (typeof endRaw === 'string' || typeof endRaw === 'number' || endRaw instanceof Date) ? new Date(endRaw) : null

        let durationHours = null
        let durationDays = null

        if (startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
          durationDays = durationHours / 24
        }

        durationInfo = {
          startDate: mission.fields.dateStart,
          endDate: mission.fields.dateEnd,
          durationHours: durationHours !== null ? Math.round(durationHours * 100) / 100 : null,
          durationDays: durationDays !== null ? Math.round(durationDays * 100) / 100 : null,
          isActive: startDate && endDate ? (now >= startDate && now <= endDate) : false,
          hasStarted: startDate ? (now >= startDate) : false,
          hasEnded: endDate ? (now > endDate) : false
        }
      }

      return {
        // ...mission,
        id: mission.id,
        fields: mission.fields,
        createdAt: mission.createdAt || new Date().toISOString(), // ✅ Fixed: createdAt instead of createdTime
        enriched: {
          status: {
            current: typeof mission.fields.status === 'string' ? mission.fields.status : 'Non défini',
            priority: typeof mission.fields.priority === 'string' ? mission.fields.priority : 'normal',
            isCompleted: mission.fields.status === 'completed' || mission.fields.status === 'Terminé',
            isInProgress: mission.fields.status === 'in_progress' || mission.fields.status === 'En cours',
            isPending: mission.fields.status === 'pending' || mission.fields.status === 'En attente',
            isHigh: mission.fields.priority === 'high' || mission.fields.priority === 'Haute',
            isMedium: mission.fields.priority === 'medium' || mission.fields.priority === 'Moyenne'
          },
          timing: {
            deadline: deadlineInfo,
            duration: durationInfo
          },
          resources: {
            humanResources: typeof mission.fields.humanResources === 'number' ? mission.fields.humanResources : 0,
            assignedMembers: Array.isArray(mission.fields.assignedMembers)
              ? mission.fields.assignedMembers.length
              : 0,
            totalAssigned: typeof mission.fields.totalAssigned === 'number' ? mission.fields.totalAssigned : 0,
            hasAttachments: mission.fields.attachments &&
              Array.isArray(mission.fields.attachments) &&
              mission.fields.attachments.length > 0
          },
          location: {
            place: typeof mission.fields.place === 'string' ? mission.fields.place : 'Non spécifié'
          },
          progress: {
            estimatedDuration: mission.fields.duration || null,
            isResourceComplete: mission.fields.assignedMembers &&
              typeof mission.fields.humanResources === 'number' &&
              Array.isArray(mission.fields.assignedMembers) &&
              mission.fields.assignedMembers.length >= mission.fields.humanResources
          }
        }
      } as EnrichedMission
    })

    console.log(`Returning ${enrichedMissions.length} enriched missions`)

    // ✅ PERFORMANCE: Cache the result
    setCache(cacheKey, enrichedMissions, 3 * 60 * 1000) // Cache for 3 minutes

    logger.info(`Volunteer missions accessed by admin: ${token.email}`, {
      volunteerId,
      volunteerName: volunteer.fields.name || volunteer.fields.firstname,
      missionCount: enrichedMissions.length,
      cached: false
    })

    return NextResponse.json(enrichedMissions, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error('Error fetching volunteer missions', err)

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
      { error: 'Erreur lors de la récupération des missions' },
      { status: 500, headers }
    )
  }
}