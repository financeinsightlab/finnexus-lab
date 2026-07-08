"use client"

// ─── Lists Management Client ───────────────────────────────────────────────────
// Full CRUD for lead lists with member counts and quick actions

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  List,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  ArrowLeft,
  ChevronRight,
  Users,
  AlertCircle,
} from "lucide-react"

interface LeadList {
  id: string
  name: string
  description: string | null
  color: string | null
  _count: { members: number }
  createdAt: string
  updatedAt: string
}

interface Props {
  lists: LeadList[]
}

const LIST_COLORS = [
  "#0D6E6E", "#3B82F6", "#8B5CF6", "#EF4444", "#F59E0B",
  "#10B981", "#EC4899", "#6366F1", "#14B8A6", "#F97316",
]

export default function ListsClient({ lists: initialLists }: Props) {
  const router = useRouter()
  const [lists, setLists] = useState<LeadList[]>(initialLists)
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Create form
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newColor, setNewColor] = useState(LIST_COLORS[0])

  // Edit form
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editColor, setEditColor] = useState("")

  const handleCreate = async () => {
    if (!newName.trim()) return
    setError(null)
    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), description: newDescription.trim() || null, color: newColor }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to create list")
      setLists([data.list, ...lists])
      setNewName("")
      setNewDescription("")
      setShowCreate(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create list")
    }
  }

  const startEdit = (list: LeadList) => {
    setEditingId(list.id)
    setEditName(list.name)
    setEditDescription(list.description ?? "")
    setEditColor(list.color ?? LIST_COLORS[0])
  }

  const handleUpdate = async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`/api/lists/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), description: editDescription.trim() || null, color: editColor }),
      })
      if (!res.ok) throw new Error("Failed to update list")
      setLists((prev) =>
        prev.map((l) =>
          l.id === id
            ? { ...l, name: editName.trim(), description: editDescription.trim() || null, color: editColor }
            : l
        )
      )
      setEditingId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update list")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this list? Members will be removed but leads will not be deleted.")) return
    setError(null)
    try {
      await fetch(`/api/lists/${id}`, { method: "DELETE" })
      setLists((prev) => prev.filter((l) => l.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete list")
    }
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
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
            <List className="w-7 h-7 text-[#0D6E6E]" />
            Lead Lists
          </h1>
          <p className="text-slate-400 text-sm mt-1">Organize leads into segments for campaigns and tracking</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New List
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Create Form */}
      {showCreate && (
        <div className="mb-6 bg-white/[0.02] border border-[#0D6E6E]/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Create New List</h2>
            <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">List Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Hot Leads Q2, Enterprise Prospects"
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Description (optional)</label>
              <input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="A short description..."
                className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-2">Color</label>
              <div className="flex gap-2">
                {LIST_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setNewColor(c)}
                    className={`w-7 h-7 rounded-full transition-all ${newColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#0A0F1A] scale-110" : ""}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium disabled:opacity-40"
              >
                <Save className="w-4 h-4" />
                Create List
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {lists.length === 0 && (
        <div className="text-center py-16">
          <List className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No lists yet</p>
          <p className="text-slate-600 text-sm mt-1">Create your first list to start organizing leads</p>
        </div>
      )}

      {/* Lists */}
      <div className="space-y-3">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-all group"
          >
            {editingId === list.id ? (
              /* Edit mode */
              <div className="space-y-3">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50"
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate(list.id)}
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
                />
                <div className="flex gap-2">
                  {LIST_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setEditColor(c)}
                      className={`w-6 h-6 rounded-full transition-all ${editColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#0A0F1A]" : ""}`}
                      style={{ backgroundColor: c }}
                      aria-label={`Color ${c}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleUpdate(list.id)} className="flex items-center gap-1 px-3 py-1.5 bg-[#0D6E6E] text-white rounded-lg text-xs font-medium">
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-lg text-xs">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Display mode */
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push(`/admin/leads/lists/${list.id}`)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: list.color ?? "#0D6E6E" }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{list.name}</p>
                    {list.description && (
                      <p className="text-xs text-slate-500 truncate">{list.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5" />
                      {list._count.members}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(list) }}
                    className="p-1.5 text-slate-600 hover:text-white transition-colors"
                    title="Edit list"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(list.id) }}
                    className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"
                    title="Delete list"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}