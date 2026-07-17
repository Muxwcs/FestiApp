import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const userSelect = {
  id: true,
  firstname: true,
  surname: true,
  name: true,
  email: true,
} as const

const missionIncludes = {
  assignments: {
    include: { user: { select: userSelect } },
  },
  responsible: { select: userSelect },
} as const

const updateMissionSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  description: z.string().optional(),
  dateStart: z.string().min(1, "Date de début requise"),
  dateEnd: z.string().min(1, "Date de fin requise"),
  place: z.string().optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).default("MOYENNE"),
  status: z.enum(["A_FAIRE", "EN_COURS", "TERMINEE"]).default("A_FAIRE"),
  humanResources: z.number().int().min(0).default(0),
  assignedUserIds: z.array(z.string()).default([]),
  responsibleId: z.string().nullable().optional(),
})

interface RouteParams {
  params: Promise<{ missionId: string }>
}

// PUT /api/admin/missions/[missionId]
export async function PUT(request: Request, { params }: RouteParams) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { missionId } = await params
    const body = await request.json()
    const parsed = updateMissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const existing = await prisma.mission.findUnique({ where: { id: missionId } })
    if (!existing) {
      return NextResponse.json({ error: "Mission introuvable" }, { status: 404, headers })
    }

    const { assignedUserIds, responsibleId, dateStart, dateEnd, ...rest } = parsed.data

    const [, mission] = await prisma.$transaction([
      prisma.missionAssignment.deleteMany({ where: { missionId } }),
      prisma.mission.update({
        where: { id: missionId },
        data: {
          ...rest,
          dateStart: new Date(dateStart),
          dateEnd: new Date(dateEnd),
          responsibleId: responsibleId ?? existing.responsibleId,
          assignments: {
            create: assignedUserIds.map((userId) => ({ userId })),
          },
        },
        include: missionIncludes,
      }),
    ])

    return NextResponse.json(mission, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

// DELETE /api/admin/missions/[missionId]
export async function DELETE(_request: Request, { params }: RouteParams) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { missionId } = await params

    const existing = await prisma.mission.findUnique({ where: { id: missionId } })
    if (!existing) {
      return NextResponse.json({ error: "Mission introuvable" }, { status: 404, headers })
    }

    await prisma.mission.delete({ where: { id: missionId } })

    return NextResponse.json({ success: true }, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}