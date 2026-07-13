import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"
import { z } from "zod"

const affectationSchema = z.object({
  volunteerId: z.string().min(1),
  status: z.enum(["VALIDE", "EN_ATTENTE", "REFUSE"]).optional().default("VALIDE"),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ txand: string; timeslotId: string }> }
) {
  const headers = createSecureHeaders()
  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand, timeslotId } = await params
    const sectorId = validateId(txand)
    const tsId = validateId(timeslotId)

    const body = await req.json()
    const parsed = affectationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400, headers })
    }

    // Check duplicate
    const existing = await prisma.affectation.findUnique({
      where: { volunteerId_timeslotId: { volunteerId: parsed.data.volunteerId, timeslotId: tsId } },
    })
    if (existing) {
      return NextResponse.json({ error: "Ce bénévole est déjà affecté à ce créneau" }, { status: 409, headers })
    }

    const affectation = await prisma.affectation.create({
      data: {
        volunteerId: parsed.data.volunteerId,
        timeslotId: tsId,
        sectorId,
        status: parsed.data.status,
      },
    })

    logger.info(`Affectation created by ${session.user.email}`, {
      affectationId: affectation.id, timeslotId: tsId, volunteerId: parsed.data.volunteerId,
    })
    return NextResponse.json(affectation, { status: 201, headers })
  } catch (err) {
    logger.error("Error creating affectation:", err)
    return NextResponse.json({ error: "Erreur lors de l'affectation" }, { status: 500, headers })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ txand: string; timeslotId: string }> }
) {
  const headers = createSecureHeaders()
  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand, timeslotId } = await params
    validateId(txand)
    const tsId = validateId(timeslotId)

    const { volunteerId } = await req.json()
    if (!volunteerId) {
      return NextResponse.json({ error: "volunteerId requis" }, { status: 400, headers })
    }

    await prisma.affectation.delete({
      where: { volunteerId_timeslotId: { volunteerId, timeslotId: tsId } },
    })

    logger.info(`Affectation removed by ${session.user.email}`, { timeslotId: tsId, volunteerId })
    return NextResponse.json({ message: "Affectation supprimée" }, { headers })
  } catch (err) {
    logger.error("Error removing affectation:", err)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500, headers })
  }
}