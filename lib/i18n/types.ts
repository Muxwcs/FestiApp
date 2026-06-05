export type Locale = "fr" | "eu" | "en"

export const locales: Locale[] = ["fr", "eu", "en"]
export const defaultLocale: Locale = "fr"

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  eu: "Euskara",
  en: "English",
}

/**
 * Type for translated JSON fields stored in the database.
 * Example: { fr: "Bonjour", eu: "Kaixo", en: "Hello" }
 */
export type TranslatedField = Record<Locale, string>

/**
 * Extract the translated string for the current locale, with fallback.
 */
export function t(field: unknown, locale: Locale): string {
  if (!field || typeof field !== "object") return ""
  const record = field as Record<string, string>
  return record[locale] || record[defaultLocale] || record.fr || ""
}
