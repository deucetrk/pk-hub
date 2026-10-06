import { useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Plus,
  Smartphone,
  Store,
  Wrench,
} from 'lucide-react'
import AnimatedNumber from '@/components/pkhub-v7/AnimatedNumber'
import type { ServiceDetail } from '@/components/pkhub-v7/ServiceDialog'
import { APPROVED_METRICS } from '@/content/metrics'
import { useLanguage } from '@/i18n/LanguageContext'

type SpotlightId = 'accessories' | 'finance' | 'repair' | 'marketing'

interface StorePotentialSectionProps {
  onOpenServiceDialog?: (service: ServiceDetail, triggerEl?: HTMLElement) => void
}

export default function StorePotentialSection({
  onOpenServiceDialog,
}: StorePotentialSectionProps) {
  const { isThai, language } = useLanguage()
  const [growthMode, setGrowthMode] = useState<'sku' | 'profit'>('sku')
  const [spotlight, setSpotlight] = useState<SpotlightId | null>('finance')
  const toolsRef = useRef<HTMLDivElement>(null)

  const growthConfig = APPROVED_METRICS.growth[growthMode]

  const toggleSpotlight = (id: SpotlightId) => {
    setSpotlight((prev) => (prev === id ? null : id))
  }

  const handleExplore = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const firstButton = toolsRef.current?.querySelector('button')
    firstButton?.focus({ preventScroll: true })
  }

  const handleOpenDialog = (service: ServiceDetail, triggerEl?: HTMLElement) => {
    onOpenServiceDialog?.(service, triggerEl)
  }

  const serviceDetails: Record<SpotlightId, ServiceDetail> = {
    accessories: {
      id: 'accessories',
      title: isThai ? 'อุปกรณ์เสริมและแกดเจ็ต' : 'Accessories & Gadgets',
      description: isThai
        ? 'ต่อยอดจากการขายเครื่อง ด้วยฟิล์ม เคส หัวชาร์จ หูฟัง และ Link Up by AIS'
        : 'Grow revenue per sale with screen guards, cases, chargers, audio, and Link Up by AIS.',
    },
    finance: {
      id: 'finance',
      title: isThai
        ? 'S Leasing Hub · รับตัวแทนผ่าน PK Hub'
        : 'S Leasing Hub · Agent Recruitment via PK Hub',
      description: isThai
        ? 'PK Hub เป็น Hub รับสมัครตัวแทน S Leasing ให้ร้านที่ต้องการเพิ่มทางเลือกผ่อนชำระ โดยคุยเรื่องพื้นที่ เงื่อนไข และเกณฑ์ผู้ให้บริการกับทีม'
        : 'PK Hub is an agent recruitment Hub for S Leasing, expanding financing options for retail partners. Consult area eligibility and terms with our team.',
    },
    repair: {
      id: 'repair',
      title: isThai ? 'บริการดูแลและซ่อมอุปกรณ์' : 'Device Care & Repair Services',
      description: isThai
        ? 'เชื่อมโอกาสงานบริการกับร้านคุณ ปรึกษาความต้องการและเงื่อนไขกับทีม PK'
        : 'Connect repair opportunities with your shop. Consult service needs and terms with our team.',
    },
    marketing: {
      id: 'marketing',
      title: isThai ? 'สื่อการตลาดพาร์ทเนอร์' : 'Free Partner Marketing',
      description: isThai
        ? 'สื่อกลางและแคมเปญ ฟรีสำหรับพาร์ทเนอร์ PK Hub ทุกร้าน ไม่มีขั้นต่ำยอดซื้อ ร้านนำไปใช้หรือปรับเองได้'
        : 'Central media assets and seasonal campaigns, 100% free for all PK Hub partners with zero minimum order.',
    },
  }

  return (
    <section className="v4-section v6-growth" id="v6-growth" aria-labelledby="v6-growth-title">
      <div className="v6-growth-copy">
        <p className="v4-eyebrow">MORE POSSIBILITIES FOR YOUR STORE</p>
        <h2 id="v6-growth-title">
          {isThai ? (
            <>
              เปิดศักยภาพ
              <br />
              ร้านคุณ
            </>
          ) : (
            <>
              Open Your Store’s
              <br />
              Potential
            </>
          )}
        </h2>
        <p className="v6-growth-lead">
          {isThai ? (
            <>
              เพิ่มทางเลือกให้ร้านขาย
              <br />
              ต่อยอดโอกาสจากลูกค้าที่มีอยู่
            </>
          ) : (
            <>
              Expand your sales options.
              <br />
              Capture more value from every customer.
            </>
          )}
        </p>

        <div className="v6-metric-controls" role="group" aria-label={isThai ? 'เลือกโอกาสของร้าน' : 'Select store growth metric'}>
          <button
            type="button"
            className="cursor-interaction"
            data-growth="sku"
            aria-pressed={growthMode === 'sku'}
            onClick={() => setGrowthMode('sku')}
          >
            {isThai ? 'ตัวเลือกขาย' : 'Sales Options'}
          </button>
          <button
            type="button"
            className="cursor-interaction"
            data-growth="profit"
            aria-pressed={growthMode === 'profit'}
            onClick={() => setGrowthMode('profit')}
          >
            {isThai ? 'โอกาสกำไร' : 'Profit Growth'}
          </button>
        </div>

        <div className="v6-metric v6-growth-metric" data-number-block="growth">
          <p className="v6-number-label">{isThai ? growthConfig.label : growthConfig.labelEn}</p>
          <div className="v6-number-line" aria-hidden="true">
            <span className="v6-number-start">{growthConfig.from}</span>
            <span className="v6-number-arrow">→</span>
            <AnimatedNumber
              from={growthConfig.from}
              to={growthConfig.to}
              dataNumber="growth"
              triggerKey={growthMode}
            />
            <span className="v6-number-unit">{growthConfig.unit}</span>
          </div>
          <span
            className="v6-sr"
            data-number-status="growth"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {isThai ? growthConfig.label : growthConfig.labelEn} {growthConfig.to.toLocaleString('en-US')} {growthConfig.unit}
          </span>
        </div>

        <p className="v6-growth-description">
          {isThai ? growthConfig.description : growthConfig.descriptionEn}
        </p>

        <button type="button" className="v4-text-action cursor-interaction" onClick={handleExplore}>
          {isThai ? 'สำรวจสินค้าและบริการ' : 'Explore products & services'}{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>

      <div ref={toolsRef} className="v7-tools">
        <p className="v7-tools-title">
          {isThai ? 'เครื่องมือที่เติบโตไปกับร้านคุณ' : 'Tools that grow with your store'}
        </p>

        <div className="v7-service-rows">
          {/* 01: Accessories */}
          <article
            className={`v7-service-item ${spotlight === 'accessories' ? 'is-active' : ''}`}
            data-spotlight-item="accessories"
          >
            <button
              type="button"
              className="v7-service-toggle cursor-interaction"
              data-spotlight="accessories"
              aria-expanded={spotlight === 'accessories'}
              aria-controls="v7-accessories-panel"
              onClick={() => toggleSpotlight('accessories')}
            >
              <span className="v7-service-number">01</span>
              <span>
                <strong>{isThai ? 'อุปกรณ์เสริมและแกดเจ็ต' : 'Accessories & Gadgets'}</strong>
                <small>{isThai ? 'เพิ่มโอกาสในทุกบิล' : 'Expand margin per basket'}</small>
              </span>
              <Plus size={16} aria-hidden="true" />
            </button>

            <div className="v7-service-panel" id="v7-accessories-panel" hidden={spotlight !== 'accessories'}>
              <div className="v7-accessory-scene v7-scene">
                <img
                  src="/pkhub-v7/products/case.webp"
                  alt="Link Up by AIS case"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/pkhub-v7/products/charger.webp"
                  alt="Link Up by AIS charger"
                  width={280}
                  height={280}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/pkhub-v7/products/earbuds.webp"
                  alt="AirPods"
                  width={600}
                  height={329}
                  loading="lazy"
                  decoding="async"
                />
                <span>{isThai ? 'ครบขึ้นในบิลเดียว' : 'Complete in one basket'}</span>
              </div>
              <p>
                {isThai
                  ? 'เติมความครบให้การใช้งาน ด้วยเคส หัวชาร์จ และหูฟังที่เหมาะกับลูกค้า'
                  : 'Pair cases, fast chargers, and earbuds tailored to customer usage.'}
              </p>
              <button
                type="button"
                className="v4-text-action cursor-interaction"
                onClick={() => handleOpenDialog(serviceDetails.accessories)}
              >
                {isThai ? 'คุยเรื่องอุปกรณ์เสริม' : 'Inquire about accessories'}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 02: S Leasing Hub (Default Open) */}
          <article
            className={`v7-service-item ${spotlight === 'finance' ? 'is-active' : ''}`}
            data-spotlight-item="finance"
          >
            <button
              type="button"
              className="v7-service-toggle cursor-interaction"
              data-spotlight="finance"
              aria-expanded={spotlight === 'finance'}
              aria-controls="v7-finance-panel"
              onClick={() => toggleSpotlight('finance')}
            >
              <span className="v7-service-number">02</span>
              <span>
                <strong>S Leasing Hub</strong>
                <small>{isThai ? 'รับตัวแทนผ่าน PK Hub' : 'Agent recruitment via PK Hub'}</small>
              </span>
              <Plus size={16} aria-hidden="true" />
            </button>

            <div className="v7-service-panel" id="v7-finance-panel" hidden={spotlight !== 'finance'}>
              <div className="v7-finance-scene v7-scene">
                <div className="v7-hub-bridge">
                  <div className="v7-hub-brand">
                    <img
                      src="/pkhub-v7/brands/logo.png"
                      alt="PK HUB"
                      width={360}
                      height={119}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{isThai ? 'HUB รับตัวแทน' : 'Agent Hub'}</span>
                  </div>
                  <div className="v7-bridge-line" aria-hidden="true">
                    <b />
                  </div>
                  <img
                    className="v7-sleasing-logo"
                    src="/pkhub-v7/brands/sleasing.png"
                    alt="S Leasing เอส ลีสซิ่ง"
                    width={437}
                    height={195}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="v7-agent-flow">
                  <span>
                    <Store size={14} aria-hidden="true" /> {isThai ? 'ร้านของคุณ' : 'Your store'}
                  </span>
                  <ArrowUp size={14} aria-hidden="true" />
                  <strong>
                    {isThai ? 'สมัครเป็นตัวแทนผ่าน PK Hub' : 'Apply as agent via PK Hub'}
                  </strong>
                </div>
              </div>

              <h3>
                {isThai ? (
                  <>
                    เพิ่มทางเลือกผ่อน
                    <br />
                    ให้หน้าร้านของคุณ
                  </>
                ) : (
                  <>
                    Expand financing options
                    <br />
                    for your retail store
                  </>
                )}
              </h3>
              <p>
                {isThai ? (
                  <>
                    PK Hub เป็น Hub รับสมัครตัวแทน S Leasing
                    <br />
                    ปรึกษาพื้นที่และเงื่อนไขการเข้าร่วมกับทีม
                  </>
                ) : (
                  <>
                    PK Hub is an agent recruitment Hub for S Leasing.
                    <br />
                    Consult territory eligibility and conditions with our team.
                  </>
                )}
              </p>
              <button
                type="button"
                className="v4-text-action cursor-interaction"
                onClick={(e) => handleOpenDialog(serviceDetails.finance, e.currentTarget)}
              >
                {isThai ? 'สนใจเป็นตัวแทน S Leasing' : 'Inquire about S Leasing agent application'}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 03: Repair */}
          <article
            className={`v7-service-item ${spotlight === 'repair' ? 'is-active' : ''}`}
            data-spotlight-item="repair"
          >
            <button
              type="button"
              className="v7-service-toggle cursor-interaction"
              data-spotlight="repair"
              aria-expanded={spotlight === 'repair'}
              aria-controls="v7-repair-panel"
              onClick={() => toggleSpotlight('repair')}
            >
              <span className="v7-service-number">03</span>
              <span>
                <strong>{isThai ? 'ดูแลและซ่อมอุปกรณ์' : 'Device Care & Repair'}</strong>
                <small>{isThai ? 'ดูแลความสัมพันธ์หลังการขาย' : 'Post-sales care'}</small>
              </span>
              <Plus size={16} aria-hidden="true" />
            </button>

            <div className="v7-service-panel" id="v7-repair-panel" hidden={spotlight !== 'repair'}>
              <div className="v7-care-scene v7-scene">
                <div className="v7-care-device">
                  <Smartphone size={24} aria-hidden="true" />
                  <Wrench size={20} aria-hidden="true" />
                </div>
                <div className="v7-care-process">
                  <span>
                    <b>01</b>
                    {isThai ? 'รับเรื่อง' : 'Intake'}
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                  <span>
                    <b>02</b>
                    {isThai ? 'ประสาน' : 'Coordinate'}
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                  <span>
                    <b>03</b>
                    {isThai ? 'ติดตาม' : 'Follow up'}
                  </span>
                </div>
              </div>
              <p>
                {isThai
                  ? 'ให้ทีมรู้ความต้องการของร้าน เพื่อคุยเรื่องงานบริการและการประสานดูแลตามเงื่อนไข'
                  : 'Let our team know your service requirements to coordinate after-sales support.'}
              </p>
              <button
                type="button"
                className="v4-text-action cursor-interaction"
                onClick={(e) => handleOpenDialog(serviceDetails.repair, e.currentTarget)}
              >
                {isThai ? 'ปรึกษาเรื่องงานบริการ' : 'Consult repair services'}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* 04: Partner Marketing */}
          <article
            className={`v7-service-item ${spotlight === 'marketing' ? 'is-active' : ''}`}
            data-spotlight-item="marketing"
          >
            <button
              type="button"
              className="v7-service-toggle cursor-interaction"
              data-spotlight="marketing"
              aria-expanded={spotlight === 'marketing'}
              aria-controls="v7-marketing-panel"
              onClick={() => toggleSpotlight('marketing')}
            >
              <span className="v7-service-number">04</span>
              <span>
                <strong>Partner Marketing</strong>
                <small>
                  {isThai ? (
                    <>
                      สื่อกลางและแคมเปญ <em>ฟรี</em>
                    </>
                  ) : (
                    <>
                      Central media &amp; campaigns <em>Free</em>
                    </>
                  )}
                </small>
              </span>
              <Plus size={16} aria-hidden="true" />
            </button>

            <div className="v7-service-panel" id="v7-marketing-panel" hidden={spotlight !== 'marketing'}>
              <div className="v7-marketing-scene v7-scene">
                <div className="v7-social-name">
                  <Camera size={14} aria-hidden="true" />
                  <strong>abc.mobile</strong>
                  <span>ABC Mobile</span>
                </div>
                <div className="v7-campaign-stack">
                  <div
                    className="v7-campaign-poster"
                    style={{
                      backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                      ['--pos' as string]: '0% 0%',
                    }}
                  >
                    <img
                      src="/pkhub-v7/brands/logo.png"
                      alt="PK HUB"
                      width={360}
                      height={119}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    className="v7-campaign-poster"
                    style={{
                      backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                      ['--pos' as string]: '50% 0%',
                    }}
                  >
                    <img
                      src="/pkhub-v7/brands/logo.png"
                      alt="PK HUB"
                      width={360}
                      height={119}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    className="v7-campaign-poster"
                    style={{
                      backgroundImage: "url('/pkhub-v7/marketing/social.jpg')",
                      ['--pos' as string]: '100% 0%',
                    }}
                  >
                    <img
                      src="/pkhub-v7/brands/logo.png"
                      alt="PK HUB"
                      width={360}
                      height={119}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <p>
                {isThai
                  ? 'มีสื่อกลางให้ร้านนำไปใช้หรือปรับเอง ตั้งแต่โปรประจำวัน ถึงแคมเปญตามจังหวะรุ่นใหม่'
                  : 'Ready-to-use promotional assets for daily deals and flagship launch campaigns.'}
              </p>
              <a
                className="v4-text-action cursor-interaction"
                href={`/${language}/products/partner-marketing`}
              >
                {isThai ? 'ดู Partner Marketing' : 'Explore Partner Marketing'}{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        <a className="v7-stock-link v4-text-action cursor-interaction" href="#v4-stock">
          {isThai
            ? 'Stock on Demand · อีกทางเลือกของร้าน'
            : 'Stock on Demand · Another store option'}{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
