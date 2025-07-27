import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { tasks } from '@/lib/airtable/tasks'
import { volunteers } from '@/lib/airtable/volunteers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    // 🔐 Security check
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

    console.log('🆔 Fetching missions for volunteer ID:', volunteerId)

    // Get volunteer data to extract mission IDs
    const volunteer = await volunteers.getById(volunteerId)

    if (!volunteer) {
      logger.warn(`Volunteer not found for missions: ${volunteerId}`)
      return NextResponse.json(
        { error: 'Volunteer not found' },
        { status: 404, headers }
      )
    }

    // Extract mission IDs from volunteer data
    const missionIds = volunteer.fields.missions || volunteer.fields.tasks || volunteer.fields.assignedTasks || []
    console.log('📋 Mission IDs from volunteer:', missionIds)

    if (!Array.isArray(missionIds) || missionIds.length === 0) {
      console.log('📋 No missions found for volunteer')
      return NextResponse.json([], { headers })
    }

    // Get missions by IDs
    const missions = await tasks.getByIds(missionIds)

    console.log('📋 Missions found:', missions?.length || 0)

    logger.info(`Volunteer missions accessed by admin: ${token.email}`, {
      volunteerId,
      missionCount: missions?.length || 0
    })

    return NextResponse.json(missions || [], { headers })
  } catch (err: unknown) {
    logger.error('Error fetching volunteer missions', err)
    return NextResponse.json(
      { error: 'Failed to fetch missions', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500, headers }
    )
  }
}