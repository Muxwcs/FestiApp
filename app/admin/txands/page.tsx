"use client"

import { useCallback, useEffect, useMemo } from "react"
import { AlertCircle, AlertTriangle, Plus, RefreshCw, TrendingUp, UserCheck, Users, UserX } from "lucide-react"

import { useSectorsStore } from "@/stores/sectorsStore"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import StatsCard from "@/components/stats-card"

import { DataTable } from "../benevoles/data-table"
import { createColumns } from "./columns"

const TxandsPage = () => {
  const isHydrated = useSectorsStore()
  const {
    sectors,
    loading,
    error,
    fetchSectors,
    deleteSector,
    forceRefresh,
    clearError
  } = useSectorsStore()

  // Fetch sectors after hydration
  useEffect(() => {
    if (isHydrated) {
      fetchSectors()
    }
  }, [isHydrated, fetchSectors])

  // ✅ Calculate stats from sectors data
  const stats = useMemo(() => {
    if (!sectors || sectors.length === 0) {
      return {
        totalSectors: 0,
        totalNinjasNeeded: 0,
        totalNinjasAssigned: 0,
        ninjasMissing: 0,
        completionRate: 0,
        sectorsWithShortage: 0
      }
    }

    const totalSectors = sectors.length

    // ✅ Using your exact field names from the structure
    const totalNinjasNeeded = sectors.reduce((sum, sector) => {
      // Using 'totalVolunteers' field from your structure
      const needs = sector.fields?.totalVolunteers || 0
      return sum + (typeof needs === 'number' ? needs : 0)
    }, 0)

    const totalNinjasAssigned = sectors.reduce((sum, sector) => {
      // Using 'totalVolunteers' field from your structure
      const volunteers = sector.fields?.totalVolunteers || 0
      const needs = sector.fields?.totalNeeds || 0
      // Ensure we only count assigned volunteers if they are less than needs
      if (typeof volunteers === 'number' && typeof needs === 'number') {
        const total = volunteers - needs
        return sum + total
      }
      return sum
    }, 0)

    const ninjasMissing = sectors.reduce((sum, sector) => {
      // Using 'totalNeeds' field from your structure
      const needs = sector.fields?.totalNeeds || 0
      return sum + (typeof needs === 'number' ? needs : 0)
    }, 0)

    const completionRate = totalNinjasNeeded > 0 ? Math.round((totalNinjasAssigned / totalNinjasNeeded) * 100) : 0

    // Count sectors with shortage
    const sectorsWithShortage = sectors.filter(sector => {
      const needs = sector.fields?.totalNeeds || 0
      return needs !== 0
    }).length

    return {
      totalSectors,
      totalNinjasNeeded,
      totalNinjasAssigned,
      ninjasMissing,
      completionRate,
      sectorsWithShortage
    }
  }, [sectors])

  // ✅ Debug logging to verify field access
  useEffect(() => {
    if (sectors.length > 0 && process.env.NODE_ENV === 'development') {
      console.log('🔍 First sector fields:', sectors[0].fields)
      console.log('🔍 Available fields:', Object.keys(sectors[0].fields || {}))
      console.log('🔍 Stats calculated:', stats)
    }
  }, [sectors, stats])

  // Handle delete with optimistic updates
  const handleDelete = useCallback(async (sectorId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) return

    try {
      await deleteSector(sectorId)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }, [deleteSector])

  // Handle manual refresh
  const handleRefresh = useCallback(async () => {
    await forceRefresh()
  }, [forceRefresh])

  const columns = useMemo(() => createColumns(handleDelete), [handleDelete])

  // Show loading until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen sm:p-6 lg:p-8 space-y-6">
      {/* ✅ Stats Cards Grid */}
      {!loading || sectors.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Besoins en ninjas"
            value={stats.totalNinjasNeeded}
            icon={<Users className="h-5 w-5" />}
            description="Total des postes à pourvoir"
            variant="default"
          />

          <StatsCard
            title="Ninjas assignés"
            value={stats.totalNinjasAssigned}
            icon={<UserCheck className="h-5 w-5" />}
            description={`${stats.completionRate}% des besoins couverts`}
            variant="success"
          />

          <StatsCard
            title="Ninjas manquants"
            value={stats.ninjasMissing}
            icon={<UserX className="h-5 w-5" />}
            description={`${stats.sectorsWithShortage} secteur(s) en déficit`}
            variant={stats.ninjasMissing > 0 ? "destructive" : "success"}
          />

          <StatsCard
            title="Taux de couverture"
            value={stats.completionRate}
            icon={<TrendingUp className="h-5 w-5" />}
            description="Pourcentage de postes pourvus"
            variant={stats.completionRate >= 80 ? "success" : stats.completionRate >= 60 ? "warning" : "destructive"}
          />
        </div>
      ) : null}

      {/* Alert for critical shortages */}
      {stats.ninjasMissing > 0 && !loading && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Attention !</strong> Il manque {stats.ninjasMissing} ninja(s) sur {stats.sectorsWithShortage} secteur(s).
            Certains postes ne sont pas encore pourvus.
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Erreur: {error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearError}
              className="ml-2"
            >
              Fermer
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {/* Main Content Card */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-semibold">Txands par secteur</h2>

              {/* Mobile stats badge */}
              <div className="sm:hidden bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {sectors.length}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                <span className="sm:hidden">Actualiser</span>
                <span className="hidden sm:inline">
                  {loading ? 'Actualisation...' : 'Actualiser la liste'}
                </span>
              </Button>

              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="sm:hidden">Ajouter</span>
                <span className="hidden sm:inline">Nouveau secteur</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {loading && sectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <div className="text-center">
                <p className="text-lg font-medium">Chargement en cours...</p>
                <p className="text-sm text-muted-foreground">Récupération des données</p>
              </div>
            </div>
          ) : sectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  Aucun secteur trouvé
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Il n&apos;y a actuellement aucun secteur enregistré dans le système.
                </p>
              </div>
              <Button onClick={handleRefresh} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Loading indicator when refreshing */}
              {loading && (
                <div className="flex items-center justify-center py-2">
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Actualisation...</span>
                </div>
              )}

              <div className="w-full">
                <div className="sm:hidden mb-4 text-sm text-muted-foreground">
                  {sectors.length} secteur{sectors.length !== 1 ? 's' : ''} trouvé{sectors.length !== 1 ? 's' : ''}
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full px-4 sm:px-0">
                    <DataTable columns={columns} data={sectors} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TxandsPage