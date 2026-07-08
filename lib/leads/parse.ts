// ─── CSV Parser & Smart Column Detection ────────────────────────────────────────

import Papa from "papaparse"

export interface ParsedCSV {
  headers: string[]
  rows: Record<string, string>[]
  totalRows: number
  previewRows: Record<string, string>[]
}

export interface ColumnMapping {
  csvColumn: string
  leadField: string
  confidence: number
}

const KNOWN_PATTERNS: Record<string, string[]> = {
  firstName: ["first name", "first_name", "fname", "firstname", "given name", "given_name"],
  lastName: ["last name", "last_name", "lname", "lastname", "surname", "family name", "family_name"],
  fullName: ["full name", "full_name", "name", "fullname", "contact name", "contact_name"],
  jobTitle: ["job title", "job_title", "title", "jobtitle", "position", "designation", "role"],
  department: ["department", "dept", "division", "team"],
  seniority: ["seniority", "level", "seniority level", "seniority_level"],
  companyName: ["company", "company name", "company_name", "organization", "organisation", "org", "business", "business name", "business_name"],
  companyDomain: ["domain", "company domain", "company_domain", "website domain", "website_domain", "url"],
  companySize: ["company size", "company_size", "size", "employees", "employee count", "employee_count", "headcount"],
  industry: ["industry", "sector", "vertical", "category", "niche"],
  website: ["website", "web", "site", "url", "company url", "company_url", "homepage"],
  email: ["email", "e-mail", "email address", "email_address", "mail", "e mail", "primary email", "primary_email"],
  phone: ["phone", "phone number", "phone_number", "telephone", "mobile", "cell", "contact number", "contact_number", "tel"],
  linkedInUrl: ["linkedin", "linkedin url", "linkedin_url", "linkedin profile", "linkedin_profile", "li url", "li_url"],
  address: ["address", "street", "street address", "street_address", "location"],
  city: ["city", "town", "municipality"],
  state: ["state", "province", "region", "territory"],
  country: ["country", "nation"],
  postalCode: ["postal code", "postal_code", "zip", "zip code", "zip_code", "postcode", "pin code", "pin_code", "pincode"],
  notes: ["notes", "note", "comments", "comment", "description", "additional info", "additional_info"],
}

export function parseCSV(content: string): ParsedCSV {
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    trimHeaders: true,
    trimValues: true,
  })

  const headers = result.meta.fields ?? []
  const rows = result.data as Record<string, string>[]
  const previewRows = rows.slice(0, 5)

  return {
    headers,
    rows,
    totalRows: rows.length,
    previewRows,
  }
}

export function detectColumns(headers: string[]): ColumnMapping[] {
  const mappings: ColumnMapping[] = []

  for (const header of headers) {
    const normalized = header.toLowerCase().trim()
    let bestMatch: { field: string; confidence: number } | null = null

    for (const [leadField, patterns] of Object.entries(KNOWN_PATTERNS)) {
      for (const pattern of patterns) {
        if (normalized === pattern) {
          bestMatch = { field: leadField, confidence: 1.0 }
          break
        }
        if (normalized.includes(pattern) || pattern.includes(normalized)) {
          const conf = 0.7
          if (!bestMatch || conf > bestMatch.confidence) {
            bestMatch = { field: leadField, confidence: conf }
          }
        }
      }
      if (bestMatch?.confidence === 1.0) break
    }

    if (bestMatch) {
      mappings.push({
        csvColumn: header,
        leadField: bestMatch.field,
        confidence: bestMatch.confidence,
      })
    } else {
      mappings.push({
        csvColumn: header,
        leadField: "",
        confidence: 0,
      })
    }
  }

  return mappings
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\.\+]/g, "")
  return cleaned.length >= 7 && /^\d+$/.test(cleaned)
}