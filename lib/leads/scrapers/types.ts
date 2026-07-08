// ─── Scraper Type Definitions ──────────────────────────────────────────────────

export interface GoogleMapsResult {
  name: string
  address?: string
  phone?: string
  website?: string
  rating?: number
  totalRatings?: number
  category?: string
  placeId?: string
  googleMapsUrl?: string
  lat?: number
  lng?: number
}

export interface WebsiteScrapeResult {
  domain: string
  pages: {
    url: string
    title: string
    text: string
    emails: string[]
    phones: string[]
    status: number
  }[]
  combinedText: string
  allEmails: string[]
  allPhones: string[]
}

export interface ScraperSource {
  name: string
  type: string
  run: (params: Record<string, unknown>) => Promise<unknown[]>
}