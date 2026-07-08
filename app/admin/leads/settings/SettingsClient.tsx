// ─── Lead Engine Settings ──────────────────────────────────────────────────────
// /admin/leads/settings — Configure Hugging Face API key and other settings

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Key,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Save,
  Trash2,
  ExternalLink,
  Shield,
} from "lucide-react"

interface SettingsData {
  hasEnvKey: boolean
  hasConfigKey: boolean
  maskedEnvKey: string | null
  maskedConfigKey: string | null
  source: "environment" | "config" | "none"
}

export default function SettingsClient() {
  const router = useRouter()

  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load current settings
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/leads/settings")
        if (res.ok) {
          const data = await res.json()
          setSettings(data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/leads/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ huggingfaceApiKey: apiKey.trim() }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to save")

      setSuccess("API key saved successfully!")
      setApiKey("")
      setSettings({
        hasEnvKey: settings?.hasEnvKey ?? false,
        hasConfigKey: true,
        maskedEnvKey: settings?.maskedEnvKey ?? null,
        maskedConfigKey: data.maskedKey as string,
        source: "config" as const,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save API key")
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/leads/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ huggingfaceApiKey: "" }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to remove")

      setSuccess("API key removed.")
      setApiKey("")
      setSettings({
        hasEnvKey: settings?.hasEnvKey ?? false,
        hasConfigKey: false,
        maskedEnvKey: settings?.maskedEnvKey ?? null,
        maskedConfigKey: null,
        source: (settings?.hasEnvKey ? "environment" : "none") as "environment" | "none",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove API key")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0D6E6E] mx-auto" />
        <p className="text-slate-400 mt-3 text-sm">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/admin/leads")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Key className="w-6 h-6 text-purple-400" />
          Lead Engine Settings
        </h1>
        <div className="w-20" />
      </div>

      {/* Status messages */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Hugging Face API Key Section */}
      <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Hugging Face API Key
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            This key is used for AI-powered lead enrichment — extracting company info,
            industry classification, and contact details from scraped website text.
          </p>
        </div>

        {/* Current status */}
        <div className="px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Status</span>
            <span
              className={`text-sm font-medium flex items-center gap-1.5 ${
                settings?.source === "none" ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {settings?.source === "none" ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  Not configured
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Configured
                </>
              )}
            </span>
          </div>

          {settings?.source !== "none" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Source</span>
                <span className="text-sm text-slate-300">
                  {settings?.source === "environment" ? (
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-blue-400" />
                      Environment Variable (.env)
                    </span>
                  ) : (
                    "Config File"
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Key</span>
                <code className="text-sm text-slate-300 bg-white/[0.05] px-2 py-0.5 rounded">
                  {settings?.source === "environment"
                    ? settings?.maskedEnvKey
                    : settings?.maskedConfigKey}
                </code>
              </div>

              {settings?.source === "environment" && (
                <p className="text-xs text-amber-400/80 mt-2">
                  The key is set via environment variable. Remove it from .env if you want to use
                  a different key here.
                </p>
              )}
            </>
          )}
        </div>

        {/* Input */}
        {settings?.source !== "environment" ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-2">
                Your Hugging Face API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 pr-12 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#0D6E6E]/50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1.5">
                Free tier available — create a key at{" "}
                <a
                  href="https://huggingface.co/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D6E6E] hover:underline inline-flex items-center gap-0.5"
                >
                  huggingface.co/settings/tokens
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving || apiKey.trim().length < 10}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0D6E6E]/80 transition-all font-medium text-sm disabled:opacity-40"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Key
              </button>

              {settings?.hasConfigKey && (
                <button
                  onClick={handleRemove}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all font-medium text-sm disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Key
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Your key is stored securely on the server and never exposed to the browser.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-sm text-amber-400/80">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            To change your API key, remove the <code className="bg-white/[0.05] px-1.5 py-0.5 rounded text-xs">HUGGINGFACE_API_KEY</code> from
            your <code className="bg-white/[0.05] px-1.5 py-0.5 rounded text-xs">.env</code> file and restart the server.
            Then you can enter a new key here.
          </div>
        )}
      </section>

      {/* What this key enables */}
      <section className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Features
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-purple-400 font-bold">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Text Extraction</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Uses Mistral-7B to parse raw scraped text into structured lead data —
                company name, industry, contacts, address, and more.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-blue-400 font-bold">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Named Entity Recognition</p>
              <p className="text-xs text-slate-500 mt-0.5">
                BERT-NER identifies person names, organizations, and locations from text
                for more accurate contact extraction.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-emerald-400 font-bold">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Zero-Shot Classification</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Bart-large-mnli classifies businesses into industry categories and company
                size buckets for better segmentation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#0D6E6E]/5 border border-[#0D6E6E]/10 rounded-xl">
          <p className="text-xs text-slate-400">
            <span className="text-[#0D6E6E] font-medium">Free tier:</span> Hugging Face provides
            free inference API access with rate limits. No credit card required.
            {" "}
            <a
              href="https://huggingface.co/docs/api-inference/en/index"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D6E6E] hover:underline inline-flex items-center gap-0.5"
            >
              Learn more
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}