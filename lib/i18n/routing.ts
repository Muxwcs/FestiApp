import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fr", "eu", "en"],
  defaultLocale: "fr",
})