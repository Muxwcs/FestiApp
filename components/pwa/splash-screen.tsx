"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Only show splash in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true

    if (!isStandalone) {
      setVisible(false)
      return
    }

    // Fade out after content is likely loaded
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 500)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-flDarkBlue transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-700">
        <Image
          src="/icon-512x512.png"
          alt="Festiapp"
          width={120}
          height={120}
          className="rounded-3xl shadow-2xl"
          priority
        />
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Festiapp
        </h1>
        <div className="flex gap-1.5 mt-4">
          <span className="h-2 w-2 rounded-full bg-flYellow animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-flYellow animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-flYellow animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
