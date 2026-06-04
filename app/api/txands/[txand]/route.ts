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
    const { error } = await requireAdmin()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    const sector = await prisma.sector.findUnique({
      where: { id: sectorId },
      include: {
        referents: {
          include: { user: { select: { id: true, name: true, firstname: true, email: true, phone: true } } },
        },
        timeslots: { orderBy: { dateStart: "asc" } },
        _count: { select: { affectations: true } },
      },
    })

    if (!sector) {
      return NextResponse.json({ error: "Secteur introuvable" }, { status: 404, headers })
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
        createdAt: sector.createdAt.toISOString(),
        modifiedAt: sector.updatedAt.toISOString(),
      },
      createdTime: sector.createdAt.toISOString(),
    }, { headers })
  } catch (err) {
    logger.error("Error fetching sector:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)
    const body = await request.json()
    const fieldsData = body.fields || body

    const updated = await prisma.sector.update({
      where: { id: sectorId },
      data: {
        name: fieldsData.name,
        description: fieldsData.description,
        color: fieldsData.color,
        status: fieldsData.status,
        skills: fieldsData.skills,
      },
    })

    logger.info(`Sector updated by ${session.user.email}`, { sectorId })

    return NextResponse.json({ id: updated.id, fields: updated }, { headers })
  } catch (err) {
    logger.error("Error updating sector:", err)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500, headers })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    await prisma.sector.delete({ where: { id: sectorId } })

    logger.warn(`Sector deleted by ${session.user.email}`, { sectorId })

    return NextResponse.json({ message: "Secteur supprimé" }, { headers })
  } catch (err) {
    logger.error("Error deleting sector:", err)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500, headers })
  }
}
