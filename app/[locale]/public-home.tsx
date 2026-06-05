"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Info, Music, Utensils, PartyPopper } from "lucide-react"
import { t as translate, type Locale, localeNames } from "@/lib/i18n/types"
import { EventCategory } from "@/generated/prisma/enums"
import Image from "next/image"
import { NotificationToggle } from "@/components/pwa/notification-prompt"

interface EventItem {
  id: string
  title: unknown // Json
  description: unknown | null
  category: EventCategory
  place: string | null
  day: string
  startTime: string
  endTime: string | null
  imageSrc: string | null
  sortOrder: number
}

interface PriceItem {
  id: string
  title: unknown
  description: unknown | null
  amount: number
  currency: string
  category: string | null
}

interface InfoItem {
  id: string
  title: unknown
  content: unknown
  icon: string | null
  category: string | null
}

interface Props {
  locale: Locale
  events: EventItem[]
  prices: PriceItem[]
  infos: InfoItem[]
}

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  CONCERT: <Music className="h-4 w-4" />,
  ANIMATION: <PartyPopper className="h-4 w-4" />,
  RESTAURATION: <Utensils className="h-4 w-4" />,
  INFO: <Info className="h-4 w-4" />,
}

const categoryColors: Record<EventCategory, string> = {
  CONCERT: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
  ANIMATION: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  RESTAURATION: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
  INFO: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
}

export function PublicHomePage({ locale, events, prices, infos }: Props) {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [dayFilter, setDayFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Extract unique days from events
  const days = [...new Set(events.map((e) => e.day))]

  // Filter events
  const filteredEvents = events.filter((e) => {
    if (dayFilter !== "all" && e.day !== dayFilter) return false
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false
    return true
  })

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
  }

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(locale === "eu" ? "eu" : locale === "en" ? "en-GB" : "fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="min-h-screen w-full">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-bold">Festilasai</span>
          <div className="flex items-center gap-2">
            <a href="#program" className="text-sm hidden sm:inline hover:underline">{t("nav.program")}</a>
            <a href="#prices" className="text-sm hidden sm:inline hover:underline">{t("nav.prices")}</a>
            <a href="#info" className="text-sm hidden sm:inline hover:underline">{t("nav.info")}</a>
            {/* Language switcher */}
            <div className="flex gap-1 ml-4 border rounded-lg p-0.5">
              {(Object.entries(localeNames) as [Locale, string][]).map(([loc, name]) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${locale === loc
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                    }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 sm:py-24 text-center bg-linear-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-flYellow">{t("hero.title")}</h1>
          <p className="text-xl text-muted-foreground mb-8">{t("hero.subtitle")}</p>
          <a href="#program">
            <Button size="lg">{t("hero.cta")}</Button>
          </a>
        </div>
      </section>

      {/* Programme */}
      <section id="program" className="py-12 max-w-6xl mx-auto px-2 sm:px-4 ">
        <div className="bg-linear-to-b from-flDarkBlue to-flDarkBlue/20 rounded-xl p-2 sm:p-6">


          <h2 className="text-3xl font-bold mb-6 text-white">{t("program.title")}</h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6 ">
            <Button
              variant={dayFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setDayFilter("all")}
            >
              {t("program.allDays")}
            </Button>
            {days.map((day) => (
              <Button
                key={day}
                variant={dayFilter === day ? "default" : "outline"}
                size="sm"
                onClick={() => setDayFilter(day)}
              >
                {day}
              </Button>
            ))}
            <div className="w-px bg-border mx-1" />
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
            >
              Tout
            </Button>
            {(["CONCERT", "ANIMATION", "RESTAURATION"] as EventCategory[]).map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
              >
                {categoryIcons[cat]}
                <span className="ml-1">{t(`program.categories.${cat}`)}</span>
              </Button>
            ))}
          </div>

          {/* Events grid */}
          {filteredEvents.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">{t("program.noEvents")}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {event.imageSrc && (
                    <div className="h-40 bg-muted overflow-hidden">
                      <Image src={event.imageSrc} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className={event.imageSrc ? "pt-3" : "pt-4"}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={categoryColors[event.category]}>
                        {categoryIcons[event.category]}
                        <span className="ml-1">{t(`program.categories.${event.category}`)}</span>
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{translate(event.title, locale)}</h3>
                    {event.description as string && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {translate(event.description, locale)}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {event.day}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatTime(event.startTime)}
                        {event.endTime && ` – ${formatTime(event.endTime)}`}
                      </span>
                      {event.place && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {event.place}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Prices */}
      {prices.length > 0 && (
        <section id="prices" className="py-12 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">{t("prices.title")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prices.map((price) => (
                <Card key={price.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{translate(price.title, locale)}</h3>
                      <span className="text-xl font-bold text-primary">
                        {price.amount === 0
                          ? t("prices.free")
                          : `${price.amount}${t("prices.currency")}`}
                      </span>
                    </div>
                    {price.description as string && (
                      <p className="text-sm text-muted-foreground">
                        {translate(price.description, locale)}
                      </p>
                    )}
                    {price.category && (
                      <Badge variant="outline" className="mt-2">{price.category}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Useful Info */}
      {infos.length > 0 && (
        <section id="info" className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">{t("info.title")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {infos.map((info) => (
                <Card key={info.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      {info.icon && <span className="text-2xl">{info.icon}</span>}
                      <div>
                        <h3 className="font-semibold mb-1">{translate(info.title, locale)}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {translate(info.content, locale)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">{t("notifications.title")}</h2>
          <NotificationToggle />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Festilasai — {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  )
}
