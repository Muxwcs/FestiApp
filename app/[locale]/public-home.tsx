"use client"

import { useTranslations } from "next-intl"
import { Music, Tag, Info, ChevronRight } from "lucide-react"
import { type Locale } from "@/lib/i18n/types"
import { BottomNav } from "@/components/public/bottom-nav"
import Image from "next/image"
import Link from "next/link"

interface Props {
  locale: Locale
}

export function PublicHomePage({ locale }: Props) {
  const t = useTranslations()

  const sections = [
    { id: "program", icon: Music, color: "from-purple-500/20 to-purple-500/5 border-purple-500/20" },
    { id: "prices", icon: Tag, color: "from-flYellow/20 to-flYellow/5 border-flYellow/20" },
    { id: "info", icon: Info, color: "from-flDarkBlue/20 to-flDarkBlue/5 border-flDarkBlue/20" },
  ] as const

  return (
    <div className="min-h-screen w-full  text-white pb-20">
      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-[60svh] px-4 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-flAccent z-10" />

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/home-cta-bg.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between pb-20 gap-6 min-h-[50svh] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Image
            src="/fl20-logo.webp"
            alt="Festiapp"
            width={200}
            height={100}
            className="shadow-2xl"
          />

          <p className="text-lg sm:text-xl text-white/80 font-medium max-w-md">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── NAVIGATION CARDS ─── */}
      <section className="px-4 -mt-16 relative z-30 max-w-lg mx-auto space-y-3">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`/${locale}/${section.id}`}
            className={`flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r ${section.color} border backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-transform`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <section.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-white">
                {t(`nav.${section.id}`)}
              </h3>
            </div>
            <ChevronRight className="h-5 w-5 text-white/40 shrink-0" />
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 text-center space-y-2">
        <p className="text-xs text-white/30">
          <span>
            © {new Date().getFullYear()} Festilasai — {t("footer.rights")}
          </span>
          <span className="mx-1">
            {"| "}{t("footer.madeBy")}{" "}
            <a
              href="https://www.brutdecom.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/40 transition-colors"
            >
              BrutdeCom
            </a>
          </span>
        </p>
        <Link
          href={"/login"}
          className="inline-block text-[10px] text-white/15 hover:text-white/30 transition-colors mt-2"
        >
          {t("footer.staff")}
        </Link>
      </footer>

      <BottomNav locale={locale} />
    </div>
  )
}
