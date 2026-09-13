import { cn } from '@/lib/utils'

export default function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-transparent.png"
      alt="PK HUB"
      width={2179}
      height={721}
      className={cn(
        'h-10 w-auto object-contain',
        className
      )}
    />
  )
}
