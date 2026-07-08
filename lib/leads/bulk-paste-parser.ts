// ─── Bulk Paste Parser ─────────────────────────────────────────────────────────
// Parses tabular data from clipboard (TSV, CSV, pipe-delimited, or space-delimited)

import { detectColumns, validateEmail, validatePhone } from "./parse"

export interface PasteResult {
  headers: string[]
  rows: Record<string, string>[]
  totalRows: number
  delimiter: string
  errors: { row: number; field: string; message: string }[]
}

export function parseClipboardData(raw: string): PasteResult {
  const trimmed = raw.trim()
  if (!trimmed) {
    return { headers: [], rows: [], totalRows: 0, delimiter: "tab", errors: [] }
  }

  // Detect delimiter
  const lines = trimmed.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const firstLine = lines[0]

  let delimiter: string
  let parseFn: (line: string) => string[]

  if (firstLine.includes("\t")) {
    delimiter = "tab"
    parseFn = (l) => l.split("\t").map((c) => c.trim())
  } else if (firstLine.includes("|")) {
    delimiter = "pipe"
    parseFn = (l) => l.split("|").map((c) => c.trim())
  } else if (firstLine.includes(",")) {
    delimiter = "comma"
    parseFn = (l) => {
      // Simple CSV parsing (handles quoted fields)
      const result: string[] = []
      let current = ""
      let inQuotes = false
      for (const char of l) {
        if (char === '"') { inQuotes = !inQuotes; continue }
        if (char === "," && !inQuotes) { result.push(current.trim()); current = ""; continue }
        current += char
      }
      result.push(current.trim())
      return result
    }
  } else {
    delimiter = "space"
    parseFn = (l) => l.split(/\s{2,}/).map((c) => c.trim()).filter(Boolean)
  }

  const parsedLines = lines.map(parseFn)
  const maxCols = Math.max(...parsedLines.map((l) => l.length))

  // If first line looks like headers (no emails, no phone numbers)
  const firstRow = parsedLines[0]
  const hasHeader = firstRow.every(
    (c) => !validateEmail(c) && !validatePhone(c) && c.length < 50
  )

  let headers: string[]
  let dataRows: string[][]

  if (hasHeader) {
    headers = firstRow
    // Pad short headers
    while (headers.length < maxCols) headers.push(`Column ${headers.length + 1}`)
    dataRows = parsedLines.slice(1)
  } else {
    headers = Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`)
    dataRows = parsedLines
  }

  const rows: Record<string, string>[] = []
  const errors: { row: number; field: string; message: string }[] = []

  for (let i = 0; i < dataRows.length; i++) {
    const row: Record<string, string> = {}
    const cols = dataRows[i]
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = cols[j] ?? ""
    }
    rows.push(row)
  }

  return { headers, rows, totalRows: rows.length, delimiter, errors }
}