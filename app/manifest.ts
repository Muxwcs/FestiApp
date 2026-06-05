import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Festiapp",
    short_name: "Festiapp",
    description: "Application de gestion d'événements",
    start_url: "/",
    display: "standalone",
    background_color: "#044154",
    theme_color: "#044154",
    orientation: "portrait-primary",
    scope: "/",
    lang: "fr-FR",
    categories: ["events", "entertainment", "lifestyle"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
