import { useLanguage } from '@/i18n/LanguageContext'

type LanguageSwitchProps = {
  onChange?: () => void
}

export default function LanguageSwitch({ onChange }: LanguageSwitchProps = {}) {
  const { language, setLanguage } = useLanguage()

  const changeLanguage = (nextLanguage: 'th' | 'en') => {
    setLanguage(nextLanguage)
    onChange?.()
  }

  return (
    <div className="inline-flex border border-stone-300 bg-white text-xs font-semibold" aria-label="Language">
      {(['th', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => changeLanguage(item)}
          className={`px-3 py-1.5 transition-colors ${
            language === item ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-950'
          }`}
        >
          {item === 'th' ? 'ไทย' : 'EN'}
        </button>
      ))}
    </div>
  )
}
