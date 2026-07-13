"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Nom requis").max(100),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  totalVolunteers: z.coerce.number().int().min(0).default(0),
  details: z.string().max(1000).optional(),
})

type FormData = z.infer<typeof formSchema>

interface CreateTimeslotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sectorId: string
  sectorName: string
}

export function CreateTimeslotDialog({ open, onOpenChange, sectorId, sectorName }: CreateTimeslotDialogProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [form, setForm] = useState<FormData>({
    name: "",
    dateStart: "",
    dateEnd: "",
    totalVolunteers: 0,
    details: "",
  })

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const resetForm = () => {
    setForm({ name: "", dateStart: "", dateEnd: "", totalVolunteers: 0, details: "" })
    setErrors({})
  }

  const handleClose = (value: boolean) => {
    if (!value) resetForm()
    onOpenChange(value)
  }

  const handleSubmit = async () => {
    const parsed = formSchema.safeParse(form)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {}
      for (const [key, val] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof FormData] = val?.[0]
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        ...parsed.data,
        dateStart: parsed.data.dateStart || null,
        dateEnd: parsed.data.dateEnd || null,
      }

      const res = await fetch(`/api/txands/${sectorId}/timeslots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Erreur lors de la création")

      toast.success("Créneau créé avec succès")
      handleClose(false)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la création")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouveau créneau — {sectorName}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="ts-name">Nom *</Label>
            <Input
              id="ts-name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Ex: Vendredi soir, Samedi matin..."
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="dateStart">Début</Label>
              <Input
                id="dateStart"
                type="datetime-local"
                value={form.dateStart}
                onChange={(e) => updateField("dateStart", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dateEnd">Fin</Label>
              <Input
                id="dateEnd"
                type="datetime-local"
                value={form.dateEnd}
                onChange={(e) => updateField("dateEnd", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="totalVolunteers">Bénévoles nécessaires</Label>
            <Input
              id="totalVolunteers"
              type="number"
              min={0}
              value={form.totalVolunteers}
              onChange={(e) => updateField("totalVolunteers", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="details">Détails</Label>
            <Textarea
              id="details"
              value={form.details}
              onChange={(e) => updateField("details", e.target.value)}
              rows={3}
              placeholder="Informations complémentaires sur le créneau..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}