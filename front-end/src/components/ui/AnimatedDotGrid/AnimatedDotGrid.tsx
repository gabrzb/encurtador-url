import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import './AnimatedDotGrid.css'

interface AnimatedDotGridProps {
  children: ReactNode
  className?: string
}

export function AnimatedDotGrid({ children, className }: AnimatedDotGridProps) {
  return (
    <section className={cn('dot-grid px-4 sm:px-6', className)}>{children}</section>
  )
}
