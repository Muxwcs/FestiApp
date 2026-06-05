"use client"

import { useState, useEffect } from "react"
import { Download, Share, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)

    // Android / Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)

    // Show banner after delay if not installed
    if (!standalone) {
      const dismissed = localStorage.getItem("install-dismissed")
      if (!dismissed || Date.now() - parseInt(dismissed) > 14 * 24 * 3600 * 1000) {
        setTimeout(() => setShowBanner(true), 5000)
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setShowBanner(false)
      }
      setDeferredPrompt(null)
    }
  }

  function dismiss() {
    localStorage.setItem("install-dismissed", Date.now().toString())
    setShowBanner(false)
  }

  if (isStandalone || !showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-xl backdrop-blur-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flYellow/20">
          <Download className="h-5 w-5 text-flYellow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Installer Festiapp</p>
          {isIOS ? (
            <p className="text-xs text-muted-foreground mt-0.5">
              Appuyez sur{" "}
              <Share className="inline h-3.5 w-3.5 -mt-0.5" /> puis{" "}
              <span className="font-medium">&quot;Ajouter à l&apos;écran d&apos;accueil&quot;</span>{" "}
              <Plus className="inline h-3.5 w-3.5 -mt-0.5" />
            </p>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mt-0.5">
                Accédez à l&apos;app directement depuis votre écran d&apos;accueil.
              </p>
              {deferredPrompt && (
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="mt-3 bg-flYellow hover:bg-flYellow/90 text-flDarkBlue text-xs font-semibold h-8"
                >
                  Installer
                </Button>
              )}
            </>
          )}
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
