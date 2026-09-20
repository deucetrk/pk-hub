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
  const journey = isThai ? ['หาสินค้า', 'เช็กข้อมูล', 'ตัดสินใจ', 'สั่งซื้อ', 'รับสินค้า', 'เติบโต'] : ['Source', 'Discover', 'Decide', 'Buy', 'Fulfill', 'Grow']

  return (
    <section id="why" className="pk-ecosystem scroll-mt-24" aria-labelledby="ecosystem-title">
      <Container>
        <div className="pk-ecosystem-intro">
          <p className="pk-eyebrow">THE PK CONNECTION</p>
          <h2 id="ecosystem-title" className="font-display">{isThai ? <>มากกว่าที่ซื้อของ<br /><span>พาร์ทเนอร์สำหรับร้านมือถือ</span></> : <>More than a supplier.<br /><span>A partner for your business.</span></>}</h2>
          <p className="pk-section-description">{isThai ? 'จากสินค้าที่วางขาย สู่เครื่องมือที่ช่วยให้ทำงานง่ายขึ้น เรากำลังเชื่อมสิ่งที่ร้านมือถือใช้ทุกวันให้ทำงานไปด้วยกัน' : 'From the products on your shelves to tools that simplify purchasing. We’re connecting the things a phone retailer works with every day.'}</p>
        </div>
        <ol className="pk-journey" aria-label={isThai ? 'เส้นทางการทำงานของร้านค้า' : 'The retailer journey'}>{journey.map((label, index) => <li key={label}><span>{label}</span>{index < journey.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</li>)}</ol>
        <m.div className="pk-supply" variants={item} initial="hidden" whileInView="show" viewport={revealViewport}>
          <figure><img src="/reviews/iphone-lot.webp" width={1100} height={600} loading="lazy" decoding="async" alt={isThai ? 'กล่อง iPhone จากงานค้าส่งจริงของ PK HUB' : 'iPhone boxes from real PK HUB wholesale operations'} /><figcaption>{isThai ? 'ภาพจากงานจริงของ PK · ตรวจสอบสต็อกปัจจุบันกับทีม' : 'Real PK operations · Check current availability with the team'}</figcaption></figure>
          <div className="pk-feature-copy">
            <p className="pk-eyebrow">01 / TRUSTED SUPPLY</p>
            <h3 className="font-display">{isThai ? <>มั่นใจในสินค้า<br />รู้จักคนที่ส่งให้</> : <>Know your supply.<br />Know your partner.</>}</h3>
            <p>{isThai ? 'มือถือเครื่องศูนย์ไทย หลายแบรนด์ ผ่านทีมที่มีหน้าร้านจริงในฉะเชิงเทรา คุยรุ่น เอกสาร และเงื่อนไขให้ชัดก่อนตัดสินใจ' : 'Official Thai-market phones across brands, from a team with a physical store in Chachoengsao. Clarify models, documents, and terms before deciding.'}</p>
            <ul className="pk-feature-facts"><li>{isThai ? 'เช็กแหล่งที่มาและรายละเอียดสินค้า' : 'Check sourcing and product details'}</li><li>{isThai ? 'สอบถามเอกสารภาษีและการรับประกัน' : 'Discuss tax documents and warranty terms'}</li><li>{isThai ? 'มีทีมประสานงานก่อนและหลังสั่งซื้อ' : 'Reach the team before and after ordering'}</li></ul>
            <a href="#proof" className="pk-text-link">{isThai ? 'ดูเบื้องหลังการทำงาน' : 'See the work behind your order'}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </m.div>
      </Container>
      <div id="dealer-portal" className="pk-portal-section scroll-mt-24">
        <Container>
          <div className="pk-portal-heading">
            <div><p className="pk-eyebrow">02 / DEALER PORTAL</p><h3 className="font-display">{isThai ? <>เช็ก สั่ง ติดตาม<br />ให้ต่อกันในที่เดียว</> : <>Find it. Order it.<br />Keep it connected.</>}</h3></div>
            <div><p>{isThai ? 'ดูราคาสำหรับร้าน เช็กสต็อกอ้างอิง และติดตามคำสั่งซื้อผ่าน Dealer Portal สำหรับร้านที่ผ่านการตรวจสอบและได้รับสิทธิ์แล้ว' : 'View your store’s pricing, reference stock, and order status through the Dealer Portal after review and access approval.'}</p><a className="pk-text-link" href={withReferral(`/${language}/dealer/login`, referralCode)}>{isThai ? 'เข้าสู่ Dealer Portal' : 'Enter the Dealer Portal'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
          <m.div variants={item} initial="hidden" whileInView="show" viewport={revealViewport}><PortalPreview /></m.div>
        </Container>
      </div>
      <Container>
        <div className="pk-next-heading"><p className="pk-eyebrow">WHAT WE’RE BUILDING NEXT</p><p>{isThai ? 'ทิศทางต่อไปของเครือข่าย PK — บริการด้านล่างยังไม่เปิดใช้งานผ่านเว็บไซต์' : 'The next direction for the PK network — the services below are not yet available through this website.'}</p></div>
        <div className="pk-next-grid">
          <m.article className="pk-intelligence" variants={item} initial="hidden" whileInView="show" viewport={revealViewport}>
            <p className="pk-eyebrow">03 / PK INTELLIGENCE</p><span className="pk-development">{isThai ? 'แนวทางที่กำลังพัฒนา' : 'In development'}</span>
            <h3 className="font-display">{isThai ? <>เติมของครั้งถัดไป<br />ด้วยข้อมูลที่ดีกว่า</> : <>Better information.<br />Better buying decisions.</>}</h3>
            <p>{isThai ? 'เรากำลังพัฒนาแนวทางใช้ข้อมูลสินค้า ราคา และการเคลื่อนไหว ช่วยให้ร้านตัดสินใจเรื่องของที่จะเติมได้ชัดขึ้น' : 'We’re developing ways to use product, price, and movement information to help stores make clearer replenishment decisions.'}</p>
            <ul className="pk-question-list">{(isThai ? ['รุ่นไหนควรเติม?', 'อะไรเริ่มหมุนช้า?', 'งบครั้งนี้ควรลงที่ไหน?'] : ['Which models should I restock?', 'What is moving more slowly?', 'Where should my next budget go?']).map(q => <li key={q}>{q}<ArrowUpRight size={20} aria-hidden="true" /></li>)}</ul>
            <p className="pk-feature-note">{isThai ? 'ตัวอย่างคำถามที่ตั้งใจช่วยตอบ ยังไม่มีคำแนะนำหรือผลวิเคราะห์ให้ใช้งาน' : 'Examples of questions we aim to help answer. Recommendations and analysis are not yet available.'}</p>
          </m.article>
          <m.article className="pk-financing" variants={item} initial="hidden" whileInView="show" viewport={revealViewport}>
            <p className="pk-eyebrow">04 / FINANCING OPTIONS</p><span className="pk-development">{isThai ? 'อยู่ระหว่างวางแนวทางบริการ' : 'Service direction under review'}</span>
            <h3 className="font-display">{isThai ? <>เพิ่มทางเลือก<br />ให้การขายของร้าน</> : <>More ways to support<br />your store’s sales.</>}</h3>
            <p>{isThai ? 'แนวทางที่เรากำลังศึกษา คือเชื่อมร้านค้ากับบริการผ่อนสำหรับผู้ซื้อ และแยกออกจากเรื่องเงินทุนของร้านอย่างชัดเจน' : 'We’re exploring how retailers could connect customers with installment services, clearly separate from financing for the retailer itself.'}</p>
            <div className="pk-finance-distinction"><div><h4>{isThai ? 'ผ่อนสำหรับลูกค้าหน้าร้าน' : 'Installments for retail customers'}</h4><p>{isThai ? 'ทางเลือกสำหรับผู้ซื้อ โดยผู้ให้บริการเป็นผู้กำหนดเงื่อนไขและพิจารณาอนุมัติ' : 'Options for the buyer, with terms and approval determined by the provider.'}</p></div><div><h4>{isThai ? 'เงินทุนสำหรับร้านค้า' : 'Financing for the retailer'}</h4><p>{isThai ? 'เป็นคนละบริการ ยังไม่มีวงเงินหรือข้อเสนอสินเชื่อร้านค้าให้สมัครผ่านหน้านี้' : 'A separate service. No retailer credit limit or loan offer is available through this page.'}</p></div></div>
          </m.article>
        </div>
        <div className="pk-ecosystem-end"><div><p className="font-display text-xl font-semibold">{isThai ? 'เริ่มเป็นส่วนหนึ่งของเครือข่าย PK' : 'Make your next move with PK'}</p><p className="mt-2 text-sm leading-6 text-zinc-600">{isThai ? 'สมัครให้ทีมรู้จักร้านของคุณ สิทธิ์ใช้งานเปิดหลังตรวจสอบและอนุมัติ' : 'Introduce your store. Access follows review and approval.'}</p></div><a href={withReferral(`/${language}/join`, referralCode)} className="pk-action pk-action-primary">{isThai ? 'สมัครเป็นพาร์ทเนอร์' : 'Become a partner'}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </Container>
    </section>
  )
}
