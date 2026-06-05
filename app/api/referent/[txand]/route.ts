import { NextRequest, NextResponse } from "next/server"
import { requireAdminOrReferent } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdminOrReferent()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    const sector = await prisma.sector.findUnique({
      where: { id: sectorId },
      include: {
        referents: { select: { userId: true } },
        timeslots: { orderBy: { dateStart: "asc" } },
        _count: { select: { affectations: true } },
      },
    })

    if (!sector) {
      return NextResponse.json({ error: "Secteur introuvable" }, { status: 404, headers })
    }

    // Check referent access
    const isAdmin = session.user.role === "ADMIN"
    if (!isAdmin) {
      const isReferentOfSector = sector.referents.some((r) => r.userId === session.user.id)
      if (!isReferentOfSector) {
        return NextResponse.json(
          { error: "Accès réservé au référent de ce secteur" },
          { status: 403, headers }
        )
      }
    }

    return NextResponse.json({
      id: sector.id,
      fields: {
        name: sector.name,
        description: sector.description,
        color: sector.color,
        status: sector.status,
        skills: sector.skills,
        referent: sector.referents.map((r) => r.userId),
        txands: sector.timeslots.map((t) => t.id),
        totalNeeds: sector.timeslots.length,
        totalVolunteers: sector._count.affectations,
      },
      createdTime: sector.createdAt.toISOString(),
    }, { headers })
  } catch (err) {
    logger.error("Error in /api/referent/[txand]:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdminOrReferent()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    // Verify referent access
    const isAdmin = session.user.role === "ADMIN"
    if (!isAdmin) {
      const sector = await prisma.sector.findUnique({
        where: { id: sectorId },
        include: { referents: { select: { userId: true } } },
      })
      if (!sector || !sector.referents.some((r) => r.userId === session.user.id)) {
        return NextResponse.json({ error: "Accès interdit" }, { status: 403, headers })
      }
    }

    const body = await request.json()
    const fieldsData = body.fields || body

    const updated = await prisma.sector.update({
      where: { id: sectorId },
      data: {
        description: fieldsData.description,
        status: fieldsData.status,
        skills: fieldsData.skills,
      },
    })

    logger.info(`Sector updated by referent ${session.user.email}`, { sectorId })

    return NextResponse.json({ id: updated.id, fields: updated }, { headers })
  } catch (err) {
    logger.error("Error updating sector:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
