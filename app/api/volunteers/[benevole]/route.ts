import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { volunteers } from "@/lib/airtable"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params
    const volunteerId = resolvedParams.benevole

    if (!volunteerId) {
      return NextResponse.json(
        { error: "Volunteer ID is required" },
        { status: 400, headers }
      )
    }

    const volunteer = await volunteers.getById(volunteerId)

    if (!volunteer) {
      logger.warn(`Volunteer not found: ${volunteerId}`)
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404, headers }
      )
    }

    logger.info(`Volunteer details accessed by admin: ${token.email}`, {
      volunteerId,
      volunteerEmail: volunteer.fields.email
    })

    return NextResponse.json(volunteer, { headers })
  } catch (err: unknown) {
    logger.error("Error in volunteer details API", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      logger.warn("Unauthorized update attempt")
      return error
    }

    const resolvedParams = await params
    const volunteerId = resolvedParams.benevole
    const updateData = await request.json()

    // FIX: Pass only the fields data, not wrapped in another object
    const fieldsData = updateData.fields || updateData

    // Pass only fieldsData, not wrapped in { id, fields }
    const updatedVolunteer = await volunteers.updateOne(volunteerId, fieldsData)

    logger.info(`Volunteer updated by admin: ${token.email}`, {
      volunteerId,
      updatedFields: Object.keys(fieldsData)
    })

    return NextResponse.json(updatedVolunteer, { headers })
  } catch (err: unknown) {
    logger.error("Error updating volunteer", err)
    return NextResponse.json(
      { error: "Failed to update volunteer" },
      { status: 500, headers }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params
    const volunteerId = resolvedParams.benevole

    await volunteers.deleteOne(volunteerId)

    logger.warn(`Volunteer deleted by admin: ${token.email}`, { volunteerId })

    return NextResponse.json(
      { message: "Volunteer deleted successfully" },
      { headers }
    )
  } catch (err: unknown) {
    logger.error("Error deleting volunteer", err)
    return NextResponse.json(
      { error: "Failed to delete volunteer" },
      { status: 500, headers }
    )
  }
}