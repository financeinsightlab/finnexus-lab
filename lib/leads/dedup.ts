// ─── Duplicate Detection Engine ────────────────────────────────────────────────
// Two-stage: exact match (email/phone) + fuzzy match (name + domain)

import type { PrismaClient } from "@prisma/client"

interface CandidateLead {
  firstName?: string | null
  lastName?: string | null
  companyName?: string | null
  companyDomain?: string | null
  emails?: { email: string }[] | null
  phones?: { number: string }[] | null
}

interface DuplicateResult {
  isDuplicate: boolean
  matchType: "exact" | "fuzzy" | null
  existingLeadId?: string
  existingLeadName?: string
  confidence: number
  reason?: string
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)\.]/g, "")
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
  }
  return matrix[a.length][b.length]
}

function nameSimilarity(a: string, b: string): number {
  const aLower = a.toLowerCase().trim()
  const bLower = b.toLowerCase().trim()
  const maxLen = Math.max(aLower.length, bLower.length)
  if (maxLen === 0) return 1
  const dist = levenshteinDistance(aLower, bLower)
  return 1 - dist / maxLen
}

export async function checkDuplicate(
  lead: CandidateLead,
  prisma: PrismaClient
): Promise<DuplicateResult> {
  // Stage 1: Exact email match
  if (lead.emails && lead.emails.length > 0) {
    for (const emailObj of lead.emails) {
      if (!emailObj.email) continue
      const normalized = normalizeEmail(emailObj.email)
      const existing = await prisma.lead.findFirst({
        where: {
          emails: {
            path: "$[*].email",
            string_contains: normalized,
          },
        },
        select: { id: true, firstName: true, lastName: true, companyName: true },
      })
      if (existing) {
        return {
          isDuplicate: true,
          matchType: "exact",
          existingLeadId: existing.id,
          existingLeadName: [existing.firstName, existing.lastName].filter(Boolean).join(" ") || existing.companyName || "Unknown",
          confidence: 1.0,
          reason: `Same email: ${emailObj.email}`,
        }
      }
    }
  }

  // Stage 1: Exact phone match
  if (lead.phones && lead.phones.length > 0) {
    for (const phoneObj of lead.phones) {
      if (!phoneObj.number) continue
      const normalized = normalizePhone(phoneObj.number)
      if (normalized.length < 6) continue
      const existing = await prisma.lead.findFirst({
        where: {
          phones: {
            path: "$[*].number",
            string_contains: normalized,
          },
        },
        select: { id: true, firstName: true, lastName: true, companyName: true },
      })
      if (existing) {
        return {
          isDuplicate: true,
          matchType: "exact",
          existingLeadId: existing.id,
          existingLeadName: [existing.firstName, existing.lastName].filter(Boolean).join(" ") || existing.companyName || "Unknown",
          confidence: 0.95,
          reason: `Same phone: ${phoneObj.number}`,
        }
      }
    }
  }

  // Stage 2: Fuzzy match (company domain + name similarity)
  if (lead.companyDomain && (lead.firstName || lead.lastName)) {
    const leadName = [lead.firstName, lead.lastName].filter(Boolean).join(" ")
    const candidates = await prisma.lead.findMany({
      where: {
        companyDomain: lead.companyDomain,
      },
      select: { id: true, firstName: true, lastName: true, companyName: true },
      take: 20,
    })

    for (const existing of candidates) {
      const existingName = [existing.firstName, existing.lastName].filter(Boolean).join(" ")
      if (!existingName || !leadName) continue
      const similarity = nameSimilarity(leadName, existingName)
      if (similarity > 0.85) {
        return {
          isDuplicate: true,
          matchType: "fuzzy",
          existingLeadId: existing.id,
          existingLeadName: existingName || existing.companyName || "Unknown",
          confidence: similarity,
          reason: `Fuzzy name match (${Math.round(similarity * 100)}%) at ${lead.companyDomain}`,
        }
      }
    }
  }

  return { isDuplicate: false, matchType: null, confidence: 0 }
}

export async function batchCheckDuplicates(
  leads: CandidateLead[],
  prisma: PrismaClient
): Promise<Map<number, DuplicateResult>> {
  const results = new Map<number, DuplicateResult>()
  for (let i = 0; i < leads.length; i++) {
    results.set(i, await checkDuplicate(leads[i], prisma))
  }
  return results
}