import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { PriceManager } from "./price-manager"

const PricesPage = async () => {
  await isAdmin()
  const prices = await prisma.price.findMany({ orderBy: { sortOrder: "asc" } })
  const serialized = prices.map((p) => ({
    ...p,
    title: p.title as Record<string, string>,
    description: p.description as Record<string, string> | null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PriceManager prices={serialized} />
    </div>
  )
}
export default PricesPage
