import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors } from "@/lib/airtable"

export async function GET(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(req)
    if (error) {
      logger.warn("Unauthorized access attempt to /api/txands")
      return error
    }

    const sectorsData = await sectors.getAll({
      view: "Grid view",
      maxRecords: 30 // Adjust as needed
    })

    logger.info(`sectors data accessed by admin: ${token.email}`, {
      count: sectorsData.length
    })

    return NextResponse.json(sectorsData, { headers })
  } catch (err: unknown) {
    logger.error("Error in /api/sectors:", err)
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
      logger.warn("Unauthorized create attempt to /api/txands")
      return error
    }

    const sectorData = await req.json()

    const newSector = await sectors.createOne(sectorData)

    logger.info(`Sector created by admin: ${token.email}`, {
      sectorId: newSector.id
    })

    return NextResponse.json(newSector, { status: 201, headers })
  } catch (err: unknown) {
    logger.error("Error creating sector:", err)
    return NextResponse.json(
      { error: "Failed to create sector" },
      { status: 500, headers }
    )
  }
}