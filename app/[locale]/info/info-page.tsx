"use client"

import { useTranslations } from "next-intl"
import { type Locale } from "@/lib/i18n/types"
import Header from "@/components/public/header"
import { MapViewer } from "@/components/public/infos/map-viewer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { InAppBrowser } from "@/components/public/in-app-browser"
import { ExternalLink } from "lucide-react"

interface InfoItem {
  id: string
  title: unknown
  content: unknown
  icon: string | null
  category: string | null
}

interface Props {
  locale: Locale
  _infos: InfoItem[]
}

export function InfoPage({ locale, _infos }: Props) {
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

  const villageMapLegend = [
    { color: "#C0392B", label: "Txartels / Baso" },
    { color: "#27AE60", label: "Goodies / Eusko" },
    { color: "#E67E22", label: "Pena Lehoinak" },
    { color: "#8e44ad", label: "Chill Zone" },
    { color: "#4a235a", label: "Tattoo" },
    { color: "#d4ac0d", label: "Topa Topia / Germaine / Paillettes" },
    { color: "#2980b9", label: "Street Art" },
    { color: "#1565c0", label: "Tree6Clope" },
    { color: "#2e7d32", label: "Bio Divers Cité" },
    { color: "#6a1b9a", label: "Ostia" },
    { color: "#00695c", label: "Vue d'ensemble" },
    { color: "#e65100", label: "Les Petits Débrouillards" },
    { color: "#0277bd", label: "Water Family" },
  ]

  return (
    <div className="min-h-screen w-full text-white pb-20">
      <Header locale={locale} />
      <div className="px-4 pt-6 max-w-3xl mx-auto">
        <h1 className="text-lg pb-4 text-center font-bold text-flYellow">
          {t("info.title")}
        </h1>

        <Accordion type="single" collapsible className="space-y-2">
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

          {/* === Section Plan du village === */}
          <AccordionItem
            value="villageMap"
            className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="text-2xl">🍃</span>
                {t("info.villageMap")}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-xs text-white/50 mb-3">
                {t("info.festivalMapHint")}
              </p>
              <MapViewer
                src="/2026-plan-village.webp"
                alt={t("info.villageMap")}
                legend={villageMapLegend}
              />
            </AccordionContent>
          </AccordionItem>

          {/* === FAQ === */}
          {/* {infos.length > 0 && (
            <AccordionItem
              value="faq"
              className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-3 text-sm font-semibold text-white">
                  <span className="text-2xl">❓</span>
                  {t("info.faq")}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <Accordion type="multiple" className="space-y-2">
                  {infos.map((info) => (
                    <AccordionItem
                      key={info.id}
                      value={info.id}
                      className="rounded-xl bg-white/5 border border-white/5 overflow-hidden"
                    >
                      <AccordionTrigger className="px-3 py-2.5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <span className="flex items-center gap-2 text-xs font-medium text-white">
                          {info.icon && <span className="text-lg">{info.icon}</span>}
                          {translate(info.title, locale)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        <p className="text-xs text-white/50 whitespace-pre-wrap leading-relaxed">
                          {translate(info.content, locale)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          )} */}
        </Accordion>
        <InAppBrowser
          url="https://festilasai.com/infos-utiles/"
          className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl overflow-hidden mt-4 w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-white/30" />
          {t("info.detailsInfos")}
        </InAppBrowser>
      </div>
    </div>
  )
}