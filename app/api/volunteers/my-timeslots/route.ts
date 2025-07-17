import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { volunteers, affectations, timeslots, sectors } from "@/lib/airtable"

export async function GET() {
  const headers = createSecureHeaders()

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      logger.warn("Unauthorized timeslots access attempt")
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401, headers }
      )
    }

    console.log('Fetching timeslots for user:', session.user.email)

    // 1. Find the volunteer by email
    const allVolunteers = await volunteers.getAll()
    const volunteer = allVolunteers.find(v =>
      typeof v.fields.email === "string" &&
      v.fields.email.toLowerCase() === session.user.email?.toLowerCase()
    )

    if (!volunteer) {
      logger.info(`No volunteer record found for email: ${session.user.email}`)
      return NextResponse.json({
        timeslots: [],
        message: "Aucun profil bénévole trouvé"
      }, { headers })
    }

    console.log('Found volunteer:', volunteer.fields.name || volunteer.fields.firstname)

    // 2. Get all affectations for this volunteer
    const allAffectations = await affectations.getAll()
    const volunteerAffectations = allAffectations.filter(affectation => {
      const volunteerField = affectation.fields.volunteer

      if (Array.isArray(volunteerField)) {
        return volunteerField.includes(volunteer.id)
      } else if (typeof volunteerField === 'string') {
        return volunteerField === volunteer.id
      }

      return false
    })

    console.log(`Found ${volunteerAffectations.length} affectations for volunteer`)

    if (volunteerAffectations.length === 0) {
      return NextResponse.json({
        timeslots: [],
        message: "Aucun créneau assigné"
      }, { headers })
    }

    // 3. Get all timeslots and sectors for enrichment
    const allTimeslots = await timeslots.getAll()
    const allSectors = await sectors.getAll()

    // 4. Process affectations to create enriched timeslot data
    const enrichedTimeslots = []

    for (const affectation of volunteerAffectations) {
      const txandField = affectation.fields.txand
      const timeslotIds = Array.isArray(txandField) ? txandField : [txandField]

      for (const timeslotId of timeslotIds) {
        if (typeof timeslotId !== 'string') continue

        const timeslot = allTimeslots.find(ts => ts.id === timeslotId)
        if (!timeslot) continue

        // Get sector information
        const sectorField = timeslot.fields.sector
        const sectorIds = Array.isArray(sectorField) ? sectorField : [sectorField]
        const sector = sectorIds[0] ? allSectors.find(s => s.id === sectorIds[0]) : null

        // Count current volunteers for this timeslot
        const timeslotAffectations = allAffectations.filter(aff => {
          const affTxand = aff.fields.txand
          if (Array.isArray(affTxand)) {
            return affTxand.includes(timeslotId)
          }
          return affTxand === timeslotId
        })

        enrichedTimeslots.push({
          id: timeslot.id,
          name: timeslot.fields.name || `Créneau ${timeslot.id.slice(-6)}`,
          dateStart: timeslot.fields.dateStart,
          dateEnd: timeslot.fields.dateEnd,
          sectorName: sector?.fields.name || 'Secteur inconnu',
          status: affectation.fields.status || 'Non défini',
          role: affectation.fields.role,
          totalVolunteers: timeslot.fields.totalVolunteers,
          currentVolunteers: timeslotAffectations.length,
          affectationId: affectation.id
        })
      }
    }

    // 5. Sort by date
    enrichedTimeslots.sort((a, b) => {
      if (!a.dateStart) return 1
      if (!b.dateStart) return -1
      return new Date(String(a.dateStart)).getTime() - new Date(String(b.dateStart)).getTime()
    })

    console.log(`Returning ${enrichedTimeslots.length} enriched timeslots`)

    logger.info(`User timeslots retrieved: ${session.user.email}`, {
      volunteerName: volunteer.fields.name || volunteer.fields.firstname,
      timeslotCount: enrichedTimeslots.length
    })

    return NextResponse.json({
      timeslots: enrichedTimeslots,
      volunteer: {
        id: volunteer.id,
        name: volunteer.fields.name || volunteer.fields.firstname,
        email: volunteer.fields.email
      }
    }, { headers })

  } catch (err: unknown) {
    console.error("API Error:", err)
    logger.error("Error fetching user timeslots", err)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500, headers }
    )
  }
}