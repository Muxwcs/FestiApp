import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { compare, hash } from "bcryptjs"
import { z } from "zod"
import { createSecureHeaders } from "@/lib/security"
import { logger } from "@/lib/logger"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8, "8 caractères minimum")
    .max(128)
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[a-z]/, "Au moins une minuscule")
    .regex(/[0-9]/, "Au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial"),
})

/**
 * PUT /api/me/password — Change own password
 */
export async function PUT(request: Request) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = changePasswordSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const { currentPassword, newPassword } = parsed.data

    // Fetch current hash
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, password: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404, headers }
      )
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: "Mot de passe actuel incorrect" },
        { status: 403, headers }
      )
    }

    // Prevent reusing the same password
    const isSame = await compare(newPassword, user.password)
    if (isSame) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit être différent" },
        { status: 400, headers }
      )
    }

    // Hash and save
    const hashedPassword = await hash(newPassword, 12)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    logger.info(`Password changed by user ${user.email}`, { userId: user.id })

    return NextResponse.json(
      { message: "Mot de passe modifié avec succès" },
      { headers }
    )
  } catch (err) {
    logger.error("Error changing password:", err)
    return NextResponse.json(
      { error: "Erreur lors du changement de mot de passe" },
      { status: 500, headers }
    )
  }
}
