import { isAdminOrReferent } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { ReferentSectors } from "./referent-sectors"

const ReferentPage = async () => {
  const session = await isAdminOrReferent()

  const isAdmin = session.user.role === "ADMIN"

  // Admin sees all sectors, referent sees only their own
  const sectors = await prisma.sector.findMany({
    where: isAdmin
      ? {}
      : {
        OR: [
          { referents: { some: { userId: session.user.id } } },
          { timeslots: { some: { referents: { some: { userId: session.user.id } } } } },
        ],
      },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      status: true,
      skills: true,
      _count: { select: { timeslots: true, affectations: true } },
    },
  })

  return (
    <div className="p-0 sm:p-6 lg:p-8">
      <ReferentSectors
        sectors={sectors}
        userName={session.user.surname || session.user.firstname || session.user.email}
      />
    </div>
  )
}

export default ReferentPage
