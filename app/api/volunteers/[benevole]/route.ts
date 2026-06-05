import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import { createSecureHeaders, validateId } from "@/lib/security"
import { z } from "zod"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { benevole } = await params
    const volunteerId = validateId(benevole)

    const volunteer = await prisma.user.findUnique({
      where: { id: volunteerId },
      include: {
        affectations: { include: { timeslot: true, sector: true } },
        missionAssignments: { include: { mission: true } },
        referentSectors: { include: { sector: true } },
      },
    })

    if (!volunteer) {
      return NextResponse.json({ error: "Bénévole non trouvé" }, { status: 404, headers })
    }

    const { password: _, ...safe } = volunteer
    const now = new Date()
    const accountAge = Math.floor((now.getTime() - volunteer.createdAt.getTime()) / (1000 * 60 * 60 * 24))

    // Backward-compat wrapper
    return NextResponse.json({
      id: volunteer.id,
      fields: safe,
      createdAt: volunteer.createdAt.toISOString(),
      enriched: {
        profile: {
          completeness: [volunteer.name, volunteer.surname, volunteer.email, volunteer.phone].filter(Boolean).length * 25,
          isComplete: [volunteer.name, volunteer.surname, volunteer.email, volunteer.phone].filter(Boolean).length >= 3,
          missingFields: [
            !volunteer.name && "Nom",
            !volunteer.firstname && "Prénom",
            !volunteer.email && "Email",
            !volunteer.phone && "Téléphone",
          ].filter(Boolean),
        },
        contact: {
          hasPhone: !!volunteer.phone,
          hasEmail: !!volunteer.email,
          methods: [volunteer.email && "Email", volunteer.phone && "Téléphone"].filter(Boolean),
        },
        activity: {
          assignmentsCount: volunteer.affectations.length,
          missionsCount: volunteer.missionAssignments.length,
          totalTasks: volunteer.affectations.length + volunteer.missionAssignments.length,
          isActive: volunteer.affectations.length > 0,
          hasAssignments: volunteer.affectations.length > 0,
          hasMissions: volunteer.missionAssignments.length > 0,
        },
        account: {
          ageInDays: accountAge,
          createdAt: volunteer.createdAt,
          isNewVolunteer: accountAge <= 30,
          isExperienced: accountAge > 365,
          lastModified: volunteer.updatedAt,
        },
        status: {
          current: volunteer.status || "Actif",
          isActive: volunteer.isActive,
          isReferent: volunteer.isReferent,
          role: volunteer.role,
        },
        skills: {
          list: volunteer.skills,
          count: volunteer.skills.length,
          hasSkills: volunteer.skills.length > 0,
        },
      },
    }, { headers })
  } catch (err) {
    logger.error("Error fetching volunteer details:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers })
  }
}

const updateSchema = z.object({
  name: z.string().max(100).optional(),
  firstname: z.string().max(100).optional(),
  surname: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().max(255).optional(),
  status: z.string().max(50).optional(),
  isReferent: z.boolean().optional(),
  isActive: z.boolean().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  notes: z.string().max(2000).optional(),
}).passthrough()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { benevole } = await params
    const volunteerId = validateId(benevole)
    const body = await request.json()

    // Accept both { fields: {...} } and flat object
    const fieldsData = body.fields || body
    const parsed = updateSchema.safeParse(fieldsData)
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400, headers })
    }

    const updated = await prisma.user.update({
      where: { id: volunteerId },
      data: parsed.data,
    })

    const { password: _, ...safe } = updated

    logger.info(`Volunteer updated by ${session.user.email}`, {
      volunteerId,
      updatedFields: Object.keys(parsed.data),
    })

    return NextResponse.json({ id: updated.id, fields: safe }, { headers })
  } catch (err) {
    logger.error("Error updating volunteer:", err)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500, headers })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ benevole: string }> }
) {
  const headers = createSecureHeaders()

  try {
    const { session, error } = await requireAdmin()
    if (error) return error

    const { benevole } = await params
    const volunteerId = validateId(benevole)

    // Soft delete
    await prisma.user.update({
      where: { id: volunteerId },
      data: { isActive: false },
    })

    logger.warn(`Volunteer deactivated by ${session.user.email}`, { volunteerId })

    return NextResponse.json({ message: "Bénévole désactivé", deletedId: volunteerId }, { headers })
  } catch (err) {
    logger.error("Error deleting volunteer:", err)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500, headers })
  }
}
