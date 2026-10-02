"use client"

import { useEffect, useState, useCallback } from "react"
import { BarChart3, Users, Eye, Clock, RefreshCw, Monitor, TrendingUp } from "lucide-react"

type LiveView = {
  id: string
  path: string
  userId: string | null
  sessionId: string
  durationMs: number
  createdAt: string
  updatedAt: string
  userName?: string | null
  userEmail?: string | null
}

type TopPage = {
  path: string
  views: number
  totalDurationMs: number
  uniqueSessions: number
}

type Props = {
  initialLive: LiveView[]
  topPages: TopPage[]
  totalViews: number
  activeSessionsCount: number
  avgDurationMs: number
}

function fmtDuration(ms: number) {
  if (ms < 1000) return "<1s"
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}m ${rem.toString().padStart(2, "0")}s`
}

export default function LiveAnalyticsClient({ initialLive, topPages, totalViews, activeSessionsCount, avgDurationMs }: Props) {
  const [liveViews, setLiveViews] = useState<LiveView[]>(initialLive)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch("/api/admin/live-views")
      if (res.ok) {
        const data = await res.json()
        setLiveViews(data.views)
        setLastRefresh(new Date())
      }
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(refresh, 60000) // Increased from 30s to 60s to reduce server load
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <div className="space-y-8">
      {/* Live Activity Feed */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-content-primary">Live Page Activity</h3>
            <span className="text-[10px] text-content-muted">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={refresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-xs font-bold text-content-secondary hover:text-content-primary bg-surface-muted hover:bg-accent px-3 py-1.5 rounded-lg transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-muted">
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">User</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Page</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Time Spent</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Session</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {liveViews.length > 0 ? liveViews.map((v) => (
                <tr key={v.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand text-[10px] font-bold">
                        {v.userId ? (v.userName || v.userEmail || "U")[0].toUpperCase() : "?"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-content-primary">
                          {v.userId ? (v.userName || v.userEmail || "Logged in") : "Anonymous"}
                        </p>
                        {v.userEmail && (
                          <p className="text-[10px] text-content-muted truncate max-w-[160px]">{v.userEmail}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-brand bg-brand/10 px-2 py-1 rounded-lg">
                      {v.path}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-warning" />
                      <span className="text-xs font-bold text-content-primary">{fmtDuration(v.durationMs)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-content-muted">{v.sessionId.slice(0, 8)}...</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-content-muted">
                      {new Date(v.updatedAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Monitor className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                    <p className="text-content-muted text-sm">No page views recorded yet.</p>
                    <p className="text-content-muted text-xs mt-1">Views will appear here as users browse the site.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-violet" /> Top Pages by Views
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-muted">
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Page</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Views</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Unique Sessions</th>
                <th className="px-6 py-3 text-[10px] font-bold text-content-muted uppercase tracking-widest">Avg Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {topPages.map((p, i) => (
                <tr key={i} className="hover:bg-surface-muted transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-brand">{p.path}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-content-primary">{p.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-content-primary">{p.uniqueSessions}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-warning font-bold">
                      {fmtDuration(p.views > 0 ? Math.floor(p.totalDurationMs / p.views) : 0)}
                    </span>
                  </td>
                </tr>
              ))}
              {topPages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-content-muted text-sm">
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
