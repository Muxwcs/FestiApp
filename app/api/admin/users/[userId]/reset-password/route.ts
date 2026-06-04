import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { createSecureHeaders, validateId } from "@/lib/security"
import { logger } from "@/lib/logger"
import crypto from "crypto"

/**
 * POST /api/admin/users/[userId]/reset-password
 * Admin resets a user's password → generates new temp password
 * Also unlocks the account if it was locked
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { userId } = await params
    const id = validateId(userId)

    const tempPassword = crypto.randomBytes(12).toString("base64url")
    const hashedPassword = await hash(tempPassword, 12)

    const user = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
      select: { id: true, email: true },
    })

    logger.warn(`Password reset by admin ${session.user.email}`, {
      targetUserId: user.id,
      targetEmail: user.email,
    })

    return NextResponse.json(
      {
        temporaryPassword: tempPassword,
        message: "Mot de passe réinitialisé. Partagez le nouveau mot de passe avec l'utilisateur.",
      },
      { headers }
    )
  } catch (err) {
    logger.error("Error resetting password:", err)
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500, headers }
    )
  }
}
