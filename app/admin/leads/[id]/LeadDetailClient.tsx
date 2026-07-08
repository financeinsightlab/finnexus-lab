"use client"

// ─── Lead Detail Client Component ──────────────────────────────────────────────

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Calendar,
  Tag,
  Edit3,
  Save,
  X,
  Sparkles,
  Trash2,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

interface Lead {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  jobTitle: string | null
  department: string | null
  seniority: string | null
  companyName: string | null
  companyDomain: string | null
  companySize: string | null
  industry: string | null
  website: string | null
  emails: unknown
  phones: unknown
  linkedInUrl: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  postalCode: string | null
  status: string
  score: number
  scoreBreakdown: unknown
  source: string
  aiEnriched: boolean
  aiConfidence: number | null
  tags: string[]
  notes: string | null
  activities: Array<{
    id: string
    type: string
    summary: string | null
    metadata: unknown
    createdAt: string
  }>
  listMemberships: Array<{
    list: { id: string; name: string; color: string | null }
  }>
  createdAt: string
}

interface Props {
  lead: Lead
}

const STATUS_OPTIONS = [
  "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST", "NURTURE",
]

function getEmails(emails: unknown): { email: string; type: string }[] {
  return (emails as { email: string; type: string }[]) ?? []
}

function getPhones(phones: unknown): { number: string; type: string }[] {
  return (phones as { number: string; type: string }[]) ?? []
}

export default function LeadDetailClient({ lead }: Props) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: lead.firstName ?? "",
    lastName: lead.lastName ?? "",
    jobTitle: lead.jobTitle ?? "",
    companyName: lead.companyName ?? "",
    industry: lead.industry ?? "",
    website: lead.website ?? "",
    city: lead.city ?? "",
    state: lead.state ?? "",
    country: lead.country ?? "",
    notes: lead.notes ?? "",
    status: lead.status,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      setIsEditing(false)
      router.refresh()
    }
    setSaving(false)
  }

  const handleStatusChange = async (newStatus: string) => {
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm("Delete this lead? This cannot be undone.")) return
    await fetch(`/api/leads/${lead.id}`, { method: "DELETE" })
    router.push("/admin/leads")
  }

  const handleEnrich = async () => {
    await fetch("/api/enrich/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: lead.id }),
    })
    router.refresh()
  }

  const emails = getEmails(lead.emails)
  const phones = getPhones(lead.phones)

  const scoreColor = lead.score >= 80 ? "text-red-400" : lead.score >= 50 ? "text-amber-400" : "text-blue-400"

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/leads" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <div className="flex items-center gap-2">
          {!lead.aiEnriched && (
            <button
              onClick={handleEnrich}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-600/30 transition-all text-sm"
            >
              <Sparkles className="w-4 h-4" />
              AI Enrich
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-600/20 transition-all text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {lead.fullName || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "Unnamed Lead"}
                </h1>
                {lead.jobTitle && <p className="text-slate-400 mt-1">{lead.jobTitle}</p>}
                {lead.companyName && (
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-300">{lead.companyName}</span>
                    {lead.companyDomain && <span className="text-slate-600">· {lead.companyDomain}</span>}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${scoreColor}`}>{lead.score}</div>
                <div className="text-xs text-slate-500">Lead Score</div>
              </div>
            </div>

            {/* Status Pipeline */}
            <div className="mt-4 flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    lead.status === s
                      ? "bg-[#0D6E6E] text-white"
                      : "bg-white/[0.03] text-slate-500 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] rounded-lg"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">First Name</label>
                    <input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Last Name</label>
                    <input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Job Title</label>
                    <input
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Company</label>
                    <input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Industry</label>
                    <input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Website</label>
                    <input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">City</label>
                    <input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">State</label>
                    <input
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Country</label>
                    <input
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white resize-none"
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {emails.length > 0 && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    {emails.map((e, i) => (
                      <span key={i}>{e.email}</span>
                    ))}
                  </div>
                )}
                {phones.length > 0 && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-500" />
                    {phones.map((p, i) => (
                      <span key={i}>{p.number}</span>
                    ))}
                  </div>
                )}
                {lead.website && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[#0D6E6E] hover:underline">
                      {lead.website}
                    </a>
                  </div>
                )}
                {(lead.city || lead.state) && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {[lead.city, lead.state, lead.country].filter(Boolean).join(", ")}
                  </div>
                )}
                {lead.industry && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Tag className="w-4 h-4 text-slate-500" />
                    {lead.industry}
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Created {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {lead.notes && !isEditing && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Notes</h2>
              <p className="text-sm text-slate-400 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Activity Timeline</h2>
            <div className="space-y-3">
              {lead.activities.length === 0 && (
                <p className="text-sm text-slate-600">No activity yet</p>
              )}
              {lead.activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300">{activity.summary}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {new Date(activity.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Breakdown */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Score Breakdown</h2>
            <div className="text-center mb-4">
              <div className={`text-4xl font-bold ${scoreColor}`}>{lead.score}</div>
              <div className="text-xs text-slate-500 mt-1">out of 100</div>
            </div>
            {lead.aiEnriched && lead.aiConfidence != null && (
              <div className="text-center mb-3 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <span className="text-xs text-purple-400">🤖 AI Confidence: {Math.round(lead.aiConfidence * 100)}%</span>
              </div>
            )}
          </div>

          {/* Source & Metadata */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Source</span>
                <span className="text-slate-300">{lead.source.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-slate-300">{lead.status.replace("_", " ")}</span>
              </div>
              {lead.seniority && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Seniority</span>
                  <span className="text-slate-300">{lead.seniority}</span>
                </div>
              )}
              {lead.companySize && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Company Size</span>
                  <span className="text-slate-300">{lead.companySize}</span>
                </div>
              )}
            </div>
          </div>

          {/* Lists */}
          {lead.listMemberships.length > 0 && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Lists</h2>
              <div className="space-y-1.5">
                {lead.listMemberships.map((m) => (
                  <Link
                    key={m.list.id}
                    href={`/admin/leads/lists/${m.list.id}`}
                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.list.color ?? "#0D6E6E" }} />
                    <span className="text-sm text-slate-300">{m.list.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}