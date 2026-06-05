"use client"

import { useCallback, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DataTable } from "./data-table"
import { createColumns, VolunteerListItem } from "./columns"
import { toast } from "sonner"

interface VolunteerListProps {
  volunteers: VolunteerListItem[]
  userName: string | null | undefined
}

export function VolunteerList({ volunteers, userName }: VolunteerListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

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
                {volunteers.length} bénévole{volunteers.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold">Liste des bénévoles</h2>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline" disabled={isPending}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} />
                {isPending ? "Actualisation..." : "Actualiser"}
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau bénévole
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {volunteers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">Aucun bénévole trouvé</p>
            </div>
          ) : (
            <DataTable columns={columns} data={volunteers} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
