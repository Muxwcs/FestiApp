"use client"

import { useCallback, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, RefreshCw, Users, UserCheck, UserX, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import StatsCard from "@/components/stats-card"
import { DataTable } from "../benevoles/data-table"
import { createColumns, SectorListItem } from "./columns"
import { toast } from "sonner"

interface SectorListProps {
  sectors: SectorListItem[]
}

export function SectorList({ sectors }: SectorListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const stats = useMemo(() => {
    const totalTimeslots = sectors.reduce((sum, s) => sum + s._count.timeslots, 0)
    const totalAffectations = sectors.reduce((sum, s) => sum + s._count.affectations, 0)
    const completionRate = totalTimeslots > 0 ? Math.round((totalAffectations / totalTimeslots) * 100) : 0

    return {
      totalSectors: sectors.length,
      totalTimeslots,
      totalAffectations,
      completionRate,
    }
  }, [sectors])

  const handleDelete = useCallback(async (sectorId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce secteur ?")) return
    try {
      const res = await fetch(`/api/txands/${sectorId}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success("Secteur supprimé")
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Secteurs"
          value={stats.totalSectors}
          icon={<Users className="h-5 w-5" />}
          description="Total des secteurs"
          variant="default"
        />
        <StatsCard
          title="Créneaux"
          value={stats.totalTimeslots}
          icon={<UserCheck className="h-5 w-5" />}
          description="Total des créneaux"
          variant="success"
        />
        <StatsCard
          title="Affectations"
          value={stats.totalAffectations}
          icon={<UserX className="h-5 w-5" />}
          description="Bénévoles assignés"
          variant="default"
        />
        <StatsCard
          title="Couverture"
          value={`${stats.completionRate}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Taux de remplissage"
          variant={stats.completionRate >= 80 ? "success" : stats.completionRate >= 60 ? "warning" : "destructive"}
        />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold">Secteurs</h2>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline" disabled={isPending}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau secteur
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Aucun secteur trouvé</p>
            </div>
          ) : (
            <DataTable columns={columns} data={sectors} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
