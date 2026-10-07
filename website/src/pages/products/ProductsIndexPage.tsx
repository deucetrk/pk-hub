import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowUpRight, Boxes, CreditCard, Headset, Megaphone, Package, Radio, Repeat, Smartphone, Wrench } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProductVisual from '@/components/pkhub-v7/ProductVisual'
import { PRODUCT_SERVICES, productPath, type ProductId } from '@/content/productServices'
import { useLanguage } from '@/i18n/LanguageContext'
import { useRevealMotion } from '@/lib/motion'
import { getProductsIndexMeta, usePageMeta } from '@/lib/seo'
import Footer from '@/pages/home/Footer'
import PartnerStartSection from '@/pages/home/PartnerStartSection'
import '@/styles/product-services.css'

const ICONS = { 'handset-wholesale': Smartphone, 'stock-on-demand': Boxes, accessories: Package, 'ais-sim': Radio, 'ais-rom': Repeat, finance: CreditCard, 'partner-marketing': Megaphone, 'after-sales': Headset, repair: Wrench }

export default function ProductsIndexPage() {
  const { isThai, language } = useLanguage()
  const { item } = useRevealMotion()
  usePageMeta(getProductsIndexMeta(language))
  const [active, setActive] = useState<ProductId>('handset-wholesale')
  const service = PRODUCT_SERVICES.find(p => p.id === active)!
  return <div id="pk-home-v7" className="is-service-product is-products-index bg-white">
    <a href="#main-content" className="pk-skip-link">{isThai ? 'ข้ามไปเนื้อหา' : 'Skip to content'}</a>
    <div id="top" className="v4-page"><Navbar /><main id="main-content" tabIndex={-1}>
      <m.section className="ps-index-intro" variants={item} initial="hidden" animate="show" aria-labelledby="ps-index-title"><p className="v4-eyebrow">ONE PARTNER. MORE POSSIBILITIES.</p><h1 id="ps-index-title">{isThai ? <>ทุกตัวช่วยของร้าน<br /><span>เชื่อมกันที่ PK HUB</span></> : <>More for your shop.<br /><span>Connected by PK HUB.</span></>}</h1><p>{isThai ? 'เริ่มจากสินค้า ต่อยอดลูกค้า มีทีมช่วยดูแล เลือกสิ่งที่ร้านคุณต้องการ' : 'Start with supply. Build customer relationships. Find support. Choose what your shop needs.'}</p></m.section>
      <section className="ps-directory" aria-label={isThai ? 'สำรวจสินค้าและบริการ' : 'Explore products and services'}>
        <div className="ps-directory-list" role="group" aria-label={isThai ? 'บริการทั้งหมด' : 'All services'}>{PRODUCT_SERVICES.map((p, i) => { const Icon = ICONS[p.id]; const groupStart = i === 0 || PRODUCT_SERVICES[i - 1].group !== p.group; return <div key={p.id}>{groupStart && <p className="ps-directory-group">{p.group === 'sell' ? (isThai ? 'เพิ่มตัวเลือกขาย' : 'Expand your assortment') : p.group === 'customer' ? (isThai ? 'ต่อยอดความสัมพันธ์' : 'Build customer relationships') : (isThai ? 'ดูแลหลังการขาย' : 'Support after the sale')}</p>}<a className="ps-directory-choice" href={productPath(language, p.id)} onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(p.id) }} onFocus={() => setActive(p.id)} data-selected={active === p.id}><Icon size={18} aria-hidden="true" /><span>{isThai ? p.title : p.titleEn}</span><ArrowUpRight size={14} aria-hidden="true" /></a></div> })}</div>
        <div className="ps-directory-preview"><ProductVisual key={active} id={active} compact /><div className="ps-directory-description" aria-live="polite"><p className="v4-eyebrow">{service.eyebrow}</p><h2>{isThai ? service.title : service.titleEn}</h2><p>{isThai ? service.description : service.descriptionEn}</p><a className="v4-primary cursor-interaction" href={productPath(language, active)}>{isThai ? 'สำรวจบริการนี้' : 'Explore this service'}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
      </section>
      <PartnerStartSection />
    </main><Footer /></div>
  </div>
}
