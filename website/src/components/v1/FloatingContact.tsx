import { useLanguage } from '@/i18n/LanguageContext'

import { LineIcon, PhoneIcon } from './icons'
import { CONTACT, t } from './site'

export default function FloatingContact() {
  const { language } = useLanguage()
  return (
    <aside className="v1-fab" aria-label={t(language, 'ติดต่อด่วน', 'Quick contact')}>
      <a href={CONTACT.PHONE_TEL} className="bg-[#2457d6]" aria-label={t(language, `โทร ${CONTACT.PHONE_DISPLAY}`, `Call ${CONTACT.PHONE_DISPLAY}`)} title={CONTACT.PHONE_DISPLAY}>
        <PhoneIcon />
      </a>
      <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="bg-[#06c755]" aria-label={t(language, `ทัก LINE ${CONTACT.LINE_ID}`, `Message LINE ${CONTACT.LINE_ID}`)} title={`LINE ${CONTACT.LINE_ID}`}>
        <LineIcon size={32} />
      </a>
    </aside>
  )
}
