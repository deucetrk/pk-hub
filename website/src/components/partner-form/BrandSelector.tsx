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
        <legend className="text-sm font-semibold text-zinc-700">{label}</legend>
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
                'border px-4 py-2 text-sm font-semibold transition-colors',
                checked
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900',
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
