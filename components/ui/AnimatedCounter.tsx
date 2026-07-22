// FILE: components/ui/AnimatedCounter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AnimatedCounter — count-up number that animates when scrolled into view.
 * - Easing-based count from 0 to target
 * - Optional prefix/suffix (e.g. $, %, +)
 * - Optional SVG circular progress ring
 * - Respects reduced-motion (shows final value immediately)
 * - Uses IntersectionObserver to trigger on scroll
 */

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** Show circular progress ring (value as percentage of max) */
  ring?: boolean
  ringMax?: number
  ringSize?: number
  ringColor?: string
  className?: string
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  ring = false,
  ringMax = 100,
  ringSize = 120,
  ringColor = '#3b82f6',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let rafId = 0
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(value * eased)
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [visible, value, duration, reduced])

  const formatted = display.toFixed(decimals)

  if (ring) {
    const radius = ringSize / 2 - 8
    const circumference = 2 * Math.PI * radius
    const progress = Math.min(display / ringMax, 1)
    const offset = circumference * (1 - progress)
    return (
      <span ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
        <svg width={ringSize} height={ringSize} className="-rotate-90">
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${ringColor}80)`, transition: 'stroke-dashoffset 0.1s' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {prefix}{formatted}{suffix}
        </span>
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
