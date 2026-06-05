"use client"

import { useState, useEffect, useCallback } from "react"
import { Bell, BellOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

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

export function NotificationPrompt() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const supported =
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window

    setIsSupported(supported)
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    )

    if (supported) {
      checkExistingSubscription()
    }
  }, [])

  async function checkExistingSubscription() {
    try {
      // const registration = await navigator.serviceWorker.ready
      // const sub = await registration.pushManager.getSubscription()
      const registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("SW timeout")), 3000)
        ),
      ]) as ServiceWorkerRegistration
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)

      // Show banner if not subscribed and hasn't dismissed recently
      if (!sub) {
        const dismissed = localStorage.getItem("notif-dismissed")
        if (!dismissed || Date.now() - parseInt(dismissed) > 7 * 24 * 3600 * 1000) {
          // Delay to not be intrusive on first load
          setTimeout(() => setShowBanner(true), 3000)
        }
      }
    } catch (error) {
      console.error("Check subscription error:", error)
    }
  }

  const subscribe = useCallback(async () => {
    setLoading(true)
    try {
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
      setShowBanner(false)
    } catch (error) {
      console.error("Subscribe error:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  function dismiss() {
    localStorage.setItem("notif-dismissed", Date.now().toString())
    setShowBanner(false)
  }

  if (!isSupported) return null

  // On iOS, push is only available in standalone mode (added to home screen)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if (isIOS && !isStandalone) return null

  // Floating banner for unauthenticated users
  if (showBanner && !subscription) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-xl backdrop-blur-lg">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flAccent/10">
            <Bell className="h-5 w-5 text-flAccent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{t("notifications.title")}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("notifications.description")}
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={subscribe}
                disabled={loading}
                className="bg-flAccent hover:bg-flAccent/90 text-white text-xs h-8"
              >
                {loading ? "…" : t("notifications.enable")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={dismiss}
                className="text-xs h-8"
              >
                {t("notifications.later")}
              </Button>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  // Small toggle button (shown in footer or settings)
  if (subscription) {
    return null // Already subscribed, nothing to show globally
  }

  return null
}

// Exportable toggle for settings pages
export function NotificationToggle() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const supported =
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window
    setIsSupported(supported)

    if (supported) {
      navigator.serviceWorker.ready.then((reg) =>
        reg.pushManager.getSubscription().then(setSubscription)
      )
    }
  }, [])

  async function toggle() {
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
    } catch (error) {
      console.error("Toggle error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isSupported) return null

  return (
    <Button
      variant={subscription ? "outline" : "default"}
      size="sm"
      onClick={toggle}
      disabled={loading}
      className="gap-2"
    >
      {subscription ? (
        <>
          <BellOff className="h-4 w-4" />
          {t("notifications.disable")}
        </>
      ) : (
        <>
          <Bell className="h-4 w-4" />
          {t("notifications.enable")}
        </>
      )}
    </Button>
  )
}
