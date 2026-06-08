"use client"

import { useTranslations } from "next-intl"
import { ArrowLeft } from "lucide-react"
import { t as translate, type Locale } from "@/lib/i18n/types"
import { BottomNav } from "@/components/public/bottom-nav"
import Link from "next/link"

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

  return (
    <div className="min-h-screen w-full text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-flDarkBlue/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-flYellow">{t("info.title")}</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-3xl mx-auto">
        {infos.length === 0 ? (
          <p className="text-center py-16 text-white/40">{t("program.noEvents")}</p>
        ) : (
          <div className="space-y-3">
            {infos.map((info) => (
              <div
                key={info.id}
                className="rounded-2xl bg-flDarkBlue/50 border border-white/5 backdrop-blur-xl p-4"
              >
                <div className="flex items-start gap-3">
                  {info.icon && (
                    <span className="text-2xl shrink-0 mt-0.5">{info.icon}</span>
                  )}
                  <div>
                    <h3 className="font-semibold text-sm text-white">
                      {translate(info.title, locale)}
                    </h3>
                    <p className="text-xs text-white/50 mt-1 whitespace-pre-wrap leading-relaxed">
                      {translate(info.content, locale)}
                    </p>
                  </div>
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
