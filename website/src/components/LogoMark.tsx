import { cn } from '@/lib/utils'

export default function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="PK HUB"
      width={1091}
      height={301}
      className={cn(
        'h-10 w-auto object-contain',
        className
      )}
    />
  )
}

