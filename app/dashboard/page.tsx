"use client"

import { ClientContainer } from "@/components/calendar/client-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle } from "lucide-react"
import { useLoadUserProfile } from "@/hooks/useLoadUserProfile"
import { useVolunteerTimeslots } from "@/hooks/use-volunteer-timeslots"
import { useCalendarStore } from "@/stores/calendarStore"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const Dashboard = () => {
  const { data: session, status } = useSession()

  // ✅ Use cached hooks instead of direct API calls
  const { userData, isLoading: profileLoading, error: profileError } = useLoadUserProfile()

  const {
    data: volunteerData,
    isLoading: volunteerLoading,
    error: volunteerError,
    refetch: refetchVolunteer
  } = useVolunteerTimeslots()

  // Calendar store
  const {
    view,
    setIsVolunteer,
    setVolunteerTimeslots,
  } = useCalendarStore()

  // ✅ Update store when volunteer data changes (only once per change)
  useEffect(() => {
    if (volunteerData?.timeslots) {
      setVolunteerTimeslots(volunteerData.timeslots)
      console.log('✅ Updated calendar store with cached timeslots:', volunteerData.timeslots.length)
    }
  }, [volunteerData?.timeslots, setVolunteerTimeslots])

  // ✅ Set volunteer status once when authenticated
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setIsVolunteer(true)
    }
  }, [status, session?.user?.email, setIsVolunteer])

  // ✅ Manual refresh function
  const handleRefresh = async () => {
    console.log('🔄 Manual refresh triggered')
    await refetchVolunteer()
  }

  // Loading state
  if (status === 'loading' || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  // Error state
  if (volunteerError || profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span>Erreur de chargement</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {volunteerError?.message || profileError?.message}
            </p>
            <Button onClick={handleRefresh} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-6">
      <Card>
        <CardHeader className="flex items-center gap-2">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2">
              Mon Planning
            </CardTitle>

            {/* Refresh button */}
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              disabled={volunteerLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${volunteerLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {volunteerLoading ? (
                'Chargement des créneaux...'
              ) : volunteerData?.timeslots ? (
                `${volunteerData.timeslots.length} créneau(x) trouvé(s)`
              ) : (
                'Aucun créneau trouvé'
              )}
            </span>

            {userData && (
              <span>
                Bonjour, {userData.firstname || userData.name} 👋
              </span>
            )}
          </div>

          {/* Development info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
              <div className="font-semibold mb-2">🔧 React Query Debug:</div>
              <div>Profile cached: {!profileLoading ? '✅' : '⏳'}</div>
              <div>Timeslots cached: {!volunteerLoading ? '✅' : '⏳'}</div>
              <div>Timeslots count: {volunteerData?.timeslots?.length || 0}</div>
            </div>
          )}

          {/* Calendar */}
          <div className="min-w-full">
            <ClientContainer view={view} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard