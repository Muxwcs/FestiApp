import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"

import { type Locale } from "@/lib/i18n/types"

interface Props {
  locale: Locale
}

const Header = ({ locale }: Props) => {
  return (
    <header className="sticky top-0 z-40 bg-flDarkBlue/95 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
        <Link href={`/${locale}`} className="text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Image
          src="/fl20-logo.webp"
          alt="Festiapp"
          width={100}
          height={60}
          className="shadow-2xl absolute left-1/2 -translate-x-1/2"
        />
      </div>
    </header>
  )
}

export default Header