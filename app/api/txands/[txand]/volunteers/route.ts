import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors, volunteers, affectations, timeslots } from "@/lib/airtable"
import { TimeslotDetails } from "@/components/volunteers/type"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.txand

    if (!sectorId) {
      return NextResponse.json(
        { error: "Sector ID is required" },
        { status: 400, headers }
      )
    }

    // Get the sector first to verify it exists
    const sector = await sectors.getById(sectorId)
    if (!sector) {
      logger.warn(`Sector not found: ${sectorId}`)
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404, headers }
      )
    }

    console.log('Looking for sector ID:', sectorId)
    console.log('Sector name:', sector.fields.name)

    // Log the access
    logger.info(`Sector volunteers accessed by admin: ${token.email}`, {
      sectorId,
      sectorName: sector.fields.name
    })

    // 1. Get ALL timeslots that belong to this specific sector using direct filtering
    const allTimeslots = await timeslots.getAll()
    const sectorTimeslots = allTimeslots.filter(timeslot => {
      const timeslotSectors = timeslot.fields.sector

      if (Array.isArray(timeslotSectors)) {
        return timeslotSectors.includes(sectorId)
      } else if (typeof timeslotSectors === 'string') {
        return timeslotSectors === sectorId
      }

      return false
    })

    console.log(`All sector timeslots for ${sectorId}:`, sectorTimeslots.length)
    console.log('Sector timeslot names:', sectorTimeslots.map(ts => ts.fields.name))

    if (sectorTimeslots.length === 0) {
      logger.info(`No timeslots found for sector: ${sectorId}`)
      return NextResponse.json({
        volunteers: [],
        timeslots: {},
        allSectorTimeslots: {},
        totalTimeslots: 0
      }, { headers })
    }

    // 2. Get all affectations and filter by sector's timeslots
    const allAffectations = await affectations.getAll()
    const sectorTimeslotIds = sectorTimeslots.map(ts => ts.id)

    // Filter affectations that use this sector's timeslots
    const sectorAffectations = allAffectations.filter(affectation => {
      const txandField = affectation.fields.txand

      if (Array.isArray(txandField)) {
        // Check if any of the affectation's timeslots belong to our sector
        return txandField.some(timeslotId => sectorTimeslotIds.includes(timeslotId))
      } else if (typeof txandField === 'string') {
        // Single timeslot reference
        return sectorTimeslotIds.includes(txandField)
      }

      return false
    })

    console.log(`Found ${sectorAffectations.length} affectations for sector timeslots`)

    if (sectorAffectations.length === 0) {
      // No affectations, but still return all sector timeslots for display
      const allSectorTimeslotsMap = new Map<string, string>()
      sectorTimeslots.forEach(timeslot => {
        const name = typeof timeslot.fields.name === "string" && timeslot.fields.name.trim()
          ? timeslot.fields.name
          : `Créneau ${timeslot.id.slice(-6)}`
        allSectorTimeslotsMap.set(timeslot.id, name as string)
      })

      logger.info(`No affectations found for sector: ${sectorId}, returning empty volunteers list`)
      return NextResponse.json({
        volunteers: [],
        timeslots: {},
        allSectorTimeslots: Object.fromEntries(allSectorTimeslotsMap),
        totalTimeslots: sectorTimeslots.length
      }, { headers })
    }

    // 3. Create timeslot maps with full details
    const timeslotMap = new Map<string, TimeslotDetails>()
    const allSectorTimeslotsMap = new Map<string, TimeslotDetails>()

    // Map all sector timeslots (for empty display) with full details
    sectorTimeslots.forEach(timeslot => {
      const details: TimeslotDetails = {
        id: timeslot.id,
        name: typeof timeslot.fields.name === "string" && timeslot.fields.name.trim()
          ? timeslot.fields.name
          : `Créneau ${timeslot.id.slice(-6)}`,
        dateStart: typeof timeslot.fields.dateStart === "string" ? timeslot.fields.dateStart : undefined,
        dateEnd: typeof timeslot.fields.dateEnd === "string" ? timeslot.fields.dateEnd : undefined,
        totalVolunteers: typeof timeslot.fields.totalVolunteers === "number" ? timeslot.fields.totalVolunteers : undefined
      }
      allSectorTimeslotsMap.set(timeslot.id, details)
    })

    // Map timeslots that have affectations with full details
    const timeslotsWithAffectations = new Set<string>()
    sectorAffectations.forEach(affectation => {
      const txandField = affectation.fields.txand

      if (Array.isArray(txandField)) {
        txandField.forEach(timeslotId => {
          if (sectorTimeslotIds.includes(timeslotId)) {
            timeslotsWithAffectations.add(timeslotId)
          }
        })
      } else if (typeof txandField === 'string' && sectorTimeslotIds.includes(txandField)) {
        timeslotsWithAffectations.add(txandField)
      }
    })

    // Add timeslots with affectations to the map
    timeslotsWithAffectations.forEach(timeslotId => {
      const timeslot = sectorTimeslots.find(ts => ts.id === timeslotId)
      if (timeslot) {
        const details: TimeslotDetails = {
          id: timeslot.id,
          name: typeof timeslot.fields.name === "string" && timeslot.fields.name.trim()
            ? timeslot.fields.name
            : `Créneau ${timeslotId.slice(-6)}`,
          dateStart: typeof timeslot.fields.dateStart === "string" ? timeslot.fields.dateStart : undefined,
          dateEnd: typeof timeslot.fields.dateEnd === "string" ? timeslot.fields.dateEnd : undefined,
          totalVolunteers: typeof timeslot.fields.totalVolunteers === "number" ? timeslot.fields.totalVolunteers : undefined
        }
        timeslotMap.set(timeslotId, details)
      }
    })

    console.log(`Timeslots with affectations: ${timeslotMap.size}`)

    // 4. Extract unique volunteer IDs from sector affectations
    const volunteerIds = new Set<string>()
    sectorAffectations.forEach(affectation => {
      if (affectation.fields.volunteer) {
        const volunteerField = affectation.fields.volunteer

        if (Array.isArray(volunteerField)) {
          volunteerField.forEach(id => {
            if (typeof id === 'string' && id.trim()) {
              volunteerIds.add(id.trim())
            }
          })
        } else if (typeof volunteerField === 'string' && volunteerField.trim()) {
          volunteerIds.add(volunteerField.trim())
        }
      }
    })

    console.log('Unique volunteer IDs to fetch:', Array.from(volunteerIds))

    // 5. Get volunteer details with enhanced affectation info
    const sectorVolunteers = []
    for (const volunteerId of volunteerIds) {
      try {
        const volunteer = await volunteers.getById(volunteerId)
        if (volunteer) {
          console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

          // Get affectations for this volunteer within this sector only
          const volunteerAffectations = sectorAffectations
            .filter(aff => {
              const volunteerField = aff.fields.volunteer

              if (Array.isArray(volunteerField)) {
                return volunteerField.includes(volunteerId)
              } else if (typeof volunteerField === 'string') {
                return volunteerField === volunteerId
              }

              return false
            })
            .map(aff => ({
              ...aff,
              // Add timeslot names to the affectation - only for sector timeslots
              timeslotNames: (() => {
                const txandField = aff.fields.txand
                const timeslotIds = Array.isArray(txandField) ? txandField : [txandField]

                return timeslotIds
                  .filter(id => typeof id === 'string' && sectorTimeslotIds.includes(id))
                  .map(id => {
                    const details = allSectorTimeslotsMap.get(id)
                    return details ? details.name : id
                  })
              })()
            }))

          sectorVolunteers.push({
            ...volunteer,
            affectations: volunteerAffectations
          })
        } else {
          console.log('Volunteer not found:', volunteerId)
        }
      } catch (err) {
        console.log('Error fetching volunteer:', volunteerId, err)
        logger.warn(`Failed to fetch volunteer ${volunteerId}`, err)
      }
    }

    console.log('Final result:', sectorVolunteers.length, 'volunteers')

    // Log the successful response
    logger.info(`Retrieved ${sectorVolunteers.length} volunteers for sector: ${sectorId}`, {
      adminEmail: token.email,
      sectorName: sector.fields.name,
      volunteerCount: sectorVolunteers.length,
      timeslotCount: sectorTimeslots.length
    })

    // Return enhanced data with full timeslot details
    return NextResponse.json({
      volunteers: sectorVolunteers,
      timeslots: Object.fromEntries(Array.from(timeslotMap.entries()).map(([id, details]) => [id, details.name])), // Keep backward compatibility
      allSectorTimeslots: Object.fromEntries(allSectorTimeslotsMap), // Full details
      timeslotDetails: Object.fromEntries(timeslotMap), // Full details for timeslots with volunteers
      totalTimeslots: sectorTimeslots.length
    }, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error("Error fetching sector volunteers", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}