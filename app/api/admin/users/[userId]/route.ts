import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { createSecureHeaders, validateId } from "@/lib/security"
import { logger } from "@/lib/logger"

const updateUserSchema = z.object({
  name: z.string().max(100).optional(),
  firstname: z.string().max(100).optional(),
  surname: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  role: z.enum(["ADMIN", "BENEVOLE"]).optional(),
  isReferent: z.boolean().optional(),
  isActive: z.boolean().optional(),
  status: z.string().max(50).optional(),
  skills: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  notes: z.string().max(2000).optional(),
})

/**
 * GET /api/admin/users/[userId] — Get user details (admin only)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { userId } = await params
    const id = validateId(userId)

    const user = await prisma.user.findUnique({
      where: { id },
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
        notes: true,
        skills: true,
        availability: true,
        failedLoginAttempts: true,
        lockedUntil: true,
        lastLoginAt: true,
        lastLoginIp: true,
        createdAt: true,
        updatedAt: true,
        affectations: {
          include: { timeslot: true, sector: true },
        },
        missionAssignments: {
          include: { mission: true },
        },
        referentSectors: {
          include: { sector: true },
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
    logger.error("Error fetching user:", err)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500, headers }
    )
  }
}

/**
 * PUT /api/admin/users/[userId] — Update user (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { userId } = await params
    const id = validateId(userId)

    const body = await request.json()
    const parsed = updateUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        email: true,
        name: true,
        firstname: true,
        role: true,
        isReferent: true,
        isActive: true,
      },
    })

    logger.info(`User updated by admin ${session.user.email}`, {
      targetUserId: user.id,
      updatedFields: Object.keys(parsed.data),
    })

    return NextResponse.json(user, { headers })
  } catch (err) {
    logger.error("Error updating user:", err)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500, headers }
    )
  }
}

/**
 * DELETE /api/admin/users/[userId] — Deactivate user (admin only, soft delete)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { userId } = await params
    const id = validateId(userId)

    // Prevent self-deactivation
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Impossible de désactiver votre propre compte" },
        { status: 400, headers }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: { id: true, email: true },
    })

    logger.warn(`User deactivated by admin ${session.user.email}`, {
      targetUserId: user.id,
      targetEmail: user.email,
    })

    return NextResponse.json(
      { message: "Compte désactivé" },
      { headers }
    )
  } catch (err) {
    logger.error("Error deactivating user:", err)
    return NextResponse.json(
      { error: "Erreur lors de la désactivation" },
      { status: 500, headers }
    )
  }
}
