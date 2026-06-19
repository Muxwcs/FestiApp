// Labels admin (français) pour les enums Prisma
// Les traductions publiques sont dans messages/{locale}.json sous "enums"

import type {
  EventCategory,
  Places,
  Days,
  PriceCategory,
  InfosCategory,
} from "@/generated/prisma/client"

export const eventCategoryLabels: Record<EventCategory, string> = {
  CONCERT: "Concert",
  ANIMATION: "Animation",
  INFO: "Info",
  SKATE: "Skate",
  STREET_ART: "Street Art",
}

export const placesLabels: Record<Places, string> = {
  HANDIA: "Handia",
  TTIKIA: "Ttikia",
  CASTLE: "Château",
  VILLAGE: "Village",
  FESTIVAL: "Festival",
}

export const daysLabels: Record<Days, string> = {
  VENDREDI: "Vendredi",
  SAMEDI: "Samedi",
}

export const priceCategoryLabels: Record<PriceCategory, string> = {
  MERCH: "Merch",
  BAR: "Bar",
  RESTAURATION: "Restauration",
  PASS: "Pass",
}

export const infosCategoryLabels: Record<InfosCategory, string> = {
  ACCESS: "Accès",
  SECURITY: "Sécurité",
  USEFUL: "Utile",
  FAQ: "FAQ",
  PMR: "PMR",
}
