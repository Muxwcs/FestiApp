"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { X, ExternalLink } from "lucide-react"

interface InAppBrowserProps {
  url: string
  children: React.ReactNode
  className?: string
}

export function InAppBrowser({ url, children, className }: InAppBrowserProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-70 bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-flDarkBlue shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-xs text-white/50 truncate mx-3 flex-1">{url}</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            src={url}
            className="flex-1 w-full border-0 bg-white"
            allow="fullscreen"
          />
        </div>,
        document.body
      )}
    </>
  )
}