import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const translatedField = z.object({ fr: z.string(), eu: z.string().default(""), en: z.string().default("") })

const createEventSchema = z.object({
  title: translatedField,
  description: translatedField.optional(),
  category: z.enum(["CONCERT", "ANIMATION", "RESTAURATION", "INFO"]),
  place: z.string().max(200).optional(),
  day: z.string().min(1),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  imageSrc: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
})

export async function POST(request: Request) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const body = await request.json()
    const parsed = createEventSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten().fieldErrors }, { status: 400, headers })
    }

    const { startTime, endTime, ...data } = parsed.data
    const event = await prisma.event.create({
      data: {
        ...data,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        imageSrc: data.imageSrc || null,
      },
    })

    return NextResponse.json(event, { status: 201, headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
