// ─── Lead Engine: Lead Browser ─────────────────────────────────────────────────
// /admin/leads — Main lead listing with table/kanban toggle, filters, search, bulk actions

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import LeadBrowserClient from "./LeadBrowserClient"
import Link from "next/link"
import { Users, Plus, Upload, Search, Download, BarChart3, Kanban, Settings } from "lucide-react"

export default async function LeadsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  const sp = await searchParams
  const page = parseInt(sp.page ?? "1")
  const pageSize = 20
  const status = sp.status
  const source = sp.source
  const search = sp.search
  const sortBy = sp.sortBy ?? "createdAt"
  const sortOrder = sp.sortOrder ?? "desc"

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (source) where.source = source
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
      { jobTitle: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
    ]
  }

  const [leads, total, stats] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        fullName: true,
        companyName: true,
        jobTitle: true,
        industry: true,
        emails: true,
        phones: true,
        city: true,
        state: true,
        status: true,
        score: true,
        source: true,
        aiEnriched: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.lead.count({ where }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
  ])

  const statusCounts = stats.map((s) => ({ status: s.status, count: s._count.id }))

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Users className="w-8 h-8 text-[#0D6E6E]" />
                  Lead Engine
                </h1>
                <p className="text-slate-400 mt-1">
                  {total.toLocaleString()} total leads • Manage, enrich, and track your pipeline
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/leads/pipeline"
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-600/30 transition-all text-sm font-medium"
                >
                  <Kanban className="w-4 h-4" />
                  Pipeline
                </Link>
                <Link
                  href="/admin/leads/scrape/maps"
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-600/30 transition-all text-sm font-medium"
                >
                  <Search className="w-4 h-4" />
                  Discover Leads
                </Link>
                <Link
                  href="/admin/leads/settings"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/40 border border-white/[0.08] text-slate-300 rounded-xl hover:bg-slate-700/60 transition-all text-sm font-medium"
                  title="Configure API keys"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin/leads/import"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all text-sm font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Import CSV
                </Link>
                <Link
                  href="/admin/leads/new"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0D6E6E] text-white rounded-xl hover:bg-[#0B5A5A] transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Lead
                </Link>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex gap-4 mt-6 flex-wrap">
              {[
                { label: "New", value: statusCounts.find((s) => s.status === "NEW")?.count ?? 0, color: "bg-slate-500" },
                { label: "Qualified", value: statusCounts.find((s) => s.status === "QUALIFIED")?.count ?? 0, color: "bg-amber-500" },
                { label: "Contacted", value: statusCounts.find((s) => s.status === "CONTACTED")?.count ?? 0, color: "bg-blue-500" },
                { label: "Negotiation", value: statusCounts.find((s) => s.status === "NEGOTIATION")?.count ?? 0, color: "bg-purple-500" },
                { label: "Won", value: statusCounts.find((s) => s.status === "WON")?.count ?? 0, color: "bg-emerald-500" },
              ].map((stat) => (
                <Link
                  key={stat.label}
                  href={`/admin/leads?status=${stat.label}`}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                  <span className="text-sm text-slate-300">{stat.label}</span>
                  <span className="text-sm font-semibold text-white">{stat.value}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <LeadBrowserClient
          leads={JSON.parse(JSON.stringify(leads))}
          pagination={{ page, pageSize, total, totalPages: Math.ceil(total / pageSize) }}
        />
      </div>
    </div>
  )
}