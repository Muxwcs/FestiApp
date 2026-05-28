"use client"

import { useCallback, useEffect, useMemo, useRef } from "react"
import { AlertCircle, AlertTriangle, Plus, RefreshCw, UserCheck, Users, UserX } from "lucide-react"
import { useSession } from "next-auth/react"

import { useSectorsStore } from "@/stores/sectorsStore"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import StatsCard from "@/components/stats-card"

import { DataTable } from "../admin/benevoles/data-table"
import { createColumns } from "./columns"

const ReferentPage = () => {
  const { data: session } = useSession()

  const {
    referentSectors,
    loading,
    error,
    fetchReferentSectors,
    deleteSector,
    forceRefreshReferentSectors,
    clearError,
    isHydrated
  } = useSectorsStore()

  // ✅ FIX: Add a ref to prevent infinite calls
  const hasFetched = useRef(false)

  console.log(session, 'Session user:', session?.user)

  // ✅ FIXED: Fetch sectors only once after hydration
  useEffect(() => {
    if (isHydrated && !hasFetched.current && !loading) {
      console.log("🔄 Fetching sectors for referent page")
      hasFetched.current = true
      fetchReferentSectors()
    }
  }, [isHydrated, loading]) // ✅ Remove fetchReferentSectors from dependencies

  // ✅ Reset hasFetched when needed
  useEffect(() => {
    if (!isHydrated) {
      hasFetched.current = false
    }
  }, [isHydrated])

  // ✅ FIX: Don't filter again - use referentSectors directly
  const mySectors = useMemo(() => {
    console.log("🔍 Processing sectors:", {
      referentSectorsCount: referentSectors?.length || 0,
      referentSectors: referentSectors
    })

    // ✅ API already filtered, just return what we got
    return referentSectors || []
  }, [referentSectors])

  // ✅ Calculate stats from filtered sectors
  const stats = useMemo(() => {
    if (!mySectors || mySectors.length === 0) {
      return {
        totalSectors: 0,
        totalNinjasNeeded: 0,
        totalNinjasAssigned: 0,
        ninjasMissing: 0,
        completionRate: 0,
        sectorsWithShortage: 0
      }
    }

    const totalSectors = mySectors.length

    const totalNinjasNeeded = mySectors.reduce((sum, sector) => {
      const needs = sector.fields?.totalVolunteers || 0
      return sum + (typeof needs === 'number' ? needs : 0)
    }, 0)

    const totalNinjasAssigned = mySectors.reduce((sum, sector) => {
      const volunteers = sector.fields?.totalVolunteers || 0
      const needs = sector.fields?.totalNeeds || 0
      if (typeof volunteers === 'number' && typeof needs === 'number') {
        const total = volunteers - needs
        return sum + total
      }
      return sum
    }, 0)

    const ninjasMissing = mySectors.reduce((sum, sector) => {
      const needs = sector.fields?.totalNeeds || 0
      return sum + (typeof needs === 'number' ? needs : 0)
    }, 0)

    const completionRate = totalNinjasNeeded > 0 ? Math.round((totalNinjasAssigned / totalNinjasNeeded) * 100) : 0

    // Count sectors with shortage
    const sectorsWithShortage = mySectors.filter(sector => {
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
  }, [mySectors])

  // ✅ Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Referent Page Debug:')
      console.log('- Session user ID:', session?.user?.id)
      console.log('- Total sectors:', referentSectors.length)
      console.log('- My sectors:', mySectors.length)
      console.log('- My sectors:', mySectors.map(s => ({ id: s.id, name: s.fields?.name, referents: s.fields?.referent })))
    }
  }, [referentSectors, mySectors, session?.user?.id])

  // Handle delete - referents can only delete their own sectors
  const handleDelete = useCallback(async (sectorId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce secteur ?")) return

    try {
      await deleteSector(sectorId)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }, [deleteSector])

  // Handle manual refresh
  const handleRefresh = useCallback(async () => {
    await forceRefreshReferentSectors()
  }, [forceRefreshReferentSectors])

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

  // ✅ Show message if user is not authenticated
  if (!session?.user) {
    return (
      <div className="min-h-screen sm:p-6 lg:p-8 flex items-center justify-center">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Vous devez être connecté pour accéder à cette page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen sm:p-6 lg:p-8 space-y-6">
      {/* ✅ Header with user context */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Mon Espace Référent</h1>
        <p className="text-muted-foreground">
          Gestion des secteurs dont vous êtes responsable
        </p>
      </div>

      {/* ✅ Stats Cards Grid - Only show if there are sectors */}
      {(!loading || mySectors.length > 0) && mySectors.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Mes secteurs"
            value={stats.totalSectors}
            icon={<Users className="h-5 w-5" />}
            description="Secteurs sous votre responsabilité"
            variant="default"
          />

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
        </div>
      )}

      {/* Alert for critical shortages */}
      {stats.ninjasMissing > 0 && !loading && mySectors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Attention !</strong> Il manque {stats.ninjasMissing} ninja(s) sur {stats.sectorsWithShortage} de vos secteurs.
            Certains postes ne sont pas encore pourvus.
          </AlertDescription>
        </Alert>
      )}

      {/* ✅ Info message if user has no sectors */}
      {!loading && mySectors.length === 0 && referentSectors.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Aucun secteur assigné</strong><br />
            Vous n&apos;êtes actuellement responsable d&apos;aucun secteur. Contactez un administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
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
              <h2 className="text-lg sm:text-xl font-semibold">Mes secteurs</h2>

              {/* Mobile stats badge */}
              <div className="sm:hidden bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {mySectors.length}
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

              {/* ✅ Referents typically can't create new sectors, but can request them */}
              <Button variant="outline" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="sm:hidden">Demander</span>
                <span className="hidden sm:inline">Demander un secteur</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {loading && mySectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <div className="text-center">
                <p className="text-lg font-medium">Chargement en cours...</p>
                <p className="text-sm text-muted-foreground">Récupération de vos secteurs</p>
              </div>
            </div>
          ) : mySectors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  Aucun secteur assigné
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Vous n&apos;êtes actuellement responsable d&apos;aucun secteur.
                  Les secteurs vous seront assignés par un administrateur.
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
                  {mySectors.length} secteur{mySectors.length !== 1 ? 's' : ''} assigné{mySectors.length !== 1 ? 's' : ''}
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full px-4 sm:px-0">
                    <DataTable columns={columns} data={mySectors} />
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

export default ReferentPage