import { cn } from '@/lib/utils'

export default function ConsentField({
  checked,
  onChange,
  error,
  isThai = true,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  isThai?: boolean
}) {
  return (
    <label className={cn('grid cursor-pointer gap-2 rounded-xl border bg-zinc-50 p-4 text-base transition-colors', error ? 'border-red-500' : 'border-zinc-200')}>
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-zinc-300 accent-zinc-900" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div>
          <div className="text-sm font-semibold leading-relaxed text-zinc-800">{isThai ? 'ยินยอมให้ทีม PK HUB ทักกลับเพื่อเช็กราคาและสต็อก' : 'I agree that PK HUB may reply with prices and stock availability'}</div>
          <div className="mt-0.5 text-xs font-medium text-zinc-500">{isThai ? 'ใช้สำหรับคุยเรื่องราคาส่งและออเดอร์ร้านค้าเท่านั้น' : 'Used only for wholesale pricing and store order discussions.'}</div>
        </div>
      </div>
      {error ? <div className="text-sm font-semibold text-red-600">{error}</div> : null}
    </label>
  )
}
