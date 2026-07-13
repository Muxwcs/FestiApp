import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"
import { z } from "zod"

const updateTimeslotSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  dateStart: z.string().nullable().optional(),
  dateEnd: z.string().nullable().optional(),
  totalVolunteers: z.number().int().min(0).optional(),
  details: z.string().max(1000).nullable().optional(),
})

export async function PUT(
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
    const parsed = updateTimeslotSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const data: Record<string, unknown> = { ...parsed.data }
    if (data.dateStart !== undefined) {
      data.dateStart = data.dateStart ? new Date(data.dateStart as string) : null
    }
    if (data.dateEnd !== undefined) {
      data.dateEnd = data.dateEnd ? new Date(data.dateEnd as string) : null
    }

    const updated = await prisma.timeslot.update({
      where: { id: tsId },
      data,
    })

    logger.info(`Timeslot updated by ${session.user.email}`, { timeslotId: tsId })
    return NextResponse.json(updated, { headers })
  } catch (err) {
    logger.error("Error updating timeslot:", err)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500, headers })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ txand: string; timeslotId: string }> }
) {
  const headers = createSecureHeaders()
  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand, timeslotId } = await params
    validateId(txand)
    const tsId = validateId(timeslotId)

    await prisma.timeslot.delete({ where: { id: tsId } })

    logger.warn(`Timeslot deleted by ${session.user.email}`, { timeslotId: tsId })
    return NextResponse.json({ message: "Créneau supprimé" }, { headers })
  } catch (err) {
    logger.error("Error deleting timeslot:", err)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500, headers })
  }
}