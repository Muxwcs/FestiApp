"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Calendar, Music, PartyPopper, Info, RefreshCw, SprayCan } from "lucide-react"
import { toast } from "sonner"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TranslatedInput } from "@/components/admin/translated-input"
import type { Days, EventCategory, Places } from "@/generated/prisma/client"
import { daysLabels, eventCategoryLabels, placesLabels } from "@/lib/enum-labels"

const emptyTranslated = { fr: "", eu: "", en: "" }
type TranslatedText = Record<string, string>

interface EventItem {
  id: string
  title: Record<string, string>
  description: Record<string, string> | null
  category: EventCategory
  place: Places
  day: Days
  startTime: string
  endTime: string | null
  imageSrc: string | null
  style: string | null
  sortOrder: number
  isActive: boolean
}

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  CONCERT: <Music className="h-4 w-4" />,
  ANIMATION: <PartyPopper className="h-4 w-4" />,
  INFO: <Info className="h-4 w-4" />,
  SKATE: <span className="text-sm">🛹</span>,
  STREET_ART: <SprayCan className="h-4 w-4" />,
}

const categoryColors: Record<EventCategory, string> = {
  CONCERT: "bg-purple-100 text-purple-700",
  ANIMATION: "bg-blue-100 text-blue-700",
  INFO: "bg-green-100 text-green-700",
  SKATE: "bg-yellow-100 text-yellow-700",
  STREET_ART: "bg-pink-100 text-pink-700",
}

const defaultForm = {
  title: { ...emptyTranslated } as TranslatedText,
  description: { ...emptyTranslated } as TranslatedText,
  category: "CONCERT" as EventCategory,
  place: "HANDIA" as Places,
  day: "VENDREDI" as Days,
  startTime: "",
  endTime: "",
  imageSrc: "",
  style: "",
  sortOrder: 0,
  isActive: true,
}

export function EventManager({ events }: { events: EventItem[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)

  const days = Object.keys(daysLabels) as Days[]

  const openCreate = () => {
    setEditingId(null)
    setForm(defaultForm)
    setDialogOpen(true)
  }

  const openEdit = (event: EventItem) => {
    setEditingId(event.id)
    setForm({
      title: event.title,
      description: event.description || { ...emptyTranslated },
      category: event.category,
      place: event.place,
      day: event.day,
      startTime: event.startTime.slice(0, 16),
      endTime: event.endTime?.slice(0, 16) || "",
      imageSrc: event.imageSrc || "",
      style: event.style || "",
      sortOrder: event.sortOrder,
      isActive: event.isActive,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const payload = {
      ...form,
      startTime: new Date(form.startTime).toISOString(),
      endTime: form.endTime ? new Date(form.endTime).toISOString() : undefined,
      description: form.description.fr ? form.description : undefined,
      style: form.style || undefined,
    }

    try {
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      toast.success(editingId ? "Événement modifié" : "Événement créé")
      setDialogOpen(false)
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return
    try {
      await fetch(`/api/admin/events/${id}`, { method: "DELETE" })
      toast.success("Événement supprimé")
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Programme du festival</h1>
          <p className="text-sm text-muted-foreground">{events.length} événement{events.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => startTransition(() => router.refresh())} disabled={isPending}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} /> Actualiser
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Nouvel événement</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Modifier l'événement" : "Nouvel événement"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <TranslatedInput label="Titre" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} />
                <TranslatedInput label="Description" value={form.description} onChange={(v) => setForm((p) => ({ ...p, description: v }))} multiline />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Catégorie</Label>
                    <Select value={form.category} onValueChange={(v: string) => setForm((p) => ({ ...p, category: v as EventCategory }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(eventCategoryLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Jour</Label>
                    <Select value={form.day} onValueChange={(v) => setForm((p) => ({ ...p, day: v as Days }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(daysLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Début</Label>
                    <Input type="datetime-local" value={form.startTime} onChange={(e) => setForm((p) => ({ ...p, startTime: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label>Fin</Label>
                    <Input type="datetime-local" value={form.endTime} onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Lieu</Label>
                    <Select value={form.place} onValueChange={(v) => setForm((p) => ({ ...p, place: v as Places }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(placesLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Style musical</Label>
                    <Input value={form.style} onChange={(e) => setForm((p) => ({ ...p, style: e.target.value }))} placeholder="rock, reggae..." />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Image (URL)</Label>
                    <Input value={form.imageSrc} onChange={(e) => setForm((p) => ({ ...p, imageSrc: e.target.value }))} placeholder="https://..." />
                  </div>
                  <div className="space-y-1">
                    <Label>Ordre d&apos;affichage</Label>
                    <Input type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={form.isActive} onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))} />
                  <Label>Actif (visible sur la page publique)</Label>
                </div>

                <Button onClick={handleSave} className="w-full" disabled={!form.title.fr || !form.day || !form.startTime}>
                  {editingId ? "Enregistrer les modifications" : "Créer l'événement"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Events grouped by day */}
      {events.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Aucun événement</p>
            <p className="text-sm text-muted-foreground">Créez votre premier événement pour commencer.</p>
          </CardContent>
        </Card>
      ) : (
        days
          .filter((day) => events.some((e) => e.day === day))
          .map((day) => (
            <Card key={day}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 capitalize">
                  <Calendar className="h-5 w-5" /> {daysLabels[day]}
                  <Badge variant="secondary">{events.filter((e) => e.day === day).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {events
                  .filter((e) => e.day === day)
                  .map((event) => (
                    <div key={event.id} className={`flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 ${!event.isActive ? "opacity-50" : ""}`}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge className={categoryColors[event.category]}>
                          {categoryIcons[event.category]}
                        </Badge>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{event.title.fr}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(event.startTime)}
                            {event.endTime && ` – ${formatTime(event.endTime)}`}
                            {` • ${placesLabels[event.place]}`}
                            {event.style && ` • ${event.style}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {!event.isActive && <Badge variant="outline" className="text-xs">Masqué</Badge>}
                        <Button variant="ghost" size="sm" onClick={() => openEdit(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))
      )}
    </div>
  )
}
