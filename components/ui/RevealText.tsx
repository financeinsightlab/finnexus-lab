// FILE: components/ui/RevealText.tsx
'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'

/**
 * RevealText — GSAP-powered cinematic text reveal.
 * Splits text into words and animates each word up + fade-in with a stagger.
 * Triggers when scrolled into view (IntersectionObserver).
 * Respects reduced-motion (shows text immediately, no animation).
 *
 * Usage:
 *   <RevealText as="h1" className="text-6xl">Cinematic Headline</RevealText>
 *   <RevealText as="p" stagger={0.04} delay={0.2}>Subtitle text here</RevealText>
 */

interface RevealTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Stagger between words (seconds) */
  stagger?: number
  /** Duration per word (seconds) */
  duration?: number
  /** Y offset to animate from (px) */
  y?: number
}

export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.06,
  duration = 0.8,
  y = 40,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Show immediately
      wordsRef.current.forEach((w) => {
        if (w) {
          w.style.opacity = '1'
          w.style.transform = 'none'
        }
      })
      return
    }

    // Set initial state
    gsap.set(wordsRef.current, { opacity: 0, y, filter: 'blur(8px)' })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(wordsRef.current, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration,
            delay,
            stagger,
            ease: 'power3.out',
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, stagger, duration, y])

  const words = children.split(' ')

  return (
    <div ref={containerRef} className={className} style={{ overflow: 'hidden' }}>
      <Tag className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el
            }}
            className="inline-block"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </Tag>
    </div>
  )
}
