import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    // Verify sector exists
    const sector = await prisma.sector.findUnique({
      where: { id: sectorId },
      select: { id: true, name: true },
    })

    if (!sector) {
      return NextResponse.json({ error: "Secteur introuvable" }, { status: 404, headers })
    }

    // Get all timeslots for this sector
    const sectorTimeslots = await prisma.timeslot.findMany({
      where: { sectorId },
      orderBy: { dateStart: "asc" },
    })

    if (sectorTimeslots.length === 0) {
      return NextResponse.json({
        volunteers: [],
        timeslots: {},
        allSectorTimeslots: {},
        timeslotDetails: {},
        totalTimeslots: 0,
      }, { headers })
    }

    // Get all affectations for this sector's timeslots with volunteer data
    const sectorAffectations = await prisma.affectation.findMany({
      where: { sectorId },
      include: {
        volunteer: {
          select: {
            id: true, email: true, name: true, firstname: true, surname: true,
            phone: true, role: true, isReferent: true, isActive: true, status: true,
            skills: true, availability: true, notes: true, createdAt: true, updatedAt: true,
          },
        },
        timeslot: { select: { id: true, name: true } },
      },
    })

    // Build timeslot details map
    const allSectorTimeslots: Record<string, { id: string; name: string; dateStart: string | null; dateEnd: string | null; totalVolunteers: number }> = {}
    sectorTimeslots.forEach((ts) => {
      allSectorTimeslots[ts.id] = {
        id: ts.id,
        name: ts.name,
        dateStart: ts.dateStart?.toISOString() || null,
        dateEnd: ts.dateEnd?.toISOString() || null,
        totalVolunteers: ts.totalVolunteers,
      }
    })

    // Group affectations by volunteer
    const volunteerMap = new Map<string, { volunteer: typeof sectorAffectations[0]["volunteer"]; affectations: typeof sectorAffectations }>()

    sectorAffectations.forEach((aff) => {
      const existing = volunteerMap.get(aff.volunteerId)
      if (existing) {
        existing.affectations.push(aff)
      } else {
        volunteerMap.set(aff.volunteerId, {
          volunteer: aff.volunteer,
          affectations: [aff],
        })
      }
    })

    // Build backward-compat volunteer list
    const volunteers = Array.from(volunteerMap.values()).map(({ volunteer, affectations: affs }) => ({
      id: volunteer.id,
      fields: volunteer,
      affectations: affs.map((aff) => ({
        id: aff.id,
        fields: {
          volunteer: [aff.volunteerId],
          txand: [aff.timeslotId],
        },
        timeslotNames: [aff.timeslot.name],
      })),
    }))

    // Build timeslots name map
    const timeslotNameMap: Record<string, string> = {}
    sectorTimeslots.forEach((ts) => {
      timeslotNameMap[ts.id] = ts.name
    })

    logger.info(`Sector volunteers accessed by ${session.user.email}`, {
      sectorId,
      volunteerCount: volunteers.length,
      timeslotCount: sectorTimeslots.length,
    })

    return NextResponse.json({
      volunteers,
      timeslots: timeslotNameMap,
      allSectorTimeslots,
      timeslotDetails: allSectorTimeslots,
      totalTimeslots: sectorTimeslots.length,
    }, { headers })
  } catch (err) {
    logger.error("Error fetching sector volunteers:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
