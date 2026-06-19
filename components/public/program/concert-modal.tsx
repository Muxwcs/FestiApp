"use client"

import { useEffect } from "react"
import { X, Clock, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import type { Locale } from "@/lib/i18n/types"
import { t as translate } from "@/lib/i18n/types"
import { useTranslations } from "next-intl"
import { useFavorites } from "@/hooks/use-favorites"

interface ConcertEvent {
  id: string
  title: unknown
  description: unknown | null
  category: string
  place: string | null
  day: string
  startTime: string
  endTime: string | null
  imageSrc: string | null
  style: string | null
}

interface Props {
  event: ConcertEvent
  locale: Locale
  onClose: () => void
}

export function ConcertModal({ event, locale, onClose }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const t = useTranslations()

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(locale === "eu" ? "eu" : locale === "en" ? "en-GB" : "fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const dayLabel = t(`enums.days.${event.day}`)
  const placeLabel = event.place ? t(`enums.places.${event.place}`) : ""

  // Extract origin from style field if present (e.g. "rock" or "france, rock")
  const tags: string[] = []
  if (event.style) {
    event.style.split(",").forEach((s) => {
      const trimmed = s.trim()
      if (trimmed) tags.push(trimmed)
    })
  }

  return (
    <div
      className="fixed inset-0 z-70 flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 " />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-flDarkBlue no-scrollbar animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-3xl sm:rounded-t-3xl">
          {event.imageSrc ? (
            <Image
              src={event.imageSrc}
              alt={translate(event.title, locale)}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-purple-900 to-flDarkBlue" />
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Artist name over image */}
          <h2 className="absolute bottom-4 left-5 right-5 font-black text-2xl uppercase tracking-wide text-white drop-shadow-lg"
            style={{ fontFamily: "var(--font-heading, inherit)" }}
          >
            {translate(event.title, locale) as string}
          </h2>
        </div>

        {/* Info card */}
        <div className="px-5 mt-2 relative z-10">
          <div className="flex items-center justify-between rounded-2xl bg-flYellow p-4">
            <div className="space-y-1">
              <p className="font-black text-sm uppercase tracking-wide text-flDarkBlue">
                {dayLabel}
              </p>
              <div className="flex items-center gap-1.5 text-flDarkBlue/80 text-sm">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(event.startTime)}
                  {event.endTime && ` → ${formatTime(event.endTime)}`}
                </span>
              </div>
              {placeLabel && (
                <div className="flex items-center gap-1.5 text-flDarkBlue/80 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{placeLabel}</span>
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggle(event.id)
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-flDarkBlue/10 text-flDarkBlue/60 hover:text-flDarkBlue transition-colors"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${isFavorite(event.id)
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-5 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-flYellow/40 bg-flYellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-flYellow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {event.description ? (
          <div className="px-5 mt-5 pb-8">
            <p className="text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
              {translate(event.description, locale) as string}
            </p>
          </div>
        ) : null}

        {/* Bottom safe area */}
        <div className="safe-area-bottom" />
      </div>
    </div>
  )
}