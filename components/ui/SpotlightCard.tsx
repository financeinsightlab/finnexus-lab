// FILE: components/ui/SpotlightCard.tsx
'use client'

import { ReactNode, useRef, useCallback, useState } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Glow color (default teal) */
  color?: 'teal' | 'gold'
  /** Glow intensity 0-1 (default 0.15) */
  intensity?: number
}

/**
 * Card with a mouse-tracking radial glow overlay.
 * The glow follows the cursor using CSS custom properties. Respects prefers-reduced-motion.
 */
export default function SpotlightCard({
  children,
  className = '',
  color = 'teal',
  intensity = 0.15,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  useState(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  })

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--spot-x', `${x}%`)
        el.style.setProperty('--spot-y', `${y}%`)
        el.style.setProperty('--spot-opacity', '1')
      })
    },
    [reduced]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--spot-opacity', '0')
    })
  }, [])

  const glowColor = color === 'gold' ? 'rgba(146,98,10,' : 'rgba(13,110,110,'

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative ${className}`}
    >
      {children}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--spot-x,50%) var(--spot-y,50%), ${glowColor}${intensity}), transparent 40%)`,
            opacity: 'var(--spot-opacity, 0)',
          }}
        />
      )}
    </div>
  )
}
