"use client"

import { useState, useEffect, useCallback } from "react"
import { Bell, BellOff, BellRing, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const NotificationBell = () => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [loading, setLoading] = useState(false)
  const [justToggled, setJustToggled] = useState(false)

  useEffect(() => {
    const supported =
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window
    setIsSupported(supported)

    if (supported) {
      navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.getSubscription())
        .then(setSubscription)
        .catch(console.error)
    }
  }, [])

  const toggle = useCallback(async () => {
    setLoading(true)
    try {
      if (subscription) {
        const endpoint = subscription.endpoint
        await subscription.unsubscribe()
        await fetch("/api/notifications/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint }),
        })
        setSubscription(null)
      } else {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        })
        const serialized = sub.toJSON()
        await fetch("/api/notifications/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: serialized.endpoint,
            keys: serialized.keys,
          }),
        })
        setSubscription(sub)
      }
      setJustToggled(true)
      setTimeout(() => setJustToggled(false), 1500)
    } catch (error) {
      console.error("Notification toggle error:", error)
    } finally {
      setLoading(false)
    }
  }, [subscription])

  if (!isSupported) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full opacity-50 cursor-default">
        <BellOff className="h-5 w-5" />
      </Button>
    )
  }

  const label = subscription ? "Désactiver les notifications" : "Activer les notifications"
  const Icon = loading
    ? Loader2
    : justToggled
      ? BellRing
      : subscription
        ? Bell
        : BellOff

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative"
      onClick={toggle}
      disabled={loading}
      title={label}
    >
      <Icon className={`h-5 w-5 ${loading ? "animate-spin" : ""} ${justToggled ? "animate-bounce" : ""}`} />
      {subscription && !loading && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500" />
      )}
    </Button>
  )
}

export default NotificationBell