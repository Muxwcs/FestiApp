import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"
import { z } from "zod"

const createTimeslotSchema = z.object({
  name: z.string().min(1).max(100),
  dateStart: z.string().nullable().optional(),
  dateEnd: z.string().nullable().optional(),
  totalVolunteers: z.number().int().min(0).default(0),
  details: z.string().max(1000).optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { txand } = await params
    const sectorId = validateId(txand)

    const sector = await prisma.sector.findUnique({ where: { id: sectorId }, select: { id: true } })
    if (!sector) {
      return NextResponse.json({ error: "Secteur introuvable" }, { status: 404, headers })
    }

    const body = await req.json()
    const parsed = createTimeslotSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const timeslot = await prisma.timeslot.create({
      data: {
        name: parsed.data.name,
        dateStart: parsed.data.dateStart ? new Date(parsed.data.dateStart) : null,
        dateEnd: parsed.data.dateEnd ? new Date(parsed.data.dateEnd) : null,
        totalVolunteers: parsed.data.totalVolunteers,
        details: parsed.data.details,
        sectorId,
      },
    })

    logger.info(`Timeslot created by ${session.user.email}`, { timeslotId: timeslot.id, sectorId })

    return NextResponse.json(timeslot, { status: 201, headers })
  } catch (err) {
    logger.error("Error creating timeslot:", err)
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500, headers })
  }
}