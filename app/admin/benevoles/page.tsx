"use client"

import { useCallback, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import { RefreshCw, Users, Plus, AlertCircle } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { useVolunteersStore } from "@/stores/volunteersStore"

import { DataTable } from "./data-table"
import { createColumns } from "./columns"

const Volunteers = () => {
  const { data: session } = useSession()
  const isHydrated = useVolunteersStore()
  // Use Zustand store
  const {
    volunteers,
    loading,
    error,
    fetchVolunteers,
    deleteVolunteer,
    forceRefresh,
    clearError
  } = useVolunteersStore()

  // Fetch volunteers after hydration
  useEffect(() => {
    if (isHydrated) {
      fetchVolunteers()
    }
  }, [isHydrated, fetchVolunteers])

  // Handle delete with optimistic updates
  const handleDelete = useCallback(async (volunteerId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) return

    try {
      await deleteVolunteer(volunteerId)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }, [deleteVolunteer])

  // Handle manual refresh
  const handleRefresh = useCallback(async () => {
    await forceRefresh()
  }, [forceRefresh])

  // Memoize columns
  const columns = useMemo(() => createColumns(handleDelete), [handleDelete])

  // Show loading until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Card */}
      <Card className="w-full overflow-x-scroll">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
                Gestion des Bénévoles
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Bienvenue, {session?.user?.name || "Utilisateur"}
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline text-xs sm:text-sm">
                  ({session?.user?.role || "Utilisateur"})
                </span>
              </p>
            </div>

            {/* Stats Badge */}
            <div className="hidden sm:flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-lg">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {volunteers.length} bénévole{volunteers.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

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
              <h2 className="text-lg sm:text-xl font-semibold">Liste des bénévoles</h2>

              {/* Mobile stats badge */}
              <div className="sm:hidden bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {volunteers.length}
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
                <span className="hidden sm:inline">Nouveau bénévole</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {loading && volunteers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <div className="text-center">
                <p className="text-lg font-medium">Chargement en cours...</p>
                <p className="text-sm text-muted-foreground">Récupération des données</p>
              </div>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-muted-foreground">
                  Aucun bénévole trouvé
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Il n&apos;y a actuellement aucun bénévole enregistré dans le système.
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
                  {volunteers.length} bénévole{volunteers.length !== 1 ? 's' : ''} trouvé{volunteers.length !== 1 ? 's' : ''}
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full px-4 sm:px-0">
                    <DataTable columns={columns} data={volunteers} />
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

export default Volunteers