import { useSceneMotion } from '@/hooks/useSceneMotion'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, CircleCheck, FileCheck2, Headphones, MessageCircle, Package, PackageCheck, Repeat2, Search, ShieldCheck, Store, Truck } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useRevealMotion } from '@/lib/motion'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'
import { CONTACT } from '@/pages/home/constants'
import AnimatedNumber from './AnimatedNumber'
import { ProductServiceLinks } from './ProductStoryMotion'

type Route = 'shop' | 'direct'
type Edge = { key: string; d: string }
const LOGO = '/pkhub-v7/brands/logo.png'

function useStockCopy() {
  const { isThai, language } = useLanguage()
  return { language, copy: (th: string, en: string) => isThai ? th : en }
}
function TalkLink({ th, en }: { th: string; en: string }) {
  const { copy } = useStockCopy()
  return <a className="v4-text-action cursor-interaction" href={CONTACT.LINE_URL} target="_blank" rel="noreferrer">{copy(th, en)}<ArrowUpRight size={16} aria-hidden="true" /></a>
}
function PartnerLink({ th, en }: { th: string; en: string }) {
  const { language, copy } = useStockCopy()
  const referral = useReferralAttribution()
  return <a className="v4-primary cursor-interaction" href={withReferral(`/${language}/join`, referral)}>{copy(th, en)}<ArrowUpRight size={16} aria-hidden="true" /></a>
}

export function StockHero() {
  const { copy } = useStockCopy()
  const scene = useSceneMotion()
  const { item, reduceMotion } = useRevealMotion()
  return <section className="sdf-hero" aria-labelledby="sd-title">
    <m.div className="sdf-hero-copy" variants={item} initial="hidden" animate="show">
      <p className="v4-eyebrow">STOCK ON DEMAND<span className="pstory-audience-inline">{copy('สำหรับร้านพาร์ทเนอร์', 'For retail partners')}</span></p>
      <h1 id="sd-title">{copy('ของไม่มีที่ร้าน', 'No stock on your shelf?')}<br /><span>{copy('ก็ไม่ต้องเสียลูกค้า', 'Keep the customer.')}</span></h1>
      <p className="sdf-lead">{copy('ขายได้เหมือนมีสต็อกร้านใหญ่', 'Offer the choice of a bigger retailer.')}<br />{copy('โดยไม่ต้องใช้เงินจมสต็อกเท่าร้านใหญ่', 'Without holding the same depth of stock.')}</p>
      <div className="sdf-actions"><PartnerLink th="สมัครเป็น PK Hub Partner" en="Become a PK Hub Partner" /><TalkLink th="เช็กรุ่นและราคาทาง LINE" en="Check models & prices on LINE" /></div>
      <a className="sdf-story-link cursor-interaction" href="#sd-journey">{copy('ดูเส้นทางจากลูกค้าถึงยอดขาย', 'Follow the request to a retained sale')}<ArrowDown size={16} aria-hidden="true" /></a>
    </m.div>
    <div ref={scene.ref} data-motion-phase={scene.phase} className={`sdf-hero-scene ${scene.running ? 'is-motion-visible' : ''}`} aria-label={copy('ภาพอธิบายสต็อก PK เป็นส่วนต่อของร้าน', 'Illustration of PK inventory extending your shop')}>
      <svg className="sdf-hero-wire" viewBox="0 0 580 420" fill="none" aria-hidden="true"><m.path d="M425 70 C500 170 320 135 290 218 S200 330 125 343" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 7" initial={false} animate={reduceMotion ? {} : { strokeDashoffset: [22, 0] }} transition={{ duration: 1.2 }} /></svg>
      <m.div className="sdf-hero-message" initial={{ y: 0 }} animate={reduceMotion ? {} : { y: [10, 0] }} transition={{ duration: 0.55 }}><span><MessageCircle size={14} aria-hidden="true" />{copy('ลูกค้าของร้านคุณ', 'Your customer')}</span><p>{copy('รุ่นนี้ สีนี้ มีไหมครับ?', 'Do you have this model in this colour?')}</p></m.div>
      <div className="sdf-stock-preview"><div className="sdf-preview-header"><img src={LOGO} width={135} height={45} alt="PK HUB" /><span>{copy('ส่วนต่อของสต็อกร้านคุณ', 'Your inventory extension')}</span></div><p className="sdf-preview-search"><Search size={15} aria-hidden="true" />{copy('เลือกรุ่น · สี · ความจุ', 'Model · Colour · Storage')}</p><div className="sdf-preview-product"><img src="/pkhub-v7/products/phoneFamily.webp" width={418} height={600} alt={copy('ตัวอย่างมือถือหลายสี', 'Illustrative phone colour range')} decoding="async" /><div><strong>{copy('มือถือและแท็บเล็ต', 'Phones & tablets')}</strong><span>{copy('เช็กรุ่นที่ลูกค้าต้องการกับ PK', 'Check the requested model with PK')}</span></div><ArrowUpRight size={16} aria-hidden="true" /></div><div className="sdf-preview-footer"><Package size={16} aria-hidden="true" />{copy('ซื้อในราคาส่งของบัญชีร้านคุณ', 'Buy at your account’s wholesale price')}</div></div>
      <m.p className="sdf-hero-reply" initial={{ y: 0 }} animate={reduceMotion ? {} : { y: [8, 0] }} transition={{ duration: 0.5, delay: 0.25 }}>{copy('ขอเช็กกับ PK ให้ก่อนนะครับ', 'Let me check with PK for you.')}<Check size={15} aria-hidden="true" /></m.p>
      <small className="sdf-illustration-note">{copy('ภาพอธิบายบริการ · ยืนยันสินค้าและเงื่อนไขก่อนสั่ง', 'Service illustration · Confirm availability and terms before ordering')}</small>
    </div>
  </section>
}

// Both examples are owner-provided illustrative quantities, not live stock or actual orders.
// All stages render together; selecting delivery only highlights a route and moves a parcel.
export function StockConnectedJourney() {
  const { copy, language } = useStockCopy()
  const { reduceMotion } = useRevealMotion()
  const mapRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef(new Map<string, SVGPathElement>())
  const parcelRef = useRef<SVGCircleElement>(null)
  const [geometry, setGeometry] = useState<{ width: number; height: number; edges: Edge[] }>({ width: 960, height: 820, edges: [] })
  const [selected, setSelected] = useState<Route | null>(null)
  const [hovered, setHovered] = useState<Route | null>(null)
  const [flight, setFlight] = useState(0)
  const [visible, setVisible] = useState(false)
  const [motionStage, setMotionStage] = useState(-1)
  const [documentVisible, setDocumentVisible] = useState(true)
  useEffect(() => { const update = () => setDocumentVisible(!document.hidden); update(); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update) }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    let disposed = false
    const draw = () => {
      if (disposed) return
      const bounds = map.getBoundingClientRect()
      const node = (name: string) => {
        const rect = map.querySelector<HTMLElement>(`[data-node="${name}"]`)!.getBoundingClientRect()
        return { left: rect.left - bounds.left, right: rect.right - bounds.left, top: rect.top - bounds.top, bottom: rect.bottom - bounds.top, x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 }
      }
      const d = node('demand'), s = node('store'), h = node('hub'), a = node('shop'), b = node('direct'), r = node('result')
      const edges: Edge[] = []
      const add = (key: string, path: string) => edges.push({ key, d: path })
      if (map.clientWidth < 600) {
        const rail = 9, branch = h.bottom + 21, end = b.bottom + 24
        add('demand', `M ${d.x} ${d.bottom + 5} C ${d.x} ${d.bottom + 21},${s.x} ${s.top - 21},${s.x} ${s.top - 5}`)
        add('stock', `M ${s.x} ${s.bottom + 5} C ${s.x} ${s.bottom + 21},${h.x} ${h.top - 21},${h.x} ${h.top - 5}`)
        add('dispatch', `M ${h.x} ${h.bottom + 5} V ${branch} Q ${h.x} ${branch + 8},${h.x - 8} ${branch + 8} H ${rail + 8} Q ${rail} ${branch + 8},${rail} ${branch + 16} V ${a.top + 25}`)
        add('shop', `M ${rail} ${a.top + 25} H ${a.left - 7}`)
        add('direct', `M ${rail} ${a.top + 25} V ${b.top + 25} H ${b.left - 7}`)
        add('shop-end', `M ${a.left - 7} ${a.bottom - 8} H ${rail} V ${end - 8} Q ${rail} ${end},${rail + 8} ${end} H ${r.x - 8} Q ${r.x} ${end},${r.x} ${end + 8} V ${r.top - 4}`)
        add('direct-end', `M ${rail} ${b.top + 25} V ${end - 8} Q ${rail} ${end},${rail + 8} ${end} H ${r.x - 8} Q ${r.x} ${end},${r.x} ${end + 8} V ${r.top - 4}`)
      } else {
        const mid = (d.bottom + s.top) / 2, split = a.top - 15, merge = r.top - 24, fork = (a.x + b.x) / 2
        add('demand', `M ${d.x} ${d.bottom + 5} V ${mid - 8} Q ${d.x} ${mid},${d.x - 8} ${mid} H ${s.x + 8} Q ${s.x} ${mid},${s.x} ${mid + 8} V ${s.top - 5}`)
        add('stock', `M ${s.right + 6} ${s.y} C ${s.right + 25} ${s.y},${h.left - 25} ${h.y},${h.left - 6} ${h.y}`)
        add('dispatch', `M ${h.x} ${h.bottom + 5} V ${split - 22} Q ${h.x} ${split - 14},${h.x - 8} ${split - 14} H ${fork + 8} Q ${fork} ${split - 14},${fork} ${split - 6} V ${split}`)
        add('shop', `M ${fork} ${split} H ${a.x + 9} Q ${a.x} ${split},${a.x} ${split + 9} V ${a.top - 3}`)
        add('direct', `M ${fork} ${split} H ${b.x - 9} Q ${b.x} ${split},${b.x} ${split + 9} V ${b.top - 3}`)
        add('shop-end', `M ${a.x} ${a.bottom + 5} V ${merge - 9} Q ${a.x} ${merge},${a.x + 9} ${merge} H ${r.x - 9} Q ${r.x} ${merge},${r.x} ${merge + 9} V ${r.top - 4}`)
        add('direct-end', `M ${b.x} ${b.bottom + 5} V ${merge - 9} Q ${b.x} ${merge},${b.x - 9} ${merge} H ${r.x + 9} Q ${r.x} ${merge},${r.x} ${merge + 9} V ${r.top - 4}`)
      }
      setGeometry({ width: map.clientWidth, height: map.clientHeight, edges })
    }
    const resize = new ResizeObserver(draw)
    const intersection = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    resize.observe(map); intersection.observe(map); draw()
    document.fonts?.ready.then(draw)
    return () => { disposed = true; resize.disconnect(); intersection.disconnect() }
  }, [language])

  useEffect(() => {
    const dot = parcelRef.current
    if (!dot || reduceMotion || !visible || !documentVisible) { setMotionStage(-1); return }
    const manual = flight > 0
    const route = selected || 'shop'
    const keys = manual ? ['dispatch', route, `${route}-end`] : ['demand', 'stock', 'dispatch', route, `${route}-end`]
    const segments = keys.map(key => pathRefs.current.get(key)).filter((p): p is SVGPathElement => Boolean(p))
    if (segments.length !== keys.length) return
    const start = performance.now(), travel = manual ? 2300 : 5800
    let raf = 0, lastStage = -1
    const tick = (now: number) => {
      const elapsed = now - start, cycle = manual ? 0 : Math.floor(elapsed / 8200), within = manual ? elapsed : elapsed % 8200
      if ((manual && elapsed > travel + 700) || (!manual && cycle >= 2)) { dot.setAttribute('opacity', '0'); setMotionStage(-1); return }
      const progress = Math.min(1, within / travel), index = Math.min(segments.length - 1, Math.floor(progress * segments.length))
      const segmentProgress = progress === 1 ? 1 : progress * segments.length - index
      const point = segments[index].getPointAtLength(segmentProgress * segments[index].getTotalLength())
      dot.setAttribute('cx', String(point.x)); dot.setAttribute('cy', String(point.y)); dot.setAttribute('opacity', within < travel ? '1' : '0')
      const stage = progress === 1 ? 4 : manual ? (index < 2 ? 3 : 4) : index
      if (stage !== lastStage) { lastStage = stage; setMotionStage(stage) }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); dot.setAttribute('opacity', '0') }
  }, [selected, flight, geometry, reduceMotion, visible, documentVisible])

  const choose = (route: Route) => { setSelected(route); setFlight(n => n + 1) }
  const active = hovered || selected || (motionStage >= 3 ? 'shop' : null)
  return <section className="sdf-journey" id="sd-journey" aria-labelledby="sdf-journey-title">
    <div className="sdf-section-heading"><p className="v4-eyebrow">ONE JOURNEY. EVERY KIND OF ORDER.</p><h2 id="sdf-journey-title">{copy('จากออเดอร์ที่อาจหลุด', 'From a possible missed order.')}<br /><span>{copy('กลับมาเป็นยอดขายของร้าน', 'To another sale for your shop.')}</span></h2><p>{copy('ลูกค้าหน้าร้านหรือออเดอร์ธุรกิจ ใช้เส้นทางเดียวกันได้', 'Walk-in demand and business orders share the same route.')}</p></div>
    <div className="sdf-map" ref={mapRef} data-motion-stage={motionStage}>
      <svg className="sdf-connections" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true"><defs><marker id="sdf-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L6 4L1 7" fill="none" stroke="#a4b3c9" strokeWidth="1.2" /></marker><marker id="sdf-arrow-blue" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L6 4L1 7" fill="none" stroke="#3155c6" strokeWidth="1.3" /></marker></defs>{geometry.edges.map((edge, i) => { const primary = ['demand', 'stock', 'dispatch'].includes(edge.key) || Boolean(active && edge.key.startsWith(active)); return <m.path key={edge.key} ref={node => { if (node) pathRefs.current.set(edge.key, node); else pathRefs.current.delete(edge.key) }} data-edge={edge.key} d={edge.d} className={primary ? 'is-active' : ''} markerEnd={primary ? 'url(#sdf-arrow-blue)' : 'url(#sdf-arrow)'} initial={false} whileInView={reduceMotion ? {} : { strokeDashoffset: [20, 0] }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i < 3 ? i * 0.15 : 0 }} /> })}<circle ref={parcelRef} className="sdf-parcel" r={4} fill="currentColor" opacity="0" /></svg>
      <div className="sdf-demand sdf-node" data-node="demand"><p className="sdf-start-here">{copy('เริ่มที่นี่', 'Start here')}<ArrowDown size={14} aria-hidden="true" /></p><div className="sdf-stage"><span>01</span><h3>{copy('ลูกค้ามาก่อน สต็อกค่อยตามมา', 'Demand arrives before the stock')}</h3></div><div className="sdf-messages"><div><p className="sdf-source"><MessageCircle size={15} aria-hidden="true" />{copy('ลูกค้าร้านคุณ · หน้าร้าน/ออนไลน์', 'Your shop’s retail / online customer')}</p><m.p className="sdf-bubble" initial={false} whileInView={reduceMotion ? {} : { y: [7, 0] }} viewport={{ once: true }} transition={{ duration: 0.45 }}>{copy('“รุ่นนี้สีดำ ขอ 1 เครื่องครับ”', '“One of this model in black, please.”')}</m.p></div><div><p className="sdf-source"><Building2 size={15} aria-hidden="true" />{copy('ลูกค้าธุรกิจของร้านคุณ', 'Your shop’s business customer')}</p><m.p className="sdf-bubble is-business" initial={false} whileInView={reduceMotion ? {} : { y: [7, 0] }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.12 }}>{copy('“รุ่นนี้มี 20 เครื่องไหมครับ?”', '“Can you supply 20 of this model?”')}</m.p></div></div></div>
      <div className="sdf-inventory-row">
        <div className="sdf-store sdf-node" data-node="store"><div className="sdf-stage"><span>02</span><h3>{copy('ของที่ร้านยังไม่พอ', 'Your shelf comes up short')}</h3></div><div className="sdf-stock-surface"><p className="sdf-object-name"><Store size={17} aria-hidden="true" />{copy('สต็อกหน้าร้าน', 'Your store stock')}</p><div className="sdf-stock-line"><span>{copy('ลูกค้าต้องการ 1', 'Customer needs 1')}</span><strong>{copy('มี 0', 'Have 0')} <small>{copy('เครื่อง', 'units')}</small></strong></div><div className="sdf-stock-line"><span>{copy('ธุรกิจต้องการ 20', 'Business needs 20')}</span><strong>{copy('มี 5', 'Have 5')} <small>{copy('เครื่อง', 'units')}</small></strong></div><p className="sdf-shortage">{copy('ขาด 1 หรือ 15 เครื่อง', 'Short by 1 or 15 units')}<span>{copy('ออเดอร์อาจหลุด', 'The order could go elsewhere')}</span></p></div></div>
        <div className="sdf-hub sdf-node" data-node="hub"><div className="sdf-stage is-blue"><span>03</span><h3>{copy('เติมส่วนที่ขาดจาก PK', 'Fill the gap with PK')}</h3></div><div className="sdf-po-surface"><div className="sdf-po-brand"><img src={LOGO} width={135} height={45} alt="PK HUB" loading="lazy" decoding="async" /><span>{copy('สั่งซื้อผ่าน Dealer Portal', 'Order through Dealer Portal')}</span></div><div className="sdf-stock-line"><span>{copy('ออเดอร์หน้าร้าน', 'Retail order')}</span><strong>+1 <small>{copy('เครื่อง', 'unit')}</small></strong></div><div className="sdf-stock-line"><span>{copy('ลูกค้าธุรกิจของร้านคุณ', 'Your shop’s business customer')}</span><strong>+15 <small>{copy('เครื่อง', 'units')}</small></strong></div><p className="sdf-po-caption">{copy('เช็กรุ่น → เลือกจำนวน → เปิด PO → ชำระราคาส่ง', 'Find model → Choose quantity → Submit PO → Pay wholesale')}</p></div></div>
      </div>
      <div className="sdf-fork-heading"><span>04</span><h3>{copy('เลือกส่งได้สองเส้นทาง', 'Choose either delivery route')}</h3></div>
      <p className="sdf-route-hint">{copy('ลองเลือกเส้นทางส่ง เพื่อดูออเดอร์เดินต่อ', 'Choose a delivery route to see the order continue')}</p><div className="sdf-route-row">{(['shop', 'direct'] as const).map(route => <div className="sdf-route sdf-node" key={route} data-node={route}><button type="button" className="sdf-route-action cursor-interaction" aria-pressed={selected === route} onClick={() => choose(route)} onMouseEnter={() => setHovered(route)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(route)} onBlur={() => setHovered(null)}>{route === 'shop' ? <Store size={21} aria-hidden="true" /> : <Truck size={21} aria-hidden="true" />}<span>{route === 'shop' ? copy('ส่งมาที่ร้าน', 'Send to your shop') : copy('ส่งตรงถึงลูกค้า', 'Send to your customer')}</span><ArrowDownRight size={17} aria-hidden="true" /></button><p className="sdf-route-flow">{route === 'shop' ? copy('PK → ร้านคุณ → ลูกค้ารับสินค้า', 'PK → Your shop → Customer collection') : copy('PK → ปลายทางของร้านคุณ', 'PK → Your customer’s destination')}</p><p className="sdf-route-value">{route === 'shop' ? copy('ได้อีกหนึ่งโอกาสดูแลลูกค้าที่ร้าน', 'Another visit to serve your customer') : copy('ร้านไม่ต้องรับ แพ็ก แล้วส่งต่อเอง', 'No receiving, repacking and reshipping')}</p><p className="sdf-route-rule">{route === 'shop' ? <>{copy('ราคาส่ง + ค่าจัดส่ง', 'Wholesale + shipping')}<br /><strong>{copy('ไม่มีค่าบริการ Stock on Demand เพิ่ม', 'No extra Stock on Demand service fee')}</strong></> : <>{copy('ราคาส่ง + ค่าบริการ Direct Fulfillment', 'Wholesale + Direct Fulfillment fee')}<br />{copy('+ ค่าจัดส่งจริง', '+ actual shipping')}<small>{copy('ยืนยันค่าบริการกับทีมก่อนใช้บริการ', 'Confirm the service fee with the team first')}</small></>}</p></div>)}</div>
      <div className="sdf-result sdf-node" data-node="result"><p className="sdf-completed"><span>05</span><CircleCheck size={18} aria-hidden="true" />{copy('จากของไม่พอ → มีทางปิดออเดอร์', 'From a shortage → A route to the sale')}</p><h3>{copy('ยอดขายยังเป็นของร้านคุณ', 'The sale stays with your shop')}</h3><p>{copy('ลูกค้าของคุณ ยังคงเป็นลูกค้าของคุณ', 'Your customer remains your customer.')}</p><div className="sdf-retained"><span>{copy('หน้าร้าน', 'Retail')} <strong>{copy('1 เครื่อง', '1 unit')}</strong></span><span>{copy('ธุรกิจ', 'Business')} <strong>{copy('5 + 15 = 20 เครื่อง', '5 + 15 = 20 units')}</strong></span></div></div>
    </div>
    <p className="sdf-demo-note">{copy('ตัวอย่างเส้นทางบริการและจำนวนสั่งซื้อ · ไม่ใช่สต็อกหรือออเดอร์จริง · ยืนยันสินค้า ราคา และรอบส่งก่อนรับปากลูกค้า', 'Illustrative quantities and service journey, not live stock or actual orders. Confirm availability, pricing and dispatch before committing.')}</p>
    <p className="sdf-sr" role="status">{selected === 'shop' ? copy('ส่งมาที่ร้าน: ราคาส่งและค่าจัดส่ง ไม่มีค่าบริการ Stock on Demand เพิ่ม', 'To your shop: wholesale and shipping, with no extra Stock on Demand service fee.') : selected === 'direct' ? copy('ส่งตรงถึงลูกค้า: ราคาส่ง ค่าบริการ Direct Fulfillment และค่าจัดส่งจริง', 'To the customer: wholesale, Direct Fulfillment fee and actual shipping.') : ''}</p>
    <div className="sdf-section-actions"><PartnerLink th="รับออเดอร์ได้มากขึ้นกับ PK" en="Open up more order opportunities" /><TalkLink th="ลองเช็กรุ่นที่ลูกค้าถามหา" en="Check a customer’s requested model" /></div>
  </section>
}

export function StockCapitalStory() {
  const { copy } = useStockCopy()
  const { item, reduceMotion } = useRevealMotion()
  const [connected, setConnected] = useState(true)
  const motion = useSceneMotion()
  return <section className="sdf-split sdf-capital" id="sd-inventory" aria-labelledby="sdf-capital-title">
    <m.div className="sdf-copy" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}><p className="v4-eyebrow">WHAT IF YOUR SHELF ISN’T ENOUGH?</p><h2 id="sdf-capital-title">{copy('ถ้าลูกค้าถามหา', 'What if a customer asks for')}<br /><span>{copy('รุ่นที่ร้านไม่ได้ถือไว้?', 'a model you don’t hold?')}</span></h2><p>{copy('ขายได้แค่รุ่นที่อยู่บนชั้น หรือมีอีกทางเลือกให้ลูกค้า? รุ่น สี และความจุทำให้ตัวเลือกเพิ่มขึ้นเร็ว แต่ร้านไม่จำเป็นต้องซื้อครบทุกแบบมาวางไว้ก่อน', 'Does the conversation end at your shelf, or can you offer another option? Models, colours and storage multiply quickly. Your shop does not need to buy every combination first.')}</p><p className="sdf-value-line">{copy('เลือกถือรุ่นที่ขายคล่อง', 'Hold what sells locally.')}<br /><em>{copy('เช็กส่วนที่ขาดจาก PK ตามดีมานด์', 'Check PK for the missing choice.')}</em></p><TalkLink th="ลองเช็กรุ่นที่ลูกค้าถามหา" en="Check a customer’s requested model" /></m.div>
    <div ref={motion.ref} className={`sdf-capital-visual ${motion.running ? 'is-motion-visible' : ''}`} data-motion-phase={motion.phase}>
      <div className="sdf-capital-math"><AnimatedNumber from={0} to={60} triggerKey={String(connected)} dataNumber="stockPositions" /><div><strong>{copy('ตัวเลือก', 'combinations')}</strong><span>{copy('ตัวอย่าง:', 'Example:')} <span className="sdf-math-term">{copy('10 รุ่น', '10 models')}</span> × <span className="sdf-math-term">{copy('3 สี', '3 colours')}</span> × <span className="sdf-math-term">{copy('2 ความจุ', '2 storage sizes')}</span></span></div></div><span className="sdf-sr">{copy('ตัวอย่าง 60 ตัวเลือก ไม่ใช่จำนวนสต็อกปัจจุบัน', 'Illustration: 60 combinations, not current stock.')}</span>
      <div className="sdf-capital-controls" role="group" aria-label={copy('ลองคิดจากสถานการณ์ลูกค้า', 'Explore a customer-request scenario')}><button type="button" aria-pressed={!connected} onClick={() => {setConnected(false);motion.replay()}}>{copy('ขายเฉพาะที่ร้านมี', 'Sell what you hold')}</button><button type="button" aria-pressed={connected} onClick={() => {setConnected(true);motion.replay()}}>{copy('เช็กส่วนที่ขาดจาก PK', 'Check the gap with PK')}</button></div>
      <div className={`sdf-choice-story ${connected ? 'is-connected' : ''}`}>
        <div className="sdf-choice-request"><MessageCircle size={15} aria-hidden="true" /><span>{copy('“รุ่นนี้ สีนี้ มีไหมครับ?”', '“Do you have this model in this colour?”')}</span></div>
        <div className="sdf-choice-network"><div className="sdf-choice-store"><Store size={26} aria-hidden="true" /><strong>{copy('ร้านของคุณ', 'Your shop')}</strong><span>{copy('เลือกถือรุ่นที่เหมาะกับร้าน', 'Hold the range that suits you')}</span></div><div className="sdf-choice-wire" aria-hidden="true"><i key={String(connected)} /></div><m.div className="sdf-choice-pk" animate={{ opacity: connected ? 1 : 0.45, y: connected ? 0 : 5 }} transition={{ duration: reduceMotion ? 0 : 0.4 }}><img src={LOGO} width={135} height={45} alt="PK HUB" loading="lazy" /><strong>{copy('ตัวเลือกจาก PK', 'More choice with PK')}</strong><span>{copy('เช็กรุ่น · สี · ความจุ', 'Check model · Colour · Storage')}</span></m.div></div>
        <m.p key={String(connected)} className={`sdf-choice-reply ${connected ? 'is-blue' : ''}`} initial={false} animate={reduceMotion ? {} : { y: [7,0] }} transition={{duration:0.4}}>{connected ? copy('ขอเช็กส่วนที่ขาดกับ PK ให้ก่อนนะครับ', 'Let me check the missing option with PK.') : copy('ตอนนี้ร้านยังไม่ได้ถือรุ่นนี้ครับ', 'We don’t hold that model locally at the moment.')}</m.p>
      </div><div className="sdf-capital-caption" aria-live="polite"><strong>{connected ? copy('เพิ่มตัวเลือกขาย โดยไม่ต้องถือครบทุกแบบ', 'Offer more choice without holding every option.') : copy('ตัวเลือกของลูกค้า จำกัดอยู่ที่สต็อกหน้าร้าน', 'Customer choice is limited to your local shelf.')}</strong><p>{connected ? copy('เช็กสินค้าและเงื่อนไขก่อนรับปาก แล้วค่อยสั่งตามออเดอร์', 'Confirm stock and terms, then order against actual demand.') : copy('ถ้าลูกค้าต้องการรุ่นอื่น ร้านยังมีคำตอบอีกแบบให้ลองเลือก', 'If a customer wants another model, explore a different response above.')}</p></div><small>{copy('สถานการณ์ตัวอย่าง · ไม่ใช่สต็อกสดหรือยอดเงินที่ประหยัดได้', 'Illustrative scenario, not live stock or calculated capital savings.')}</small>
    </div>
  </section>
}

export function StockFulfillmentStory() {
  const { copy } = useStockCopy()
  return <section className="sdf-fulfillment" id="sd-fulfillment" aria-labelledby="sdf-fulfillment-title"><div className="sdf-section-heading"><p className="v4-eyebrow">YOUR SHOP. YOUR CUSTOMER.</p><h2 id="sdf-fulfillment-title">{copy('เลือกเส้นทางส่ง', 'Choose the delivery route.')}<br /><span>{copy('รู้ค่าใช้จ่ายก่อนยืนยัน', 'Know the costs before confirming.')}</span></h2></div><div className="sdf-delivery-columns">{(['shop', 'direct'] as const).map(route => <article key={route}><div className="sdf-delivery-diagram" aria-hidden="true"><img src={LOGO} width={135} height={45} alt="" loading="lazy" decoding="async" /><span className="sdf-delivery-line" /><span>{route === 'shop' ? <Store size={31} /> : <Truck size={31} />}</span><span className="sdf-delivery-line" /><PackageCheck size={28} /></div><h3>{route === 'shop' ? copy('ส่งมาที่ร้าน', 'Send to your shop') : copy('ส่งตรงถึงลูกค้า', 'Send directly to your customer')}</h3><p>{route === 'shop' ? copy('ลูกค้ากลับมารับกับร้าน พร้อมโอกาสดูแลเรื่องอุปกรณ์เสริม ซิม และบริการอื่นที่เหมาะกับเขา', 'Your customer collects from you, with another chance to help with accessories, SIMs and relevant services.') : copy('PK ช่วยจัดส่งไปยังปลายทางที่ตกลง ร้านไม่ต้องรับสินค้าแล้วแพ็กส่งต่อเอง', 'PK sends to the agreed destination, so your shop does not have to receive, repack and reship.')}</p><div className="sdf-cost"><strong>{route === 'shop' ? copy('ราคาส่ง + ค่าจัดส่ง', 'Wholesale + shipping') : copy('ราคาส่ง + ค่าบริการ + ค่าจัดส่งจริง', 'Wholesale + service fee + actual shipping')}</strong><span>{route === 'shop' ? <em>{copy('ไม่มีค่าบริการ Stock on Demand เพิ่ม', 'No extra Stock on Demand service fee')}</em> : copy('Direct Fulfillment / Management Fee ยืนยันกับทีมก่อนใช้บริการ', 'Confirm the Direct Fulfillment / Management Fee with the team before using the service.')}</span></div><TalkLink th={route === 'shop' ? 'คุยเรื่องส่งเข้าร้าน' : 'คุยเรื่อง Direct Fulfillment'} en={route === 'shop' ? 'Discuss delivery to your shop' : 'Discuss Direct Fulfillment'} /></article>)}</div><div className="sdf-commercial-note"><ShieldCheck size={19} aria-hidden="true" /><p>{copy('PK ไม่แบ่งเปอร์เซ็นต์กำไรขายปลีกของร้าน และไม่ต้องใช้ราคาขายปลีกของคุณเพื่อคำนวณค่าบริการ', 'PK does not take a percentage of your retail margin or require your retail selling price to calculate its service fee.')}</p></div><div className="sdf-faq"><details><summary>{copy('ก่อนรับปากลูกค้า ต้องยืนยันอะไร?', 'What should I confirm before committing?')}<ChevronDown size={18} aria-hidden="true" /></summary><p>{copy('รุ่น สี ความจุ สต็อกปัจจุบัน ราคาส่งของบัญชีร้าน การชำระเงิน ผู้รับ เอกสาร และรอบส่ง รวมถึงค่าบริการและค่าจัดส่งของเส้นทางที่เลือก ภาพบนหน้านี้เป็นคำอธิบายบริการ ไม่ใช่การยืนยันสินค้าพร้อมขาย', 'Confirm model, colour, storage, current stock, your account’s wholesale price, payment, recipient, documents and dispatch, plus the costs of your chosen delivery route. Page illustrations do not confirm current availability.')}</p></details><details><summary>{copy('ออเดอร์ธุรกิจใช้เงื่อนไขอะไร?', 'How are business orders handled?')}<ChevronDown size={18} aria-hidden="true" /></summary><p>{copy('เป็นการซื้อค้าส่งตามปกติ ตัวอย่างลูกค้าต้องการ 20 เครื่อง ร้านถือ 5 เครื่อง จึงซื้อส่วนที่ขาด 15 เครื่องจาก PK หากเลือกส่งตรงจะมีค่าบริการ Direct Fulfillment และค่าจัดส่งตามที่ยืนยัน ไม่ใช่การแบ่งกำไรขายปลีก', 'Business demand uses normal wholesale terms. In our example, the shop has 5 of the requested 20 and buys the remaining 15 from PK. Direct delivery adds the confirmed fulfillment fee and shipping, not a share of the shop’s retail margin.')}</p></details></div></section>
}

export function StockDemandStory() {
  const { copy } = useStockCopy()
  const { item, reduceMotion } = useRevealMotion()
  const [repeated, setRepeated] = useState(false)
  return <section className="sdf-split sdf-test" id="sd-test-demand" aria-labelledby="sdf-test-title"><m.div className="sdf-copy" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}><p className="v4-eyebrow">DEMAND FIRST. STOCK SECOND.</p><h2 id="sdf-test-title">{copy('ลองขายก่อน', 'Sell first.')}<br /><span>{copy('ค่อยตัดสินใจสต็อก', 'Then decide what to stock.')}</span></h2><p>{copy('ยังไม่แน่ใจว่ารุ่นหรือสีนี้ขายในพื้นที่ได้ไหม? เริ่มจากออเดอร์ที่ลูกค้าต้องการ ใช้ Stock on Demand แล้วดูยอดขายจริงก่อนเลือกซื้อเข้าร้าน', 'Unsure whether a model or colour will sell locally? Start with customer demand, order through Stock on Demand and observe actual sales before deciding what to hold.')}</p><TalkLink th="ปรึกษาการเริ่มใช้บริการ" en="Discuss getting started" /></m.div><div className="sdf-demand-visual"><div className="sdf-demand-records"><div><MessageCircle size={19} aria-hidden="true" /><span>{copy('ลูกค้าถามหารุ่นนี้', 'A customer asks for the model')}</span></div><div><FileCheck2 size={19} aria-hidden="true" /><span>{copy('สั่งจาก PK ตามดีมานด์', 'Order from PK against demand')}</span></div><div><Search size={19} aria-hidden="true" /><span>{copy('ดูสิ่งที่ขายได้จริง', 'Observe what actually sells')}</span></div></div><div className="sdf-demand-bridge" aria-hidden="true"><m.i animate={{ scaleX: repeated ? 1 : 0.4 }} transition={{ duration: reduceMotion ? 0 : 0.7 }} /><ArrowRight size={18} /></div><m.div className={`sdf-stock-decision ${repeated ? 'is-ready' : ''}`} animate={{ y: repeated ? -4 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}><Repeat2 size={27} aria-hidden="true" /><h3>{repeated ? copy('มีดีมานด์ซ้ำ เลือกเข้าสต็อก', 'Repeat demand? Choose local stock.') : copy('ยังไม่แน่ใจ ก็ยังไม่ต้องถือ', 'Not sure yet? Keep the choice open.')}</h3><p>{repeated ? copy('ร้านใช้ยอดขายจริงประกอบการตัดสินใจ', 'Your shop decides using actual sales.') : copy('ขายตามออเดอร์ แล้วเรียนรู้ความต้องการ', 'Serve the order, then learn from demand.')}</p></m.div><button type="button" className="sdf-demand-action cursor-interaction" aria-pressed={repeated} onClick={() => setRepeated(v => !v)}>{repeated ? copy('กลับไปดูจังหวะเริ่มต้น', 'Return to the first request') : copy('ลองดูเมื่อมีลูกค้าถามซ้ำ', 'Explore when demand repeats')}<ArrowRight size={16} aria-hidden="true" /></button><span className="sdf-sr" role="status">{repeated ? copy('มีดีมานด์ซ้ำ ร้านอาจเลือกถือรุ่นนี้เอง', 'Repeat demand may guide the shop’s stocking decision.') : copy('เริ่มจากความต้องการของลูกค้า', 'Start with customer demand.')}</span></div></section>
}

export function StockProofStory() {
  const { copy } = useStockCopy()
  const { item, reduceMotion } = useRevealMotion()
  const [proof, setProof] = useState<'range' | 'packing'>('range')
  const photo = proof === 'range' ? { src: '/reviews/iphone-lot.webp', width: 1100, height: 600, alt: copy('กล่อง iPhone จากงานค้าส่งจริงของ PK HUB', 'iPhone boxes from actual PK HUB wholesale work') } : { src: '/reviews/bubble-pack.webp', width: 900, height: 1200, alt: copy('วัสดุกันกระแทกจากงานแพ็กจริงของ PK HUB', 'Protective packing from actual PK HUB work') }
  return <section className="sdf-split sdf-proof" aria-labelledby="sdf-proof-title"><div className="sdf-proof-media"><AnimatePresence mode="wait" initial={false}><m.figure key={proof} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}><img src={photo.src} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={photo.alt} /><figcaption>{copy('จากงานจริงของ PK HUB', 'Actual PK HUB operations')}</figcaption></m.figure></AnimatePresence><div className="sdf-proof-controls" role="group" aria-label={copy('ดูงานจริงของ PK', 'See real PK work')}><button type="button" aria-pressed={proof === 'range'} onClick={() => setProof('range')}>{copy('งานค้าส่ง', 'Wholesale')}</button><button type="button" aria-pressed={proof === 'packing'} onClick={() => setProof('packing')}>{copy('การแพ็กสินค้า', 'Protective packing')}</button></div></div><m.div className="sdf-copy" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}><p className="v4-eyebrow">REAL SUPPLY. REAL PEOPLE.</p><h2 id="sdf-proof-title">{copy('มี PK อยู่หลังร้าน', 'PK behind your shop.')}<br /><span>{copy('มีทีมช่วยให้ออเดอร์เดินต่อ', 'People to move the order forward.')}</span></h2><p>{copy('เครื่องศูนย์ไทย งานค้าส่งจริง และทีมที่คุยเรื่องสินค้า จัดส่ง และประสานงานหลังขายได้ ให้ร้านคุณดูแลลูกค้าต่อได้อย่างชัดเจน', 'Official Thai-market devices, real wholesale operations and a team to discuss supply, dispatch and after-sales coordination, while you keep the customer relationship.')}</p><ul className="sdf-proof-points"><li><ShieldCheck size={17} aria-hidden="true" />{copy('เครื่องศูนย์ไทย ตรวจเงื่อนไขสินค้าก่อนสั่ง', 'Thai-market devices; confirm device terms before ordering')}</li><li><Truck size={17} aria-hidden="true" />{copy('ประสานงานจัดส่งทั่วประเทศตามรอบที่ยืนยัน', 'Nationwide dispatch under confirmed arrangements')}</li><li><Headphones size={17} aria-hidden="true" />{copy('ทีมช่วยเช็กสินค้าและประสานงานหลังขาย', 'People to check supply and coordinate after-sales')}</li></ul><TalkLink th="เริ่มคุยเรื่องออเดอร์ของร้าน" en="Discuss your shop’s order" /><small>{copy('ภาพจากงานที่ผ่านมา · สต็อกปัจจุบันให้ทีมยืนยันก่อนสั่งซื้อ', 'Photos show previous work. Confirm current stock before ordering.')}</small></m.div></section>
}

export function StockRelatedStory() {
  const { copy, language } = useStockCopy()
  return <section className="sdf-related" aria-labelledby="sdf-related-title"><p className="v4-eyebrow">KEEP BUILDING YOUR STORE</p><h2 id="sdf-related-title">{copy('มีสินค้าให้ขาย', 'More to sell.')} <span>{copy('มีตัวช่วยให้ไปต่อ', 'More support to grow.')}</span></h2><ProductServiceLinks ids={['handset-wholesale','accessories','ais-sim','ais-rom','after-sales','partner-marketing']} /><a className="v4-text-action cursor-interaction" href={`/${language}/products`}>{copy('สำรวจสินค้าและบริการทั้งหมด', 'Explore all products & services')}<ArrowUpRight size={16} aria-hidden="true" /></a></section>
}
