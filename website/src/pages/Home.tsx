import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import BrandWall from '@/components/v1/BrandWall'
import CountUp from '@/components/v1/CountUp'
import { Faq } from '@/components/v1/ServiceBlocks'
import { HOME_FAQS } from '@/content/homeFaqs'
import SodChatDemo from '@/components/v1/SodChatDemo'
import PageShell from '@/components/v1/PageShell'
import { productRoute, route, t } from '@/components/v1/site'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { useLanguage } from '@/i18n/LanguageContext'
import { HOME_META, usePageMeta } from '@/lib/seo'
import { withReferral } from '@/utils/referralAttribution'

/** Unit for the hero collage: 1/698 of the collage width, so the composition scales as one piece. */
const u = (value: number) => `calc(var(--u) * ${value})`

function HeroCollage() {
  const { language } = useLanguage()
  const inner = useRef<HTMLDivElement>(null)
  // Desktop-only, fine-pointer parallax: the whole collage drifts a few pixels with the mouse.
  useEffect(() => {
    const hero = inner.current?.closest('section')
    if (!hero || !window.matchMedia('(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        inner.current?.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3))
        inner.current?.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3))
      })
    }
    const onLeave = () => {
      inner.current?.style.setProperty('--px', '0')
      inner.current?.style.setProperty('--py', '0')
    }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return (
    <figure className="v1-collage" aria-label={t(language, 'ภาพรวมสิ่งที่ร้านได้จาก PK HUB', 'What a store gets from PK HUB')}>
      <div ref={inner} className="v1-collage-inner v1-parallax">
        <svg viewBox="0 0 698 550" className="absolute left-0 top-0 h-auto w-full" aria-hidden="true">
          <path className="v1-dash" d="M150 240C150 360 350 95 530 180C710 265 525 505 300 466C60 425 192 192 420 205" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeDasharray="4 8" />
          <path d="M184 240C240 240 235 296 305 296M536 220C520 300 470 300 440 310M386 415V470" fill="none" stroke="#BCCAF0" strokeWidth="2" />
          <circle cx="270" cy="281" r="4" fill="#fff" />
          <circle cx="509" cy="271" r="4" fill="#fff" />
          <circle cx="386" cy="456" r="4" fill="#fff" />
        </svg>
        <img
          src="/v1/img/phones.webp"
          alt={t(language, 'มือถือหลายสีหลายรุ่น', 'Phones in several colours')}
          width={418}
          height={600}
          {...({ fetchpriority: 'high' } as Record<string, string>)}
          className="v1-enter-t v1-float absolute object-contain"
          style={{ ['--d' as string]: '0.1s', left: u(22), top: u(18), width: u(232), height: u(334), rotate: '-9deg', transformOrigin: '0 0', zIndex: 2 }}
        />
        <div
          className="v1-enter v1-float-2 absolute flex flex-col items-center overflow-hidden rounded-[10px] border border-white bg-[#f4f4f4] text-[#111114] shadow-[0_28px_60px_rgba(0,0,0,.27)]"
          style={{ ['--d' as string]: '0.3s', left: u(208), top: u(215), width: u(330), height: u(224), rotate: '-3deg', transformOrigin: '0 0', zIndex: 3 }}
        >
          <svg viewBox="0 0 330 58" className="h-auto w-full shrink-0" aria-hidden="true">
            <rect width="330" height="58" fill="#111114" />
            <path d="M0 0H46L36 50H0V0ZM90 0H134L130 50H84L90 0ZM178 0H222L230 50H184L178 0ZM266 0H310L330 50H282L266 0Z" fill="#F4F4F4" />
            <path d="M0 50H330" stroke="#BBBBBB" />
          </svg>
          <div className="flex w-full items-center justify-between" style={{ padding: `${u(20)} ${u(22)}` }}>
            <span className="font-display font-medium" style={{ fontSize: u(37), lineHeight: 1.3 }}>
              {t(language, 'ร้านคุณ', 'Your store')}
            </span>
            <span className="grid" style={{ gap: u(8), width: u(126) }} aria-hidden="true">
              <span className="block bg-[#d4d4d4]" style={{ height: u(5), width: u(110) }} />
              <span className="block bg-[#d4d4d4]" style={{ height: u(5), width: u(85) }} />
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#d4d4d4]" style={{ width: u(286), paddingTop: u(13), fontSize: u(16) }}>
            <span className="text-[#4b4b4b]">{t(language, 'สินค้า · บริการ · ทีม', 'Products · services · team')}</span>
            <span className="font-medium text-[#2457d6]">+ PK HUB</span>
          </div>
        </div>
        <div
          className="v1-enter v1-float-3 absolute flex flex-col items-center justify-center overflow-hidden rounded-xl bg-white text-[#111114] shadow-[0_16px_36px_rgba(0,0,0,.2)]"
          style={{ ['--d' as string]: '0.42s', left: u(456), top: u(16), width: u(208), height: u(190), rotate: '8deg', transformOrigin: '0 0', gap: u(3) }}
        >
          <img src="/v1/img/ais-sim.webp" alt="" width={760} height={324} className="object-cover" style={{ width: u(172), height: u(138), objectPosition: '49% 46%' }} />
          <span className="font-medium" style={{ fontSize: u(16) }}>
            {t(language, 'เชื่อมต่อ · เติมเงิน', 'Connect · top up')}
          </span>
        </div>
        <div
          className="v1-enter v1-float absolute flex flex-col items-center justify-center rounded-[10px] bg-white shadow-[0_16px_36px_rgba(0,0,0,.2)]"
          style={{ ['--d' as string]: '0.54s', left: u(252), top: u(27), width: u(176), height: u(145), rotate: '-7deg', transformOrigin: '0 0', gap: u(7) }}
        >
          <span className="text-[#555]" style={{ fontSize: u(16) }}>
            {t(language, 'สินเชื่อ', 'Financing')}
          </span>
          <img src="/v1/brands/sleasing.png" alt="S Leasing" width={437} height={195} className="object-contain" style={{ width: u(122), height: u(39) }} />
          <span className="font-medium text-[#111114]" style={{ fontSize: u(14) }}>
            {t(language, 'Hub รับสมัครตัวแทน', 'Sub-partner hub')}
          </span>
        </div>
        <div
          className="v1-enter v1-float-2 absolute flex flex-col items-center justify-center rounded-xl bg-white text-[#111114] shadow-[0_16px_36px_rgba(0,0,0,.2)]"
          style={{ ['--d' as string]: '0.66s', left: u(541), top: u(348), width: u(145), height: u(161), rotate: '7deg', transformOrigin: '0 0', gap: u(6) }}
        >
          <img src="/v1/img/earbuds.webp" alt="" width={600} height={329} className="object-contain" style={{ width: u(108), height: u(101) }} />
          <span className="font-medium" style={{ fontSize: u(16) }}>
            {t(language, 'อุปกรณ์เสริม', 'Accessories')}
          </span>
        </div>
        <div
          className="v1-enter v1-float-3 absolute flex flex-col items-center justify-center rounded-[10px] border border-[#7b8398] bg-[#16181e] text-white"
          style={{ ['--d' as string]: '0.78s', left: u(28), top: u(368), width: u(154), height: u(136), rotate: '-8deg', transformOrigin: '0 0', gap: u(13) }}
        >
          <svg viewBox="0 0 49 49" style={{ width: u(49), height: u(49) }} aria-hidden="true">
            <rect x="10" y="3" width="23" height="41" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
            <path d="M18 8h7M19 38h5M28 24l11-11M36 10a7 7 0 0 0-8 8l-8 8 5 5 8-8a7 7 0 0 0 8-8l-5 5-5-5 5-5Z" fill="#16181E" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
          <span className="font-medium" style={{ fontSize: u(16) }}>
            {t(language, 'ดูแลและซ่อม', 'Care and repair')}
          </span>
        </div>
        <div
          className="v1-enter absolute flex items-center rounded-[10px] border border-[#737b91] bg-[#141619] text-white"
          style={{ ['--d' as string]: '0.9s', left: u(215), top: u(488), gap: u(10), padding: `${u(13)} ${u(16)}`, fontSize: u(15) }}
        >
          <svg viewBox="0 0 30 30" style={{ width: u(30), height: u(30) }} aria-hidden="true">
            <path d="M6 16V13a9 9 0 0 1 18 0v3M6 14H4v9h5v-9H6Zm18 0h2v9h-5v-9h3Zm0 9c0 3-3 4-8 4" fill="none" stroke="#fff" strokeWidth="1.6" />
          </svg>
          {t(language, 'มีทีมพร้อมคุยทุกวัน', 'A team ready to talk, every day')}
        </div>
      </div>
    </figure>
  )
}

function Hero() {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  return (
    <section className="v1-hero" aria-labelledby="v1-page-title">
      <div className="v1-wrap v1-hero-grid v1-home-hero">
        <div className="v1-hero-copy v1-copy-enter">
          <p className="v1-eyebrow v1-eyebrow-sky">{t(language, 'PK HUB · ขายส่งมือถือเครื่องศูนย์ไทย', 'PK HUB · SMARTPHONE WHOLESALE')}</p>
          <h1 id="v1-page-title" className="v1-h1">
            {t(language, 'เพิ่มตัวเลือกขาย', 'More to sell,')}
            <br />
            {t(language, 'ต่อยอดบริการ', 'more services')}
            <br />
            {t(language, 'ให้ร้านคุณ', 'for your store')}
          </h1>
          <p className="v1-lede">
            {t(
              language,
              'มือถือขายส่ง Stock on Demand และทีมสนับสนุน สำหรับร้านที่อยากมีทางเลือกให้ลูกค้ามากขึ้น',
              'Wholesale devices, Stock on Demand and a support team for stores that want to offer customers more.',
            )}
          </p>
          <div className="v1-hero-actions">
            <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-primary">
              {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a href="#v1-growth" className="v1-link text-white">
              {t(language, 'ดูสิ่งที่ร้านจะได้รับ ↓', 'See what your store gets ↓')}
            </a>
          </div>
          <p className="text-[15px] leading-7 text-[#dbdfe8]">
            {t(language, 'ฝากข้อมูลร้าน · ทีม PK HUB ติดต่อกลับเพื่อคุยรายละเอียด', 'Leave your details · the PK HUB team calls you back')}
          </p>
        </div>
        <HeroCollage />
      </div>
      <div className="v1-glitter" aria-hidden="true" />
    </section>
  )
}

function Brands() {
  const { language } = useLanguage()
  return (
    <section id="v1-brands" className="v1-band v1-white v1-pad-sm scroll-mt-20" aria-labelledby="v1-brands-title">
      <div className="v1-wrap">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow">{t(language, 'ตัวแทนจำหน่ายที่ได้รับอนุญาตจาก AIS', 'AIS authorized dealer')}</p>
            <h2 id="v1-brands-title" className="v1-h2">
              {t(language, 'แบรนด์ที่ร้านคุณขายได้', 'Brands your store can sell')}
            </h2>
          </div>
          <p className="v1-lede" style={{ fontSize: 18 }}>
            {t(
              language,
              'มือถือ แท็บเล็ต และอุปกรณ์เสริมจากแบรนด์ชั้นนำ สั่งได้ทั้งรุ่นที่มีในร้านและรุ่นที่ลูกค้าถามหา',
              'Phones, tablets and accessories from leading brands. Order the models you stock and the ones customers ask for.',
            )}
          </p>
        </div>
        <BrandWall />
      </div>
    </section>
  )
}

function Growth() {
  const { language } = useLanguage()
  const referralCode = useReferralAttribution()
  return (
    <section id="v1-growth" className="v1-band v1-dark v1-pad-sm scroll-mt-20" aria-labelledby="v1-growth-title">
      <div className="v1-wrap grid gap-12">
        <div className="v1-growth-head">
          <h2 id="v1-growth-title" className="v1-h2">
            {t(language, 'เปิดโอกาสใหม่', 'New openings')}
            <br />
            {t(language, 'ให้ธุรกิจร้านคุณ', 'for your store')}
          </h2>
          <div className="grid gap-2.5">
            <p className="v1-num" style={{ fontSize: 'clamp(52px, 5vw, 72px)', lineHeight: 1.17 }}>
              <CountUp to={500} suffix="+" /> {t(language, 'รุ่น', 'models')}
            </p>
            <p className="text-xl leading-8">{t(language, 'จาก 26 แบรนด์ มือถือ แท็บเล็ต และอุปกรณ์เสริม', 'from 26 brands of phones, tablets and accessories')}</p>
            <p className="text-base leading-7 text-[#bebebe]">
              {t(language, 'ต่อยอดตัวเลือกขาย โดยไม่ต้องวางสินค้าทุกรุ่นไว้หน้าร้าน', 'Offer more without keeping every model on your shelf')}
            </p>
            <div className="flex flex-wrap gap-x-9 gap-y-4 border-t border-[#404040] pt-5">
              <p className="flex items-center gap-4">
                <span className="v1-num text-[46px] leading-[58px]">
                  <CountUp to={10} />
                </span>
                <span className="text-base leading-[26px] text-[#d2d2d2]">
                  {t(language, 'แบรนด์', 'brands of')}
                  <br />
                  {t(language, 'มือถือและแท็บเล็ต', 'phones and tablets')}
                </span>
              </p>
              <p className="flex items-center gap-4">
                <span className="v1-num text-[46px] leading-[58px]">
                  <CountUp to={16} />
                </span>
                <span className="text-base leading-[26px] text-[#d2d2d2]">
                  {t(language, 'แบรนด์', 'brands of')}
                  <br />
                  {t(language, 'อุปกรณ์เสริม', 'accessories')}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="v1-grid-3 v1-reveal">
          <article className="v1-card v1-card-pad v1-card-hover v1-growth-card" style={{ background: 'radial-gradient(circle at 60% 75%, rgba(36,87,214,.4), rgba(36,87,214,0) 60%), #1b1d21' }}>
            <div className="grid gap-2">
              <p className="text-sm text-[#a9bef7]">01</p>
              <h3 className="v1-h3" style={{ fontSize: 34, lineHeight: '42px' }}>
                {t(language, 'เพิ่มตัวเลือกให้ขาย', 'More to sell')}
              </h3>
              <p className="text-base leading-[26px] text-[#bebebe]">
                {t(language, 'มือถือ แท็บเล็ต อุปกรณ์เสริม และ Stock on Demand', 'Phones, tablets, accessories and Stock on Demand')}
              </p>
            </div>
            <img src="/v1/img/phones.webp" alt="" width={418} height={600} loading="lazy" className="v1-card-media mx-auto h-[260px] w-auto object-contain" style={{ rotate: '6deg' }} />
            <div className="flex flex-wrap gap-2">
              <a className="v1-chip v1-chip-line" href={productRoute(language, 'handset-wholesale')}>
                {t(language, 'มือถือ ↗', 'Phones ↗')}
              </a>
              <a className="v1-chip v1-chip-line" href={productRoute(language, 'accessories')}>
                {t(language, 'อุปกรณ์เสริม ↗', 'Accessories ↗')}
              </a>
              <a className="v1-chip v1-chip-line" href={productRoute(language, 'stock-on-demand')}>
                Stock on Demand ↗
              </a>
            </div>
          </article>

          <article className="v1-card v1-card-pad v1-card-hover v1-growth-card v1-peri-grid-sm text-[#0a0a0a]">
            <div className="grid gap-2">
              <p className="text-sm text-[#16233f]">02</p>
              <h3 className="v1-h3" style={{ fontSize: 34, lineHeight: '42px' }}>
                {t(language, 'ให้ลูกค้ากลับมาที่ร้าน', 'Bring customers back')}
              </h3>
              <p className="text-base leading-[26px] text-[#16233f]">
                {t(language, 'ซิม AIS เติมเงินออนไลน์ และผ่อนมือถือ S Leasing', 'AIS SIM, online top-up and S Leasing instalments')}
              </p>
            </div>
            <div className="relative mx-auto h-[250px] w-[340px] max-w-full" aria-hidden="true">
              <div className="v1-card-media absolute left-[10px] top-[10px] flex h-[170px] w-[200px] items-center justify-center rounded-[20px] bg-white shadow-[0_20px_50px_rgba(22,35,63,.25)]" style={{ rotate: '-5deg', transformOrigin: '0 0' }}>
                <img src="/v1/img/ais-sim.webp" alt="" width={760} height={324} loading="lazy" className="h-[140px] w-[170px] object-contain" />
              </div>
              <div className="absolute left-[200px] top-0 flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full bg-[#0b0b0b] text-white shadow-[0_20px_50px_rgba(22,35,63,.33)]">
                <span className="v1-num text-[44px] leading-[48px]">3%</span>
                <span className="text-xs text-[#a9bef7]">{t(language, 'เติมเงิน ROM', 'ROM top-up')}</span>
              </div>
              <div className="absolute left-[150px] top-[170px] flex h-[70px] w-[190px] items-center justify-center rounded-[18px] bg-white shadow-[0_20px_50px_rgba(22,35,63,.25)]" style={{ rotate: '3deg', transformOrigin: '0 0' }}>
                <img src="/v1/brands/sleasing.png" alt="" width={437} height={195} loading="lazy" className="h-[46px] w-[150px] object-contain" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="v1-chip v1-chip-white" href={productRoute(language, 'ais-sim')}>
                {t(language, 'ซิม AIS ↗', 'AIS SIM ↗')}
              </a>
              <a className="v1-chip v1-chip-white" href={productRoute(language, 'ais-rom')}>
                {t(language, 'เติมเงิน ↗', 'Top-up ↗')}
              </a>
              <a className="v1-chip v1-chip-white" href={productRoute(language, 'finance')}>
                S Leasing ↗
              </a>
            </div>
          </article>

          <article
            className="v1-card v1-card-pad v1-card-hover v1-growth-card"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(22,22,22,.95) 0%, rgba(22,22,22,.5) 40%, rgba(22,22,22,0) 60%, rgba(22,22,22,.8) 100%), url(/v1/img/shop.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="grid gap-2">
              <p className="text-sm text-[#a9bef7]">03</p>
              <h3 className="v1-h3" style={{ fontSize: 34, lineHeight: '42px' }}>
                {t(language, 'มีทีมช่วยดูแล', 'A team behind you')}
              </h3>
              <p className="text-base leading-[26px] text-[#dbdfe8]">
                {t(language, 'หลังการขาย ซ่อมทุกรุ่นราคาส่ง และสื่อที่กำลังจะมา', 'After-sales, wholesale repair for every model, and marketing media on the way')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="v1-chip v1-chip-glass" href={productRoute(language, 'after-sales')}>
                {t(language, 'หลังการขาย ↗', 'After-sales ↗')}
              </a>
              <a className="v1-chip v1-chip-glass" href={productRoute(language, 'repair')}>
                {t(language, 'ซ่อม ↗', 'Repair ↗')}
              </a>
            </div>
          </article>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
          <p className="text-[19px] leading-8 text-[#d6d6d6]">
            {t(language, 'เลือกสิ่งที่เหมาะกับร้าน แล้วเริ่มคุยกับทีม PK HUB', 'Pick what fits your store, then start talking with PK HUB')}
          </p>
          <a href={withReferral(route(language, '/join'), referralCode)} className="v1-btn v1-btn-ghost-light">
            {t(language, 'สมัครเป็นคู่ค้า', 'Become a partner')}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function StockOnDemand() {
  const { language } = useLanguage()
  return (
    <section id="v1-stock" className="v1-band v1-peri-grid v1-pad scroll-mt-20" aria-labelledby="v1-stock-title">
      <div className="v1-wrap">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow v1-eyebrow-ink">{t(language, 'บริการหลัก · STOCK ON DEMAND', 'CORE SERVICE · STOCK ON DEMAND')}</p>
            <h2 id="v1-stock-title" className="v1-h2-xl v1-display">
              {t(language, 'ของไม่มีที่ร้าน', 'Not on your shelf?')}
              <br />
              {t(language, 'โอกาสไม่ต้องจบ', 'The sale goes on')}
            </h2>
          </div>
          <div className="grid max-w-[400px] gap-5">
            <p className="text-[19px] leading-[30px] text-[#16233f]">
              {t(
                language,
                'ลูกค้าถามหารุ่นที่ไม่มีหน้าร้าน ส่งคำขอให้ PK ช่วยหา ร้านยืนยันก่อนสั่งซื้อทุกครั้ง',
                'When a customer asks for a model you do not stock, send PK a request. You always confirm before ordering.',
              )}
            </p>
            <a href={productRoute(language, 'stock-on-demand')} className="v1-btn v1-btn-ink justify-self-start">
              {t(language, 'รู้จัก Stock on Demand →', 'About Stock on Demand →')}
            </a>
          </div>
        </div>
        <div className="v1-sod-grid v1-reveal">
          <div className="v1-card v1-card-pad v1-dark grid">
            <SodChatDemo />
          </div>
          <div className="grid gap-5">
            {[
              [t(language, 'ทุกแบรนด์', 'All brands'), t(language, 'ส่งคำขอได้ทุกรุ่นที่ลูกค้าถามหา', 'Request any model customers ask for'), false],
              ['24/7', t(language, 'ทีมสแตนด์บายรับคำขอทุกวัน', 'Team on standby every day'), false],
              ['0%', t(language, 'PK ไม่แบ่งกำไรขายปลีกของร้าน', 'PK takes no share of your retail margin'), true],
            ].map(([value, label, accent]) => (
              <div key={String(value)} className={`v1-sod-tile ${accent ? 'bg-[#2457d6] text-white' : 'bg-white'}`}>
                <span className="v1-num" style={{ fontSize: 'clamp(40px, 3.9vw, 56px)', lineHeight: 1.15 }}>
                  {value}
                </span>
                <span className={`max-w-[150px] text-[15px] leading-6 ${accent ? 'text-[#dce5ff]' : 'text-[#606060]'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketingSoon() {
  const { language } = useLanguage()
  return (
    <section id="v1-marketing" className="v1-band v1-dark" aria-labelledby="v1-marketing-title">
      <div className="v1-wrap flex flex-wrap items-center justify-between gap-6 py-16">
        <div className="flex flex-wrap items-center gap-6">
          <span className="v1-chip v1-chip-white min-h-11 px-5 text-base font-semibold">{t(language, 'เร็วๆ นี้', 'Coming soon')}</span>
          <h2 id="v1-marketing-title" className="v1-h3" style={{ fontSize: 'clamp(28px, 2.8vw, 40px)' }}>
            <a href={productRoute(language, 'partner-marketing')} className="hover:underline hover:underline-offset-8">
              {t(language, 'สื่อการตลาดสำหรับร้านคู่ค้า', 'Marketing media for partner stores')}
            </a>
          </h2>
        </div>
        <p className="max-w-[380px] text-[17px] leading-7 text-[#bebebe]">
          {t(
            language,
            'ฟรี ไม่มีขั้นต่ำการสั่งซื้อ สมัครเป็นคู่ค้าไว้ก่อน แล้วเราจะแจ้งเมื่อพร้อมใช้',
            'Free, with no minimum order. Join as a partner now and we will let you know when it is ready.',
          )}
        </p>
      </div>
    </section>
  )
}

function Care() {
  const { language } = useLanguage()
  return (
    <section id="v1-care" className="v1-band v1-mist v1-pad-sm" aria-labelledby="v1-care-title">
      <div className="v1-wrap v1-care-grid v1-reveal">
        <div className="grid content-center gap-6">
          <h2 id="v1-care-title" className="v1-h2">
            {t(language, 'มีทีมให้คุย', 'A team to talk to')}
            <br />
            {t(language, 'ช่วยดูแลเรื่องหลังการขาย', 'for after-sales care')}
          </h2>
          <p className="v1-lede">
            {t(language, 'ให้ PK ช่วยประสานงานหลังการขาย หรือเลือกติดต่อศูนย์บริการของแบรนด์โดยตรง', 'Let PK coordinate after-sales, or contact the brand service centre directly.')}
          </p>
          <p className="v1-body">
            {t(language, 'ซ่อมได้ทุกรุ่นในราคาส่ง ยืนยันขอบเขตงานและค่าใช้จ่ายก่อนรับงาน', 'Repairs for every model at wholesale prices, with scope and cost confirmed before work starts.')}
          </p>
          <a href={productRoute(language, 'after-sales')} className="v1-link">
            {t(language, 'รู้จักบริการหลังการขาย ↗', 'About after-sales care ↗')}
          </a>
        </div>
        <figure className="grid gap-3.5">
          <img src="/v1/img/shop.webp" alt={t(language, 'หน้าร้าน PK HUB ฉะเชิงเทรา', 'PK HUB storefront, Chachoengsao')} width={900} height={903} loading="lazy" className="aspect-[5/3] w-full rounded-xl object-cover" style={{ objectPosition: '55% 55%' }} />
          <figcaption className="text-[15px] leading-7 text-[#5c5c5c]">{t(language, 'หน้าร้าน PK HUB · ฉะเชิงเทรา', 'PK HUB storefront · Chachoengsao')}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function Home() {
  const { language } = useLanguage()
  usePageMeta(HOME_META[language])
  return (
    <PageShell>
      <Hero />
      <Brands />
      <Growth />
      <StockOnDemand />
      <MarketingSoon />
      <Care />
      <Faq items={HOME_FAQS[language].map(({ q, a }) => [q, a])} />
    </PageShell>
  )
}
