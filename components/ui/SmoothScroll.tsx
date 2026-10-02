// FILE: components/ui/SmoothScroll.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth scroll wrapper.
 * - Initializes smooth inertia scrolling on mount
 * - Integrates with requestAnimationFrame
 * - Disabled when prefers-reduced-motion (falls back to native scroll)
 * - Cleans up on unmount
 * Mount once near the root (as a sibling of the page content) for site-wide
 * smooth scrolling. It does not need to wrap the content: Lenis attaches to
 * the window, and wrapping would only matter if this component were loaded
 * with `ssr: false`, which would opt the whole page out of server rendering.
 */

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children ?? null}</>
}
