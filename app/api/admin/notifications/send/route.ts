import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { sendPushNotification, type PushPayload } from "@/lib/notifications"
import { sanitizeInput } from "@/lib/security"

const TITLE_MAX_LENGTH = 100
const BODY_MAX_LENGTH = 500
const URL_MAX_LENGTH = 500
const URL_REGEX = /^\/[a-zA-Z0-9\-_/?.=&#%]*$/

export async function POST(request: NextRequest) {
  try {
    const { error: authError } = await requireAdmin()
    if (authError) return authError

    const body = await request.json()
    const { title, body: message, url } = body

    // Validate & sanitize inputs
    if (typeof title !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Title and message must be strings" },
        { status: 400 }
      )
    }

    const cleanTitle = sanitizeInput(title).slice(0, TITLE_MAX_LENGTH)
    const cleanMessage = sanitizeInput(message).slice(0, BODY_MAX_LENGTH)

    if (!cleanTitle || !cleanMessage) {
      return NextResponse.json(
        { error: "Title and message required" },
        { status: 400 }
      )
    }

    // Validate URL (only relative paths allowed)
    let cleanUrl = "/"
    if (typeof url === "string" && url.length > 0 && url.length <= URL_MAX_LENGTH) {
      cleanUrl = URL_REGEX.test(url) ? url : "/"
    }

    const subscriptions = await prisma.pushSubscription.findMany()

    const payload: PushPayload = {
      title: cleanTitle,
      body: cleanMessage,
      url: cleanUrl,
      icon: "/icon-192x192.png",
    }

    let sent = 0
    let failed = 0
    const staleEndpoints: string[] = []

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await sendPushNotification(sub, payload)
          sent++
        } catch (error: unknown) {
          failed++
          const statusCode = (error as { statusCode?: number })?.statusCode
          if (statusCode === 410 || statusCode === 404) {
            staleEndpoints.push(sub.endpoint)
          }
        }
      })
    )

    if (staleEndpoints.length > 0) {
      await prisma.pushSubscription.deleteMany({
        where: { endpoint: { in: staleEndpoints } },
      })
    }

    return NextResponse.json({
      success: true,
      stats: {
        total: subscriptions.length,
        sent,
        failed,
        cleaned: staleEndpoints.length,
      },
    })
  } catch (error) {
    console.error("Send notification error:", error)
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    )
  }
}
