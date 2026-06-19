"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Clock, MapPin, Info, Music, PartyPopper, SprayCan, Heart, } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { t as translate, type Locale } from "@/lib/i18n/types"
import type { EventCategory } from "@/generated/prisma/client"
import Image from "next/image"
import Header from "@/components/public/header"
import { ConcertModal } from "@/components/public/program/concert-modal"
import { useFavorites } from "@/hooks/use-favorites"

interface EventItem {
  id: string
  title: unknown
  description: unknown | null
  category: EventCategory
  place: string
  day: string
  startTime: string
  endTime: string | null
  imageSrc: string | null
  style: string | null
  sortOrder: number
}

interface Props {
  locale: Locale
  events: EventItem[]
}

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  CONCERT: <Music className="h-4 w-4" />,
  ANIMATION: <PartyPopper className="h-4 w-4" />,
  INFO: <Info className="h-4 w-4" />,
  SKATE: <span className="text-sm">🛹</span>,
  STREET_ART: <SprayCan className="h-4 w-4" />,
}

const categoryColors: Record<EventCategory, string> = {
  CONCERT: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  ANIMATION: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  INFO: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  SKATE: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  STREET_ART: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
}

export function ProgramPage({ locale, events }: Props) {
  const t = useTranslations()
  const [dayFilter, setDayFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedConcert, setSelectedConcert] = useState<EventItem | null>(null)

  const { favorites, isFavorite } = useFavorites()
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const days = [...new Set(events.map((e) => e.day))]

  const filteredEvents = events.filter((e) => {
    if (showFavoritesOnly && !favorites.includes(e.id)) return false
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
      <Header locale={locale} />

      <div className="px-4 pt-4 max-w-3xl mx-auto">
        <h1 className="text-lg pb-2 text-center font-bold text-flYellow">{t("program.title")}</h1>
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
              {t(`enums.days.${day}`)}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-xl ${categoryFilter === "all"
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/80 hover:bg-white/10"
              }`}
          >
            {t("program.allCategories")}
          </button>
          {favorites.length > 0 && (
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-xl ${showFavoritesOnly
                  ? "bg-flYellow text-flDarkBlue"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
            >
              <Heart className={`h-3 w-3 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favoris ({favorites.length})
            </button>
          )}
          {(["CONCERT", "ANIMATION", "INFO", "SKATE", "STREET_ART"] as EventCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-xl ${categoryFilter === cat
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
                onClick={() => event.category === "CONCERT" || event.category === "ANIMATION" || event.category === "STREET_ART" || event.category === "SKATE" ? setSelectedConcert(event) : undefined}
                style={{ cursor: event.category === "CONCERT" || event.category === "ANIMATION" || event.category === "STREET_ART" || event.category === "SKATE" ? "pointer" : undefined }}
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
                    <span className="flex items-center gap-1 uppercase tracking-wide">
                      <MapPin className="h-3 w-3" />
                      {t(`enums.places.${event.place}`)}
                    </span>
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
      {selectedConcert && (
        <ConcertModal
          event={selectedConcert}
          locale={locale}
          onClose={() => setSelectedConcert(null)}
        />
      )}
    </div>
  )
}
