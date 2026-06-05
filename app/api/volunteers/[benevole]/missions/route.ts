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

    const assignments = await prisma.missionAssignment.findMany({
      where: { userId: volunteerId },
      include: {
        mission: {
          include: {
            assignments: { select: { userId: true } },
          },
        },
      },
      orderBy: { mission: { dateStart: "asc" } },
    })

    const enriched = assignments.map((ma) => {
      const m = ma.mission
      const now = new Date()
      const endDate = m.dateEnd
      const daysUntilDeadline = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      const hoursUntilDeadline = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60))
      const durationHours = (m.dateEnd.getTime() - m.dateStart.getTime()) / (1000 * 60 * 60)

      return {
        id: m.id,
        fields: {
          name: m.name,
          description: m.description,
          dateStart: m.dateStart.toISOString(),
          dateEnd: m.dateEnd.toISOString(),
          place: m.place,
          priority: m.priority,
          status: m.status,
          humanRessources: m.humanResources,
          assignedMembers: m.assignments.map((a) => a.userId),
          totalAssigned: m.assignments.length,
        },
        createdAt: m.createdAt.toISOString(),
        enriched: {
          status: {
            current: m.status,
            priority: m.priority,
            isCompleted: m.status === "TERMINEE",
            isInProgress: m.status === "EN_COURS",
            isPending: m.status === "A_FAIRE",
            isHigh: m.priority === "HAUTE",
            isMedium: m.priority === "MOYENNE",
          },
          timing: {
            deadline: {
              daysUntilDeadline,
              hoursUntilDeadline,
              isOverdue: daysUntilDeadline < 0,
              isDueToday: daysUntilDeadline === 0,
              isDueTomorrow: daysUntilDeadline === 1,
              isDueThisWeek: daysUntilDeadline <= 7 && daysUntilDeadline >= 0,
              isUrgent: daysUntilDeadline <= 2 && daysUntilDeadline >= 0,
            },
            duration: {
              startDate: m.dateStart.toISOString(),
              endDate: m.dateEnd.toISOString(),
              durationHours: Math.round(durationHours * 100) / 100,
              durationDays: Math.round((durationHours / 24) * 100) / 100,
              isActive: now >= m.dateStart && now <= m.dateEnd,
              hasStarted: now >= m.dateStart,
              hasEnded: now > m.dateEnd,
            },
          },
          resources: {
            humanResources: m.humanResources,
            assignedMembers: m.assignments.length,
            totalAssigned: m.assignments.length,
            hasAttachments: false,
          },
          location: { place: m.place || "Non spécifié" },
          progress: {
            estimatedDuration: durationHours,
            isResourceComplete: m.assignments.length >= m.humanResources,
          },
        },
      }
    })

    return NextResponse.json(enriched, { headers })
  } catch (err) {
    logger.error("Error fetching volunteer missions:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
