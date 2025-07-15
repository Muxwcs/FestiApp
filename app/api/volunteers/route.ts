import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { volunteers } from "@/lib/airtable"

export async function GET(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(req)
    if (error) {
      logger.warn("Unauthorized access attempt to /api/volunteers")
      return error
    }

    const volunteersData = await volunteers.getAll({
      view: "Grid view",
      maxRecords: 200 // Adjust as needed
    })

    logger.info(`Volunteers data accessed by admin: ${token.email}`, {
      count: volunteersData.length
    })

    return NextResponse.json(volunteersData, { headers })
  } catch (err: unknown) {
    logger.error("Error in /api/volunteers:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

export async function POST(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(req)
    if (error) {
      logger.warn("Unauthorized create attempt to /api/volunteers")
      return error
    }

    const volunteerData = await req.json()

    const newVolunteer = await volunteers.createOne(volunteerData)

    logger.info(`Volunteer created by admin: ${token.email}`, {
      volunteerId: newVolunteer.id
    })

    return NextResponse.json(newVolunteer, { status: 201, headers })
  } catch (err: unknown) {
    logger.error("Error creating volunteer:", err)
    return NextResponse.json(
      { error: "Failed to create volunteer" },
      { status: 500, headers }
    )
  }
}