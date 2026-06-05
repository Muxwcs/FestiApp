import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const ENDPOINT_MAX_LENGTH = 2048
const ENDPOINT_URL_REGEX = /^https:\/\/.+/

export async function POST(request: NextRequest) {
  try {
    const { endpoint } = await request.json()

    if (
      typeof endpoint !== "string" ||
      endpoint.length > ENDPOINT_MAX_LENGTH ||
      !ENDPOINT_URL_REGEX.test(endpoint)
    ) {
      return NextResponse.json(
        { error: "Invalid endpoint" },
        { status: 400 }
      )
    }

    await prisma.pushSubscription.deleteMany({ where: { endpoint } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    )
  }
}
