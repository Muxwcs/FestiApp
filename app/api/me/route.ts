import { NextRequest, NextResponse } from "next/server"
import { getUserByFirebaseUid } from "@/lib/firebase-airtable"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"

export async function GET(req: NextRequest) {
  try {
    const { token, error } = await requireAuth(req)
    if (error) {
      logger.warn("Unauthorized access attempt to /api/me")
      return error
    }

    const user = await getUserByFirebaseUid(token.sub!)
    if (!user) {
      logger.error(`User not found for token.sub: ${token.sub}`)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    logger.info(`User profile accessed: ${user.email}`)
    return NextResponse.json(user)
  } catch (err) {
    logger.error("Error in /api/me:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}