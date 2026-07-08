// ─── Enrich API ────────────────────────────────────────────────────────────────
// POST /api/enrich/ai — run HF AI enrichment on a single lead
// POST /api/enrich/ai/batch — batch enrich multiple leads

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { enrichLeadFull } from "@/lib/leads/ai/hf-client"
import { calculateScore } from "@/lib/leads/scoring"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { leadId } = body

  if (!leadId) return NextResponse.json({ error: "leadId required" }, { status: 400 })

  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })

  // Build raw text from existing lead data
  let rawText = `Company: ${lead.companyName ?? ""}\n`
  if (lead.website) rawText += `Website: ${lead.website}\n`
  if (lead.address) rawText += `Address: ${lead.address}, ${lead.city ?? ""}, ${lead.state ?? ""}, ${lead.country ?? ""}\n`
  if (lead.notes) rawText += `Notes: ${lead.notes}\n`

  const aiData = await enrichLeadFull(rawText)

  // Update lead with AI data
  const updates: Record<string, unknown> = {
    aiEnriched: true,
    aiConfidence: aiData.extraction.confidence,
    aiModel: aiData.extraction.model,
    aiRawResponse: aiData,
  }

  if (aiData.extraction.industry) updates.industry = aiData.extraction.industry
  if (aiData.extraction.companySize) updates.companySize = aiData.extraction.companySize
  if (aiData.extraction.description) updates.notes = (lead.notes ?? "") + "\n[AI] " + aiData.extraction.description

  if (aiData.extraction.contacts?.[0]) {
    updates.jobTitle = aiData.extraction.contacts[0].jobTitle || lead.jobTitle
  }

  if (aiData.industryClassification?.[0] && !updates.industry) {
    updates.industry = aiData.industryClassification[0].label
  }

  const { score, breakdown } = calculateScore({ ...lead, ...updates, aiConfidence: lead.aiConfidence })
  updates.score = score
  updates.scoreBreakdown = JSON.parse(JSON.stringify(breakdown))

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: updates,
  })

  await prisma.leadActivity.create({
    data: {
      leadId,
      type: "AI_ENRICHED" as never,
      summary: "AI enrichment completed",
      metadata: { confidence: aiData.extraction.confidence, model: aiData.extraction.model },
      userId: session.user.id,
    },
  })

  return NextResponse.json({ lead: updated, aiData })
}