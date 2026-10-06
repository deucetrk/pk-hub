import { useLocation } from 'react-router-dom'
import LegacyFooter from './LegacyFooter'
import { useLanguage } from '@/i18n/LanguageContext'

function V7Footer() {
  const { isThai } = useLanguage()

  return (
    <footer className="v4-footer">
      <img
        src="/pkhub-v7/brands/logo.png"
        alt="PK HUB"
        width={360}
        height={119}
        className="max-h-[32px] w-auto object-contain"
        loading="lazy"
        decoding="async"
      />
      <span>
        {isThai
          ? 'พาร์ทเนอร์ค้าส่งมือถือสำหรับร้านทั่วไทย'
          : 'Smartphone wholesale partner for retailers nationwide'}
      </span>
      <span>
        {isThai
          ? 'เครื่องศูนย์ไทยแท้ · ใบกำกับภาษีเต็มรูปแบบ'
          : 'Official Thai-market devices · Full tax invoices'}
      </span>
    </footer>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const isV7Page = pathname === '/' || /^\/(th|en)\/?$/.test(pathname) ||
    /^\/(th|en)\/products\/partner-marketing\/?$/.test(pathname)
  return isV7Page ? <V7Footer /> : <LegacyFooter />
}
