// FILE: components/ui/TiltCard.tsx
'use client'

import { ReactNode, useRef, useCallback, useState } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees (default 8) */
  maxTilt?: number
  /** Scale factor on hover (default 1.02) */
  scale?: number
  /** Show glare overlay on hover (default true) */
  glare?: boolean
}

/**
 * Mouse-tracking 3D perspective tilt card.
 * Pure CSS transforms + requestAnimationFrame. Respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  // Check reduced-motion preference once on mount
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
      const x = (e.clientX - rect.left) / rect.width // 0 → 1
      const y = (e.clientY - rect.top) / rect.height // 0 → 1

      const rotateY = (x - 0.5) * (maxTilt * 2)
      const rotateX = (0.5 - y) * (maxTilt * 2)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        if (glare) {
          el.style.setProperty('--spot-x', `${x * 100}%`)
          el.style.setProperty('--spot-y', `${y * 100}%`)
        }
      })
    },
    [reduced, maxTilt, scale, glare]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-container transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
    >
      {children}
      {glare && !reduced && <div className="spotlight-overlay" />}
    </div>
  )
}
