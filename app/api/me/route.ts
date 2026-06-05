// import { NextRequest, NextResponse } from "next/server"
// import { requireAuth } from "@/lib/auth-helpers"
// import { logger } from "@/lib/logger"
// import { createSecureHeaders } from "@/lib/security"
// import { volunteers } from "@/lib/airtable"
// import { getUserByFirebaseUid } from "@/lib/firebase-airtable"

// export async function GET(req: NextRequest) {
//   const headers = createSecureHeaders()

//   try {
//     const { token, error } = await requireAuth(req)
//     if (error) {
//       logger.warn("Unauthorized access attempt to /api/me")
//       return error
//     }

//     // token.sub contains the Firebase UID (from NextAuth JWT)
//     const firebaseUid = token.sub

//     const user = await getUserByFirebaseUid(firebaseUid as string)

//     if (!user) {
//       logger.warn(`User not found in Airtable for Firebase UID: ${firebaseUid}`)
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404, headers }
//       )
//     }

//     // ✅ ADD REFERENT LOGIC - Check fields.referent length
//     const referentField = user.referent || [] // Direct field access
//     const isReferent = Array.isArray(referentField) ? referentField.length > 0 : false

//     // ✅ Create enriched response
//     const enrichedUserData = {
//       ...user,
//       // Add computed fields to the main object
//       isReferent,
//       computed: {
//         isReferent,
//         referentCount: Array.isArray(referentField) ? referentField.length : 0,
//         hasAdminRole: token.role === 'admin',
//         tokenRole: token.role
//       }
//     }

//     logger.info(`User profile accessed: ${token.email}`, {
//       userId: user.id,
//       isReferent,
//       role: token.role,
//       referentCount: Array.isArray(referentField) ? referentField.length : 0
//     })
//     return NextResponse.json(enrichedUserData, { headers })
//   } catch (err) {
//     logger.error("Error in /api/me:", err)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500, headers }
//     )
//   }
// }

// export async function PUT(req: NextRequest) {
//   const headers = createSecureHeaders()

//   try {
//     const { token, error } = await requireAuth(req)
//     if (error) {
//       logger.warn("Unauthorized update attempt to /api/me")
//       return error
//     }

//     const updateData = await req.json()

//     // First, get the user to find their record ID
//     const user = await volunteers.getByFirebaseUid(token.sub!)

//     if (!user) {
//       logger.error(`User not found for token.sub: ${token.sub}`)
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404, headers }
//       )
//     }

//     // Update the user record
//     const updatedUser = await volunteers.updateOne(user.id, updateData)

//     logger.info(`User profile updated: ${user.fields.email}`, {
//       userId: user.id,
//       updatedFields: Object.keys(updateData)
//     })

//     return NextResponse.json(updatedUser, { headers })
//   } catch (err) {
//     logger.error("Error updating user profile:", err)
//     return NextResponse.json(
//       { error: "Failed to update profile" },
//       { status: 500, headers }
//     )
//   }
// }

import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { createSecureHeaders } from "@/lib/security"
import { logger } from "@/lib/logger"

/**
 * GET /api/me — Get current user profile
 */
export async function GET() {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        firstname: true,
        surname: true,
        phone: true,
        role: true,
        isReferent: true,
        isActive: true,
        status: true,
        avatar: true,
        skills: true,
        availability: true,
        notes: true,
        createdAt: true,
        referentSectors: {
          include: { sector: { select: { id: true, name: true, color: true } } },
        },
        _count: {
          select: {
            affectations: true,
            missionAssignments: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404, headers }
      )
    }

    return NextResponse.json(user, { headers })
  } catch (err) {
    logger.error("Error in /api/me:", err)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500, headers }
    )
  }
}
