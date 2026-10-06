import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Ellipsis,
  LayoutPanelLeft,
  MessageCircle,
  Package,
  Search,
  Send,
  SlidersHorizontal,
  Truck,
  UserCheck,
  UserRound,
} from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { CONTACT } from './constants'

export default function StockOnDemandSection() {
  const { isThai } = useLanguage()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [hasStoryMotion, setHasStoryMotion] = useState<boolean>(false)
  const demoRef = useRef<HTMLDivElement>(null)

  const playMotion = () => {
    setHasStoryMotion(false)
    requestAnimationFrame(() => {
      setHasStoryMotion(true)
    })
  }

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex)
    playMotion()
  }

  useEffect(() => {
    const el = demoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          playMotion()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stockCopy = isThai
    ? [
        'ลูกค้าถามหารุ่นที่ร้านไม่ได้สต็อกไว้ ยังมีโอกาสเช็กทางเลือกกับทีม PK',
        'ให้ทีมช่วยยืนยันรุ่น สี ความจุ ราคา และรอบส่ง ก่อนเสนอให้ลูกค้า',
        'ร้านดูแลลูกค้าและโอกาสการขาย นัดรับหรือจัดส่งตามเงื่อนไขที่ยืนยัน',
      ]
    : [
        'Customer requests a model not on shelf; still an opportunity to check with PK.',
        'Team confirms model, color, capacity, price, and dispatch round before offering to customer.',
        'Shop closes the sale and schedules pickup or delivery under confirmed terms.',
      ]

  return (
    <section className="v4-section v5-benefit v5-stock" id="v4-stock" aria-labelledby="v4-stock-title">
      <div className="v5-benefit-copy">
        <p className="v4-eyebrow">
          {isThai ? 'เติมโอกาสให้หน้าร้าน · STOCK ON DEMAND' : 'EXPAND STORE CAPACITY · STOCK ON DEMAND'}
        </p>
        <h2 id="v4-stock-title">
          {isThai ? (
            <>
              ร้านไม่มีรุ่น
              <br />
              ก็ยังไม่ต้องเสียลูกค้า
            </>
          ) : (
            <>
              Out of stock in-store?
              <br />
              Never lose a customer
            </>
          )}
        </h2>
        <p className="v5-offer-copy">
          {isThai ? (
            <>
              ใช้สต็อก PK เป็นส่วนต่อของร้าน
              <br />
              เลือกสต็อกเองอย่างมีทางเลือก <strong>ไม่ต้องจมเงินกับทุกรุ่น</strong>
            </>
          ) : (
            <>
              Use PK central stock as an extension of your shelves.
              <br />
              Choose inventory with flexibility—<strong>no capital locked in every model.</strong>
            </>
          )}
        </p>

        <div className="v5-stock-controls" role="group" aria-label={isThai ? 'ลองดูจังหวะการขาย' : 'Explore sales stages'}>
          <button
            type="button"
            className={`v4-stock-stop v5-stock-step cursor-interaction ${activeStep === 0 ? 'is-active' : ''}`}
            data-stock="0"
            aria-pressed={activeStep === 0}
            onClick={() => handleStepClick(0)}
          >
            <span>01</span>
            <strong>{isThai ? 'ลูกค้าทักมาถาม' : 'Customer asks'}</strong>
            <MessageCircle size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`v4-stock-stop v5-stock-step cursor-interaction ${activeStep === 1 ? 'is-active' : ''}`}
            data-stock="1"
            aria-pressed={activeStep === 1}
            onClick={() => handleStepClick(1)}
          >
            <span>02</span>
            <strong>{isThai ? 'ร้านเช็กกับ PK' : 'Store checks PK'}</strong>
            <Search size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`v4-stock-stop v5-stock-step cursor-interaction ${activeStep === 2 ? 'is-active' : ''}`}
            data-stock="2"
            aria-pressed={activeStep === 2}
            onClick={() => handleStepClick(2)}
          >
            <span>03</span>
            <strong>{isThai ? 'คุยต่อเพื่อปิดการขาย' : 'Close the sale'}</strong>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>

        <p className="v4-stock-detail" aria-live="polite">
          {stockCopy[activeStep]}
        </p>

        <a
          className="v4-text-action cursor-interaction"
          href={CONTACT.LINE_URL}
          target="_blank"
          rel="noreferrer"
        >
          {isThai ? 'ปรึกษาเรื่องรุ่นที่ร้านต้องการ' : 'Inquire about stock on demand'}{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div
        ref={demoRef}
        className={`v5-stock-demo ${hasStoryMotion ? 'has-story-motion' : ''}`}
        data-phase={activeStep}
        aria-label={isThai ? 'ภาพอธิบายแชทลูกค้าและการเช็กสินค้ากับ PK' : 'Stock on Demand chat and inventory walkthrough'}
      >
        <div className="v5-inventory">
          <div className="v5-window-bar">
            <span>
              <b />
              <b />
              <b />
            </span>
            <span>{isThai ? 'PK Inventory · ภาพตัวอย่าง' : 'PK Inventory · Preview'}</span>
            <LayoutPanelLeft size={14} aria-hidden="true" />
          </div>

          <div className="v5-inventory-body">
            <aside>
              <img
                src="/pkhub-v7/brands/logo.png"
                alt="PK HUB"
                width={360}
                height={119}
                loading="lazy"
                decoding="async"
              />
              <span className="v5-side-active">
                <Package size={13} aria-hidden="true" /> {isThai ? 'รายการสินค้า' : 'Catalog'}
              </span>
              <span>
                <MessageCircle size={13} aria-hidden="true" /> {isThai ? 'เช็กกับทีม' : 'Check'}
              </span>
              <span>
                <Truck size={13} aria-hidden="true" /> {isThai ? 'รอบส่ง' : 'Dispatch'}
              </span>
            </aside>

            <div className="v5-inventory-content">
              <div className="v5-inventory-caption">
                <span>{isThai ? 'สินค้าและตัวเลือกของร้าน' : 'Catalog and options'}</span>
                <SlidersHorizontal size={13} aria-hidden="true" />
              </div>

              <h3>
                {isThai ? (
                  <>
                    เชื่อมความต้องการ
                    <br />
                    กับทางเลือกของ PK
                  </>
                ) : (
                  <>
                    Connect demand
                    <br />
                    with PK options
                  </>
                )}
              </h3>

              <div className="v5-search-field">
                <Search size={14} aria-hidden="true" />
                <span>{isThai ? 'รุ่นที่ลูกค้าถามหา' : 'Customer requested spec'}</span>
                <b className="v5-search-caret" aria-hidden="true" />
              </div>

              <div className="v5-inventory-row v5-target-row">
                <img
                  src="/pkhub-v7/products/phone.webp"
                  alt="iPhone from Apple"
                  width={226}
                  height={240}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{isThai ? 'รุ่นที่ลูกค้าต้องการ' : 'Requested Handset'}</strong>
                  <span>{isThai ? 'ตรวจสอบสีและความจุ' : 'Verify color & storage'}</span>
                </div>
                <small>{isThai ? 'เช็กกับทีม' : 'Verify'}</small>
              </div>

              <div className="v5-inventory-row">
                <img
                  src="/pkhub-v7/products/phoneAlt.webp"
                  alt="Alternative handset from Apple"
                  width={226}
                  height={240}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{isThai ? 'ตัวเลือกเพิ่มเติม' : 'Alternative Options'}</strong>
                  <span>{isThai ? 'คุยรุ่นที่เหมาะกับลูกค้า' : 'Options matching budget'}</span>
                </div>
                <small>{isThai ? 'สอบถาม' : 'Inquire'}</small>
              </div>

              <div className="v5-inventory-row">
                <img
                  src="/pkhub-v7/products/charger.webp"
                  alt="Link Up by AIS charger"
                  width={280}
                  height={280}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{isThai ? 'อุปกรณ์เสริม' : 'Accessories'}</strong>
                  <span>{isThai ? 'ต่อยอดจังหวะการขาย' : 'Attach accessories'}</span>
                </div>
                <small>{isThai ? 'สอบถาม' : 'Inquire'}</small>
              </div>

              <p className="v5-inventory-footer">
                <UserCheck size={14} aria-hidden="true" />{' '}
                {isThai ? 'ทีม PK ช่วยยืนยันสินค้าและรอบส่ง' : 'PK team confirms stock and delivery'}
              </p>
            </div>
          </div>
        </div>

        <div className="v5-chat">
          <div className="v5-chat-header">
            <span className="v5-customer-avatar">
              <UserRound size={15} aria-hidden="true" />
            </span>
            <div>
              <strong>{isThai ? 'ลูกค้าของร้านคุณ' : 'Your customer'}</strong>
              <span>{isThai ? 'ตัวอย่างบทสนทนา' : 'Chat preview'}</span>
            </div>
            <Ellipsis size={15} aria-hidden="true" />
          </div>

          <div className="v5-chat-body">
            <div className="v5-chat-message v5-customer-message">
              {isThai ? (
                <>
                  รุ่นนี้ สีนี้
                  <br />
                  มีไหมครับ?
                </>
              ) : (
                <>
                  Is this model and color
                  <br />
                  in stock?
                </>
              )}
            </div>
            <div className="v5-chat-message v5-dealer-message">
              {isThai ? (
                <>
                  ขอเช็กสินค้ากับทีม PK
                  <br />
                  ให้ก่อนนะครับ
                </>
              ) : (
                <>
                  Let me check central stock
                  <br />
                  with PK for you right now.
                </>
              )}
            </div>
            <div className="v5-chat-message v5-final-message">
              {isThai ? (
                <>
                  มีทางเลือกให้คุยต่อครับ
                  <br />
                  มายืนยันรุ่น ราคา และรอบส่งกัน
                </>
              ) : (
                <>
                  Confirmed in stock!
                  <br />
                  Let’s lock in spec and delivery.
                </>
              )}
            </div>
            <div className="v5-typing" aria-hidden="true">
              <b />
              <b />
              <b />
            </div>
          </div>

          <div className="v5-chat-input">
            <span>{isThai ? 'ร้านยังมีโอกาสดูแลลูกค้าต่อ' : 'Store retains the customer opportunity'}</span>
            <Send size={14} aria-hidden="true" />
          </div>
        </div>

        <div className="v5-stock-result">
          <Check size={18} aria-hidden="true" />
          <div>
            <strong>
              {isThai ? (
                <>
                  รุ่นที่ร้านไม่ได้ถือไว้
                  <br />
                  ยังเป็นโอกาสให้ร้านขายต่อ
                </>
              ) : (
                <>
                  Unstocked handsets
                  <br />
                  remain your sale opportunity
                </>
              )}
            </strong>
            <span>
              {isThai
                ? 'ยืนยันราคาและเงื่อนไขก่อนรับปากลูกค้า'
                : 'Confirm price & terms before promising customer'}
            </span>
          </div>
        </div>

        <p className="v5-visual-note">
          {isThai ? 'ภาพอธิบายจังหวะการขาย · ไม่ใช่หน้าจอสต็อกสด' : 'Illustrative sales walkthrough · Not live inventory'}
        </p>
      </div>
    </section>
  )
}
