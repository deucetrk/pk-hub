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
    title: 'PK HUB | พันธมิตรค้าส่งมือถือสำหรับร้านค้า',
    description:
      'PK HUB ผู้จัดจำหน่ายมือถือเครื่องศูนย์ไทยสำหรับร้านค้า ส่งของทุกวัน ดูแลมากกว่า 180 ร้านค้า จากฐานธุรกิจจริงในฉะเชิงเทรา',
  },
  en: {
    title: 'PK HUB | Thai Smartphone Wholesale Partner',
    description:
      'PK HUB supplies official Thai-market smartphones to retailers nationwide, with daily dispatch and more than 180 retail partners.',
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
