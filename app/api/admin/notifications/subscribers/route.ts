import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET() {
  const { error: authError } = await requireAdmin()
  if (authError) return authError

  try {
    const groups = await prisma.pushSubscription.groupBy({
      by: ["role"],
      _count: { id: true },
    })

    const counts: Record<string, number> = {
      PUBLIC: 0,
      BENEVOLE: 0,
      REFERENT: 0,
      ADMIN: 0,
    }

    let total = 0
    for (const group of groups) {
      counts[group.role] = group._count.id
      total += group._count.id
    }

    return NextResponse.json({ total, counts })
  } catch (error) {
    console.error("Subscribers error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
