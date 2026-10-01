import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, ArrowUpRight, LockKeyhole, Search, PackageCheck, SlidersHorizontal } from 'lucide-react'
import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { withReferral } from '@/utils/referralAttribution'

const PORTAL_STEPS = {
  th: [
    ['ค้นหารุ่น', 'เริ่มจากของที่ร้านต้องการ', 'ค้นหาแบรนด์ รุ่น และความจุ เพื่อดูรายการที่เกี่ยวข้องในแค็ตตาล็อก'],
    ['เช็กราคาส่ง', 'เห็นข้อมูลก่อนตัดสินใจ', 'ราคาตามสิทธิ์ร้านและสต็อกอ้างอิง ช่วยให้คุยเรื่องออเดอร์กับทีมได้ตรงกัน'],
    ['ตามออเดอร์', 'กลับมาตามงานในที่เดียว', 'ดูคำสั่งซื้อและสถานะของร้าน พร้อมช่องทางติดต่อทีมที่ดูแล'],
  ],
  en: [
    ['Find products', 'Start with what your store needs', 'Search brands, models, and capacities to find relevant catalog items.'],
    ['Check pricing', 'Get the facts before you decide', 'Store-specific pricing and reference stock help you discuss orders with the team.'],
    ['Track orders', 'Keep the conversation connected', 'View your store’s orders and status, with a route to the team that supports you.'],
  ],
}

function PortalPreview() {
  const { isThai, language } = useLanguage()
  const [active, setActive] = useState(0)
  const { reduceMotion } = useRevealMotion()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const steps = PORTAL_STEPS[language]
  const icons = [Search, SlidersHorizontal, PackageCheck]
  const Icon = icons[active]

  return (
    <div className="pk-portal-demo">
      <div className="pk-browser-bar"><span className="font-display font-bold">PK HUB <span className="font-normal">/ DEALER PORTAL</span></span><LockKeyhole size={15} aria-hidden="true" /></div>
      <div className="pk-portal-body">
        <div role="tablist" aria-label={isThai ? 'สำรวจการใช้งาน Dealer Portal' : 'Explore the Dealer Portal'} className="pk-portal-tabs">
          {steps.map(([label], index) => (
            <button key={label} ref={(node) => { tabRefs.current[index] = node }} id={`portal-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="portal-panel" tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index
                if (event.key === 'ArrowRight') next = (index + 1) % steps.length
                else if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length
                else if (event.key === 'Home') next = 0
                else if (event.key === 'End') next = steps.length - 1
                else return
                event.preventDefault()
                setActive(next)
                tabRefs.current[next]?.focus()
              }}><span aria-hidden="true">0{index + 1}</span>{label}</button>
          ))}
        </div>
        <div id="portal-panel" role="tabpanel" aria-labelledby={`portal-tab-${active}`} tabIndex={0} className="pk-portal-panel">
          <AnimatePresence initial={false} mode="wait">
            <m.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              <div className="pk-portal-preview-heading"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span>{isThai ? 'สำหรับร้านที่ได้รับอนุมัติ' : 'For approved partner stores'}</span></div>
              <h4 className="font-display">{steps[active][1]}</h4>
              <p>{steps[active][2]}</p>
              {active === 0 ? <div className="pk-portal-example">
                <div className="pk-catalog-search"><Search size={17} aria-hidden="true" />{isThai ? 'แบรนด์ · รุ่น · ความจุ' : 'Brand · Model · Capacity'}</div>
                <div className="pk-catalog-brands"><span>Apple</span><span>Samsung</span><span>OPPO</span><span>vivo</span></div>
                <div className="pk-catalog-note"><LockKeyhole size={17} aria-hidden="true" />{isThai ? 'เข้าสู่ระบบเพื่อดูรายการและราคาสำหรับร้านคุณ' : 'Sign in for your store’s catalog and prices'}</div>
              </div> : active === 1 ? <dl className="pk-portal-example pk-data-rows">
                <div><dt>{isThai ? 'ราคาส่ง' : 'Wholesale price'}</dt><dd>{isThai ? 'ตามสิทธิ์ของร้าน' : 'Based on store access'}</dd></div>
                <div><dt>{isThai ? 'สต็อก' : 'Stock'}</dt><dd>{isThai ? 'ข้อมูลอ้างอิงตามรอบอัปเดต' : 'Reference data, updated in batches'}</dd></div>
                <div><dt>{isThai ? 'ก่อนยืนยัน' : 'Before confirming'}</dt><dd>{isThai ? 'ตรวจสอบเงื่อนไขของรายการ' : 'Review the item’s terms'}</dd></div>
              </dl> : <div className="pk-portal-example pk-order-preview">
                <PackageCheck size={34} strokeWidth={1.3} aria-hidden="true" />
                <span>{isThai ? 'คำสั่งซื้อของร้านคุณ' : 'Your store’s orders'}</span>
                <p>{isThai ? 'รายละเอียดออเดอร์ สถานะ และประวัติ จะอยู่ในบัญชีที่ได้รับอนุมัติ' : 'Order details, status, and history are available in your approved account.'}</p>
              </div>}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="pk-demo-caption">{isThai ? 'ภาพอธิบายการใช้งานจากโครงสร้าง Portal · ไม่แสดงราคา สต็อก หรือข้อมูลร้านค้าจริง' : 'Illustration based on the Portal structure · No actual prices, stock, or store data shown'}</p>
    </div>
  )
}

export default function WhySection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  const { item } = useRevealMotion()
  const journey = isThai ? ['เลือกรุ่น', 'เช็กราคาและสต็อก', 'ยืนยันออเดอร์', 'รับสินค้า'] : ['Choose models', 'Check price and stock', 'Confirm the order', 'Receive your goods']

  return (
    <section id="why" className="pk-ecosystem scroll-mt-24" aria-labelledby="ecosystem-title">
      <Container>
        <div className="pk-ecosystem-intro">
          <p className="pk-eyebrow">{isThai ? 'รู้จัก PK HUB' : 'Meet PK HUB'}</p>
          <h2 id="ecosystem-title" className="font-display">{isThai ? <>หาแหล่งรับมือถือ<br /><span>ที่คุยกันรู้เรื่อง</span></> : <>A wholesale partner<br /><span>who knows your business.</span></>}</h2>
          <p className="pk-section-description">{isThai ? 'คุยกับทีม PK เรื่องรุ่น เอกสาร และเงื่อนไขให้ชัดก่อนสั่งซื้อ แล้วตามงานต่อได้ผ่าน Dealer Portal' : 'Talk models, documents, and terms through with PK before ordering. Follow up through the Dealer Portal.'}</p>
        </div>
        <ol className="pk-journey" aria-label={isThai ? 'เส้นทางการทำงานของร้านค้า' : 'The retailer journey'}>{journey.map((label, index) => <li key={label}><span>{label}</span>{index < journey.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</li>)}</ol>
        <m.div className="pk-supply" variants={item} initial="hidden" whileInView="show" viewport={revealViewport}>
          <figure><img src="/reviews/iphone-lot.webp" width={1100} height={600} loading="lazy" decoding="async" alt={isThai ? 'กล่อง iPhone จากงานค้าส่งจริงของ PK HUB' : 'iPhone boxes from real PK HUB wholesale operations'} /><figcaption>{isThai ? 'ภาพจากงานจริงของ PK · ตรวจสอบสต็อกปัจจุบันกับทีม' : 'Real PK operations · Check current availability with the team'}</figcaption></figure>
          <div className="pk-feature-copy">
            <p className="pk-eyebrow">{isThai ? '01 / สินค้าและทีมขาย' : '01 / Products and people'}</p>
            <h3 className="font-display">{isThai ? <>รู้รายละเอียดสินค้า<br />คุยกับทีมได้โดยตรง</> : <>Know what you’re buying.<br />Talk directly with our team.</>}</h3>
            <p>{isThai ? 'มือถือหลายแบรนด์จากทีมที่มีหน้าร้านในฉะเชิงเทรา สอบถามรุ่น เอกสารภาษี และเงื่อนไขก่อนตัดสินใจได้' : 'Phones across brands from a team with a physical store in Chachoengsao. Ask about models, tax documents, and terms before deciding.'}</p>
            <ul className="pk-feature-facts"><li>{isThai ? 'ถามรายละเอียดรุ่นและสินค้าได้ก่อนสั่ง' : 'Ask about models and product details'}</li><li>{isThai ? 'คุยเรื่องเอกสารภาษีและการรับประกัน' : 'Discuss tax documents and warranty terms'}</li><li>{isThai ? 'ติดต่อทีมได้ก่อนและหลังสั่งซื้อ' : 'Contact the team before and after ordering'}</li></ul>
            <a href="#proof" className="pk-text-link">{isThai ? 'ดูเบื้องหลังการทำงาน' : 'See the work behind your order'}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </m.div>
      </Container>
      <div id="dealer-portal" className="pk-portal-section scroll-mt-24">
        <Container>
          <div className="pk-portal-heading">
            <div><p className="pk-eyebrow">{isThai ? '02 / ระบบร้านค้า' : '02 / Dealer Portal'}</p><h3 className="font-display">{isThai ? <>เช็กราคา สั่งซื้อ<br />แล้วตามออเดอร์ได้</> : <>Check prices. Order.<br />Track what’s next.</>}</h3></div>
            <div><p>{isThai ? 'ร้านที่ได้รับอนุมัติใช้ Dealer Portal เพื่อดูราคาตามสิทธิ์ เช็กสต็อกอ้างอิง และดูสถานะคำสั่งซื้อได้' : 'Approved stores can view their pricing, check reference stock, and follow order status in the Dealer Portal.'}</p><a className="pk-text-link" href={withReferral(`/${language}/dealer/login`, referralCode)}>{isThai ? 'เข้าสู่ระบบร้านค้า' : 'Sign in to the Dealer Portal'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
          <m.div variants={item} initial="hidden" whileInView="show" viewport={revealViewport}><PortalPreview /></m.div>
          <div className="pk-ecosystem-end"><div><p className="font-display text-xl font-semibold">{isThai ? 'อยากสมัครเป็นร้านค้าพาร์ทเนอร์?' : 'Want to apply as a retail partner?'}</p><p className="mt-2 text-sm leading-6 text-zinc-600">{isThai ? 'ส่งข้อมูลร้านให้ทีม PK ตรวจสอบก่อนเปิดสิทธิ์ใช้งาน' : 'Send your store details for review before access is enabled.'}</p></div><a href={withReferral(`/${language}/join`, referralCode)} className="pk-action pk-action-primary">{isThai ? 'สมัครร้านค้า' : 'Apply as a store'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </Container>
      </div>
    </section>
  )
}
