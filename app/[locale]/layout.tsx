import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import type { Locale } from "@/lib/i18n/types"
import "../globals.css"

import { InstallPrompt } from "@/components/pwa/install-prompt"
import { NotificationPrompt } from "@/components/pwa/notification-prompt"
import { BottomNav } from "@/components/public/bottom-nav"
import LanguageButton from "@/components/public/language-button"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  const backgroundImageUrl = {
    backgroundImage: "url('/public-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center" style={backgroundImageUrl}>
      <NextIntlClientProvider messages={messages}>
        <LanguageButton locale={locale as Locale} />
        {children}
        <BottomNav locale={locale as Locale} />
        <NotificationPrompt />
        <InstallPrompt />
      </NextIntlClientProvider>
    </div>
  )
}
