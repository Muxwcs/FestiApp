import { prisma } from "@/lib/prisma"
import { PricesPage } from "./prices-page"
import type { Locale } from "@/lib/i18n/types"

export const revalidate = 60

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const prices = await prisma.price.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  const serialized = prices.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  return <PricesPage locale={locale as Locale} prices={serialized} />
}
