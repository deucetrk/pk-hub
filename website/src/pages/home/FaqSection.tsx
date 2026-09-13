import { ChevronDown } from 'lucide-react'
import Container from '@/components/Container'
import { HOME_FAQS } from '@/content/homeFaqs'
import { useLanguage } from '@/i18n/LanguageContext'

export default function FaqSection() {
  const { isThai, language } = useLanguage()
  return (
    <section id="faq" className="scroll-mt-24 bg-[#f7f7f8] py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="pk-story-heading font-display">{isThai ? 'ก่อนเริ่มคุย คุณอาจอยากรู้' : 'A few things you may want to know'}</h2>
            <p className="mt-5 text-base leading-7 text-zinc-600">{isThai ? 'คำตอบสำหรับร้านมือถือที่กำลังมองหาพาร์ทเนอร์ค้าส่ง' : 'Answers for phone retailers looking for a wholesale partner.'}</p>
          </div>
          <div className="border-t border-zinc-300">
            {HOME_FAQS[language].map(({ q, a }) => (
              <details key={q} className="group border-b border-zinc-300">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {q}<ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-6 pr-6 text-base leading-7 text-zinc-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
