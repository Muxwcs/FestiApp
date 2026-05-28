import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors } from "@/lib/airtable"

export async function GET() {
  const headers = createSecureHeaders()

  try {
    // ✅ Get session (no admin requirement)
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      logger.warn("Unauthorized access attempt to /api/referent/sectors")
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401, headers }
      )
    }

    // ✅ Check if user is referent or admin
    const isAdmin = session.user.role === 'admin'
    // const isReferent = session.user.isReferent || isAdmin
    const isReferent = session.user.isReferent


    if (!isReferent) {
      logger.warn(`Non-referent access attempt by: ${session.user.email}`)
      return NextResponse.json(
        { error: "Referent access required" },
        { status: 403, headers }
      )
    }

    // ✅ Fetch all sectors first
    const allSectors = await sectors.getAll({
      view: "Grid view",
      maxRecords: 100
    })

    // ✅ Filter sectors for referents (admins get all)
    let userSectors = allSectors

    if (!isAdmin) {
      // Filter to only sectors where user is referent
      userSectors = allSectors.filter(sector => {
        const referents = sector.fields?.referent

        if (!referents) return false

        // Handle array of referent IDs
        if (Array.isArray(referents)) {
          return referents.includes(session.user.airtableId)
        }

        // Handle single referent ID
        if (typeof referents === 'string') {
          return referents === session.user.airtableId
        }

        return false
      })
    }

    logger.info(`Referent sectors accessed by: ${session.user.email}`, {
      isAdmin,
      totalSectors: allSectors.length,
      userSectors: userSectors.length
    })

    return NextResponse.json(userSectors, { headers })

  } catch (err: unknown) {
    logger.error("Error in /api/referent/sectors:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

// ✅ Allow referents to update their own sectors
export async function PUT(req: NextRequest) {
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
    const isReferent = session.user.isReferent || isAdmin

    if (!isReferent) {
      return NextResponse.json(
        { error: "Referent access required" },
        { status: 403, headers }
      )
    }

    const { sectorId, updates } = await req.json()

    // ✅ Verify referent can modify this sector (unless admin)
    if (!isAdmin) {
      const sector = await sectors.getById(sectorId)

      if (!sector) {
        return NextResponse.json(
          { error: "Sector not found" },
          { status: 404, headers }
        )
      }

      const referents = sector.fields?.referent
      let canModify = false

      if (Array.isArray(referents)) {
        canModify = referents.includes(session.user.airtableId)
      } else if (typeof referents === 'string') {
        canModify = referents === session.user.airtableId
      }

      if (!canModify) {
        logger.warn(`Unauthorized sector modification attempt by: ${session.user.email}`, {
          sectorId
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
    logger.error("Error updating sector:", err)
    return NextResponse.json(
      { error: "Failed to update sector" },
      { status: 500, headers }
    )
  }
}