import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, BatteryCharging, CircleHelp, FileCheck2, Headset, MessageCircle, Radio, Repeat, ShieldCheck, Smartphone, Store, Wrench } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'
import { useSceneMotion } from '@/hooks/useSceneMotion'
import { useLanguage } from '@/i18n/LanguageContext'
import { useRevealMotion } from '@/lib/motion'
import { APPROVED_METRICS } from '@/content/metrics'
import type { ProductId } from '@/content/productServices'

export const PRODUCT_IMAGES = {
  phone: { src: '/pkhub-v7/products/phoneFamily.webp', width: 418, height: 600, alt: 'iPhone' },
  tablet: { src: '/pkhub-v7/products/ipad.webp', width: 367, height: 600, alt: 'iPad' },
  case: { src: '/pkhub-v7/products/case.webp', width: 600, height: 600, alt: 'Case' },
  charger: { src: '/pkhub-v7/products/charger.webp', width: 280, height: 280, alt: 'Charger' },
  audio: { src: '/pkhub-v7/products/earbuds.webp', width: 600, height: 329, alt: 'Earbuds' },
} as const

export function SimStrip() {
  const { isThai } = useLanguage()
  const { reduceMotion } = useRevealMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false), { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <button ref={ref} type="button" className={`ps-sim-strip ${visible && !paused && !hover && !focus && !reduceMotion ? 'is-running' : ''}`} aria-pressed={paused} aria-label={isThai ? (paused ? 'เริ่มภาพซิมเคลื่อนอีกครั้ง' : 'หยุดภาพซิมที่เคลื่อนอยู่') : (paused ? 'Resume SIM animation' : 'Pause SIM animation')} onClick={() => setPaused(v => !v)} onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true) }} onPointerLeave={() => setHover(false)} onFocus={e => setFocus(e.currentTarget.matches(':focus-visible'))} onKeyDown={() => setFocus(true)} onBlur={() => setFocus(false)}>
    <div className="ps-sim-track">{[0, 1].map(group => <div key={group} className="ps-sim-group" aria-hidden={group === 1 ? true : undefined}>
      <img src="/pkhub-v7/products/simSocial.webp" width={600} height={600} alt={group ? '' : 'AIS Super Social SIM'} decoding="async" />
      <img src="/pkhub-v7/products/simZeed.webp" width={600} height={600} alt={group ? '' : 'AIS ZEED SIM'} decoding="async" />
      <span className="ps-sim-wide"><img src="/pkhub-v7/products/aisSim.webp" width={760} height={324} alt={group ? '' : 'AIS SIM range'} decoding="async" /></span>
    </div>)}</div>
  </button>
}

export default function ProductVisual({ id, compact = false }: { id: ProductId; compact?: boolean }) {
  const { isThai } = useLanguage()
  const { reduceMotion } = useRevealMotion()
  const [selected, setSelected] = useState(0)
  const scene = useSceneMotion()
  const [topupStep, setTopupStep] = useState(0)
  const text = (th: string, en: string) => isThai ? th : en
  const duration = reduceMotion ? 0 : 0.4
  const labels = id === 'stock-on-demand' ? [text('ลูกค้าถาม', 'Customer asks'), text('เช็กกับ PK', 'Check with PK'), text('เสนอทางเลือก', 'Make an offer')]
    : id === 'handset-wholesale' ? [text('มือถือ', 'Phones'), text('แท็บเล็ต', 'Tablets')]
    : id === 'accessories' ? [text('ปกป้อง', 'Protect'), text('ชาร์จ', 'Charge'), text('ฟัง', 'Listen')]
    : id === 'finance' ? [text('ร้านของคุณ', 'Your shop'), 'PK HUB', 'S Leasing']
    : id === 'after-sales' ? [text('รับเรื่อง', 'Share details'), text('ประสาน', 'Coordinate'), text('ติดตาม', 'Follow up')]
    : id === 'repair' ? [text('หน้าจอ', 'Screen'), text('แบตเตอรี่', 'Battery'), text('อาการอื่น', 'Other issues')]
    : []
  const mode = id
  const visualStep = id === 'ais-rom' ? topupStep : selected
  return <m.div style={scene.running ? {y:scene.drift} : undefined} ref={scene.ref} onPointerDown={scene.engage} onKeyDown={scene.engage} data-motion-phase={scene.phase} className={`ps-visual ps-visual-${mode} ${compact ? 'is-compact' : ''} ${scene.running ? 'is-motion-visible' : ''}`}>
    {mode === 'stock-on-demand' && <>
      <div className="ps-stock-preview"><div className="ps-stock-bubble"><MessageCircle size={16} aria-hidden="true" />{[text('รุ่นนี้ มีไหมครับ?', 'Do you have this model?'), text('ขอเช็กกับทีม PK ก่อนนะครับ', 'Let me check with PK first.'), text('มายืนยันรุ่น ราคา และวันรับกัน', 'Let’s confirm model, price and collection.')][selected]}</div><div className="ps-stock-bridge"><div><img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="PK HUB" /><span>{text('สต็อกส่วนต่อของร้าน', 'Your extended assortment')}</span></div><ArrowRight size={23} aria-hidden="true" /><div><Store size={30} aria-hidden="true" /><span>{text('โอกาสของร้านคุณ', 'Your shop’s opportunity')}</span></div></div><div className="ps-feature-message"><strong>{text('ตัวเลือกขาย มากกว่าที่ร้านถือ', 'More options than you hold')}</strong><span>{text('ยืนยันสินค้าและเงื่อนไข ก่อนรับปากลูกค้า', 'Confirm stock and terms before committing')}</span></div></div>
    </>}
    {mode === 'handset-wholesale' && <>
      <div className="ps-device-pair">{(['phone', 'tablet'] as const).map((key, i) => <m.img key={key} {...PRODUCT_IMAGES[key]} decoding="async" animate={{ y: selected === i ? -8 : 10, scale: selected === i ? 1.035 : 0.93, opacity: selected === i ? 1 : 0.6 }} transition={{ duration }} />)}<span className="ps-product-caption">{text('รุ่นเริ่มต้น ถึงเรือธง', 'Entry-level to flagship')}</span></div>
      <div className="ps-float-note"><ShieldCheck size={17} aria-hidden="true" /><div><strong>{text('เครื่องศูนย์ไทยแท้', 'Official Thai-market devices')}</strong><span>{text('ใบกำกับภาษีเต็มรูปแบบ', 'Full tax invoices')}</span></div></div>
    </>}
    {mode === 'accessories' && <>
      <div className="ps-accessory-assembly">{(['case', 'charger', 'audio'] as const).map((key, i) => <m.img key={key} {...PRODUCT_IMAGES[key]} decoding="async" animate={{ y: selected === i ? -14 : 8, scale: selected === i ? 1.08 : 0.88, opacity: selected === i ? 1 : 0.8 }} transition={{ duration }} />)}</div>
      <AnimatePresence mode="wait" initial={false}><m.div key={selected} className="ps-feature-message" initial={{ opacity: 0, y: reduceMotion ? 0 : 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: duration / 2 }}><strong>{[text('เสนอขายคู่กับเครื่อง', 'Offer alongside the device'), text('จัดชุดพร้อมใช้ให้ร้านเสนอ', 'Build a set your shop can offer'), text('เติมตัวเลือกในบิลของร้าน', 'Add choice to your shop’s basket')][selected]}</strong><span>{text('เลือกอุปกรณ์ให้ตรงรุ่นและความต้องการ', 'Match the model and the customer’s needs')}</span></m.div></AnimatePresence>
      <span className="ps-brand-note">{text('อุปกรณ์เสริม · รวม Link Up by AIS', 'Accessories · Including Link Up by AIS')}</span>
    </>}
    {mode === 'ais-sim' && <>
      <div className="ps-network-label"><Radio size={18} aria-hidden="true" /><span>AIS SIM &amp; PACKAGES</span></div>
      <SimStrip />
      <div className="ps-connection-story"><span><Smartphone size={18} aria-hidden="true" />{text('เครื่องใหม่', 'New device')}</span><ArrowRight size={16} aria-hidden="true" /><span><Radio size={18} aria-hidden="true" />{text('การเชื่อมต่อที่เหมาะ', 'The right connectivity')}</span></div>
    </>}
    {mode === 'ais-rom' && <>
      <div className="ps-topup-sheet"><div className="ps-sheet-bar"><img src="/pkhub-v7/products/myais.svg" width={42} height={42} alt="myAIS" /><span>ONLINE TOP UP</span></div><p>{text('ยอดเติมเงินต่อรายการ', 'Top-up amount per transaction')}</p><div className="ps-topup-number"><AnimatedNumber from={APPROVED_METRICS.topup.from} to={APPROVED_METRICS.topup.to} triggerKey={topupStep} dataNumber="productTopup" /><span>THB</span></div><span className="v6-sr" role="status">{text('ยอดเติมเงินต่อรายการ 1,000 THB', 'Top-up amount per transaction 1,000 THB')}</span><div className="ps-topup-status"><Repeat size={15} aria-hidden="true" />{[text('ลูกค้าเลือกยอดเติมเงิน', 'Customer selects the amount'), text('ร้านตรวจสอบก่อนทำรายการ', 'Shop checks the details'), text('ติดตามผลผ่านช่องทางบริการ', 'Follow up through the service channel')][topupStep]}</div><small>{text('ภาพอธิบายขั้นตอน · ไม่มีการเติมเงินจริง', 'Illustrative walkthrough · No real top-up is made')}</small></div>
      <span className="ps-returning"><MessageCircle size={16} aria-hidden="true" />{text('อีกจังหวะให้ลูกค้ากลับมาที่ร้าน', 'Another reason to return to your shop')}</span>
    </>}
    {mode === 'finance' && <>
      <div className="ps-finance-network"><button type="button" className={selected === 0 ? 'is-active' : ''} onClick={() => setSelected(0)} aria-pressed={selected === 0}><Store size={26} aria-hidden="true" /><strong>{text('ร้านของคุณ', 'Your shop')}</strong><span>{text('สนใจเป็นตัวแทน', 'Explore becoming an agent')}</span></button><span className="ps-network-line" aria-hidden="true"><b key={selected} /></span><button type="button" className={selected === 1 ? 'is-active' : ''} onClick={() => setSelected(1)} aria-pressed={selected === 1}><img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="PK HUB" /><strong>{text('HUB รับสมัครตัวแทน', 'Agent recruitment Hub')}</strong></button><span className="ps-network-line" aria-hidden="true"><b key={selected} /></span><button type="button" className={selected === 2 ? 'is-active' : ''} onClick={() => setSelected(2)} aria-pressed={selected === 2}><img src="/pkhub-v7/brands/sleasing.png" width={437} height={195} alt="S Leasing" /><span>{text('เกณฑ์ผู้ให้บริการ', 'Provider requirements')}</span></button></div>
      <div className="ps-finance-brief"><FileCheck2 size={20} aria-hidden="true" /><div><strong>{[text('เปิดทางเลือกให้หน้าร้าน', 'An option for your shop'), text('คุยพื้นที่และการเข้าร่วมกับ PK', 'Discuss territory and joining with PK'), text('พิจารณาตามเกณฑ์ S Leasing', 'Subject to S Leasing’s assessment')][selected]}</strong><p>{text('PK Hub เป็น Hub รับสมัครตัวแทน S Leasing', 'PK Hub is an agent recruitment Hub for S Leasing')}</p></div></div>
    </>}
    {mode === 'after-sales' && <>
      <div className="ps-support-ticket"><div className="ps-sheet-bar"><img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="PK HUB" /><span>PARTNER CARE</span></div><h3>{text('ช่วยให้ร้านดูแลลูกค้าต่อ', 'Keep looking after your customer')}</h3><div className="ps-ticket-items"><span><Smartphone size={17} aria-hidden="true" />{text('รุ่นสินค้าและอาการ', 'Device and issue')}</span><span><FileCheck2 size={17} aria-hidden="true" />{text('หลักฐานการซื้อ', 'Purchase documents')}</span><span><Headset size={17} aria-hidden="true" />{text('ประสานตามเงื่อนไขแบรนด์', 'Coordinate under brand terms')}</span></div><div className="ps-ticket-progress">{[0, 1, 2].map(i => <span key={i} className={i <= selected ? 'is-active' : ''} />)}</div><p>{text('ตัวอย่างจังหวะการประสาน · ไม่ใช่สถานะเคลมจริง', 'Illustrative coordination journey · Not a live claim')}</p></div>
      <div className="ps-care-reply"><MessageCircle size={17} aria-hidden="true" /><span>{[text('ส่งรายละเอียดให้ทีมช่วยตรวจสอบ', 'Share the details for the team to check'), text('ทีมช่วยประสานช่องทางบริการ', 'The team helps coordinate the service channel'), text('ติดตามข้อมูลเพื่อนัดหมายกับลูกค้า', 'Follow up to keep your customer informed')][selected]}</span></div>
    </>}
    {mode === 'repair' && <>
      <div className="ps-repair-device"><img {...PRODUCT_IMAGES.phone} decoding="async" /><span className={`ps-device-marker marker-${selected}`}><i /></span><span className="ps-repair-tool"><Wrench size={26} aria-hidden="true" /></span></div>
      <div className="ps-repair-note">{selected === 0 ? <Smartphone size={20} aria-hidden="true" /> : selected === 1 ? <BatteryCharging size={20} aria-hidden="true" /> : <CircleHelp size={20} aria-hidden="true" />}<div><strong>{[text('เล่าอาการหน้าจอ', 'Describe the screen issue'), text('เล่าอาการแบตเตอรี่', 'Describe the battery issue'), text('ปรึกษาอาการที่พบ', 'Tell us about the issue')][selected]}</strong><span>{text('ให้ทีมเช็กขอบเขตบริการก่อนรับงาน', 'Check the service scope before taking the job')}</span></div></div>
    </>}
    {mode === 'partner-marketing' && <>
      <div className="ps-directory-posts">{[0, 1, 2].map(i => <div key={i} style={{ backgroundImage: "url('/pkhub-v7/marketing/social.jpg')", backgroundPosition: `${i * 50}% 0%` }}><img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="PK HUB" style={i === 2 ? { filter: 'invert(1)' } : undefined} /></div>)}</div><div className="ps-feature-message"><strong>{text('เรื่องเล่าของร้าน ไปได้ไกลกว่าเดิม', 'Give your shop more to say')}</strong><span>{text('สื่อกลางและแคมเปญ ฟรี ไม่มีขั้นต่ำ', 'Free campaign media, no minimum purchase')}</span></div>
    </>}
    {id === 'ais-rom' ? <div className="ps-visual-controls" role="group" aria-label={text('ลองดูขั้นตอนเติมเงิน', 'Explore the top-up steps')}>{[text('เลือกยอด', 'Choose amount'), text('ตรวจสอบ', 'Check details'), text('ติดตามผล', 'Follow up')].map((label, i) => <button key={label} type="button" aria-pressed={topupStep === i} onClick={() => setTopupStep(i)}><span>0{i + 1}</span>{label}</button>)}</div>
      : labels.length > 0 && id !== 'finance' ? <div className="ps-visual-controls" role="group" aria-label={text('สำรวจตัวเลือกบริการ', 'Explore service options')}>{labels.map((label, i) => <button key={label} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{label}</button>)}</div> : null}
    <p className="ps-visual-caption">{text('ตัวอย่างสำหรับร้านพาร์ทเนอร์ · ยืนยันสินค้าและเงื่อนไขกับทีม', 'Illustration for retail partners · Confirm products and terms with the team')}</p>
    <span className="ps-current-selection v6-sr" aria-live="polite">{labels[visualStep]}</span>
  </m.div>
}
