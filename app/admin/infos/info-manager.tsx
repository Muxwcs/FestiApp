"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Info, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TranslatedInput } from "@/components/admin/translated-input"

const emptyTranslated = { fr: "", eu: "", en: "" }
type TranslatedText = Record<string, string>

interface InfoItem {
  id: string
  title: Record<string, string>
  content: Record<string, string>
  icon: string | null
  category: string | null
  sortOrder: number
  isActive: boolean
}

const defaultForm = {
  title: { ...emptyTranslated } as TranslatedText,
  content: { ...emptyTranslated } as TranslatedText,
  icon: "",
  category: "",
  sortOrder: 0,
  isActive: true,
}

export function InfoManager({ infos }: { infos: InfoItem[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)

  const openCreate = () => {
    setEditingId(null)
    setForm(defaultForm)
    setDialogOpen(true)
  }

  const openEdit = (info: InfoItem) => {
    setEditingId(info.id)
    setForm({
      title: info.title,
      content: info.content,
      icon: info.icon || "",
      category: info.category || "",
      sortOrder: info.sortOrder,
      isActive: info.isActive,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const url = editingId ? `/api/admin/infos/${editingId}` : "/api/admin/infos"
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast.success(editingId ? "Info modifiée" : "Info créée")
      setDialogOpen(false)
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette info ?")) return
    try {
      await fetch(`/api/admin/infos/${id}`, { method: "DELETE" })
      toast.success("Supprimée")
      startTransition(() => router.refresh())
    } catch {
      toast.error("Erreur")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Infos pratiques</h1>
          <p className="text-sm text-muted-foreground">{infos.length} info{infos.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => startTransition(() => router.refresh())} disabled={isPending}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} /> Actualiser
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Nouvelle info</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Modifier l'info" : "Nouvelle info pratique"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <TranslatedInput label="Titre" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} />
                <TranslatedInput label="Contenu" value={form.content} onChange={(v) => setForm((p) => ({ ...p, content: v }))} multiline />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label>Icône (emoji)</Label>
                    <Input value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} placeholder="📍 🎵 🚗..." />
                  </div>
                  <div className="space-y-1">
                    <Label>Catégorie</Label>
                    <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="Accès, Contact..." />
                  </div>
                  <div className="space-y-1">
                    <Label>Ordre</Label>
                    <Input type="number" value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.isActive} onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))} />
                  <Label>Visible</Label>
                </div>
                <Button onClick={handleSave} className="w-full" disabled={!form.title.fr || !form.content.fr}>
                  {editingId ? "Enregistrer" : "Créer"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          {infos.length === 0 ? (
            <div className="text-center py-12">
              <Info className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune info pratique</p>
            </div>
          ) : (
            <div className="space-y-2">
              {infos.map((info) => (
                <div key={info.id} className={`flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 ${!info.isActive ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-3">
                    {info.icon && <span className="text-2xl">{info.icon}</span>}
                    <div>
                      <p className="font-medium text-sm">{info.title.fr}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-md">{info.content.fr}</p>
                      {info.category && <Badge variant="outline" className="text-xs mt-1">{info.category}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!info.isActive && <Badge variant="outline" className="text-xs">Masqué</Badge>}
                    <Button variant="ghost" size="sm" onClick={() => openEdit(info)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(info.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
