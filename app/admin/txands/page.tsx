import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { SectorList } from "./sector-list"

const TxandsPage = async () => {
  await isAdmin()

  const sectors = await prisma.sector.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      status: true,
      skills: true,
      _count: {
        select: { timeslots: true, affectations: true },
      },
    },
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SectorList sectors={sectors} />
    </div>
  )
}

export default TxandsPage