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
      <label htmlFor={id} className="text-sm font-bold uppercase tracking-wide">
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
          'h-12 rounded-none border-2 bg-white px-4 text-base font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          error ? 'border-red-600' : 'border-black',
        )}
      />
      {error ? <div className="text-xs font-bold text-red-700">{error}</div> : null}
    </div>
  )
}
