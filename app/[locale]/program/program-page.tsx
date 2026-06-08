"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Clock, MapPin, Info, Music, Utensils, PartyPopper, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { t as translate, type Locale } from "@/lib/i18n/types"
import { BottomNav } from "@/components/public/bottom-nav"
import type { EventCategory } from "@/generated/prisma/enums"
import Image from "next/image"
import Link from "next/link"

interface EventItem {
  id: string
  title: unknown
  description: unknown | null
  category: EventCategory
  place: string | null
  day: string
  startTime: string
  endTime: string | null
  imageSrc: string | null
  sortOrder: number
}

interface Props {
  locale: Locale
  events: EventItem[]
}

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  CONCERT: <Music className="h-4 w-4" />,
  ANIMATION: <PartyPopper className="h-4 w-4" />,
  RESTAURATION: <Utensils className="h-4 w-4" />,
  INFO: <Info className="h-4 w-4" />,
  SKATE: <Utensils className="h-4 w-4" />,
  STREET_ART: <Utensils className="h-4 w-4" />
}

const categoryColors: Record<EventCategory, string> = {
  CONCERT: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  ANIMATION: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  RESTAURATION: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  INFO: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  SKATE: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  STREET_ART: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
}

export function ProgramPage({ locale, events }: Props) {
  const t = useTranslations()
  const [dayFilter, setDayFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const days = [...new Set(events.map((e) => e.day))]

  const filteredEvents = events.filter((e) => {
    if (dayFilter !== "all" && e.day !== dayFilter) return false
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false
    return true
  })

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(
      locale === "eu" ? "eu" : locale === "en" ? "en-GB" : "fr-FR",
      { hour: "2-digit", minute: "2-digit" }
    )

  return (
    <div className="min-h-screen w-full text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-flDarkBlue/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-flYellow">{t("program.title")}</h1>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-3xl mx-auto">
        {/* Day filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
          <button
            onClick={() => setDayFilter("all")}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${dayFilter === "all"
              ? "bg-flYellow text-flDarkBlue"
              : "bg-white/10 text-white/90 hover:bg-white/15 backdrop-blur-xl"
              }`}
          >
            {t("program.allDays")}
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setDayFilter(day)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${dayFilter === day
                ? "bg-flYellow text-flDarkBlue"
                : "bg-white/10 text-white/90 hover:bg-white/15 backdrop-blur-xl"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === "all"
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/80 hover:bg-white/10 backdrop-blur-xl"
              }`}
          >
            Tout
          </button>
          {(["CONCERT", "ANIMATION", "RESTAURATION", "SKATE", "STREET_ART"] as EventCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === cat
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
            >
              {categoryIcons[cat]}
              {t(`program.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Events list */}
        {filteredEvents.length === 0 ? (
          <p className="text-center py-16 text-white/80">{t("program.noEvents")}</p>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group flex gap-3 rounded-2xl bg-flDarkBlue/50 border border-white/5 p-3 hover:bg-white/10 transition-colors"
              >
                {event.imageSrc && (
                  <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/10">
                    <Image
                      src={event.imageSrc}
                      alt=""
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">
                    {translate(event.title, locale)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(event.startTime)}
                      {event.endTime && ` – ${formatTime(event.endTime)}`}
                    </span>
                    {event.place && (
                      <span className="flex items-center gap-1 uppercase tracking-wide">
                        <MapPin className="h-3 w-3" />
                        {event.place}
                      </span>
                    )}
                  </div>
                  {event.description as string && (
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">
                      {translate(event.description, locale)}
                    </p>
                  )}
                </div>
                <div className="shrink-0 self-start">
                  <Badge variant="outline" className={`text-[10px] ${categoryColors[event.category]}`}>
                    {categoryIcons[event.category]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav locale={locale} />
    </div>
  )
}
