// FILE: components/ui/MagneticButton.tsx
'use client'

import { ReactNode, useRef, useCallback, useState } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** How strongly the button pulls toward cursor (default 0.3) */
  strength?: number
  /** Render as anchor (pass href) or button */
  href?: string
  onClick?: () => void
}

/**
 * Button/link that subtly translates toward the cursor on hover.
 * Uses requestAnimationFrame + passive transform. Respects prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  useState(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  })

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    },
    [reduced, strength]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = 'translate(0,0)'
    })
  }, [])

  const sharedProps = {
    ref: ref as any,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `btn-3d inline-flex items-center justify-center transition-transform duration-200 ease-out will-change-transform ${className}`.trim(),
    style: { transform: 'translate(0,0)' },
  }

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} {...sharedProps}>
      {children}
    </button>
  )
}
