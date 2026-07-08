// ─── Leads API: List & Create ──────────────────────────────────────────────────
// GET /api/leads — paginated, filtered, sorted lead list
// POST /api/leads — create a single lead

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateScore } from "@/lib/leads/scoring"
import { auth } from "@/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20")
  const status = searchParams.get("status")
  const source = searchParams.get("source")
  const search = searchParams.get("search")
  const sortBy = searchParams.get("sortBy") ?? "createdAt"
  const sortOrder = searchParams.get("sortOrder") ?? "desc"
  const assignedTo = searchParams.get("assignedTo")
  const industry = searchParams.get("industry")
  const minScore = searchParams.get("minScore")
  const listId = searchParams.get("listId")

  const where: Record<string, unknown> = {}

  if (status) {
    where.status = status
  }
  if (source) {
    where.source = source
  }
  if (assignedTo) {
    where.assignedTo = assignedTo
  }
  if (industry) {
    where.industry = industry
  }
  if (minScore) {
    where.score = { gte: parseInt(minScore) }
  }
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { fullName: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
      { jobTitle: { contains: search, mode: "insensitive" } },
      { emails: { path: "$[*].email", string_contains: search } },
      { phones: { path: "$[*].number", string_contains: search } },
      { city: { contains: search, mode: "insensitive" } },
    ]
  }
  if (listId) {
    where.listMemberships = { some: { listId } }
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: { select: { activities: true, listMemberships: true } },
      },
    }),
    prisma.lead.count({ where }),
  ])

  return NextResponse.json({
    leads,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  const { score, breakdown } = calculateScore(body)

  const lead = await prisma.lead.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      fullName: body.fullName ?? [body.firstName, body.lastName].filter(Boolean).join(" "),
      jobTitle: body.jobTitle,
      department: body.department,
      seniority: body.seniority,
      companyName: body.companyName,
      companyDomain: body.companyDomain,
      companySize: body.companySize,
      industry: body.industry,
      companyLinkedIn: body.companyLinkedIn,
      website: body.website,
      emails: body.emails ?? [],
      phones: body.phones ?? [],
      linkedInUrl: body.linkedInUrl,
      twitterUrl: body.twitterUrl,
      address: body.address,
      city: body.city,
      state: body.state,
      country: body.country,
      postalCode: body.postalCode,
      source: body.source ?? "MANUAL",
      tags: body.tags ?? [],
      notes: body.notes,
      customFields: body.customFields,
      score,
      scoreBreakdown: JSON.parse(JSON.stringify(breakdown)),
      assignedTo: body.assignedTo ?? session.user.id,
    },
  })

  // Log activity
  await prisma.leadActivity.create({
    data: {
      leadId: lead.id,
      type: "CREATED",
      summary: "Lead created manually",
      userId: session.user.id,
    },
  })

  return NextResponse.json({ lead }, { status: 201 })
}