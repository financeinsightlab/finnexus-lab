/**
 * E2E test: Indian business directory scraper
 * Usage: npx tsx scripts/test-scraper.ts [keyword] [location] [maxResults]
 */
import { scrapeGoogleMaps } from "../lib/leads/scrapers/google-maps"

async function main() {
  const keyword = process.argv[2] || "IT Companies"
  const location = process.argv[3] || "Mumbai"
  const maxResults = parseInt(process.argv[4] || "25", 10)

  console.log("=".repeat(60))
  console.log(`Test: ${keyword} in ${location} (max ${maxResults})`)
  console.log("=".repeat(60))

  const results = await scrapeGoogleMaps(keyword, location, maxResults)

  console.log(`\n=== Collected ${results.length} LEADS ===\n`)

  let withPhone = 0, withAddress = 0
  results.forEach((r, i) => {
    if (r.phone) withPhone++
    if (r.address) withAddress++
    console.log(`[${i + 1}] ${r.name}`)
    if (r.phone) console.log(`     Phone: ${r.phone}`)
    if (r.address) console.log(`     Addr:  ${r.address}`)
    if (r.website) console.log(`     Web:   ${r.website}`)
    if (r.googleMapsUrl) console.log(`     Src:   ${r.googleMapsUrl}`)
    console.log()
  })

  console.log(`Stats: ${withPhone}/${results.length} with phone, ${withAddress}/${results.length} with address`)
}

main()