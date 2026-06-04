import { checkSectorAccess } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ReferentSectorDetail } from "./referent-sector-detail"

const ReferentSectorPage = async ({ params }: { params: Promise<{ txand: string }> }) => {
  const { txand: sectorId } = await params
  await checkSectorAccess(sectorId)

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
      _count: { select: { affectations: true } },
    },
  })

  if (!sector) notFound()

  // Build volunteer list with their timeslot assignments
  const volunteerMap = new Map<string, {
    volunteer: typeof sector.timeslots[0]["affectations"][0]["volunteer"]
    timeslotNames: string[]
  }>()

  sector.timeslots.forEach((ts) => {
    ts.affectations.forEach((aff) => {
      const existing = volunteerMap.get(aff.volunteer.id)
      if (existing) {
        existing.timeslotNames.push(ts.name)
      } else {
        volunteerMap.set(aff.volunteer.id, {
          volunteer: aff.volunteer,
          timeslotNames: [ts.name],
        })
      }
    })
  })

  const volunteers = Array.from(volunteerMap.values())

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
    totalAffectations: sector._count.affectations,
    volunteers,
  }

  return (
    <div className="p-0 sm:p-6 lg:p-8">
      <ReferentSectorDetail sector={serialized} />
    </div>
  )
}

export default ReferentSectorPage
