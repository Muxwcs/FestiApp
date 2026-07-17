import { checkSectorAccess } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ReferentSectorDetail } from "./referent-sector-detail"

const ReferentSectorPage = async ({ params }: { params: Promise<{ txand: string }> }) => {
  const { txand: sectorId } = await params
  const { session, accessLevel } = await checkSectorAccess(sectorId)

  const canSeeAllTimeslots = accessLevel === "admin" || accessLevel === "sector_referent"


  const sector = await prisma.sector.findUnique({
    where: { id: sectorId },
    include: {
      referents: {
        include: {
          user: { select: { id: true, name: true, firstname: true, email: true, phone: true } },
        },
      },
      timeslots: {
        orderBy: { dateStart: "asc" },
        where: canSeeAllTimeslots ? {} : { referents: { some: { userId: session.user.id! } } },
        include: {
          _count: { select: { affectations: true } },
          affectations: {
            include: {
              volunteer: {
                select: {
                  id: true, name: true, firstname: true, surname: true,
                  email: true, phone: true, status: true, skills: true, availability: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!sector) notFound()

  // Build volunteer list with their timeslot assignments + presence
  const volunteerMap = new Map<string, {
    volunteer: typeof sector.timeslots[0]["affectations"][0]["volunteer"]
    assignments: {
      affectationId: string
      timeslotId: string
      timeslotName: string
      presence: "PRESENT" | "ABSENT" | null
      checkedAt: string | null
    }[]
  }>()

  sector.timeslots.forEach((ts) => {
    ts.affectations.forEach((aff) => {
      const assignment = {
        affectationId: aff.id,
        timeslotId: ts.id,
        timeslotName: ts.name,
        presence: aff.presence as "PRESENT" | "ABSENT" | null,
        checkedAt: aff.checkedAt?.toISOString() ?? null,
      }
      const existing = volunteerMap.get(aff.volunteer.id)
      if (existing) {
        existing.assignments.push(assignment)
      } else {
        volunteerMap.set(aff.volunteer.id, {
          volunteer: aff.volunteer,
          assignments: [assignment],
        })
      }
    })
  })

  // Recalculate affectations count from visible timeslots only
  const totalAffectations = sector.timeslots.reduce((sum, ts) => sum + ts._count.affectations, 0)

  // Serialize dates
  const serialized = {
    id: sector.id,
    name: sector.name,
    description: sector.description,
    color: sector.color,
    status: sector.status,
    skills: sector.skills,
    createdAt: sector.createdAt.toISOString(),
    updatedAt: sector.updatedAt.toISOString(),
    referents: sector.referents.map((r) => ({
      id: r.id,
      user: r.user,
    })),
    timeslots: sector.timeslots.map((ts) => ({
      id: ts.id,
      name: ts.name,
      dateStart: ts.dateStart?.toISOString() ?? null,
      dateEnd: ts.dateEnd?.toISOString() ?? null,
      totalVolunteers: ts.totalVolunteers,
      assignedCount: ts._count.affectations,
    })),
    totalAffectations,
    volunteers: Array.from(volunteerMap.values()),
  }

  return (
    <div className="p-0 sm:p-6 lg:p-8">
      <ReferentSectorDetail sector={serialized} />
    </div>
  )
}

export default ReferentSectorPage
