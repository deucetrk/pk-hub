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
        <p className="pk-hero-location">{isThai ? 'ค้าส่งมือถือสำหรับร้านค้า · ฉะเชิงเทรา' : 'Phone wholesale for retailers · Chachoengsao'}</p>
        <p className="pk-hero-brand font-display"><span className="pk-typewriter">PK HUB.</span></p>
        <h1 id="hero-title" className="pk-hero-title font-display">
          {isThai ? <>กำลังหาเครื่องไปเติมร้านอยู่ไหม<br /><span>คุยรุ่นและราคากับทีม PK ได้เลย</span></> : <>Looking for stock for your store?<br /><span>Talk models and pricing with PK.</span></>}
        </h1>
        <p className="pk-hero-description">
          {isThai
            ? 'เลือกดูมือถือหลายแบรนด์ เช็กรุ่น ราคา และรอบส่งกับทีม PK ได้ทาง LINE'
            : 'Browse phones across brands, then check models, prices, and delivery rounds with the PK team on LINE.'}
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
          {isThai ? 'ดูสินค้าและบริการของ PK HUB' : 'See what PK HUB offers'}
        </a>
      </div>
      <figure className="pk-hero-media" aria-label={isThai ? 'ตัวอย่างการสอบถามสินค้า' : 'Sample product inquiry'}>
        <div className="pk-order-chat-demo">
          <div className="pk-order-chat-header">
            <span className="pk-order-chat-mark" aria-hidden="true">PK</span>
            <span className="pk-order-chat-heading">
              <strong>{isThai ? 'คุยกับทีม PK' : 'Chat with PK'}</strong>
              <small>{isThai ? 'สอบถามสินค้าและรอบส่ง' : 'Product and delivery inquiries'}</small>
            </span>
            <span className="pk-order-chat-label">{isThai ? 'ตัวอย่าง' : 'SAMPLE'}</span>
          </div>
          <div className="pk-order-chat-body">
            <p className="pk-order-chat-date">{isThai ? 'ตัวอย่างการคุย' : 'SAMPLE CONVERSATION'}</p>
            <div className="pk-order-chat-message pk-order-chat-message-customer">
              {isThai
                ? 'กำลังหาเครื่องไปเติมร้านครับ ขอเช็กรุ่น ราคา และรอบส่งได้ไหม'
                : 'I’m looking for phones for my store. Can I check models, pricing, and delivery?'}
              <small>{isThai ? 'ร้านค้า' : 'Retailer'}</small>
            </div>
            <div className="pk-order-chat-message pk-order-chat-message-team">
              {isThai
                ? 'ได้ครับ ส่งรุ่นที่สนใจมาได้เลย เดี๋ยวทีมเช็กข้อมูลล่าสุดให้ก่อนยืนยันครับ'
                : 'Of course. Send the models you’re interested in and our team will confirm the latest details.'}
              <small>{isThai ? 'ทีม PK' : 'PK team'}</small>
            </div>
            <div className="pk-order-chat-next">
              <span>{isThai ? 'รุ่นที่สนใจ' : 'Models'}</span>
              <span>{isThai ? 'ราคา' : 'Pricing'}</span>
              <span>{isThai ? 'รอบส่ง' : 'Delivery'}</span>
            </div>
          </div>
        </div>
        <figcaption>{isThai ? 'ตัวอย่างหน้าตาการสอบถาม · ไม่ใช่แชทหรือออเดอร์จริง' : 'Illustrative inquiry · Not a real chat or order'}</figcaption>
      </figure>
    </section>
  )
}
