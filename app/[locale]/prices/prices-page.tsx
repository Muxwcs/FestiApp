"use client"

import { useTranslations } from "next-intl"
import { type Locale } from "@/lib/i18n/types"
import Header from "@/components/public/header"
import Section from "@/components/ui/section"
import PriceListItem from "@/components/public/prices/price-list-item"

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

  const categoryOrder = ["PASS", "BAR", "RESTAURATION", "MERCH"] // ton ordre voulu

  return (
    <div className="min-h-screen w-full text-white pb-20">
      <Header locale={locale} />

      <div className="px-4 pt-6 max-w-3xl mx-auto">
        <h1 className="text-lg pb-2 text-center font-bold text-flYellow">{t("prices.title")}</h1>
        <p className="text-justify text-white whitespace-pre-line">{t("prices.description")}</p>
        {prices.length === 0 ? (
          <p className="text-center py-16 text-white/40">{t("program.noEvents")}</p>
        ) : (
          Object.entries(
            prices.reduce<Record<string, PriceItem[]>>((acc, price) => {
              const cat = price.category ?? "OTHER"
                ; (acc[cat] ??= []).push(price)
              return acc
            }, {})
          ).sort(([a], [b]) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
            .map(([category, items]) => (
              <Section key={category} title={t(`enums.priceCategory.${category}`)}>
                {items.map((price) => (
                  <PriceListItem key={price.id} price={price} locale={locale} t={t} />
                ))}
              </Section>
            ))
        )}

      </div>
    </div>
  )
}
