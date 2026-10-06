import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Radio,
  Repeat,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import AnimatedNumber from '@/components/pkhub-v7/AnimatedNumber'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from './constants'

interface StageCopy {
  kicker: string
  heading: string
  description: string
  equation: string
  incentive: string
}

const STAGES_TH: StageCopy[] = [
  {
    kicker: 'เริ่มด้วยสิ่งที่ลูกค้าต้องการ',
    heading: 'มือถือและแท็บเล็ต<br>จุดเริ่มต้นของโอกาสต่อไป',
    description: 'เครื่องศูนย์ไทยแท้เป็นจุดเริ่มต้น ร้านแนะนำสินค้าให้ตรงกับการใช้งาน และต่อยอดความสัมพันธ์กับลูกค้า',
    equation: 'มือถือ / แท็บเล็ต → จุดเริ่มต้นของความสัมพันธ์',
    incentive: 'โอกาสกำไรจากการขายเครื่อง',
  },
  {
    kicker: 'ต่อยอดจากการขายเครื่อง',
    heading: 'อุปกรณ์ที่ใช่<br>เพิ่มโอกาสในบิลเดียว',
    description: 'เลือกเคส หัวชาร์จ หรือหูฟังที่เหมาะกับลูกค้า เติมความครบให้การใช้งานและเพิ่มโอกาสกำไรต่อบิล',
    equation: 'เครื่องใหม่ + อุปกรณ์เสริม → โอกาสเพิ่มกำไรต่อบิล',
    incentive: 'โอกาสเพิ่มกำไรต่อบิล',
  },
  {
    kicker: 'เมื่อเครื่องใหม่ต้องการการเชื่อมต่อ',
    heading: 'เครื่องพร้อม ซิมพร้อม<br>อีกความต้องการที่ร้านช่วยได้',
    description: 'โอกาสค่าตอบแทนจากซิมและแพ็กเกจ AIS ขึ้นกับสิทธิ์ เกณฑ์พื้นที่ และผู้ให้บริการ',
    equation: 'ลูกค้าต้องการการเชื่อมต่อ → ตรวจสอบเกณฑ์บริการกับทีม',
    incentive: 'ค่าตอบแทนตามเกณฑ์บริการ',
  },
  {
    kicker: 'เมื่อความสัมพันธ์ไม่จบที่หนึ่งบิล',
    heading: 'กลับมาที่ร้าน<br>กลับมาต่อยอดอีกครั้ง',
    description: 'การเติมเงินเป็นอีกจังหวะให้ลูกค้ากลับมา สร้างความสัมพันธ์ต่อเนื่องและโอกาสคุยเรื่องบริการที่ต้องการ',
    equation: 'เติมเงิน → กลับมาที่ร้าน → โอกาสต่อยอดความสัมพันธ์',
    incentive: 'โอกาสรายได้จากบริการเติมเงิน',
  },
]

const STAGES_EN: StageCopy[] = [
  {
    kicker: 'Start with what customer wants',
    heading: 'Smartphones & Tablets<br>The Start of More Possibilities',
    description: 'Official Thai market devices begin the relationship. Match the right handset and build trust.',
    equation: 'Handset / Tablet → The beginning of relationship',
    incentive: 'Handset sales profit margin',
  },
  {
    kicker: 'Expand beyond the handset',
    heading: 'The Right Accessories<br>Grow Margin in One Basket',
    description: 'Pair essential cases, chargers, or earbuds to complete the purchase and expand basket profit.',
    equation: 'New Device + Accessories → Higher margin per basket',
    incentive: 'Margin expansion per basket',
  },
  {
    kicker: 'When new devices need connectivity',
    heading: 'Device Ready, SIM Ready<br>Another Need Your Shop Solves',
    description: 'Compensation opportunities from AIS SIMs and packages depend on eligibility, territory, and carrier terms.',
    equation: 'Customer needs connectivity → Check service terms with team',
    incentive: 'Service compensation per carrier terms',
  },
  {
    kicker: "When relationships don't end with one bill",
    heading: 'Return to Store<br>Returning for Continued Services',
    description: 'Mobile top-ups bring foot traffic back to your shop, sustaining relationships and new sales touchpoints.',
    equation: 'Top-up → Return to shop → Sustained relationship',
    incentive: 'Ongoing revenue from top-ups',
  },
]

export default function OneCustomerSection() {
  const { isThai } = useLanguage()
  const [journeyStep, setJourneyStep] = useState<number>(0)
  const [isChanging, setIsChanging] = useState<boolean>(false)

  // SIM loop state
  const [simPaused, setSimPaused] = useState<boolean>(false)
  const [simHover, setSimHover] = useState<boolean>(false)
  const [simFocus, setSimFocus] = useState<boolean>(false)
  const [simVisible, setSimVisible] = useState<boolean>(false)
  const simLoopRef = useRef<HTMLButtonElement>(null)

  const stages = isThai ? STAGES_TH : STAGES_EN
  const currentStage = stages[journeyStep]

  const changeJourney = (n: number) => {
    const next = Math.max(0, Math.min(3, n))
    setJourneyStep(next)
    setIsChanging(true)
    setTimeout(() => setIsChanging(false), 300)
  }

  // Observe SIM loop intersection
  useEffect(() => {
    const el = simLoopRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        setSimVisible(entries[0]?.isIntersecting ?? false)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const isSimRunning =
    !simPaused &&
    !simHover &&
    !simFocus &&
    simVisible &&
    journeyStep === 2 &&
    !isReducedMotion

  return (
    <section className="v4-section v5-benefit v5-customer" id="v4-customer" aria-labelledby="v4-customer-title">
      <div className="v5-benefit-copy">
        <p className="v4-eyebrow">ONE CUSTOMER. MORE OPPORTUNITIES.</p>
        <h2 id="v4-customer-title">
          {isThai ? (
            <>
              ลูกค้าหน้าร้าน <em>1</em> คน
              <br />
              ต่อยอดได้มากกว่าที่คิด
            </>
          ) : (
            <>
              Just <em>1</em> Walk-In Customer
              <br />
              More Opportunities Than You Think
            </>
          )}
        </h2>
        <p className="v5-offer-copy">
          {isThai ? (
            <>
              เครื่องใหม่เป็นจุดเริ่มต้น
              <br />
              เลือกโอกาสที่ตรงกับความต้องการของลูกค้าแต่ละคน
            </>
          ) : (
            <>
              A new device is just the start.
              <br />
              Capture matching opportunities for each customer.
            </>
          )}
        </p>

        <div
          className="v4-journey-steps v5-journey-controls"
          role="group"
          aria-label={isThai ? 'เลือกจังหวะของลูกค้าหน้าร้าน' : 'Customer sales touchpoints'}
          style={{ '--journey': journeyStep } as React.CSSProperties}
        >
          <button
            type="button"
            className={`v4-journey-step cursor-interaction ${journeyStep === 0 ? 'is-active' : ''}`}
            data-journey="0"
            aria-pressed={journeyStep === 0}
            onClick={() => changeJourney(0)}
          >
            <span>01</span>
            <Smartphone size={16} aria-hidden="true" />
            <strong>{isThai ? 'มือถือและแท็บเล็ต' : 'Smartphones & Tablets'}</strong>
            <small>{isThai ? 'จุดเริ่มต้น' : 'Starting point'}</small>
          </button>
          <button
            type="button"
            className={`v4-journey-step cursor-interaction ${journeyStep === 1 ? 'is-active' : ''}`}
            data-journey="1"
            aria-pressed={journeyStep === 1}
            onClick={() => changeJourney(1)}
          >
            <span>02</span>
            <ShieldCheck size={16} aria-hidden="true" />
            <strong>{isThai ? 'เลือกอุปกรณ์เสริม' : 'Accessories'}</strong>
            <small>{isThai ? 'ต่อยอดต่อบิล' : 'Attach per basket'}</small>
          </button>
          <button
            type="button"
            className={`v4-journey-step cursor-interaction ${journeyStep === 2 ? 'is-active' : ''}`}
            data-journey="2"
            aria-pressed={journeyStep === 2}
            onClick={() => changeJourney(2)}
          >
            <span>03</span>
            <Radio size={16} aria-hidden="true" />
            <strong>{isThai ? 'เปิดซิม / แพ็กเกจ' : 'SIM & Packages'}</strong>
            <small>{isThai ? 'เชื่อมต่อ' : 'Connectivity'}</small>
          </button>
          <button
            type="button"
            className={`v4-journey-step cursor-interaction ${journeyStep === 3 ? 'is-active' : ''}`}
            data-journey="3"
            aria-pressed={journeyStep === 3}
            onClick={() => changeJourney(3)}
          >
            <span>04</span>
            <Repeat size={16} aria-hidden="true" />
            <strong>{isThai ? 'กลับมาเติมเงิน' : 'Mobile Top-Up'}</strong>
            <small>{isThai ? 'ความสัมพันธ์ต่อเนื่อง' : 'Repeat visits'}</small>
          </button>
        </div>

        <div className="v5-incentive">
          <Sparkles size={16} aria-hidden="true" />
          <strong>{currentStage.incentive}</strong>
        </div>

        <details className="v4-finance">
          <summary>
            {isThai ? 'อีกทางเลือกเมื่ออยากผ่อนชำระ' : 'Financing options for customers'}
          </summary>
          <p>
            {isThai
              ? 'เพิ่มทางเลือกให้ลูกค้า โดยตรวจสอบพื้นที่ เงื่อนไข และเกณฑ์ผู้ให้บริการกับทีม'
              : 'Expand customer purchasing power. Check territory and provider terms with our team.'}
          </p>
        </details>

        <a
          className="v4-text-action cursor-interaction"
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
        >
          {isThai ? 'คุยเรื่องโอกาสของร้านคุณ' : 'Discuss opportunities for your store'}{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="v4-journey-story v5-journey-showcase">
        <div
          className="v4-story-visual v5-product-stage"
          data-scene={journeyStep}
          aria-label={isThai ? 'ภาพสินค้าและบริการประกอบจังหวะของลูกค้า' : 'Product and service illustration'}
        >
          {/* Scene 0: Phones */}
          <div className="v5-real-phones">
            <img
              src="/pkhub-v7/products/phoneFamily.webp"
              alt="iPhone from Apple"
              width={418}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <img
              src="/pkhub-v7/products/ipad.webp"
              alt="iPad from Apple"
              width={367}
              height={600}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Scene 1: Accessories */}
          <div className="v5-real-accessories">
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
              alt="Apple AirPods"
              width={600}
              height={329}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Scene 2: SIM loop ticker */}
          <div className="v5-real-sim">
            <button
              ref={simLoopRef}
              type="button"
              className={`v6-sim-loop cursor-interaction ${isSimRunning ? 'is-running' : ''}`}
              aria-label={
                simPaused
                  ? isThai
                    ? 'เริ่มภาพซิมเคลื่อนอีกครั้ง'
                    : 'Resume SIM animation'
                  : isThai
                    ? 'หยุดภาพซิมที่เคลื่อนอยู่'
                    : 'Pause SIM animation'
              }
              aria-pressed={simPaused}
              onClick={() => setSimPaused((p) => !p)}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setSimHover(true)
              }}
              onPointerLeave={() => setSimHover(false)}
              onFocus={() => setSimFocus(true)}
              onBlur={() => setSimFocus(false)}
            >
              <div className="v6-sim-track">
                <div className="v6-sim-group">
                  <img
                    src="/pkhub-v7/products/simSocial.webp"
                    alt={isThai ? 'ซิม AIS Super Social' : 'AIS Super Social SIM'}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src="/pkhub-v7/products/simZeed.webp"
                    alt={isThai ? 'ซิม AIS ZEED' : 'AIS ZEED SIM'}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="v5-sim-crop">
                    <img
                      src="/pkhub-v7/products/aisSim.webp"
                      alt={isThai ? 'ซิม AIS The One' : 'AIS The One SIM'}
                      width={760}
                      height={324}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="v6-sim-group" aria-hidden="true">
                  <img
                    src="/pkhub-v7/products/simSocial.webp"
                    alt=""
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src="/pkhub-v7/products/simZeed.webp"
                    alt=""
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="v5-sim-crop">
                    <img
                      src="/pkhub-v7/products/aisSim.webp"
                      alt=""
                      width={760}
                      height={324}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </button>
            <span>AIS SIM &amp; PACKAGES</span>
          </div>

          {/* Scene 3: Top-up */}
          <div className="v5-topup-card">
            <div>
              <img
                src="/pkhub-v7/products/myais.svg"
                alt="myAIS"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <span>ONLINE TOP UP</span>
            </div>
            <div className="v6-metric" data-number-block="topup">
              <p className="v6-topup-label">
                {isThai ? 'ยอดเติมเงินต่อรายการ' : 'Top-up amount per transaction'}
              </p>
              <div className="v6-topup-number" aria-hidden="true">
                <AnimatedNumber
                  from={0}
                  to={1000}
                  dataNumber="topup"
                  triggerKey={journeyStep === 3 ? 'active' : 'inactive'}
                />
                <span>THB</span>
              </div>
              <span
                className="v6-sr"
                data-number-status="topup"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {isThai ? 'ยอดเติมเงินต่อรายการ 1,000 THB' : 'Top-up amount per transaction 1,000 THB'}
              </span>
            </div>
            <p>
              {isThai ? (
                <>
                  ลูกค้าเลือกยอดเติมเงิน
                  <br />
                  ร้านตรวจสอบก่อนทำรายการ
                </>
              ) : (
                <>
                  Customer selects top-up
                  <br />
                  Store confirms transaction
                </>
              )}
            </p>
            <div className="v5-topup-flow">
              <Smartphone size={14} aria-hidden="true" />
              <span />
              <Repeat size={14} aria-hidden="true" />
            </div>
            <small>
              {isThai ? 'อีกจังหวะให้ลูกค้ากลับมาที่ร้าน' : 'Another touchpoint bringing customers back'}
            </small>
          </div>
        </div>

        <div className={`v4-story-copy ${isChanging ? 'is-changing' : ''}`}>
          <p className="v4-story-kicker">{currentStage.kicker}</p>
          <h3 dangerouslySetInnerHTML={{ __html: currentStage.heading }} />
          <p className="v4-story-description">{currentStage.description}</p>
          <div className="v4-story-equation">{currentStage.equation}</div>

          <div className="v4-story-navigation">
            <button
              type="button"
              className="v4-story-prev cursor-interaction"
              aria-label={isThai ? 'ดูจังหวะก่อนหน้า' : 'Previous stage'}
              disabled={journeyStep === 0}
              onClick={() => changeJourney(journeyStep - 1)}
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="v4-story-next cursor-interaction"
              disabled={journeyStep === 3}
              onClick={() => changeJourney(journeyStep + 1)}
            >
              {journeyStep === 3
                ? isThai
                  ? 'ครบทุกจังหวะแล้ว '
                  : 'All stages viewed '
                : isThai
                  ? 'ดูโอกาสถัดไป '
                  : 'Next opportunity '}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <p className="v5-photo-note">
            {isThai
              ? 'ภาพสินค้าใช้ประกอบตัวอย่าง · ตรวจสอบรุ่นและเงื่อนไขกับทีม'
              : 'Device imagery for illustration · Verify models and terms with team'}
          </p>
        </div>
      </div>
    </section>
  )
}
