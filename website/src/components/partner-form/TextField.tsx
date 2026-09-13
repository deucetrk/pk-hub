import { cn } from '@/lib/utils'

export default function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  inputMode,
  type = 'text',
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  placeholder?: string
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  error?: string
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        type={type}
        className={cn(
          'h-12 w-full min-w-0 rounded-xl border bg-white px-4 text-base font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus-visible:border-zinc-900 focus-visible:ring-4 focus-visible:ring-zinc-900/10',
          error ? 'border-red-500' : 'border-zinc-300 hover:border-zinc-400',
        )}
      />
      {error ? <div className="text-sm font-semibold text-red-600">{error}</div> : null}
    </div>
  )
}
