import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"
import { z } from "zod"

const referentSchema = z.object({
  userId: z.string().min(1),
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
    validateId(txand)
    const tsId = validateId(timeslotId)

    const body = await req.json()
    const parsed = referentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400, headers })
    }

    const ref = await prisma.timeslotReferent.create({
      data: { userId: parsed.data.userId, timeslotId: tsId },
    })

    await prisma.user.update({
      where: { id: parsed.data.userId },
      data: { isReferent: true },
    })

    logger.info(`Timeslot referent added by ${session.user.email}`, { timeslotId: tsId, userId: parsed.data.userId })
    return NextResponse.json(ref, { status: 201, headers })
  } catch (err) {
    logger.error("Error adding timeslot referent:", err)
    return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500, headers })
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

    const { userId } = await req.json()
    if (!userId) {
      return NextResponse.json({ error: "userId requis" }, { status: 400, headers })
    }

    await prisma.timeslotReferent.delete({
      where: { userId_timeslotId: { userId, timeslotId: tsId } },
    })

    const [sectorRefs, timeslotRefs] = await Promise.all([
      prisma.sectorReferent.count({ where: { userId } }),
      prisma.timeslotReferent.count({ where: { userId } }),
    ])
    if (sectorRefs === 0 && timeslotRefs === 0) {
      await prisma.user.update({ where: { id: userId }, data: { isReferent: false } })
    }

    logger.info(`Timeslot referent removed by ${session.user.email}`, { timeslotId: tsId, userId })
    return NextResponse.json({ message: "Référent retiré" }, { headers })
  } catch (err) {
    logger.error("Error removing timeslot referent:", err)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500, headers })
  }
}