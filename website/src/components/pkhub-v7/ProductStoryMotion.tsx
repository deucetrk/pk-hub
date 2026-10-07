import { m } from 'framer-motion'
import { ArrowUpRight, Boxes, FileCheck2, Headphones, MessageCircle, Radio, Repeat2, ShieldCheck, Smartphone, Store, Wrench } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useRevealMotion } from '@/lib/motion'
import { PRODUCT_SERVICES, productPath, type ProductId } from '@/content/productServices'
import { useSceneMotion } from '@/hooks/useSceneMotion'
import '@/styles/product-story-motion.css'

const VISUALS: Partial<Record<ProductId, { src: string; width: number; height: number }>> = {
  'handset-wholesale': { src: '/pkhub-v7/products/phoneFamily.webp', width: 418, height: 600 },
  accessories: { src: '/pkhub-v7/products/charger.webp', width: 280, height: 280 },
  'ais-sim': { src: '/pkhub-v7/products/simSocial.webp', width: 600, height: 600 },
  'ais-rom': { src: '/pkhub-v7/products/myais.svg', width: 42, height: 42 },
  finance: { src: '/pkhub-v7/brands/sleasing.png', width: 437, height: 195 },
}
const ICONS = { 'handset-wholesale': Smartphone, accessories: Boxes, 'ais-sim': Radio, 'ais-rom': Repeat2, finance: Store, 'after-sales': ShieldCheck, repair: Wrench, 'stock-on-demand': Boxes, 'partner-marketing': MessageCircle }

const TEASERS: Record<ProductId,[string,string]> = {
  'handset-wholesale':['รุ่นเริ่มต้น ถึงเรือธง','Entry-level to flagship'],
  accessories:['เพิ่มตัวเลือกในบิลของร้าน','Add choice to your shop’s basket'],
  'ais-sim':['ต่อเครื่องใหม่ สู่การเชื่อมต่อ','Connect the new device'],
  'ais-rom':['อีกจังหวะให้ลูกค้ากลับมา','Another reason for customers to return'],
  finance:['สมัครตัวแทน S Leasing ผ่าน PK','Explore S Leasing agency through PK'],
  'after-sales':['มีทีมช่วยประสานหลังขาย','People to coordinate after the sale'],
  repair:['คุยอาการและขอบเขตบริการ','Discuss the issue and service scope'],
  'stock-on-demand':['ต่อสต็อกร้านตามดีมานด์','Extend your stock against demand'],
  'partner-marketing':['สื่อกลางและแคมเปญ ฟรี','Free campaign material for your shop'],
}

export function ProductServiceLinks({ ids }: { ids: readonly ProductId[] }) {
  const { isThai, language } = useLanguage()
  const { reduceMotion } = useRevealMotion()
  return <div className={`pstory-links ${ids.length > 3 ? 'has-many' : ''}`}>{ids.map((id, i) => {
    const service = PRODUCT_SERVICES.find(p => p.id === id)!
    const asset = VISUALS[id], Icon = ICONS[id]
    return <m.a key={id} href={productPath(language, id)} className="pstory-service-link" initial={false} whileInView={reduceMotion ? {} : { y: [9, 0] }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i % 3 * 0.07 }}>
      <span className={`pstory-link-art art-${id}`} aria-hidden="true">{asset ? <img {...asset} alt="" loading="lazy" decoding="async" /> : id === 'partner-marketing' ? <span className="pstory-campaign-art"><span>ABC MOBILE</span><strong>NEW<br />ARRIVAL</strong><img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="" loading="lazy" /></span> : <Icon size={32} strokeWidth={1.3} />}</span>
      <span className="pstory-link-copy"><strong>{id === 'accessories' ? (isThai ? 'อุปกรณ์เสริม' : 'Accessories') : isThai ? service.title : service.titleEn}</strong><small>{TEASERS[id][isThai ? 0 : 1]}</small><span className="pstory-link-action">{isThai ? 'ดูบริการ' : 'Explore service'}<ArrowUpRight size={16} aria-hidden="true" /></span></span>
    </m.a>
  })}</div>
}

export function ServiceValueFlow({ id, benefits }: { id: ProductId; benefits: [string, string][] }) {
  const { isThai } = useLanguage()
  const motion = useSceneMotion()
  const asset = VISUALS[id], Icon = ICONS[id]
  const StepIcons = [Icon, FileCheck2, Headphones]
  return <div ref={motion.ref} className={`pstory-value-flow ${motion.running ? 'is-running' : ''}`} data-motion-phase={motion.phase}>
    <p className="pstory-flow-intro">{isThai ? 'สิ่งที่ร้านคุณได้จากบริการนี้' : 'What this service gives your shop'}</p>
    <div className="pstory-flow-rail" aria-hidden="true"><i /></div>
    {benefits.map(([title, description], i) => {
      const StepIcon = StepIcons[i]
      return <div key={title} className={`pstory-value-step ${motion.phase === i ? 'is-emphasized' : ''}`}>
        <m.span style={motion.running ? {y:motion.drift} : undefined} className="pstory-value-symbol" aria-hidden="true">{id === 'finance' && i === 0 ? <img src="/pkhub-v7/brands/logo.png" width={135} height={45} alt="" loading="lazy" /> : id === 'finance' && i === 2 ? <img src="/pkhub-v7/brands/sleasing.png" width={437} height={195} alt="" loading="lazy" /> : i === 0 && asset ? <img {...asset} alt="" loading="lazy" decoding="async" /> : <StepIcon size={23} strokeWidth={1.5} />}</m.span>
        <div><span className="pstory-step-number">0{i + 1}</span><h3>{title}</h3><p>{description}</p></div>
      </div>
    })}
    <button type="button" className="pstory-replay" onClick={motion.replay}>{isThai ? 'ลองดูภาพการทำงานอีกครั้ง' : 'See the service flow again'}<Repeat2 size={14} aria-hidden="true" /></button>
  </div>
}
