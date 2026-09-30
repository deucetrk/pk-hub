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
    <div
      role="group"
      className="inline-flex border border-zinc-300 bg-white text-xs font-semibold"
      aria-label={language === 'th' ? 'เลือกภาษา' : 'Choose language'}
    >
      {(['th', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => changeLanguage(item)}
          className={`min-h-11 min-w-11 px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2457d6] ${
            language === item ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-950'
          }`}
        >
          {item === 'th' ? 'ไทย' : 'EN'}
        </button>
      ))}
    </div>
  )
}
