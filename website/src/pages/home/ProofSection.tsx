import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { CONTACT } from './constants'

const MOMENTS = [
  {
    src: '/reviews/bubble-pack.webp', width: 900, height: 1200,
    th: ['ใส่ใจตั้งแต่ก่อนออกจากร้าน', 'ดูภาพการแพ็กจากงานจริง และคุยรายละเอียดการจัดส่งให้ตรงกันก่อนสินค้าออก'],
    en: ['Care before it leaves our store', 'See protective packing from actual work, and agree on delivery details before dispatch.'],
    altTh: 'กล่องมือถือห่อวัสดุกันกระแทกก่อนจัดส่ง', altEn: 'Phone boxes protected with cushioning for dispatch',
  },
  {
    src: '/proof/storefront-building.webp', width: 1600, height: 1200,
    th: ['มีหน้าร้าน มีทีมให้ติดต่อ', 'พบกันได้ที่ถนนศุขประยูร ฉะเชิงเทรา หรือคุยกับทีมผ่าน LINE เพื่อเริ่มต้นความร่วมมือ'],
    en: ['A place to visit. A team to reach.', 'Visit Sukprayoon Road in Chachoengsao, or start a conversation with the team on LINE.'],
    altTh: 'อาคารหน้าร้าน PK HUB ฉะเชิงเทรา', altEn: 'PK HUB storefront in Chachoengsao',
  },
]

function StoryMoment({ moment, index }: { moment: typeof MOMENTS[number]; index: number }) {
  const { isThai } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const active = useInView(ref, { margin: '-20% 0px -25% 0px' })
  const { item } = useRevealMotion()
  const [title, description] = isThai ? moment.th : moment.en
  return (
    <m.figure ref={ref} className="pk-story-step" data-active={active} variants={item} initial="hidden" whileInView="show" viewport={revealViewport}>
      <img src={moment.src} width={moment.width} height={moment.height} alt={isThai ? moment.altTh : moment.altEn} loading="lazy" decoding="async" />
      <figcaption className="pk-story-caption">
        <span className="pk-story-number" aria-hidden="true">0{index + 1}</span>
        <div>
          <h3 className="font-display text-2xl font-bold leading-snug">{title}</h3>
          <p className="mt-3 text-base leading-7 text-zinc-600">{description}</p>
        </div>
      </figcaption>
    </m.figure>
  )
}

export default function ProofSection() {
  const { isThai } = useLanguage()
  return (
    <section id="proof" className="scroll-mt-24 bg-[#f7f7f8] py-16 sm:py-24">
      <Container>
        <div className="pk-story">
          <div className="pk-story-intro">
            <h2 className="pk-story-heading font-display">{isThai ? <>ของอยู่ใกล้<br />มีทีมให้คุยจริง</> : <>Local operations.<br />People you can reach.</>}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-zinc-600">
              {isThai ? 'รู้จัก PK ผ่านหน้าร้านและงานแพ็กของเรา ก่อนเริ่มคุยเรื่องออเดอร์ของคุณ' : 'Get to know PK through our storefront and packing work before talking about your order.'}
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">{isThai ? 'ภาพจากงานจริงของ PK ใช้แนะนำการทำงาน กรุณาเช็กสต็อกปัจจุบันกับทีมอีกครั้ง' : 'Photos show previous PK work. Please check current availability with the team.'}</p>
            <a href={CONTACT.LINE_URL} target="_blank" rel="noreferrer" className="pk-action pk-action-primary mt-8">
              {isThai ? 'เริ่มคุยเรื่องร้านของคุณ' : 'Tell us about your store'} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div>{MOMENTS.map((moment, index) => <StoryMoment key={moment.src} moment={moment} index={index} />)}</div>
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
