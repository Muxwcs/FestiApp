import { NextResponse } from "next/server"
import { requireAdminOrReferent } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"

export async function GET() {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdminOrReferent()
    if (error) return error

    const isAdmin = session.user.role === "ADMIN"

    let sectors

    if (isAdmin) {
      // Admins see all sectors
      sectors = await prisma.sector.findMany({
        include: {
          _count: { select: { timeslots: true, affectations: true } },
          referents: { include: { user: { select: { id: true, name: true, firstname: true } } } },
        },
        orderBy: { name: "asc" },
      })
    } else {
      // Referents see only their sectors
      sectors = await prisma.sector.findMany({
        where: {
          referents: { some: { userId: session.user.id } },
        },
        include: {
          _count: { select: { timeslots: true, affectations: true } },
          referents: { include: { user: { select: { id: true, name: true, firstname: true } } } },
        },
        orderBy: { name: "asc" },
      })
    }

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
      },
      createdTime: s.createdAt.toISOString(),
    }))

    return NextResponse.json(formatted, { headers })
  } catch (err) {
    logger.error("Error in /api/referent/sectors:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
