import { m } from 'framer-motion'
import { Facebook, MapPinned, MessageCircle, Phone } from 'lucide-react'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { CONTACT } from './constants'

export default function ContactSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()
  const contacts = [
    { label: 'LINE', value: CONTACT.LINE_ID, href: CONTACT.LINE_URL, icon: MessageCircle, highlight: true },
    { label: isThai ? 'โทรศัพท์' : 'Phone', value: CONTACT.PHONE_DISPLAY, href: CONTACT.PHONE_TEL, icon: Phone, highlight: false },
    { label: 'Facebook', value: isThai ? 'เพจธุรกิจ' : 'Business page', href: CONTACT.FACEBOOK_URL, icon: Facebook, highlight: false },
    {
      label: isThai ? 'ที่อยู่' : 'Address',
      value: isThai ? '72/29-30 ถ.ศุขประยูร ฉะเชิงเทรา' : '72/29-30 Sukprayoon Rd, Chachoengsao',
      href: CONTACT.MAPS_URL,
      icon: MapPinned,
      highlight: false,
    },
  ]

  return (
    <Section
      id="contact"
      variant="inverse"
      title={isThai ? 'พร้อมเช็กราคา? ทักมาเลย' : 'Ready to check prices? Message us.'}
      subtitle={isThai ? 'LINE ตอบไวสุด บอกแบรนด์หรือรุ่นที่อยากได้ แล้วทีมขายช่วยเช็กให้' : 'LINE is the fastest channel. Tell us the brands or models you need and sales will check for you.'}
    >
      <m.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 md:grid-cols-2"
      >
        {contacts.map((contact) => {
          const Icon = contact.icon
          return (
            <m.a
              key={contact.label}
              variants={item}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
              className={
                contact.highlight
                  ? 'group flex min-h-28 items-center justify-between gap-5 bg-[#06c755] p-6 transition-colors hover:bg-[#05b34c] sm:p-8'
                  : 'group flex min-h-28 items-center justify-between gap-5 bg-[#090909] p-6 transition-colors hover:bg-zinc-900 sm:p-8'
              }
            >
              <span className="flex items-center gap-4 whitespace-nowrap text-lg font-bold text-white">
                <Icon className="h-6 w-6 stroke-[1.5] transition-transform motion-safe:group-hover:translate-x-0.5" />
                {contact.label}
              </span>
              <span className={`max-w-[15rem] text-right text-sm font-semibold leading-6 ${contact.highlight ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                {contact.value}
              </span>
            </m.a>
          )
        })}
      </m.div>
    </Section>
  )
}
