// FILE: components/ui/FloatingElement.tsx
import { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  /** Animation delay in seconds (default 0) */
  delay?: number
  /** Slow variant (default false → 6s, true → 9s) */
  slow?: boolean
}

/**
 * Wraps children with an idle float animation (subtle Y-axis bob).
 * Pure CSS animation. Disabled under prefers-reduced-motion (globals.css).
 */
export default function FloatingElement({
  children,
  className = '',
  delay = 0,
  slow = false,
}: FloatingElementProps) {
  return (
    <div
      className={`${slow ? 'float-anim-slow' : 'float-anim'} will-change-transform ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
