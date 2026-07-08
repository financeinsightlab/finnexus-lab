"use client"

// ─── Export Leads Client ───────────────────────────────────────────────────────
// Filter and export leads as CSV or Excel

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  FileSpreadsheet,
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Filter,
} from "lucide-react"

interface ExportClientProps {
  statuses: { status: string; _count: { id: number } }[]
  sources: { source: string; _count: { id: number } }[]
  industries: { industry: string | null; _count: { id: number } }[]
  totalLeads: number
}

const STATUS_LABELS: Record<string, string> = {
  NEW: "New", CONTACTED: "Contacted", QUALIFIED: "Qualified",
  PROPOSAL_SENT: "Proposal Sent", NEGOTIATION: "Negotiation",
  WON: "Won", LOST: "Lost", NOT_INTERESTED: "Not Interested", NURTURE: "Nurture",
}

const SOURCE_LABELS: Record<string, string> = {
  MANUAL: "Manual", CSV_IMPORT: "CSV Import", BULK_PASTE: "Bulk Paste",
  GOOGLE_MAPS: "Google Maps", WEBSITE_SCRAPE: "Website Scrape",
  WEB_FORM: "Web Form", LINKEDIN: "LinkedIn", APOLLO: "Apollo",
}

export default function ExportClient({ statuses, sources, industries, totalLeads }: ExportClientProps) {
  const router = useRouter()

  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedSource, setSelectedSource] = useState<string>("")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("")
  const [format, setFormat] = useState<"csv" | "xlsx">("csv")
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const estimatedCount =
    selectedStatus
      ? statuses.find((s) => s.status === selectedStatus)?._count.id ?? 0
      : selectedSource
      ? sources.find((s) => s.source === selectedSource)?._count.id ?? 0
      : totalLeads

  const handleExport = async () => {
    setExporting(true)
    setError(null)
    setDone(false)

    try {
      const res = await fetch("/api/leads/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedStatus || undefined,
          source: selectedSource || undefined,
          industry: selectedIndustry || undefined,
          format,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Export failed")
      }

      // Download the file
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `leads-export-${Date.now()}.${format === "xlsx" ? "xlsx" : "csv"}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => router.push("/admin/leads")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Download className="w-7 h-7 text-blue-400" />
            Export Leads
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {totalLeads.toLocaleString()} total leads available. Apply filters to narrow your export.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Done */}
      {done && (
        <div className="mb-6 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Export completed! Your {format.toUpperCase()} file has been downloaded.
        </div>
      )}

      {/* Filters */}
      <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-500" />
          Filter Leads
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">By Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setSelectedSource(""); setSelectedIndustry("") }}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50"
              aria-label="Filter by status"
            >
              <option value="" className="bg-[#1A1F2E]">All Statuses ({totalLeads.toLocaleString()})</option>
              {statuses.map((s) => (
                <option key={s.status} value={s.status} className="bg-[#1A1F2E]">
                  {STATUS_LABELS[s.status] ?? s.status} ({s._count.id})
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">By Source</label>
            <select
              value={selectedSource}
              onChange={(e) => { setSelectedSource(e.target.value); setSelectedStatus(""); setSelectedIndustry("") }}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50"
              aria-label="Filter by source"
            >
              <option value="" className="bg-[#1A1F2E]">All Sources</option>
              {sources.map((s) => (
                <option key={s.source} value={s.source} className="bg-[#1A1F2E]">
                  {SOURCE_LABELS[s.source] ?? s.source.replace("_", " ")} ({s._count.id})
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">By Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => { setSelectedIndustry(e.target.value); setSelectedStatus(""); setSelectedSource("") }}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50"
              aria-label="Filter by industry"
            >
              <option value="" className="bg-[#1A1F2E]">All Industries</option>
              {industries.filter((i) => i.industry).map((ind) => (
                <option key={ind.industry} value={ind.industry!} className="bg-[#1A1F2E]">
                  {ind.industry} ({ind._count.id})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Format Selection */}
      <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Export Format</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setFormat("csv")}
            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${
              format === "csv"
                ? "bg-blue-500/10 border-blue-500/40"
                : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
            }`}
          >
            <FileText className={`w-8 h-8 ${format === "csv" ? "text-blue-400" : "text-slate-600"}`} />
            <div className="text-left">
              <p className={`text-sm font-medium ${format === "csv" ? "text-blue-400" : "text-slate-300"}`}>CSV</p>
              <p className="text-xs text-slate-500">Universal format. Opens in Excel, Sheets, or any text editor.</p>
            </div>
          </button>

          <button
            onClick={() => setFormat("xlsx")}
            className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${
              format === "xlsx"
                ? "bg-emerald-500/10 border-emerald-500/40"
                : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
            }`}
          >
            <FileSpreadsheet className={`w-8 h-8 ${format === "xlsx" ? "text-emerald-400" : "text-slate-600"}`} />
            <div className="text-left">
              <p className={`text-sm font-medium ${format === "xlsx" ? "text-emerald-400" : "text-slate-300"}`}>Excel (XLSX)</p>
              <p className="text-xs text-slate-500">Native Excel format with formatting and multiple columns.</p>
            </div>
          </button>
        </div>
      </section>

      {/* Summary & Export Button */}
      <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Ready to export{" "}
              <span className="text-white font-semibold">{estimatedCount.toLocaleString()}</span> leads
              {selectedStatus && <> with status <span className="text-[#0D6E6E]">{STATUS_LABELS[selectedStatus] ?? selectedStatus}</span></>}
              {selectedSource && <> from source <span className="text-[#0D6E6E]">{SOURCE_LABELS[selectedSource] ?? selectedSource}</span></>}
              {selectedIndustry && <> in <span className="text-[#0D6E6E]">{selectedIndustry}</span></>}
              {" "}as <span className="text-white font-semibold">{format.toUpperCase()}</span>
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all font-medium disabled:opacity-40"
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export {estimatedCount.toLocaleString()} Leads
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  )
}