// ─── Scraper Diagnostic Endpoint ──────────────────────────────────────────────
// GET /api/scrape/diagnostic?url=... — fetches a URL and returns the raw HTML for debugging

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { safeFetch } from "@/lib/leads/scrapers/utils"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const url = req.nextUrl.searchParams.get("url")
  if (!url) return NextResponse.json({ error: "url param required" }, { status: 400 })

  try {
    const { html, status, error } = await safeFetch(url, { timeout: 15000 })

    // Check for common blocking indicators
    const blockingIndicators = {
      isCaptcha: html.includes("captcha") || html.includes("recaptcha") || html.includes("CAPTCHA"),
      isBlocked: html.includes("unusual traffic") || html.includes("automated requests"),
      isConsent: html.includes("consent.google") || html.includes("CONSENT"),
      statusCode: status,
      htmlLength: html.length,
      htmlPreview: html.slice(0, 2000),
    }

    return NextResponse.json({
      url,
      status,
      error: error ?? null,
      diagnostics: blockingIndicators,
    })
  } catch (err) {
    return NextResponse.json({
      url,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 })
  }
}