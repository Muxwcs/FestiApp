"use client"

import { useState, useEffect } from "react"
import { Bell, Send, Users, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const GROUPS = [
  { value: "PUBLIC", label: "Public", description: "Visiteurs sans compte" },
  { value: "BENEVOLE", label: "Bénévoles", description: "Bénévoles inscrits" },
  { value: "REFERENT", label: "Référents", description: "Référents de secteur" },
  { value: "ADMIN", label: "Admins", description: "Administrateurs" },
] as const

type GroupCounts = Record<string, number>

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [url, setUrl] = useState("/")
  const [selectedGroups, setSelectedGroups] = useState<string[]>(
    GROUPS.map((g) => g.value)
  )
  const [subscriberTotal, setSubscriberTotal] = useState<number | null>(null)
  const [groupCounts, setGroupCounts] = useState<GroupCounts>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    stats?: { total: number; sent: number; failed: number; cleaned: number; groups: string[] }
    error?: string
  } | null>(null)

  function fetchCounts() {
    fetch("/api/admin/notifications/subscribers")
      .then((res) => res.json())
      .then((data) => {
        setSubscriberTotal(data.total ?? 0)
        setGroupCounts(data.counts ?? {})
      })
      .catch(() => setSubscriberTotal(0))
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  function toggleGroup(value: string) {
    setSelectedGroups((prev) =>
      prev.includes(value)
        ? prev.filter((g) => g !== value)
        : [...prev, value]
    )
  }

  const selectedCount = selectedGroups.reduce(
    (sum, g) => sum + (groupCounts[g] ?? 0),
    0
  )

  async function handleSend() {
    if (!title.trim() || !message.trim() || selectedGroups.length === 0) return

    setSending(true)
    setResult(null)

    try {
      const res = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body: message,
          url,
          groups: selectedGroups,
        }),
      })
      const data = await res.json()
      setResult(data)

      if (data.success) {
        setTitle("")
        setMessage("")
        setUrl("/")
        fetchCounts()
      }
    } catch {
      setResult({ success: false, error: "Erreur réseau" })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <Bell className="h-7 w-7" />
          Notifications Push
        </h1>
        <p className="text-muted-foreground mt-1">
          Envoyez des notifications ciblées aux utilisateurs abonnés.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stats card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Abonnés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">
              {subscriberTotal === null ? "…" : subscriberTotal}
            </div>
            <div className="space-y-1.5">
              {GROUPS.map((group) => (
                <div
                  key={group.value}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{group.label}</span>
                  <span className="font-medium tabular-nums">
                    {groupCounts[group.value] ?? 0}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Send form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Envoyer une notification</CardTitle>
            <CardDescription>
              Sélectionnez un ou plusieurs groupes destinataires.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Group selector */}
            <div className="space-y-2">
              <Label>Destinataires</Label>
              <div className="flex flex-wrap gap-2">
                {GROUPS.map((group) => {
                  const isSelected = selectedGroups.includes(group.value)
                  const count = groupCounts[group.value] ?? 0
                  return (
                    <button
                      key={group.value}
                      type="button"
                      onClick={() => toggleGroup(group.value)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                      {group.label}
                      <span
                        className={`tabular-nums ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground/60"
                          }`}
                      >
                        ({count})
                      </span>
                    </button>
                  )
                })}
              </div>
              {selectedGroups.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedCount} appareil{selectedCount > 1 ? "s" : ""} ciblé{selectedCount > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                placeholder="Ex: Concert ce soir !"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Ex: Le concert de XXX commence dans 30 minutes sur la grande scène."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Lien (optionnel)</Label>
              <Input
                id="url"
                placeholder="/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Page ouverte au clic sur la notification.
              </p>
            </div>

            {result && (
              <div
                className={`flex items-start gap-2 rounded-lg p-3 text-sm ${result.success
                  ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                  : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                  }`}
              >
                {result.success ? (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                )}
                <span>
                  {result.success
                    ? `Envoyé à ${result.stats?.sent}/${result.stats?.total} appareils (${result.stats?.groups?.map(
                      (g) => GROUPS.find((gr) => gr.value === g)?.label ?? g
                    ).join(", ")}).${result.stats?.cleaned
                      ? ` ${result.stats.cleaned} expiré(s) nettoyé(s).`
                      : ""
                    }`
                    : result.error || "Erreur lors de l'envoi."}
                </span>
              </div>
            )}

            <Button
              onClick={handleSend}
              disabled={
                sending ||
                !title.trim() ||
                !message.trim() ||
                selectedGroups.length === 0 ||
                selectedCount === 0
              }
              className="w-full sm:w-auto gap-2"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sending ? "Envoi en cours…" : "Envoyer la notification"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
