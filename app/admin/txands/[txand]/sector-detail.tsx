"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Save, X, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Referent {
  id: string
  user: { id: string; name: string | null; firstname: string | null; email: string; phone: string | null }
}

interface Timeslot {
  id: string
  name: string
  dateStart: string | null
  dateEnd: string | null
  totalVolunteers: number
  _count: { affectations: number }
}

interface SectorData {
  id: string
  name: string
  description: string | null
  color: string | null
  status: string | null
  skills: string[]
  createdAt: string
  updatedAt: string
  referents: Referent[]
  timeslots: Timeslot[]
  _count: { affectations: number }
}

interface SectorDetailProps {
  sector: SectorData
}

export function SectorDetail({ sector }: SectorDetailProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: sector.name,
    color: sector.color || "#6366f1",
    status: sector.status || "Actif",
    description: sector.description || "",
    skills: sector.skills,
  })

  const updateField = (key: string, value: unknown) => {
    setEditData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/txands/${sector.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })
      if (!res.ok) throw new Error()
      toast.success("Secteur mis à jour")
      setEditing(false)
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handleCancel = () => {
    setEditData({
      name: sector.name,
      color: sector.color || "#6366f1",
      status: sector.status || "Actif",
      description: sector.description || "",
      skills: sector.skills,
    })
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Supprimer le secteur "${sector.name}" ?`)) return
    try {
      await fetch(`/api/txands/${sector.id}`, { method: "DELETE" })
      toast.success("Secteur supprimé")
      router.push("/admin/txands")
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const formatDate = (iso: string | null) => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/admin/txands">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color || "#6366f1" }} />
            <h1 className="text-xl sm:text-2xl font-bold">{sector.name}</h1>
          </div>
        </div>

        <div className="flex space-x-2">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={isPending}>
                <Save className="h-4 w-4 mr-2" /> {isPending ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Annuler
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Modifier
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" /> Supprimer
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sector Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Nom</Label>
              {editing ? (
                <Input value={editData.name} onChange={(e) => updateField("name", e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded border">{sector.name}</p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Couleur</Label>
              {editing ? (
                <div className="flex items-center gap-2">
                  <Input type="color" value={editData.color} onChange={(e) => updateField("color", e.target.value)} className="w-16 h-10 p-1" />
                  <Input value={editData.color} onChange={(e) => updateField("color", e.target.value)} className="flex-1 font-mono" />
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted rounded border">
                  <div className="w-6 h-6 rounded border" style={{ backgroundColor: sector.color || "#6366f1" }} />
                  <span className="font-mono text-sm">{sector.color || "#6366f1"}</span>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Statut</Label>
              {editing ? (
                <Select value={editData.status} onValueChange={(v: string) => updateField("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                    <SelectItem value="En pause">En pause</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={sector.status === "Actif" ? "default" : "secondary"}>{sector.status || "Actif"}</Badge>
              )}
            </div>

            {/* Referents */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Responsable(s)</Label>
              {sector.referents.length > 0 ? (
                sector.referents.map((ref) => (
                  <Card key={ref.id} className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                    <CardContent className="p-3 space-y-1">
                      <p className="font-semibold">{ref.user.firstname} {ref.user.name}</p>
                      {ref.user.phone && (
                        <a href={`tel:${ref.user.phone}`} className="text-sm text-muted-foreground hover:text-foreground block">📞 {ref.user.phone}</a>
                      )}
                      {ref.user.email && (
                        <a href={`mailto:${ref.user.email}`} className="text-sm text-muted-foreground hover:text-foreground block truncate">✉️ {ref.user.email}</a>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded border">Aucun responsable</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details + Timeslots */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">Description</Label>
                {editing ? (
                  <Textarea value={editData.description} onChange={(e) => updateField("description", e.target.value)} rows={4} />
                ) : (
                  <div className="min-h-20 p-3 bg-muted rounded border text-sm whitespace-pre-wrap">
                    {sector.description || "Aucune description"}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">Compétences requises</Label>
                {editing ? (
                  <div>
                    <Input
                      value={editData.skills.join(", ")}
                      onChange={(e) => updateField("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                      placeholder="Ex: Bar, Accueil, Technique..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">Séparez par des virgules</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {sector.skills.length > 0
                      ? sector.skills.map((s, i) => <Badge key={i} variant="outline">{s}</Badge>)
                      : <span className="text-sm text-muted-foreground italic">Aucune compétence</span>
                    }
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg border">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{sector.timeslots.length}</div>
                  <div className="text-xs text-muted-foreground">Créneaux</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{sector._count.affectations}</div>
                  <div className="text-xs text-muted-foreground">Affectations</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">{sector.referents.length}</div>
                  <div className="text-xs text-muted-foreground">Responsable(s)</div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Créé le</Label>
                  <p className="p-2 bg-muted rounded border">{new Date(sector.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Modifié le</Label>
                  <p className="p-2 bg-muted rounded border">{new Date(sector.updatedAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeslots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Créneaux ({sector.timeslots.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {sector.timeslots.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Aucun créneau pour ce secteur</p>
              ) : (
                <div className="space-y-2">
                  {sector.timeslots.map((ts) => (
                    <div key={ts.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{ts.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(ts.dateStart)} → {formatDate(ts.dateEnd)}
                        </p>
                      </div>
                      <Badge variant={ts._count.affectations >= ts.totalVolunteers ? "default" : "secondary"}>
                        {ts._count.affectations}/{ts.totalVolunteers}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
