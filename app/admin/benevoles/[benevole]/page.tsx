"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Edit, Save, X, Trash2, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { VolunteerRecord } from "@/types/user.interface"
import { useVolunteer } from "@/hooks/use-volunteer" // ✅ New hook

const VolunteerPage = () => {
  const params = useParams()
  const router = useRouter()
  const volunteerId = params.benevole as string

  // ✅ Use React Query hook instead of store
  const {
    volunteer,
    isLoading,
    error,
    updateVolunteer,
    deleteVolunteer,
    refetch,
    isUpdating,
    isDeleting,
    isNotFound
  } = useVolunteer(volunteerId)

  // ✅ Simplified local state
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<VolunteerRecord>>({})

  // ✅ Initialize edit data when volunteer loads
  useState(() => {
    if (volunteer && !editing) {
      setEditData(volunteer)
    }
  })

  console.log("Volunteer data:", volunteer)

  // ✅ Handle save with React Query
  const handleSave = async () => {
    if (!editData.fields) return

    updateVolunteer(
      { id: volunteerId, updates: editData },
      {
        onSuccess: () => {
          setEditing(false)
          // editData will be updated automatically via React Query
        }
      }
    )
  }

  // ✅ Handle delete with React Query
  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bénévole ?")) return

    deleteVolunteer(volunteerId, {
      onSuccess: () => {
        router.push("/admin/benevoles")
      }
    })
  }

  // ✅ Handle cancel
  const handleCancel = () => {
    setEditData(volunteer || {})
    setEditing(false)
  }

  // ✅ Start editing
  const handleEdit = () => {
    setEditData(volunteer || {})
    setEditing(true)
  }

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span className="text-lg">Chargement...</span>
        </div>
      </div>
    )
  }

  // ✅ Not found state
  if (isNotFound) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h1 className="text-xl font-semibold">Bénévole non trouvé</h1>
              <p className="text-muted-foreground">Le bénévole avec l&apos;ID {volunteerId} n&apos;existe pas.</p>
            </div>
            <Link href="/admin/benevoles">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ✅ Error state
  if (error && !isNotFound) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link href="/admin/benevoles">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Erreur: {error.message}</span>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // ✅ No volunteer data
  if (!volunteer) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg text-center">Aucune donnée disponible</div>
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
                  disabled={isUpdating}
                  className="w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isUpdating ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleEdit}
                  className="w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ✅ Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <Alert>
            <AlertDescription>
              🔧 React Query: {isLoading ? 'Loading' : 'Loaded'} |
              Cache: {volunteer ? 'Hit' : 'Miss'} |
              Updating: {isUpdating ? 'Yes' : 'No'}
            </AlertDescription>
          </Alert>
        )}

        {/* Rest of your existing JSX for the cards - keep exactly as is */}
        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Keep all your existing form fields exactly as they are */}
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

          {/* Keep your second card exactly as is */}
          {/* Additional Information Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Keep all your existing fields */}
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

        {/* Keep your metadata card exactly as is */}
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