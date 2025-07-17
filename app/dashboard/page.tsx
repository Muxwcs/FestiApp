"use client"

import { ClientContainer } from "@/components/calendar/client-container"
import { useCalendar } from "@/components/calendar/context/calendar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoadUserProfile } from "@/hooks/useLoadUserProfile"
import { useUserStore } from "@/stores/userStore"

const Dashboard = () => {
  useLoadUserProfile()
  const user = useUserStore((state) => state.user)
  const { view } = useCalendar()
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            Dashboard
          </CardTitle>
          <p>Nom: {user?.fields?.name}</p>
          <p>Email: {user?.fields?.email}</p>
          <p>Rôle: {user?.fields?.role}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 min-w-full">
          <ClientContainer view={view} />
        </CardContent>

      </Card>
    </div>
  )
}

export default Dashboard