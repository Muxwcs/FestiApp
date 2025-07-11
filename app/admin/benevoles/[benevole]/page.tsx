"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { ArrowLeft, Edit, Save, X, Trash2 } from "lucide-react"
import Link from "next/link"

type Volunteer = {
  id: string
  name?: string
  surname?: string
  email?: string
  phone?: string
  role?: string
  availability?: string[]
  assignedTasks?: string[]
  status?: string
  skills?: string[]
  notes?: string
  avatar?: string
  createdAt?: string
  modifiedAt?: string
}

const VolunteerPage = () => {
  const params = useParams()
  const router = useRouter()
  const volunteerId = params.benevole as string

  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<Partial<Volunteer>>({})

  const fetchVolunteer = async () => {
    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`)
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Bénévole non trouvé")
          router.push("/admin/benevoles")
          return
        }
        throw new Error("Erreur lors du chargement")
      }
      const data = await response.json()
      setVolunteer(data)
      setEditData(data)
    } catch (error) {
      console.error("Error fetching volunteer:", error)
      toast.error("Erreur lors du chargement du bénévole")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log('Params:', params) // Debug line
    // console.log('volunteerId:', volunteerId) // Debug line
    if (volunteerId) {
      fetchVolunteer()
    }
  }, [volunteerId])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      const updatedVolunteer = await response.json()
      setVolunteer(updatedVolunteer)
      setEditing(false)
      toast.success("Bénévole mis à jour avec succès")
    } catch (error) {
      console.error("Error updating volunteer:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) return

    try {
      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast.success("Bénévole supprimé avec succès")
      router.push("/admin/benevoles")
    } catch (error) {
      console.error("Error deleting volunteer:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleCancel = () => {
    setEditData(volunteer || {})
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  if (!volunteer) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Bénévole non trouvé</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/benevoles">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            {volunteer.name || volunteer.surname
              ? `${volunteer.name || ""} ${volunteer.surname || ""}`.trim()
              : volunteer.email || "Bénévole sans nom"
            }
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Volunteer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Prénom</Label>
                {editing ? (
                  <Input
                    id="name"
                    value={editData.name || ""}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{volunteer.name || "Non renseigné"}</p>
                )}
              </div>
              <div>
                <Label htmlFor="surname">Nom</Label>
                {editing ? (
                  <Input
                    id="surname"
                    value={editData.surname || ""}
                    onChange={(e) => setEditData({ ...editData, surname: e.target.value })}
                  />
                ) : (
                  <p className="mt-1">{volunteer.surname || "Non renseigné"}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              {editing ? (
                <Input
                  id="email"
                  type="email"
                  value={editData.email || ""}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              ) : (
                <p className="mt-1">{volunteer.email || "Non renseigné"}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Téléphone</Label>
              {editing ? (
                <Input
                  id="phone"
                  value={editData.phone || ""}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              ) : (
                <p className="mt-1">{volunteer.phone || "Non renseigné"}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Rôle</Label>
              {editing ? (
                <select
                  id="role"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={editData.role || ""}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                >
                  <option value="bénévole">Bénévole</option>
                  <option value="admin">Admin</option>
                  <option value="responsable">Responsable</option>
                </select>
              ) : (
                <Badge variant={volunteer.role === "admin" ? "destructive" : "secondary"}>
                  {volunteer.role || "bénévole"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations complémentaires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Statut</Label>
              {editing ? (
                <select
                  id="status"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={editData.status || ""}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="en_attente">En attente</option>
                </select>
              ) : (
                <p className="mt-1">{volunteer.status || "Non défini"}</p>
              )}
            </div>

            <div>
              <Label htmlFor="skills">Compétences</Label>
              {editing ? (
                <Input
                  id="skills"
                  value={Array.isArray(editData.skills) ? editData.skills.join(", ") : ""}
                  onChange={(e) => setEditData({
                    ...editData,
                    skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Séparer par des virgules"
                />
              ) : (
                <div className="mt-1 flex flex-wrap gap-1">
                  {Array.isArray(volunteer.skills) && volunteer.skills.length > 0 ? (
                    volunteer.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))
                  ) : (
                    <span>Aucune compétence renseignée</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              {editing ? (
                <Textarea
                  id="notes"
                  value={editData.notes || ""}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="mt-1 whitespace-pre-wrap">{volunteer.notes || "Aucune note"}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Métadonnées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <Label>Créé le</Label>
              <p>{volunteer.createdAt ? new Date(volunteer.createdAt).toLocaleString('fr-FR') : "Non disponible"}</p>
            </div>
            <div>
              <Label>Modifié le</Label>
              <p>{volunteer.modifiedAt ? new Date(volunteer.modifiedAt).toLocaleString('fr-FR') : "Non disponible"}</p>
            </div>
            {/* <div>
              <Label>Modifié par</Label>
              <p>{volunteer.modifiedBy || "Non disponible"}</p>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VolunteerPage