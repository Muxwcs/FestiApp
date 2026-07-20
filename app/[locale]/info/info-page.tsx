"use client"

import { useTranslations } from "next-intl"
import { t as translate, type Locale } from "@/lib/i18n/types"
import Header from "@/components/public/header"
import { MapViewer } from "@/components/public/infos/map-viewer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface InfoItem {
  id: string
  title: unknown
  content: unknown
  icon: string | null
  category: string | null
}

interface Props {
  locale: Locale
  infos: InfoItem[]
}

export function InfoPage({ locale, infos }: Props) {
  const t = useTranslations()

  const generalMapLegend = [
    { color: "#6B7280", label: t("info.generalLegend.scenes") },
    { color: "#7C3AED", label: t("info.generalLegend.bars") },
    { color: "#D97706", label: t("info.generalLegend.restauration") },
    { color: "#3B82F6", label: t("info.generalLegend.wc") },
    { color: "#EF4444", label: t("info.generalLegend.txartel") },
    { color: "#A78BFA", label: t("info.generalLegend.merch") },
    { color: "#FBBF24", label: t("info.generalLegend.entrees") },
    { color: "#22C55E", label: t("info.generalLegend.village") },
    { color: "#F39C12", label: t("info.generalLegend.skate") },
  ]

  return (
    <div className="min-h-screen w-full text-white pb-20">
      <Header locale={locale} />
      <div className="px-4 pt-6 max-w-3xl mx-auto">
        <h1 className="text-lg pb-4 text-center font-bold text-flYellow">
          {t("info.title")}
        </h1>

        <Accordion
          type="multiple"
          defaultValue={["map"]}
          className="space-y-2"
        >
          {/* === Section Plan du festival === */}
          <AccordionItem
            value="map"
            className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="text-2xl">🗺️</span>
                {t("info.festivalMap")}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-xs text-white/50 mb-3">
                {t("info.festivalMapHint")}
              </p>
              <MapViewer
                src="/2026-plan-v1-hd.webp"
                alt={t("info.festivalMap")}
                legend={generalMapLegend}
              />
            </AccordionContent>
          </AccordionItem>

          {/* === Sections dynamiques depuis la BDD === */}
          {infos.map((info) => (
            <AccordionItem
              key={info.id}
              value={info.id}
              className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-3 text-sm font-semibold text-white">
                  {info.icon && <span className="text-2xl">{info.icon}</span>}
                  {translate(info.title, locale)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-xs text-white/50 whitespace-pre-wrap leading-relaxed">
                  {translate(info.content, locale)}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}