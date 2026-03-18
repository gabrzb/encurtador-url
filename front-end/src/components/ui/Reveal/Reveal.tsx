import type { CSSProperties, ReactNode } from 'react'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { cn } from '@/lib/utils'
import './Reveal.css'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  variant?: 'up' | 'left' | 'right' | 'pop'
}

export function Reveal({ children, className, delayMs = 0, variant = 'up' }: RevealProps) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('reveal', `reveal-${variant}`, visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
