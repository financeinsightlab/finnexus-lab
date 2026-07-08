// ─── Business Discovery Scraper: Client ─────────────────────────────────────────
// /admin/leads/scrape/maps — Discover leads via DuckDuckGo + Yelp + website scraping + AI

"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  MapPin,
  Globe,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Building2,
  ExternalLink,
  ChevronRight,
  Settings,
} from "lucide-react"

interface ScrapeJob {
  id: string
  type: string
  searchKeyword: string
  searchLocation: string
  searchRadius: number | null
  maxResults: number
  status: string
  totalFound: number
  totalScraped: number
  totalImported: number
  totalSkipped: number
  totalEnriched: number
  errors: { step: string; message: string; url?: string }[] | null
  durationMs: number
  startedAt: string
  completedAt: string | null
  leads?: { id: string; companyName: string | null; fullName: string | null; city: string | null; status: string; score: number }[]
}

const RENDER_STATUS = {
  PENDING: { label: "Queued", color: "text-slate-400", bg: "bg-slate-500" },
  RUNNING: { label: "Starting...", color: "text-blue-400", bg: "bg-blue-500" },
  SCRAPING_GMAPS: { label: "Searching business directories", color: "text-amber-400", bg: "bg-amber-500" },
  SCRAPING_WEBSITES: { label: "Scraping Websites", color: "text-purple-400", bg: "bg-purple-500" },
  ENRICHING_AI: { label: "AI Enrichment", color: "text-pink-400", bg: "bg-pink-500" },
  COMPLETED: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-500" },
  FAILED: { label: "Failed", color: "text-red-400", bg: "bg-red-500" },
} as const

// Popular business categories for quick suggestions
const BUSINESS_CATEGORIES = [
  "Software companies", "Marketing agencies", "Law firms", "Real estate agents",
  "Dental clinics", "Restaurants", "Hotels", "Gyms", "Accounting firms",
  "Architecture firms", "Construction companies", "Insurance brokers",
  "Logistics companies", "Manufacturing", "Consulting firms",
]

export default function ScrapeMapsClient() {
  const router = useRouter()

  // Form State
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [scrapeWebsites, setScrapeWebsites] = useState(true)
  const [useAI, setUseAI] = useState(true)
  const [maxResults, setMaxResults] = useState(20)
  const [hfKeyConfigured, setHfKeyConfigured] = useState<boolean | null>(null)

  // Check if HF key is configured
  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/leads/settings")
        if (res.ok) {
          const data = await res.json()
          setHfKeyConfigured(data.source !== "none")
        }
      } catch {
        setHfKeyConfigured(false)
      }
    }
    check()
  }, [])

  // Job State
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [job, setJob] = useState<ScrapeJob | null>(null)
  const [polling, setPolling] = useState(false)

  // Poll for job status updates
  const pollJob = useCallback(async (jobId: string) => {
    setPolling(true)
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/scrape/google-maps?jobId=${jobId}`)
        const data = await res.json()
        if (data.job) {
          setJob(data.job)
          if (data.job.status === "COMPLETED" || data.job.status === "FAILED") {
            clearInterval(interval)
            setPolling(false)
          }
        }
      } catch {
        // Retry
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim() || !location.trim()) {
      setError("Keyword and location are required")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/scrape/google-maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword.trim(),
          location: location.trim(),
          scrapeWebsites,
          useAI,
          maxResults,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to start scrape")

      setJob(data.job)
      pollJob(data.job.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start scrape job")
    } finally {
      setSubmitting(false)
    }
  }

  const isRunning = job && !["COMPLETED", "FAILED"].includes(job.status)
  const statusInfo = job ? RENDER_STATUS[job.status as keyof typeof RENDER_STATUS] ?? RENDER_STATUS.PENDING : null

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/leads")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-emerald-400" />
          Discover Leads
        </h1>
        <div className="w-20" />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Form (hidden when job is running/completed) */}
      {!job && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Search Parameters</h2>

            {/* Keyword with quick suggestions */}
            <div className="mb-4">
              <label className="block text-xs text-slate-500 mb-2">What are you looking for?</label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Software companies, Marketing agencies, Law firms..."
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {BUSINESS_CATEGORIES.slice(0, 8).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setKeyword(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      keyword === cat
                        ? "bg-[#0D6E6E]/20 border border-[#0D6E6E]/40 text-[#0D6E6E]"
                        : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-2">In which location?</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA or Mumbai, India"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
                />
              </div>
            </div>
          </section>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Enrichment Options</h2>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scrapeWebsites}
                  onChange={(e) => setScrapeWebsites(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/[0.2] bg-white/[0.03] text-[#0D6E6E] focus:ring-[#0D6E6E] focus:ring-0"
                />
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    Scrape company websites
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Visit each company's website to extract emails, phones, and additional context
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/[0.2] bg-white/[0.03] text-[#0D6E6E] focus:ring-[#0D6E6E] focus:ring-0"
                />
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI enrichment (Hugging Face)
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Use AI to extract structured data like industry, company size, and key contacts
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* HF Key Warning */}
          {useAI && hfKeyConfigured === false && (
            <div className="px-4 py-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-400">Hugging Face API key not configured</p>
                <p className="text-xs text-amber-400/70 mt-0.5">
                  AI enrichment won't work without an API key. Get a free key at{" "}
                  <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">
                    huggingface.co/settings/tokens
                  </a>
                  {" "}and paste it in{" "}
                  <Link href="/admin/leads/settings" className="underline inline-flex items-center gap-0.5">
                    Settings <Settings className="w-3 h-3" />
                  </Link>
                </p>
              </div>
            </div>
          )}

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
            <div>
              <label className="block text-xs text-slate-500 mb-2">Max results</label>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={maxResults}
                onChange={(e) => setMaxResults(parseInt(e.target.value))}
                className="w-full accent-[#0D6E6E]"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5</span>
                <span className="text-white font-medium">{maxResults}</span>
                <span>50</span>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting || !keyword.trim() || !location.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-600/30 transition-all font-medium disabled:opacity-40"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting scrape...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Start Discovering Leads
              </>
            )}
          </button>
        </form>
      )}

      {/* ── Job Progress ── */}
      {job && (
        <div className="space-y-6">
          {/* Status Card */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  {job.searchKeyword} in {job.searchLocation}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Started {new Date(job.startedAt).toLocaleString("en-IN")}
                </p>
              </div>
              {statusInfo && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusInfo.color} bg-white/[0.03] border border-white/[0.06]`}>
                  <div className={`w-2 h-2 rounded-full ${statusInfo.bg} ${isRunning ? "animate-pulse" : ""}`} />
                  {statusInfo.label}
                </div>
              )}
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-xl font-bold text-white">{job.totalFound}</p>
                <p className="text-xs text-slate-500">Found</p>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-xl font-bold text-emerald-400">{job.totalImported}</p>
                <p className="text-xs text-slate-500">Imported</p>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-xl font-bold text-purple-400">{job.totalEnriched}</p>
                <p className="text-xs text-slate-500">AI Enriched</p>
              </div>
            </div>

            {/* Status Pipeline */}
            {isRunning && (
              <div className="mb-6">
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#0D6E6E] rounded-full transition-all duration-1000"
                    style={{
                      width: job.status === "SCRAPING_GMAPS" ? "33%" : job.status === "SCRAPING_WEBSITES" ? "66%" : job.status === "ENRICHING_AI" ? "85%" : "0%",
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
                  <span>Directories</span>
                  <span>Websites</span>
                  <span>AI</span>
                  <span>Done</span>
                </div>
              </div>
            )}

            {/* Duration */}
            {job.completedAt && (
              <p className="text-xs text-slate-600">
                Completed in {(job.durationMs / 1000).toFixed(1)}s
              </p>
            )}
          </section>

          {/* Errors */}
          {job.errors && job.errors.length > 0 && (
            <section className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {job.errors.length} Errors
              </h3>
              <div className="space-y-1">
                {job.errors.slice(0, 5).map((err, i) => (
                  <p key={i} className="text-xs text-slate-400">
                    [{err.step}] {err.message}
                    {err.url && <span className="text-slate-600"> — {err.url}</span>}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Imported Leads */}
          {job.leads && job.leads.length > 0 && (
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {job.totalImported} Leads Imported
              </h3>
              <div className="space-y-2">
                {job.leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:bg-white/[0.04] transition-all text-left group"
                  >
                    <Building2 className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">
                        {lead.companyName || lead.fullName || "Unnamed Lead"}
                      </p>
                      {lead.city && <p className="text-xs text-slate-500">{lead.city}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        lead.score >= 80 ? "bg-red-500/10 text-red-400" : lead.score >= 50 ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {lead.score}
                      </span>
                      <span className="text-xs text-slate-500">{lead.status.replace("_", " ")}</span>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/leads")}
              className="px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
            >
              View All Leads
            </button>
            {job.status === "COMPLETED" || job.status === "FAILED" ? (
              <button
                onClick={() => { setJob(null); setError(null) }}
                className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
              >
                New Search
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}