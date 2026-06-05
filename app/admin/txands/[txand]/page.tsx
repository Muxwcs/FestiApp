import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SectorDetail } from "./sector-detail"

const SectorPage = async ({ params }: { params: Promise<{ txand: string }> }) => {
  await isAdmin()
  const { txand: sectorId } = await params

  const sector = await prisma.sector.findUnique({
    where: { id: sectorId },
    include: {
      referents: {
        include: {
          user: {
            select: { id: true, name: true, firstname: true, email: true, phone: true },
          },
        },
      },
      timeslots: {
        orderBy: { dateStart: "asc" },
        include: {
          _count: { select: { affectations: true } },
        },
      },
      _count: { select: { affectations: true } },
    },
  })

  if (!sector) notFound()

  // Serialize dates for client component
  const serialized = {
    ...sector,
    createdAt: sector.createdAt.toISOString(),
    updatedAt: sector.updatedAt.toISOString(),
    timeslots: sector.timeslots.map((ts) => ({
      ...ts,
      dateStart: ts.dateStart?.toISOString() ?? null,
      dateEnd: ts.dateEnd?.toISOString() ?? null,
      createdAt: ts.createdAt.toISOString(),
      updatedAt: ts.updatedAt.toISOString(),
    })),
  }

  return (
    <div className="p-0 sm:p-6 lg:p-8">
      <SectorDetail sector={serialized} />
    </div>
  )
}

export default SectorPage
