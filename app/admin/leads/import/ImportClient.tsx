"use client"

// ─── CSV Import Wizard ─────────────────────────────────────────────────────────
// 3-step flow: Upload → Map Columns → Review & Import

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Upload,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Download,
  X,
  RefreshCw,
} from "lucide-react"

interface PreviewData {
  fileName: string
  fileSize: number
  totalRows: number
  headers: string[]
  previewRows: Record<string, string>[]
  detectedColumns: Record<string, string>
  previewDupChecks: { isDuplicate: boolean; confidence: number; reason: string }[]
}

const LEAD_FIELDS = [
  { value: "", label: "— Skip this column —" },
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "fullName", label: "Full Name" },
  { value: "jobTitle", label: "Job Title" },
  { value: "department", label: "Department" },
  { value: "seniority", label: "Seniority" },
  { value: "companyName", label: "Company Name" },
  { value: "companyDomain", label: "Company Domain" },
  { value: "companySize", label: "Company Size" },
  { value: "industry", label: "Industry" },
  { value: "website", label: "Website" },
  { value: "linkedInUrl", label: "LinkedIn URL" },
  { value: "emails", label: "Email" },
  { value: "phones", label: "Phone" },
  { value: "address", label: "Address" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
  { value: "country", label: "Country" },
  { value: "postalCode", label: "Postal Code" },
  { value: "notes", label: "Notes" },
  { value: "tags", label: "Tags" },
]

export default function ImportClient() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step state: 1=upload, 2=map, 3=review
  const [step, setStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [preview, setPreview] = useState<PreviewData | null>(null)
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({})
  const [duplicateAction, setDuplicateAction] = useState<"skip" | "update" | "import">("skip")
  const [importResult, setImportResult] = useState<{ imported: number; skipped: number; errors: number; errorDetails: { row: number; message: string }[] } | null>(null)

  // ── Step 1: File Upload ──
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/leads/import", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Upload failed")
      }

      const data: PreviewData = await res.json()
      setPreview(data)

      // Auto-map using detected columns
      const mapping: Record<string, string> = {}
      for (const h of data.headers) {
        mapping[h] = data.detectedColumns[h] ?? ""
      }
      setColumnMapping(mapping)
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }, [])

  // ── Step 3: Execute Import ──
  const handleImport = async () => {
    if (!preview) return
    setImporting(true)
    setError(null)

    try {
      // Build rows from preview + mapping
      const res = await fetch("/api/leads/import", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: preview.fileName,
          fileSize: preview.fileSize,
          rows: preview.previewRows,
          columnMapping: Object.entries(columnMapping).map(([csvColumn, leadField]) => ({ csvColumn, leadField })),
          duplicateAction,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Import failed")

      setImportResult(data)
      setStep(4) // Results step
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed")
    } finally {
      setImporting(false)
    }
  }

  const setMapping = (csvColumn: string, leadField: string) => {
    setColumnMapping((prev) => ({ ...prev, [csvColumn]: leadField }))
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Upload className="w-7 h-7 text-blue-400" />
            Import Leads
          </h1>
          <p className="text-slate-400 text-sm mt-1">Upload a CSV file and map columns to lead fields</p>
        </div>
        {step > 1 && (
          <button
            onClick={() => router.push("/admin/leads")}
            className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Step Indicators */}
      <div className="flex items-center gap-2 mb-8">
        {["Upload CSV", "Map Columns", "Review", "Done"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                step > i + 1
                  ? "bg-emerald-500 text-white"
                  : step === i + 1
                  ? "bg-[#0D6E6E] text-white ring-2 ring-[#0D6E6E]/30"
                  : "bg-white/[0.04] text-slate-600"
              }`}
            >
              {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${step >= i + 1 ? "text-slate-300" : "text-slate-600"}`}>
              {label}
            </span>
            {i < 3 && <div className={`w-8 h-px ${step > i + 1 ? "bg-emerald-500" : "bg-white/[0.06]"}`} />}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* ── Step 1: Upload ── */}
      {step === 1 && (
        <div
          className="bg-white/[0.02] border-2 border-dashed border-white/[0.08] rounded-2xl p-16 text-center hover:border-[#0D6E6E]/30 transition-all cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file && fileInputRef.current) {
              const dt = new DataTransfer()
              dt.items.add(file)
              fileInputRef.current.files = dt.files
              handleFileUpload({ target: { files: dt.files } } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.tsv,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-12 h-12 text-[#0D6E6E] animate-spin" />
              <p className="text-slate-400">Analyzing CSV...</p>
            </div>
          ) : (
            <>
              <FileText className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-lg text-white font-medium mb-2">Drop your CSV file here</p>
              <p className="text-sm text-slate-500 mb-4">or click to browse. Supports CSV, TSV, and TXT files.</p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all text-sm font-medium">
                <Upload className="w-4 h-4" />
                Choose File
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Step 2: Map Columns ── */}
      {step === 2 && preview && (
        <div className="space-y-6">
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Map CSV Columns → Lead Fields
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {preview.totalRows} rows detected in {preview.fileName}. Map each CSV column to the corresponding lead field.
            </p>

            <div className="space-y-3">
              {preview.headers.map((header) => (
                <div key={header} className="flex items-center gap-3">
                  <div className="w-48 flex-shrink-0">
                    <p className="text-sm text-slate-300 font-medium truncate" title={header}>{header}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  <select
                    value={columnMapping[header] ?? ""}
                    onChange={(e) => setMapping(header, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50"
                    aria-label={`Map ${header} to lead field`}
                  >
                    {LEAD_FIELDS.map((f) => (
                      <option key={f.value} value={f.value} className="bg-[#1A1F2E]">
                        {f.label}
                      </option>
                    ))}
                  </select>
                  {/* Show sample */}
                  <span className="w-36 text-xs text-slate-600 truncate text-right" title={preview.previewRows[0]?.[header]}>
                    {preview.previewRows[0]?.[header] ? `e.g. ${preview.previewRows[0][header]}` : "—"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Duplicate handling */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Duplicate Handling</h2>
            <div className="flex gap-3">
              {[
                { value: "skip" as const, label: "Skip duplicates", desc: "Don't import if already exists" },
                { value: "update" as const, label: "Update existing", desc: "Update existing lead with new data" },
                { value: "import" as const, label: "Import anyway", desc: "Create duplicate entries" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDuplicateAction(opt.value)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                    duplicateAction === opt.value
                      ? "bg-[#0D6E6E]/10 border-[#0D6E6E]/40"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                  }`}
                >
                  <p className={`text-sm font-medium ${duplicateAction === opt.value ? "text-[#0D6E6E]" : "text-slate-300"}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Preview duplicates */}
          {preview.previewDupChecks.filter((d) => d.isDuplicate).length > 0 && (
            <section className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-amber-400">
                  {preview.previewDupChecks.filter((d) => d.isDuplicate).length} potential duplicates detected
                </h3>
              </div>
              <p className="text-sm text-slate-400">
                These leads may already exist in your database based on email, phone, or company domain matching.
              </p>
            </section>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
            >
              Review & Import
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && preview && (
        <div className="space-y-6">
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Review Your Import</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-2xl font-bold text-white">{preview.totalRows}</p>
                <p className="text-xs text-slate-500">Total Rows</p>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-2xl font-bold text-white">{preview.headers.length}</p>
                <p className="text-xs text-slate-500">Mapped Columns</p>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-2xl font-bold text-amber-400">
                  {preview.previewDupChecks.filter((d) => d.isDuplicate).length}
                </p>
                <p className="text-xs text-slate-500">Potential Duplicates</p>
              </div>
              <div className="px-4 py-3 bg-white/[0.02] rounded-xl text-center">
                <p className="text-2xl font-bold text-white">{duplicateAction === "skip" ? "Skip" : duplicateAction === "update" ? "Update" : "Allow"}</p>
                <p className="text-xs text-slate-500">Duplicate Action</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400 uppercase">#</th>
                    {preview.headers.map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-slate-400 uppercase">
                        {columnMapping[h] || h}
                        {columnMapping[h] !== "" && (
                          <span className="block text-[10px] text-slate-600 font-normal">{h}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.previewRows.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.02]">
                      <td className="px-3 py-2 text-slate-600 text-xs">{i + 1}</td>
                      {preview.headers.map((h) => (
                        <td key={h} className="px-3 py-2 text-slate-300 whitespace-nowrap max-w-[200px] truncate">
                          {row[h] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.previewRows.length > 10 && (
                <p className="mt-3 text-xs text-slate-600 text-center">
                  ... and {preview.previewRows.length - 10} more rows
                </p>
              )}
            </div>
          </section>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex items-center gap-2 px-6 py-3 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all font-medium disabled:opacity-50"
            >
              {importing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Import {preview.totalRows} Leads
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Done ── */}
      {step === 4 && importResult && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Import Complete</h2>
          <p className="text-slate-400 mb-8">Your leads have been imported successfully</p>

          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{importResult.imported}</p>
              <p className="text-xs text-slate-500">Imported</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-400">{importResult.skipped}</p>
              <p className="text-xs text-slate-500">Skipped</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">{importResult.errors}</p>
              <p className="text-xs text-slate-500">Errors</p>
            </div>
          </div>

          {importResult.errorDetails.length > 0 && (
            <div className="max-w-xl mx-auto mb-8 bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-left">
              <p className="text-sm font-medium text-red-400 mb-2">Error Details</p>
              <div className="space-y-1">
                {importResult.errorDetails.map((err, i) => (
                  <p key={i} className="text-xs text-slate-400">Row {err.row}: {err.message}</p>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => router.push("/admin/leads")}
              className="px-6 py-3 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all font-medium"
            >
              View All Leads
            </button>
            <button
              onClick={() => { setStep(1); setPreview(null); setImportResult(null); setError(null) }}
              className="px-6 py-3 bg-white/[0.03] border border-white/[0.08] text-slate-400 rounded-xl hover:text-white transition-all text-sm"
            >
              Import Another File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}