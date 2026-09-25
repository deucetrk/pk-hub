import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { useRevealMotion } from '@/lib/motion'
import { CONTACT } from './constants'

const MOMENTS = [
  {
    src: '/reviews/bubble-pack.webp', width: 900, height: 1200,
    labelTh: 'เตรียมสินค้า', labelEn: 'Prepare',
    th: ['ใส่ใจตั้งแต่ก่อนออกจากร้าน', 'ดูภาพการแพ็กจากงานจริง และคุยรายละเอียดการจัดส่งให้ตรงกันก่อนสินค้าออก'],
    en: ['Care before it leaves our store', 'See protective packing from actual work, and agree on delivery details before dispatch.'],
    altTh: 'กล่องมือถือห่อวัสดุกันกระแทกก่อนจัดส่ง', altEn: 'Phone boxes protected with cushioning for dispatch',
  },
  {
    src: '/proof/storefront-building.webp', width: 1600, height: 1200,
    labelTh: 'พบกับทีม', labelEn: 'Meet the team',
    th: ['มีหน้าร้าน มีทีมให้ติดต่อ', 'พบกันได้ที่ถนนศุขประยูร ฉะเชิงเทรา หรือคุยกับทีมผ่าน LINE เพื่อเริ่มต้นความร่วมมือ'],
    en: ['A place to visit. A team to reach.', 'Visit Sukprayoon Road in Chachoengsao, or start a conversation with the team on LINE.'],
    altTh: 'อาคารหน้าร้าน PK HUB ฉะเชิงเทรา', altEn: 'PK HUB storefront in Chachoengsao',
  },
  {
    src: '/reviews/iphone-lot.webp', width: 1100, height: 600,
    labelTh: 'เช็กสินค้าก่อนตัดสินใจ', labelEn: 'Check the range',
    th: ['คุยรุ่นและรายละเอียดให้ชัด', 'ภาพจากงานค้าส่งจริงใช้ช่วยอธิบายสินค้า ส่วนรุ่นและสต็อกปัจจุบันให้ทีมเช็กให้ก่อนสั่งซื้อ'],
    en: ['Clarify the model before you decide', 'Real wholesale work helps show the range. Ask the team to confirm current models and availability before ordering.'],
    altTh: 'กล่อง iPhone จากงานค้าส่งจริงของ PK HUB', altEn: 'iPhone boxes from real PK HUB wholesale operations',
  },
]

export default function ProofSection() {
  const { isThai } = useLanguage()
  const [active, setActive] = useState(0)
  const { reduceMotion } = useRevealMotion()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const moment = MOMENTS[active]
  const [title, description] = isThai ? moment.th : moment.en

  function selectMoment(index: number) {
    setActive(index)
  }

  function moveMoment(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % MOMENTS.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + MOMENTS.length - 1) % MOMENTS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = MOMENTS.length - 1
    else return
    event.preventDefault()
    selectMoment(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="proof" className="scroll-mt-24 bg-[#f7f7f8] py-16 sm:py-24">
      <Container>
        <div className="pk-proof-intro">
          <p className="pk-eyebrow">03 / REAL WORK</p>
          <h2 className="pk-story-heading font-display">{isThai ? <>ของอยู่ใกล้<br />มีทีมให้คุยจริง</> : <>Local operations.<br />People you can reach.</>}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            {isThai ? 'เห็นจังหวะการทำงานของ PK ก่อนเริ่มคุยเรื่องออเดอร์ของคุณ' : 'See how PK works before you start talking about your order.'}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">{isThai ? 'ภาพจากงานจริงของ PK ใช้แนะนำการทำงาน กรุณาเช็กข้อมูลรุ่นและสต็อกปัจจุบันกับทีมอีกครั้ง' : 'Photos show previous PK work. Please ask the team to confirm current models and availability.'}</p>
        </div>

        <div className="pk-proof-switcher">
          <div className="pk-proof-tabs" role="tablist" aria-label={isThai ? 'สำรวจการทำงานของ PK' : 'Explore how PK works'}>
            {MOMENTS.map((item, index) => (
              <button
                key={item.src}
                ref={(node) => { tabRefs.current[index] = node }}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="proof-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => selectMoment(index)}
                onKeyDown={(event) => moveMoment(index, event)}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {isThai ? item.labelTh : item.labelEn}
              </button>
            ))}
          </div>

          <div id="proof-panel" role="tabpanel" tabIndex={0} aria-label={title} className="pk-proof-panel">
            <AnimatePresence initial={false} mode="wait">
              <m.figure
                key={moment.src}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
              >
                <div className="pk-proof-image-wrap">
                  <img src={moment.src} width={moment.width} height={moment.height} alt={isThai ? moment.altTh : moment.altEn} loading="lazy" decoding="async" />
                  <span className="pk-proof-index" aria-hidden="true">0{active + 1} / 03</span>
                </div>
                <figcaption>
                  <h3 className="font-display">{title}</h3>
                  <p>{description}</p>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="pk-proof-contact">
          <div>
            <h3 className="font-display">{isThai ? 'อยากคุยเรื่องร้านของคุณ?' : 'Want to talk about your store?'}</h3>
            <p>{isThai ? 'ทักทีม PK ได้เลย เราจะช่วยเช็กข้อมูลที่ต้องใช้ก่อนเริ่มสั่งซื้อ' : 'Start a conversation and we’ll help confirm what you need before ordering.'}</p>
          </div>
          <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="pk-action pk-action-primary">
            {isThai ? 'เริ่มคุยผ่าน LINE' : 'Talk to PK on LINE'} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="pk-story-video">
          <div>
            <h3 className="pk-story-heading font-display">{isThai ? 'ดูการแพ็กจากงานจริง' : 'See the packing in action'}</h3>
            <p>{isThai ? 'กดเล่นเพื่อดูทีมเตรียมสินค้าและแพ็กก่อนจัดส่งให้ร้านค้า' : 'Play the video to see products being prepared and packed for retailers.'}</p>
            <a href={CONTACT.MAPS_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4">{isThai ? 'ดูที่ตั้งหน้าร้าน' : 'Find our storefront'} <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <video controls playsInline preload="none" width={720} height={1280} poster="/reviews/packing-highlight-reel-poster.jpg" aria-label={isThai ? 'วิดีโอการแพ็กสินค้าจริงของ PK HUB' : 'PK HUB real packing video'}>
            <source src="/reviews/packing-highlight-reel.mp4" type="video/mp4" />
            <a href="/reviews/packing-highlight-reel.mp4">{isThai ? 'เปิดวิดีโอการแพ็กสินค้า' : 'Open the packing video'}</a>
          </video>
        </div>
      </Container>
    </section>
  )
}
