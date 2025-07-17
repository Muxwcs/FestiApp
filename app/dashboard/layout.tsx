import { CalendarProvider } from "@/components/calendar/context/calendar-context"
import AppSidebar from "@/components/layout/app-sidebar"
import Topbar from "@/components/layout/topbar"
import { getEvents, getUsers } from "@/components/calendar/requests"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userRole: "admin" | "bénévole" = "admin" // Replace with dynamic logic
  const [events, users] = await Promise.all([getEvents(), getUsers()])

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar role={userRole} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-4">
          <CalendarProvider users={users} events={events}>

            {children}
          </CalendarProvider>
        </main>
      </div>
    </div>
  )
}