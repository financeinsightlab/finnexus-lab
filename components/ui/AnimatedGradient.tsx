// FILE: components/ui/AnimatedGradient.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'

interface AnimatedGradientProps {
  children?: ReactNode
  className?: string
  /** Gradient color stops. Default: teal + gold aurora */
  colors?: [string, string, string]
  /** Animation duration in seconds (default 20) */
  speed?: number
}

/**
 * Aurora/mesh animated gradient background.
 * Three blurred radial blobs that slowly drift via CSS animation.
 * Respects prefers-reduced-motion (animation disabled in globals.css).
 */
export default function AnimatedGradient({
  children,
  className = '',
  colors = ['rgba(13,110,110,0.5)', 'rgba(146,98,10,0.35)', 'rgba(26,92,58,0.3)'],
  speed = 20,
}: AnimatedGradientProps) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!reduced && (
        <>
          <div
            className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full pointer-events-none animate-aurora"
            style={{
              background: `radial-gradient(circle, ${colors[0]}, transparent 70%)`,
              filter: 'blur(80px)',
              opacity: 0.5,
              animationDuration: `${speed}s`,
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[55%] h-[55%] rounded-full pointer-events-none animate-aurora"
            style={{
              background: `radial-gradient(circle, ${colors[1]}, transparent 70%)`,
              filter: 'blur(80px)',
              opacity: 0.4,
              animationDuration: `${speed}s`,
              animationDelay: `-${speed / 2}s`,
            }}
          />
          <div
            className="absolute top-1/3 left-1/2 w-[45%] h-[45%] rounded-full pointer-events-none animate-aurora"
            style={{
              background: `radial-gradient(circle, ${colors[2]}, transparent 70%)`,
              filter: 'blur(70px)',
              opacity: 0.3,
              animationDuration: `${speed * 1.3}s`,
              animationDelay: `-${speed / 3}s`,
            }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
