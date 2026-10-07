import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Headphones, Package, Radio, Smartphone, Store, Wrench } from 'lucide-react'
import { PRODUCT_SERVICES, productPath } from '@/content/productServices'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { withReferral } from '@/utils/referralAttribution'
import '@/styles/product-navigation.css'

const GROUPS = [
  { id: 'sell', th: 'สินค้าและการสั่งซื้อ', en: 'Products & ordering', icon: Package },
  { id: 'customer', th: 'ต่อยอดโอกาสของร้าน', en: 'More opportunities', icon: Store },
  { id: 'care', th: 'ทีมและบริการหลังขาย', en: 'Care & support', icon: Headphones },
] as const
const ICONS = { 'handset-wholesale': Smartphone, 'stock-on-demand': Package, accessories: Package, 'ais-sim': Radio, 'ais-rom': Radio, finance: Store, 'partner-marketing': Store, 'after-sales': Headphones, repair: Wrench }

export default function ProductNavigation({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { isThai, language } = useLanguage()
  const referral = useReferralAttribution()
  const [open, setOpen] = useState(false)
  const region = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()
  const pinned = useRef(false)
  const clear = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = null }
  const show = () => { clear(); setOpen(true) }
  const close = () => { clear(); pinned.current=false; setOpen(false) }
  const leave = () => { if(pinned.current)return; clear(); closeTimer.current = setTimeout(() => { if (!(region.current?.contains(document.activeElement) && document.activeElement?.matches(':focus-visible'))) setOpen(false) }, 220) }
  const navigate = () => { close(); onNavigate?.() }
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])
  useEffect(() => {
    if (!open) return
    const outside = (e: PointerEvent) => { if (!region.current?.contains(e.target as Node)) { pinned.current=false; setOpen(false) } }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open])
  return <div ref={region} className={`pk-product-menu ${mobile ? 'is-mobile' : ''}`} onPointerEnter={e => { if (!mobile && e.pointerType === 'mouse') show() }} onPointerLeave={() => { if (!mobile) leave() }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) close() }} onKeyDown={e => { if (e.key === 'ArrowDown' && !mobile) { e.preventDefault(); show(); requestAnimationFrame(() => region.current?.querySelector<HTMLAnchorElement>('a')?.focus()) } if (e.key === 'Escape' && open) { e.preventDefault(); e.stopPropagation(); close(); trigger.current?.focus() } }}>
    <button ref={trigger} type="button" className="pk-product-trigger cursor-interaction" aria-expanded={open} aria-controls={id} onClick={() => { clear(); if(mobile)setOpen(v=>!v);else if(pinned.current)close();else{pinned.current=true;setOpen(true)} }}>{isThai ? 'สินค้าและบริการ' : 'Products & services'}<ChevronDown size={14} aria-hidden="true" className={open ? 'is-open' : ''} /></button>
    {open && <div id={id} className="pk-product-panel" onPointerEnter={clear} onPointerLeave={() => { if (!mobile) leave() }}>
      <div className="pk-product-panel-intro"><span>{isThai ? 'ทุกตัวช่วยให้ร้านคุณไปต่อ' : 'More support for your shop'}</span><a href={withReferral(`/${language}/products`, referral)} onClick={navigate}>{isThai ? 'ดูสินค้าและบริการทั้งหมด' : 'Explore all services'}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
      <div className="pk-product-groups">{GROUPS.map(group => <section key={group.id} className="pk-product-group" aria-label={isThai ? group.th : group.en}><h2>{isThai ? group.th : group.en}</h2>{PRODUCT_SERVICES.filter(p => p.group === group.id).map(service => { const Icon = ICONS[service.id]; return <a key={service.id} className="pk-product-link" href={withReferral(productPath(language, service.id), referral)} onClick={navigate}><Icon size={18} aria-hidden="true" /><span><strong>{isThai ? service.title : service.titleEn}</strong><small>{isThai ? service.description : service.descriptionEn}</small></span><ArrowUpRight size={13} aria-hidden="true" /></a> })}</section>)}</div>
    </div>}
  </div>
}
