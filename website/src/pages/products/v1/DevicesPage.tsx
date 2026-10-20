import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import BrandWall from '@/components/v1/BrandWall'
import { Faq } from '@/components/v1/ServiceBlocks'
import { ACCESSORY_BRANDS, PHONE_BRANDS, findBrand } from '@/content/brands'
import PageShell from '@/components/v1/PageShell'
import { productRoute, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'

const MINI_LOGOS: Array<[string, string, number, number, boolean]> = [
  ['Apple', '/v1/brands/apple.svg', 22, 26, false],
  ['Samsung', '/v1/brands/samsung.svg', 52, 24, true],
  ['OPPO', '/v1/brands/oppo.png', 44, 20, false],
  ['vivo', '/v1/brands/vivo.svg', 42, 20, false],
  ['Xiaomi', '/v1/brands/xiaomi.png', 28, 28, false],
]

export default function DevicesPage({ focus }: { focus: 'devices' | 'accessories' }) {
  const { language } = useLanguage()
  const accessories = focus === 'accessories'
  return (
    <PageShell cta={false}>
      <section className="v1-white" aria-labelledby="v1-page-title">
        <div className="v1-wrap grid gap-6 pb-6 pt-[clamp(48px,6.6vw,96px)]">
          <p className="v1-eyebrow">
            {accessories ? t(language, 'อุปกรณ์เสริม · 14 แบรนด์', 'Accessories · 14 brands') : t(language, 'สินค้า · ตัวแทนจำหน่ายที่ได้รับอนุญาตจาก AIS', 'Products · AIS authorized dealer')}
          </p>
          <div className="v1-section-head" style={{ marginBottom: 0 }}>
            <h1 id="v1-page-title" className="v1-h1">
              {accessories ? t(language, 'อุปกรณ์เสริมที่ขายคู่กับเครื่อง', 'Accessories that sell with every phone') : t(language, 'ของที่ลูกค้าถามหา', 'What customers ask for,')}
              <br />
              {t(language, 'สั่งเข้าร้านได้จากที่เดียว', 'ordered from one place')}
            </h1>
            <p className="v1-lede">
              {accessories
                ? t(
                    language,
                    'PK HUB ขายส่งอุปกรณ์เสริมมือถือให้ร้านค้าทั่วประเทศ ทั้งหูฟัง ลำโพง สมาร์ทวอทช์ ที่ชาร์จ สาย เคส และฟิล์ม ราคาส่งสำหรับร้านคู่ค้า ดูราคาและสั่งได้หลังเปิดบัญชีคู่ค้า',
                    'PK HUB supplies phone accessories wholesale to stores across Thailand: audio, smartwatches, chargers, cables, cases and screen guards. Partner prices; see prices and order once your partner account is open.',
                  )
                : t(
                    language,
                    'PK HUB ขายส่งมือถือและแท็บเล็ตเครื่องศูนย์ไทยให้ร้านค้าทั่วประเทศ ทั้ง iPhone, Samsung, OPPO, vivo, Xiaomi และแบรนด์อื่น ราคาส่งสำหรับร้านคู่ค้า ออกใบกำกับภาษีได้ ดูราคาและสั่งได้หลังเปิดบัญชีคู่ค้า',
                    'PK HUB supplies official Thai-warranty phones and tablets wholesale to stores across Thailand: iPhone, Samsung, OPPO, vivo, Xiaomi and more. Partner prices with tax invoices; see prices and order once your partner account is open.',
                  )}
            </p>
          </div>
        </div>
      </section>

      <section className="v1-white" aria-label={t(language, 'หมวดสินค้า', 'Categories')}>
        <div className="v1-wrap grid gap-6 pb-6 pt-12">
          <div className="v1-devices-top v1-reveal" data-brand-kind="phone">
            <a href={productRoute(language, 'handset-wholesale')} className="v1-card v1-card-hover v1-devices-phone text-white" style={{ background: 'radial-gradient(circle at 75% 40%, rgba(36,87,214,.33), rgba(36,87,214,0) 55%), #0b0b0b' }}>
              <span className="flex flex-col justify-between gap-8">
                <span className="grid gap-3">
                  <span className="text-[15px] text-[#a9bef7]">{t(language, '10 แบรนด์', '10 brands')}</span>
                  <span className="v1-h2" style={{ fontSize: 'clamp(40px, 3.6vw, 52px)' }}>
                    {t(language, 'มือถือ', 'Phones')}
                  </span>
                  <span className="text-[17px] leading-7 text-[#bebebe]">{t(language, 'รุ่นยอดนิยมทุกแบรนด์ ราคาส่งสำหรับร้านคู่ค้า', 'Popular models from every brand at partner prices')}</span>
                </span>
                <span className="flex flex-wrap gap-2.5" aria-hidden="true">
                  {MINI_LOGOS.map(([name, src, width, height, crop]) => (
                    <span key={name} className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[14px] bg-white">
                      <img src={src} alt={name} width={width} height={height} loading="lazy" style={{ width, height, objectFit: crop ? 'cover' : 'contain' }} />
                    </span>
                  ))}
                  <span className="flex h-14 w-14 items-center justify-center rounded-[14px] border border-white/25 text-[15px]">+5</span>
                </span>
              </span>
              <img src="/v1/img/phones.webp" alt={t(language, 'มือถือหลายรุ่น', 'Several phone models')} width={418} height={600} loading="lazy" className="v1-card-media h-[360px] w-auto max-w-[45%] object-contain" style={{ rotate: '8deg', ['--v1-tilt' as string]: '8deg' }} />
            </a>
            <div className="v1-card flex flex-col justify-between bg-[#f4f4f4] p-9">
              <span className="grid gap-2">
                <span className="text-[15px] text-[#2457d6]">iPad · Galaxy Tab · MatePad</span>
                <span className="v1-h3" style={{ fontSize: 40, lineHeight: '50px' }}>
                  {t(language, 'แท็บเล็ต', 'Tablets')}
                </span>
              </span>
              <img src="/v1/img/tablets.webp" alt={t(language, 'แท็บเล็ต', 'Tablets')} width={367} height={600} loading="lazy" className="mx-auto h-[250px] w-auto object-contain" />
            </div>
          </div>
          <div className="v1-devices-row v1-reveal" data-brand-kind="accessory">
            <a href={productRoute(language, 'accessories')} className="v1-card v1-card-hover v1-devices-mini bg-[#f4f4f4]">
              <span className="grid gap-1.5">
                <span className="v1-h4">{t(language, 'หูฟังและลำโพง', 'Audio')}</span>
                <span className="flex items-center gap-2" aria-hidden="true">
                  <img src="/v1/brands/jbl.svg" alt="" width={36} height={22} className="h-[22px] w-9" />
                  <img src="/v1/brands/sony.svg" alt="" width={60} height={24} className="h-6 w-[60px] object-cover" />
                </span>
              </span>
              <img src="/v1/img/earbuds.webp" alt="" width={600} height={329} loading="lazy" className="v1-card-media mx-auto h-[150px] w-auto object-contain" style={{ ['--v1-tilt' as string]: '0deg' }} />
            </a>
            <a href={productRoute(language, 'accessories')} className="v1-card v1-card-hover v1-devices-mini bg-[#0b0b0b] text-white">
              <span className="grid gap-1.5">
                <span className="v1-h4">{t(language, 'สมาร์ทวอทช์', 'Smartwatches')}</span>
                <span className="text-sm text-[#a9bef7]">Apple · Garmin · Amazfit · imoo</span>
              </span>
              <svg viewBox="0 0 150 170" className="v1-card-media mx-auto h-[150px] w-auto" style={{ ['--v1-tilt' as string]: '0deg' }} aria-hidden="true">
                <rect x="45" y="0" width="60" height="34" rx="10" fill="#2A2D33" />
                <rect x="45" y="136" width="60" height="34" rx="10" fill="#2A2D33" />
                <rect x="25" y="28" width="100" height="114" rx="30" fill="#1B1D21" stroke="#fff" strokeWidth="3" />
                <rect x="38" y="41" width="74" height="88" rx="20" fill="#2457D6" />
                <text x="75" y="92" textAnchor="middle" fontFamily="Anuphan" fontSize="24" fill="#fff">
                  10:09
                </text>
                <rect x="125" y="72" width="8" height="22" rx="3" fill="#fff" />
              </svg>
            </a>
            <a href={productRoute(language, 'accessories')} className="v1-card v1-card-hover v1-devices-mini bg-[#f4f4f4]">
              <span className="grid gap-1.5">
                <span className="v1-h4">{t(language, 'ที่ชาร์จและสาย', 'Chargers and cables')}</span>
                <span className="text-sm text-[#2457d6]">Anker · AMAZE ONE · LINK UP</span>
              </span>
              <svg viewBox="0 0 180 160" className="v1-card-media mx-auto h-[150px] w-auto" style={{ ['--v1-tilt' as string]: '0deg' }} aria-hidden="true">
                <rect x="20" y="30" width="80" height="80" rx="18" fill="#fff" stroke="#0A0A0A" strokeWidth="3" />
                <rect x="40" y="10" width="10" height="24" rx="3" fill="#0A0A0A" />
                <rect x="70" y="10" width="10" height="24" rx="3" fill="#0A0A0A" />
                <path d="M60 110c0 30 30 40 60 30s40-30 40-60" fill="none" stroke="#2457D6" strokeWidth="6" strokeLinecap="round" />
                <rect x="146" y="50" width="28" height="36" rx="8" fill="#2457D6" />
              </svg>
            </a>
            <a href={productRoute(language, 'accessories')} className="v1-card v1-card-hover v1-devices-mini bg-[#f4f4f4]">
              <span className="grid gap-1.5">
                <span className="v1-h4">{t(language, 'เคสและฟิล์ม', 'Cases and screen guards')}</span>
                <span className="text-sm text-[#2457d6]">{t(language, 'เคส ฟิล์ม และอุปกรณ์ป้องกัน', 'Cases, films and protection')}</span>
              </span>
              <svg viewBox="0 0 170 170" className="v1-card-media mx-auto h-[150px] w-auto" style={{ ['--v1-tilt' as string]: '0deg' }} aria-hidden="true">
                <rect x="30" y="10" width="86" height="156" rx="22" transform="rotate(-8 73 88)" fill="#2457D6" />
                <rect x="60" y="6" width="86" height="156" rx="22" fill="#fff" stroke="#0A0A0A" strokeWidth="3" />
                <rect x="72" y="18" width="30" height="30" rx="9" fill="none" stroke="#0A0A0A" strokeWidth="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="v1-brand-filter" className="v1-white v1-pad-sm scroll-mt-20" aria-labelledby="v1-brands-title">
        <div className="v1-wrap">
          <div className="v1-section-head">
            <div>
              <p className="v1-eyebrow">{t(language, 'แบรนด์', 'Brands')}</p>
              <h2 id="v1-brands-title" className="v1-h2">
                {t(language, 'เลือกตามแบรนด์', 'Browse by brand')}
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
          <BrandFilter />
        </div>
      </section>

      <section className="bg-[#2457d6] text-white" aria-labelledby="v1-sod-strip">
        <div className="v1-wrap flex flex-wrap items-center justify-between gap-6 py-16">
          <div className="grid gap-2">
            <h2 id="v1-sod-strip" className="v1-h3" style={{ fontSize: 'clamp(30px, 2.8vw, 40px)' }}>
              {t(language, 'ไม่เจอรุ่นที่ลูกค้าถามหา?', 'Cannot find the model a customer wants?')}
            </h2>
            <p className="text-lg leading-[30px] text-[#dce5ff]">{t(language, 'ส่งคำขอ Stock on Demand ให้ทีม PK ช่วยหา', 'Send a Stock on Demand request and let PK find it')}</p>
          </div>
          <a href={productRoute(language, 'stock-on-demand')} className="v1-btn v1-btn-white">
            {t(language, 'รู้จัก Stock on Demand →', 'About Stock on Demand →')}
          </a>
        </div>
      </section>

      <Faq items={accessories ? accessoryFaqs(language) : handsetFaqs(language)} />
    </PageShell>
  )
}

/**
 * Brand filter: tapping a logo (here, or on the home billboard via `?brand=`) shows its category and
 * dims the other category cards. State lives here, and the dimming is a class toggle, so a tap
 * re-renders only this block rather than the whole page.
 */
function BrandFilter() {
  const { language } = useLanguage()
  const { search } = useLocation()
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => {
    const brand = new URLSearchParams(search).get('brand')
    setSelected(brand)
    // A brand tapped elsewhere lands on the filter even when the route loaded after the hash jump.
    if (brand && window.location.hash === '#v1-brand-filter') {
      const jump = () => document.getElementById('v1-brand-filter')?.scrollIntoView({ block: 'start', behavior: 'instant' })
      const timer = window.setTimeout(jump, 120)
      return () => window.clearTimeout(timer)
    }
  }, [search])
  const match = findBrand(selected)
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-brand-kind]').forEach((el) => {
      el.classList.toggle('v1-dim', Boolean(match) && el.dataset.brandKind !== match?.kind)
    })
  }, [match])
  const select = (slug: string | null) => {
    setSelected(slug)
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set('brand', slug)
    else url.searchParams.delete('brand')
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
  }
  return (
    <>
          <div aria-live="polite">
            {match ? (
              <div className="v1-filter-banner">
                <span className="grid gap-1">
                  <span className="font-display text-2xl">{t(language, `แบรนด์ ${match.brand.name}`, `${match.brand.name}`)}</span>
                  <span className="v1-small">
                    {match.kind === 'phone'
                      ? t(language, 'อยู่ในหมวดมือถือและแท็บเล็ต ดูราคาและสั่งได้หลังเปิดบัญชีคู่ค้า', 'In phones and tablets. See prices and order once your partner account is open.')
                      : t(language, 'อยู่ในหมวดอุปกรณ์เสริม ดูราคาและสั่งได้หลังเปิดบัญชีคู่ค้า', 'In accessories. See prices and order once your partner account is open.')}
                  </span>
                </span>
                <span className="flex flex-wrap gap-2">
                  <a href={productRoute(language, 'stock-on-demand')} className="v1-btn v1-btn-ink v1-btn-md">
                    {t(language, `หารุ่น ${match.brand.name} ที่ลูกค้าถาม`, `Find a ${match.brand.name} model`)}
                  </a>
                  <button type="button" className="v1-btn v1-btn-ghost v1-btn-md" onClick={() => select(null)}>
                    {t(language, 'ดูทุกแบรนด์', 'All brands')}
                  </button>
                </span>
              </div>
            ) : (
              <p className="v1-small mb-4">{t(language, 'แตะโลโก้เพื่อดูว่าแบรนด์อยู่หมวดไหน', 'Tap a logo to see its category')}</p>
            )}
          </div>
          <BrandWall selected={selected} onSelect={select} />
    </>
  )
}

const names = (brands: typeof PHONE_BRANDS) => brands.map((brand) => brand.name).join(', ')

// Answers repeat only facts already published on pkhub.co; prices, stock and terms stay with the team.
const handsetFaqs = (language: 'th' | 'en'): Array<[string, string]> => [
  [
    t(language, 'PK HUB ขายส่งมือถือแบรนด์อะไรบ้าง', 'Which phone brands does PK HUB supply wholesale?'),
    t(
      language,
      `มือถือและแท็บเล็ตจาก ${names(PHONE_BRANDS)} รวมถึงแท็บเล็ตอย่าง iPad, Galaxy Tab และ MatePad รุ่น สี ความจุ ราคา และสต็อกตรวจสอบก่อนยืนยันแต่ละออเดอร์`,
      `Phones and tablets from ${names(PHONE_BRANDS)}, including tablets such as iPad, Galaxy Tab and MatePad. Models, colours, capacities, prices and stock are checked before each order is confirmed.`,
    ),
  ],
  [
    t(language, 'เป็นมือถือเครื่องศูนย์ไทยหรือไม่', 'Are the phones official Thai-warranty models?'),
    t(
      language,
      'เป็นมือถือเครื่องศูนย์ไทย ตรวจสอบรายละเอียดประกันของรุ่นที่สนใจกับทีมก่อนยืนยันออเดอร์',
      'Yes, they are official Thai-market models. Confirm the warranty details for your selected models with the team before ordering.',
    ),
  ],
  [
    t(language, 'ดูราคาส่งได้อย่างไร', 'How do I see wholesale prices?'),
    t(
      language,
      'ราคาส่งดูได้หลังเปิดบัญชีคู่ค้า หรือทัก LINE @pkhub พร้อมรุ่น สี ความจุ และจำนวน ทีมจะตรวจสอบราคา สต็อก และรอบจัดส่งให้',
      'Wholesale prices are visible once your partner account is open, or message @pkhub on LINE with the model, colour, capacity and quantity and the team will check price, stock and dispatch.',
    ),
  ],
  [
    t(language, 'ถ้าร้านไม่มีรุ่นที่ลูกค้าถามหา ทำอย่างไร', 'What if a customer wants a model I do not stock?'),
    t(
      language,
      'ส่งคำขอ Stock on Demand ให้ทีม PK ช่วยหา เตรียม 1–2 วัน ส่ง 1–2 วัน ร้านยืนยันก่อนสั่งซื้อทุกครั้ง',
      'Send a Stock on Demand request and PK finds it: 1–2 days to prepare, 1–2 days to deliver, and you always confirm before ordering.',
    ),
  ],
  [
    t(language, 'ออกใบกำกับภาษีได้หรือไม่', 'Can I get a tax invoice?'),
    t(language, 'PK HUB จดทะเบียน VAT และออกใบกำกับภาษีเต็มรูปแบบ', 'PK HUB is VAT registered and issues full tax invoices.'),
  ],
  [
    t(language, 'ต้องสั่งขั้นต่ำเท่าไหร่', 'Is there a minimum order?'),
    t(
      language,
      'เริ่มสอบถามได้โดยไม่มีขั้นต่ำในการคุย แจ้งรุ่นและจำนวนที่สนใจ เพื่อให้ทีมยืนยันเงื่อนไขการสั่งซื้อของรายการนั้นก่อนตัดสินใจ',
      'There is no minimum to start a conversation. Share the models and quantities you need so the team can confirm the ordering terms before you decide.',
    ),
  ],
]

const accessoryFaqs = (language: 'th' | 'en'): Array<[string, string]> => [
  [
    t(language, 'PK HUB ขายส่งอุปกรณ์เสริมแบรนด์อะไรบ้าง', 'Which accessory brands does PK HUB supply wholesale?'),
    t(
      language,
      `อุปกรณ์เสริมจากแบรนด์อย่าง ${names(ACCESSORY_BRANDS)} สินค้าและราคาตรวจสอบก่อนยืนยันแต่ละออเดอร์`,
      `Accessories from brands such as ${names(ACCESSORY_BRANDS)}. Products and prices are checked before each order is confirmed.`,
    ),
  ],
  [
    t(language, 'มีอุปกรณ์เสริมหมวดไหนบ้าง', 'Which accessory categories are available?'),
    t(
      language,
      'หูฟังและลำโพง สมาร์ทวอทช์ ที่ชาร์จและสาย เคส ฟิล์ม และอุปกรณ์ป้องกัน',
      'Audio, smartwatches, chargers and cables, cases, screen guards and protection.',
    ),
  ],
  [
    t(language, 'สั่งพร้อมมือถือได้หรือไม่', 'Can I order accessories together with phones?'),
    t(
      language,
      'ได้ สั่งอุปกรณ์เสริมได้จากที่เดียวกับมือถือและแท็บเล็ต ผ่านบัญชีคู่ค้า PK HUB',
      'Yes. Accessories are ordered from the same place as phones and tablets, through your PK HUB partner account.',
    ),
  ],
  [
    t(language, 'ดูราคาส่งได้อย่างไร', 'How do I see wholesale prices?'),
    t(
      language,
      'ราคาส่งดูได้หลังเปิดบัญชีคู่ค้า หรือทัก LINE @pkhub พร้อมสินค้าและจำนวนที่สนใจ',
      'Wholesale prices are visible once your partner account is open, or message @pkhub on LINE with the products and quantities you need.',
    ),
  ],
  [
    t(language, 'ออกใบกำกับภาษีได้หรือไม่', 'Can I get a tax invoice?'),
    t(language, 'PK HUB จดทะเบียน VAT และออกใบกำกับภาษีเต็มรูปแบบ', 'PK HUB is VAT registered and issues full tax invoices.'),
  ],
]
