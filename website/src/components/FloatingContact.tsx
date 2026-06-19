import { MessageCircle, Phone } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'

export default function FloatingContact() {
  const { isThai } = useLanguage()

  return (
    <aside className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6">
      <a
        href="https://lin.ee/VEgW6qG"
        target="_blank"
        rel="noreferrer"
        className="line-pulse inline-flex h-12 items-center gap-2 rounded-full bg-[#06c755] px-4 text-sm font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all hover:bg-[#05b84e] motion-safe:hover:-translate-y-0.5 sm:h-14 sm:px-5"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        {isThai ? 'Inbox LINE' : 'Inbox LINE'}
      </a>
      <a
        href="tel:0892480888"
        aria-label={isThai ? 'โทรหาทีมขาย' : 'Call sales team'}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors hover:bg-zinc-800 sm:h-14 sm:w-14"
      >
        <Phone className="h-5 w-5" />
      </a>
    </aside>
  )
}
