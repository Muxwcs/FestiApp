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
  description: z.string().max(500).optional(),
  color: z.string().max(20).optional(),
  skills: z.string().max(500).optional(),
})

type FormData = z.infer<typeof formSchema>

interface CreateSectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSectorDialog({ open, onOpenChange }: CreateSectorDialogProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    color: "#6366f1",
    skills: "",
  })

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const resetForm = () => {
    setForm({ name: "", description: "", color: "#6366f1", skills: "" })
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
        skills: parsed.data.skills
          ? parsed.data.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      }

      const res = await fetch("/api/txands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Erreur lors de la création")

      toast.success("Secteur créé avec succès")
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
          <DialogTitle>Nouveau secteur</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nom *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Ex: Bar, Accueil, Technique..."
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="color">Couleur</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={form.color}
                onChange={(e) => updateField("color", e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                value={form.color}
                onChange={(e) => updateField("color", e.target.value)}
                className="flex-1 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="skills">Compétences</Label>
            <Input
              id="skills"
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              placeholder="Bar, Service, Accueil... (séparées par des virgules)"
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