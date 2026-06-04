// import type { Metadata, Viewport } from "next"
// import "./globals.css"

// import { Providers } from "../providers"
// import { Toaster } from "sonner"

// export const metadata: Metadata = {
//   title: "Festiapp",
//   description: "Application de gestion d'événements",
//   manifest: "/manifest.json",
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/icon-512x512.png",
//   },
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "Festiapp",
//   },
// }

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// }

// const backgroundImageUrl = {
//   backgroundImage: "url('/background-public.png')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// }

// const RootLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <html lang="fr" suppressHydrationWarning>
//       <head>
//         <meta name="theme-color" content="#000000" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="Festiapp" />
//         <link rel="apple-touch-icon" href="/icon-512x512.png" />
//       </head>
//       <body className="flex flex-col min-h-screen w-full items-center" style={backgroundImageUrl}>
//         <Providers>
//           {children}
//         </Providers>
//         <Toaster
//           position="top-right"
//           richColors
//           closeButton
//           toastOptions={{
//             className: "bg-muted text-muted-foreground",
//             style: {
//               backgroundColor: "var(--background)",
//               color: "var(--foreground)",
//             },
//           }}
//         />
//       </body>
//     </html>
//   )
// }

// export default RootLayout

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/lib/i18n/routing"
import { hasLocale } from "next-intl"
import "../globals.css"

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
      </NextIntlClientProvider>
    </div>
  )
}
