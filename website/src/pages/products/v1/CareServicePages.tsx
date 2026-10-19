import type { ReactNode } from 'react'

import PageShell from '@/components/v1/PageShell'
import SodChatDemo from '@/components/v1/SodChatDemo'
import { ComparePanels, Faq, Related, ServiceHero, StatStrip, Steps } from '@/components/v1/ServiceBlocks'
import { route, t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'

const u = (value: number) => `calc(var(--u) * ${value})`

const FAULT_ICONS: Record<string, ReactNode> = {
  screen: (
    <>
      <rect x="8" y="2" width="16" height="28" rx="3" stroke="#A9BEF7" />
      <path d="M11 9l4 5-3 3 5 6" stroke="#fff" />
    </>
  ),
  battery: (
    <>
      <rect x="5" y="9" width="20" height="14" rx="3" stroke="#A9BEF7" />
      <path d="M25 13h3v6h-3M9 16h5" stroke="#fff" />
    </>
  ),
  charge: <path d="M18 3l-8 14h6l-2 12 8-15h-6z" stroke="#A9BEF7" strokeLinejoin="round" />,
  camera: (
    <>
      <rect x="4" y="9" width="24" height="17" rx="3" stroke="#A9BEF7" />
      <circle cx="16" cy="17.5" r="5" stroke="#fff" />
      <path d="M11 9l2-3h6l2 3" stroke="#A9BEF7" />
    </>
  ),
  speaker: (
    <>
      <path d="M6 12h5l7-6v20l-7-6H6z" stroke="#A9BEF7" strokeLinejoin="round" />
      <path d="M22 11a7 7 0 0 1 0 10" stroke="#fff" />
    </>
  ),
  back: (
    <>
      <rect x="8" y="2" width="16" height="28" rx="3" stroke="#A9BEF7" />
      <rect x="11" y="5" width="6" height="6" rx="1.5" stroke="#fff" />
    </>
  ),
  button: <path d="M16 5a9 9 0 0 0-9 9v4M25 18v-4a9 9 0 0 0-5-8M12 26v-9a4 4 0 0 1 8 0v4M16 17v10" stroke="#A9BEF7" strokeLinecap="round" />,
  power: (
    <>
      <path d="M16 4v11" stroke="#fff" strokeLinecap="round" />
      <path d="M10 8a10 10 0 1 0 12 0" stroke="#A9BEF7" strokeLinecap="round" />
    </>
  ),
}

export function AfterSalesPage({ focus }: { focus: 'after-sales' | 'repair' }) {
  const { language } = useLanguage()
  const faults: Array<[keyof typeof FAULT_ICONS, string]> = [
    ['screen', t(language, 'จอแตก จอเสีย', 'Cracked or faulty screen')],
    ['battery', t(language, 'แบตเตอรี่เสื่อม', 'Worn battery')],
    ['charge', t(language, 'ชาร์จไม่เข้า', 'Not charging')],
    ['camera', t(language, 'กล้องเสีย', 'Camera fault')],
    ['speaker', t(language, 'ลำโพงและไมค์', 'Speaker and mic')],
    ['back', t(language, 'ฝาหลังแตก', 'Cracked back')],
    ['button', t(language, 'ปุ่มและสแกนนิ้ว', 'Buttons and fingerprint')],
    ['power', t(language, 'เปิดไม่ติด', 'Will not power on')],
  ]
  const repair = focus === 'repair'
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'ดูแลร้าน', 'Store care')}
        eyebrow={repair ? t(language, 'ซ่อมทุกรุ่น · ราคาส่ง', 'REPAIR · WHOLESALE PRICES') : t(language, 'หลังการขายและซ่อม', 'AFTER-SALES AND REPAIR')}
        title={
          repair ? (
            <>
              {t(language, 'ซ่อมได้ทุกรุ่น', 'Repairs for every model,')}
              <br />
              {t(language, 'ร้านบวกกำไรเอง', 'your own markup')}
            </>
          ) : (
            <>
              {t(language, 'ขายแล้ว', 'After the sale,')}
              <br />
              {t(language, 'ไม่ต้องดูแลคนเดียว', 'you are not alone')}
            </>
          )
        }
        lede={t(
          language,
          'ให้ PK ช่วยประสานงานหลังการขาย หรือเลือกติดต่อศูนย์บริการของแบรนด์โดยตรง งานซ่อมยืนยันขอบเขตและค่าใช้จ่ายก่อนรับงาน',
          'Let PK coordinate after-sales, or contact the brand service centre directly. Repair scope and cost are confirmed before work starts.',
        )}
        secondary={repair ? { href: '#v1-faults', label: t(language, 'ดูอาการที่รับซ่อม ↓', 'See repairable faults ↓') } : undefined}
        visualLabel={t(language, 'ชั้นของโทรศัพท์และชิ้นส่วนที่ซ่อม', 'Phone layers and repair parts')}
        visual={
          <>
            <div className="rounded-[30px] bg-[#2a2d33]" style={{ left: u(250), top: u(90), width: u(170), height: u(300), rotate: '-14deg', transformOrigin: '0 0' }} />
            <div className="flex items-center justify-center rounded-[30px] bg-[#1b1d21]" style={{ left: u(200), top: u(80), width: u(170), height: u(300), rotate: '-14deg', transformOrigin: '0 0' }}>
              <span className="block rounded-xl border border-white/20" style={{ width: u(96), height: u(150), padding: u(6) }}>
                <span className="block h-[60%] w-full rounded-md bg-[#2457d6]" />
              </span>
            </div>
            <div className="v1-float rounded-[30px] bg-gradient-to-br from-[#4a5a9a] to-[#1b1e2a] shadow-[0_30px_70px_rgba(0,0,0,.53)]" style={{ left: u(140), top: u(70), width: u(170), height: u(300), rotate: '-14deg', transformOrigin: '0 0' }} />
            <span className="v1-float-2 flex items-center rounded-full bg-white font-medium text-[#0a0a0a]" style={{ left: u(40), top: u(120), height: u(40), padding: `0 ${u(16)}`, fontSize: u(14) }}>
              {t(language, 'จอ', 'Screen')}
            </span>
            <span className="v1-float-3 flex items-center rounded-full bg-[#2457d6] font-medium text-white" style={{ left: u(430), top: u(110), height: u(40), padding: `0 ${u(16)}`, fontSize: u(14) }}>
              {t(language, 'แบตเตอรี่', 'Battery')}
            </span>
            <span className="v1-float flex items-center rounded-full bg-[#1b1d21] text-white" style={{ left: u(460), top: u(300), height: u(40), padding: `0 ${u(16)}`, fontSize: u(14) }}>
              {t(language, 'ฝาหลัง', 'Back glass')}
            </span>
            <span className="flex items-center rounded-full bg-[#1b1d21] text-white" style={{ left: u(40), top: u(360), height: u(48), gap: u(10), padding: `0 ${u(20)}`, fontSize: u(15) }}>
              <span className="block rounded-full bg-[#7ed957]" style={{ width: u(10), height: u(10) }} aria-hidden="true" />
              {t(language, 'แจ้งราคาก่อนเริ่มซ่อม', 'Price confirmed before repair')}
            </span>
          </>
        }
      />
      <Steps
        band
        title={t(language, 'เมื่อลูกค้ากลับมาพร้อมปัญหา', 'When a customer comes back with a problem')}
        note={t(language, 'ร้านเลือกได้ว่าจะให้ PK ช่วย หรือติดต่อศูนย์แบรนด์เอง', 'Choose whether PK helps or you contact the brand centre yourself')}
        steps={[
          { title: t(language, 'แจ้งทีม PK', 'Tell the PK team'), body: t(language, 'บอกรุ่น อาการ และวันที่ซื้อ', 'Model, fault and purchase date') },
          { title: t(language, 'เลือกทางที่เหมาะ', 'Pick the route'), body: t(language, 'ประสานงานผ่าน PK หรือไปศูนย์แบรนด์', 'Coordinate through PK or go to the brand centre') },
          { title: t(language, 'ยืนยันก่อนรับงาน', 'Confirm before work'), body: t(language, 'งานซ่อมแจ้งขอบเขตและค่าใช้จ่ายก่อนเสมอ', 'Repair scope and cost are always confirmed first') },
          { title: t(language, 'ร้านแจ้งลูกค้า', 'You update the customer'), body: t(language, 'ร้านยังเป็นคนคุยกับลูกค้าเหมือนเดิม', 'Your store still owns the customer conversation') },
        ]}
      />
      <ComparePanels
        eyebrow={t(language, 'สองทางเลือก', 'Two options')}
        title={t(language, 'ประสานงาน หรือซ่อม', 'Coordinate, or repair')}
        light={{
          title: t(language, 'หลังการขาย', 'After-sales'),
          tag: t(language, 'ทีม PK', 'PK team'),
          rows: [
            [t(language, 'ประสานงานหลังการขาย', 'After-sales coordination'), t(language, 'ทีม PK ช่วย', 'PK helps')],
            [t(language, 'หรือศูนย์บริการแบรนด์', 'Or the brand centre'), t(language, 'ร้านติดต่อเอง', 'You contact them')],
          ],
          note: t(language, 'ร้านเลือกทางที่สะดวกในแต่ละเคส', 'Choose what suits each case'),
        }}
        dark={{
          title: t(language, 'บริการซ่อม', 'Repair service'),
          tag: t(language, 'ดูแลและซ่อม', 'Care and repair'),
          rows: [
            [t(language, 'ขอบเขตงาน', 'Scope'), t(language, 'ยืนยันก่อนรับงาน', 'Confirmed before work')],
            [t(language, 'ค่าใช้จ่าย', 'Cost'), t(language, 'ยืนยันก่อนรับงาน', 'Confirmed before work')],
            [t(language, 'อุปกรณ์ที่รับซ่อม', 'Devices'), t(language, 'ทุกรุ่น', 'Every model')],
          ],
          note: t(language, 'ร้านรู้ค่าใช้จ่ายก่อนตกลงทุกครั้ง', 'You always know the cost before agreeing'),
        }}
        dots={[t(language, 'ร้านติดต่อศูนย์บริการของแบรนด์โดยตรงได้เสมอ', 'You can always contact the brand service centre directly')]}
      />
      <section id="v1-faults" className="v1-dark v1-pad scroll-mt-20" aria-labelledby="v1-faults-title">
        <div className="v1-wrap v1-reveal">
          <div className="v1-section-head">
            <div>
              <p className="v1-eyebrow v1-eyebrow-sky">{t(language, 'บริการซ่อม', 'Repair service')}</p>
              <h2 id="v1-faults-title" className="v1-h2" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)' }}>
                {t(language, 'ซ่อมได้ทุกรุ่น', 'Every model repaired,')}
                <br />
                {t(language, 'ราคาส่งสำหรับร้าน', 'at wholesale prices')}
              </h2>
            </div>
            <p className="v1-lede" style={{ fontSize: 18, color: '#bebebe' }}>
              {t(language, 'อาการยอดนิยมในราคาที่ร้านบวกกำไรเองได้ ดูราคาล่าสุดในระบบคู่ค้า', 'Popular faults at prices you can mark up. See the latest prices in the partner system.')}
            </p>
          </div>
          <ul className="v1-faults">
            {faults.map(([icon, label]) => (
              <li key={icon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" strokeWidth="1.6" aria-hidden="true">
                  {FAULT_ICONS[icon]}
                </svg>
                <span className="flex items-end justify-between gap-3">
                  <span className="v1-h4" style={{ fontSize: 24 }}>
                    {label}
                  </span>
                  <span className="shrink-0 text-sm text-[#a9bef7]">{t(language, 'ราคาส่ง', 'Wholesale')}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="v1-formula">
            <span>{t(language, 'ราคาส่งจาก PK', 'PK wholesale price')}</span>
            <span className="text-[#a9bef7]">+</span>
            <span>{t(language, 'กำไรที่ร้านกำหนด', 'your markup')}</span>
            <span className="text-[#a9bef7]">=</span>
            <strong>{t(language, 'ราคาที่ลูกค้าจ่าย', 'customer price')}</strong>
          </p>
          <dl className="v1-grid-3 mt-6">
            {[
              [t(language, 'ส่งเครื่องที่ไหน', 'Where to send'), t(language, 'สำนักงานใหญ่ PK HUB ฉะเชิงเทรา หรือจุดรับที่ทีมกำหนด', 'PK HUB headquarters in Chachoengsao, or a drop-off point the team names')],
              [t(language, 'ใช้เวลานานแค่ไหน', 'How long'), t(language, 'ขึ้นกับอาการ ทีมแจ้งก่อนรับงาน', 'Depends on the fault; the team tells you before accepting')],
              [t(language, 'ค่าใช้จ่าย', 'Cost'), t(language, 'ยืนยันขอบเขตและราคาก่อนเริ่มซ่อม', 'Scope and price confirmed before repair')],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1.5 border-t border-white/15 pt-5">
                <dt className="text-[15px] text-[#a9bef7]">{label}</dt>
                <dd className="text-lg leading-[30px]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Faq
        items={[
          [t(language, 'รู้ค่าซ่อมตอนไหน', 'When do I know the repair cost?'), t(language, 'ก่อนรับงานทุกครั้ง ทีมยืนยันขอบเขตงานและค่าใช้จ่ายให้ร้านก่อน', 'Before every job. The team confirms scope and cost with your store first.')],
          [t(language, 'ส่งเครื่องมาซ่อมที่ไหน', 'Where do I send devices?'), t(language, 'สำนักงานใหญ่ PK HUB 72/29-30 ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา 24000 (จันทร์–เสาร์ 8:00–17:00) หรือจุดรับที่ทีมกำหนด', 'PK HUB headquarters, 72/29-30 Na Mueang, Mueang Chachoengsao 24000 (Mon–Sat 8:00–17:00), or a drop-off point the team names.')],
          [t(language, 'ใช้เวลาซ่อมกี่วัน', 'How many days does a repair take?'), t(language, 'ขึ้นกับอาการ ทีมแจ้งระยะเวลาก่อนรับงาน', 'It depends on the fault. The team tells you before accepting the job.')],
          [t(language, 'ร้านบวกกำไรเองได้ไหม', 'Can I add my own markup?'), t(language, 'ได้ ราคาจาก PK เป็นราคาส่ง ร้านกำหนดกำไรและราคาที่ลูกค้าจ่ายเอง', 'Yes. PK prices are wholesale; you set your markup and the customer price.')],
        ]}
      />
      <Related
        items={[
          { slug: 'finance', title: 'S Leasing', body: t(language, 'รับสมัครผ่อนที่ร้าน', 'Instalment sign-ups in store') },
          { slug: 'accessories', title: t(language, 'อุปกรณ์เสริม', 'Accessories'), body: t(language, 'ขายพ่วงหลังซ่อมเสร็จ', 'Add-on sales after a repair') },
          { slug: 'stock-on-demand', title: 'Stock on Demand', body: t(language, 'หารุ่นที่ไม่มีหน้าร้าน', 'Find models you do not stock') },
        ]}
      />
    </PageShell>
  )
}

export function StockOnDemandV1() {
  const { language } = useLanguage()
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'ขายได้มากขึ้น', 'Sell more')}
        eyebrow="STOCK ON DEMAND"
        title={
          <>
            {t(language, 'ไม่มีที่ร้าน', 'Not in your store?')}
            <br />
            {t(language, 'ให้ PK ช่วยหา', 'PK will find it')}
          </>
        }
        lede={t(
          language,
          'ส่งคำขอรุ่นที่ไม่มีหน้าร้าน ทีม PK เช็กสินค้า ราคา และรอบส่งให้ ร้านยืนยันก่อนสั่งซื้อทุกครั้ง',
          'Request models you do not stock. PK checks availability, price and dispatch; you always confirm before ordering.',
        )}
        stageClass="v1-stage-auto"
        visualLabel={t(language, 'ภาพอธิบายบริการ: ตัวอย่างแชตคำขอสินค้า', 'Service illustration: example product request chat')}
        visual={
          <SodChatDemo tone="glass" />
        }
      />
      <StatStrip
        items={[
          [t(language, 'ทุกแบรนด์', 'All brands'), t(language, 'ส่งคำขอได้ทุกรุ่นที่ลูกค้าถามหา', 'Request any model customers ask for')],
          ['24/7', t(language, 'ทีมสแตนด์บายรับคำขอทุกวัน', 'Team on standby every day')],
          [t(language, '1–2 วัน', '1–2 days'), t(language, 'เตรียมสินค้า', 'to prepare')],
          [t(language, '1–2 วัน', '1–2 days'), t(language, 'จัดส่งถึงปลายทาง', 'to deliver')],
        ]}
      />
      <Steps
        title={t(language, '4 ขั้น จากคำถามถึงของในมือลูกค้า', '4 steps from question to customer’s hands')}
        note={t(language, 'คำขอยังไม่ใช่การสั่งซื้อ ร้านเห็นราคาและรอบส่งก่อนตัดสินใจเสมอ', 'A request is not an order. You always see price and dispatch before deciding.')}
        steps={[
          { title: t(language, 'ลูกค้าถามหา', 'A customer asks'), body: t(language, 'รุ่นหรือสีที่ไม่มีหน้าร้าน ร้านยังดูแลลูกค้าเองเหมือนเดิม', 'For a model or colour you do not stock; you still own the customer') },
          { title: t(language, 'ร้านส่งคำขอ', 'You send a request'), body: t(language, 'แจ้งรุ่น สี และจำนวนให้ทีม PK ทางระบบคู่ค้าหรือ LINE', 'Model, colour and quantity, via the partner system or LINE') },
          { title: t(language, 'PK เช็กและเสนอ', 'PK checks and quotes'), body: t(language, 'แจ้งว่ามีสินค้าไหม ราคาเท่าไร และส่งรอบไหน', 'Availability, price and dispatch slot') },
          { title: t(language, 'ร้านยืนยัน', 'You confirm'), body: t(language, 'ตกลงราคาและปลายทาง แล้วจึงสั่งซื้อ', 'Agree price and destination, then order') },
        ]}
      />
      <ComparePanels
        eyebrow={t(language, 'ปลายทางและค่าใช้จ่าย', 'Destination and costs')}
        title={t(language, 'เลือกได้ว่าจะส่งที่ไหน', 'Choose where it ships')}
        light={{
          title: t(language, 'ส่งเข้าร้าน', 'Ship to your store'),
          tag: t(language, 'ไม่มีค่าบริการเพิ่ม', 'No extra service fee'),
          rows: [
            [t(language, 'ราคาส่ง', 'Wholesale price'), t(language, 'ตามรุ่น', 'Per model')],
            [t(language, '+ ค่าจัดส่ง', '+ Shipping'), t(language, 'คิดตามจริง', 'Actual cost')],
          ],
          note: t(language, 'ร้านรับของแล้วส่งมอบให้ลูกค้าเอง', 'You receive it and hand it to the customer'),
        }}
        dark={{
          title: t(language, 'ส่งตรงถึงลูกค้า', 'Ship to your customer'),
          tag: 'Direct Fulfillment',
          rows: [
            [t(language, 'ราคาส่ง', 'Wholesale price'), t(language, 'ตามรุ่น', 'Per model')],
            [t(language, '+ ค่าบริการ Direct Fulfillment', '+ Direct Fulfillment fee'), t(language, 'ยืนยันก่อนใช้', 'Confirmed before use')],
            [t(language, '+ ค่าจัดส่งจริง', '+ Actual shipping'), t(language, 'ตามปลายทาง', 'By destination')],
          ],
          note: t(language, 'PK ส่งถึงลูกค้าของร้านตามข้อตกลง', 'PK delivers to your customer as agreed'),
        }}
        dots={[
          t(language, 'PK ไม่แบ่งเปอร์เซ็นต์จากกำไรขายปลีกของร้าน', 'PK takes no share of your retail margin'),
          t(language, 'ไม่มีเก็บเงินปลายทาง', 'No cash on delivery'),
          t(language, 'ค่าจัดส่งคิดตามจริง', 'Shipping charged at actual cost'),
        ]}
      />
      <Faq
        items={[
          [t(language, 'ทีมตอบและส่งของเร็วแค่ไหน', 'How fast does the team reply and ship?'), t(language, 'ทีมสแตนด์บาย 24 ชั่วโมงทุกวัน เตรียมสินค้า 1–2 วัน และจัดส่งอีก 1–2 วัน ใช้ได้กับทุกแบรนด์', 'The team is on standby 24 hours a day. Preparation takes 1–2 days and delivery another 1–2 days, for every brand.')],
          [t(language, 'ส่งคำขอแล้ว ถือว่าสั่งซื้อเลยไหม', 'Is a request an order?'), t(language, 'ยังไม่ใช่ คำขอเป็นการให้ทีมเช็กก่อน ร้านเห็นราคาและรอบส่ง แล้วจึงยืนยันสั่งซื้อ', 'No. A request asks the team to check first; you see price and dispatch, then confirm the order.')],
          [t(language, 'ค่าจัดส่งคิดอย่างไร', 'How is shipping charged?'), t(language, 'คิดตามจริงตามปลายทาง และไม่มีบริการเก็บเงินปลายทาง', 'At actual cost by destination. Cash on delivery is not available.')],
          [t(language, 'ส่งตรงถึงลูกค้าของร้านได้ไหม', 'Can PK ship straight to my customer?'), t(language, 'ได้ ด้วยบริการ Direct Fulfillment มีค่าบริการที่ยืนยันกับร้านก่อนใช้ บวกค่าจัดส่งจริง', 'Yes, with Direct Fulfillment. Its fee is confirmed with you before use, plus actual shipping.')],
        ]}
      />
      <Related
        items={[
          { slug: 'handset-wholesale', title: t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets'), body: t(language, 'สั่งเข้าร้านตามที่ขายจริง', 'Stock what actually sells') },
          { slug: 'accessories', title: t(language, 'อุปกรณ์เสริม', 'Accessories'), body: t(language, 'ขายพ่วงกับเครื่องที่ลูกค้าซื้อ', 'Add-ons with every device') },
          { slug: 'after-sales', title: t(language, 'หลังการขายและซ่อม', 'After-sales and repair'), body: t(language, 'ซ่อมทุกรุ่น ราคาส่ง', 'Every model, wholesale prices') },
        ]}
      />
    </PageShell>
  )
}

export function PartnerMarketingV1() {
  const { language } = useLanguage()
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'ดูแลร้าน', 'Store care')}
        eyebrow={t(language, 'สื่อการตลาด · เร็วๆ นี้', 'MARKETING MEDIA · COMING SOON')}
        title={
          <>
            {t(language, 'สื่อพร้อมขาย', 'Ready-to-use media,')}
            <br />
            {t(language, 'กำลังจะมา', 'coming soon')}
          </>
        }
        lede={t(
          language,
          'เรากำลังเตรียมสื่อการตลาดสำหรับร้านคู่ค้า ฟรี ไม่มีขั้นต่ำการสั่งซื้อ สมัครเป็นคู่ค้าไว้ก่อน แล้วเราจะแจ้งเมื่อพร้อมใช้',
          'We are preparing marketing media for partner stores: free, with no minimum order. Join now and we will tell you when it is ready.',
        )}
        secondary={{ href: route(language, '/products'), label: t(language, 'ดูบริการอื่น →', 'See other services →') }}
        visualLabel={t(language, 'การ์ดสื่อที่กำลังเตรียม', 'Media cards being prepared')}
        visual={
          <div style={{ inset: 0 }} className="flex items-center justify-center">
            <div className="relative" style={{ width: u(420), height: u(330) }}>
              <div className="absolute rounded-[20px] bg-white/[.08]" style={{ left: u(30), top: u(40), width: u(180), height: u(240), rotate: '-10deg', transformOrigin: '0 0' }} />
              <div className="absolute rounded-[20px] bg-white/[.08]" style={{ left: u(210), top: u(40), width: u(180), height: u(240), rotate: '10deg', transformOrigin: '0 0' }} />
              <div className="v1-float absolute flex flex-col justify-end rounded-[20px] bg-gradient-to-br from-[#2457d6] to-[#1d2a4d] shadow-[0_30px_70px_rgba(0,0,0,.53)]" style={{ left: u(120), top: u(20), width: u(180), height: u(260), padding: u(20), gap: u(8) }}>
                <span className="block rounded-md bg-white/40" style={{ height: u(10), width: u(110) }} />
                <span className="block rounded-md bg-white/25" style={{ height: u(10), width: u(80) }} />
              </div>
              <span className="absolute flex items-center rounded-full bg-white font-semibold text-[#0a0a0a]" style={{ left: u(140), top: u(270), height: u(48), padding: `0 ${u(22)}`, fontSize: u(16) }}>
                {t(language, 'เร็วๆ นี้', 'Coming soon')}
              </span>
            </div>
          </div>
        }
      />
      <div className="v1-band v1-white pt-[clamp(56px,6.6vw,96px)]">
        <Related
          title={t(language, 'ระหว่างนี้ ลองดูบริการอื่น', 'Meanwhile, explore other services')}
          items={[
            { slug: 'stock-on-demand', title: 'Stock on Demand', body: t(language, 'หารุ่นที่ไม่มีหน้าร้าน', 'Find models you do not stock') },
            { slug: 'handset-wholesale', title: t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets'), body: t(language, 'สั่งเข้าร้านตามที่ขายจริง', 'Stock what actually sells') },
            { slug: 'after-sales', title: t(language, 'หลังการขายและซ่อม', 'After-sales and repair'), body: t(language, 'ทีมช่วยเมื่อลูกค้ากลับมา', 'Help when customers come back') },
          ]}
        />
      </div>
    </PageShell>
  )
}
