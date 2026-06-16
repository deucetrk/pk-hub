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
          <div className="font-bold leading-[1.8]">{isThai ? 'ยินยอมให้ PK HUB ติดต่อกลับเพื่อส่งรายการราคา' : 'I agree that PK HUB may contact me about wholesale pricing'}</div>
          <div className="mt-1 text-sm font-medium text-zinc-600">{isThai ? 'ข้อมูลนี้ใช้เพื่อการติดต่อทางธุรกิจเท่านั้น' : 'Your details will only be used for business contact.'}</div>
        </div>
      </div>
      {error ? <div className="mt-2 text-sm font-bold text-red-700">{error}</div> : null}
    </label>
  )
}
