import PartnerForm from '@/components/PartnerForm'
import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

export default function FormSection() {
  const { isThai } = useLanguage()

  return (
    <Section
      id="form"
      title={isThai ? 'ขอรับรายการราคาล่าสุด และสมัครเป็นคู่ค้า' : 'Request current prices and become a retail partner'}
      subtitle={
        isThai
          ? 'แจ้งข้อมูลร้านค้าให้ทีมช่วยเช็กสต็อก ราคา และรุ่นที่เหมาะกับร้านของคุณ'
          : 'Tell us about your store so our team can share suitable models, stock, and current prices.'
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr,420px] lg:items-start">
        <PartnerForm />
        <div className="grid gap-8 rounded-[2rem] bg-zinc-100 p-10 shadow-sm border border-zinc-200/50">
          <div className="grid gap-3">
            <div className="text-xl font-bold tracking-tight">{isThai ? 'เหมาะกับร้านค้าประเภทไหน?' : 'Who is this for?'}</div>
            <div className="text-sm sm:text-base leading-[1.8] text-zinc-600">
              {isThai
                ? 'ร้านมือถือออนไลน์และหน้าร้านที่ต้องการสินค้าศูนย์ไทย พร้อมบริการหลังการขายและการตอบกลับที่ชัดเจน'
                : 'Online and physical smartphone retailers seeking official Thai stock and reliable after-sales support.'}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-xs font-bold text-zinc-400">{isThai ? 'ข้อมูลสำคัญก่อนเริ่ม' : 'Before you begin'}</div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'LINE คือช่องทางที่เร็วที่สุด' : 'LINE is the fastest channel'}</div>
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'โทรคุยตรงกับทีมขาย' : 'Speak directly with sales by phone'}</div>
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold shadow-sm border border-zinc-100">{isThai ? 'ไม่มีขั้นต่ำในการเริ่มสั่ง' : 'No minimum opening order'}</div>
            </div>
          </div>
          <a
            href="https://lin.ee/VEgW6qG"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-4 text-sm font-bold tracking-wide text-white hover:bg-zinc-800 transition-transform active:scale-[0.98]"
          >
            {isThai ? 'ทัก LINE เพื่อขอราคา' : 'Request prices on LINE'}
          </a>
        </div>
      </div>
    </Section>
  )
}
