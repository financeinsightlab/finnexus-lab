// ─── Hugging Face AI Client ────────────────────────────────────────────────────
// Handles all communication with Hugging Face Inference API
// API key priority: client-provided > env var > config file

import { HfInference } from "@huggingface/inference"
import fs from "fs"
import path from "path"

const CONFIG_PATH = path.join(process.cwd(), "data", "leads-config.json")

function readConfigKey(): string | null {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return null
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8")
    const config = JSON.parse(raw)
    return config.huggingfaceApiKey || null
  } catch {
    return null
  }
}

function resolveApiKey(clientKey?: string): string {
  // Priority: client-provided key > env var > config file
  if (clientKey) return clientKey
  if (process.env.HUGGINGFACE_API_KEY) return process.env.HUGGINGFACE_API_KEY
  const configKey = readConfigKey()
  if (configKey) return configKey
  throw new Error("HUGGINGFACE_API_KEY is not set. Please configure it in Settings → Lead Engine or set the environment variable.")
}

let hfCache: { key: string; client: HfInference } | null = null

function getClient(apiKey?: string): HfInference {
  const key = resolveApiKey(apiKey)

  // Cache the client by key
  if (hfCache && hfCache.key === key) {
    return hfCache.client
  }

  const client = new HfInference(key)
  hfCache = { key, client }
  return client
}

export interface LeadExtractionResult {
  companyName: string | null
  industry: string | null
  companySize: string | null
  description: string | null
  contacts: Array<{
    firstName: string
    lastName: string
    jobTitle: string
    email: string | null
    phone: string | null
  }>
  address: {
    street: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
  } | null
  confidence: number
  model: string
}

const EXTRACTION_PROMPT = `You are a lead data extractor. Given raw text about a business and its website, extract structured business and contact information.

Return ONLY a valid JSON object with this exact structure:
{
  "companyName": "string or null",
  "industry": "string or null",
  "companySize": "string or null (e.g., 1-10, 11-50, 51-200, 201-1000, 1000+)",
  "description": "string or null (1-2 sentence company description)",
  "contacts": [
    {
      "firstName": "string",
      "lastName": "string",
      "jobTitle": "string",
      "email": "string or null",
      "phone": "string or null"
    }
  ],
  "address": {
    "street": "string or null",
    "city": "string or null",
    "state": "string or null",
    "country": "string or null",
    "postalCode": "string or null"
  },
  "confidence": 0.0-1.0
}

Do not include any text outside the JSON. Do not use markdown code blocks.

Raw Text:
{rawText}`

/**
 * Uses Hugging Face LLM to extract structured lead data from raw scraped text.
 * Model: mistralai/Mistral-7B-Instruct-v0.3 (free tier, good quality)
 */
export async function extractLeadFromText(
  rawText: string,
  model = "mistralai/Mistral-7B-Instruct-v0.3",
  apiKey?: string
): Promise<LeadExtractionResult> {
  const client = getClient(apiKey)

  const prompt = EXTRACTION_PROMPT.replace("{rawText}", rawText.slice(0, 8000))

  try {
    const response = await client.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.1,
        return_full_text: false,
      },
    })

    const jsonStr = response.generated_text.trim()
    const parsed = JSON.parse(jsonStr)

    return {
      ...parsed,
      contacts: parsed.contacts || [],
      model,
    }
  } catch (err) {
    console.error("[HF] Text generation error:", err)
    return {
      companyName: null,
      industry: null,
      companySize: null,
      description: null,
      contacts: [],
      address: null,
      confidence: 0,
      model,
    }
  }
}

/**
 * Uses Hugging Face NER to extract person names, organizations, and locations.
 * Model: dslim/bert-base-NER
 */
export async function extractEntities(
  text: string,
  apiKey?: string
): Promise<Array<{ word: string; entity: string; score: number }>> {
  const client = getClient(apiKey)

  try {
    const response = await client.tokenClassification({
      model: "dslim/bert-base-NER",
      inputs: text.slice(0, 2000),
    })

    return response.map((r) => ({
      word: r.word,
      entity: r.entity_group ?? r.entity ?? "UNKNOWN",
      score: r.score ?? 0,
    }))
  } catch (err) {
    console.error("[HF] NER error:", err)
    return []
  }
}

/**
 * Uses Hugging Face zero-shot classifier to tag industry and company size.
 * Model: facebook/bart-large-mnli
 */
export async function classifyLead(
  text: string,
  labels: string[],
  apiKey?: string
): Promise<Array<{ label: string; score: number }>> {
  const client = getClient(apiKey)

  try {
    const response = await client.zeroShotClassification({
      model: "facebook/bart-large-mnli",
      inputs: text.slice(0, 1000),
      parameters: {
        candidate_labels: labels,
      },
    })

    const result = response as unknown as { labels: string[]; scores: number[] }
    return result.labels.map((label: string, i: number) => ({
      label,
      score: result.scores[i],
    }))
  } catch (err) {
    console.error("[HF] Classification error:", err)
    return []
  }
}

const INDUSTRY_LABELS = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Education",
  "Hospitality",
  "Media",
  "Transportation",
  "Energy",
  "Agriculture",
  "Construction",
  "Legal Services",
]

const SIZE_LABELS = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1000+ employees",
]

/**
 * Full enrichment pipeline: extracts structured data + NER entities + classification
 */
export async function enrichLeadFull(
  rawText: string,
  apiKey?: string
): Promise<{
  extraction: LeadExtractionResult
  entities: Array<{ word: string; entity: string; score: number }>
  industryClassification: Array<{ label: string; score: number }>
  sizeClassification: Array<{ label: string; score: number }>
}> {
  const [extraction, entities, industryClassification, sizeClassification] = await Promise.all([
    extractLeadFromText(rawText, undefined, apiKey),
    extractEntities(rawText, apiKey),
    classifyLead(rawText, INDUSTRY_LABELS, apiKey),
    classifyLead(rawText, SIZE_LABELS, apiKey),
  ])

  return {
    extraction,
    entities,
    industryClassification,
    sizeClassification,
  }
}