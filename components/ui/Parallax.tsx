// FILE: components/ui/Parallax.tsx
'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Movement speed multiplier (default 0.15). Higher = moves more. */
  speed?: number
  /** Direction: 'up' moves away on scroll down, 'down' moves toward (default 'up') */
  direction?: 'up' | 'down'
}

/**
 * Scroll-driven parallax wrapper. Translates child on Y-axis based on scroll position.
 * Uses passive scroll listener + requestAnimationFrame. Respects prefers-reduced-motion.
 */
export default function Parallax({
  children,
  className = '',
  speed = 0.15,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const update = () => setReduced(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const viewportH = window.innerHeight
        // Element center relative to viewport center
        const offset = (rect.top + rect.height / 2 - viewportH / 2)
        const translate = direction === 'up' ? -offset * speed : offset * speed
        el.style.transform = `translate3d(0, ${translate}px, 0)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced, speed, direction])

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={reduced ? undefined : { transform: 'translate3d(0,0,0)' }}>
      {children}
    </div>
  )
}
