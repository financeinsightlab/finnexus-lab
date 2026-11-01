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
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import React from "react"
import ActionButtons from "./ActionButtons"
import HeroBackground from "@/components/ui/HeroBackground"

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

  const statusFilter: Prisma.PostWhereInput = (() => {
    if (!status) return {}
    const s = status.toUpperCase()
    if (["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"].includes(s)) {
      return { contentStatus: s } as any
    }
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

  try {
    const [postsData, count, grouped] = await Promise.all([
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
    ])
    posts = postsData
    totalCount = count
    grouped.forEach((g) => {
      typeCounts[g.type] = (g._count as any).id
    })
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
    { label: "Media & Podcasts", value: "MEDIA", count: typeCounts.MEDIA ?? 0 },
    { label: "Other", value: "OTHER", count: typeCounts.OTHER ?? 0 },
  ]

  const typeColors: Record<string, string> = {
    RESEARCH: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    INSIGHT: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    CASE_STUDY: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    MEDIA: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
    OTHER: "bg-surface-muted text-content-secondary border border-border",
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
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 md:p-10 shadow-xl border border-white/5">
        <HeroBackground />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-label text-teal-400">Library Management</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-200">
                2 Content Engines: Markdown + Blocks
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-content-primary mt-2">Content Repository</h1>
            <p className="text-content-secondary text-sm mt-2 max-w-md">
              Complete publication management for Institutional Research, Executive Insights, Case Studies, and Multimedia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/product-content"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
            >
              Product Content Tools
            </Link>
            <Link
              href="/admin/cms/new"
              className="btn-primary bg-white text-brand-navy hover:bg-gray-100 flex items-center justify-center gap-2 group shadow-lg text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Create New Entry
            </Link>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={buildUrl({ type: cat.value, page: "1" })}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              (type ?? "") === cat.value
                ? "bg-brand text-primary-foreground border-brand shadow-sm"
                : "bg-surface-muted border-border text-content-secondary hover:text-content-primary hover:bg-accent"
            }`}
          >
            {cat.label}
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] ${
                (type ?? "") === cat.value
                  ? "bg-white/20 text-white"
                  : "bg-surface text-content-muted border border-border"
              }`}
            >
              {cat.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Search + Quick Filter Bar */}
      <form method="GET" action="/admin/cms" className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface p-4 rounded-2xl border border-border">
        <input type="hidden" name="type" value={type ?? ""} />
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-brand transition-colors" />
          <input
            type="text"
            name="search"
            placeholder="Search by title, keywords or summary..."
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
            <option value="">All Statuses</option>
            <option value="published">Live / Published</option>
            <option value="draft">Drafts</option>
            <option value="REVIEW">In Review</option>
            <option value="APPROVED">Approved</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
        </div>
        <button type="submit" className="btn-primary text-sm font-bold">
          Search
        </button>
      </form>

      {/* Content Table */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-muted/50 text-[11px] font-bold uppercase tracking-wider text-content-muted">
                <th className="px-6 py-4">Title & Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-muted/40 transition-colors group">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex flex-col">
                        <Link
                          href={`/admin/cms/edit/${post.id}`}
                          className="font-bold text-content-primary hover:text-brand transition-colors line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <span className="text-xs text-content-muted font-mono mt-0.5 line-clamp-1">
                          /{post.type.toLowerCase().replace("_", "-")}/{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${typeColors[post.type] || typeColors.OTHER}`}>
                        {post.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-xs font-bold uppercase">Live</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-500">
                          <div className="w-2 h-2 rounded-full bg-amber-500 opacity-80" />
                          <span className="text-xs font-bold uppercase">Draft</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-content-primary">{post.viewCount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-content-secondary font-medium">{post.author?.name || "Admin"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-content-muted">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: "medium" })
                          : new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/${post.type.toLowerCase().replace("_", "-")}/${post.slug}`}
                          target="_blank"
                          className="p-2 text-content-muted hover:text-content-primary bg-surface-muted hover:bg-accent rounded-xl transition-all"
                          title="View Live Article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/cms/edit/${post.id}`}
                          className="p-2 text-content-muted hover:text-brand bg-surface-muted hover:bg-brand-muted rounded-xl transition-all"
                          title="Edit in CMS"
                        >
                          <Edit2 className="w-4 h-4" />
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
                      <div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center text-content-muted border border-border">
                        <FileText className="w-8 h-8 opacity-30" />
                      </div>
                      <div>
                        <h4 className="text-content-primary font-bold">No content found</h4>
                        <p className="text-content-muted text-sm mt-1">
                          {search ? `No articles matching "${search}"` : "Your content repository is currently empty."}
                        </p>
                      </div>
                      <Link href="/admin/cms/new" className="btn-primary text-xs font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create New Entry
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface-muted/30">
            <p className="text-xs text-content-muted">
              Showing <span className="text-content-primary font-bold">{skip + 1}–{Math.min(skip + pageSize, totalCount)}</span> of <span className="text-content-primary font-bold">{totalCount}</span> entries
            </p>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link
                  href={buildUrl({ page: String(page - 1) })}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-xl text-xs font-bold text-content-secondary hover:text-content-primary transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </Link>
              )}
              <span className="px-3 py-1.5 bg-brand/10 border border-brand/20 rounded-xl text-xs font-bold text-brand">
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={buildUrl({ page: String(page + 1) })}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-xl text-xs font-bold text-content-secondary hover:text-content-primary transition-all"
                >
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
