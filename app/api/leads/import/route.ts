// ─── Leads Import API ──────────────────────────────────────────────────────────
// POST /api/leads/import — upload CSV, parse, detect columns, return preview
// POST /api/leads/import/confirm — execute the actual import

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { parseCSV, detectColumns, validateEmail } from "@/lib/leads/parse"
import { checkDuplicate } from "@/lib/leads/dedup"
import { calculateScore } from "@/lib/leads/scoring"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

  const content = await file.text()
  const { headers, rows, totalRows, previewRows } = parseCSV(content)
  const detectedColumns = detectColumns(headers)

  // Check duplicates for preview rows
  const previewDupChecks = await Promise.all(
    previewRows.slice(0, 5).map((row) =>
      checkDuplicate(
        {
          firstName: row.firstName ?? row["First Name"] ?? row["first_name"],
          lastName: row.lastName ?? row["Last Name"] ?? row["last_name"],
          companyName: row.companyName ?? row["Company"] ?? row["company_name"],
          companyDomain: row.companyDomain ?? row["Domain"] ?? row["company_domain"],
          emails: row.email ? [{ email: row.email }] : [],
          phones: row.phone ? [{ number: row.phone }] : [],
        },
        prisma
      )
    )
  )

  return NextResponse.json({
    fileName: file.name,
    fileSize: file.size,
    totalRows,
    headers,
    previewRows,
    detectedColumns,
    previewDupChecks,
  })
}

// POST /api/leads/import/confirm
export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { fileName, rows, columnMapping, duplicateAction } = body

  // columnMapping: { csvColumn: leadField }[]
  // duplicateAction: "skip" | "update" | "import"

  let imported = 0
  let skipped = 0
  let errors = 0
  const errorDetails: { row: number; message: string }[] = []

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i]
      const leadData: Record<string, unknown> = {}

      for (const mapping of columnMapping) {
        if (mapping.leadField && row[mapping.csvColumn]) {
          // Handle special fields
          if (mapping.leadField === "emails") {
            leadData.emails = [{ email: row[mapping.csvColumn], type: "work", isPrimary: true }]
          } else if (mapping.leadField === "phones") {
            leadData.phones = [{ number: row[mapping.csvColumn], type: "office", isPrimary: true }]
          } else {
            leadData[mapping.leadField] = row[mapping.csvColumn]
          }
        }
      }

      // Build full name
      if (!leadData.fullName) {
        leadData.fullName = [leadData.firstName, leadData.lastName].filter(Boolean).join(" ")
      }

      // Check duplicate
      const dup = await checkDuplicate(
        {
          firstName: leadData.firstName as string,
          lastName: leadData.lastName as string,
          companyName: leadData.companyName as string,
          companyDomain: leadData.companyDomain as string,
          emails: leadData.emails as { email: string }[],
          phones: leadData.phones as { number: string }[],
        },
        prisma
      )

      if (dup.isDuplicate) {
        if (duplicateAction === "skip") {
          skipped++
          continue
        }
        if (duplicateAction === "update" && dup.existingLeadId) {
          await prisma.lead.update({
            where: { id: dup.existingLeadId },
            data: leadData as Record<string, unknown>,
          })
          imported++
          continue
        }
      }

      const { score, breakdown } = calculateScore(leadData)

      await prisma.lead.create({
        data: {
          ...leadData,
          source: "CSV_IMPORT",
          score,
          scoreBreakdown: JSON.parse(JSON.stringify(breakdown)),
          assignedTo: session.user.id,
        },
      })

      imported++
    } catch (err) {
      errors++
      errorDetails.push({
        row: i + 1,
        message: err instanceof Error ? err.message : "Unknown error",
      })
    }
  }

  // Log import
  await prisma.importLog.create({
    data: {
      fileName,
      fileSize: body.fileSize,
      totalRows: rows.length,
      importedRows: imported,
      skippedRows: skipped,
      errorRows: errors,
      columnMapping,
      errors: errorDetails.length > 0 ? errorDetails : undefined,
      status: "COMPLETED",
      userId: session.user.id,
    },
  })

  return NextResponse.json({
    imported,
    skipped,
    errors,
    errorDetails: errorDetails.slice(0, 20),
  })
}