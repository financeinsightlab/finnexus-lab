import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArticleType, Post, Prisma } from "@prisma/client"
import {
  Plus,
  Search,
  Edit2,
  Eye,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import React from "react"
import ActionButtons from "./ActionButtons"
import HeroBackground from "@/components/ui/HeroBackground"

function contentStatusBadge(status: string | null | undefined) {
  const s = (status || "DRAFT").toUpperCase()
  const map: Record<string, string> = {
    DRAFT: "bg-slate-500/10 text-slate-500 border border-slate-500/20",
    REVIEW: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    APPROVED: "bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20",
    PUBLISHED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    ARCHIVED: "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 line-through",
  }
  return map[s] || map.DRAFT
}

type PostWithAuthor = Post & { author: { name: string | null } }

export default async function CMSDashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string; status?: string; page?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  const params = await searchParams
  const type = params.type as ArticleType | undefined
  const status = params.status
  const search = params.search || ""
  const page = Math.max(1, Number(params.page || 1))
  const pageSize = 15
  const skip = (page - 1) * pageSize

  // Workflow: reuse existing Post.contentStatus (DRAFT/REVIEW/APPROVED/PUBLISHED) without introducing a parallel system.
  // Legacy query param `published`/`draft` still works; new values map to contentStatus.
  const statusFilter: Prisma.PostWhereInput = (() => {
    if (!status) return {}
    const s = status.toUpperCase()
    if (["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"].includes(s)) return { contentStatus: s } as any
    if (status === "published") return { published: true }
    if (status === "draft") return { published: false }
    return {}
  })()

  const where: Prisma.PostWhereInput = {
    AND: [
      type ? { type } : {},
      statusFilter,
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  }

  let posts: PostWithAuthor[] = []
  let totalCount = 0
  const typeCounts: Record<string, number> = {}
  const statusCounts: Record<string, number> = {}
  let scheduledOverdue = 0

  try {
    const [postsData, count, grouped, byStatus, overdue] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip,
        take: pageSize,
        include: {
          author: { select: { name: true } },
        },
      }),
      prisma.post.count({ where }),
      prisma.post.groupBy({ by: ["type"], _count: { id: true } }),
      (prisma.post.groupBy({ by: ["contentStatus" as any], _count: { id: true } }) as Promise<any>),
      prisma.post.count({ where: { scheduledPublishAt: { lt: new Date() }, published: false } }),
    ])
    posts = postsData
    totalCount = count
    grouped.forEach((g) => { typeCounts[g.type] = (g._count as any).id })
    ;(byStatus as any[]).forEach((g: any) => { statusCounts[g.contentStatus] = g._count.id })
    scheduledOverdue = overdue
  } catch (e) {
    console.error("Prisma fetch failed:", e)
    posts = []
    totalCount = 0
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  const categories = [
    { label: "All", value: "", count: Object.values(typeCounts).reduce((a, b) => a + b, 0) },
    { label: "Research", value: "RESEARCH", count: typeCounts.RESEARCH ?? 0 },
    { label: "Insights", value: "INSIGHT", count: typeCounts.INSIGHT ?? 0 },
    { label: "Case Studies", value: "CASE_STUDY", count: typeCounts.CASE_STUDY ?? 0 },
    { label: "Media", value: "MEDIA", count: typeCounts.MEDIA ?? 0 },
    { label: "Other", value: "OTHER", count: typeCounts.OTHER ?? 0 },
  ]

  const typeColors: Record<string, string> = {
    RESEARCH: "bg-info-muted text-info",
    INSIGHT: "bg-success-muted text-success",
    CASE_STUDY: "bg-accent-violet-muted text-accent-violet",
    MEDIA: "bg-accent-violet-muted text-accent-violet",
    OTHER: "bg-surface-muted text-content-secondary",
  }

  const buildUrl = (overrides: Record<string, string>) => {
    const p = new URLSearchParams({
      ...(search ? { search } : {}),
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
      page: String(page),
      ...overrides,
    })
    return `/admin/cms?${p.toString()}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 md:p-10 shadow-xl border border-border-subtle">
        <HeroBackground />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-label text-teal-400">Library Management</span>
            <h1 className="text-3xl font-extrabold text-content-primary mt-2">Content Repository</h1>
            <p className="text-content-secondary text-sm mt-2 max-w-md">
              All content — from MDX files and CMS entries — in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/product-content" className="btn-outline-white">Product content tools</Link>
            <Link href="/admin/cms/new" className="btn-primary bg-white text-brand-navy hover:bg-gray-100 flex items-center justify-center gap-2 group shadow-lg">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Create New Entry
            </Link>
          </div>
        </div>
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={buildUrl({ type: cat.value, page: "1" })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              (type ?? "") === cat.value
                ? "bg-brand/20 border-brand/50 text-brand"
                : "bg-surface-muted border-border text-content-secondary hover:text-content-primary hover:bg-accent"
            }`}
          >
            {cat.label}
            <span className="bg-accent px-1.5 py-0.5 rounded-md text-[9px]">{cat.count}</span>
          </Link>
        ))}
      </div>

      {/* Workflow pills — Idea→Draft→Review→Approve→Publish */}
      <div className="bg-surface border border-border rounded-2xl p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Workflow — existing Post.contentStatus reused (no parallel status introduced)</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: "All", value: "", count: Object.values(statusCounts).reduce((a,b)=>a+b,0) },
            { label: "Draft", value: "DRAFT", count: statusCounts.DRAFT ?? 0 },
            { label: "In Review", value: "REVIEW", count: statusCounts.REVIEW ?? 0 },
            { label: "Approved", value: "APPROVED", count: statusCounts.APPROVED ?? 0 },
            { label: "Published", value: "PUBLISHED", count: statusCounts.PUBLISHED ?? 0 },
            { label: "Archived", value: "ARCHIVED", count: statusCounts.ARCHIVED ?? 0 },
          ].map((s) => (
            <Link
              key={s.value}
              href={buildUrl({ status: s.value, page: "1" })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-1.5 ${ (status ?? "").toUpperCase() === s.value ? "bg-brand text-primary-foreground border-brand" : s.value==="REVIEW" && s.count>0 ? "bg-warning-muted text-warning border-warning/20" : "bg-surface-muted border-border text-content-secondary hover:text-content-primary" }`}
            >
              {s.label} <span className="opacity-70">{s.count}</span>
            </Link>
          ))}
          {scheduledOverdue > 0 && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-error-muted text-error border border-error/20">Overdue scheduled: {scheduledOverdue}</span>
          )}
        </div>
        <p className="text-[11px] text-content-muted mt-2">Source: <span className="font-mono">Post.contentStatus</span> + <span className="font-mono">scheduledPublishAt</span> where published=false. Review queue drives editorial handoff.</p>
      </div>

      {/* Search + Workflow Filter — keeps legacy published/draft for deep links */}
      <form method="GET" action="/admin/cms" className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface p-4 rounded-2xl border border-border">
        <input type="hidden" name="type" value={type ?? ""} />
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-brand transition-colors" />
          <input
            type="text"
            name="search"
            placeholder="Search by title or excerpt..."
            defaultValue={search}
            className="w-full pl-11 pr-4 py-3 bg-surface-muted border border-border rounded-2xl text-sm text-content-primary focus:outline-none focus:border-brand/50 focus:bg-accent transition-all placeholder:text-content-muted"
          />
        </div>
        <div className="relative">
          <select
            name="status"
            defaultValue={status ?? ""}
            className="appearance-none w-full bg-surface-muted border border-border rounded-2xl text-sm px-5 py-3 text-content-secondary outline-none focus:border-brand/50 transition-all cursor-pointer"
          >
            <option value="">All (workflow)</option>
            <option value="DRAFT">Draft</option>
            <option value="REVIEW">In Review</option>
            <option value="APPROVED">Approved</option>
            <option value="PUBLISHED">Published (status)</option>
            <option value="published">Published (legacy bool)</option>
            <option value="draft">Draft (legacy bool)</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
        </div>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {/* Table */}

      <div className="bg-[#1A1F2E] rounded-2xl border border-[#2D3748] overflow-hidden shadow-xl">
        <div className="horizontal-scroll-region" role="region" aria-label="CMS content list" tabIndex={0} data-lenis-prevent>
          <table className="w-full min-w-[760px] text-left border-collapse">

            <thead>
              <tr className="bg-surface-muted">
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Views</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Author</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest">Published</th>
                <th className="px-6 py-4 text-[10px] font-bold text-content-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-muted transition-colors group">
                    <td className="px-6 py-4">
                      <div className="max-w-xs md:max-w-sm">
                        <p className="text-sm font-bold text-content-primary group-hover:text-brand transition-colors line-clamp-1">{post.title}</p>
                        <p className="text-[10px] text-content-muted font-mono mt-0.5 truncate">{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${typeColors[post.type] ?? "bg-surface-muted text-content-secondary"}`}>
                        {post.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {post.published ? (
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-bold uppercase">Live</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-60" />
                            <span className="text-[10px] font-bold uppercase">Draft</span>
                          </div>
                        )}
                        <span className={`inline-flex w-fit px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${contentStatusBadge((post as any).contentStatus)}`}>
                          {(post as any).contentStatus || "DRAFT"}
                        </span>
                        {(post as any).scheduledPublishAt && !post.published && (
                          <span className="text-[10px] font-mono text-content-muted">⏰ {new Date((post as any).scheduledPublishAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-content-primary">{post.viewCount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-content-secondary">{post.author.name || "Unknown"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-content-muted">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: "medium" })
                          : new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Link
                          href={`/${post.type.toLowerCase().replace("_", "-")}/${post.slug}`}
                          target="_blank"
                          className="p-2 text-content-muted hover:text-content-primary bg-surface-muted hover:bg-accent rounded-xl transition-all"
                          title="View Live"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/cms/edit/${post.id}`}
                          className="p-2 text-content-muted hover:text-brand bg-surface-muted hover:bg-brand-muted rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <ActionButtons post={post} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
                      <div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center text-content-muted border border-border-subtle">
                        <FileText className="w-8 h-8 opacity-20" />
                      </div>
                      <div>
                        <h4 className="text-content-primary font-bold">No content found</h4>
                        <p className="text-content-muted text-sm mt-1">
                          {search ? `No results for "${search}"` : "Your content repository is empty."}
                        </p>
                      </div>
                      <Link href="/admin/cms/new" className="btn-primary text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Entry
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-xs text-content-muted">
              Showing <span className="text-content-primary font-bold">{skip + 1}–{Math.min(skip + pageSize, totalCount)}</span> of <span className="text-content-primary font-bold">{totalCount}</span> entries
            </p>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link href={buildUrl({ page: String(page - 1) })} className="flex items-center gap-1.5 px-3 py-2 bg-surface-muted border border-border rounded-xl text-xs font-bold text-content-secondary hover:text-content-primary transition-all">
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </Link>
              )}
              <span className="px-3 py-2 bg-brand/10 border border-brand/20 rounded-xl text-xs font-bold text-brand">
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <Link href={buildUrl({ page: String(page + 1) })} className="flex items-center gap-1.5 px-3 py-2 bg-surface-muted border border-border rounded-xl text-xs font-bold text-content-secondary hover:text-content-primary transition-all">
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
