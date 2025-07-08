import { NextRequest, NextResponse } from "next/server"
import { base } from "@/lib/firebase-airtable"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { VolunteerRecord } from "@/types/user.interface"

export async function GET(req: NextRequest) {
  try {
    const { token, error } = await requireAdmin(req)
    if (error) {
      logger.warn("Unauthorized access attempt to /api/volunteers")
      return error
    }

    const volunteers: unknown[] | VolunteerRecord = []

    await new Promise<void>((resolve, reject) => {
      base("Membres")
        .select({ view: "Grid view" })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              volunteers.push({
                id: record.id,
                ...record.fields,
              })
            })
            fetchNextPage()
          },
          (err) => {
            if (err) {
              logger.error("Airtable error:", err)
              reject(err)
            } else {
              resolve()
            }
          }
        )
    })

    logger.info(`Volunteers data accessed by admin: ${token.email}`, { count: volunteers.length })
    return NextResponse.json(volunteers)
  } catch (err: unknown) {
    logger.error("Error in /api/volunteers:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}