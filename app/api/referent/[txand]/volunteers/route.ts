import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors, volunteers, affectations, timeslots } from "@/lib/airtable"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.airtableId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401, headers })
    }
    const isAdmin = session.user.role === 'admin'
    const isReferent = session.user.isReferent
    if (!isAdmin && !isReferent) {
      return NextResponse.json({ error: "Admin or referent access required" }, { status: 403, headers })
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.txand
    if (!sectorId) {
      return NextResponse.json({ error: "Sector ID is required" }, { status: 400, headers })
    }

    const sector = await sectors.getById(sectorId)
    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404, headers })
    }

    // Referent access check
    if (!isAdmin) {
      const referents = sector.fields?.referent
      let canAccess = false
      if (Array.isArray(referents)) {
        canAccess = referents.includes(session.user.airtableId)
      } else if (typeof referents === 'string') {
        canAccess = referents === session.user.airtableId
      }
      if (!canAccess) {
        return NextResponse.json(
          { error: "You can only access volunteers from sectors you're responsible for" },
          { status: 403, headers }
        )
      }
    }

    // --- MIRROR ADMIN LOGIC BELOW ---

    // 1. Get all timeslots for this sector
    const allTimeslots = await timeslots.getAll()
    const sectorTimeslots = allTimeslots.filter(ts => {
      const sectorField = ts.fields.sector || ts.fields.secteur || ts.fields.pole
      if (Array.isArray(sectorField)) return sectorField.includes(sectorId)
      return sectorField === sectorId
    })

    // 2. Get all affectations for these timeslots
    const allAffectations = await affectations.getAll()
    const sectorAffectations = allAffectations.filter(aff => {
      const txand = aff.fields.txand
      if (Array.isArray(txand)) return txand.some(id => sectorTimeslots.map(ts => ts.id).includes(id))
      return sectorTimeslots.map(ts => ts.id).includes(txand as string)
    })

    // 3. Extract all volunteer IDs from these affectations
    const volunteerIds = new Set<string>()
    sectorAffectations.forEach(aff => {
      const vols = aff.fields.volunteer
      if (Array.isArray(vols)) vols.forEach(id => id && volunteerIds.add(id))
      else if (typeof vols === "string" && vols) volunteerIds.add(vols)
    })

    // 4. Get all volunteers and filter by those IDs
    const allVolunteers = await volunteers.getAll()
    const sectorVolunteers = allVolunteers.filter(v => volunteerIds.has(v.id))

    // 5. Group volunteers by timeslot
    const timeslotMap: Record<string, any[]> = {}
    sectorAffectations.forEach(aff => {
      const txand = Array.isArray(aff.fields.txand) ? aff.fields.txand : [aff.fields.txand]
      const vols = Array.isArray(aff.fields.volunteer) ? aff.fields.volunteer : [aff.fields.volunteer]
      txand.forEach(tsId => {
        if (!timeslotMap[tsId]) timeslotMap[tsId] = []
        vols.forEach(volId => {
          const vol = sectorVolunteers.find(v => v.id === volId)
          if (vol && !timeslotMap[tsId].some(vv => vv.id === vol.id)) {
            timeslotMap[tsId].push(vol)
          }
        })
      })
    })

    // Example in your API route:
    const timeslotGroups = sectorTimeslots.map(group => ({
      ...group,
      timeslot: {
        id: group.id,
        ...group.fields // flatten fields into timeslot
      },
      volunteers: timeslotMap[group.id] || []
    }))

    return NextResponse.json({
      sector: {
        id: sector.id,
        name: sector.fields?.name || 'Secteur sans nom'
      },
      volunteers: sectorVolunteers,
      timeslotGroups,
      sectorTimeslots,
      total: sectorVolunteers.length,
      success: true
    }, { headers })

  } catch (err: unknown) {
    logger.error("Error in referent sector volunteers API", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}