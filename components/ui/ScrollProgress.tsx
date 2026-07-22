// FILE: components/ui/ScrollProgress.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fixed 3D gradient progress bar at the top of the viewport.
 * Scales on X-axis based on scroll position. Respects prefers-reduced-motion.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollTop / docHeight : 0
        el.style.transform = `scaleX(${progress})`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ transform: 'scaleX(0)', width: '100%' }}
      aria-hidden="true"
    />
  )
}
