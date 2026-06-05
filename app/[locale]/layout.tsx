import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import "../globals.css"

import { InstallPrompt } from "@/components/pwa/install-prompt"
import { NotificationPrompt } from "@/components/pwa/notification-prompt"

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
    backgroundImage: "url('/background-public.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center" style={backgroundImageUrl}>
      <NextIntlClientProvider messages={messages}>
        {children}
        <NotificationPrompt />
        <InstallPrompt />
      </NextIntlClientProvider>
    </div>
  )
}
