// ─── Indian Business Directory Scraper ──────────────────────────────────────────
// Multi-source scraper targeting Indian business directories that return
// server-rendered HTML with individual business listings.
//
// Primary source: WebIndia123 Yellow Pages — JSON-LD LocalBusiness blocks
//   Each listing has: name, telephone, full address (street, city, zip)
//   URL pattern: /d-py/{state}/{city}/{category}-{id}/{page}/
//   NOTE: WebIndia123 is case-sensitive on the path. Always lowercase.
//
// ExportersIndia, Justdial, Sulekha, TradeIndia are excluded — they JS-render.
// Google is excluded — CAPTCHA blocks scraping.
// DuckDuckGo fallback removed — it only returns directory/list pages, not businesses.

import * as cheerio from "cheerio"
import { safeFetch, delay, extractPhones } from "./utils"
import type { GoogleMapsResult } from "./types"

// ─── DuckDuckGo Search ─────────────────────────────────────────────────────────

function buildDuckDuckGoUrl(query: string): string {
  return `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
}

// ─── WebIndia123 Yellow Pages Parser ────────────────────────────────────────────

function extractFromWebIndia123(html: string): GoogleMapsResult[] {
  const results: GoogleMapsResult[] = []
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let match: RegExpExecArray | null

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1])
      const items = Array.isArray(data) ? data : [data]

      for (const item of items) {
        if (item["@type"] === "LocalBusiness" && item.name) {
          const address = item.address
          const addrParts: string[] = []
          if (address?.streetAddress) {
            const street = Array.isArray(address.streetAddress)
              ? address.streetAddress[0]
              : address.streetAddress
            if (street) addrParts.push(street)
          }
          if (address?.addressLocality) addrParts.push(address.addressLocality)
          if (address?.addressRegion) addrParts.push(address.addressRegion)
          if (address?.postalCode) addrParts.push(address.postalCode)

          results.push({
            name: item.name.trim(),
            phone: item.telephone?.split(",")[0]?.trim() || undefined,
            address: addrParts.length > 0 ? addrParts.join(", ") : undefined,
            website: item.url || undefined,
          })
        }
      }
    } catch {
      // Skip unparseable blocks
    }
  }

  return results
}

// ─── DuckDuckGo Web Search Parser (URL discovery only, NOT for lead extraction) ─

function extractUrlsFromDuckDuckGo(html: string): string[] {
  const $ = cheerio.load(html)
  const urls: string[] = []

  $(".result").each((_, el) => {
    const $el = $(el)
    const href = $el.find(".result__a").first().attr("href") ?? ""
    const urlMatch = href.match(/uddg=(https?%3A%2F%2F[^&'"]+)/)
    if (urlMatch) {
      const decoded = decodeURIComponent(urlMatch[1])
      if (decoded.startsWith("http")) urls.push(decoded)
    }
  })

  return urls
}

// ─── DDG fetch with retry (handles 202 rate-limiting) ──────────────────────────

async function fetchDuckDuckGo(query: string): Promise<string | null> {
  const url = buildDuckDuckGoUrl(query)
  let lastError: string | undefined

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await delay(2000 * attempt)

    const { html, error, status } = await safeFetch(url, {
      timeout: 15000,
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })

    if (!error && html && status === 200) {
      return html
    }

    lastError = error ?? `HTTP ${status}`
    if (status === 202) {
      console.log(`[Scraper] DDG rate-limited (attempt ${attempt + 1}/3), retrying...`)
    } else {
      break
    }
  }

  console.warn(`[Scraper] DDG fetch failed after retries: ${lastError}`)
  return null
}

// ─── WebIndia123 page set fetch ────────────────────────────────────────────────
// WebIndia123 is CASE-SENSITIVE on URL paths — always lowercase.

async function fetchWebIndia123Pages(ypUrl: string, maxPages = 4): Promise<GoogleMapsResult[]> {
  const allResults: GoogleMapsResult[] = []

  // Lowercase the pathname (WebIndia123 is case-sensitive)
  let normalizedUrl: string
  try {
    const url = new URL(ypUrl)
    url.pathname = url.pathname.toLowerCase()
    normalizedUrl = url.toString()
  } catch {
    normalizedUrl = ypUrl.toLowerCase()
  }

  // WebIndia123 uses pagination like: /it-companies-577/1/, /it-companies-577/2/
  const parts = normalizedUrl.match(/^(.+?\/\d+)\/(\d+)\/$/)
  if (!parts) {
    const { html } = await safeFetch(normalizedUrl, {
      timeout: 15000,
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })
    if (html) {
      allResults.push(...extractFromWebIndia123(html))
    }
    return allResults
  }

  const baseUrl = parts[1]
  const startPage = parseInt(parts[2], 10)

  let consecutiveEmpty = 0
  for (let page = startPage; page < startPage + maxPages; page++) {
    const pageUrl = `${baseUrl}/${page}/`
    console.log(`[Scraper] WebIndia123 page ${page}: ${pageUrl}`)

    const { html, error } = await safeFetch(pageUrl, {
      timeout: 15000,
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })

    if (!html || error) {
      if (page === startPage) {
        console.warn(`[Scraper] WebIndia123 page ${page} failed: ${error}`)
      }
      consecutiveEmpty++
      if (consecutiveEmpty >= 2) break
      continue
    }

    const pageResults = extractFromWebIndia123(html)
    console.log(`[Scraper]   → ${pageResults.length} leads`)
    if (pageResults.length === 0) {
      consecutiveEmpty++
      if (consecutiveEmpty >= 2 && page > startPage + 1) break
    } else {
      consecutiveEmpty = 0
    }

    allResults.push(...pageResults)
    if (page < startPage + maxPages - 1) await delay(600)
  }

  return allResults
}

// ─── WebIndia123 direct URL construction ───────────────────────────────────────

const WI123_STATE_MAP: Record<string, string> = {
  mumbai: "maharashtra", delhi: "delhi", bangalore: "karnataka", bengaluru: "karnataka",
  chennai: "tamil-nadu", kolkata: "west-bengal", hyderabad: "andhra-pradesh",
  pune: "maharashtra", ahmedabad: "gujarat", jaipur: "rajasthan",
  lucknow: "uttar-pradesh", noida: "uttar-pradesh", gurgaon: "haryana", gurugram: "haryana",
  chandigarh: "chandigarh", indore: "madhya-pradesh", nagpur: "maharashtra",
  kochi: "kerala", coimbatore: "tamil-nadu", visakhapatnam: "andhra-pradesh",
}

const WI123_CATEGORY_IDS: Record<string, number[]> = {
  "it companies": [577],
  "software companies": [892],
  "real estate": [224, 223, 328, 788],
  "restaurants": [123],
  "hotels": [119],
  "hospitals": [345],
  "schools": [201],
  "builders": [223, 328],
  "travel agents": [456],
  "event management": [678],
  "web design": [890],
  "digital marketing": [891],
  "manufacturing": [334],
  "pharmaceutical": [556],
  "textile": [778],
  "construction": [220, 788],
  "logistics": [445],
  "education": [200],
  "healthcare": [340],
  "finance": [500],
}

function buildWebIndia123Url(keyword: string, location: string): string | null {
  const state = WI123_STATE_MAP[location.toLowerCase()]
  if (!state) return null

  const city = location.toLowerCase().replace(/\s+/g, "-")
  const kw = keyword.toLowerCase().trim()

  if (WI123_CATEGORY_IDS[kw]) {
    const catId = WI123_CATEGORY_IDS[kw][0]
    const catSlug = kw.replace(/\s+/g, "-")
    return `https://yellowpages.webindia123.com/d-py/${state}/${city}/${catSlug}-${catId}/1/`
  }

  for (const [catKey, catIds] of Object.entries(WI123_CATEGORY_IDS)) {
    if (kw.includes(catKey) || catKey.includes(kw)) {
      const catId = catIds[0]
      const catSlug = catKey.replace(/\s+/g, "-")
      return `https://yellowpages.webindia123.com/d-py/${state}/${city}/${catSlug}-${catId}/1/`
    }
  }

  return null
}

// ─── Main Export ────────────────────────────────────────────────────────────────

export async function scrapeGoogleMaps(
  keyword: string,
  location: string,
  maxResults = 20
): Promise<GoogleMapsResult[]> {
  const results: GoogleMapsResult[] = []
  const errors: string[] = []
  const seen = new Set<string>()

  function addResults(newResults: GoogleMapsResult[], source: string) {
    for (const r of newResults) {
      if (results.length >= maxResults) break
      const key = `${r.name.toLowerCase()}|${r.phone || ""}`
      if (!seen.has(key)) {
        seen.add(key)
        results.push({ ...r, googleMapsUrl: source })
      }
    }
  }

  // ── Strategy 1: WebIndia123 direct URL ──
  if (results.length < maxResults) {
    try {
      const directUrl = buildWebIndia123Url(keyword, location)
      if (directUrl) {
        console.log(`[Scraper] WebIndia123 direct: ${directUrl}`)
        const ypResults = await fetchWebIndia123Pages(directUrl, 4)
        console.log(`[Scraper] WebIndia123 direct: ${ypResults.length} leads`)
        addResults(ypResults, "webindia123")
      }
    } catch (err) {
      errors.push(`WebIndia123 direct: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // ── Strategy 2: WebIndia123 via DDG discovery ──
  if (results.length < maxResults) {
    try {
      await delay(500)
      const discoverQuery = `site:yellowpages.webindia123.com ${keyword} ${location}`
      const ddgHtml = await fetchDuckDuckGo(discoverQuery)

      if (ddgHtml) {
        const allUrls = extractUrlsFromDuckDuckGo(ddgHtml)
        const ypMatches = allUrls
          .filter(u => u.includes("yellowpages.webindia123.com/d-py/"))
          .slice(0, 3)

        if (ypMatches.length > 0) {
          console.log(`[Scraper] Found ${ypMatches.length} WebIndia123 URLs via DDG`)

          for (const ypUrl of ypMatches) {
            if (results.length >= maxResults) break
            const ypResults = await fetchWebIndia123Pages(ypUrl, 3)
            console.log(`[Scraper] WebIndia123 DDG: ${ypResults.length} leads from ${ypUrl}`)
            addResults(ypResults, "webindia123")
          }
        }
      }
    } catch (err) {
      errors.push(`WebIndia123 DDG: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (errors.length > 0) {
    console.warn(`[Scraper] Errors:`, errors)
  }

  const sources = [...new Set(results.map(r => r.googleMapsUrl).filter(Boolean))]
  console.log(`[Scraper] Total: ${results.length} leads from ${sources.join(", ") || "none"}`)
  return results.slice(0, maxResults)
}