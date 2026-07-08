// ─── Lead Export Utilities ─────────────────────────────────────────────────────
// Exports leads as CSV or Excel (XLSX)

import type { Lead } from "@prisma/client"

export type ExportableLead = Pick<
  Lead,
  | "firstName"
  | "lastName"
  | "fullName"
  | "jobTitle"
  | "department"
  | "seniority"
  | "companyName"
  | "companyDomain"
  | "companySize"
  | "industry"
  | "website"
  | "linkedInUrl"
  | "twitterUrl"
  | "address"
  | "city"
  | "state"
  | "country"
  | "postalCode"
  | "status"
  | "score"
  | "source"
  | "tags"
  | "notes"
  | "createdAt"
  | "updatedAt"
> & {
  emails?: { email: string; type?: string }[] | null
  phones?: { number: string; type?: string }[] | null
}

export function flattenLeadForExport(lead: ExportableLead): Record<string, string> {
  const emails = (lead.emails as { email: string; type?: string }[] | null) ?? []
  const phones = (lead.phones as { number: string; type?: string }[] | null) ?? []

  return {
    "First Name": lead.firstName ?? "",
    "Last Name": lead.lastName ?? "",
    "Full Name": lead.fullName ?? "",
    "Job Title": lead.jobTitle ?? "",
    Department: lead.department ?? "",
    Seniority: lead.seniority ?? "",
    Company: lead.companyName ?? "",
    Domain: lead.companyDomain ?? "",
    "Company Size": lead.companySize ?? "",
    Industry: lead.industry ?? "",
    Website: lead.website ?? "",
    "Primary Email": emails.find((e) => e.type === "work" || (e as { isPrimary?: boolean }).isPrimary)?.email ?? emails[0]?.email ?? "",
    "All Emails": emails.map((e) => e.email).join("; "),
    "Primary Phone": phones.find((p) => (p as { isPrimary?: boolean }).isPrimary)?.number ?? phones[0]?.number ?? "",
    "All Phones": phones.map((p) => p.number).join("; "),
    LinkedIn: lead.linkedInUrl ?? "",
    Twitter: lead.twitterUrl ?? "",
    Address: lead.address ?? "",
    City: lead.city ?? "",
    State: lead.state ?? "",
    Country: lead.country ?? "",
    "Postal Code": lead.postalCode ?? "",
    Status: lead.status ?? "",
    Score: lead.score?.toString() ?? "0",
    Source: lead.source ?? "",
    Tags: (lead.tags as string[] | null)?.join("; ") ?? "",
    Notes: lead.notes ?? "",
    "Created At": lead.createdAt?.toISOString() ?? "",
    "Updated At": lead.updatedAt?.toISOString() ?? "",
  }
}

export function generateCSV(leads: ExportableLead[]): string {
  const flattened = leads.map(flattenLeadForExport)
  if (flattened.length === 0) return ""

  const headers = Object.keys(flattened[0])
  const csvRows = [headers.join(",")]

  for (const row of flattened) {
    const values = headers.map((h) => {
      const val = row[h] ?? ""
      // Escape commas and quotes
      if (val.includes(",") || val.includes('"') || val.includes("\n")) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    })
    csvRows.push(values.join(","))
  }

  return csvRows.join("\n")
}

export function generateCSVBlob(leads: ExportableLead[]): Blob {
  const csv = generateCSV(leads)
  return new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }) // BOM for Excel
}

export async function generateExcelBuffer(leads: ExportableLead[]): Promise<Buffer> {
  const XLSX = await import("xlsx")
  const flattened = leads.map(flattenLeadForExport)
  const ws = XLSX.utils.json_to_sheet(flattened)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Leads")
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })
  return Buffer.from(buf)
}