import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders, validateId } from "@/lib/security"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { eventId } = await params
    const id = validateId(eventId)
    const body = await request.json()
    const { startTime, endTime, ...data } = body
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime !== undefined && { endTime: endTime ? new Date(endTime) : null }),
      },
    })
    return NextResponse.json(event, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const headers = createSecureHeaders()
  try {
    const { error } = await requireAdmin()
    if (error) return error
    const { eventId } = await params
    const id = validateId(eventId)
    await prisma.event.delete({ where: { id } })
    return NextResponse.json({ message: "Supprimé" }, { headers })
  } catch (_err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}
