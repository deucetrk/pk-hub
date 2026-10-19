import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'

import { route, t } from './site'

/**
 * Mobile-only join bar: appears once the hero has scrolled away and hides again while the closing
 * band or footer is on screen. It sits left of the floating phone/LINE buttons, never over them.
 */
export default function StickyJoin() {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.v1-hero')
    const endings = Array.from(document.querySelectorAll('.v1-cta, .v1-footer'))
    if (!hero) return
    const update = () => {
      const viewport = window.innerHeight
      const pastHero = hero.getBoundingClientRect().bottom < 0
      const atEnd = endings.some((el) => el.getBoundingClientRect().top < viewport)
      setShow(pastHero && !atEnd)
    }
    // Two rect reads per scroll event; React skips the render when `show` is unchanged.
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="v1-sticky-cta" data-show={show} aria-hidden={!show}>
      <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-primary" tabIndex={show ? undefined : -1}>
        {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
    </div>
  )
}
