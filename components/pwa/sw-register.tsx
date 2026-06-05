"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => {
          // Check for SW updates periodically
          setInterval(() => registration.update(), 60 * 60 * 1000)
        })
        .catch((error) => {
          console.error("SW registration failed:", error)
        })
    }
  }, [])

  return null
}
