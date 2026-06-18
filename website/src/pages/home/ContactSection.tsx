import { Facebook, MapPinned, MessageCircle, Phone } from 'lucide-react'

import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

export default function ContactSection() {
  const { isThai } = useLanguage()
  const contacts = [
    { label: 'LINE', value: '@pkhub', href: 'https://lin.ee/VEgW6qG', icon: MessageCircle },
    { label: isThai ? 'โทรศัพท์' : 'Phone', value: '089-248-0888', href: 'tel:0892480888', icon: Phone },
    { label: 'Facebook', value: isThai ? 'เพจธุรกิจ' : 'Business page', href: 'https://www.facebook.com/pkmedia168', icon: Facebook },
    {
      label: isThai ? 'ที่อยู่' : 'Address',
      value: isThai ? '72/29-30 ถ.ศุขประยูร ฉะเชิงเทรา' : '72/29-30 Sukprayoon Rd, Chachoengsao',
      href: 'https://maps.google.com/?q=72/29-30+ถนนศุขประยูร+ต.หน้าเมือง+อ.เมือง+จ.ฉะเชิงเทรา+24000',
      icon: MapPinned,
    },
  ]

  return (
    <Section
      id="contact"
      title={isThai ? 'พร้อมเช็กราคา? ทักมาเลย' : 'Ready to check prices? Message us.'}
      subtitle={isThai ? 'LINE ตอบไวสุด บอกแบรนด์หรือรุ่นที่อยากได้ แล้วทีมขายช่วยเช็กให้' : 'LINE is the fastest channel. Tell us the brands or models you need and sales will check for you.'}
    >
      <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
        {contacts.map((contact) => {
          const Icon = contact.icon
          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex min-h-28 items-center justify-between gap-5 bg-white p-6 transition-colors hover:bg-zinc-50 sm:p-8"
            >
              <span className="flex items-center gap-4 text-lg font-bold">
                <Icon className="h-6 w-6 stroke-[1.5]" />
                {contact.label}
              </span>
              <span className="max-w-[15rem] text-right text-sm font-semibold leading-6 text-zinc-500">{contact.value}</span>
            </a>
          )
        })}
      </div>
    </Section>
  )
}
