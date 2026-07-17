"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ListTodo } from "lucide-react"
import { formatDate, formatTime, formatShortDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface TimeslotItem {
  id: string
  name: string
  dateStart: string | null
  dateEnd: string | null
  sectorName: string
  sectorColor: string
  source: "volunteer" | "referent"
  affectationId: string | null
  timing: {
    daysUntilStart: number | null
    isToday: boolean
    isTomorrow: boolean
    isPast: boolean
    isUpcoming: boolean
  }
}

interface MissionItem {
  id: string
  name: string
  description: string | null
  dateStart: string
  dateEnd: string
  place: string | null
  priority: "HAUTE" | "MOYENNE" | "BASSE"
  status: "A_FAIRE" | "EN_COURS" | "TERMINEE"
  timing: {
    daysUntilStart: number
    isToday: boolean
    isTomorrow: boolean
    isPast: boolean
    isUpcoming: boolean
  }
  source: "assigned" | "responsible"
}

interface DashboardContentProps {
  userName: string | null | undefined
  timeslots: TimeslotItem[]
  missions: MissionItem[]
}

// ─── Helpers ────────────────────────────────────────────

const priorityConfig = {
  HAUTE: { label: "Urgente", variant: "destructive" as const },
  MOYENNE: { label: "Normale", variant: "default" as const },
  BASSE: { label: "Basse", variant: "secondary" as const },
}

const statusConfig = {
  A_FAIRE: { label: "À faire", className: "bg-slate-100 text-slate-800" },
  EN_COURS: { label: "En cours", className: "bg-blue-100 text-blue-800" },
  TERMINEE: { label: "Terminée", className: "bg-green-100 text-green-800" },
}

export function DashboardContent({ userName, timeslots, missions }: DashboardContentProps) {
  const upcomingSlots = timeslots.filter((t) => !t.timing.isPast)
  const pastSlots = timeslots.filter((t) => t.timing.isPast)
  const activeMissions = missions.filter((m) => m.status !== "TERMINEE")
  const doneMissions = missions.filter((m) => m.status === "TERMINEE")

  const volunteerCount = timeslots.filter((t) => t.source === "volunteer").length
  const referentCount = timeslots.filter((t) => t.source === "referent").length

  const router = useRouter()

  const updateMissionStatus = async (missionId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/missions/${missionId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success("Statut mis à jour")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mon Planning
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Iep, {userName} 👋 — {volunteerCount} créneau{volunteerCount !== 1 ? "x" : ""} bénévole
            {referentCount > 0 && <> · {referentCount} en supervision</>}
            {activeMissions.length > 0 && (
              <> · {activeMissions.filter(m => m.source === "assigned").length} mission{activeMissions.filter(m => m.source === "assigned").length > 1 ? "s" : ""}
                {activeMissions.some(m => m.source === "responsible") && (
                  <> · {activeMissions.filter(m => m.source === "responsible").length} en responsabilité</>
                )}</>
            )}
          </p>
        </CardHeader>
      </Card>
      {/* ─── Missions actives ─── */}
      {activeMissions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            Missions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeMissions.map((m) => (
              <Card key={m.id} className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{m.name}</span>
                    <div className="flex gap-1 shrink-0">
                      <Badge variant={priorityConfig[m.priority].variant} className="text-xs">
                        {priorityConfig[m.priority].label}
                      </Badge>
                      <Select
                        value={m.status}
                        onValueChange={(v) => updateMissionStatus(m.id, v)}
                      >
                        <SelectTrigger className={`h-6 text-xs w-auto gap-1 px-2 border-0 ${statusConfig[m.status].className}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A_FAIRE">À faire</SelectItem>
                          <SelectItem value="EN_COURS">En cours</SelectItem>
                          <SelectItem value="TERMINEE">Terminée</SelectItem>
                        </SelectContent>
                      </Select>
                      {m.source === "responsible" && (
                        <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                          Responsable
                        </Badge>
                      )}
                    </div>
                  </div>
                  {m.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{m.description}</p>
                  )}
                  {m.place && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {m.place}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatShortDate(m.dateStart)} → {formatShortDate(m.dateEnd)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── Timeslots à venir ─── */}
      {upcomingSlots.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Créneaux à venir</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingSlots.map((ts) => (
              <Card
                key={ts.id}
                className={`border-l-4 ${ts.source === "referent" ? "border-dashed" : ""}`}
                style={{ borderLeftColor: ts.sectorColor }}
              >
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ts.name}</span>
                    <div className="flex gap-1">
                      {ts.source === "referent" && (
                        <Badge variant="outline" className="text-xs">Référent</Badge>
                      )}
                      {ts.timing.isToday && <Badge variant="destructive">Aujourd&apos;hui</Badge>}
                      {ts.timing.isTomorrow && <Badge variant="secondary">Demain</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ts.sectorName}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(ts.dateStart ?? undefined)} • {formatTime(ts.dateStart ?? undefined)} – {formatTime(ts.dateEnd ?? undefined)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── Timeslots passés ─── */}
      {pastSlots.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">Créneaux passés</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pastSlots.map((ts) => (
              <Card key={ts.id} className="opacity-60">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ts.name}</span>
                    {ts.source === "referent" && (
                      <Badge variant="outline" className="text-xs">Référent</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ts.sectorName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(ts.dateStart ?? undefined)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── Missions terminées ─── */}
      {doneMissions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">Missions terminées</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {doneMissions.map((m) => (
              <Card key={m.id} className="opacity-60">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{m.name}</span>
                    <Select
                      value={m.status}
                      onValueChange={(v) => updateMissionStatus(m.id, v)}
                    >
                      <SelectTrigger
                        className={`h-6 text-xs w-auto gap-1 px-2 border-0 ${statusConfig[m.status].className}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([value, { label }]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatShortDate(m.dateStart)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── Empty state ─── */}
      {timeslots.length === 0 && missions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Aucun créneau ni mission</p>
            <p className="text-sm text-muted-foreground mt-1">
              Vos créneaux et missions apparaîtront ici une fois assignés par un administrateur.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )

}
