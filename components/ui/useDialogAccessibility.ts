'use client'

import { useEffect, useRef } from 'react'
import { lockBodyScroll } from '@/components/ui/bodyScrollLock'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** Adds Escape, focus trapping/restoration, and body-scroll locking to a modal panel. */
export function useDialogAccessibility<T extends HTMLElement = HTMLDivElement>(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<T>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) {
      const previous = returnFocusRef.current
      returnFocusRef.current = null
      if (previous?.isConnected) window.requestAnimationFrame(() => previous.focus())
      return
    }

    const activeElement = document.activeElement
    returnFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null
    const releaseBodyScroll = lockBodyScroll()

    const focusFirst = window.setTimeout(() => {
      const dialog = dialogRef.current
      if (!dialog) return
      const first = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .find((element) => element.offsetParent !== null)
      ;(first ?? dialog).focus()
    }, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element) => element.offsetParent !== null)

      if (!focusable.length) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusFirst)
      document.removeEventListener('keydown', handleKeyDown)
      releaseBodyScroll()
    }
  }, [isOpen])

  return dialogRef
}
