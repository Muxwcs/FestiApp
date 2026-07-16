"use client"

import { useCallback, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DataTable } from "./data-table"
import { createColumns, VolunteerListItem } from "./columns"
import { toast } from "sonner"
import { CreateVolunteerDialog } from "@/components/admin/volunteers/create-volunteer-dialog"

interface DayStat {
  admins: number
  referents: number
  benevoles: number
  total: number
}

interface VolunteerListProps {
  volunteers: VolunteerListItem[]
  userName: string | null | undefined
  dayStats: { friday: DayStat; saturday: DayStat; sunday: DayStat }
}

export function VolunteerList({ volunteers, userName, dayStats }: VolunteerListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [createOpen, setCreateOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const filteredVolunteers = useMemo(() => {
    switch (roleFilter) {
      case "ADMIN":
        return volunteers.filter((v) => v.role === "ADMIN")
      case "BENEVOLE":
        return volunteers.filter((v) => v.role === "BENEVOLE" && !v.isReferent)
      case "REFERENT":
        return volunteers.filter((v) => v.isReferent)
      default:
        return volunteers
    }
  }, [volunteers, roleFilter])

  const handleDelete = useCallback(async (volunteerId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir désactiver ce bénévole ?")) return

    try {
      const res = await fetch(`/api/volunteers/${volunteerId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Échec de la suppression")

      toast.success("Bénévole désactivé")
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }, [router])

  const handleRefresh = useCallback(() => {
    startTransition(() => router.refresh())
  }, [router])

  const columns = useMemo(() => createColumns(handleDelete), [handleDelete])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
                Gestion des Bénévoles
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Bienvenue, {userName || "Administrateur"}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-lg">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {filteredVolunteers.length} bénévole{filteredVolunteers.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([
          { label: "Vendredi 31", stat: dayStats.friday },
          { label: "Samedi 1er", stat: dayStats.saturday },
          { label: "Dimanche 2", stat: dayStats.sunday },
        ] as const).map(({ label, stat }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-3xl font-bold">{stat.total}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
                <span>{stat.admins} admin{stat.admins !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{stat.referents} référent{stat.referents !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{stat.benevoles} bénévole{stat.benevoles !== 1 ? "s" : ""}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold">Liste des bénévoles</h2>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline" disabled={isPending}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} />
                {isPending ? "Actualisation..." : "Actualiser"}
              </Button>
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau bénévole
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {[
              { value: "all", label: "Tous" },
              { value: "ADMIN", label: "Admins" },
              { value: "BENEVOLE", label: "Bénévoles" },
              { value: "REFERENT", label: "Référents" },
            ].map((f) => (
              <Button
                key={f.value}
                variant={roleFilter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
          {filteredVolunteers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">Aucun bénévole trouvé</p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredVolunteers} />
          )}
        </CardContent>
      </Card>
      <CreateVolunteerDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
