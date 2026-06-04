import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"

export async function GET() {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const affectations = await prisma.affectation.findMany({
      where: { volunteerId: session.user.id, status: "VALIDE" },
      include: {
        timeslot: true,
        sector: true,
      },
      orderBy: { timeslot: { dateStart: "asc" } },
    })

    const now = new Date()

    const timeslots = affectations.map((aff) => {
      const startDate = aff.timeslot.dateStart
      const daysUntilStart = startDate
        ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null
      const hoursUntilStart = startDate
        ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60))
        : null

      return {
        id: aff.timeslot.id,
        name: aff.timeslot.name,
        dateStart: aff.timeslot.dateStart?.toISOString(),
        dateEnd: aff.timeslot.dateEnd?.toISOString(),
        sectorName: aff.sector.name,
        sectorDescription: aff.sector.description || "",
        sectorColor: aff.sector.color || "#10b981",
        status: aff.status,
        totalVolunteers: aff.timeslot.totalVolunteers,
        currentVolunteers: 0,
        affectationId: aff.id,
        timing: {
          daysUntilStart,
          hoursUntilStart,
          isToday: daysUntilStart === 0,
          isTomorrow: daysUntilStart === 1,
          isThisWeek: daysUntilStart !== null && daysUntilStart <= 7 && daysUntilStart >= 0,
          isPast: daysUntilStart !== null && daysUntilStart < 0,
          isUpcoming: daysUntilStart !== null && daysUntilStart > 0,
        },
      }
    })

    const volunteer = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json({
      timeslots,
      volunteer: volunteer || undefined,
      message: timeslots.length === 0 ? "Aucun créneau assigné" : undefined,
    }, { headers })
  } catch (err) {
    logger.error("Error fetching my timeslots:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
