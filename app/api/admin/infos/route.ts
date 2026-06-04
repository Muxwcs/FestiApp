import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const translatedField = z.object({ fr: z.string(), eu: z.string().default(""), en: z.string().default("") })

const createInfoSchema = z.object({
  title: translatedField,
  content: translatedField,
  icon: z.string().max(10).optional(),
  category: z.string().max(100).optional(),
  sortOrder: z.number().int().default(0),
})

export async function POST(request: Request) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const body = await request.json()
    const parsed = createInfoSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten().fieldErrors }, { status: 400, headers })
    }
    const info = await prisma.usefulInfo.create({ data: parsed.data })
    return NextResponse.json(info, { status: 201, headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
