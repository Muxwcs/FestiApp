import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/permissions"
import { redirect } from "next/navigation"
import { DashboardContent } from "./dashboard-content"
import { MissionPriority, MissionStatus } from "@/generated/prisma/enums"

const DashboardPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/login")

  const now = new Date()

  // 1) Affectations bénévole
  const volunteerAffectations = await prisma.affectation.findMany({
    where: { volunteerId: currentUser.id, status: "VALIDE" },
    include: {
      timeslot: true,
      sector: { select: { id: true, name: true, color: true } },
    },
    orderBy: { timeslot: { dateStart: "asc" } },
  })

  // 2) Secteurs dont l'user est référent → tous les timeslots
  const referentSectors = await prisma.sectorReferent.findMany({
    where: { userId: currentUser.id },
    include: {
      sector: {
        include: {
          timeslots: { orderBy: { dateStart: "asc" } },
        },
      },
    },
  })

  // 3) Timeslots dont l'user est référent direct (TimeslotReferent)
  const referentTimeslots = await prisma.timeslotReferent.findMany({
    where: { userId: currentUser.id },
    include: {
      timeslot: {
        include: { sector: { select: { id: true, name: true, color: true } } },
      },
    },
  })

  // 4) Missions assignées 
  const missionAssignments = await prisma.missionAssignment.findMany({
    where: { userId: currentUser.id },
    include: {
      mission: true,
    },
    orderBy: { mission: { dateStart: "asc" } },
  })

  // 5) Missions dont on est responsable 
  const responsibleMissions = await prisma.mission.findMany({
    where: { responsibleId: currentUser.id },
    orderBy: { dateStart: "asc" },
  })


  // --- Sérialisation + dédup par timeslot.id ---
  const serializeTimeslot = (
    ts: { id: string; name: string; dateStart: Date | null; dateEnd: Date | null },
    sector: { name: string; color: string | null },
    source: "volunteer" | "referent",
    affectationId?: string
  ) => {
    const daysUntilStart = ts.dateStart
      ? Math.ceil((ts.dateStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null
    return {
      id: ts.id,
      name: ts.name,
      dateStart: ts.dateStart?.toISOString() ?? null,
      dateEnd: ts.dateEnd?.toISOString() ?? null,
      sectorName: sector.name,
      sectorColor: sector.color || "#10b981",
      source,
      affectationId: affectationId ?? null,
      timing: {
        daysUntilStart,
        isToday: daysUntilStart === 0,
        isTomorrow: daysUntilStart === 1,
        isPast: daysUntilStart !== null && daysUntilStart < 0,
        isUpcoming: daysUntilStart !== null && daysUntilStart > 0,
      },
    }
  }

  const timeslotMap = new Map<string, ReturnType<typeof serializeTimeslot>>()

  // Référent secteur (priorité basse)
  for (const sr of referentSectors) {
    for (const ts of sr.sector.timeslots) {
      timeslotMap.set(ts.id, serializeTimeslot(ts, sr.sector, "referent"))
    }
  }

  // Référent timeslot (même priorité)
  for (const tr of referentTimeslots) {
    if (!timeslotMap.has(tr.timeslot.id)) {
      timeslotMap.set(tr.timeslot.id, serializeTimeslot(tr.timeslot, tr.timeslot.sector, "referent"))
    }
  }

  // Volunteer écrase (priorité haute → on sait qu'il y est affecté)
  for (const aff of volunteerAffectations) {
    timeslotMap.set(aff.timeslot.id, serializeTimeslot(aff.timeslot, aff.sector, "volunteer", aff.id))
  }

  const serializedTimeslots = [...timeslotMap.values()].sort((a, b) => {
    if (!a.dateStart) return 1
    if (!b.dateStart) return -1
    return a.dateStart.localeCompare(b.dateStart)
  })

  // ─── Sérialisation missions ───
  const serializeMission = (
    m: { id: string; name: string; description: string | null; dateStart: Date; dateEnd: Date; place: string | null; priority: MissionPriority; status: MissionStatus },
    source: "assigned" | "responsible"
  ) => {
    const daysUntilStart = Math.ceil((m.dateStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return {
      id: m.id,
      name: m.name,
      description: m.description,
      dateStart: m.dateStart.toISOString(),
      dateEnd: m.dateEnd.toISOString(),
      place: m.place,
      priority: m.priority,
      status: m.status,
      source,
      timing: {
        daysUntilStart,
        isToday: daysUntilStart === 0,
        isTomorrow: daysUntilStart === 1,
        isPast: daysUntilStart < 0,
        isUpcoming: daysUntilStart > 0,
      },
    }
  }

  const missionMap = new Map<string, ReturnType<typeof serializeMission>>()

  // Responsable d'abord (priorité basse)
  for (const m of responsibleMissions) {
    missionMap.set(m.id, serializeMission(m, "responsible"))
  }

  // Assigné écrase (si on est les deux, "assigned" est plus spécifique)
  for (const ma of missionAssignments) {
    missionMap.set(ma.mission.id, serializeMission(ma.mission, "assigned"))
  }

  const serializedMissions = [...missionMap.values()].sort((a, b) =>
    a.dateStart.localeCompare(b.dateStart)
  )


  const displayName = currentUser.surname || currentUser.firstname || currentUser.name || currentUser.email

  return (
    <DashboardContent
      userName={displayName}
      timeslots={serializedTimeslots}
      missions={serializedMissions} />
  )
}

export default DashboardPage