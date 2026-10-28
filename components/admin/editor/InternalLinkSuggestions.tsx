"use client"

import { useEffect, useState } from "react"

interface Suggestion {
  id: string
  title: string
  slug: string
  type: string
  href: string
}

/** PART D — internal-link suggestions (real published posts; copy/paste href into body). */
export default function InternalLinkSuggestions({ query, excludeId }: { query: string; excludeId?: string }) {
  const [items, setItems] = useState<Suggestion[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const q = query.trim()
    if (q.length < 3) {
      setItems([])
      return
    }
    let cancelled = false
    const t = setTimeout(async () => {
      try {
        const qs = `q=${encodeURIComponent(q)}${excludeId ? `&excludeId=${excludeId}` : ""}`
        const res = await fetch(`/api/admin/cms/link-suggestions?${qs}`)
        const json = await res.json()
        if (!cancelled) setItems(json.suggestions ?? [])
      } catch {
        if (!cancelled) setItems([])
      }
    }, 450)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [query, excludeId])

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface-muted p-4">
        <h4 className="text-xs font-bold text-content-primary">Internal-link suggestions</h4>
        <p className="text-[11px] text-content-muted mt-1.5">
          Type a title (3+ characters) — published posts matching it appear here. Source: <span className="font-mono">Post</span> where published=true.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-surface-muted p-4">
      <h4 className="text-xs font-bold text-content-primary">Internal-link suggestions</h4>
      <p className="text-[11px] text-content-muted mt-1">Real published posts — copy the path and link it in the body.</p>
      <ul className="mt-3 space-y-2">
        {items.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-content-primary truncate">{s.title}</p>
              <p className="text-[11px] font-mono text-content-muted truncate">{s.href}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold text-primary-foreground hover:bg-brand-hover"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(s.href)
                  setCopied(s.id)
                  setTimeout(() => setCopied(null), 1500)
                } catch {}
              }}
            >
              {copied === s.id ? "Copied ✓" : "Copy link"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
