import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Boxes,
  CreditCard,
  Headset,
  Megaphone,
  MessageCircle,
  Package,
  Radio,
  Repeat,
  Smartphone,
  Wrench,
} from 'lucide-react'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { CAPABILITY_PRODUCT, productPath } from '@/content/productServices'
import { CONTACT } from '@/pages/home/constants'
import { withReferral } from '@/utils/referralAttribution'

type CapabilityId =
  | 'supply'
  | 'stock'
  | 'accessories'
  | 'sim'
  | 'marketing'
  | 'support'
  | 'topup'
  | 'finance'
  | 'repair'

interface CapabilityDef {
  id: CapabilityId
  icon: typeof Smartphone
  titleTh: string
  subTh: string
  detailTitleTh: string
  detailDescTh: string
  titleEn: string
  subEn: string
  detailTitleEn: string
  detailDescEn: string
  className: string
}

const CAPABILITIES: CapabilityDef[] = [
  {
    id: 'supply',
    icon: Smartphone,
    titleTh: 'สมาร์ตโฟนหลากระดับ',
    subTh: 'รุ่นเริ่มต้น ถึงเรือธง',
    detailTitleTh: 'สมาร์ตโฟนหลากระดับ',
    detailDescTh: 'ตั้งแต่รุ่นเริ่มต้นถึงเรือธง เช็กรุ่นและสต็อกปัจจุบันกับทีม',
    titleEn: 'Multi-Tier Smartphones',
    subEn: 'Entry-level to flagship',
    detailTitleEn: 'Multi-Tier Smartphones',
    detailDescEn: 'From entry-level to flagship. Check current models and stock with our team.',
    className: 'ch-supply',
  },
  {
    id: 'stock',
    icon: Boxes,
    titleTh: 'Stock on Demand',
    subTh: 'สต็อก PK ต่อยอดหน้าร้าน',
    detailTitleTh: 'Stock on Demand',
    detailDescTh: 'มีทางเลือกให้รุ่นที่ร้านไม่ได้สต็อกไว้ โดยยืนยันสินค้าและเงื่อนไขกับทีม',
    titleEn: 'Stock on Demand',
    subEn: 'PK stock expands store',
    detailTitleEn: 'Stock on Demand',
    detailDescEn: 'Access models your shop doesn’t hold locally, with stock and terms confirmed by PK.',
    className: 'ch-stock',
  },
  {
    id: 'accessories',
    icon: Package,
    titleTh: 'อุปกรณ์เสริมและแกดเจ็ต',
    subTh: 'รวม Link Up by AIS',
    detailTitleTh: 'อุปกรณ์เสริมและแกดเจ็ต',
    detailDescTh: 'ต่อยอดจากการขายเครื่อง ด้วยฟิล์ม เคส หัวชาร์จ หูฟัง และ Link Up by AIS',
    titleEn: 'Accessories & Gadgets',
    subEn: 'Inc. Link Up by AIS',
    detailTitleEn: 'Accessories & Gadgets',
    detailDescEn: 'Grow revenue per sale with screen guards, cases, chargers, audio, and Link Up by AIS.',
    className: 'ch-accessories',
  },
  {
    id: 'sim',
    icon: Radio,
    titleTh: 'บริการเชื่อมต่อ AIS',
    subTh: 'ซิม/แพ็กเกจ ตามสิทธิ์พื้นที่',
    detailTitleTh: 'บริการเชื่อมต่อ AIS',
    detailDescTh: 'ซิมและแพ็กเกจตามสิทธิ์ของร้าน เกณฑ์พื้นที่ และผู้ให้บริการ',
    titleEn: 'AIS Connectivity',
    subEn: 'SIM & packages by area',
    detailTitleEn: 'AIS Connectivity Services',
    detailDescEn: 'SIM cards and packages based on store eligibility, area, and carrier terms.',
    className: 'ch-sim',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    titleTh: 'สื่อการตลาดพาร์ทเนอร์',
    subTh: 'หน้าร้านและ Social',
    detailTitleTh: 'สื่อการตลาดพาร์ทเนอร์',
    detailDescTh: 'สื่อกลางและแคมเปญ ฟรีสำหรับพาร์ทเนอร์ PK Hub ทุกร้าน ไม่มีขั้นต่ำยอดซื้อ ร้านนำไปใช้หรือปรับเองได้',
    titleEn: 'Partner Marketing',
    subEn: 'Storefront & Social',
    detailTitleEn: 'Free Partner Marketing',
    detailDescEn: 'Central media assets and seasonal campaigns, 100% free for all PK Hub partners with zero minimum order.',
    className: 'ch-marketing',
  },
  {
    id: 'support',
    icon: Headset,
    titleTh: 'ทีมดูแลหลังการขาย',
    subTh: 'ช่วยประสานเคลม',
    detailTitleTh: 'ทีมดูแลหลังการขาย',
    detailDescTh: 'ติดต่อศูนย์แบรนด์โดยตรง หรือให้ PK ช่วยประสานและติดตาม',
    titleEn: 'After-Sales Support',
    subEn: 'Warranty coordination',
    detailTitleEn: 'After-Sales Support Team',
    detailDescEn: 'Reach brand service centers directly, or let PK help coordinate and track warranty claims.',
    className: 'ch-support',
  },
  {
    id: 'topup',
    icon: Repeat,
    titleTh: 'เติมเงินออนไลน์',
    subTh: 'ลูกค้ากลับมาใช้บริการ',
    detailTitleTh: 'บริการเติมเงินออนไลน์',
    detailDescTh: 'อีกจังหวะให้ลูกค้ากลับมาที่ร้าน ตามเงื่อนไขบริการ',
    titleEn: 'Online Top-Up',
    subEn: 'Brings customers back',
    detailTitleEn: 'Online Top-Up Services',
    detailDescEn: 'Another regular touchpoint bringing customers back to your shop.',
    className: 'ch-topup',
  },
  {
    id: 'finance',
    icon: CreditCard,
    titleTh: 'ทางเลือกผ่อนชำระ',
    subTh: 'ตามเกณฑ์ผู้ให้บริการ',
    detailTitleTh: 'S Leasing Hub · รับตัวแทนผ่าน PK Hub',
    detailDescTh: 'PK Hub เป็น Hub รับสมัครตัวแทน S Leasing ให้ร้านที่ต้องการเพิ่มทางเลือกผ่อนชำระ โดยคุยเรื่องพื้นที่ เงื่อนไข และเกณฑ์ผู้ให้บริการกับทีม',
    titleEn: 'Financing Options',
    subEn: 'Provider criteria apply',
    detailTitleEn: 'S Leasing Hub · Agent Recruitment via PK Hub',
    detailDescEn: 'PK Hub is an agent recruitment Hub for S Leasing, expanding financing options for retail partners. Consult area eligibility and terms with our team.',
    className: 'ch-finance',
  },
  {
    id: 'repair',
    icon: Wrench,
    titleTh: 'บริการดูแลและซ่อม',
    subTh: 'ปรึกษาเรื่องงานบริการ',
    detailTitleTh: 'บริการดูแลและซ่อมอุปกรณ์',
    detailDescTh: 'เชื่อมโอกาสงานบริการกับร้านคุณ ปรึกษาความต้องการและเงื่อนไขกับทีม PK',
    titleEn: 'Device Care & Repair',
    subEn: 'Consult service needs',
    detailTitleEn: 'Device Care & Repair Services',
    detailDescEn: 'Connect repair opportunities with your shop. Consult service needs and terms with our team.',
    className: 'ch-repair',
  },
]

export default function HeroSection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  const joinPath = withReferral(`/${language}/join`, referralCode)

  const [selectedCap, setSelectedCap] = useState<CapabilityId>('stock')
  const [dashed, setDashed] = useState<boolean>(false)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [pathsD, setPathsD] = useState<string>(
    'M95 66 C95 150 180 100 210 170 M405 66 C405 150 320 100 290 170 M95 170 L210 170 M405 170 L290 170 M95 274 C95 190 180 240 210 170 M405 274 C405 190 320 240 290 170',
  )
  const [activePathD, setActivePathD] = useState<string>('M405 66 C405 150 320 100 290 170')
  const [viewBox, setViewBox] = useState<string>('0 0 970 532')

  const hubRef = useRef<HTMLDivElement>(null)

  const drawPaths = useCallback(() => {
    const hub = hubRef.current
    if (!hub) return
    const r = hub.getBoundingClientRect()
    if (!r.width || !r.height) return
    const cr = hub.querySelector('.ch-core')?.getBoundingClientRect()
    if (!cr) return

    const lines: string[] = []
    let activeD = ''

    hub.querySelectorAll<HTMLButtonElement>('[data-capability]').forEach((n) => {
      const b = n.getBoundingClientRect()
      let d = ''
      const capId = n.dataset.capability as CapabilityId
      if (capId === 'repair') {
        const x = (cr.left + cr.right) / 2 - r.left
        d = `M${x} ${cr.bottom - r.top} L${(b.left + b.right) / 2 - r.left} ${b.top - r.top}`
      } else {
        const isLeft = b.left < cr.left
        const x = (isLeft ? b.right : b.left) - r.left
        const y = (b.top + b.bottom) / 2 - r.top
        const cx = (isLeft ? cr.left : cr.right) - r.left
        const cy = Math.max(cr.top - r.top + 18, Math.min(cr.bottom - r.top - 18, y))
        const mid = (x + cx) / 2
        d = `M${x} ${y} C${mid} ${y} ${mid} ${cy} ${cx} ${cy}`
      }
      lines.push(d)
      if (capId === selectedCap) {
        activeD = d
      }
    })

    if (lines.length > 0) {
      setPathsD(lines.join(' '))
      setActivePathD(activeD)
      setViewBox(`0 0 ${r.width} ${r.height}`)
    }
  }, [selectedCap])

  useEffect(() => {
    drawPaths()
    window.addEventListener('resize', drawPaths)
    const hub = hubRef.current
    let ro: ResizeObserver | null = null
    if (hub && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => drawPaths())
      ro.observe(hub)
    }
    return () => {
      window.removeEventListener('resize', drawPaths)
      ro?.disconnect()
    }
  }, [drawPaths])

  const handleCapabilityClick = (id: CapabilityId) => {
    setDashed((prev) => (selectedCap === id ? !prev : true))
    setSelectedCap(id)
    setIsMoving(false)
    requestAnimationFrame(() => {
      setIsMoving(true)
    })
  }

  const currentCapDef = CAPABILITIES.find((c) => c.id === selectedCap) ?? CAPABILITIES[1]

  return (
    <section className="v4-hero" aria-labelledby="v4-h1">
      <p className="v4-eyebrow">PK HUB · ONE PARTNER. MORE POSSIBILITIES.</p>
      <h1 id="v4-h1">
        {isThai ? (
          <>
            ทุกตัวช่วยร้านมือถือ
            <br />
            ในพาร์ทเนอร์เดียว
          </>
        ) : (
          <>
            Every Retailer Advantage
            <br />
            in One Partner
          </>
        )}
      </h1>
      <p className="v4-lead">
        {isThai
          ? 'เชื่อมสินค้าที่ร้านต้องการ กับโอกาสและทีมที่ช่วยให้ร้านเติบโต'
          : 'Connecting the products your store needs with real opportunities and a dedicated team.'}
      </p>

      <div className="v4-actions">
        <a className="v4-primary cursor-interaction" href={joinPath}>
          {isThai ? 'สมัครเป็น PK Hub Partner' : 'Become a PK Hub Partner'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          className="v4-secondary cursor-interaction"
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {isThai ? 'เช็กรุ่นและราคาทาง LINE' : 'Check Models & Prices on LINE'}
        </a>
      </div>

      <div className="v4-ecosystem">
        <div
          ref={hubRef}
          className="ch-hub"
          aria-label={isThai ? 'บริการพาร์ทเนอร์ที่เชื่อมผ่าน PK HUB' : 'Partner services connected via PK HUB'}
        >
          <svg
            className="ch-paths"
            viewBox={viewBox}
            preserveAspectRatio="none"
            role="img"
            aria-label="PK HUB ecosystem connection paths"
          >
            <path d={pathsD} />
            <path
              className={`ch-active-path ${dashed ? 'is-dashed' : ''} ${isMoving ? 'is-moving' : ''}`}
              d={activePathD}
            />
          </svg>

          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon
            const isSelected = selectedCap === cap.id
            return (
              <button
                key={cap.id}
                type="button"
                className={`ch-service ${cap.className} ${isSelected ? 'is-selected' : ''} cursor-interaction`}
                data-capability={cap.id}
                aria-pressed={isSelected}
                onClick={() => handleCapabilityClick(cap.id)}
              >
                <Icon size={20} aria-hidden="true" />
                <strong>{isThai ? cap.titleTh : cap.titleEn}</strong>
                <span>{isThai ? cap.subTh : cap.subEn}</span>
              </button>
            )
          })}

          <div className="ch-core">
            <img
              src="/pkhub-v7/brands/logo.png"
              alt="PK HUB"
              width={360}
              height={119}
              className="max-h-[36px] w-auto object-contain"
              loading="eager"
              decoding="async"
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
            <strong>{isThai ? 'พาร์ทเนอร์ของร้านคุณ' : 'Partner to your store'}</strong>
          </div>
        </div>
      </div>

      <div className="v4-capability-detail" aria-live="polite">
        <strong>{isThai ? currentCapDef.detailTitleTh : currentCapDef.detailTitleEn}</strong>
        <span>{isThai ? currentCapDef.detailDescTh : currentCapDef.detailDescEn}</span>
      </div>
      <a className="v4-text-action cursor-interaction" style={{ justifyContent: 'center', margin: '0 auto' }} href={productPath(language, CAPABILITY_PRODUCT[selectedCap])}>
        {isThai ? 'สำรวจบริการนี้' : 'Explore this service'} <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </section>
  )
}
