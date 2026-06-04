import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

export async function GET() {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const sectors = await prisma.sector.findMany({
      include: {
        _count: { select: { timeslots: true, affectations: true } },
        referents: {
          include: { user: { select: { id: true, name: true, firstname: true } } },
        },
      },
      orderBy: { name: "asc" },
    })

    // Backward-compat wrapper
    const formatted = sectors.map((s) => ({
      id: s.id,
      fields: {
        name: s.name,
        description: s.description,
        color: s.color,
        status: s.status,
        skills: s.skills,
        referent: s.referents.map((r) => r.userId),
        totalNeeds: s._count.timeslots,
        totalVolunteers: s._count.affectations,
        createdAt: s.createdAt.toISOString(),
        modifiedAt: s.updatedAt.toISOString(),
      },
      createdTime: s.createdAt.toISOString(),
    }))

    logger.info(`Sectors accessed by ${session.user.email}`, { count: formatted.length })

    return NextResponse.json(formatted, { headers })
  } catch (err) {
    logger.error("Error in /api/txands:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

const createSectorSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  color: z.string().max(20).optional(),
  skills: z.array(z.string()).optional(),
  status: z.string().max(50).optional(),
})

export async function POST(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const body = await req.json()
    const parsed = createSectorSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400, headers })
    }

    const sector = await prisma.sector.create({ data: parsed.data })

    logger.info(`Sector created by ${session.user.email}`, { sectorId: sector.id })

    return NextResponse.json(
      { id: sector.id, fields: sector, createdTime: sector.createdAt.toISOString() },
      { status: 201, headers }
    )
  } catch (err) {
    logger.error("Error creating sector:", err)
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500, headers })
  }
}
