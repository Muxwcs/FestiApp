import { NextRequest, NextResponse } from "next/server"
import { requireAdmin, requireAdminOrReferent } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateInput } from "@/lib/security"
import { z } from "zod"

export async function GET(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdminOrReferent()
    if (error) return error

    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "50")))
    const search = searchParams.get("search")?.trim() || ""
    const status = searchParams.get("status") || "all"
    const sortBy = searchParams.get("sortBy") || "name"
    const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" as const : "asc" as const

    // Build Prisma where clause
    const where: Record<string, unknown> = { isActive: true }

    if (status === "referent") {
      where.isReferent = true
    } else if (status === "inactive") {
      where.isActive = false
    }

    if (search && search.length >= 2) {
      const sanitized = validateInput(search)
      if (sanitized) {
        where.OR = [
          { name: { contains: sanitized, mode: "insensitive" } },
          { firstname: { contains: sanitized, mode: "insensitive" } },
          { surname: { contains: sanitized, mode: "insensitive" } },
          { email: { contains: sanitized, mode: "insensitive" } },
        ]
      }
    }

    // Map sortBy to Prisma fields
    const orderByMap: Record<string, string> = {
      name: "name", email: "email", created: "createdAt", status: "status",
    }
    const orderField = orderByMap[sortBy] || "name"

    const [allVolunteers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: where as any,
        orderBy: { [orderField]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: { select: { affectations: true, missionAssignments: true } },
        },
      }),
      prisma.user.count({ where: where as any }),
    ])

    // Wrap in Airtable-compatible format for frontend backward compat
    const enrichedVolunteers = allVolunteers.map((v) => {
      const { password: _, ...safe } = v
      const now = new Date()
      const accountAge = Math.floor((now.getTime() - v.createdAt.getTime()) / (1000 * 60 * 60 * 24))

      return {
        id: v.id,
        fields: {
          ...safe,
          assignedTxands: [], // Compat
        },
        createdTime: v.createdAt.toISOString(),
        metadata: {
          accountAge,
          isNewVolunteer: accountAge <= 30,
          isExperienced: accountAge > 365,
          totalTasks: v._count.affectations + v._count.missionAssignments,
          hasActiveTasks: v._count.affectations > 0,
          profileCompleteness: [v.name, v.surname, v.email, v.phone].filter(Boolean).length * 25,
          isProfileComplete: [v.name, v.surname, v.email, v.phone].filter(Boolean).length >= 3,
          displayName: v.name || v.firstname || "Sans nom",
          initials: (v.name || v.firstname || "S").charAt(0).toUpperCase() + (v.surname || "N").charAt(0).toUpperCase(),
          status: v.status || "Actif",
          isReferent: v.isReferent,
          contactMethods: [v.email && "Email", v.phone && "Téléphone"].filter(Boolean),
        },
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      volunteers: enrichedVolunteers,
      pagination: {
        currentPage: page, totalPages, totalCount, limit,
        hasNextPage: page < totalPages, hasPrevPage: page > 1,
        startIndex: (page - 1) * limit + 1,
        endIndex: Math.min(page * limit, totalCount),
      },
      filters: { search, status, sortBy, sortOrder, includeInactive: false },
      summary: {
        activeVolunteers: totalCount,
        totalVolunteers: totalCount,
        referents: await prisma.user.count({ where: { isReferent: true, isActive: true } }),
        newVolunteers: await prisma.user.count({
          where: { isActive: true, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
        }),
      },
    }, { headers })
  } catch (err) {
    logger.error("Error in /api/volunteers:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

const createVolunteerSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(100).optional(),
  firstname: z.string().max(100).optional(),
  surname: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  skills: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  notes: z.string().max(2000).optional(),
})

export async function POST(req: NextRequest) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const body = await req.json()
    const parsed = createVolunteerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten().fieldErrors }, { status: 400, headers })
    }

    const { email, ...data } = parsed.data
    const { hash } = await import("bcryptjs")
    const crypto = await import("crypto")
    const tempPassword = crypto.randomBytes(12).toString("base64url")
    const hashedPassword = await hash(tempPassword, 12)

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "BENEVOLE",
        isActive: true,
        status: "Actif",
        ...data,
      },
    })

    const { password: _, ...safe } = newUser

    logger.info(`Volunteer created by admin ${session.user.email}`, { newUserId: newUser.id })

    return NextResponse.json(
      { id: newUser.id, fields: safe, temporaryPassword: tempPassword },
      { status: 201, headers }
    )
  } catch (err) {
    logger.error("Error creating volunteer:", err)
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500, headers })
  }
}
