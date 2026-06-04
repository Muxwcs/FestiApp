"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

interface TimeslotItem {
  id: string
  name: string
  dateStart: string | null
  dateEnd: string | null
  sectorName: string
  sectorColor: string
  status: string
  affectationId: string
  timing: {
    daysUntilStart: number | null
    isToday: boolean
    isTomorrow: boolean
    isPast: boolean
    isUpcoming: boolean
  }
}

interface DashboardContentProps {
  userName: string | null | undefined
  timeslots: TimeslotItem[]
}

export function DashboardContent({ userName, timeslots }: DashboardContentProps) {
  const upcoming = timeslots.filter((t) => !t.timing.isPast)
  const past = timeslots.filter((t) => t.timing.isPast)

  const formatDate = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const formatTime = (iso: string | null) => {
    if (!iso) return ""
    return new Date(iso).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mon Planning
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Bonjour, {userName} 👋 — {timeslots.length} créneau{timeslots.length !== 1 ? "x" : ""} assigné{timeslots.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
      </Card>

      {/* Upcoming timeslots */}
      {upcoming.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">À venir</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((ts) => (
              <Card key={ts.id} className="border-l-4" style={{ borderLeftColor: ts.sectorColor }}>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ts.name}</span>
                    {ts.timing.isToday && <Badge variant="destructive">Aujourd&apos;hui</Badge>}
                    {ts.timing.isTomorrow && <Badge variant="secondary">Demain</Badge>}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ts.sectorName}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(ts.dateStart)} • {formatTime(ts.dateStart)} – {formatTime(ts.dateEnd)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past timeslots */}
      {past.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">Passés</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((ts) => (
              <Card key={ts.id} className="opacity-60">
                <CardContent className="pt-4 space-y-2">
                  <span className="font-medium">{ts.name}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ts.sectorName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(ts.dateStart)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {timeslots.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Aucun créneau assigné</p>
            <p className="text-sm text-muted-foreground mt-1">
              Vos créneaux apparaîtront ici une fois assignés par un administrateur.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
