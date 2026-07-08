"use client"

// ─── New Lead Page ──────────────────────────────────────────────────────────────
// /admin/leads/new — Manual lead creation + Bulk clipboard paste

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Save,
  ClipboardPaste,
  UserPlus,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
  Tag,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const STATUS_OPTIONS = [
  "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION",
]

const SOURCE_OPTIONS = [
  "MANUAL", "CSV_IMPORT", "BULK_PASTE", "GOOGLE_MAPS", "WEBSITE_SCRAPE", "WEB_FORM", "LINKEDIN", "APOLLO",
]

export default function NewLeadPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Manual Entry Form State ──
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    seniority: "",
    companyName: "",
    companyDomain: "",
    companySize: "",
    industry: "",
    website: "",
    linkedInUrl: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    status: "NEW",
    source: "MANUAL",
    notes: "",
  })
  const [emails, setEmails] = useState<{ email: string; type: string; isPrimary: boolean }[]>([
    { email: "", type: "work", isPrimary: true },
  ])
  const [phones, setPhones] = useState<{ number: string; type: string; isPrimary: boolean }[]>([
    { number: "", type: "office", isPrimary: true },
  ])
  const [tags, setTags] = useState<string[]>([])

  // ── Bulk Paste State ──
  const [bulkText, setBulkText] = useState("")
  const [bulkPreview, setBulkPreview] = useState<{ headers: string[]; rows: Record<string, string>[]; totalRows: number } | null>(null)
  const [bulkParsing, setBulkParsing] = useState(false)
  const [bulkSaving, setBulkSaving] = useState(false)

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const addEmail = () => setEmails([...emails, { email: "", type: "work", isPrimary: false }])
  const removeEmail = (i: number) => setEmails(emails.filter((_, idx) => idx !== i))
  const updateEmail = (i: number, updates: Partial<typeof emails[0]>) => {
    const next = [...emails]
    // If setting primary, unset others
    if (updates.isPrimary) next.forEach((e, idx) => idx !== i && (e.isPrimary = false))
    next[i] = { ...next[i], ...updates }
    setEmails(next)
  }

  const addPhone = () => setPhones([...phones, { number: "", type: "office", isPrimary: false }])
  const removePhone = (i: number) => setPhones(phones.filter((_, idx) => idx !== i))
  const updatePhone = (i: number, updates: Partial<typeof phones[0]>) => {
    const next = [...phones]
    if (updates.isPrimary) next.forEach((p, idx) => idx !== i && (p.isPrimary = false))
    next[i] = { ...next[i], ...updates }
    setPhones(next)
  }

  const addTag = (t: string) => {
    if (t && !tags.includes(t)) setTags([...tags, t])
  }
  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t))

  // ── Submit Manual ──
  const handleManualSave = async () => {
    setError(null)
    setSaving(true)
    try {
      const body = {
        ...form,
        emails: emails.filter((e) => e.email.trim()),
        phones: phones.filter((p) => p.number.trim()),
        tags,
      }
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Failed to create lead")
      }
      const data = await res.json()
      router.push(`/admin/leads/${data.lead.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lead")
    } finally {
      setSaving(false)
    }
  }

  // ── Parse Bulk ──
  const handleParseBulk = async () => {
    setBulkParsing(true)
    setBulkPreview(null)
    try {
      const { parseClipboardData } = await import("@/lib/leads/bulk-paste-parser")
      const result = parseClipboardData(bulkText)
      setBulkPreview(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parse failed")
    }
    setBulkParsing(false)
  }

  // ── Import Bulk ──
  const handleBulkImport = async () => {
    if (!bulkPreview) return
    setBulkSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/leads/import", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: `bulk-paste-${Date.now()}.csv`,
          rows: bulkPreview.rows,
          columnMapping: bulkPreview.headers.map((h: string) => ({ csvColumn: h, leadField: h })),
          duplicateAction: "skip",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Import failed")
      router.push(`/admin/leads?success=imported-${data.imported}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed")
    } finally {
      setBulkSaving(false)
    }
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-[#0D6E6E]" />
          Add Lead
        </h1>
        <div className="w-20" />{/* spacer */}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
        {[
          { id: "manual" as const, label: "Manual Entry", icon: UserPlus },
          { id: "bulk" as const, label: "Bulk Paste", icon: ClipboardPaste },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setError(null) }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#0D6E6E] text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* ── Manual Entry Form ── */}
      {activeTab === "manual" && (
        <div className="space-y-6">
          {/* Contact Info */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Info</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">First Name</label>
                <input value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="John" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Last Name</label>
                <input value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="Doe" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Job Title</label>
                <input value={form.jobTitle} onChange={(e) => updateField("jobTitle", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="CEO" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Department</label>
                <input value={form.department} onChange={(e) => updateField("department", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="Engineering" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Seniority</label>
                <select value={form.seniority} onChange={(e) => updateField("seniority", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50">
                  <option value="" className="bg-[#1A1F2E]">—</option>
                  <option value="C-Level" className="bg-[#1A1F2E]">C-Level</option>
                  <option value="VP" className="bg-[#1A1F2E]">VP</option>
                  <option value="Director" className="bg-[#1A1F2E]">Director</option>
                  <option value="Manager" className="bg-[#1A1F2E]">Manager</option>
                  <option value="Individual Contributor" className="bg-[#1A1F2E]">Individual Contributor</option>
                </select>
              </div>
            </div>

            {/* Emails */}
            <div className="mt-6">
              <label className="block text-xs text-slate-500 mb-2">Emails</label>
              <div className="space-y-2">
                {emails.map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    <input value={e.email} onChange={(ev) => updateEmail(i, { email: ev.target.value })} className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="email@company.com" />
                    <select value={e.type} onChange={(ev) => updateEmail(i, { type: ev.target.value })} className="w-24 px-2 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-xs text-slate-300 focus:outline-none">
                      <option value="work" className="bg-[#1A1F2E]">Work</option>
                      <option value="personal" className="bg-[#1A1F2E]">Personal</option>
                      <option value="other" className="bg-[#1A1F2E]">Other</option>
                    </select>
                    <button onClick={() => updateEmail(i, { isPrimary: !e.isPrimary })} className={`px-2 py-2 text-xs rounded-lg border transition-all ${e.isPrimary ? "bg-[#0D6E6E]/20 border-[#0D6E6E]/40 text-[#0D6E6E]" : "bg-white/[0.03] border-white/[0.06] text-slate-500"}`}>
                      Primary
                    </button>
                    {emails.length > 1 && (
                      <button onClick={() => removeEmail(i)} className="p-2 text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addEmail} className="mt-2 flex items-center gap-1 text-xs text-slate-500 hover:text-[#0D6E6E] transition-colors">
                <Plus className="w-3 h-3" /> Add email
              </button>
            </div>

            {/* Phones */}
            <div className="mt-4">
              <label className="block text-xs text-slate-500 mb-2">Phones</label>
              <div className="space-y-2">
                {phones.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-600 flex-shrink-0" />
                    <input value={p.number} onChange={(ev) => updatePhone(i, { number: ev.target.value })} className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="+1 (555) 000-0000" />
                    <select value={p.type} onChange={(ev) => updatePhone(i, { type: ev.target.value })} className="w-28 px-2 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-xs text-slate-300 focus:outline-none">
                      <option value="office" className="bg-[#1A1F2E]">Office</option>
                      <option value="mobile" className="bg-[#1A1F2E]">Mobile</option>
                      <option value="home" className="bg-[#1A1F2E]">Home</option>
                      <option value="other" className="bg-[#1A1F2E]">Other</option>
                    </select>
                    <button onClick={() => updatePhone(i, { isPrimary: !p.isPrimary })} className={`px-2 py-2 text-xs rounded-lg border transition-all ${p.isPrimary ? "bg-[#0D6E6E]/20 border-[#0D6E6E]/40 text-[#0D6E6E]" : "bg-white/[0.03] border-white/[0.06] text-slate-500"}`}>
                      Primary
                    </button>
                    {phones.length > 1 && (
                      <button onClick={() => removePhone(i)} className="p-2 text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addPhone} className="mt-2 flex items-center gap-1 text-xs text-slate-500 hover:text-[#0D6E6E] transition-colors">
                <Plus className="w-3 h-3" /> Add phone
              </button>
            </div>
          </section>

          {/* Company Info */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-500" />
              Company Info
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Company Name</label>
                <input value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Domain</label>
                <input value={form.companyDomain} onChange={(e) => updateField("companyDomain", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="acme.com" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Company Size</label>
                <select value={form.companySize} onChange={(e) => updateField("companySize", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50">
                  <option value="" className="bg-[#1A1F2E]">—</option>
                  <option value="1-10" className="bg-[#1A1F2E]">1-10</option>
                  <option value="11-50" className="bg-[#1A1F2E]">11-50</option>
                  <option value="51-200" className="bg-[#1A1F2E]">51-200</option>
                  <option value="201-500" className="bg-[#1A1F2E]">201-500</option>
                  <option value="501-1000" className="bg-[#1A1F2E]">501-1000</option>
                  <option value="1001-5000" className="bg-[#1A1F2E]">1001-5000</option>
                  <option value="5001-10000" className="bg-[#1A1F2E]">5001-10000</option>
                  <option value="10001+" className="bg-[#1A1F2E]">10001+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Industry</label>
                <input value={form.industry} onChange={(e) => updateField("industry", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="Fintech" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Website</label>
                <input value={form.website} onChange={(e) => updateField("website", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="https://acme.com" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">LinkedIn URL</label>
                <input value={form.linkedInUrl} onChange={(e) => updateField("linkedInUrl", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-500" />
              Location
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Address</label>
                <input value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">City</label>
                <input value={form.city} onChange={(e) => updateField("city", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="San Francisco" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">State</label>
                <input value={form.state} onChange={(e) => updateField("state", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="CA" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Country</label>
                <input value={form.country} onChange={(e) => updateField("country", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="United States" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Postal Code</label>
                <input value={form.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50" placeholder="94105" />
              </div>
            </div>
          </section>

          {/* Pipeline + Source */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Pipeline & Metadata</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Status</label>
                <select value={form.status} onChange={(e) => updateField("status", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50">
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-[#1A1F2E]">{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Source</label>
                <select value={form.source} onChange={(e) => updateField("source", e.target.value)} className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50">
                  {SOURCE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-[#1A1F2E]">{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <label className="block text-xs text-slate-500 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-300">
                    <Tag className="w-3 h-3" />
                    {t}
                    <button onClick={() => removeTag(t)} className="ml-0.5 text-slate-600 hover:text-red-400"><XIcon /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  id="tag-input"
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTag((e.target as HTMLInputElement).value.trim())
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById("tag-input") as HTMLInputElement
                    addTag(input.value.trim())
                    input.value = ""
                  }}
                  className="px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-slate-400 hover:text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>
            <textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={5}
              className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50 resize-none"
              placeholder="Any additional context about this lead..."
            />
          </section>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Creating..." : "Create Lead"}
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Bulk Paste ── */}
      {activeTab === "bulk" && (
        <div className="space-y-6">
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Paste Bulk Data</h2>
            <p className="text-sm text-slate-500 mb-4">
              Paste tabular data from Excel, Google Sheets, or any spreadsheet. Supports tab, comma, pipe, and multi-space delimiters.
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50 resize-none"
              placeholder={`First Name\tLast Name\tCompany\tEmail\tPhone\nJohn\tDoe\tAcme Inc\tjohn@acme.com\t+1-555-0100\nJane\tSmith\tBeta Corp\tjane@beta.com\t+1-555-0101`}
            />
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleParseBulk}
                disabled={bulkParsing || !bulkText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all text-sm font-medium disabled:opacity-40"
              >
                <ClipboardPaste className="w-4 h-4" />
                {bulkParsing ? "Parsing..." : "Parse Data"}
              </button>
            </div>
          </section>

          {/* Preview */}
          {bulkPreview && (
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  Preview ({bulkPreview.totalRows} leads detected)
                </h2>
                <button
                  onClick={handleBulkImport}
                  disabled={bulkSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {bulkSaving ? "Importing..." : `Import ${bulkPreview.totalRows} Leads`}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {bulkPreview.headers.map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-slate-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bulkPreview.rows.slice(0, 10).map((row, i) => (
                      <tr key={i} className="border-b border-white/[0.02]">
                        {bulkPreview.headers.map((h) => (
                          <td key={h} className="px-3 py-2 text-slate-300 whitespace-nowrap">{row[h] ?? "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bulkPreview.rows.length > 10 && (
                  <p className="mt-3 text-xs text-slate-600 text-center">
                    ... and {bulkPreview.rows.length - 10} more rows
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

// Tiny inline X icon for tag close button
function XIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}