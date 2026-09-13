import { m } from 'framer-motion'
import { Facebook, MapPinned, MessageCircle, Phone } from 'lucide-react'

import PartnerForm from '@/components/PartnerForm'
import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'
import { revealViewport, useRevealMotion } from '@/lib/motion'

import { CONTACT, EASTERN_PROVINCES } from './constants'

export default function ContactSection() {
  const { isThai } = useLanguage()
  const { container, item } = useRevealMotion()

  const provinces = isThai ? EASTERN_PROVINCES : ['Chonburi', 'Rayong', 'Chachoengsao', 'Chanthaburi', 'Trat', 'Sa Kaeo', 'Prachinburi']

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
      title={isThai ? 'พร้อมเช็กราคา? ทัก LINE มาเลย' : 'Ready to check prices? Message us on LINE.'}
      subtitle={
        isThai
          ? 'บอกแบรนด์หรือรุ่นที่อยากได้ ทีมขายช่วยเช็กราคา สต็อก และรอบส่งในเวลาทำการ'
          : 'Tell us the brands or models you need and sales will check prices, stock, and dispatch rounds during business hours.'
      }
    >
      <m.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-10"
      >
        <div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 md:grid-cols-2">
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
                    ? 'group flex min-h-28 items-center justify-between gap-5 bg-[#087c3b] p-6 transition-colors hover:bg-[#066430] sm:p-8'
                    : 'group flex min-h-28 items-center justify-between gap-5 bg-[#18181b] p-6 transition-colors hover:bg-zinc-800 sm:p-8'
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
        </div>

        <m.div variants={item} className="text-sm font-semibold leading-7 text-zinc-400">
          {isThai ? 'พื้นที่ที่ดูแลเป็นหลัก: ' : 'Primary service area: '}
          <span className="text-zinc-200">{provinces.join(' • ')}</span>
          {isThai ? ' และจัดส่งทั่วประเทศตามรอบขนส่ง' : ' — plus nationwide delivery by dispatch round.'}
        </m.div>

        <m.div variants={item} className="grid gap-6 border-t border-zinc-800 pt-10">
          <div className="grid max-w-2xl gap-2">
            <div className="text-xl font-black text-white">
              {isThai ? 'ไม่สะดวกทักตอนนี้? ฝากข้อมูลร้านไว้' : 'No time to chat? Leave your store details'}
            </div>
            <div className="text-base leading-[1.8] text-zinc-400">
              {isThai ? 'ทีมขายจะเช็กราคาและติดต่อกลับให้' : 'Our sales team will check prices and get back to you.'}
            </div>
          </div>
          <PartnerForm />
        </m.div>
      </m.div>
    </Section>
  )
}
