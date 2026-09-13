import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Container from '@/components/Container'
import { useLanguage } from '@/i18n/LanguageContext'
import { useReferralAttribution } from '@/hooks/useReferralAttribution'
import { revealViewport, useRevealMotion } from '@/lib/motion'
import { withReferral } from '@/utils/referralAttribution'

const STEPS = {
  th: [
    ['บอกเราเรื่องร้านของคุณ', 'ทัก LINE เพื่อคุยแบรนด์ รุ่น และสิ่งที่ร้านต้องการ'],
    ['ฝากข้อมูลสมัครพาร์ทเนอร์', 'กรอกข้อมูลร้านและช่องทางติดต่อให้ทีมรู้จักคุณ'],
    ['ทีม PK ตรวจสอบและติดต่อกลับ', 'คุยรายละเอียดและเงื่อนไขให้ชัดเจนก่อนเริ่มสั่งซื้อ'],
    ['เข้าใช้งานเมื่อได้รับอนุมัติ', 'สิทธิ์ค้าส่งเปิดหลังการตรวจสอบ การสมัครยังไม่ใช่การอนุมัติ'],
  ],
  en: [
    ['Tell us about your store', 'Start on LINE with the brands, models, and support you need.'],
    ['Send a partner application', 'Share your store details and how the team can reach you.'],
    ['PK reviews and contacts you', 'Clarify the details and terms before you start ordering.'],
    ['Get access after approval', 'Wholesale access follows review. Applying alone does not grant access.'],
  ],
}

export default function ProcessSection() {
  const { isThai, language } = useLanguage()
  const referralCode = useReferralAttribution()
  const { container, item } = useRevealMotion()
  return (
    <section id="process" className="scroll-mt-24 bg-[#18181b] py-16 text-[#f7f7f8] sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="pk-story-heading font-display">{isThai ? 'เริ่มจากคุยกัน สู่การเป็นพาร์ทเนอร์' : 'From a conversation to a partnership'}</h2>
            <a href={withReferral(`/${language}/join`, referralCode)} className="pk-action mt-8 border border-[#bfd0ff] bg-[#bfd0ff] text-[#18181b] hover:bg-[#dbe5ff]">
              {isThai ? 'สมัครเป็นร้านค้าพาร์ทเนอร์' : 'Apply to become a partner'} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <m.ol variants={container} initial="hidden" whileInView="show" viewport={revealViewport}>
            {STEPS[language].map(([title, description], index) => (
              <m.li key={title} variants={item} className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-white/20 py-7 first:pt-0 first:border-t-0">
                <span className="font-display text-xl text-[#bfd0ff]" aria-hidden="true">0{index + 1}</span>
                <div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-2 text-base leading-7 text-zinc-300">{description}</p></div>
              </m.li>
            ))}
          </m.ol>
        </div>
      </Container>
    </section>
  )
}
