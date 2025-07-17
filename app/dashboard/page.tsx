"use client"

import { ClientContainer } from "@/components/calendar/client-container"
import { useCalendar } from "@/components/calendar/context/calendar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoadUserProfile } from "@/hooks/useLoadUserProfile"
// import { useUserStore } from "@/stores/userStore"

const Dashboard = () => {
  useLoadUserProfile()
  // const user = useUserStore((state) => state.user)
  const { view } = useCalendar()
  return (
    <div className="min-h-screen space-y-6">
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 min-w-full">
          <ClientContainer view={view} />
        </CardContent>

      </Card>
    </div>
  )
}

export default Dashboard