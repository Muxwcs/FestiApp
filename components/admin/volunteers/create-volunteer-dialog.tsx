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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email("Email invalide").max(255).optional().or(z.literal("")),
  password: z.string().min(8, "Minimum 8 caractères").max(100).optional().or(z.literal("")),
  name: z.string().min(1, "Nom requis").max(100),
  firstname: z.string().min(1, "Prénom requis").max(100),
  surname: z.string().max(100).optional(),
  phone: z.string().min(1, "Téléphone requis").max(20),
  role: z.enum(["ADMIN", "BENEVOLE"]),
  notes: z.string().max(2000).optional(),
})

type FormData = z.infer<typeof formSchema>

interface CreateVolunteerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateVolunteerDialog({ open, onOpenChange }: CreateVolunteerDialogProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [createdEmail, setCreatedEmail] = useState<string | null>(null)

  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    firstname: "",
    surname: "",
    phone: "",
    role: "BENEVOLE",
    notes: "",
  })

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const resetForm = () => {
    setForm({ email: "", name: "", firstname: "", surname: "", phone: "", role: "BENEVOLE", notes: "" })
    setErrors({})
    setTempPassword(null)
    setCreatedEmail(null)
    setCopied(false)
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
      const payload = { ...parsed.data }
      if (!payload.email) delete payload.email
      if (!payload.password) delete payload.password

      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Erreur lors de la création")
      }

      const data = await res.json()
      setCreatedEmail(data.fields.email)
      setTempPassword(data.temporaryPassword)
      toast.success("Bénévole créé avec succès")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la création")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopy = async () => {
    if (!tempPassword) return
    await navigator.clipboard.writeText(tempPassword)
    setCopied(true)
    toast.success("Mot de passe copié")
    setTimeout(() => setCopied(false), 2000)
  }

  // After creation: show temporary password
  if (tempPassword) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bénévole créé ✓</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Compte créé pour <span className="font-medium text-foreground">{createdEmail}</span>.
              Communiquez les identifiants ci-dessous.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-sm font-mono">
                {createdEmail}
              </code>
              <Button variant="outline" size="icon" onClick={() => {
                navigator.clipboard.writeText(createdEmail || "")
                toast.success("Email copié")
              }}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-sm font-mono">
                {tempPassword}
              </code>
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Ce mot de passe ne sera plus visible après fermeture.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => handleClose(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau bénévole</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Email (optionnel) */}
          <div className="space-y-1">
            <Label htmlFor="email">Email <span className="text-muted-foreground text-xs">(optionnel)</span></Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Généré automatiquement si vide"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Nom / Prénom */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstname">Prénom *</Label>
              <Input
                id="firstname"
                value={form.firstname}
                onChange={(e) => updateField("firstname", e.target.value)}
              />
              {errors.firstname && <p className="text-xs text-destructive">{errors.firstname}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
          </div>

          {/* Surnom */}
          <div className="space-y-1">
            <Label htmlFor="surname">Surnom</Label>
            <Input
              id="surname"
              value={form.surname}
              onChange={(e) => updateField("surname", e.target.value)}
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-1">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="06 12 34 56 78"
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe <span className="text-muted-foreground text-xs">(optionnel)</span></Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="text"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Généré automatiquement si vide"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
                  const pwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
                  updateField("password", pwd)
                }}
              >
                Générer
              </Button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          {/* Rôle */}
          <div className="space-y-1">
            <Label>Rôle</Label>
            <Select value={form.role} onValueChange={(v) => updateField("role", v as "ADMIN" | "BENEVOLE")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BENEVOLE">Bénévole</SelectItem>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              placeholder="Informations complémentaires..."
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