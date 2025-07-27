import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { affectations } from '@/lib/airtable/affectations'
import { volunteers } from '@/lib/airtable/volunteers'
import { timeslots } from '@/lib/airtable/timeslots' // Add timeslots
import { sectors } from '@/lib/airtable/sectors' // Add sectors

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) return error

    const resolvedParams = await params
    const volunteerId = resolvedParams.benevole

    if (!volunteerId) {
      return NextResponse.json(
        { error: "Volunteer ID is required" },
        { status: 400, headers }
      )
    }

    // Get volunteer data
    const volunteer = await volunteers.getById(volunteerId)
    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404, headers }
      )
    }

    // Extract assignment IDs
    const assignmentIds = volunteer.fields.affectations || volunteer.fields.assignments || volunteer.fields.assignedTxands || []

    if (!Array.isArray(assignmentIds) || assignmentIds.length === 0) {
      return NextResponse.json([], { headers })
    }

    // Get assignments by IDs
    const assignments = await affectations.getByIds(assignmentIds)

    // 🌟 ENRICH ASSIGNMENTS WITH ADDITIONAL DATA
    const allTimeslots = await timeslots.getAll()
    const allSectors = await sectors.getAll()
    const allAffectations = await affectations.getAll()

    const enrichedAssignments = await Promise.all(assignments.map(async (assignment) => {
      // Get timeslot information
      const txandField = assignment.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : txandField ? [txandField] : []
      const assignedTimeslots = timeslotIds.map(id => allTimeslots.find(ts => ts.id === id)).filter(Boolean)

      // Get sector information  
      const poleField = assignment.fields.pole
      const sectorIds = Array.isArray(poleField) ? poleField : poleField ? [poleField] : []
      const sector = sectorIds[0] ? allSectors.find(s => s.id === sectorIds[0]) : null

      // Calculate timing info for first timeslot
      const firstTimeslot = assignedTimeslots[0]
      let timingInfo = null

      if (firstTimeslot) {
        const now = new Date()
        const startDate = (typeof firstTimeslot.fields.dateStart === 'string' || typeof firstTimeslot.fields.dateStart === 'number' || firstTimeslot.fields.dateStart instanceof Date)
          ? new Date(firstTimeslot.fields.dateStart)
          : null
        // const endDate = (typeof firstTimeslot.fields.dateEnd === 'string' || typeof firstTimeslot.fields.dateEnd === 'number' || firstTimeslot.fields.dateEnd instanceof Date)
        //   ? new Date(firstTimeslot.fields.dateEnd)
        //   : null

        const daysUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
        const hoursUntilStart = startDate ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60)) : null

        timingInfo = {
          daysUntilStart,
          hoursUntilStart,
          isToday: daysUntilStart === 0,
          isTomorrow: daysUntilStart === 1,
          isThisWeek: daysUntilStart !== null && daysUntilStart <= 7 && daysUntilStart >= 0
        }
      }

      // Count other volunteers in same timeslots
      const otherVolunteersCount = timeslotIds.reduce((count, timeslotId) => {
        const timeslotAffectations = allAffectations.filter(aff => {
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
        // Enriched data
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
      }
    }))

    logger.info(`Enriched volunteer assignments accessed by admin: ${token.email}`, {
      volunteerId,
      assignmentCount: enrichedAssignments.length
    })

    return NextResponse.json(enrichedAssignments, { headers })
  } catch (err: unknown) {
    logger.error('Error fetching volunteer assignments', err)
    return NextResponse.json(
      { error: 'Failed to fetch assignments', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500, headers }
    )
  }
}