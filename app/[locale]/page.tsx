import { PublicHomePage } from "./public-home"
import type { Locale } from "@/lib/i18n/types"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return <PublicHomePage locale={locale as Locale} />
}
