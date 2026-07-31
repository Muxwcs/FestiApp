import { prisma } from "@/lib/prisma"
import { InfoPage } from "./info-page"
import type { Locale } from "@/lib/i18n/types"

export const revalidate = 60

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const infos = await prisma.usefulInfo.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  })

  const serialized = infos.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))

  return <InfoPage locale={locale as Locale} _infos={serialized} />
}
