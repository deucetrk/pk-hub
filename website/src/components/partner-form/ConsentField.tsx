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
    <label className={cn('grid gap-2 rounded-none border-2 p-5 text-base', error ? 'border-red-600' : 'border-black')}>
      <div className="flex items-start gap-4">
        <input type="checkbox" className="mt-1 h-5 w-5 rounded-none border-2 border-black accent-black" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div>
          <div className="font-bold leading-[1.8]">{isThai ? 'ยินยอมให้ทีม PK HUB ทักกลับเพื่อเช็กราคาและสต็อก' : 'I agree that PK HUB may reply with prices and stock availability'}</div>
          <div className="mt-1 text-sm font-medium text-zinc-600">{isThai ? 'ใช้สำหรับคุยเรื่องราคาส่งและออเดอร์ร้านค้าเท่านั้น' : 'Used only for wholesale pricing and store order discussions.'}</div>
        </div>
      </div>
      {error ? <div className="mt-2 text-sm font-bold text-red-700">{error}</div> : null}
    </label>
  )
}
