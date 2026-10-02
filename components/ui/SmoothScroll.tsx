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
 * Wrap the app body content with this for site-wide smooth scrolling.
 */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native overflow panels (drawers, dialogs, tables, editors) must receive
      // wheel input themselves instead of being swallowed by page smoothing.
      allowNestedScroll: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    const handleBodyScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<{ locked: boolean }>).detail?.locked
      if (locked) lenis.stop()
      else lenis.start()
    }
    window.addEventListener('finnexus:body-scroll-lock', handleBodyScrollLock)
    if (document.body.hasAttribute('data-scroll-locked')) lenis.stop()

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('finnexus:body-scroll-lock', handleBodyScrollLock)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
