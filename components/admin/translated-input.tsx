"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { localeNames, type Locale } from "@/lib/i18n/types"

interface TranslatedInputProps {
  label: string
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  multiline?: boolean
  placeholder?: string
}

export function TranslatedInput({ label, value, onChange, multiline = false, placeholder }: TranslatedInputProps) {
  const update = (locale: Locale, text: string) => {
    onChange({ ...value, [locale]: text })
  }

  const Component = multiline ? Textarea : Input

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="space-y-2">
        {(Object.entries(localeNames) as [Locale, string][]).map(([locale, name]) => (
          <div key={locale} className="flex items-start gap-2">
            <span className="text-xs font-mono bg-muted px-2 py-2 rounded border min-w-7 text-center uppercase">
              {locale}
            </span>
            <Component
              value={value[locale] || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(locale, e.target.value)}
              placeholder={`${placeholder || label} (${name})`}
              className="flex-1"
              rows={multiline ? 3 : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
