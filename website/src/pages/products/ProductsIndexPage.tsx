import PageShell from '@/components/v1/PageShell'
import { productRoute, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'
import { getProductsIndexMeta, usePageMeta } from '@/lib/seo'

function Orbit() {
  const { language } = useLanguage()
  const pill = 'absolute inline-flex items-center rounded-full whitespace-nowrap'
  const u = (value: number) => `calc(var(--u) * ${value})`
  const items: Array<{ label: string; href: string; className: string; style: Record<string, string> }> = [
    { label: t(language, 'มือถือ 500+ รุ่น', '500+ phone models'), href: productRoute(language, 'handset-wholesale'), className: 'bg-[#2457d6] text-white font-semibold shadow-[0_16px_40px_rgba(36,87,214,.4)]', style: { left: u(200), top: u(0), height: u(56), padding: `0 ${u(22)}`, fontSize: u(18) } },
    { label: t(language, 'อุปกรณ์เสริม', 'Accessories'), href: productRoute(language, 'accessories'), className: 'bg-white text-[#0a0a0a] font-medium', style: { left: u(430), top: u(110), height: u(48), padding: `0 ${u(18)}`, fontSize: u(16) } },
    { label: 'Stock on Demand', href: productRoute(language, 'stock-on-demand'), className: 'bg-[#1b1d21] text-white font-medium border border-[rgba(169,190,247,.4)]', style: { left: u(420), top: u(250), height: u(52), padding: `0 ${u(20)}`, fontSize: u(17) } },
    { label: t(language, 'ซิม AIS', 'AIS SIM'), href: productRoute(language, 'ais-sim'), className: 'bg-white text-[#0a0a0a] font-medium', style: { left: u(400), top: u(390), height: u(48), padding: `0 ${u(18)}`, fontSize: u(16) } },
    { label: 'S Leasing', href: productRoute(language, 'finance'), className: 'bg-[#1b1d21] text-white border border-white/20', style: { left: u(200), top: u(460), height: u(44), padding: `0 ${u(16)}`, fontSize: u(15) } },
    { label: t(language, 'ซ่อมทุกรุ่น', 'Repair, every model'), href: productRoute(language, 'repair'), className: 'bg-white text-[#0a0a0a] font-medium', style: { left: u(10), top: u(380), height: u(48), padding: `0 ${u(18)}`, fontSize: u(16) } },
    { label: t(language, 'หลังการขาย', 'After-sales'), href: productRoute(language, 'after-sales'), className: 'bg-[#1b1d21] text-white border border-white/20', style: { left: u(0), top: u(230), height: u(44), padding: `0 ${u(16)}`, fontSize: u(15) } },
    { label: t(language, 'สื่อการตลาด · เร็วๆ นี้', 'Marketing · coming soon'), href: productRoute(language, 'partner-marketing'), className: 'bg-white/[.08] text-[#c9cdd6] border border-dashed border-white/25', style: { left: u(40), top: u(90), height: u(40), padding: `0 ${u(14)}`, fontSize: u(14) } },
    { label: t(language, 'เติมเงิน ROM สูงสุด 3%', 'ROM top-up up to 3%'), href: productRoute(language, 'ais-rom'), className: 'bg-[#2457d6] text-white font-medium', style: { left: u(330), top: u(60), height: u(44), padding: `0 ${u(16)}`, fontSize: u(15) } },
  ]
  return (
    <nav className="v1-collage" aria-label={t(language, 'บริการทั้งหมด', 'All services')}>
      <ul className="v1-orbit-list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={`inline-flex min-h-11 items-center rounded-full px-4 text-[15px] ${item.className}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="v1-orbit" style={{ aspectRatio: '600 / 520' }}>
        <span className="absolute rounded-full border border-dashed border-white/15 v1-spin-slow" style={{ left: u(40), top: u(20), width: u(480), height: u(480) }} aria-hidden="true" />
        <span className="absolute rounded-full border border-white/10" style={{ left: u(130), top: u(110), width: u(300), height: u(300) }} aria-hidden="true" />
        <span
          className="absolute flex items-center justify-center rounded-full bg-white font-display font-bold text-[#0a0a0a]"
          style={{ left: u(210), top: u(190), width: u(140), height: u(140), fontSize: u(26), boxShadow: '0 0 0 calc(var(--u) * 14) rgba(36,87,214,.2), 0 30px 80px rgba(0,0,0,.53)' }}
          aria-hidden="true"
        >
          PK HUB
        </span>
        {items.map((item, index) => (
          <a key={item.href} href={item.href} className={`${pill} ${item.className} v1-orbit-pill ${index % 3 === 0 ? 'v1-float' : index % 3 === 1 ? 'v1-float-2' : 'v1-float-3'}`} style={item.style}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hub() {
  const { language } = useLanguage()
  return (
    <section className="v1-hero" aria-labelledby="v1-page-title">
      <div className="v1-wrap v1-hero-grid v1-split-hero" style={{ ['--v1-split' as string]: 'minmax(0,560px) minmax(0,600px)' }}>
        <div className="v1-hero-copy">
          <p className="v1-eyebrow v1-eyebrow-sky">{t(language, 'สินค้าและบริการ', 'Products and services')}</p>
          <h1 id="v1-page-title" className="v1-h1" style={{ fontSize: 'clamp(42px, 5vw, 72px)' }}>
            {t(language, 'ร้านเดียว', 'One store,')}
            <br />
            {t(language, 'ต่อได้ทั้งระบบ', 'the whole system')}
          </h1>
          <p className="v1-lede">
            {t(
              language,
              'สินค้า บริการให้ลูกค้า และทีมช่วยดูแลร้าน เลือกใช้เฉพาะที่ร้านต้องการ',
              'Products, customer services and a team to back your store. Use only what you need.',
            )}
          </p>
        </div>
        <Orbit />
      </div>
      <div className="v1-glitter" aria-hidden="true" />
    </section>
  )
}

function Sell() {
  const { language } = useLanguage()
  return (
    <section className="v1-band v1-dark v1-pad-md" aria-labelledby="v1-sell-title">
      <div className="v1-wrap">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow v1-eyebrow-sky" style={{ letterSpacing: '0.06em', fontSize: 15 }}>
              {t(language, '01 · ขายได้มากขึ้น', '01 · SELL MORE')}
            </p>
            <h2 id="v1-sell-title" className="v1-h2" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)' }}>
              {t(language, 'มีของให้ลูกค้า', 'More for customers')}
              <br />
              {t(language, 'เลือกมากขึ้น', 'to choose from')}
            </h2>
          </div>
          <p className="v1-lede" style={{ fontSize: 18, color: '#bebebe' }}>
            {t(language, 'สั่งเข้าร้านตามที่ขายจริง และหารุ่นที่ไม่มีหน้าร้านให้ลูกค้าได้', 'Stock what actually sells, and source the models you do not carry.')}
          </p>
        </div>
        <div className="v1-hub-sell v1-reveal">
          <a href={productRoute(language, 'handset-wholesale')} className="v1-card v1-card-pad v1-card-hover flex min-h-[460px] flex-col justify-between" style={{ background: 'radial-gradient(circle at 70% 70%, rgba(36,87,214,.4), rgba(36,87,214,0) 60%), #1b1d21' }}>
            <span className="grid gap-1.5">
              <span className="v1-h3">{t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets')}</span>
              <span className="text-base leading-[26px] text-[#bebebe]">{t(language, '500+ รุ่น จาก 10 แบรนด์ ราคาส่ง', '500+ models from 10 brands at wholesale prices')}</span>
            </span>
            <span className="flex items-end justify-between gap-4">
              <span className="font-medium text-[#a9bef7]">{t(language, 'ดูสินค้า →', 'See products →')}</span>
              <img src="/v1/img/phones.webp" alt="" width={418} height={600} loading="lazy" className="v1-card-media h-[300px] w-auto object-contain" style={{ rotate: '6deg' }} />
            </span>
          </a>
          <div className="grid gap-5">
            <a href={productRoute(language, 'stock-on-demand')} className="v1-card v1-card-hover grid gap-6 bg-[#2457d6] px-8 py-7 md:grid-cols-[300px_1fr]">
              <span className="flex flex-col justify-between gap-6">
                <span className="grid gap-1.5">
                  <span className="v1-h3">Stock on Demand</span>
                  <span className="text-base leading-[26px] text-[#dce5ff]">{t(language, 'ลูกค้าถามหารุ่นที่ไม่มีหน้าร้าน ส่งคำขอให้ PK ช่วยหา', 'A customer wants a model you do not stock? Ask PK to find it.')}</span>
                </span>
                <span className="font-medium">{t(language, 'ดูวิธีส่งคำขอ →', 'How requests work →')}</span>
              </span>
              <span className="grid content-center gap-2.5 text-[15px] leading-[22px]" aria-hidden="true">
                <span className="justify-self-start rounded-[16px_16px_16px_4px] bg-white px-4 py-3 text-[#0a0a0a]">{t(language, '“มีรุ่นนี้สีม่วงไหม?”', '“Got this one in purple?”')}</span>
                <span className="justify-self-end rounded-[16px_16px_4px_16px] bg-[#16233f] px-4 py-3">{t(language, 'ร้านส่งคำขอ → PK HUB', 'Store requests → PK HUB')}</span>
                <span className="justify-self-start rounded-2xl border border-white/35 bg-white/15 px-4 py-3">{t(language, '✓ มีของ · เตรียม 1–2 วัน · ส่ง 1–2 วัน', '✓ In stock · prep 1–2 days · ship 1–2 days')}</span>
              </span>
            </a>
            <a href={productRoute(language, 'accessories')} className="v1-card v1-card-hover flex min-h-[170px] items-center justify-between gap-4 bg-[#f4f4f4] px-8 py-7 text-[#0a0a0a]">
              <span className="grid gap-1.5">
                <span className="v1-h4" style={{ fontSize: 32, lineHeight: '40px' }}>
                  {t(language, 'อุปกรณ์เสริม', 'Accessories')}
                </span>
                <span className="v1-small">{t(language, 'หูฟัง ลำโพง นาฬิกา ที่ชาร์จ เคส · 16 แบรนด์', 'Audio, watches, chargers, cases · 16 brands')}</span>
              </span>
              <img src="/v1/img/earbuds.webp" alt="" width={600} height={329} loading="lazy" className="v1-card-media h-[120px] w-[220px] object-contain" style={{ ['--v1-tilt' as string]: '0deg' }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Customers() {
  const { language } = useLanguage()
  return (
    <section className="v1-band v1-peri-grid v1-pad-md" aria-labelledby="v1-customers-title">
      <div className="v1-wrap">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow v1-eyebrow-ink">{t(language, '02 · บริการให้ลูกค้า', '02 · CUSTOMER SERVICES')}</p>
            <h2 id="v1-customers-title" className="v1-h2" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)' }}>
              {t(language, 'ให้ลูกค้า', 'Bring customers')}
              <br />
              {t(language, 'กลับมาที่ร้าน', 'back to your store')}
            </h2>
          </div>
          <p className="text-lg leading-[30px] text-[#16233f]" style={{ maxWidth: 380 }}>
            {t(language, 'บริการที่ลูกค้าใช้ซ้ำทุกเดือน ทำได้ที่ร้านคุณ ด้วยรหัสจาก PK HUB', 'Services customers use every month, offered at your counter with a PK HUB code.')}
          </p>
        </div>
        <div className="v1-grid-3 v1-reveal">
          <a href={productRoute(language, 'ais-sim')} className="v1-card v1-card-hover flex min-h-[440px] flex-col justify-between bg-white p-7">
            <span className="grid gap-1.5">
              <span className="v1-h4" style={{ fontSize: 32, lineHeight: '40px' }}>
                {t(language, 'ซิม AIS', 'AIS SIM')}
              </span>
              <span className="v1-small">{t(language, 'ขายซิม รับรีเบตตามแคมเปญ AIS', 'Sell SIMs, earn AIS campaign rebates')}</span>
            </span>
            <span className="flex h-[230px] items-center justify-center rounded-[20px]" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(176,214,90,.33), #f4f4f4 70%)' }}>
              <img src="/v1/img/ais-sim.webp" alt="" width={760} height={324} loading="lazy" className="v1-card-media h-[200px] w-[230px] object-contain" style={{ rotate: '-6deg', ['--v1-tilt' as string]: '-6deg' }} />
            </span>
            <span className="font-medium text-[#2457d6]">{t(language, 'ดูรายละเอียด →', 'Details →')}</span>
          </a>
          <a href={productRoute(language, 'ais-rom')} className="v1-card v1-card-hover flex min-h-[440px] flex-col justify-between bg-[#0b0b0b] p-7 text-white">
            <span className="grid gap-1.5">
              <span className="v1-h4" style={{ fontSize: 32, lineHeight: '40px' }}>
                {t(language, 'เติมเงินออนไลน์', 'Online top-up')}
              </span>
              <span className="text-[15px] leading-6 text-[#bebebe]">{t(language, 'ROM · AIS จ่ายสิ้นเดือน', 'ROM · AIS pays at month end')}</span>
            </span>
            <span className="flex items-end gap-3">
              <span className="v1-num" style={{ fontSize: 'clamp(88px, 8.3vw, 120px)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                3%
              </span>
              <span className="grid gap-0.5 pb-4 text-[15px] leading-[22px]">
                <span className="text-[#a9bef7]">{t(language, 'Tier 3 · เติมให้ลูกค้า', 'Tier 3 · customer top-up')}</span>
                <span className="text-[#bebebe]">1.5% Tier 2 · B2B</span>
              </span>
            </span>
            <span className="font-medium text-[#a9bef7]">{t(language, 'ดูรายละเอียด →', 'Details →')}</span>
          </a>
          <a href={productRoute(language, 'finance')} className="v1-card v1-card-hover flex min-h-[440px] flex-col justify-between bg-white p-7">
            <img src="/v1/brands/sleasing.png" alt="S Leasing" width={437} height={195} loading="lazy" className="h-[60px] w-[190px] object-contain object-left" />
            <span className="v1-h4" style={{ fontSize: 30, lineHeight: '40px' }}>
              {t(language, 'สำหรับทำเรื่องผ่อนมือถือ ดอกเบี้ยเป็นธรรม มีระบบ MDM ในตัว', 'Phone instalments with fair interest and built-in MDM')}
            </span>
            <span className="flex flex-wrap gap-2">
              <span className="v1-chip v1-chip-soft">{t(language, 'อนุมัติ 5–10 นาที', 'Approval in 5–10 min')}</span>
              <span className="v1-chip v1-chip-soft">{t(language, 'ราคาพิเศษจาก PK', 'Special PK prices')}</span>
            </span>
            <span className="font-medium text-[#2457d6]">{t(language, 'ดูรายละเอียด →', 'Details →')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Care() {
  const { language } = useLanguage()
  const faults = [t(language, 'จอแตก', 'Cracked screen'), t(language, 'แบตเสื่อม', 'Worn battery'), t(language, 'ชาร์จไม่เข้า', 'Not charging'), t(language, 'กล้อง', 'Camera')]
  return (
    <section className="v1-band v1-dark v1-pad-md" aria-labelledby="v1-care-title">
      <div className="v1-wrap">
        <div className="v1-section-head">
          <div>
            <p className="v1-eyebrow v1-eyebrow-sky" style={{ letterSpacing: '0.06em', fontSize: 15 }}>
              {t(language, '03 · ดูแลร้าน', '03 · STORE CARE')}
            </p>
            <h2 id="v1-care-title" className="v1-h2" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)' }}>
              {t(language, 'ขายแล้ว', 'After the sale,')}
              <br />
              {t(language, 'มีทีมช่วยดูแล', 'a team to help')}
            </h2>
          </div>
          <p className="v1-lede" style={{ fontSize: 18, color: '#bebebe' }}>
            {t(language, 'หลังการขาย ซ่อมทุกรุ่น และสื่อการตลาดที่กำลังจะมา', 'After-sales, repair for every model, and marketing media on the way.')}
          </p>
        </div>
        <div className="v1-grid-2 v1-reveal" style={{ gap: 20 }}>
          <a
            href={productRoute(language, 'after-sales')}
            className="v1-card v1-card-hover flex min-h-[420px] flex-col justify-end p-8"
            style={{ backgroundImage: 'linear-gradient(180deg, rgba(22,22,22,0) 30%, rgba(22,22,22,.9) 100%), url(/v1/img/shop.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <span className="v1-h3">{t(language, 'หลังการขาย', 'After-sales')}</span>
            <span className="text-base leading-[26px] text-[#dbdfe8]">
              {t(language, 'PK ช่วยประสานงาน หรือส่งต่อศูนย์แบรนด์ · สำนักงานใหญ่ ฉะเชิงเทรา', 'PK coordinates, or hands over to the brand centre · HQ in Chachoengsao')}
            </span>
          </a>
          <div className="grid gap-5">
            <a href={productRoute(language, 'repair')} className="v1-card v1-card-hover flex min-h-[270px] flex-col justify-between bg-[#1b1d21] px-8 py-7">
              <span className="flex items-start justify-between gap-4">
                <span className="grid gap-1.5">
                  <span className="v1-h3">{t(language, 'ซ่อมทุกรุ่น', 'Repair, every model')}</span>
                  <span className="text-base leading-[26px] text-[#bebebe]">{t(language, 'ราคาส่งสำหรับร้าน บวกกำไรเองได้', 'Wholesale prices; you set your own markup')}</span>
                </span>
                <span className="shrink-0 font-medium text-[#a9bef7]">{t(language, 'ดูอาการ →', 'Faults →')}</span>
              </span>
              <span className="flex flex-wrap gap-2">
                {faults.map((fault) => (
                  <span key={fault} className="v1-chip v1-chip-line" style={{ minHeight: 40, fontSize: 15 }}>
                    {fault}
                  </span>
                ))}
                <span className="v1-chip bg-[#2457d6] text-white" style={{ minHeight: 40, fontSize: 15 }}>
                  {t(language, '+ อีก 4 อาการ', '+ 4 more')}
                </span>
              </span>
            </a>
            <a href={productRoute(language, 'partner-marketing')} className="flex min-h-[130px] items-center justify-between gap-4 rounded-[28px] border border-dashed border-white/25 px-8 py-6 transition-colors hover:bg-white/5">
              <span className="grid gap-1">
                <span className="v1-h4">{t(language, 'สื่อการตลาด', 'Marketing media')}</span>
                <span className="text-[15px] text-[#bebebe]">{t(language, 'กำลังเตรียมสำหรับร้านคู่ค้า', 'Being prepared for partner stores')}</span>
              </span>
              <span className="v1-chip v1-chip-white font-semibold" style={{ minHeight: 40 }}>
                {t(language, 'เร็วๆ นี้', 'Coming soon')}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProductsIndexPage() {
  const { language } = useLanguage()
  usePageMeta(getProductsIndexMeta(language))
  return (
    <PageShell>
      <Hub />
      <Sell />
      <Customers />
      <Care />
    </PageShell>
  )
}
