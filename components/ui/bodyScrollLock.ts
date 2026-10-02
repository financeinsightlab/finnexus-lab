let lockCount = 0
let previousOverflow: string | null = null

/** Acquires a reference-counted body scroll lock so nested dialogs do not unlock each other. */
export function lockBodyScroll() {
  if (typeof document === 'undefined') return () => {}

  if (lockCount === 0) previousOverflow = document.body.style.overflow
  lockCount += 1
  document.body.style.overflow = 'hidden'

  let released = false
  return () => {
    if (released) return
    released = true
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow ?? ''
      previousOverflow = null
    }
  }
}
