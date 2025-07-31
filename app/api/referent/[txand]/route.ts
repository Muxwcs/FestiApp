import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors } from "@/lib/airtable"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.airtableId) {
      logger.warn("Unauthorized access attempt to /api/referent/[txand]")
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401, headers }
      )
    }

    const isAdmin = session.user.role === 'admin'
    const isReferent = session.user.isReferent

    if (!isAdmin && !isReferent) {
      logger.warn(`Insufficient permissions for sector access: ${session.user.email}`)
      return NextResponse.json(
        { error: "Admin or referent access required" },
        { status: 403, headers }
      )
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.txand

    if (!sectorId) {
      return NextResponse.json(
        { error: "Sector ID is required" },
        { status: 400, headers }
      )
    }

    console.log("🔍 Fetching sector:", sectorId, "for user:", session.user.email)

    // ✅ Get the sector
    const sector = await sectors.getById(sectorId)

    if (!sector) {
      logger.warn(`Sector not found: ${sectorId}`)
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404, headers }
      )
    }

    // ✅ For referents (non-admin), verify they can access this sector
    if (!isAdmin) {
      const referents = sector.fields?.referent
      let canAccess = false

      console.log("🔍 Checking access for referent:", {
        userAirtableId: session.user.airtableId,
        sectorReferents: referents
      })

      if (Array.isArray(referents)) {
        canAccess = referents.includes(session.user.airtableId)
      } else if (typeof referents === 'string') {
        canAccess = referents === session.user.airtableId
      }

      if (!canAccess) {
        logger.warn(`Referent accessing unauthorized sector: ${session.user.email}`, {
          sectorId,
          userAirtableId: session.user.airtableId,
          sectorReferents: referents
        })
        return NextResponse.json(
          { error: "You can only access sectors you're responsible for" },
          { status: 403, headers }
        )
      }

      console.log("✅ Access granted for referent")
    }

    logger.info(`Sector details accessed: ${session.user.email}`, {
      sectorId,
      accessType: isAdmin ? 'admin' : 'referent'
    })

    return NextResponse.json(sector, { headers })

  } catch (err: unknown) {
    logger.error("Error in referent sector details API", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

// ✅ Allow referents to update their own sectors
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.airtableId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401, headers }
      )
    }

    const isAdmin = session.user.role === 'admin'
    const isReferent = session.user.isReferent

    if (!isAdmin && !isReferent) {
      return NextResponse.json(
        { error: "Admin or referent access required" },
        { status: 403, headers }
      )
    }

    const resolvedParams = await params
    const sectorId = resolvedParams.txand
    const updates = await request.json()

    console.log("🔄 Updating referent sector:", sectorId, updates)

    // ✅ Get and verify sector access
    const sector = await sectors.getById(sectorId)

    if (!sector) {
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404, headers }
      )
    }

    // ✅ For referents, verify they can modify this sector
    if (!isAdmin) {
      const referents = sector.fields?.referent
      let canModify = false

      if (Array.isArray(referents)) {
        canModify = referents.includes(session.user.airtableId)
      } else if (typeof referents === 'string') {
        canModify = referents === session.user.airtableId
      }

      if (!canModify) {
        logger.warn(`Unauthorized sector modification attempt: ${session.user.email}`, {
          sectorId,
          userAirtableId: session.user.airtableId
        })
        return NextResponse.json(
          { error: "You can only modify sectors you're responsible for" },
          { status: 403, headers }
        )
      }
    }

    // ✅ Perform update
    const updatedSector = await sectors.updateOne(sectorId, updates)

    logger.info(`Sector updated by referent: ${session.user.email}`, {
      sectorId,
      isAdmin
    })

    return NextResponse.json(updatedSector, { headers })

  } catch (err: unknown) {
    logger.error("❌ Error updating sector via referent API:", err)
    return NextResponse.json(
      { error: "Failed to update sector" },
      { status: 500, headers }
    )
  }
}