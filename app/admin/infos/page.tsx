import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { InfoManager } from "./info-manager"

const InfosPage = async () => {
  await isAdmin()
  const infos = await prisma.usefulInfo.findMany({ orderBy: { sortOrder: "asc" } })
  const serialized = infos.map((i) => ({
    ...i,
    title: i.title as Record<string, string>,
    content: i.content as Record<string, string>,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <InfoManager infos={serialized} />
    </div>
  )
}
export default InfosPage
