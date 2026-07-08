"use client"

// ─── Lead Browser Client Component ─────────────────────────────────────────────
// Table view with search, filters, bulk select, and quick actions

import { useState, useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  MapPin,
  Tag,
  CheckSquare,
  Square,
  Download,
  Users,
} from "lucide-react"

interface Lead {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  companyName: string | null
  jobTitle: string | null
  industry: string | null
  emails: unknown
  phones: unknown
  city: string | null
  state: string | null
  status: string
  score: number
  source: string
  aiEnriched: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface Props {
  leads: Lead[]
  pagination: Pagination
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-slate-500",
  CONTACTED: "bg-blue-500",
  QUALIFIED: "bg-amber-500",
  PROPOSAL_SENT: "bg-purple-500",
  NEGOTIATION: "bg-orange-500",
  WON: "bg-emerald-500",
  LOST: "bg-red-500",
  NOT_INTERESTED: "bg-gray-500",
  NURTURE: "bg-cyan-500",
}

const SCORE_COLORS = (score: number) => {
  if (score >= 80) return "text-red-400"
  if (score >= 50) return "text-amber-400"
  return "text-blue-400"
}

function getPrimaryEmail(emails: unknown): string | null {
  const arr = emails as { email: string; isPrimary?: boolean }[] | null
  if (!arr?.length) return null
  return arr.find((e: { isPrimary?: boolean }) => e.isPrimary)?.email ?? arr[0]?.email ?? null
}

function getPrimaryPhone(phones: unknown): string | null {
  const arr = phones as { number: string; isPrimary?: boolean }[] | null
  if (!arr?.length) return null
  return arr.find((p: { isPrimary?: boolean }) => p.isPrimary)?.number ?? arr[0]?.number ?? null
}

const BULK_ACTIONS = [
  { label: "Mark as Contacted", action: "status", value: "CONTACTED" },
  { label: "Mark as Qualified", action: "status", value: "QUALIFIED" },
  { label: "Mark as Won", action: "status", value: "WON" },
  { label: "Mark as Lost", action: "status", value: "LOST" },
  { label: "Move to Nurture", action: "status", value: "NURTURE" },
]

export default function LeadBrowserClient({ leads, pagination }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showBulkMenu, setShowBulkMenu] = useState(false)
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "")

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleAll = () => {
    if (selectedIds.size === leads.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(leads.map((l) => l.id)))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) params.set("search", searchInput)
    else params.delete("search")
    params.set("page", "1")
    router.push(`/admin/leads?${params.toString()}`)
  }

  const handleBulkAction = async (action: string, value: string) => {
    const res = await fetch("/api/leads/bulk", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadIds: [...selectedIds], action, value }),
    })
    if (res.ok) {
      setSelectedIds(new Set())
      setShowBulkMenu(false)
      router.refresh()
    }
  }

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get("sortBy")
    const currentOrder = params.get("sortOrder")
    if (current === field) {
      params.set("sortOrder", currentOrder === "asc" ? "desc" : "asc")
    } else {
      params.set("sortBy", field)
      params.set("sortOrder", "desc")
    }
    router.push(`/admin/leads?${params.toString()}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Search + Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search leads by name, company, title..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0D6E6E]/50"
          />
        </form>

        <select
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString())
            if (e.target.value) params.set("status", e.target.value)
            else params.delete("status")
            params.set("page", "1")
            router.push(`/admin/leads?${params.toString()}`)
          }}
          value={searchParams.get("status") ?? ""}
          className="px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="PROPOSAL_SENT">Proposal Sent</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="WON">Won</option>
          <option value="LOST">Lost</option>
          <option value="NURTURE">Nurture</option>
        </select>

        <select
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString())
            if (e.target.value) params.set("source", e.target.value)
            else params.delete("source")
            params.set("page", "1")
            router.push(`/admin/leads?${params.toString()}`)
          }}
          value={searchParams.get("source") ?? ""}
          className="px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none"
        >
          <option value="">All Sources</option>
          <option value="GOOGLE_MAPS">Google Maps</option>
          <option value="WEBSITE_SCRAPE">Website Scrape</option>
          <option value="CSV_IMPORT">CSV Import</option>
          <option value="MANUAL">Manual</option>
          <option value="BULK_PASTE">Bulk Paste</option>
          <option value="WEB_FORM">Web Form</option>
        </select>

        <Link
          href="/admin/leads/export"
          className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-slate-300 hover:text-white transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </Link>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-[#0D6E6E]/10 border border-[#0D6E6E]/30 rounded-xl">
          <span className="text-sm text-[#0D6E6E] font-medium">{selectedIds.size} selected</span>
          <div className="relative">
            <button
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              className="px-3 py-1.5 bg-[#0D6E6E] text-white rounded-lg text-sm hover:bg-[#0B5A5A] transition-colors flex items-center gap-1"
            >
              Bulk Actions
              <ChevronDown className="w-3 h-3" />
            </button>
            {showBulkMenu && (
              <div className="absolute top-full mt-1 left-0 bg-[#1A1F2E] border border-white/[0.08] rounded-xl shadow-xl z-20 py-1 min-w-[200px]">
                {BULK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleBulkAction(action.action, action.value)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-4 py-3 text-left">
                  <button onClick={toggleAll} className="text-slate-500 hover:text-white">
                    {selectedIds.size === leads.length && leads.length > 0 ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort("fullName")} className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-white flex items-center gap-1">
                    Name
                    {searchParams.get("sortBy") === "fullName" && (
                      searchParams.get("sortOrder") === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort("companyName")} className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-white flex items-center gap-1">
                    Company
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort("status")} className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-white flex items-center gap-1">
                    Status
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button onClick={() => handleSort("score")} className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-white flex items-center gap-1">
                    Score
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <Users className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">No leads found</p>
                    <p className="text-slate-600 text-sm mt-1">Import a CSV, scrape Google Maps, or add a lead manually</p>
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-3">
                    <button onClick={() => toggleSelect(lead.id)} className="text-slate-600 group-hover:text-slate-400">
                      {selectedIds.has(lead.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:text-[#0D6E6E] transition-colors">
                      <p className="text-sm font-medium text-white">{lead.fullName || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "Unnamed"}</p>
                      {lead.jobTitle && <p className="text-xs text-slate-500">{lead.jobTitle}</p>}
                    </Link>
                    {lead.aiEnriched && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-400">🤖 AI</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {lead.companyName ? (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{lead.companyName}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-600">—</span>
                    )}
                    {lead.industry && <p className="text-xs text-slate-600 mt-0.5">{lead.industry}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {getPrimaryEmail(lead.emails) && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Mail className="w-3 h-3" />
                          {getPrimaryEmail(lead.emails)}
                        </div>
                      )}
                      {getPrimaryPhone(lead.phones) && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Phone className="w-3 h-3" />
                          {getPrimaryPhone(lead.phones)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {(lead.city || lead.state) ? (
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" />
                        {[lead.city, lead.state].filter(Boolean).join(", ")}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-${STATUS_COLORS[lead.status]?.replace("bg-", "")}/10 text-${STATUS_COLORS[lead.status]?.replace("bg-", "")}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[lead.status] ?? "bg-slate-500"}`} />
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${SCORE_COLORS(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-slate-500">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1}–{Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/admin/leads?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(p) }).toString()}`}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${p === pagination.page ? "bg-[#0D6E6E] text-white" : "bg-white/[0.03] text-slate-400 hover:text-white"}`}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}