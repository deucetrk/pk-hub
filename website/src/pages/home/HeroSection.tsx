import { Clock, ShieldCheck, Truck } from 'lucide-react'

import Container from '@/components/Container'
import LogoMark from '@/components/LogoMark'
import { useLanguage } from '@/i18n/LanguageContext'

export default function HeroSection() {
  const { isThai } = useLanguage()

  return (
    <section className="bg-transparent text-zinc-900">
      <Container className="py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <LogoMark className="border-zinc-900/10" />
              <div className="text-sm font-semibold text-zinc-500">
                {isThai ? 'พันธมิตรค้าส่งมือถือ • ฉะเชิงเทรา / ภาคตะวันออก' : 'Smartphone wholesale partner • Eastern Thailand'}
              </div>
            </div>
            <h1 className="font-display flex flex-col text-5xl font-black leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl lg:leading-[0.98]">
              <span className="text-zinc-900">{isThai ? 'ค้าส่งมือถือ' : 'Official smartphones'}</span>
              <span className="text-zinc-900">{isThai ? 'เครื่องศูนย์ไทย' : 'for retail partners'}</span>
              <span className="text-zinc-400">{isThai ? 'สำหรับร้านค้า' : 'across Thailand'}</span>
            </h1>
            <p className="max-w-xl text-base leading-[1.8] text-zinc-600 sm:text-lg lg:mt-2">
              {isThai
                ? 'PK HUB ดูแลร้านมือถือออนไลน์และหน้าร้าน ด้วยราคาส่ง B2B เครื่องศูนย์ไทย 100% ส่งของทุกวัน และบริการหลังการขายจากทีมที่คุยกันได้จริง'
                : 'PK HUB supplies official Thai-market smartphones to online and physical retailers, with daily dispatch and direct after-sales support.'}
            </p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://lin.ee/VEgW6qG"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-white shadow-md transition-all active:scale-[0.98] hover:bg-zinc-800 hover:shadow-lg"
              >
                {isThai ? 'ทัก LINE ขอราคาล่าสุด' : 'Request prices on LINE'}
              </a>
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm backdrop-blur-sm transition-all active:scale-[0.98] hover:border-zinc-300 hover:bg-zinc-50"
              >
                {isThai ? 'ดูผลงานจริง' : 'See our operation'}
              </a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-zinc-200/50 pt-8 sm:grid-cols-4">
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'ร้านค้าที่ดูแล' : 'Retail partners'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">180+</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'สินค้า' : 'Products'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ศูนย์ไทย 100%' : '100% Thai official'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'จัดส่ง' : 'Dispatch'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">{isThai ? 'ส่งทุกวัน' : 'Daily'}</div>
              </div>
              <div className="border-l-2 border-zinc-200 pl-4">
                <div className="text-xs font-semibold text-zinc-500">{isThai ? 'ยอดขาย 2026' : '2026 sales'}</div>
                <div className="mt-1 text-base font-bold text-zinc-900">฿100M+</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-transparent"></div>
            <div className="relative mb-8 text-lg font-bold tracking-tight text-white">
              {isThai ? 'เริ่มสั่งซื้อกับ PK HUB' : 'Start ordering with PK HUB'}
            </div>
            <div className="relative grid gap-8 text-base text-zinc-300">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'รับราคาและสต็อกล่าสุดจากทีมโดยตรง' : 'Get current prices and live stock directly'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'แจ้งแบรนด์ รุ่น และจำนวนที่สนใจ ทีมช่วยเช็กให้ทันที' : 'Tell us the brands, models, and quantities you need.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'แพ็กและส่งทุกวันทำการ' : 'Packed and dispatched every business day'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'ออเดอร์ที่ยืนยันทันรอบออกภายในวันเดียวกัน' : 'Orders confirmed before cutoff can leave the same day.'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-white" />
                <div>
                  <div className="font-semibold text-white">{isThai ? 'เครื่องศูนย์ไทย พร้อมดูแลหลังการขาย' : 'Official Thai stock with after-sales support'}</div>
                  <div className="mt-1 text-sm leading-[1.8] text-zinc-400">
                    {isThai ? 'คุยตรงกับทีมขายผ่าน LINE หรือโทรศัพท์' : 'Speak directly with our sales team by LINE or phone.'}
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#contact"
              className="relative mt-8 inline-flex items-center justify-center rounded-2xl border border-transparent bg-white px-8 py-4 text-[0.95rem] font-semibold tracking-tight text-zinc-900 shadow-sm transition-all active:scale-[0.98] hover:bg-zinc-100"
            >
              {isThai ? 'ดูช่องทางติดต่อ' : 'View contact options'}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
