export default function TextAreaField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  placeholder?: string
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold uppercase tracking-wide">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={4}
        placeholder={placeholder}
        className="rounded-none border-2 border-black bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      />
    </div>
  )
}

