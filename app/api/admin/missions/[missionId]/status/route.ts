import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const statusSchema = z.object({
  status: z.enum(["A_FAIRE", "EN_COURS", "TERMINEE"]),
})

interface RouteParams {
  params: Promise<{ missionId: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const headers = createSecureHeaders()
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401, headers })
    }

    const { missionId } = await params
    const body = await request.json()
    const parsed = statusSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Statut invalide", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: { assignments: { select: { userId: true } } },
    })

    if (!mission) {
      return NextResponse.json({ error: "Mission introuvable" }, { status: 404, headers })
    }

    // Vérifier : admin, responsable, ou assigné
    const isResponsible = mission.responsibleId === currentUser.id
    const isAssigned = mission.assignments.some((a) => a.userId === currentUser.id)

    if (!currentUser.isAdmin && !isResponsible && !isAssigned) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403, headers })
    }

    const updated = await prisma.mission.update({
      where: { id: missionId },
      data: { status: parsed.data.status },
    })

    return NextResponse.json({ status: updated.status }, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}