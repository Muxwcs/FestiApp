'use client'

import { Globe } from "lucide-react"
import { type Locale, localeNames } from "@/lib/i18n/types"

import { useState } from 'react'
import { usePathname, useRouter } from "next/navigation"

interface LanguageButtonProps {
  locale: Locale
}

const LanguageButton = ({ locale }: LanguageButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [showLangPicker, setShowLangPicker] = useState(false)

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
    setShowLangPicker(false)
  }

  return (
    <>
      <button
        onClick={() => setShowLangPicker(true)}
        className="fixed z-50 top-1 right-2 flex gap-1 items-center py-2 px-2 min-w-14 transition-colors"
      >
        <Globe className="h-5 w-5 text-white/50" strokeWidth={1.5} />
        <span className="text-[10px] font-medium tracking-wide uppercase text-white/50">
          {locale.toUpperCase()}
        </span>
      </button>
      {showLangPicker && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm" onClick={() => setShowLangPicker(false)}>
          <div
            className="absolute top-24 left-1/2 -translate-x-1/2 w-48 rounded-2xl bg-flDarkBlue border border-white/10 p-2 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {(Object.entries(localeNames) as [Locale, string][]).map(([loc, name]) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${locale === loc
                  ? "bg-flYellow/20 text-flYellow"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default LanguageButton