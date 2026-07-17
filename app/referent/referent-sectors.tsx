"use client"

import { useMemo, useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, RefreshCw, UserCheck, Users, UserX } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import StatsCard from "@/components/stats-card"
import { DataTable } from "../admin/benevoles/data-table"
import { createColumns, ReferentSectorItem } from "./columns"

interface ReferentSectorsProps {
  sectors: ReferentSectorItem[]
  userName: string | null | undefined
}

export function ReferentSectors({ sectors, userName }: ReferentSectorsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const stats = useMemo(() => {
    const totalTimeslots = sectors.reduce((sum, s) => sum + s._count.timeslots, 0)
    const totalAffectations = sectors.reduce((sum, s) => sum + s._count.affectations, 0)
    const completionRate = totalTimeslots > 0 ? Math.round((totalAffectations / totalTimeslots) * 100) : 0
    return { totalSectors: sectors.length, totalTimeslots, totalAffectations, completionRate }
  }, [sectors])

  const handleRefresh = useCallback(() => {
    startTransition(() => router.refresh())
  }, [router])

  const columns = useMemo(() => createColumns(), [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">Mon Espace Référent</h1>
        <p className="text-muted-foreground text-sm">
          Bienvenue, {userName} — Gestion des secteurs dont vous êtes responsable
        </p>
      </div>

      {/* Stats Cards */}
      {sectors.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Mes secteurs"
            value={stats.totalSectors}
            icon={<Users className="h-5 w-5" />}
            description="Secteurs sous votre responsabilité"
            variant="default"
          />
          <StatsCard
            title="Créneaux"
            value={stats.totalTimeslots}
            icon={<Users className="h-5 w-5" />}
            description="Total des créneaux"
            variant="default"
          />
          <StatsCard
            title="Bénévoles affectés"
            value={stats.totalAffectations}
            icon={<UserCheck className="h-5 w-5" />}
            description={`${stats.completionRate}% de couverture`}
            variant="success"
          />
          <StatsCard
            title="Manquants"
            value={Math.max(0, stats.totalTimeslots - stats.totalAffectations)}
            icon={<UserX className="h-5 w-5" />}
            description="Postes à pourvoir"
            variant={stats.totalTimeslots > stats.totalAffectations ? "destructive" : "success"}
          />
        </div>
      )}

      {/* Shortage alert */}
      {stats.totalTimeslots > stats.totalAffectations && sectors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Attention !</strong> Il manque {stats.totalTimeslots - stats.totalAffectations} bénévole(s) sur vos secteurs.
          </AlertDescription>
        </Alert>
      )}

      {/* Sectors table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Mes secteurs</h2>
              <div className="sm:hidden bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {sectors.length}
              </div>
            </div>
            <Button onClick={handleRefresh} variant="outline" disabled={isPending}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} />
              {isPending ? "Actualisation..." : "Actualiser"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">Aucun secteur assigné</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Vous n&apos;êtes actuellement responsable d&apos;aucun secteur. Les secteurs vous seront assignés par un administrateur.
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={sectors} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
