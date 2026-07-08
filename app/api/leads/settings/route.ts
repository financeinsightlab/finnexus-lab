// ─── Leads Settings API ────────────────────────────────────────────────────────
// GET /api/leads/settings — get current settings (masked)
// PUT /api/leads/settings — update settings

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "data", "leads-config.json")

interface LeadsConfig {
  huggingfaceApiKey?: string
  updatedAt?: string
}

function readConfig(): LeadsConfig {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return {}
    }
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function writeConfig(config: LeadsConfig): void {
  const dir = path.dirname(CONFIG_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...config, updatedAt: new Date().toISOString() }, null, 2), "utf-8")
}

function maskKey(key: string): string {
  if (!key || key.length < 8) return "not set"
  return key.slice(0, 4) + "••••" + key.slice(-4)
}

function getEffectiveKey(): string | null {
  // Priority: env var > config file
  if (process.env.HUGGINGFACE_API_KEY) {
    return process.env.HUGGINGFACE_API_KEY
  }
  const config = readConfig()
  return config.huggingfaceApiKey || null
}

// Export for use by other server-side modules
export { getEffectiveKey }

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const config = readConfig()
  const envKey = process.env.HUGGINGFACE_API_KEY

  return NextResponse.json({
    hasEnvKey: !!envKey,
    hasConfigKey: !!config.huggingfaceApiKey,
    maskedEnvKey: envKey ? maskKey(envKey) : null,
    maskedConfigKey: config.huggingfaceApiKey ? maskKey(config.huggingfaceApiKey) : null,
    source: envKey ? "environment" : config.huggingfaceApiKey ? "config" : "none",
  })
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { huggingfaceApiKey } = body

  if (huggingfaceApiKey === undefined) {
    return NextResponse.json({ error: "huggingfaceApiKey is required" }, { status: 400 })
  }

  // Remove key
  if (huggingfaceApiKey === "" || huggingfaceApiKey === null) {
    const config = readConfig()
    delete config.huggingfaceApiKey
    writeConfig(config)
    return NextResponse.json({ success: true, hasConfigKey: false })
  }

  // Basic validation - HF keys start with "hf_"
  if (typeof huggingfaceApiKey !== "string" || huggingfaceApiKey.length < 10) {
    return NextResponse.json({ error: "Invalid API key format" }, { status: 400 })
  }

  writeConfig({ huggingfaceApiKey: huggingfaceApiKey.trim() })

  return NextResponse.json({
    success: true,
    hasConfigKey: true,
    maskedKey: maskKey(huggingfaceApiKey.trim()),
  })
}