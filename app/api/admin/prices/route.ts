import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { z } from "zod"

const translatedField = z.object({ fr: z.string(), eu: z.string().default(""), en: z.string().default("") })

const createPriceSchema = z.object({
  title: translatedField,
  description: translatedField.optional(),
  amount: z.number().min(0),
  currency: z.string().default("EUR"),
  category: z.string().max(100).optional(),
  sortOrder: z.number().int().default(0),
})

export async function POST(request: Request) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const body = await request.json()
    const parsed = createPriceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten().fieldErrors }, { status: 400, headers })
    }
    const price = await prisma.price.create({ data: parsed.data })
    return NextResponse.json(price, { status: 201, headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
