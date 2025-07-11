// import { NextRequest, NextResponse } from "next/server"
// import { base } from "@/lib/firebase-airtable"
// import { requireAdmin } from "@/lib/auth-helpers"
// import { logger } from "@/lib/logger"
// import { createSecureHeaders } from "@/lib/security"
// import type { FieldSet } from "airtable"

// type VolunteerRecord = {
//   id: string
// } & Record<string, unknown>

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { benevole: string } }
// ) {
//   const headers = createSecureHeaders()

//   try {
//     const { token, error } = await requireAdmin(request)
//     if (error) {
//       logger.warn("Unauthorized access attempt to volunteer details", { volunteerId: params.benevole })
//       return error
//     }

//     const volunteerId = params.benevole

//     if (!volunteerId) {
//       return NextResponse.json(
//         { error: "Volunteer ID is required" },
//         { status: 400, headers }
//       )
//     }

//     // Fetch specific volunteer by record ID
//     let volunteer: VolunteerRecord | null = null

//     try {
//       const record = await base("Membres").find(volunteerId)
//       volunteer = {
//         id: record.id,
//         ...record.fields,
//       }
//     } catch (airtableError) {
//       logger.error("Volunteer not found in Airtable", { volunteerId, error: airtableError })
//       return NextResponse.json(
//         { error: "Volunteer not found" },
//         { status: 404, headers }
//       )
//     }

//     logger.info(`Volunteer details accessed by admin: ${token.email}`, {
//       volunteerId,
//       volunteerEmail: volunteer.email
//     })

//     return NextResponse.json(volunteer, { headers })
//   } catch (err: unknown) {
//     logger.error("Unexpected error in volunteer details API", err)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500, headers }
//     )
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { benevole: string } }
// ) {
//   const headers = createSecureHeaders()

//   try {
//     const { token, error } = await requireAdmin(request)
//     if (error) {
//       logger.warn("Unauthorized update attempt", { volunteerId: params.benevole })
//       return error
//     }

//     const volunteerId = params.benevole
//     const updateData = await request.json()

//     // Validate and sanitize update data
//     const allowedFields = [
//       'name', 'surname', 'email', 'phone', 'role',
//       'availability', 'assignedTasks', 'status', 'skills', 'notes'
//     ]

//     const filteredData: Partial<FieldSet> = {}
//     for (const [key, value] of Object.entries(updateData)) {
//       if (allowedFields.includes(key)) {
//         filteredData[key] = value as string | number | boolean | readonly string[] | undefined
//       }
//     }

//     // Add modification metadata
//     filteredData.modifiedBy = typeof token.email === "string" ? token.email : undefined
//     filteredData.modifiedAt = new Date().toISOString()

//     const updatedRecord = await base("Membres").update([
//       {
//         id: volunteerId,
//         fields: filteredData
//       }
//     ])

//     const volunteer = {
//       id: updatedRecord[0].id,
//       ...updatedRecord[0].fields,
//     }

//     logger.info(`Volunteer updated by admin: ${token.email}`, {
//       volunteerId,
//       updatedFields: Object.keys(filteredData)
//     })

//     return NextResponse.json(volunteer, { headers })
//   } catch (err: unknown) {
//     logger.error("Error updating volunteer", err)
//     return NextResponse.json(
//       { error: "Failed to update volunteer" },
//       { status: 500, headers }
//     )
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { benevole: string } }
// ) {
//   const headers = createSecureHeaders()

//   try {
//     const { token, error } = await requireAdmin(request)
//     if (error) {
//       logger.warn("Unauthorized delete attempt", { volunteerId: params.benevole })
//       return error
//     }

//     const volunteerId = params.benevole

//     await base("Membres").destroy([volunteerId])

//     logger.warn(`Volunteer deleted by admin: ${token.email}`, { volunteerId })

//     return NextResponse.json(
//       { message: "Volunteer deleted successfully" },
//       { headers }
//     )
//   } catch (err: unknown) {
//     logger.error("Error deleting volunteer", err)
//     return NextResponse.json(
//       { error: "Failed to delete volunteer" },
//       { status: 500, headers }
//     )
//   }
// }

import { NextRequest, NextResponse } from "next/server"
import { base } from "@/lib/firebase-airtable"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { FieldSet } from "airtable"

type VolunteerRecord = {
  id: string
} & Record<string, unknown>

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

    // Fetch specific volunteer by record ID
    let volunteer: VolunteerRecord | null = null

    try {
      const record = await base("Membres").find(volunteerId)
      volunteer = {
        id: record.id,
        ...record.fields,
      }
    } catch (airtableError) {
      logger.error("Volunteer not found in Airtable", { volunteerId, error: airtableError })
      return NextResponse.json(
        { error: "Volunteer not found" },
        { status: 404, headers }
      )
    }

    logger.info(`Volunteer details accessed by admin: ${token.email}`, {
      volunteerId,
      volunteerEmail: volunteer.email
    })

    return NextResponse.json(volunteer, { headers })
  } catch (err: unknown) {
    logger.error("Unexpected error in volunteer details API", err)
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

    // Validate and sanitize update data
    const allowedFields = [
      'name', 'surname', 'email', 'phone', 'role',
      'availability', 'assignedTasks', 'status', 'skills', 'notes'
    ]

    const filteredData: Partial<FieldSet> = {}
    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key)) {
        filteredData[key] = value as string | number | boolean | readonly string[] | undefined
      }
    }

    //Add modification metadata
    filteredData.modifiedBy = typeof token.email === "string" ? token.email : undefined

    const updatedRecord = await base("Membres").update([
      {
        id: volunteerId,
        fields: filteredData
      }
    ])

    const volunteer = {
      id: updatedRecord[0].id,
      ...updatedRecord[0].fields,
    }

    logger.info(`Volunteer updated by admin: ${token.email}`, {
      volunteerId,
      updatedFields: Object.keys(filteredData)
    })

    return NextResponse.json(volunteer, { headers })
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

    await base("Membres").destroy([volunteerId])

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