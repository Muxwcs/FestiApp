import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Providers } from "./providers"
import { Toaster } from "sonner"
import { ServiceWorkerRegister } from "@/components/pwa/sw-register"
import { SplashScreen } from "@/components/pwa/splash-screen"

export const metadata: Metadata = {
  title: "Festiapp",
  description: "Application de gestion d'événements",
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192" },
      { url: "/icon-512x512.png", sizes: "512x512" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Festiapp",
    startupImage: "/icon-512x512.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#044154" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#022a35" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Festiapp" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="flex flex-col min-h-screen w-full items-center">
        <Providers>
          <SplashScreen />
          <ServiceWorkerRegister />
          {children}
        </Providers>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "bg-muted text-muted-foreground",
            style: {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            },
          }}
        />
      </body>
    </html>
  )
}

export default RootLayout