import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"
import { getCurrentUser } from "@/lib/permissions"

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

const createMissionSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  description: z.string().optional(),
  dateStart: z.string().min(1, "Date de début requise"),
  dateEnd: z.string().min(1, "Date de fin requise"),
  place: z.string().optional(),
  priority: z.enum(["HAUTE", "MOYENNE", "BASSE"]).default("MOYENNE"),
  status: z.enum(["A_FAIRE", "EN_COURS", "TERMINEE"]).default("A_FAIRE"),
  humanResources: z.number().int().min(0).default(0),
  assignedUserIds: z.array(z.string()).default([]),
  responsibleId: z.string().optional(),
})

const serializeUser = (u: { id: string; firstname: string | null; surname: string | null; name: string | null; email: string }) => ({
  id: u.id,
  firstname: u.firstname,
  surname: u.surname,
  name: u.name,
  email: u.email,
})


// GET /api/admin/missions
export async function GET() {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const missions = await prisma.mission.findMany({
      include: missionIncludes,
      orderBy: { dateStart: "asc" },
    })

    const serialized = missions.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      dateStart: m.dateStart.toISOString(),
      dateEnd: m.dateEnd.toISOString(),
      place: m.place,
      priority: m.priority,
      status: m.status,
      humanResources: m.humanResources,
      responsible: m.responsible ? serializeUser(m.responsible) : null,
      assignedUsers: m.assignments.map((a) => serializeUser(a.user)),
      createdAt: m.createdAt.toISOString(),
    }))

    return NextResponse.json(serialized, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

// POST /api/admin/missions
export async function POST(request: Request) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403, headers })
    }


    const body = await request.json()
    const parsed = createMissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const { assignedUserIds, responsibleId, dateStart, dateEnd, ...rest } = parsed.data

    const mission = await prisma.mission.create({
      data: {
        ...rest,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        responsibleId: responsibleId || currentUser.id,
        assignments: {
          create: assignedUserIds.map((userId) => ({ userId })),
        },

      },
      include: missionIncludes,
    })

    return NextResponse.json(mission, { status: 201, headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}