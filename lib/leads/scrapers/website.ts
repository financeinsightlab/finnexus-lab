// ─── Company Website Scraper ───────────────────────────────────────────────────
// Scrapes company websites for contact info, team pages, and about pages

import * as cheerio from "cheerio"
import { safeFetch, delay, extractEmails, extractPhones, cleanText } from "./utils"
import type { WebsiteScrapeResult } from "./types"

const PAGES_TO_TRY = [
  "", // homepage
  "/about",
  "/about-us",
  "/team",
  "/our-team",
  "/contact",
  "/contact-us",
  "/people",
  "/leadership",
]

function normalizeUrl(domain: string, path: string): string {
  const base = domain.startsWith("http") ? domain : `https://${domain}`
  const cleanBase = base.replace(/\/$/, "")
  return `${cleanBase}${path}`
}

export async function scrapeWebsite(domain: string): Promise<WebsiteScrapeResult> {
  const result: WebsiteScrapeResult = {
    domain,
    pages: [],
    combinedText: "",
    allEmails: [],
    allPhones: [],
  }

  const seenUrls = new Set<string>()

  for (const path of PAGES_TO_TRY) {
    const url = normalizeUrl(domain, path)
    if (seenUrls.has(url)) continue
    seenUrls.add(url)

    try {
      const { html, status, error } = await safeFetch(url, { timeout: 15000 })

      if (error || status >= 400) {
        // Non-critical: just skip this page
        continue
      }

      const $ = cheerio.load(html)

      // Remove script, style, nav, footer to reduce noise
      $("script, style, nav, footer, noscript, iframe, .cookie-banner").remove()

      // Extract title
      const title = $("title").text().trim() || $("h1").first().text().trim()

      // Extract visible text
      const bodyText = $("body").text()
      const cleaned = cleanText(bodyText)

      // Extract emails and phones from the raw HTML
      const emails = extractEmails(html)
      const phones = extractPhones(html)

      result.pages.push({
        url,
        title,
        text: cleaned,
        emails,
        phones,
        status,
      })

      result.allEmails.push(...emails)
      result.allPhones.push(...phones)

      // Add labeled section to combined text
      result.combinedText += `\n[${path === "" ? "HOMEPAGE" : path.toUpperCase().replace("/", "")}] ${cleaned}\n`

      // Respectful delay between page fetches
      await delay(2000)
    } catch {
      // Skip failed pages
      continue
    }
  }

  // Deduplicate
  result.allEmails = [...new Set(result.allEmails.map((e) => e.toLowerCase()))]
  result.allPhones = [...new Set(result.allPhones)]

  return result
}