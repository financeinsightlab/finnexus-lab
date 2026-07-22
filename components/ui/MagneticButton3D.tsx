// FILE: components/ui/MagneticButton3D.tsx
'use client'

import { useRef, useCallback, useState, ReactNode, MouseEvent } from 'react'

/**
 * MagneticButton3D — luxury premium button with:
 * - Magnetic hover (button translates toward cursor)
 * - Ripple effect on click (expanding circle from click point)
 * - Gradient border glow (animated)
 * - Light sweep on hover
 * - Lift + glow on hover
 * - Respects reduced-motion (static button)
 */

interface MagneticButton3DProps {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLElement>) => void
  href?: string
  className?: string
  variant?: 'solid' | 'outline' | 'ghost'
  /** Magnetic pull strength (px) */
  strength?: number
}

export default function MagneticButton3D({
  children,
  onClick,
  href,
  className = '',
  variant = 'solid',
  strength = 12,
}: MagneticButton3DProps) {
  const btnRef = useRef<HTMLElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)
  const sweepRef = useRef<HTMLSpanElement>(null)
  const [reduced, setReduced] = useState(false)
  const rafRef = useRef<number>(0)

  useState(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  })

  const handleMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduced) return
      const btn = btnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const pullX = (x / rect.width) * strength
      const pullY = (y / rect.height) * strength

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`
        if (sweepRef.current) {
          sweepRef.current.style.opacity = '1'
          sweepRef.current.style.background = `radial-gradient(circle 120px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.25), transparent 70%)`
        }
      })
    },
    [reduced, strength]
  )

  const handleLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    cancelAnimationFrame(rafRef.current)
    btn.style.transform = 'translate(0px, 0px) scale(1)'
    if (sweepRef.current) {
      sweepRef.current.style.opacity = '0'
    }
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // Ripple effect
      if (!reduced && rippleRef.current) {
        const btn = btnRef.current
        if (btn) {
          const rect = btn.getBoundingClientRect()
          const size = Math.max(rect.width, rect.height)
          const x = e.clientX - rect.left - size / 2
          const y = e.clientY - rect.top - size / 2
          const ripple = document.createElement('span')
          ripple.className = 'cinema-ripple'
          ripple.style.width = `${size}px`
          ripple.style.height = `${size}px`
          ripple.style.left = `${x}px`
          ripple.style.top = `${y}px`
          btn.appendChild(ripple)
          setTimeout(() => ripple.remove(), 700)
        }
      }
      onClick?.(e)
    },
    [reduced, onClick]
  )

  const baseClass = 'cinema-btn relative inline-flex items-center justify-center overflow-hidden font-semibold rounded-xl transition-[transform,box-shadow] duration-200 ease-out will-change-transform'
  const variantClass =
    variant === 'solid'
      ? 'cinema-btn-solid'
      : variant === 'outline'
      ? 'cinema-btn-outline'
      : 'cinema-btn-ghost'

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      // @ts-expect-error — ref works for both a and button
      ref={btnRef}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {/* Light sweep overlay */}
      <span
        ref={sweepRef}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200"
        style={{ background: 'transparent' }}
      />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  )
}
