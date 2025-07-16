import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors, volunteers, affectations, timeslots } from "@/lib/airtable"

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
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404, headers }
      )
    }

    console.log('Looking for sector ID:', sectorId)
    console.log('Sector name:', sector.fields.name)

    // Get all affectations
    const allAffectations = await affectations.getAll()
    console.log('Total affectations in table:', allAffectations.length)

    // Manual filter for affectations matching this sector
    const manualFilter = allAffectations.filter(aff => {
      const poleArray = aff.fields.pole
      if (Array.isArray(poleArray)) {
        return poleArray.includes(sectorId)
      } else if (typeof poleArray === 'string') {
        return poleArray === sectorId
      }
      return false
    })

    console.log('Manual filter found:', manualFilter.length, 'affectations')

    // Collect all unique timeslot IDs from affectations
    const timeslotIds = new Set<string>()
    manualFilter.forEach(affectation => {
      if (affectation.fields.txand) {
        const txandArray = Array.isArray(affectation.fields.txand)
          ? affectation.fields.txand
          : [affectation.fields.txand]

        txandArray.forEach(id => {
          if (typeof id === 'string' && id.trim()) {
            timeslotIds.add(id.trim())
          }
        })
      }
    })

    console.log('Found timeslot IDs from affectations:', Array.from(timeslotIds))

    // Get ALL timeslots that belong to this sector using the sector field
    const allTimeslots = await timeslots.getAll()
    const sectorTimeslots = allTimeslots.filter(timeslot => {
      // Use the direct sector field reference
      const timeslotSectors = timeslot.fields.sector

      if (Array.isArray(timeslotSectors)) {
        // Check if our sectorId is in the array
        return timeslotSectors.includes(sectorId)
      } else if (typeof timeslotSectors === 'string') {
        // Single sector reference
        return timeslotSectors === sectorId
      }

      return false
    })

    console.log('All sector timeslots:', sectorTimeslots.length)
    console.log('Sector timeslot names:', sectorTimeslots.map(ts => ts.fields.name))

    // Combine timeslot IDs from affectations + all sector timeslots
    const allTimeslotIds = new Set([
      ...Array.from(timeslotIds),
      ...sectorTimeslots.map(ts => ts.id)
    ])

    // Fetch timeslot details
    const timeslotData = await timeslots.getByIds(Array.from(allTimeslotIds))
    console.log('Fetched timeslots:', timeslotData.length)

    // Create maps
    const timeslotMap = new Map<string, string>()
    const allSectorTimeslotsMap = new Map<string, string>()

    timeslotData.forEach(timeslot => {
      const id = typeof timeslot.id === "string" ? timeslot.id : ""
      const name = typeof timeslot.fields.name === "string"
        ? timeslot.fields.name
        : `Créneau ${id.slice(-6)}`
      if (id) {
        timeslotMap.set(id, name)
        allSectorTimeslotsMap.set(id, name)
      }
    })

    // Extract volunteer IDs from affectations
    const volunteerIds = new Set<string>()
    manualFilter.forEach(affectation => {
      if (affectation.fields.volunteer) {
        const volunteerArray = Array.isArray(affectation.fields.volunteer)
          ? affectation.fields.volunteer
          : [affectation.fields.volunteer]

        volunteerArray.forEach(id => {
          if (typeof id === 'string' && id.trim()) {
            volunteerIds.add(id.trim())
          }
        })
      }
    })

    console.log('Unique volunteer IDs to fetch:', Array.from(volunteerIds))

    // Get volunteer details with enhanced affectation info
    const sectorVolunteers = []
    for (const volunteerId of volunteerIds) {
      try {
        const volunteer = await volunteers.getById(volunteerId)
        if (volunteer) {
          console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

          // Get affectations for this volunteer and enhance with timeslot names
          const volunteerAffectations = manualFilter
            .filter(aff => {
              const volArray = Array.isArray(aff.fields.volunteer)
                ? aff.fields.volunteer
                : [aff.fields.volunteer]
              return volArray.includes(volunteerId)
            })
            .map(aff => ({
              ...aff,
              // Add timeslot names to the affectation
              timeslotNames: Array.isArray(aff.fields.txand)
                ? aff.fields.txand.map(id => timeslotMap.get(id) || id)
                : aff.fields.txand
                  ? [typeof aff.fields.txand === "string" ? (timeslotMap.get(aff.fields.txand) || aff.fields.txand) : ""]
                  : []
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

    // Return enhanced data with ALL sector timeslots
    return NextResponse.json({
      volunteers: sectorVolunteers,
      timeslots: Object.fromEntries(timeslotMap), // Only timeslots with volunteers
      allSectorTimeslots: Object.fromEntries(allSectorTimeslotsMap), // ALL sector timeslots
      totalTimeslots: timeslotData.length
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