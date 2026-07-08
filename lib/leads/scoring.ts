// ─── Lead Scoring Engine ───────────────────────────────────────────────────────
// Calculates lead quality based on data completeness + optional AI confidence

import type { Lead } from "@prisma/client"

export interface ScoreBreakdown {
  total: number
  tiers: {
    contactInfo: { score: number; max: number; filled: string[]; missing: string[] }
    personalInfo: { score: number; max: number; filled: string[]; missing: string[] }
    companyInfo: { score: number; max: number; filled: string[]; missing: string[] }
    location: { score: number; max: number; filled: string[]; missing: string[] }
    extras: { score: number; max: number; filled: string[]; missing: string[] }
  }
  aiConfidence?: number
  aiWeight?: number
}

const WEIGHTS = {
  contactInfo: 0.30,
  personalInfo: 0.25,
  companyInfo: 0.25,
  location: 0.10,
  extras: 0.10,
}

const TIER_FIELDS: Record<string, string[]> = {
  contactInfo: ["emails", "phones", "linkedInUrl", "twitterUrl"],
  personalInfo: ["firstName", "lastName", "fullName", "jobTitle", "department", "seniority"],
  companyInfo: ["companyName", "companyDomain", "companySize", "industry", "companyLinkedIn", "website"],
  location: ["address", "city", "state", "country", "postalCode"],
  extras: ["notes", "tags", "customFields"],
}

function isFieldFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === "string") return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === "object") {
    if (value instanceof Date) return true
    return Object.keys(value as object).length > 0
  }
  return true
}

export function calculateScore(
  lead: Partial<Lead> & { aiConfidence?: number | null },
  aiWeight = 0.4
): { score: number; breakdown: ScoreBreakdown } {
  const breakdown: ScoreBreakdown = {
    total: 0,
    tiers: {
      contactInfo: { score: 0, max: 0, filled: [], missing: [] },
      personalInfo: { score: 0, max: 0, filled: [], missing: [] },
      companyInfo: { score: 0, max: 0, filled: [], missing: [] },
      location: { score: 0, max: 0, filled: [], missing: [] },
      extras: { score: 0, max: 0, filled: [], missing: [] },
    },
  }

  let completenessScore = 0

  for (const [tier, fields] of Object.entries(TIER_FIELDS)) {
    const tierKey = tier as keyof typeof WEIGHTS
    let filled = 0
    const filledFields: string[] = []
    const missingFields: string[] = []

    for (const field of fields) {
      const value = (lead as Record<string, unknown>)[field]
      if (isFieldFilled(value)) {
        filled++
        filledFields.push(field)
      } else {
        missingFields.push(field)
      }
    }

    const tierScore = fields.length > 0 ? (filled / fields.length) * WEIGHTS[tierKey] * 100 : 0
    completenessScore += tierScore

    breakdown.tiers[tierKey] = {
      score: Math.round(tierScore),
      max: Math.round(WEIGHTS[tierKey] * 100),
      filled: filledFields,
      missing: missingFields,
    }
  }

  // Incorporate AI confidence if available
  let finalScore = completenessScore
  if (lead.aiEnriched && lead.aiConfidence != null) {
    const aiScore = lead.aiConfidence * 100
    finalScore = completenessScore * (1 - aiWeight) + aiScore * aiWeight
    breakdown.aiConfidence = lead.aiConfidence
    breakdown.aiWeight = aiWeight
  }

  breakdown.total = Math.round(Math.min(finalScore, 100))

  return { score: breakdown.total, breakdown }
}

export function getScoreLabel(score: number): { label: string; color: string; emoji: string } {
  if (score >= 80) return { label: "Hot", color: "text-red-500", emoji: "🔥" }
  if (score >= 50) return { label: "Warm", color: "text-amber-500", emoji: "🟡" }
  return { label: "Cold", color: "text-blue-500", emoji: "🔵" }
}