import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { z } from "zod"
import { createSecureHeaders } from "@/lib/security"
import { logger } from "@/lib/logger"
import crypto from "crypto"

const createUserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(100).optional(),
  firstname: z.string().max(100).optional(),
  surname: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  role: z.enum(["ADMIN", "BENEVOLE"]).default("BENEVOLE"),
  isReferent: z.boolean().default(false),
  skills: z.array(z.string()).default([]),
  availability: z.array(z.string()).default([]),
})

/**
 * GET /api/admin/users — List all users (admin only)
 */
export async function GET() {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdmin()
    if (error) return error

    const users = await prisma.user.findMany({
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
        skills: true,
        availability: true,
        lastLoginAt: true,
        createdAt: true,
        _count: {
          select: {
            affectations: true,
            missionAssignments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(users, { headers })
  } catch (err) {
    logger.error("Error listing users:", err)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500, headers }
    )
  }
}

/**
 * POST /api/admin/users — Create a new user (admin only)
 * Generates a random temporary password. Admin shares it with the user.
 */
export async function POST(request: Request) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const body = await request.json()
    const parsed = createUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400, headers }
      )
    }

    const { email, ...userData } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409, headers }
      )
    }

    // Generate a secure temporary password
    const tempPassword = crypto.randomBytes(12).toString("base64url")
    const hashedPassword = await hash(tempPassword, 12)

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        isActive: true,
        status: "Actif",
        ...userData,
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstname: true,
        role: true,
        isReferent: true,
      },
    })

    logger.info(`User created by admin ${session.user.email}`, {
      newUserId: user.id,
      newUserEmail: user.email,
      role: user.role,
    })

    // Return the temp password — admin shares it with the user
    return NextResponse.json(
      {
        user,
        temporaryPassword: tempPassword,
        message: "Compte créé. Partagez le mot de passe temporaire avec l'utilisateur.",
      },
      { status: 201, headers }
    )
  } catch (err) {
    logger.error("Error creating user:", err)
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500, headers }
    )
  }
}
