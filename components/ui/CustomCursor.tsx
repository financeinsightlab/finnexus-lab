// FILE: components/ui/CustomCursor.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Premium custom cursor — dot + ring + glow.
 * - Dot follows pointer instantly (mix-blend-mode: difference)
 * - Ring lags behind with smooth lerp
 * - Glow is a large soft radial that trails slowly
 * - Ring expands on hover over interactive elements (a, button, [data-cursor])
 * - Ring shrinks / changes color on hover over cards ([data-cursor="card"])
 * - Disabled on touch devices and when prefers-reduced-motion
 */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [cardHover, setCardHover] = useState(false)

  // Position refs (avoid re-renders)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const glow = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse) and no reduced motion
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"], input, textarea, select')) {
        setHovering(true)
        setCardHover(false)
      } else if (target.closest('[data-cursor="card"], .glass-cinema, .cinema-tilt')) {
        setCardHover(true)
        setHovering(false)
      } else {
        setHovering(false)
        setCardHover(false)
      }
    }

    const animate = () => {
      // Ring lerp (medium speed)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      // Glow lerp (slow, trailing)
      glow.current.x += (mouse.current.x - glow.current.x) * 0.06
      glow.current.y += (mouse.current.y - glow.current.y) * 0.06
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="cinema-cursor-dot"
        style={{
          opacity: hovering || cardHover ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />
      {/* Ring — lerp follow, expands on hover */}
      <div
        ref={ringRef}
        className={`cinema-cursor-ring ${hovering ? 'cinema-cursor-hover' : ''} ${cardHover ? 'cinema-cursor-card' : ''}`}
      />
      {/* Glow — slow trailing soft light */}
      <div ref={glowRef} className="cinema-cursor-glow" />
    </>
  )
}
