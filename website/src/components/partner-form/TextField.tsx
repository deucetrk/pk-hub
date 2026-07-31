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
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
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
          'h-12 rounded-xl border bg-white px-4 text-base font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus-visible:border-slate-900 focus-visible:ring-4 focus-visible:ring-slate-900/10',
          error ? 'border-red-500' : 'border-slate-300 hover:border-slate-400',
        )}
      />
      {error ? <div className="text-sm font-semibold text-red-600">{error}</div> : null}
    </div>
  )
}
