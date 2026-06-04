import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/permissions"
import { redirect } from "next/navigation"
import { DashboardContent } from "./dashboard-content"

const DashboardPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { id: true, name: true, firstname: true, email: true },
  })

  const timeslots = await prisma.affectation.findMany({
    where: { volunteerId: currentUser.id, status: "VALIDE" },
    include: {
      timeslot: true,
      sector: { select: { id: true, name: true, color: true, description: true } },
    },
    orderBy: { timeslot: { dateStart: "asc" } },
  })

  const serialized = timeslots.map((aff) => {
    const now = new Date()
    const startDate = aff.timeslot.dateStart
    const daysUntilStart = startDate
      ? Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null

    return {
      id: aff.timeslot.id,
      name: aff.timeslot.name,
      dateStart: aff.timeslot.dateStart?.toISOString() ?? null,
      dateEnd: aff.timeslot.dateEnd?.toISOString() ?? null,
      sectorName: aff.sector.name,
      sectorColor: aff.sector.color || "#10b981",
      status: aff.status,
      affectationId: aff.id,
      timing: {
        daysUntilStart,
        isToday: daysUntilStart === 0,
        isTomorrow: daysUntilStart === 1,
        isPast: daysUntilStart !== null && daysUntilStart < 0,
        isUpcoming: daysUntilStart !== null && daysUntilStart > 0,
      },
    }
  })

  return (
    <DashboardContent
      userName={user?.firstname || user?.name || currentUser.email}
      timeslots={serialized}
    />
  )
}

export default DashboardPage
