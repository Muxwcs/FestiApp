"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { VolunteerRecord } from "@/types/user.interface"

const Volunteers = () => {
  const { data: session } = useSession()
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
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
  }

  const handleDelete = async (volunteerId: string) => {
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
  }

  const getDisplayName = (volunteer: VolunteerRecord) => {
    if (volunteer.fields.name || volunteer.fields.surname) {
      return `${volunteer.fields.name || ""} ${volunteer.fields.surname || ""}`.trim()
    }
    return volunteer.fields.email || "Sans nom"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue, {session?.user?.name} ({session?.user?.role})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Liste des bénévoles</h2>
            <Button onClick={fetchVolunteers}>
              Actualiser
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div>Chargement...</div>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun bénévole trouvé
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Nom</th>
                    <th className="text-left p-2 font-medium">Email</th>
                    <th className="text-left p-2 font-medium">Rôle</th>
                    <th className="text-left p-2 font-medium">Statut</th>
                    <th className="text-left p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer.fields.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{getDisplayName(volunteer)}</td>
                      <td className="p-2">{volunteer.fields.email || "Non renseigné"}</td>
                      <td className="p-2">
                        <Badge variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}>
                          {volunteer.fields.role || "bénévole"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge
                          variant={
                            volunteer.fields.status === "actif" ? "default" :
                              volunteer.fields.status === "inactif" ? "secondary" :
                                "outline"
                          }
                        >
                          {volunteer.fields.status || "Non défini"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/benevoles/${volunteer.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(volunteer.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Volunteers