import PageShell from '@/components/v1/PageShell'
import { ComparePanels, Faq, Related, ServiceHero, StatStrip, Steps } from '@/components/v1/ServiceBlocks'
import { t } from '@/components/v1/site'
import { useLanguage } from '@/i18n/LanguageContext'

const u = (value: number) => `calc(var(--u) * ${value})`

function Badge({ left, top, size, value, label, tone }: { left: number; top: number; size: number; value: string; label: string; tone: 'cobalt' | 'white' }) {
  return (
    <div
      className={`v1-float-2 flex flex-col items-center justify-center rounded-full ${tone === 'cobalt' ? 'bg-[#2457d6] text-white shadow-[0_20px_50px_rgba(36,87,214,.4)]' : 'bg-white text-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,.33)]'}`}
      style={{ left: u(left), top: u(top), width: u(size), height: u(size) }}
    >
      <span className="v1-num" style={{ fontSize: u(size > 130 ? 52 : 36), lineHeight: 1.08 }}>
        {value}
      </span>
      <span className={tone === 'cobalt' ? 'text-[#dce5ff]' : 'text-[#606060]'} style={{ fontSize: u(14) }}>
        {label}
      </span>
    </div>
  )
}

function StatusPill({ left, top, label }: { left: number; top: number; label: string }) {
  return (
    <div className="flex items-center rounded-full bg-[#1b1d21] text-white" style={{ left: u(left), top: u(top), height: u(48), gap: u(10), padding: `0 ${u(20)}`, fontSize: u(15) }}>
      <span className="block rounded-full bg-[#7ed957]" style={{ width: u(10), height: u(10) }} aria-hidden="true" />
      {label}
    </div>
  )
}

export function SimPage() {
  const { language } = useLanguage()
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'บริการให้ลูกค้า', 'Customer services')}
        eyebrow={t(language, 'AIS · ซิม', 'AIS · SIM')}
        title={
          <>
            {t(language, 'ขายซิม AIS', 'Sell AIS SIMs,')}
            <br />
            {t(language, 'รับรีเบต', 'earn rebates')}
          </>
        }
        lede={t(
          language,
          'สมัครกับ PK HUB เพื่อรับรหัสตัวแทน แล้วขายซิม AIS ที่ร้าน ซิมที่ขายและเปิดใช้ด้วยการเติมเงินเข้าซิม นับเป็นยอดรีเบตตามแคมเปญของ AIS',
          'Join PK HUB to get a dealer code and sell AIS SIMs in your store. A SIM sold and activated with a top-up counts toward the rebate under AIS campaigns.',
        )}
        visualLabel={t(language, 'ซิมการ์ดและป้ายรีเบต', 'SIM card with rebate badge')}
        visual={
          <>
            <div
              className="v1-float flex flex-col justify-between bg-gradient-to-br from-white to-[#e9edf6] text-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,.4)]"
              style={{ left: u(150), top: u(70), width: u(240), height: u(300), padding: u(28), rotate: '-8deg', transformOrigin: '0 0', borderRadius: `${u(28)} ${u(72)} ${u(28)} ${u(28)}` }}
            >
              <span className="font-display font-semibold" style={{ fontSize: u(20) }}>
                SIM
              </span>
              <span className="grid grid-cols-2 bg-gradient-to-br from-[#e5c76b] to-[#b8923a]" style={{ width: u(96), height: u(76), padding: u(10), gap: u(4), borderRadius: u(12) }} aria-hidden="true">
                {[0, 1, 2, 3].map((cell) => (
                  <span key={cell} className="border border-black/20" style={{ borderRadius: u(4) }} />
                ))}
              </span>
              <span className="text-[#606060]" style={{ fontSize: u(14) }}>
                {t(language, 'เปิดใช้ด้วยการเติมเงิน', 'Activated with a top-up')}
              </span>
            </div>
            <Badge left={390} top={56} size={150} value={t(language, 'รีเบต', 'Rebate')} label={t(language, 'ตามแคมเปญ', 'per campaign')} tone="cobalt" />
            <StatusPill left={40} top={340} label={t(language, 'แคมเปญส่วนใหญ่รอบละไตรมาส', 'Most campaigns run quarterly')} />
          </>
        }
      />
      <StatStrip
        items={[
          [t(language, 'รหัสตัวแทน', 'Dealer code'), t(language, 'สมัครรับจาก PK HUB', 'Issued by PK HUB')],
          [t(language, 'เติมเงินเข้าซิม', 'Top-up'), t(language, 'เปิดใช้แล้วจึงนับยอด', 'Counts once activated')],
          [t(language, 'ทุกไตรมาส', 'Quarterly'), t(language, 'แคมเปญรีเบตส่วนใหญ่', 'Most rebate campaigns')],
          [t(language, 'ตาม AIS', 'Set by AIS'), t(language, 'อัตรารีเบตกำหนดตามแคมเปญ', 'Rebate rates follow each campaign')],
        ]}
      />
      <Steps
        title={t(language, 'เริ่มขายได้ใน 4 ขั้น', 'Start selling in 4 steps')}
        note={t(language, 'ต้องมีรหัสตัวแทนจาก PK HUB ก่อนเริ่มขาย', 'You need a PK HUB dealer code before you start')}
        steps={[
          { title: t(language, 'สมัครกับ PK HUB', 'Join PK HUB'), body: t(language, 'ฝากข้อมูลร้าน ทีมช่วยเปิดรหัสให้', 'Leave your store details; the team sets up your code') },
          { title: t(language, 'รับรหัสตัวแทน', 'Get your dealer code'), body: t(language, 'ใช้ขายและเปิดซิม AIS ที่ร้าน', 'Use it to sell and open AIS SIMs in store') },
          { title: t(language, 'ขายและเปิดใช้', 'Sell and activate'), body: t(language, 'ลูกค้าเปิดใช้ด้วยการเติมเงินเข้าซิม นับเป็นยอดรีเบต', 'The customer activates with a top-up, which counts toward the rebate') },
          { title: t(language, 'รับรีเบต', 'Receive the rebate'), body: t(language, 'ตามรอบแคมเปญของ AIS', 'On the AIS campaign cycle') },
        ]}
      />
      <Faq
        items={[
          [t(language, 'ซิมนับยอดรีเบตเมื่อไร', 'When does a SIM count toward the rebate?'), t(language, 'เมื่อซิมถูกซื้อและเปิดใช้ด้วยการเติมเงินเข้าซิมนั้น รีเบตเป็นไปตามแคมเปญของ AIS ซึ่งส่วนใหญ่มีรอบละไตรมาส', 'When the SIM is bought and activated with a top-up. Rebates follow AIS campaigns, most of which run quarterly.')],
          [t(language, 'รีเบตแต่ละแคมเปญเท่าไร', 'How much is each campaign rebate?'), t(language, 'อัตรารีเบตกำหนดโดย AIS ในแต่ละแคมเปญ สอบถามแคมเปญที่เปิดอยู่กับทีม PK HUB', 'AIS sets the rate for each campaign. Ask the PK HUB team about the current campaign.')],
          [t(language, 'รีเบตจ่ายเมื่อไร', 'When is the rebate paid?'), t(language, 'ตามรอบแคมเปญของ AIS', 'On the AIS campaign cycle.')],
          [t(language, 'ต้องมีรหัสตัวแทนก่อนไหม', 'Do I need a dealer code first?'), t(language, 'ต้องมี สมัครกับ PK HUB เพื่อรับรหัสตัวแทนก่อนเริ่มขาย', 'Yes. Join PK HUB to get a dealer code before you start selling.')],
        ]}
      />
      <Related
        items={[
          { slug: 'ais-rom', title: t(language, 'เติมเงินออนไลน์ (ROM)', 'Online top-up (ROM)'), body: t(language, 'อีกบริการหนึ่ง รับสูงสุด 3%', 'A separate service, up to 3%') },
          { slug: 'handset-wholesale', title: t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets'), body: t(language, 'ขายพ่วงกับซิมใหม่', 'Sell with a new SIM') },
          { slug: 'finance', title: 'S Leasing', body: t(language, 'รับสมัครผ่อนที่ร้าน', 'Instalment sign-ups in store') },
        ]}
      />
    </PageShell>
  )
}

export function RomPage() {
  const { language } = useLanguage()
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'บริการให้ลูกค้า', 'Customer services')}
        eyebrow={t(language, 'AIS · เติมเงินออนไลน์ (ROM)', 'AIS · ONLINE TOP-UP (ROM)')}
        title={
          <>
            {t(language, 'เติมเงินออนไลน์', 'Online top-up,')}
            <br />
            {t(language, 'รับสูงสุด 3%', 'earn up to 3%')}
          </>
        }
        lede={t(
          language,
          'สมัครกับ PK HUB เพื่อรับรหัส ROM แล้วเติมเงินให้ลูกค้าหรือร้านอื่น รับค่าตอบแทนตามยอดเติม AIS จ่ายสิ้นเดือน',
          'Join PK HUB to get a ROM code, then top up for customers or other stores. You earn on the top-up amount; AIS pays at month end.',
        )}
        visualLabel={t(language, 'ใบเสร็จเติมเงินและอัตราค่าตอบแทน', 'Top-up receipt with commission rates')}
        visual={
          <>
            <div
              className="v1-float flex flex-col bg-gradient-to-br from-white to-[#e9edf6] text-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,.4)]"
              style={{ left: u(110), top: u(60), width: u(270), height: u(320), padding: u(28), gap: u(14), rotate: '-6deg', transformOrigin: '0 0', borderRadius: u(28) }}
            >
              <span className="font-medium text-[#2457d6]" style={{ fontSize: u(14) }}>
                {t(language, 'เติมเงินออนไลน์ · ROM', 'Online top-up · ROM')}
              </span>
              <span className="text-[#606060]" style={{ fontSize: u(14) }}>
                {t(language, 'เบอร์ลูกค้า 08X-XXX-XXXX', 'Customer number 08X-XXX-XXXX')}
              </span>
              <span className="v1-num" style={{ fontSize: u(56), lineHeight: 1.1 }}>
                ฿300
              </span>
              <span className="block h-px bg-[#d4d9e6]" aria-hidden="true" />
              <span className="flex justify-between" style={{ fontSize: u(15) }}>
                <span className="text-[#606060]">{t(language, 'ร้านได้รับ (Tier 3)', 'Store earns (Tier 3)')}</span>
                <span className="font-semibold">3%</span>
              </span>
              <span className="mt-auto flex items-center justify-center rounded-full bg-[#2457d6] font-semibold text-white" style={{ height: u(44), fontSize: u(15) }}>
                {t(language, 'เติมสำเร็จ', 'Top-up complete')}
              </span>
            </div>
            <Badge left={390} top={56} size={150} value="3%" label="Tier 3" tone="cobalt" />
            <Badge left={470} top={230} size={116} value="1.5%" label="Tier 2" tone="white" />
            <StatusPill left={40} top={340} label={t(language, 'AIS จ่ายค่าตอบแทนสิ้นเดือน', 'AIS pays at month end')} />
          </>
        }
      />
      <StatStrip
        items={[
          ['3%', t(language, 'เติมเงินให้ลูกค้าทั่วไป (Tier 3)', 'Top-ups for customers (Tier 3)')],
          ['1.5%', t(language, 'เติมให้ร้านอื่น (Tier 2)', 'Top-ups for other stores (Tier 2)')],
          [t(language, 'สิ้นเดือน', 'Month end'), t(language, 'AIS จ่ายค่าตอบแทนเติมเงิน', 'AIS pays top-up commission')],
          ['30,000+', t(language, 'บาท/เดือน ยอดเติมของ Tier 2', 'THB/month Tier 2 top-up volume')],
        ]}
      />
      <Steps
        title={t(language, 'เริ่มเติมเงินได้ใน 4 ขั้น', 'Start topping up in 4 steps')}
        note={t(language, 'Tier แยกร้านเติมเงินรายใหญ่กับรายย่อย ไม่ใช่ระดับขั้น', 'Tiers separate large and small top-up stores; they are not ranks')}
        steps={[
          { title: t(language, 'สมัครกับ PK HUB', 'Join PK HUB'), body: t(language, 'ฝากข้อมูลร้าน ทีมช่วยเปิดรหัสให้', 'Leave your store details; the team sets up your code') },
          { title: t(language, 'รับรหัส ROM', 'Get your ROM code'), body: t(language, 'ใช้เติมเงินออนไลน์ AIS', 'Use it for AIS online top-ups') },
          { title: t(language, 'เติมเงิน', 'Top up'), body: t(language, 'ให้ลูกค้าหน้าร้าน (Tier 3) หรือให้ร้านอื่น (Tier 2)', 'For walk-in customers (Tier 3) or for other stores (Tier 2)') },
          { title: t(language, 'รับค่าตอบแทน', 'Get paid'), body: t(language, 'AIS จ่ายสิ้นเดือน', 'AIS pays at month end') },
        ]}
      />
      <ComparePanels
        eyebrow={t(language, 'เติมเงินออนไลน์ (ROM)', 'Online top-up (ROM)')}
        title={t(language, 'ร้านแบบไหน ได้เท่าไร', 'Which store earns what')}
        light={{
          title: t(language, 'เติมให้ลูกค้า', 'For customers'),
          tag: 'Tier 3',
          rows: [
            [t(language, 'ค่าตอบแทน', 'Commission'), t(language, '3% ของยอดเติม', '3% of top-up')],
            [t(language, 'เหมาะกับ', 'Best for'), t(language, 'ร้านที่เติมให้ลูกค้าหน้าร้าน', 'Stores topping up walk-in customers')],
          ],
          note: t(language, 'อยู่กับ PK HUB โดยตรงได้ ไม่ต้องผ่าน Tier 2', 'Can work with PK HUB directly, without a Tier 2 store'),
        }}
        dark={{
          title: t(language, 'เติมให้ร้านอื่น (B2B)', 'For other stores (B2B)'),
          tag: 'Tier 2',
          rows: [
            [t(language, 'ค่าตอบแทน', 'Commission'), t(language, '1.5% ของยอดเติม', '1.5% of top-up')],
            [t(language, 'ยอดเติม', 'Top-up volume'), t(language, 'มากกว่า 30,000 บาท/เดือน', 'Over THB 30,000/month')],
            [t(language, 'เหมาะกับ', 'Best for'), t(language, 'ร้านที่มีร้าน Tier 3 ในเครือข่าย', 'Stores with Tier 3 stores in their network')],
          ],
          note: t(language, 'เติมเงินให้ร้าน Tier 3 ที่อยู่ใต้ร้าน', 'Tops up the Tier 3 stores under it'),
        }}
        dots={[
          t(language, 'Tier ไม่ใช่ระดับขั้น ใช้แยกร้านเติมเงินรายใหญ่กับรายย่อย', 'Tiers separate large and small top-up stores; they are not ranks'),
          t(language, 'AIS จ่ายค่าตอบแทนสิ้นเดือน', 'AIS pays commission at month end'),
          t(language, 'ร้าน Tier 3 อยู่กับ PK HUB โดยตรงได้', 'Tier 3 stores can work with PK HUB directly'),
        ]}
      />
      <Faq
        items={[
          [t(language, 'Tier คือระดับขั้นหรือเปล่า', 'Is a tier a rank?'), t(language, 'ไม่ใช่ Tier ใช้แยกร้านที่เติมเงินให้ร้านอื่นจำนวนมาก (Tier 2) กับร้านที่เติมให้ลูกค้าทั่วไป (Tier 3) ร้าน Tier 3 อยู่กับ PK HUB โดยตรงได้', 'No. Tiers separate stores topping up other stores in volume (Tier 2) from stores topping up customers (Tier 3). Tier 3 stores can work with PK HUB directly.')],
          [t(language, 'ยอดเติมเท่าไรถึงเป็น Tier 2', 'What volume makes a Tier 2 store?'), t(language, 'มากกว่า 30,000 บาทต่อเดือน สำหรับร้านที่เติมเงินให้ร้านอื่น (B2B)', 'Over THB 30,000 a month, for stores topping up other stores (B2B).')],
          [t(language, 'ค่าตอบแทนเข้าเมื่อไร', 'When is commission paid?'), t(language, 'AIS จ่ายค่าตอบแทนเติมเงินทุกสิ้นเดือน', 'AIS pays top-up commission at the end of each month.')],
          [t(language, 'ต้องมีรหัส ROM ก่อนไหม', 'Do I need a ROM code first?'), t(language, 'ต้องมี สมัครกับ PK HUB เพื่อรับรหัส ROM ก่อนเริ่มเติมเงิน', 'Yes. Join PK HUB to get a ROM code before you start.')],
        ]}
      />
      <Related
        items={[
          { slug: 'ais-sim', title: t(language, 'ซิม AIS', 'AIS SIM'), body: t(language, 'รับรีเบตตามแคมเปญ', 'Campaign rebates') },
          { slug: 'handset-wholesale', title: t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets'), body: t(language, 'ขายพ่วงกับซิมใหม่', 'Sell with a new SIM') },
          { slug: 'finance', title: 'S Leasing', body: t(language, 'รับสมัครผ่อนที่ร้าน', 'Instalment sign-ups in store') },
        ]}
      />
    </PageShell>
  )
}

export function SLeasingPage() {
  const { language } = useLanguage()
  return (
    <PageShell>
      <ServiceHero
        crumb={t(language, 'บริการให้ลูกค้า', 'Customer services')}
        eyebrow="S LEASING · SUB-PARTNER"
        title={
          <>
            {t(language, 'ลูกค้าอยากผ่อน', 'Customer wants to pay monthly?')}
            <br />
            {t(language, 'ร้านรับสมัครได้เลย', 'Sign them up in store')}
          </>
        }
        lede={t(
          language,
          'สำหรับทำเรื่องผ่อนมือถือ ดอกเบี้ยเป็นธรรม มีระบบ MDM ในตัว สมัครกับ PK HUB เพื่อรับรหัส sub-partner แล้วรับสมัครได้ที่หน้าร้าน',
          'Phone instalments with fair interest and built-in MDM. Join PK HUB for a sub-partner code and take applications at your counter.',
        )}
        visualLabel={t(language, 'วงแหวนเวลาอนุมัติ 5–10 นาที', 'Approval ring, 5–10 minutes')}
        visual={
          <>
            <div style={{ left: u(60), top: u(60), width: u(320), height: u(320) }}>
              <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
                <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="18" />
                <circle className="v1-ring" cx="160" cy="160" r="140" transform="rotate(-90 160 160)" fill="none" stroke="#2457D6" strokeWidth="18" strokeLinecap="round" strokeDasharray="660 880" />
                <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(169,190,247,.2)" strokeWidth="2" strokeDasharray="4 8" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="v1-num" style={{ fontSize: u(64), lineHeight: 1.1 }}>
                  5–10
                </span>
                <span className="text-[#c9cdd6]" style={{ fontSize: u(16) }}>
                  {t(language, 'นาที รู้ผลอนุมัติ', 'minutes to approval')}
                </span>
              </div>
            </div>
            <div className="v1-float-2 grid rounded-[18px] bg-white shadow-[0_20px_50px_rgba(0,0,0,.33)]" style={{ left: u(390), top: u(80), padding: `${u(18)} ${u(22)}`, rotate: '4deg', transformOrigin: '0 0' }}>
              <span className="text-[#606060]" style={{ fontSize: u(13) }}>
                {t(language, 'ซื้อเครื่องกับ PK HUB', 'Buy devices from PK HUB')}
              </span>
              <span className="font-display font-medium text-[#0a0a0a]" style={{ fontSize: u(24) }}>
                {t(language, 'ราคาพิเศษ', 'Special price')}
              </span>
            </div>
            <div className="v1-float-3 grid rounded-[18px] bg-[#2457d6] text-white shadow-[0_20px_50px_rgba(36,87,214,.4)]" style={{ left: u(420), top: u(210), padding: `${u(18)} ${u(22)}`, rotate: '-3deg', transformOrigin: '0 0' }}>
              <span className="text-[#dce5ff]" style={{ fontSize: u(13) }}>
                {t(language, 'ผ่อนกับร้าน', 'Instalments at your store')}
              </span>
              <span className="font-display font-medium" style={{ fontSize: u(24) }}>
                {t(language, 'ดอกเบี้ยพิเศษ', 'Special rate')}
              </span>
            </div>
            <div className="flex items-center rounded-full bg-[#1b1d21] text-white" style={{ left: u(400), top: u(340), height: u(48), padding: `0 ${u(20)}`, fontSize: u(15) }}>
              {t(language, 'ทั้งขั้นตอน ~30 นาที', 'Whole process ~30 minutes')}
            </div>
          </>
        }
      />
      <StatStrip
        items={[
          [t(language, '5–10 นาที', '5–10 min'), t(language, 'รู้ผลอนุมัติ', 'to approval')],
          [t(language, '~30 นาที', '~30 min'), t(language, 'ทั้งขั้นตอนที่หน้าร้าน', 'for the whole process in store')],
          [t(language, 'ราคาพิเศษ', 'Special price'), t(language, 'เมื่อซื้อเครื่องกับ PK HUB', 'when you buy devices from PK HUB')],
          [t(language, 'ดอกเบี้ยพิเศษ', 'Special rate'), t(language, 'สำหรับลูกค้าที่ผ่อนกับร้าน', 'for customers paying monthly at your store')],
        ]}
      />
      <Steps
        title={t(language, 'เริ่มรับสมัครได้ใน 4 ขั้น', 'Start taking applications in 4 steps')}
        note={t(language, 'ต้องสมัครกับ PK HUB เพื่อรับรหัส sub-partner ก่อน', 'Join PK HUB for a sub-partner code first')}
        steps={[
          { title: t(language, 'สมัครกับ PK HUB', 'Join PK HUB'), body: t(language, 'ฝากข้อมูลร้าน ทีมช่วยเปิดรหัสให้', 'Leave your store details; the team sets up your code') },
          { title: t(language, 'รับรหัส sub-partner', 'Get a sub-partner code'), body: t(language, 'ใช้ส่งใบสมัครสินเชื่อในนามร้าน', 'Use it to submit applications for your store') },
          { title: t(language, 'รับสมัครที่ร้าน', 'Take applications in store'), body: t(language, 'ลูกค้าสมัครผ่อนได้เลย ตามเกณฑ์ของ S Leasing', 'Customers apply on the spot, under S Leasing criteria') },
          { title: t(language, 'ทีมช่วยดูแล', 'Team support'), body: t(language, 'ติดต่อทีม PK HUB ได้เมื่อมีคำถาม', 'Contact the PK HUB team whenever you have questions') },
        ]}
      />
      <ComparePanels
        eyebrow={t(language, 'ร้านได้อะไร', 'What your store gets')}
        title={t(language, 'ขายผ่อนได้ง่ายกว่าเดิม', 'Instalment sales made easier')}
        light={{
          title: t(language, 'สิทธิพิเศษ', 'Partner benefits'),
          tag: t(language, 'คู่ค้า PK HUB', 'PK HUB partners'),
          rows: [
            [t(language, 'ราคาเครื่อง', 'Device price'), t(language, 'ราคาพิเศษเมื่อซื้อกับ PK', 'Special price when bought from PK')],
            [t(language, 'ดอกเบี้ยผ่อน', 'Instalment interest'), t(language, 'อัตราพิเศษ', 'Special rate')],
          ],
          note: t(language, 'ดอกเบี้ยเป็นธรรม · มีระบบ MDM ในตัว · สิทธิอื่นๆ ทีมแจ้งตอนสมัคร', 'Fair interest · built-in MDM · other benefits explained when you join'),
        }}
        dark={{
          title: t(language, 'เร็วแค่ไหน', 'How fast'),
          tag: t(language, 'ที่หน้าร้าน', 'In store'),
          rows: [
            [t(language, 'รู้ผลอนุมัติ', 'Approval'), t(language, '5–10 นาที', '5–10 minutes')],
            [t(language, 'ทั้งขั้นตอน', 'Whole process'), t(language, 'ประมาณ 30 นาที', 'About 30 minutes')],
            [t(language, 'ลูกค้า', 'Customer'), t(language, 'สมัครจบที่ร้าน', 'Completes it in store')],
          ],
          note: t(language, 'ทีม PK HUB ช่วยดูแลตลอดขั้นตอน', 'The PK HUB team supports every step'),
        }}
        dots={[
          t(language, 'ต้องมีรหัส sub-partner จาก PK HUB', 'Requires a PK HUB sub-partner code'),
          t(language, 'พิจารณาตามเกณฑ์ของ S Leasing', 'Approval follows S Leasing criteria'),
          t(language, 'ทีม PK HUB ช่วยดูแล', 'Supported by the PK HUB team'),
        ]}
      />
      <Faq
        items={[
          [t(language, 'ต้องสมัครกับใครก่อน', 'Who do I sign up with?'), t(language, 'สมัครกับ PK HUB เพื่อรับรหัส sub-partner ก่อนเริ่มรับสมัครสินเชื่อให้ลูกค้า', 'Join PK HUB for a sub-partner code before you take customer applications.')],
          [t(language, 'ร้านได้สิทธิอะไรบ้าง', 'What does my store get?'), t(language, 'ราคาพิเศษเมื่อซื้อเครื่องกับ PK HUB และอัตราดอกเบี้ยผ่อนพิเศษสำหรับลูกค้า สิทธิอื่นๆ ทีมแจ้งตอนสมัคร', 'Special device prices when you buy from PK HUB and a special instalment rate for customers. The team explains other benefits when you join.')],
          [t(language, 'รู้ผลอนุมัติเมื่อไร', 'How soon is approval?'), t(language, 'รู้ผลใน 5–10 นาที ทั้งขั้นตอนที่หน้าร้านใช้เวลาประมาณ 30 นาที', 'Within 5–10 minutes; the whole process in store takes about 30 minutes.')],
        ]}
      />
      <Related
        items={[
          { slug: 'ais-sim', title: t(language, 'ซิม AIS', 'AIS SIM'), body: t(language, 'รับรีเบตตามแคมเปญ', 'Campaign rebates') },
          { slug: 'handset-wholesale', title: t(language, 'มือถือและแท็บเล็ต', 'Phones and tablets'), body: t(language, 'มีเครื่องให้ลูกค้าผ่อน', 'Devices for customers to finance') },
          { slug: 'stock-on-demand', title: 'Stock on Demand', body: t(language, 'หารุ่นที่ลูกค้าอยากผ่อน', 'Find the model they want to finance') },
        ]}
      />
    </PageShell>
  )
}
