import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/permissions"
import { redirect } from "next/navigation"
import { MissionsClient } from "./missions-client"

const MissionsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.isAdmin) redirect("/admin")

  const [missions, users] = await Promise.all([
    prisma.mission.findMany({
      include: {
        assignments: {
          include: {
            user: { select: { id: true, firstname: true, surname: true, name: true, email: true, phone: true } },
          },
        },
        responsible: { select: { id: true, firstname: true, surname: true, name: true, email: true, phone: true } },
      },
      orderBy: { dateStart: "asc" },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, firstname: true, surname: true, name: true, email: true, phone: true },
      orderBy: { firstname: "asc" },
    }),
  ])

  const serialized = missions.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    dateStart: m.dateStart.toISOString(),
    dateEnd: m.dateEnd.toISOString(),
    place: m.place,
    priority: m.priority,
    status: m.status,
    humanResources: m.humanResources,
    assignedUsers: m.assignments.map((a) => ({
      id: a.user.id,
      firstname: a.user.firstname,
      surname: a.user.surname,
      name: a.user.name,
      email: a.user.email,
      phone: a.user.phone,
    })),
    responsible: m.responsible ? {
      id: m.responsible.id,
      firstname: m.responsible.firstname,
      surname: m.responsible.surname,
      name: m.responsible.name,
      email: m.responsible.email,
      phone: m.responsible.phone,
    } : null,
  }))

  const userOptions = users.map((u) => ({
    id: u.id,
    firstname: u.firstname,
    surname: u.surname,
    name: u.name,
    email: u.email || "",
    phone: u.phone || "",
  }))

  return <MissionsClient missions={serialized} users={userOptions} />
}

export default MissionsPage