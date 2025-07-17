import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors } from "@/lib/airtable"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sector: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.sector

    if (!sectorId) {
      return NextResponse.json(
        { error: "Sector ID is required" },
        { status: 400, headers }
      )
    }

    const sector = await sectors.getById(sectorId)

    if (!sector) {
      logger.warn(`Sector not found: ${sectorId}`)
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404, headers }
      )
    }

    logger.info(`Sector details accessed by admin: ${token.email}`, {
      sectorId,
      volunteerEmail: sector.fields.email
    })

    return NextResponse.json(sector, { headers })
  } catch (err: unknown) {
    logger.error("Error in sector details API", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sector: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      logger.warn("Unauthorized update attempt")
      return error
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.sector
    const updateData = await request.json()

    // FIX: Pass only the fields data, not wrapped in another object
    const fieldsData = updateData.fields || updateData

    // Pass only fieldsData, not wrapped in { id, fields }
    const updatedVolunteer = await sectors.updateOne(sectorId, fieldsData)

    logger.info(`Sector updated by admin: ${token.email}`, {
      sectorId,
      updatedFields: Object.keys(fieldsData)
    })

    return NextResponse.json(updatedVolunteer, { headers })
  } catch (err: unknown) {
    logger.error("Error updating sector", err)
    return NextResponse.json(
      { error: "Failed to update sector" },
      { status: 500, headers }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sector: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) {
      return error
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.sector

    await sectors.deleteOne(sectorId)

    logger.warn(`Sector deleted by admin: ${token.email}`, { sectorId })

    return NextResponse.json(
      { message: "Sector deleted successfully" },
      { headers }
    )
  } catch (err: unknown) {
    logger.error("Error deleting sector", err)
    return NextResponse.json(
      { error: "Failed to delete sector" },
      { status: 500, headers }
    )
  }
}