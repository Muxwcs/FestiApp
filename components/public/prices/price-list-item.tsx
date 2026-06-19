import { useTranslations } from "next-intl"
import { t as translate, type Locale } from "@/lib/i18n/types"

interface PriceItem {
  id: string
  title: unknown
  description: unknown | null
  amount: number
  currency: string
  category: string | null
}

interface Props {
  price: PriceItem
  locale: Locale
  t: ReturnType<typeof useTranslations>
}

const PriceListItem = ({ price, locale, t }: Props) => {
  return (
    <div
      className="flex items-center justify-between gap-4 "
    >
      <div className="min-w-fit">
        <h3 className="font-semibold text-sm text-white">
          {translate(price.title, locale)}
        </h3>
        {price.description as string && (
          <p className="text-xs text-white/40">
            {translate(price.description, locale)}
          </p>
        )}
      </div>
      <div className="w-full border-dotted border-white/20 border-b-2"></div>
      <span className="shrink-0 text-xl font-black text-flYellow tabular-nums">
        {price.amount === 0
          ? t("prices.free")
          : `${price.amount} ${t("prices.currency")}`}
      </span>
    </div>
  )
}

export default PriceListItem