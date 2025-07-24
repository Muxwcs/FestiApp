"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Edit, Save, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { useSectorsStore } from "@/stores/sectorsStore" // ✅ Change to sectors store

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { VolunteersList } from "@/components/volunteers/volunteers-list"

import { SectorRecord } from "@/types/sector.interface"

const TxandPage = () => {
  const params = useParams()
  const router = useRouter()
  const txandId = params.txand as string

  const {
    getSectorById,
    updateSector,
    fetchSectors,
    deleteSector
  } = useSectorsStore() // ✅ Use sectors store

  const [sector, setSector] = useState(() => getSectorById(txandId))
  const [loading, setLoading] = useState(!sector)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editData, setEditData] = useState<Partial<SectorRecord>>({})

  // Fetch sector data if not in store
  useEffect(() => {
    if (!sector) {
      setLoading(true)
      fetchSectors().then(() => {
        const foundSector = getSectorById(txandId) // ✅ Fixed variable name
        if (foundSector) {
          setSector(foundSector)
          setEditData(foundSector)
        } else {
          toast.error("Secteur non trouvé")
          router.push("/admin/txands") // ✅ Fixed redirect path
        }
        setLoading(false)
      })
    } else {
      setEditData(sector)
    }
  }, [sector, txandId, fetchSectors, getSectorById, router])

  // Handle save with store update
  const handleSave = async () => {
    setSaving(true)
    try {
      const fieldsToUpdate = editData.fields || {}

      const response = await fetch(`/api/txands/${txandId}`, { // ✅ Fixed API endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldsToUpdate),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      const updatedData = await response.json()

      // Update store
      updateSector(txandId, {
        fields: updatedData.fields || updatedData
      })

      // Update local state
      const updatedSector = getSectorById(txandId) // ✅ Fixed variable name
      if (updatedSector) {
        setSector(updatedSector)
        setEditData(updatedSector)
      }

      setEditing(false)
      toast.success("Secteur mis à jour avec succès") // ✅ Fixed message
    } catch (error) {
      console.error("Error updating sector:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce secteur ?")) return // ✅ Fixed message

    try {
      await deleteSector(txandId)
      toast.success("Secteur supprimé avec succès") // ✅ Fixed message
      router.push("/admin/txands") // ✅ Fixed redirect
    } catch (error) {
      console.error("Error deleting sector:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleCancel = () => {
    setEditData(sector || {})
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg">Chargement...</div>
      </div>
    )
  }

  if (!sector) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-lg text-center">Secteur non trouvé</div> {/* ✅ Fixed message */}
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
            <Link href="/admin/txands">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {sector.fields.name || "Secteur sans nom"} {/* ✅ Fixed text */}
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
              <CardTitle className="text-lg sm:text-xl">{sector.fields.name || "Non renseigné"}</CardTitle>
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
                    <p className="min-h-[20px]">{sector.fields.name || "Non renseigné"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referent" className="text-sm font-medium">Nom</Label>
                  {editing ? (
                    <Input
                      id="referent"
                      value={editData?.fields?.referent || ""}
                      onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, referent: e.target.value } })}
                      className="w-full"
                    />
                  ) : (
                    <p className="min-h-[20px]">{sector.fields.referent || "Non renseigné"}</p>
                  )}
                </div>
              </div>

              {/* Txands */}
              <div className="space-y-2">
                <Label htmlFor="txands" className="text-sm font-medium">Email</Label>
                {editing ? (
                  <Input
                    id="txands"
                    // type="email"
                    value={editData?.fields?.txands || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, txands: e.target.value } })}
                    className="w-full"
                  />
                ) : (
                  <p className="break-all min-h-[20px]">{sector.fields.txands || "Non renseigné"}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="affectations" className="text-sm font-medium">Téléphone</Label>
                {editing ? (
                  <Input
                    id="affectations"
                    value={editData?.fields?.affectations || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, affectations: e.target.value } })}
                    className="w-full"
                  />
                ) : (
                  <p className="min-h-[20px]">{sector.fields.affectations || "Non renseigné"}</p>
                )}
              </div>

              {/* Role
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
                    <Badge variant={sector.fields.role === "admin" ? "destructive" : "secondary"}>
                      {sector.fields.role || "bénévole"}
                    </Badge>
                  </div>
                )}
              </div> */}
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              {/* <div className="space-y-2">
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
                  <p className="min-h-[20px]">{sector.fields.status || "Non défini"}</p>
                )}
              </div> */}

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
                      {Array.isArray(sector.fields.skills) && sector.fields.skills.length > 0 ? (
                        sector.fields.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Aucune compétence renseignée</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Notes</Label>
                {editing ? (
                  <Textarea
                    id="description"
                    value={editData?.fields?.description || ""}
                    onChange={(e) => setEditData({ ...editData, fields: { ...editData.fields, description: e.target.value } })}
                    rows={4}
                    className="w-full resize-none"
                  />
                ) : (
                  <p className="whitespace-pre-wrap min-h-[80px] p-2 bg-gray-50 rounded border">
                    {sector.fields.description || "Aucune note"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ VolunteersList will now use the sectors store automatically */}
        <VolunteersList
          sectorId={txandId}
          sectorName={sector.fields.name || "Non renseigné"}
        />

        {/* Your existing metadata card */}
      </div>
    </div>
  )
}

export default TxandPage