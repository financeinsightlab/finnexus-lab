"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export type AutosaveStatus = "idle" | "saving" | "saved" | "error" | "recovered"

interface UseAutosaveOptions<T extends object> {
  key: string
  data: T
  enabled?: boolean
  debounceMs?: number
  onRecover?: (data: T) => void
}

export function useAutosave<T extends object>({ key, data, enabled = true, debounceMs = 1500, onRecover }: UseAutosaveOptions<T>) {
  const [status, setStatus] = useState<AutosaveStatus>("idle")
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [hasRecoverable, setHasRecoverable] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSerialized = useRef<string>("")

  // On mount: check for recoverable draft
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const parsed = JSON.parse(raw) as { data: T; at: string }
        if (parsed?.data) setHasRecoverable(true)
      }
    } catch {}
  }, [key, enabled])

  const recover = useCallback(() => {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const parsed = JSON.parse(raw) as { data: T; at: string }
      if (parsed?.data) {
        onRecover?.(parsed.data)
        setStatus("recovered")
        return parsed.data
      }
    } catch {}
    return null
  }, [key, onRecover])

  const clear = useCallback(() => {
    if (typeof window === "undefined") return
    try {
      localStorage.removeItem(key)
    } catch {}
    setHasRecoverable(false)
    setStatus("idle")
  }, [key])

  // Debounced write
  useEffect(() => {
    if (!enabled) return
    const serialized = JSON.stringify(data)
    // Avoid writing identical payload repeatedly (prevents tight loops)
    if (serialized === prevSerialized.current) return
    prevSerialized.current = serialized

    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus("saving")
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify({ data, at: new Date().toISOString() }))
        setLastSavedAt(new Date())
        setStatus("saved")
        setHasRecoverable(true)
      } catch {
        setStatus("error")
      }
    }, debounceMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [key, data, enabled, debounceMs])

  return { status, lastSavedAt, hasRecoverable, recover, clear }
}

export function useUnsavedWarning(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "You have unsaved changes — leave without saving?"
      return e.returnValue
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [enabled])
}
