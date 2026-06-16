import { cn } from '@/lib/utils'

export default function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="PK HUB"
      className={cn(
        'h-10 w-auto object-contain',
        className
      )}
    />
  )
}

