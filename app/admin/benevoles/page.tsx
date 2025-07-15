"use client"

import { useSession } from "next-auth/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { VolunteerRecord } from "@/types/user.interface"
import { DataTable } from "./data-table"
import { createColumns } from "./columns"
import { Plus, RefreshCw, Users } from "lucide-react"

const Volunteers = () => {
  const { data: session } = useSession()
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVolunteers = useCallback(async () => {
    try {
      const response = await fetch("/api/volunteers")
      if (!response.ok) {
        throw new Error("Erreur lors du chargement")
      }
      const data = await response.json()
      setVolunteers(data)
    } catch (error) {
      console.error("Error fetching volunteers:", error)
      toast.error("Erreur lors du chargement des bénévoles")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers])

  const handleDelete = useCallback(async (volunteerId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) return

    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast.success("Bénévole supprimé avec succès")
      fetchVolunteers() // Refresh the list
    } catch (error) {
      console.error("Error deleting volunteer:", error)
      toast.error("Erreur lors de la suppression")
    }
  }, [fetchVolunteers])

  // Memoize columns to prevent recreation on every render
  const columns = useMemo(() => createColumns(handleDelete), [handleDelete])

  return (
    <div className="min-h-screen space-y-6">
      {/* Header Card - Responsive */}
      <Card className="w-full">
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

            {/* Stats Badge - Hidden on very small screens */}
            <div className="hidden sm:flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-lg">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {volunteers.length} bénévole{volunteers.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

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

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                onClick={fetchVolunteers}
                variant="outline"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                <span className="sm:hidden">Actualiser</span>
                <span className="hidden sm:inline">Actualiser la liste</span>
              </Button>

              {/* Add Volunteer Button - Optional */}
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="sm:hidden">Ajouter</span>
                <span className="hidden sm:inline">Nouveau bénévole</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {loading ? (
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
              <Button onClick={fetchVolunteers} variant="outline" className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Table Container - Responsive */}
              <div className="w-full">
                {/* Mobile: Show count */}
                <div className="sm:hidden mb-4 text-sm text-muted-foreground">
                  {volunteers.length} bénévole{volunteers.length !== 1 ? 's' : ''} trouvé{volunteers.length !== 1 ? 's' : ''}
                </div>

                {/* Horizontal scroll wrapper for table */}
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