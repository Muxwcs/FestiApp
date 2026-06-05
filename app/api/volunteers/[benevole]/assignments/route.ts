import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { benevole } = await params
    const volunteerId = validateId(benevole)

    const affectations = await prisma.affectation.findMany({
      where: { volunteerId },
      include: {
        timeslot: true,
        sector: true,
        volunteer: { select: { id: true, name: true, firstname: true } },
      },
      orderBy: { timeslot: { dateStart: "asc" } },
    })

    // Count volunteers per timeslot for team info
    const timeslotIds = affectations.map((a) => a.timeslotId)
    const volunteerCounts = await prisma.affectation.groupBy({
      by: ["timeslotId"],
      where: { timeslotId: { in: timeslotIds } },
      _count: true,
    })
    const countMap = new Map(volunteerCounts.map((c) => [c.timeslotId, c._count]))

    // Backward-compat enriched format
    const enriched = affectations.map((aff) => {
      const now = new Date()
      const startDate = aff.timeslot.dateStart
      const daysUntilStart = startDate
        ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null
      const hoursUntilStart = startDate
        ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60))
        : null

      return {
        id: aff.id,
        fields: {
          number: aff.number,
          status: aff.status,
          volunteer: [aff.volunteerId],
          txand: [aff.timeslotId],
          pole: [aff.sectorId],
          createdAt: aff.createdAt.toISOString(),
        },
        createdAt: aff.createdAt.toISOString(),
        enriched: {
          sector: {
            id: aff.sector.id,
            name: aff.sector.name,
            description: aff.sector.description,
            color: aff.sector.color || "#10b981",
          },
          timeslots: {
            count: 1,
            list: [{
              id: aff.timeslot.id,
              name: aff.timeslot.name,
              dateStart: aff.timeslot.dateStart?.toISOString(),
              dateEnd: aff.timeslot.dateEnd?.toISOString(),
            }],
            next: {
              name: aff.timeslot.name,
              dateStart: aff.timeslot.dateStart?.toISOString(),
              dateEnd: aff.timeslot.dateEnd?.toISOString(),
            },
          },
          timing: {
            daysUntilStart,
            hoursUntilStart,
            isToday: daysUntilStart === 0,
            isTomorrow: daysUntilStart === 1,
            isThisWeek: daysUntilStart !== null && daysUntilStart <= 7 && daysUntilStart >= 0,
            isPast: daysUntilStart !== null && daysUntilStart < 0,
            isUpcoming: daysUntilStart !== null && daysUntilStart > 0,
          },
          team: {
            totalVolunteers: countMap.get(aff.timeslotId) || 1,
            isTeamWork: (countMap.get(aff.timeslotId) || 1) > 1,
          },
          priority: {
            level: "normal",
            isHigh: false,
            isMedium: false,
          },
        },
      }
    })

    return NextResponse.json(enriched, { headers })
  } catch (err) {
    logger.error("Error fetching volunteer assignments:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
