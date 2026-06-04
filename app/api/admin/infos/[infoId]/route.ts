import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ infoId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { infoId } = await params
    const info = await prisma.usefulInfo.update({ where: { id: validateId(infoId) }, data: await request.json() })
    return NextResponse.json(info, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ infoId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { infoId } = await params
    await prisma.usefulInfo.delete({ where: { id: validateId(infoId) } })
    return NextResponse.json({ message: "Supprimé" }, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
