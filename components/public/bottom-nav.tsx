"use client"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Music, Tag, Info, Menu } from "lucide-react"
import { useState } from "react"
import { type Locale } from "@/lib/i18n/types"
import Link from "next/link"
import Image from "next/image"
import { NotificationToggle } from "../pwa/notification-prompt"

interface BottomNavProps {
  locale: Locale
}

const leftItems = [
  { id: "program", icon: Music, path: "/program" },
  { id: "prices", icon: Tag, path: "/prices" },
] as const

const rightItems = [
  { id: "info", icon: Info, path: "/info" },
] as const

export function BottomNav({ locale }: BottomNavProps) {
  const t = useTranslations()
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    const full = `/${locale}${path}`
    if (path === "") return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname.startsWith(full)
  }

  const NavItem = ({ id, icon: Icon, path }: { id: string; icon: typeof Music; path: string }) => {
    const active = isActive(path)
    return (
      <Link
        href={`/${locale}${path}`}
        className="flex flex-col items-center gap-0.5 py-2 px-2 min-w-14 transition-colors"
      >
        <Icon
          className={`h-5 w-5 transition-colors ${active ? "text-flYellow" : "text-white/50"}`}
          strokeWidth={active ? 2.5 : 1.5}
        />
        <span
          className={`text-[10px] font-medium tracking-wide uppercase transition-colors ${active ? "text-flYellow" : "text-white/50"
            }`}
        >
          {t(`nav.${id}`)}
        </span>
      </Link>
    )
  }

  return (
    <>
      {/* Menu overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm p-2" onClick={() => setShowMenu(false)}>
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 rounded-2xl bg-flDarkBlue border border-white/10 p-2 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-sm font-semibold text-white mb-2 text-center">
              {t("nav.menu")}
            </h2>

            <div className="my-2 border-t border-white/10"></div>
            <h3 className="text-sm font-semibold text-white/90 mb-2">
              {t("notifications.title")}
            </h3>
            <p className="text-xs text-white/80 mb-2">
              {t("notifications.description")}
            </p>
            <NotificationToggle />
          </div>
        </div>
      )}

      {/* Bottom navigation with center notch */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="relative max-w-lg mx-auto">
          {/* Center logo button - raised above the bar */}
          <Link
            href={`/${locale}`}
            className="absolute left-1/2 -translate-x-1/2 -top-7 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-flYellow shadow-lg shadow-flYellow/30 active:scale-95 transition-transform"
          >
            <Image
              src="/icon-192x192.png"
              alt="Accueil"
              width={44}
              height={44}
              className="rounded-full"
            />
          </Link>

          {/* Nav bar with SVG notch */}
          <div className="relative">
            {/* SVG background with center cutout */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 70"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fill */}
              <path
                d="M 0 12 C 0 5.373 5.373 0 12 0 L 148 0 C 152 0 156 1.5 158 5 C 161 14 166 26 176 33 C 184 38 192 40 200 40 C 208 40 216 38 224 33 C 234 26 239 14 242 5 C 244 1.5 248 0 252 0 L 388 0 C 394.627 0 400 5.373 400 12 L 400 70 L 0 70 Z"
                className="fill-flDarkBlue/95"
              />
              {/* Stroke */}
              <path
                d="M 0 12 C 0 5.373 5.373 0 12 0 L 148 0 C 152 0 156 1.5 158 5 C 161 14 166 26 176 33 C 184 38 192 40 200 40 C 208 40 216 38 224 33 C 234 26 239 14 242 5 C 244 1.5 248 0 252 0 L 388 0 C 394.627 0 400 5.373 400 12"
                className="stroke-white/10"
                strokeWidth="0.5"
              />
            </svg>

            {/* Nav items */}
            <div className="relative flex justify-between px-2 pt-1 pb-0 safe-area-bottom" style={{ minHeight: 70 }}>
              {/* Left items */}
              <div className="flex items-center justify-evenly flex-1">
                {leftItems.map((item) => (
                  <NavItem key={item.id} {...item} />
                ))}
              </div>

              {/* Center spacer for the logo */}
              <div className="w-24 shrink-0" />

              {/* Right items */}
              <div className="flex items-center justify-evenly flex-1">
                {rightItems.map((item) => (
                  <NavItem key={item.id} {...item} />
                ))}
                {/* Language button */}
                <button
                  onClick={() => setShowMenu(true)}
                  className="flex flex-col items-center gap-0.5 py-2 px-2 min-w-14 transition-colors"
                >
                  <Menu className="h-5 w-5 text-white/50" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium tracking-wide uppercase text-white/50">
                    {t("nav.menu")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
