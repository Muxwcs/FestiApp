"use client"

import AppSidebar from "@/components/layout/app-sidebar"
import Topbar from "@/components/layout/topbar"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useCurrentUser()

  // ✅ Loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full">
        <div className="w-64 bg-gray-100 dark:bg-gray-900 animate-pulse" />
        <div className="flex flex-col flex-1 w-full">
          <div className="h-16 bg-gray-100 dark:bg-gray-900 animate-pulse" />
          <main className="flex-1 p-2 sm:p-4">
            <div className="h-32 bg-gray-100 dark:bg-gray-900 animate-pulse rounded" />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar role={user.role} isReferent={user.isReferent} />
      <div className="flex flex-col flex-1 w-full">
        <Topbar />
        <main className="flex-1 p-2 sm:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}