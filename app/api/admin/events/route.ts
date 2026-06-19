import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const translatedField = z.object({ fr: z.string(), eu: z.string().default(""), en: z.string().default("") })

const createEventSchema = z.object({
  title: translatedField,
  description: translatedField.optional(),
  category: z.enum(["CONCERT", "ANIMATION", "INFO", "SKATE", "STREET_ART"]),
  place: z.enum(["HANDIA", "TTIKIA", "CASTLE", "VILLAGE", "FESTIVAL"]),
  day: z.enum(["VENDREDI", "SAMEDI"]),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  imageSrc: z.string().max(500).optional().or(z.literal("")),
  style: z.string().max(100).optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
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
        style: data.style || null,
        isActive: data.isActive,
      },
    })

    return NextResponse.json(event, { status: 201, headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
