import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'

import { CONTACT, route, t } from './site'

export default function CtaBand({ id = 'v1-start' }: { id?: string }) {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  return (
    <section id={id} className="v1-band v1-dark v1-cta scroll-mt-20" aria-labelledby={`${id}-title`}>
      <div className="v1-wrap v1-cta-grid">
        <div className="grid gap-[22px]">
          <h2 id={`${id}-title`} className="v1-h2">
            {t(language, 'เพิ่มทางเลือกให้ร้าน', 'More choices for your store')}
            <br />
            {t(language, 'เริ่มที่การเป็นคู่ค้า PK HUB', 'start as a PK HUB partner')}
          </h2>
          <p className="v1-lede max-w-[640px]" style={{ color: '#ccc' }}>
            {t(
              language,
              'ฝากข้อมูลร้าน แล้วให้ทีม PK HUB ติดต่อกลับ เพื่อคุยใบสมัครและบริการที่เหมาะกับร้าน',
              'Leave your store details and the PK HUB team will call you back to talk through the application and the services that fit.',
            )}
          </p>
        </div>
        <div className="grid justify-items-start gap-[18px]">
          <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-primary">
            {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="v1-link text-white">
            {t(language, 'คุยกับทีมทาง LINE', 'Talk to the team on LINE')} <span aria-hidden="true">↗</span>
          </a>
          <p className="text-base leading-7 text-[#bebebe]">
            {t(language, 'ฝากข้อมูลร้าน → ทีมติดต่อกลับ', 'Leave details → the team calls back')}
            <br />
            {t(language, '→ คุยบริการและเงื่อนไขร่วมกัน', '→ agree services and terms together')}
          </p>
        </div>
      </div>
      <div className="v1-glitter" aria-hidden="true" />
    </section>
  )
}
