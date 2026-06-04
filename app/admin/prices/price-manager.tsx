"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Euro, RefreshCw } from "lucide-react"
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

interface PriceItem {
  id: string
  title: Record<string, string>
  description: Record<string, string> | null
  amount: number
  currency: string
  category: string | null
  sortOrder: number
  isActive: boolean
}

const defaultForm = {
  title: { ...emptyTranslated } as TranslatedText,
  description: { ...emptyTranslated } as TranslatedText,
  amount: 0,
  currency: "EUR",
  category: "",
  sortOrder: 0,
  isActive: true
}

export function PriceManager({ prices }: { prices: PriceItem[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultForm)

  const openCreate = () => { setEditingId(null); setForm(defaultForm); setDialogOpen(true) }
  const openEdit = (p: PriceItem) => {
    setEditingId(p.id)
    setForm({ title: p.title, description: p.description || { ...emptyTranslated }, amount: p.amount, currency: p.currency, category: p.category || "", sortOrder: p.sortOrder, isActive: p.isActive })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const payload = { ...form, description: form.description.fr ? form.description : undefined }
    try {
      const url = editingId ? `/api/admin/prices/${editingId}` : "/api/admin/prices"
      const res = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error()
      toast.success(editingId ? "Tarif modifié" : "Tarif créé")
      setDialogOpen(false)
      startTransition(() => router.refresh())
    } catch { toast.error("Erreur") }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce tarif ?")) return
    try { await fetch(`/api/admin/prices/${id}`, { method: "DELETE" }); toast.success("Supprimé"); startTransition(() => router.refresh()) }
    catch { toast.error("Erreur") }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tarifs</h1>
          <p className="text-sm text-muted-foreground">{prices.length} tarif{prices.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => startTransition(() => router.refresh())} disabled={isPending}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`} /> Actualiser
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Nouveau tarif</Button></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editingId ? "Modifier le tarif" : "Nouveau tarif"}</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <TranslatedInput label="Titre" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} />
                <TranslatedInput label="Description" value={form.description} onChange={(v) => setForm((p) => ({ ...p, description: v }))} multiline />
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label>Montant (€)</Label>
                    <Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: parseFloat(e.target.value) || 0 }))} />
                  </div>
                  <div className="space-y-1">
                    <Label>Catégorie</Label>
                    <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="Entrée, Pass..." />
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
                <Button onClick={handleSave} className="w-full" disabled={!form.title.fr}>{editingId ? "Enregistrer" : "Créer"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          {prices.length === 0 ? (
            <div className="text-center py-12">
              <Euro className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun tarif</p>
            </div>
          ) : (
            <div className="space-y-2">
              {prices.map((price) => (
                <div key={price.id} className={`flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 ${!price.isActive ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-primary min-w-15">
                      {price.amount === 0 ? "Gratuit" : `${price.amount}€`}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{price.title.fr}</p>
                      {price.category && <Badge variant="outline" className="text-xs">{price.category}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!price.isActive && <Badge variant="outline" className="text-xs">Masqué</Badge>}
                    <Button variant="ghost" size="sm" onClick={() => openEdit(price)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(price.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
