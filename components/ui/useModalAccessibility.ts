'use client'

import { useEffect, useRef, type RefObject } from 'react'

type FocusTargetRef = RefObject<HTMLElement | null>

type ModalAccessibilityOptions = {
  /** Focus this control on open instead of the first focusable child. */
  initialFocusRef?: FocusTargetRef
  /** Return focus here on close instead of the element focused before opening. */
  restoreFocusRef?: FocusTargetRef
  /** Disable this only for a non-modal popover that must leave the page scrollable. */
  lockScroll?: boolean
}

type ScrollLockSnapshot = {
  scrollX: number
  scrollY: number
  htmlOverflow: string
  htmlOverscrollBehavior: string
  bodyOverflow: string
  bodyOverscrollBehavior: string
  bodyPaddingRight: string
  bodyPosition: string
  bodyTop: string
  bodyLeft: string
  bodyRight: string
  bodyWidth: string
  priorScrollLockAttribute: string | null
  isIOS: boolean
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',')

let bodyScrollLockCount = 0
let scrollLockSnapshot: ScrollLockSnapshot | null = null

function dispatchLenisScrollLock(locked: boolean) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('finnexus:body-scroll-lock', { detail: { locked } }))
}

function acquireBodyScrollLock() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => undefined

  bodyScrollLockCount += 1

  if (bodyScrollLockCount === 1) {
    const html = document.documentElement
    const body = document.body
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    scrollLockSnapshot = {
      scrollX,
      scrollY,
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPaddingRight: body.style.paddingRight,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      priorScrollLockAttribute: body.getAttribute('data-scroll-locked'),
      isIOS,
    }

    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth)
    const currentPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0

    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    if (scrollbarWidth > 0) body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`

    // iOS Safari does not consistently honor overflow:hidden on the document.
    // Pin the body at its current scroll offset and restore it exactly on close.
    if (isIOS) {
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = `-${scrollX}px`
      body.style.right = '0'
      body.style.width = '100%'
    }

    body.setAttribute('data-scroll-locked', 'true')
    dispatchLenisScrollLock(true)
  }

  let released = false
  return () => {
    if (released) return
    released = true
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1)
    if (bodyScrollLockCount !== 0 || !scrollLockSnapshot) return

    const snapshot = scrollLockSnapshot
    scrollLockSnapshot = null
    const html = document.documentElement
    const body = document.body

    html.style.overflow = snapshot.htmlOverflow
    html.style.overscrollBehavior = snapshot.htmlOverscrollBehavior
    body.style.overflow = snapshot.bodyOverflow
    body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior
    body.style.paddingRight = snapshot.bodyPaddingRight
    body.style.position = snapshot.bodyPosition
    body.style.top = snapshot.bodyTop
    body.style.left = snapshot.bodyLeft
    body.style.right = snapshot.bodyRight
    body.style.width = snapshot.bodyWidth

    if (snapshot.priorScrollLockAttribute === null) body.removeAttribute('data-scroll-locked')
    else body.setAttribute('data-scroll-locked', snapshot.priorScrollLockAttribute)

    if (snapshot.isIOS) window.scrollTo(snapshot.scrollX, snapshot.scrollY)
    dispatchLenisScrollLock(false)
  }
}

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((element) => {
    if (element.closest('[inert], [aria-hidden="true"]')) return false
    const style = window.getComputedStyle(element)
    return style.display !== 'none' && style.visibility !== 'hidden'
  })
}

/**
 * Adds focus entry, a Tab loop, Escape handling, focus restoration, and a
 * reference-counted document scroll lock to an open modal/drawer.
 */
export function useModalAccessibility<TElement extends HTMLElement>(
  active: boolean,
  dialogRef: RefObject<TElement | null>,
  onClose: () => void,
  options: ModalAccessibilityOptions = {},
) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const { initialFocusRef, restoreFocusRef, lockScroll = true } = options

  useEffect(() => {
    if (!active || !lockScroll) return
    return acquireBodyScrollLock()
  }, [active, lockScroll])

  useEffect(() => {
    if (!active || typeof document === 'undefined') return

    const dialog = dialogRef.current
    if (!dialog) return

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const explicitRestoreTarget = restoreFocusRef?.current
    const requestedFocus = initialFocusRef?.current
    const initialFocus = requestedFocus && dialog.contains(requestedFocus)
      ? requestedFocus
      : getFocusableElements(dialog)[0] ?? dialog

    const focusFrame = window.requestAnimationFrame(() => {
      initialFocus.focus({ preventScroll: true })
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = getFocusableElements(dialog)

      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus({ preventScroll: true })
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (!dialog.contains(activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus({ preventScroll: true })
      } else if (event.shiftKey && (activeElement === first || activeElement === dialog)) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && (activeElement === last || activeElement === dialog)) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      window.cancelAnimationFrame(focusFrame)

      const restoreTarget = explicitRestoreTarget ?? previouslyFocused
      if (!restoreTarget?.isConnected || restoreTarget.closest('[inert], [aria-hidden="true"]')) return

      window.requestAnimationFrame(() => {
        restoreTarget.focus({ preventScroll: true })
      })
    }
  }, [active, dialogRef, initialFocusRef, restoreFocusRef])
}
