"use client"

import { ClientContainer } from "@/components/calendar/client-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoadUserProfile } from "@/hooks/useLoadUserProfile"
import { useCalendarStore, useVolunteerTimeslots } from "@/stores/calendarStore"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
// import { useUserStore } from "@/stores/userStore"

const Dashboard = () => {
  useLoadUserProfile()
  const { data: session } = useSession()
  const { refresh } = useVolunteerTimeslots()
  const { view, setIsVolunteer } = useCalendarStore()

  // ✅ Initialize volunteer status and fetch timeslots
  useEffect(() => {
    if (session?.user?.email) {
      setIsVolunteer(true)
      refresh() // Fetch volunteer timeslots
    }
  }, [session, setIsVolunteer, refresh])

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