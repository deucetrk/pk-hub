import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type Language = 'th' | 'en'

type LanguageContextValue = {
  language: Language
  isThai: boolean
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const META = {
  th: {
    title: 'PK HUB | ค้าส่งมือถือฉะเชิงเทรา เครื่องศูนย์ไทยสำหรับร้านค้า',
    description:
      'PK HUB ค้าส่งมือถือฉะเชิงเทรา ผู้จัดจำหน่ายที่ได้รับอนุญาตจาก AIS สำหรับร้านค้า เครื่องศูนย์ไทย จดทะเบียน VAT และออกใบกำกับภาษีเต็มรูปแบบ',
  },
  en: {
    title: 'PK HUB | Chachoengsao Smartphone Wholesale Partner',
    description:
      'PK HUB is a Chachoengsao smartphone wholesale partner and Authorized AIS Distributor supplying official Thai-market phones with VAT invoices.',
  },
} satisfies Record<Language, { title: string; description: string }>

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const language: Language = location.pathname.startsWith('/en') ? 'en' : 'th'

  useEffect(() => {
    const meta = META[language]
    document.documentElement.lang = language
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://pkhub.co/${language}`)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://pkhub.co/${language}`)
  }, [language])

  const setLanguage = (next: Language) => {
    const hash = location.hash
    navigate(`/${next}${hash}`)
  }

  return (
    <LanguageContext.Provider value={{ language, isThai: language === 'th', setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
