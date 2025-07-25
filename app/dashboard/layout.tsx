import AppSidebar from "@/components/layout/app-sidebar"
import Topbar from "@/components/layout/topbar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userRole: "admin" | "bénévole" = "admin" // Replace with dynamic logic

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar role={userRole} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}