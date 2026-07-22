// FILE: components/ui/GlassCard3D.tsx
'use client'

import { useRef, useCallback, useState, ReactNode } from 'react'

/**
 * GlassCard3D — premium frosted glass card with:
 * - 3D tilt toward cursor (perspective + rotateX/rotateY)
 * - Light sweep (diagonal highlight that follows cursor)
 * - Inner content lifted with translateZ (parallax depth)
 * - Glow border that intensifies on hover
 * - Depth shadow that grows on hover
 * - Respects reduced-motion (no tilt, static shadow)
 */

interface GlassCard3DProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees */
  maxTilt?: number
  /** Glow color theme */
  glow?: 'blue' | 'violet' | 'cyan' | 'aurora' | 'amber'
  /** Disable interactions (static card) */
  static?: boolean
}

const GLOW_COLORS: Record<string, string> = {
  blue: '59, 130, 246',
  violet: '124, 58, 237',
  cyan: '6, 182, 212',
  aurora: '16, 185, 129',
  amber: '245, 158, 11',
}

export default function GlassCard3D({
  children,
  className = '',
  maxTilt = 8,
  glow = 'blue',
  static: isStatic = false,
}: GlassCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const sweepRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)
  const rafRef = useRef<number>(0)

  // Check reduced motion once
  useState(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  })

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isStatic || reduced) return
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotY = ((x - cx) / cx) * maxTilt
      const rotX = -((y - cy) / cy) * maxTilt

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
        if (sweepRef.current) {
          sweepRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,255,255,0.12), transparent 70%)`
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = '1'
        }
      })
    },
    [isStatic, reduced, maxTilt]
  )

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    cancelAnimationFrame(rafRef.current)
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (sweepRef.current) {
      sweepRef.current.style.background = 'transparent'
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  const glowRgb = GLOW_COLORS[glow]

  return (
    <div
      ref={cardRef}
      data-cursor="card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`glass-cinema relative overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated gradient border glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 0 1px rgba(${glowRgb}, 0.4), 0 0 30px rgba(${glowRgb}, 0.15)`,
        }}
      />
      {/* Light sweep overlay */}
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{ background: 'transparent' }}
      />
      {/* Inner content lifted in 3D */}
      <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </div>
  )
}
