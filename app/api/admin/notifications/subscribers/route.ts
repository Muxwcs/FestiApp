import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET() {
  try {
    const { error: authError } = await requireAdmin()
    if (authError) return authError

    const count = await prisma.pushSubscription.count()

    return NextResponse.json({ count })
  } catch (error) {
    console.error("Subscribers error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
