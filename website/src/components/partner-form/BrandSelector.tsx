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
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-bold tracking-wide">{label}</div>
        {error ? <div className="text-xs font-bold text-red-700">{error}</div> : null}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((b) => {
          const checked = selected.includes(b)
          return (
            <label
              key={b}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-none border-2 px-4 py-3 text-base font-bold transition-colors',
                checked ? 'border-black bg-zinc-100' : 'border-black bg-white hover:bg-zinc-50',
              )}
            >
              <input type="checkbox" className="h-4 w-4 rounded-none border-2 border-black accent-black" checked={checked} onChange={(e) => onToggle(b, e.target.checked)} />
              {b}
            </label>
          )
        })}
      </div>
    </div>
  )
}
