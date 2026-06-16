import { useLanguage } from '@/i18n/LanguageContext'

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 p-0.5 text-xs font-semibold" aria-label="Language">
      {(['th', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={language === item}
          onClick={() => setLanguage(item)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            language === item ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-950'
          }`}
        >
          {item === 'th' ? 'ไทย' : 'EN'}
        </button>
      ))}
    </div>
  )
}
