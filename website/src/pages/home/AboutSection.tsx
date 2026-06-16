import Section from '@/components/Section'
import { useLanguage } from '@/i18n/LanguageContext'

export default function AboutSection() {
  const { isThai } = useLanguage()

  return (
    <Section
      id="about"
      title={isThai ? 'เกี่ยวกับ PK HUB' : 'About PK HUB'}
      subtitle={
        isThai
          ? 'ทีมค้าส่งมือถือภายใต้ PK Media และ AIS Authorized Distribution Partner อย่างเป็นทางการ'
          : 'The smartphone wholesale team under PK Media and an official AIS Authorized Distribution Partner.'
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-none border-2 border-black bg-white p-8 text-base leading-[1.8] text-zinc-800">
          {isThai
            ? 'PK HUB คือทีมค้าส่งมือถือภายใต้ PK Media ดูแลร้านค้าออนไลน์และหน้าร้าน ด้วยสินค้าเครื่องศูนย์ไทยและบริการหลังการขาย'
            : 'PK HUB is the smartphone wholesale team under PK Media, supporting online and physical retailers with official Thai stock and after-sales service.'}
        </div>
        <div className="rounded-none border-2 border-black bg-white p-8 text-base leading-[1.8] text-zinc-800">
          {isThai
            ? 'เราเป็น AIS Authorized Distribution Partner อย่างเป็นทางการ ไม่ใช่เว็บไซต์ขายปลีก และไม่เปิดราคาส่งสาธารณะ เพราะราคาและสต็อกเปลี่ยนตามรอบสินค้า'
            : 'We are an official AIS Authorized Distribution Partner. We are not a retail store and do not publish wholesale prices because pricing and stock change by supply cycle.'}
        </div>
      </div>
    </Section>
  )
}
