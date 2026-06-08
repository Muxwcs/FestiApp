"use client"

import { useTranslations } from "next-intl"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { t as translate, type Locale } from "@/lib/i18n/types"
import { BottomNav } from "@/components/public/bottom-nav"
import Link from "next/link"

interface PriceItem {
  id: string
  title: unknown
  description: unknown | null
  amount: number
  currency: string
  category: string | null
}

interface Props {
  locale: Locale
  prices: PriceItem[]
}

export function PricesPage({ locale, prices }: Props) {
  const t = useTranslations()

  return (
    <div className="min-h-screen w-full text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-flDarkBlue/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-flYellow">{t("prices.title")}</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-3xl mx-auto">
        {prices.length === 0 ? (
          <p className="text-center py-16 text-white/40">{t("program.noEvents")}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {prices.map((price) => (
              <div
                key={price.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl p-4"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-white">
                    {translate(price.title, locale)}
                  </h3>
                  {price.description as string && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {translate(price.description, locale)}
                    </p>
                  )}
                  {price.category && (
                    <Badge variant="outline" className="mt-2 text-[10px] border-white/10 text-white/50">
                      {price.category}
                    </Badge>
                  )}
                </div>
                <span className="shrink-0 text-xl font-black text-flYellow tabular-nums">
                  {price.amount === 0
                    ? t("prices.free")
                    : `${price.amount}${t("prices.currency")}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav locale={locale} />
    </div>
  )
}
