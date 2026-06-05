import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ priceId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { priceId } = await params
    const price = await prisma.price.update({ where: { id: validateId(priceId) }, data: await request.json() })
    return NextResponse.json(price, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ priceId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { priceId } = await params
    await prisma.price.delete({ where: { id: validateId(priceId) } })
    return NextResponse.json({ message: "Supprimé" }, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
