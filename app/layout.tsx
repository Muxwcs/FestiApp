import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Providers } from "./providers"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Festiapp",
  description: "Application de gestion d'événements",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-512x512.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Festiapp",
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
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Festiapp" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
      </head>
      <body className="flex flex-col min-h-screen w-full items-center bg-muted">
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout