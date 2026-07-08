"use client"

// ─── Lead Pipeline Kanban ──────────────────────────────────────────────────────
// Drag-and-drop kanban board for lead pipeline management. No external deps needed
// — uses native HTML5 drag-and-drop for simplicity.

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  GripVertical,
  Building2,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Plus,
} from "lucide-react"

interface Lead {
  id: string
  firstName: string | null
  lastName: string | null
  fullName: string | null
  companyName: string | null
  jobTitle: string | null
  emails: unknown
  phones: unknown
  city: string | null
  state: string | null
  status: string
  score: number
  source: string
  aiEnriched: boolean
  tags: string[]
}

interface Props {
  leads: Lead[]
}

interface Column {
  status: string
  label: string
  color: string
  borderColor: string
  bgColor: string
  leads: Lead[]
}

// Pipeline stage definitions
const PIPELINE_STAGES: { status: string; label: string; color: string; borderColor: string; bgColor: string }[] = [
  { status: "NEW", label: "New", color: "bg-slate-500", borderColor: "border-slate-500/30", bgColor: "bg-slate-500/5" },
  { status: "CONTACTED", label: "Contacted", color: "bg-blue-500", borderColor: "border-blue-500/30", bgColor: "bg-blue-500/5" },
  { status: "QUALIFIED", label: "Qualified", color: "bg-amber-500", borderColor: "border-amber-500/30", bgColor: "bg-amber-500/5" },
  { status: "PROPOSAL_SENT", label: "Proposal", color: "bg-purple-500", borderColor: "border-purple-500/30", bgColor: "bg-purple-500/5" },
  { status: "NEGOTIATION", label: "Negotiation", color: "bg-orange-500", borderColor: "border-orange-500/30", bgColor: "bg-orange-500/5" },
  { status: "WON", label: "Won", color: "bg-emerald-500", borderColor: "border-emerald-500/30", bgColor: "bg-emerald-500/5" },
  { status: "LOST", label: "Lost", color: "bg-red-500", borderColor: "border-red-500/30", bgColor: "bg-red-500/5" },
  { status: "NURTURE", label: "Nurture", color: "bg-cyan-500", borderColor: "border-cyan-500/30", bgColor: "bg-cyan-500/5" },
]

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

const SCORE_COLOR = (score: number) =>
  score >= 80 ? "text-red-400" : score >= 50 ? "text-amber-400" : "text-blue-400"

export default function PipelineKanban({ leads }: Props) {
  const router = useRouter()
  const [columns, setColumns] = useState<Column[]>(() =>
    PIPELINE_STAGES.map((stage) => ({
      ...stage,
      leads: leads.filter((l) => l.status === stage.status),
    }))
  )
  const [draggedLead, setDraggedLead] = useState<{ id: string; sourceStatus: string } | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const handleDragStart = useCallback((leadId: string, sourceStatus: string) => {
    setDraggedLead({ id: leadId, sourceStatus })
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, status: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverStatus(status)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverStatus(null)
  }, [])

  const handleDrop = useCallback(
    async (targetStatus: string) => {
      setDragOverStatus(null)
      if (!draggedLead || draggedLead.sourceStatus === targetStatus) {
        setDraggedLead(null)
        return
      }

      const { id, sourceStatus } = draggedLead
      setDraggedLead(null)
      setUpdating(true)

      // Optimistic update
      setColumns((prev) => {
        const newCols = prev.map((col) => ({ ...col, leads: [...col.leads] }))
        const sourceCol = newCols.find((c) => c.status === sourceStatus)
        const targetCol = newCols.find((c) => c.status === targetStatus)
        if (!sourceCol || !targetCol) return prev

        const leadIdx = sourceCol.leads.findIndex((l) => l.id === id)
        if (leadIdx === -1) return prev
        const [lead] = sourceCol.leads.splice(leadIdx, 1)
        lead.status = targetStatus
        targetCol.leads.push(lead)
        return newCols
      })

      // API call
      try {
        await fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: targetStatus }),
        })
      } catch {
        // Revert on failure
        setColumns((prev) => {
          const newCols = prev.map((col) => ({ ...col, leads: [...col.leads] }))
          const targetCol = newCols.find((c) => c.status === targetStatus)
          const sourceCol = newCols.find((c) => c.status === sourceStatus)
          if (!targetCol || !sourceCol) return prev

          const leadIdx = targetCol.leads.findIndex((l) => l.id === id)
          if (leadIdx === -1) return prev
          const [lead] = targetCol.leads.splice(leadIdx, 1)
          lead.status = sourceStatus
          sourceCol.leads.push(lead)
          return newCols
        })
      } finally {
        setUpdating(false)
      }
    },
    [draggedLead]
  )

  const totalLeads = columns.reduce((sum, col) => sum + col.leads.length, 0)

  return (
    <div>
      {/* Pipeline header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline</h1>
          <p className="text-sm text-slate-400 mt-1">{totalLeads} leads across 8 stages</p>
        </div>
        {updating && (
          <span className="text-xs text-slate-500 animate-pulse">Updating...</span>
        )}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.status}
            onDragOver={(e) => handleDragOver(e, column.status)}
            onDragLeave={handleDragLeave}
            onDrop={() => handleDrop(column.status)}
            className={`flex-shrink-0 w-72 rounded-2xl border transition-all ${
              dragOverStatus === column.status
                ? `${column.borderColor} bg-white/[0.03] shadow-lg shadow-${column.color.split("-")[1]}-500/10`
                : "border-white/[0.04] bg-white/[0.01]"
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
                <h3 className="text-sm font-semibold text-white">{column.label}</h3>
                <span className="text-xs text-slate-500 tabular-nums">{column.leads.length}</span>
              </div>
              <button
                onClick={() => router.push(`/admin/leads/new`)}
                className="p-1 text-slate-600 hover:text-white rounded transition-colors"
                title={`Add lead to ${column.label}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Cards */}
            <div className="px-2 py-2 space-y-2 min-h-[120px] max-h-[calc(100vh-300px)] overflow-y-auto">
              {column.leads.length === 0 && (
                <div className="px-3 py-6 text-center">
                  <p className="text-xs text-slate-600">
                    {dragOverStatus === column.status ? "Drop here" : "No leads"}
                  </p>
                </div>
              )}
              {column.leads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead.id, column.status)}
                  onClick={() => router.push(`/admin/leads/${lead.id}`)}
                  className={`group bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-white/[0.1] hover:bg-white/[0.03] transition-all ${
                    draggedLead?.id === lead.id ? "opacity-40 scale-95" : ""
                  }`}
                >
                  {/* Drag handle + Name */}
                  <div className="flex items-start gap-2 mb-1.5">
                    <GripVertical className="w-3.5 h-3.5 text-slate-700 mt-0.5 flex-shrink-0 group-hover:text-slate-500 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {lead.fullName || `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "Unnamed"}
                      </p>
                      {lead.jobTitle && (
                        <p className="text-xs text-slate-500 truncate">{lead.jobTitle}</p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  {lead.companyName && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Building2 className="w-3 h-3 text-slate-600 flex-shrink-0" />
                      <span className="text-xs text-slate-400 truncate">{lead.companyName}</span>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="space-y-0.5 mb-2">
                    {getPrimaryEmail(lead.emails) && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{getPrimaryEmail(lead.emails)}</span>
                      </div>
                    )}
                    {getPrimaryPhone(lead.phones) && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Phone className="w-3 h-3" />
                        <span className="truncate">{getPrimaryPhone(lead.phones)}</span>
                      </div>
                    )}
                    {(lead.city || lead.state) && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{[lead.city, lead.state].filter(Boolean).join(", ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${SCORE_COLOR(lead.score)}`}>
                      {lead.score}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {lead.aiEnriched && (
                        <span className="text-[10px] text-purple-400" title="AI Enriched">🤖</span>
                      )}
                      <span className="text-[10px] text-slate-600">
                        {lead.source === "GOOGLE_MAPS" ? "🗺️" : lead.source === "CSV_IMPORT" ? "📄" : lead.source === "MANUAL" ? "✏️" : "📋"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}