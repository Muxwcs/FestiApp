import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { VolunteerDetail } from "./volunteer-detail"

const VolunteerPage = async ({ params }: { params: Promise<{ benevole: string }> }) => {
  await isAdmin()
  const { benevole: volunteerId } = await params

  const volunteer = await prisma.user.findUnique({
    where: { id: volunteerId },
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
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
      affectations: {
        include: {
          timeslot: true,
          sector: { select: { id: true, name: true, color: true } },
        },
        orderBy: { timeslot: { dateStart: "asc" } },
      },
      missionAssignments: {
        include: {
          mission: true,
        },
        orderBy: { mission: { dateStart: "asc" } },
      },
      referentSectors: {
        include: { sector: { select: { id: true, name: true, color: true } } },
      },
    },
  })

  if (!volunteer) notFound()

  // Serialize dates
  const serialized = {
    ...volunteer,
    lastLoginAt: volunteer.lastLoginAt?.toISOString() ?? null,
    createdAt: volunteer.createdAt.toISOString(),
    updatedAt: volunteer.updatedAt.toISOString(),
    affectations: volunteer.affectations.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
      timeslot: {
        ...a.timeslot,
        dateStart: a.timeslot.dateStart?.toISOString() ?? null,
        dateEnd: a.timeslot.dateEnd?.toISOString() ?? null,
        createdAt: a.timeslot.createdAt.toISOString(),
        updatedAt: a.timeslot.updatedAt.toISOString(),
      },
    })),
    missionAssignments: volunteer.missionAssignments.map((ma) => ({
      id: ma.id,
      mission: {
        ...ma.mission,
        dateStart: ma.mission.dateStart.toISOString(),
        dateEnd: ma.mission.dateEnd.toISOString(),
        createdAt: ma.mission.createdAt.toISOString(),
        updatedAt: ma.mission.updatedAt.toISOString(),
      },
    })),
  }

  return (
    <div className="p-0 sm:p-6 lg:p-8">
      <VolunteerDetail volunteer={serialized} />
    </div>
  )
}

export default VolunteerPage
