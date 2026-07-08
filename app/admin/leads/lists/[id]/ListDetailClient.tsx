"use client"

// ─── List Detail Client ────────────────────────────────────────────────────────
// View/edit list details, manage members

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Users,
  Trash2,
  Save,
  Edit3,
  X,
  Building2,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  AlertCircle,
} from "lucide-react"

interface LeadMember {
  lead: {
    id: string
    firstName: string | null
    lastName: string | null
    fullName: string | null
    companyName: string | null
    jobTitle: string | null
    industry: string | null
    status: string
    score: number
    source: string
    emails: unknown
    phones: unknown
    city: string | null
    state: string | null
    aiEnriched: boolean
    tags: string[]
    createdAt: string
  }
}

interface LeadList {
  id: string
  name: string
  description: string | null
  color: string | null
  members: LeadMember[]
  _count: { members: number }
  createdAt: string
  updatedAt: string
}

interface Props {
  list: LeadList
}

const LIST_COLORS = [
  "#0D6E6E", "#3B82F6", "#8B5CF6", "#EF4444", "#F59E0B",
  "#10B981", "#EC4899", "#6366F1", "#14B8A6", "#F97316",
]

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-slate-500", CONTACTED: "bg-blue-500", QUALIFIED: "bg-amber-500",
  PROPOSAL_SENT: "bg-purple-500", NEGOTIATION: "bg-orange-500",
  WON: "bg-emerald-500", LOST: "bg-red-500", NURTURE: "bg-cyan-500",
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

export default function ListDetailClient({ list }: Props) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(list.name)
  const [description, setDescription] = useState(list.description ?? "")
  const [color, setColor] = useState(list.color ?? LIST_COLORS[0])
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [removing, setRemoving] = useState(false)

  const handleUpdate = async () => {
    if (!name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/lists/${list.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() || null, color }),
      })
      if (!res.ok) throw new Error("Failed to update list")
      setIsEditing(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update list")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete the list "${list.name}"? Members will be removed but leads preserved.`)) return
    await fetch(`/api/lists/${list.id}`, { method: "DELETE" })
    router.push("/admin/leads/lists")
  }

  const handleRemoveMembers = async () => {
    if (selectedIds.size === 0) return
    setRemoving(true)
    setError(null)
    try {
      const leadIds = [...selectedIds].join(",")
      await fetch(`/api/lists/${list.id}/leads?leadIds=${leadIds}`, { method: "DELETE" })
      setSelectedIds(new Set())
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove members")
    } finally {
      setRemoving(false)
    }
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/admin/leads/lists")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Lists
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete List
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* List Info */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-6">
        {isEditing ? (
          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-lg font-semibold text-white focus:outline-none focus:border-[#0D6E6E]/50"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
            />
            <div className="flex gap-2">
              {LIST_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full transition-all ${color === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#0A0F1A]" : ""}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleUpdate} disabled={saving} className="flex items-center gap-1 px-3 py-1.5 bg-[#0D6E6E] text-white rounded-lg text-xs font-medium">
                <Save className="w-3 h-3" /> {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-lg text-xs">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
              <div>
                <h1 className="text-2xl font-bold text-white">{name}</h1>
                {description && <p className="text-sm text-slate-400 mt-0.5">{description}</p>}
                <p className="text-xs text-slate-500 mt-1">
                  <Users className="w-3 h-3 inline mr-1" />
                  {list._count.members} members
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.06] rounded-lg"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-[#0D6E6E]/10 border border-[#0D6E6E]/30 rounded-xl">
          <span className="text-sm text-[#0D6E6E] font-medium">{selectedIds.size} selected</span>
          <button
            onClick={handleRemoveMembers}
            disabled={removing}
            className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/30 disabled:opacity-40"
          >
            {removing ? "Removing..." : "Remove from List"}
          </button>
        </div>
      )}

      {/* Members Table */}
      <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-4 py-3 text-left">
                  <button onClick={() => setSelectedIds(selectedIds.size === list.members.length ? new Set() : new Set(list.members.map((m) => m.lead.id)))} className="text-slate-500 hover:text-white">
                    {selectedIds.size === list.members.length && list.members.length > 0 ? "☑" : "☐"}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Score</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.members.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <Users className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-400 font-medium">No leads in this list</p>
                    <p className="text-slate-600 text-sm mt-1">Add leads from the lead browser</p>
                  </td>
                </tr>
              )}
              {list.members.map((member) => {
                const lead = member.lead
                return (
                  <tr key={lead.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleSelect(lead.id)} className="text-slate-600 hover:text-slate-400">
                        {selectedIds.has(lead.id) ? "☑" : "☐"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => router.push(`/admin/leads/${lead.id}`)} className="hover:text-[#0D6E6E] transition-colors text-left">
                        <p className="text-sm font-medium text-white">
                          {lead.fullName || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "Unnamed"}
                        </p>
                        {lead.jobTitle && <p className="text-xs text-slate-500">{lead.jobTitle}</p>}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{lead.companyName ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {getPrimaryEmail(lead.emails) && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Mail className="w-3 h-3" />{getPrimaryEmail(lead.emails)}
                          </div>
                        )}
                        {getPrimaryPhone(lead.phones) && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Phone className="w-3 h-3" />{getPrimaryPhone(lead.phones)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs">
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[lead.status] ?? "bg-slate-500"}`} />
                        <span className="text-slate-300">{lead.status.replace("_", " ")}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${
                        lead.score >= 80 ? "text-red-400" : lead.score >= 50 ? "text-amber-400" : "text-blue-400"
                      }`}>
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => router.push(`/admin/leads/${lead.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}