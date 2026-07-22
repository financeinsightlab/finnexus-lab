// FILE: components/ui/GlassCard.tsx
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Use light glass variant (for light backgrounds) */
  light?: boolean
  /** Depth shadow level 1-4 (default 3) */
  depth?: 1 | 2 | 3 | 4
  /** Add colored glow: 'teal' | 'gold' | none */
  glow?: 'teal' | 'gold' | null
}

/**
 * Glassmorphism card with depth shadow + inset highlight.
 * Server-safe (CSS-only, no client JS). Use inside TiltCard for 3D tilt.
 */
export default function GlassCard({
  children,
  className = '',
  light = false,
  depth = 3,
  glow = null,
}: GlassCardProps) {
  const depthClass = `depth-${depth}`
  const glowClass = glow ? `glow-${glow}` : ''
  const glassClass = light ? 'glass-light' : 'glass'

  return (
    <div className={`relative rounded-2xl ${glassClass} ${depthClass} ${glowClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
