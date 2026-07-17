"use client"

import { useState, useTransition } from "react"
import { Check, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { markPresence, markBulkPresence } from "@/lib/presence"
import { toast } from "sonner"

interface PresenceVolunteer {
  affectationId: string
  volunteer: {
    id: string
    name: string | null
    firstname: string | null
    surname: string | null
  }
  presence: "PRESENT" | "ABSENT" | null
}

interface PresenceChecklistProps {
  timeslotId: string
  timeslotName: string
  dateStart: string | null
  dateEnd: string | null
  volunteers: PresenceVolunteer[]
}

export function PresenceChecklist({
  timeslotId: _timeslotId,
  timeslotName,
  dateStart,
  dateEnd,
  volunteers,
}: PresenceChecklistProps) {
  const [items, setItems] = useState(volunteers)
  const [isPending, startTransition] = useTransition()

  const counts = {
    total: items.length,
    present: items.filter((v) => v.presence === "PRESENT").length,
    absent: items.filter((v) => v.presence === "ABSENT").length,
    unchecked: items.filter((v) => v.presence == null).length,
  }

  const handleMark = (affectationId: string, presence: "PRESENT" | "ABSENT") => {
    const previous = [...items]

    // Optimistic update
    setItems((prev) =>
      prev.map((v) =>
        v.affectationId === affectationId ? { ...v, presence } : v
      )
    )

    startTransition(async () => {
      try {
        await markPresence(affectationId, presence)
      } catch {
        setItems(previous)
        toast.error("Erreur lors du pointage")
      }
    })
  }

  const handleBulkPresent = () => {
    const uncheckedIds = items
      .filter((v) => v.presence == null)
      .map((v) => v.affectationId)

    if (uncheckedIds.length === 0) return

    const previous = [...items]

    setItems((prev) =>
      prev.map((v) =>
        v.presence == null ? { ...v, presence: "PRESENT" as const } : v
      )
    )

    startTransition(async () => {
      try {
        await markBulkPresence(uncheckedIds, "PRESENT")
        toast.success(`${uncheckedIds.length} bénévole(s) marqué(s) présent(s)`)
      } catch {
        setItems(previous)
        toast.error("Erreur lors du pointage groupé")
      }
    })
  }

  const formatTime = (iso: string | null) => {
    if (!iso) return ""
    return new Date(iso).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const timeRange = dateStart
    ? `${formatTime(dateStart)}${dateEnd ? ` – ${formatTime(dateEnd)}` : ""}`
    : null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Users className="h-4 w-4 shrink-0" />
            <h3 className="font-semibold truncate">{timeslotName}</h3>
            {timeRange && (
              <span className="text-xs text-muted-foreground shrink-0">{timeRange}</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="default">{counts.present} ✓</Badge>
            <Badge variant="destructive">{counts.absent} ✗</Badge>
            {counts.unchecked > 0 && (
              <Badge variant="secondary">{counts.unchecked} ?</Badge>
            )}
            {counts.unchecked > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleBulkPresent}
                disabled={isPending}
              >
                Tous présents
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Aucun bénévole affecté
          </p>
        ) : (
          <div className="divide-y">
            {items.map((v) => (
              <div
                key={v.affectationId}
                className="flex items-center justify-between py-2 gap-2"
              >
                <span className="text-sm truncate min-w-0">
                  {v.volunteer.firstname} {v.volunteer.name || v.volunteer.surname}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    size="icon"
                    variant={v.presence === "PRESENT" ? "default" : "ghost"}
                    className="h-8 w-8"
                    onClick={() => handleMark(v.affectationId, "PRESENT")}
                    disabled={isPending}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={v.presence === "ABSENT" ? "destructive" : "ghost"}
                    className="h-8 w-8"
                    onClick={() => handleMark(v.affectationId, "ABSENT")}
                    disabled={isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}