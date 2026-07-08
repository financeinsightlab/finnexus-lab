// ─── Scraper Utilities ─────────────────────────────────────────────────────────
// Shared utilities for scrapers: user agent rotation, delays, safe fetch

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
]

let agentIndex = 0

export function getRandomUserAgent(): string {
  agentIndex = (agentIndex + 1) % USER_AGENTS.length
  return USER_AGENTS[agentIndex]
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface FetchResult {
  html: string
  status: number
  url: string
  error?: string
}

export async function safeFetch(
  url: string,
  options: { timeout?: number; headers?: Record<string, string> } = {}
): Promise<FetchResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 15000)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": getRandomUserAgent(),
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        ...options.headers,
      },
      redirect: "follow",
    })

    const html = await response.text()
    return { html, status: response.status, url: response.url }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown fetch error"
    // Check if it's a timeout
    if (err instanceof DOMException && err.name === "AbortError") {
      return { html: "", status: 0, url, error: "Timeout after " + (options.timeout ?? 15000) + "ms" }
    }
    return { html: "", status: 0, url, error: errorMessage }
  } finally {
    clearTimeout(timeout)
  }
}

export function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const matches = text.match(emailRegex)
  if (!matches) return []
  return [...new Set(matches.map((e) => e.toLowerCase()))]
}

export function extractPhones(text: string): string[] {
  const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g
  const matches = text.match(phoneRegex)
  if (!matches) return []
  return [...new Set(matches)]
}

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim()
}