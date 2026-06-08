import { prisma } from "@/lib/prisma"
import { ProgramPage } from "./program-page"
import type { Locale } from "@/lib/i18n/types"

export const revalidate = 60

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const events = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: [{ day: "asc" }, { sortOrder: "asc" }, { startTime: "asc" }],
  })

  const serialized = events.map((e) => ({
    ...e,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))

  return <ProgramPage locale={locale as Locale} events={serialized} />
}
