// ─── Scrape API: Google Maps ───────────────────────────────────────────────────
// POST /api/scrape/google-maps — create a new Google Maps scrape job
// GET /api/scrape/google-maps/[jobId] — get job status and results

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { scrapeGoogleMaps } from "@/lib/leads/scrapers/google-maps"
import { scrapeWebsite } from "@/lib/leads/scrapers/website"
import { enrichLeadFull } from "@/lib/leads/ai/hf-client"
import { checkDuplicate } from "@/lib/leads/dedup"
import { calculateScore } from "@/lib/leads/scoring"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { keyword, location, radius, maxResults = 20, scrapeWebsites = true, useAI = true } = body

  if (!keyword || !location) {
    return NextResponse.json({ error: "keyword and location are required" }, { status: 400 })
  }

  // Create the scrape job
  const job = await prisma.scrapeJob.create({
    data: {
      type: scrapeWebsites ? "BOTH" : "GOOGLE_MAPS",
      searchKeyword: keyword,
      searchLocation: location,
      searchRadius: radius,
      maxResults,
      status: "RUNNING",
      startedAt: new Date(),
      createdBy: session.user.id,
    },
  })

  // Run scraping asynchronously (fire-and-forget, status updated via API)
  runScrapeJob(job.id, keyword, location, maxResults, scrapeWebsites, useAI).catch((err) => {
    console.error(`[ScrapeJob ${job.id}] Failed:`, err)
    prisma.scrapeJob.update({
      where: { id: job.id },
      data: { status: "FAILED", errors: [{ step: "scrape", message: String(err) }], completedAt: new Date() },
    })
  })

  return NextResponse.json({ job }, { status: 202 })
}

async function runScrapeJob(
  jobId: string,
  keyword: string,
  location: string,
  maxResults: number,
  scrapeWebsites: boolean,
  useAI: boolean
) {
  const startTime = Date.now()

  // Step 1: Scrape Google Maps
  await prisma.scrapeJob.update({ where: { id: jobId }, data: { status: "SCRAPING_GMAPS" } })
  const gmapsResults = await scrapeGoogleMaps(keyword, location, maxResults)
  await prisma.scrapeJob.update({
    where: { id: jobId },
    data: { totalFound: gmapsResults.length, totalScraped: gmapsResults.length },
  })

  let importedCount = 0
  let skippedCount = 0
  let enrichedCount = 0
  const errors: { step: string; message: string; url?: string }[] = []

  for (const result of gmapsResults) {
    try {
      // Check duplicate
      const dup = await checkDuplicate(
        {
          companyName: result.name,
          emails: [],
          phones: result.phone ? [{ number: result.phone }] : [],
        },
        prisma
      )

      if (dup.isDuplicate) {
        skippedCount++
        continue
      }

      let websiteData = null
      let aiData = null

      // Step 2: Scrape website if available
      if (scrapeWebsites && result.website) {
        await prisma.scrapeJob.update({ where: { id: jobId }, data: { status: "SCRAPING_WEBSITES" } })
        try {
          websiteData = await scrapeWebsite(result.website)
        } catch (err) {
          errors.push({ step: "website_scrape", message: String(err), url: result.website })
        }
      }

      // Step 3: AI enrichment
      if (useAI && websiteData?.combinedText) {
        await prisma.scrapeJob.update({ where: { id: jobId }, data: { status: "ENRICHING_AI" } })
        try {
          aiData = await enrichLeadFull(websiteData.combinedText)
          enrichedCount++
        } catch (err) {
          errors.push({ step: "ai_enrich", message: String(err) })
        }
      }

      // Build lead data
      const leadData: Record<string, unknown> = {
        source: "GOOGLE_MAPS",
        scrapeJobId: jobId,
        companyName: result.name,
        address: result.address,
        phone: result.phone,
        website: result.website,
        googlePlaceId: result.placeId,
        googleMapsUrl: result.googleMapsUrl,
        lat: result.lat,
        lng: result.lng,
        sourceData: result,
      }

      if (aiData?.extraction) {
        leadData.industry = aiData.extraction.industry
        leadData.companySize = aiData.extraction.companySize
        leadData.notes = aiData.extraction.description
        leadData.aiEnriched = true
        leadData.aiConfidence = aiData.extraction.confidence
        leadData.aiModel = aiData.extraction.model
        leadData.aiRawResponse = aiData

        if (aiData.extraction.contacts?.[0]) {
          const c = aiData.extraction.contacts[0]
          leadData.firstName = c.firstName
          leadData.lastName = c.lastName
          leadData.jobTitle = c.jobTitle
          leadData.emails = c.email ? [{ email: c.email, type: "work", isPrimary: true }] : []
          leadData.phones = c.phone ? [{ number: c.phone, type: "office", isPrimary: true }] : []
        }

        if (aiData.industryClassification?.[0]) {
          leadData.industry = leadData.industry ?? aiData.industryClassification[0].label
        }
        if (aiData.sizeClassification?.[0]) {
          leadData.companySize = leadData.companySize ?? aiData.sizeClassification[0].label
        }
      }

      if (websiteData) {
        if (!leadData.emails && websiteData.allEmails.length > 0) {
          leadData.emails = [{ email: websiteData.allEmails[0], type: "work", isPrimary: true }]
        }
        if (!leadData.phones && websiteData.allPhones.length > 0) {
          leadData.phones = [{ number: websiteData.allPhones[0], type: "office", isPrimary: true }]
        }
        if (!leadData.companyDomain) {
          try {
            leadData.companyDomain = new URL(result.website || "").hostname
          } catch { /* ignore */ }
        }
      }

      const { score, breakdown } = calculateScore(leadData)

      await prisma.lead.create({
        data: {
          ...leadData,
          score,
          scoreBreakdown: JSON.parse(JSON.stringify(breakdown)),
          assignedTo: (await prisma.scrapeJob.findUnique({ where: { id: jobId }, select: { createdBy: true } }))?.createdBy ?? undefined,
        },
      })

      importedCount++
    } catch (err) {
      errors.push({ step: "import", message: String(err) })
    }
  }

  const durationMs = Date.now() - startTime

  await prisma.scrapeJob.update({
    where: { id: jobId },
    data: {
      status: "COMPLETED",
      totalImported: importedCount,
      totalSkipped: skippedCount,
      totalEnriched: enrichedCount,
      errors: errors.length > 0 ? errors : undefined,
      completedAt: new Date(),
      durationMs,
    },
  })
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const jobId = req.nextUrl.searchParams.get("jobId")
  if (!jobId) return NextResponse.json({ error: "jobId query param required" }, { status: 400 })

  const job = await prisma.scrapeJob.findUnique({
    where: { id: jobId },
    include: {
      leads: {
        take: 50,
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

  return NextResponse.json({ job })
}