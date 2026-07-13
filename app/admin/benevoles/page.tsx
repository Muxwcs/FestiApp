import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { VolunteerList } from "./volunteer-list"

const VolunteersPage = async () => {
  const session = await isAdmin()

  const volunteers = await prisma.user.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
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
      createdAt: true,
      _count: {
        select: { affectations: true, missionAssignments: true },
      },
    },
  })

  // --- Stats par jour ---
  const FRIDAY_START = new Date("2026-07-31T00:00:00+02:00")
  const FRIDAY_END = new Date("2026-08-01T02:00:00+02:00")
  const SATURDAY_END = new Date("2026-08-02T02:00:00+02:00")

  const [fridayTimeslots, saturdayTimeslots, adminUsers] = await Promise.all([
    prisma.timeslot.findMany({
      where: { dateStart: { gte: FRIDAY_START, lt: FRIDAY_END } },
      select: {
        sectorId: true,
        dateStart: true,
        dateEnd: true,
        affectations: { select: { volunteerId: true } },
        referents: { select: { userId: true } },
      },
    }),
    prisma.timeslot.findMany({
      where: { dateStart: { gte: FRIDAY_END, lt: SATURDAY_END } },
      select: {
        sectorId: true,
        dateStart: true,
        dateEnd: true,
        affectations: { select: { volunteerId: true } },
        referents: { select: { userId: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: "ADMIN", isActive: true },
      select: { id: true },
    }),
  ])

  // Référents des secteurs impliqués chaque jour
  const fridaySectorIds = [...new Set(fridayTimeslots.map((t) => t.sectorId))]
  const saturdaySectorIds = [...new Set(saturdayTimeslots.map((t) => t.sectorId))]

  const [fridaySectorRefs, saturdaySectorRefs] = await Promise.all([
    fridaySectorIds.length > 0
      ? prisma.sectorReferent.findMany({
        where: { sectorId: { in: fridaySectorIds } },
        select: { userId: true },
      })
      : [],
    saturdaySectorIds.length > 0
      ? prisma.sectorReferent.findMany({
        where: { sectorId: { in: saturdaySectorIds } },
        select: { userId: true },
      })
      : [],
  ])

  const adminSet = new Set<string>(adminUsers.map((a) => a.id))

  const collectStats = (
    timeslots: typeof fridayTimeslots,
    sectorRefs: { userId: string }[]
  ) => {
    const referentSet = new Set<string>([
      ...timeslots.flatMap((t) => t.referents.map((r) => r.userId)),
      ...sectorRefs.map((r) => r.userId),
    ])

    const benevoleSet = new Set<string>(
      timeslots.flatMap((t) => t.affectations.map((a) => a.volunteerId))
    )

    // Déduplication par priorité : admin > référent > bénévole
    const countedAdmins = adminSet.size
    const countedReferents = [...referentSet].filter((id) => !adminSet.has(id)).length
    const countedBenevoles = [...benevoleSet].filter(
      (id) => !adminSet.has(id) && !referentSet.has(id)
    ).length

    return {
      admins: countedAdmins,
      referents: countedReferents,
      benevoles: countedBenevoles,
      total: countedAdmins + countedReferents + countedBenevoles,
    }
  }

  // --- Heures par bénévole par jour ---
  const volunteerHours = new Map<string, { friday: number; saturday: number }>()

  const addHours = (
    timeslots: typeof fridayTimeslots,
    day: "friday" | "saturday"
  ) => {
    for (const ts of timeslots) {
      if (!ts.dateStart || !ts.dateEnd) continue
      const hours =
        (ts.dateEnd.getTime() - ts.dateStart.getTime()) / (1000 * 60 * 60)
      for (const aff of ts.affectations) {
        const cur = volunteerHours.get(aff.volunteerId) || {
          friday: 0,
          saturday: 0,
        }
        cur[day] += hours
        volunteerHours.set(aff.volunteerId, cur)
      }
    }
  }

  addHours(fridayTimeslots, "friday")
  addHours(saturdayTimeslots, "saturday")

  const dayStats = {
    friday: collectStats(fridayTimeslots, fridaySectorRefs),
    saturday: collectStats(saturdayTimeslots, saturdaySectorRefs),
  }

  const volunteersWithHours = volunteers.map((v) => ({
    ...v,
    fridayHours: volunteerHours.get(v.id)?.friday ?? 0,
    saturdayHours: volunteerHours.get(v.id)?.saturday ?? 0,
  }))

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <VolunteerList
        volunteers={volunteersWithHours}
        userName={session.user.name}
        dayStats={dayStats}
      />
    </div>
  )
}

export default VolunteersPage