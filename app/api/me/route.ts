import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { volunteers } from "@/lib/airtable"

export async function GET(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAuth(req)
    if (error) {
      logger.warn("Unauthorized access attempt to /api/me")
      return error
    }

    const user = await volunteers.getByFirebaseUid(token.sub!)

    if (!user) {
      logger.error(`User not found for token.sub: ${token.sub}`)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers }
      )
    }

    logger.info(`User profile accessed: ${user.fields.email}`)
    return NextResponse.json(user, { headers })
  } catch (err) {
    logger.error("Error in /api/me:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

export async function PUT(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAuth(req)
    if (error) {
      logger.warn("Unauthorized update attempt to /api/me")
      return error
    }

    const updateData = await req.json()

    // First, get the user to find their record ID
    const user = await volunteers.getByFirebaseUid(token.sub!)

    if (!user) {
      logger.error(`User not found for token.sub: ${token.sub}`)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers }
      )
    }

    // Update the user record
    const updatedUser = await volunteers.updateOne(user.id, updateData)

    logger.info(`User profile updated: ${user.fields.email}`, {
      userId: user.id,
      updatedFields: Object.keys(updateData)
    })

    return NextResponse.json(updatedUser, { headers })
  } catch (err) {
    logger.error("Error updating user profile:", err)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500, headers }
    )
  }
}