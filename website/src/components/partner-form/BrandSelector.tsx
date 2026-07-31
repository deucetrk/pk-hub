import { cn } from '@/lib/utils'

export default function BrandSelector({
  options,
  selected,
  onToggle,
  error,
  label = 'แบรนด์ที่สนใจ',
}: {
  options: string[]
  selected: string[]
  onToggle: (brand: string, checked: boolean) => void
  error?: string
  label?: string
}) {
  return (
    <fieldset className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <legend className="text-sm font-semibold text-slate-700">{label}</legend>
        {error ? <div className="text-xs font-semibold text-red-600">{error}</div> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((b) => {
          const checked = selected.includes(b)
          return (
            <button
              key={b}
              type="button"
              aria-pressed={checked}
              onClick={() => onToggle(b, !checked)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97]',
                checked
                  ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                  : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900',
              )}
            >
              {b}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
