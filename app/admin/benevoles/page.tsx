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

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <VolunteerList
        volunteers={volunteers}
        userName={session.user.name}
      />
    </div>
  )
}

export default VolunteersPage
