import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const ENDPOINT_MAX_LENGTH = 2048
const KEY_MAX_LENGTH = 512
const ENDPOINT_URL_REGEX = /^https:\/\/.+/

// Simple in-memory rate limiter (per IP, 10 req/min)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }

  entry.count++
  return entry.count > 10
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { endpoint, keys } = body

    // Validate endpoint
    if (
      typeof endpoint !== "string" ||
      endpoint.length > ENDPOINT_MAX_LENGTH ||
      !ENDPOINT_URL_REGEX.test(endpoint)
    ) {
      return NextResponse.json(
        { error: "Invalid endpoint URL" },
        { status: 400 }
      )
    }

    // Validate keys
    if (
      typeof keys?.p256dh !== "string" ||
      typeof keys?.auth !== "string" ||
      keys.p256dh.length > KEY_MAX_LENGTH ||
      keys.auth.length > KEY_MAX_LENGTH ||
      keys.p256dh.length === 0 ||
      keys.auth.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid subscription keys" },
        { status: 400 }
      )
    }

    const userAgent = (request.headers.get("user-agent") || "").slice(0, 500)

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: {
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent: userAgent || null,
      },
      update: {
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent: userAgent || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    )
  }
}
