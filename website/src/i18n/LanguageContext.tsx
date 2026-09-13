import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { applyPageMeta, HOME_META } from '@/lib/seo'

export type Language = 'th' | 'en'

type LanguageContextValue = {
  language: Language
  isThai: boolean
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const language: Language = location.pathname.startsWith('/en') ? 'en' : 'th'

  useEffect(() => {
    document.documentElement.lang = language
    if (location.pathname === '/' || location.pathname === `/${language}`) {
      applyPageMeta(HOME_META[language])
    }
  }, [language, location.pathname])

  const setLanguage = (next: Language) => {
    const hash = location.hash
    const suffix = location.pathname.endsWith('/join') ? '/join' : ''
    navigate(`/${next}${suffix}${location.search}${location.pathname.startsWith('/th/blog') ? '' : hash}`)
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
