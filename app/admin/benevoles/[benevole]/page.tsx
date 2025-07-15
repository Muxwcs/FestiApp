"use client"

import { useCallback, useEffect, useState } from "react"
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
import { VolunteerRecord } from "@/types/user.interface"

const VolunteerPage = () => {
  const params = useParams()
  const router = useRouter()
  const volunteerId = params.benevole as string

  const [volunteer, setVolunteer] = useState<VolunteerRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<Partial<VolunteerRecord>>({})

  // Wrap fetchVolunteer in useCallback to prevent infinite re-renders
  const fetchVolunteer = useCallback(async () => {
    if (!volunteerId) return // Early return if no volunteerId

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
  }, [volunteerId, router]) // Dependencies: volunteerId and router

  useEffect(() => {
    fetchVolunteer()
  }, [fetchVolunteer]) // Now fetchVolunteer is memoized and safe to use as dependency

  const handleSave = async () => {
    setSaving(true)
    try {
      // Send only the fields, not the whole editData object
      const fieldsToUpdate = editData.fields || {}

      const response = await fetch(`/api/volunteers/${volunteerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldsToUpdate), // Send only fields
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      const updatedVolunteer = await response.json()

      // Transform response back to your expected format if needed
      const transformedVolunteer = {
        id: updatedVolunteer.id,
        fields: updatedVolunteer.fields || updatedVolunteer
      }

      setVolunteer(transformedVolunteer)
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
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  if (!volunteer) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg text-center">Bénévole non trouvé</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header - Responsive */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Title Section */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Link href="/admin/benevoles">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {volunteer.fields.name || volunteer.fields.surname
                ? `${volunteer.fields.name || ""} ${volunteer.fields.surname || ""}`.trim()
                : volunteer.fields.email || "Bénévole sans nom"
              }
            </h1>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:flex-row">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name Fields - Mobile: Stack, Desktop: Side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Prénom</Label>
                  {editing ? (
                    <Input
                      id="name"
                      value={editData?.fields?.name || ""}
                      onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, name: e.target.value } })}
                      className="w-full"
                    />
                  ) : (
                    <p className="min-h-[20px]">{volunteer.fields.name || "Non renseigné"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-sm font-medium">Nom</Label>
                  {editing ? (
                    <Input
                      id="surname"
                      value={editData?.fields?.surname || ""}
                      onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, surname: e.target.value } })}
                      className="w-full"
                    />
                  ) : (
                    <p className="min-h-[20px]">{volunteer.fields.surname || "Non renseigné"}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                {editing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editData?.fields?.email || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, email: e.target.value } })}
                    className="w-full"
                  />
                ) : (
                  <p className="break-all min-h-[20px]">{volunteer.fields.email || "Non renseigné"}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                {editing ? (
                  <Input
                    id="phone"
                    value={editData?.fields?.phone || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, phone: e.target.value } })}
                    className="w-full"
                  />
                ) : (
                  <p className="min-h-[20px]">{volunteer.fields.phone || "Non renseigné"}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">Rôle</Label>
                {editing ? (
                  <select
                    id="role"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData?.fields?.role || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, role: e.target.value as "admin" | "bénévole" } })}
                  >
                    <option value="bénévole">Bénévole</option>
                    <option value="admin">Admin</option>
                    <option value="responsable">Responsable</option>
                  </select>
                ) : (
                  <div className="min-h-[20px]">
                    <Badge variant={volunteer.fields.role === "admin" ? "destructive" : "secondary"}>
                      {volunteer.fields.role || "bénévole"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">Statut</Label>
                {editing ? (
                  <select
                    id="status"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData?.fields?.status || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, status: e.target.value } })}
                  >
                    <option value="">Sélectionner un statut</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="en_attente">En attente</option>
                  </select>
                ) : (
                  <p className="min-h-[20px]">{volunteer.fields.status || "Non défini"}</p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium">Compétences</Label>
                {editing ? (
                  <Input
                    id="skills"
                    value={Array.isArray(editData?.fields?.skills) ? editData?.fields?.skills.join(", ") : ""}
                    onChange={(e) => setEditData({
                      ...editData, fields: { ...editData.fields, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }
                    })}
                    placeholder="Séparer par des virgules"
                    className="w-full"
                  />
                ) : (
                  <div className="min-h-[20px]">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(volunteer.fields.skills) && volunteer.fields.skills.length > 0 ? (
                        volunteer.fields.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Aucune compétence renseignée</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                {editing ? (
                  <Textarea
                    id="notes"
                    value={editData?.fields?.notes || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, notes: e.target.value } })}
                    rows={4}
                    className="w-full resize-none"
                  />
                ) : (
                  <p className="whitespace-pre-wrap min-h-[80px] p-2 bg-gray-50 rounded border">
                    {volunteer.fields.notes || "Aucune note"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metadata Card - Full Width */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Métadonnées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">Créé le</Label>
                <p className="text-sm">
                  {volunteer.fields.createdAt ? new Date(volunteer.fields.createdAt).toLocaleString('fr-FR') : "Non disponible"}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">Modifié le</Label>
                <p className="text-sm">
                  {volunteer.fields.modifiedAt ? new Date(volunteer.fields.modifiedAt).toLocaleString('fr-FR') : "Non disponible"}
                </p>
              </div>
              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <Label className="text-xs font-medium text-gray-600">ID Airtable</Label>
                <p className="font-mono text-xs break-all">{volunteer.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VolunteerPage