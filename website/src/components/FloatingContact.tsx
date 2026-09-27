import { MessageCircle, Phone } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/pages/home/constants'

type FloatingContactProps = {
  className?: string
}

export default function FloatingContact({ className }: FloatingContactProps) {
  const { isThai } = useLanguage()

  return (
    <aside className={cn('pk-floating-contact fixed z-40 flex items-center gap-2', className)}>
      <a
        href={CONTACT.LINE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={isThai ? `ทักทีม PK ทาง LINE ${CONTACT.LINE_ID}` : `Message PK on LINE ${CONTACT.LINE_ID}`}
        title={`LINE ${CONTACT.LINE_ID}`}
        className="pk-floating-contact-button pk-floating-contact-line group inline-flex items-center justify-center border border-[#06c755] bg-[#06c755] text-white transition-colors hover:bg-[#05b34c]"
      >
        <MessageCircle className="h-6 w-6 fill-current" aria-hidden="true" />
        <span className="pk-floating-contact-label" aria-hidden="true">LINE {CONTACT.LINE_ID}</span>
      </a>
      <a
        href={CONTACT.PHONE_TEL}
        aria-label={isThai ? `โทรหาทีม PK ${CONTACT.PHONE_DISPLAY}` : `Call PK ${CONTACT.PHONE_DISPLAY}`}
        title={CONTACT.PHONE_DISPLAY}
        className="pk-floating-contact-button pk-floating-contact-phone group inline-flex items-center justify-center border border-[#2457d6] bg-[#2457d6] text-white transition-colors hover:bg-[#1946b8]"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span className="pk-floating-contact-label" aria-hidden="true">{CONTACT.PHONE_DISPLAY}</span>
      </a>
    </aside>
  )
}
