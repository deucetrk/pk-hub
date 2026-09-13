import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react'

import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from '@/pages/home/constants'
import { withReferral } from '@/utils/referralAttribution'

export default function HeroSection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()

  return (
    <section className="pk-hero" aria-labelledby="hero-title">
      <div className="pk-hero-copy">
        <p className="pk-hero-location">{isThai ? 'ฉะเชิงเทรา · ดูแลร้านค้าในภาคตะวันออก' : 'Chachoengsao · For retailers across eastern Thailand'}</p>
        <p className="pk-hero-brand font-display">WITH PK.</p>
        <h1 id="hero-title" className="pk-hero-title font-display">
          {isThai ? <>ร้านคุณไปได้ไกลกว่า<br /><span>เมื่อมีพาร์ทเนอร์ที่ใช่</span></> : <>More for your store.<br /><span>A partner for what’s next.</span></>}
        </h1>
        <p className="pk-hero-description">
          {isThai
            ? 'ค้าส่งมือถือหลายแบรนด์ เครื่องมือสั่งซื้อสำหรับร้านค้า และทีมที่คุยกันได้จริง เชื่อมการซื้อวันนี้กับการเติบโตของร้านคุณ'
            : 'Multi-brand phone wholesale, tools for retail purchasing, and people you can talk to. Connect today’s orders with your store’s next step.'}
        </p>
        <div className="pk-hero-actions">
          <a className="pk-action pk-action-primary" href={withReferral(`/${language}/join`, referralCode)}>
            {isThai ? 'สมัครเป็นพาร์ทเนอร์' : 'Become a partner'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="pk-action pk-action-secondary" href={CONTACT.LINE_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={18} className="text-[#008a3b]" aria-hidden="true" />
            {isThai ? 'ทัก LINE คุยกับทีม' : 'Talk to PK on LINE'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <a href="#why" className="pk-hero-explore">
          <ArrowDown size={17} aria-hidden="true" />
          {isThai ? 'รู้จักพาร์ทเนอร์ร้านมือถือของคุณ' : 'Meet your wholesale partner'}
        </a>
      </div>
      <figure className="pk-hero-media">
        <img src="/proof/storefront-building.webp" alt={isThai ? 'อาคารหน้าร้าน PK HUB ถนนศุขประยูร ฉะเชิงเทรา' : 'PK HUB storefront on Sukprayoon Road, Chachoengsao'} width={1600} height={1200} {...{ fetchpriority: 'high' }} loading="eager" />
        <figcaption>
          <span>{isThai ? 'เริ่มจากรู้จักกัน แล้วค่อยเติบโตไปด้วยกัน' : 'Start with a conversation. Build a relationship.'}</span>
          <a href={CONTACT.MAPS_URL} target="_blank" rel="noreferrer">{isThai ? 'แวะมาที่ PK' : 'Visit PK'} <ArrowUpRight size={18} aria-hidden="true" /></a>
        </figcaption>
      </figure>
    </section>
  )
}
