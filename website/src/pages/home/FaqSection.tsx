import { useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'

const TH_FAQS = [
  {
    q: 'PK HUB ขายส่งมือถือแบรนด์อะไรบ้าง?',
    a: 'เราจัดจำหน่ายมือถือเครื่องศูนย์ไทยจากแบรนด์ชั้นนำ ได้แก่ Apple, Samsung, Oppo, Vivo, Realme, Xiaomi, Honor และ Infinix ทุกเครื่องเป็นสินค้าศูนย์ไทย มีประกันและบริการหลังการขาย',
  },
  {
    q: 'มีขั้นต่ำในการสั่งซื้อหรือไม่?',
    a: 'ไม่มีขั้นต่ำในการเริ่มสั่ง ร้านค้าสามารถสั่งได้ตั้งแต่เครื่องเดียว ทีมงานช่วยเช็กสต็อกและราคาให้ก่อนตัดสินใจ',
  },
  {
    q: 'สินค้ามีประกันหรือไม่?',
    a: 'ทุกเครื่องมีประกันศูนย์ไทยตามมาตรฐานผู้ผลิต และเรามีบริการหลังการขาย หากมีปัญหาสามารถติดต่อทีมงานได้ผ่าน LINE หรือโทรศัพท์',
  },
  {
    q: 'ส่งสินค้าอย่างไรและใช้เวลาเท่าไหร่?',
    a: 'เราแพ็กและส่งทุกวันทำการ ออเดอร์ที่ยืนยันทันรอบจัดส่งจะออกภายในวันเดียวกัน หากไม่ทันรอบจะออกในวันถัดไป จัดส่งทั่วประเทศ',
  },
  {
    q: 'ร้านค้าต่างจังหวัดสั่งได้หรือไม่?',
    a: 'ได้ เรารองรับร้านค้าทั่วประเทศ โดยเฉพาะภาคตะวันออก เช่น ชลบุรี ระยอง ฉะเชิงเทรา จันทบุรี ตราด สระแก้ว และปราจีนบุรี',
  },
  {
    q: 'PK HUB อยู่ฉะเชิงเทราและขายส่งมือถือให้ร้านค้าในพื้นที่หรือไม่?',
    a: 'ใช่ ฐานหลักของเราอยู่ที่ 72/29-30 ถนนศุขประยูร ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา รองรับร้านค้าในฉะเชิงเทราและภาคตะวันออกที่ต้องการมือถือเครื่องศูนย์ไทย ราคาส่ง และเอกสารธุรกิจครบ',
  },
  {
    q: 'ช่องทางการติดต่อที่เร็วที่สุดคืออะไร?',
    a: 'LINE คือช่องทางที่เร็วที่สุด ทักมาที่ @pkhub หรือโทร 089-248-0888 ทีมขายตอบเร็วและช่วยเช็กสต็อกให้ทันที',
  },
  {
    q: 'มีใบกำกับภาษีหรือไม่?',
    a: 'มี เราจดทะเบียน VAT เลขที่ 0245540000020 และออกใบกำกับภาษีเต็มรูปแบบให้บริษัท ร้านค้าปลีก และเชนร้านค้าที่ต้องใช้เอกสารบัญชีถูกต้อง',
  },
  {
    q: 'สินค้าเป็นเครื่องใหม่หรือมือสอง?',
    a: 'ทุกเครื่องเป็นสินค้าใหม่แกะกล่อง เป็นเครื่องศูนย์ไทย ไม่ใช่มือสอง ไม่ใช่เครื่อง refurbish',
  },
]

const EN_FAQS = [
  {
    q: 'What brands does PK HUB wholesale?',
    a: 'We distribute official Thai-market smartphones from Apple, Samsung, Oppo, Vivo, Realme, Xiaomi, Honor, and Infinix. All devices are brand-new, Thai-market units with manufacturer warranty.',
  },
  {
    q: 'Is there a minimum order quantity?',
    a: 'No minimum order. Retailers can start with a single unit. Our team checks stock and pricing before you commit.',
  },
  {
    q: 'Do the phones come with warranty?',
    a: 'Every device carries the standard Thai manufacturer warranty. If any issue arises, contact our team via LINE or phone for after-sales support.',
  },
  {
    q: 'How does shipping work?',
    a: 'We pack and dispatch every business day. Orders confirmed before the cutoff leave the same day; otherwise they ship the next business day. We deliver nationwide across Thailand.',
  },
  {
    q: 'Can stores outside Bangkok order?',
    a: 'Yes. We serve retailers nationwide, with strong coverage in the Eastern provinces: Chachoengsao, Chonburi, Rayong, Chanthaburi, Trat, Sa Kaeo, and Prachinburi.',
  },
  {
    q: 'Is PK HUB based in Chachoengsao and serving local retailers?',
    a: 'Yes. Our main operation is at 72/29-30 Sukprayoon Road, Na Mueang, Mueang Chachoengsao. We support Chachoengsao and Eastern Thailand retailers that need official Thai-market smartphones, wholesale pricing, and complete business documents.',
  },
  {
    q: 'What is the fastest way to contact PK HUB?',
    a: 'LINE is the fastest channel. Add @pkhub or call 089-248-0888. Our sales team responds quickly and can check stock immediately.',
  },
  {
    q: 'Do you provide VAT invoices?',
    a: 'Yes. PK HUB is VAT registered under 0245540000020 and can issue full tax invoices for companies, retailers, and retail chains that need proper accounting documents.',
  },
  {
    q: 'Are the phones new or refurbished?',
    a: 'All devices are brand-new, sealed, Thai-market units. We do not sell used or refurbished phones.',
  },
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={itemVariants} className="border-b border-zinc-200 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-bold tracking-tight text-zinc-900 sm:text-lg"
      >
        <span>{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-base leading-[1.8] text-zinc-600">{a}</p>
      </div>
    </motion.div>
  )
}

export default function FaqSection() {
  const { isThai } = useLanguage()
  const faqs = isThai ? TH_FAQS : EN_FAQS

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-zinc-50">
      <Container>
        <div className="grid gap-8 sm:gap-12">
          <div className="grid max-w-3xl gap-4">
            <h2 className="font-display text-3xl font-black leading-[1.12] tracking-[-0.035em] sm:text-4xl">
              {isThai ? 'คำถามที่พบบ่อย' : 'Frequently asked questions'}
            </h2>
            <p className="text-base leading-[1.8] sm:text-lg text-zinc-600">
              {isThai
                ? 'คำตอบสำหรับคำถามที่ร้านค้ามักถามก่อนเริ่มสั่งซื้อ'
                : 'Answers to common questions from retail partners before placing an order.'}
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            className="rounded-3xl border border-zinc-200/60 bg-white p-6 sm:p-10 shadow-sm"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
