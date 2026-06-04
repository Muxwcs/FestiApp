import { isAdmin } from "@/lib/permissions"
import { prisma } from "@/lib/prisma"
import { EventManager } from "./event-manager"

const EventsPage = async () => {
  await isAdmin()

  const events = await prisma.event.findMany({
    orderBy: [{ day: "asc" }, { sortOrder: "asc" }, { startTime: "asc" }],
  })

  const serialized = events.map((e) => ({
    ...e,
    title: e.title as Record<string, string>,
    description: e.description as Record<string, string> | null,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }))

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <EventManager events={serialized} />
    </div>
  )
}

export default EventsPage
