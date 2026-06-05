import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { PublicHomePage } from "./public-home"
import type { Locale } from "@/lib/i18n/types"

export const revalidate = 60 // ISR — revalidate every 60 seconds

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const _t = await getTranslations()

  const [events, prices, infos] = await Promise.all([
    prisma.event.findMany({
      where: { isActive: true },
      orderBy: [{ day: "asc" }, { sortOrder: "asc" }, { startTime: "asc" }],
    }),
    prisma.price.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.usefulInfo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ])

  // Serialize dates for client
  const serializedEvents = events.map((e) => ({
    ...e,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))

  const serializedPrices = prices.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  const serializedInfos = infos.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    updatedAt: i.updatedAt.toISOString(),
  }))

  return (
    <PublicHomePage
      locale={locale as Locale}
      events={serializedEvents}
      prices={serializedPrices}
      infos={serializedInfos}
    />
  )
}
