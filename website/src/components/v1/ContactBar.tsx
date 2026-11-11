import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'

import { LineIcon, PhoneIcon } from './icons'
import { CONTACT, route, t } from './site'

/**
 * Phone-only contact bar (Paper "Audit proposals · Nov 2026", board D): join + LINE + call in one
 * bar. It appears once the first screen has scrolled away and hides while the closing band or
 * footer is on screen, where the same actions are already visible. CSS keeps it off wider screens.
 */
export default function ContactBar() {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const endings = Array.from(document.querySelectorAll('.v1-cta, .v1-footer'))
    const update = () => {
      const viewport = window.innerHeight
      const pastFirstScreen = window.scrollY > viewport * 0.6
      const atEnd = endings.some((el) => el.getBoundingClientRect().top < viewport)
      setShow(pastFirstScreen && !atEnd)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.contactBar = show ? 'show' : 'hide'
    return () => {
      delete root.dataset.contactBar
    }
  }, [show])

  const tab = show ? undefined : -1
  return (
    <aside className="v1-contact-bar" data-show={show} aria-hidden={!show} aria-label={t(language, 'ติดต่อ PK HUB', 'Contact PK HUB')}>
      <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-primary" tabIndex={tab}>
        {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
      <a
        href={CONTACT.LINE_URL}
        target="_blank"
        rel="noreferrer"
        className="v1-contact-icon bg-[#06c755]"
        aria-label={t(language, `ทัก LINE ${CONTACT.LINE_ID}`, `Message LINE ${CONTACT.LINE_ID}`)}
        tabIndex={tab}
      >
        <LineIcon size={30} />
      </a>
      <a
        href={CONTACT.PHONE_TEL}
        className="v1-contact-icon bg-[#2457d6]"
        aria-label={t(language, `โทร ${CONTACT.PHONE_DISPLAY}`, `Call ${CONTACT.PHONE_DISPLAY}`)}
        tabIndex={tab}
      >
        <PhoneIcon size={24} />
      </a>
    </aside>
  )
}
