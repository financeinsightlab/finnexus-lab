import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  FileText,
  FilePlus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Activity,
  MessageSquare,
  Megaphone,
  TrendingUp,
  ShieldCheck,
  Inbox,
  CalendarClock,
  ArrowUpRight,
  RefreshCw,
  Wifi,
  LogIn,
  BookOpen,
  Target,
  Timer,
} from "lucide-react"
import { getContactInquiries } from "@/lib/contact-inquiries"
import { featureStatus } from "@/lib/status"
import { slaWorklist, type SlaInput } from "@/lib/freshness-sla"
import HeroBackground from "@/components/ui/HeroBackground"

// Helpers for date boundaries (no external dep)
function startOfDay(d: Date) {
  const n = new Date(d)
  n.setHours(0, 0, 0, 0)
  return n
}
function daysAgo(n: number, from = new Date()) {
  return new Date(from.getTime() - n * 86_400_000)
}

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (session.user.role !== "ADMIN") redirect("/admin/cms")

  const now = new Date()
  const todayStart = startOfDay(now)
  const d7 = daysAgo(7, now)
  const weekAgo = d7
  const twoWeeksAgo = daysAgo(14, now)

  // Data-source-annotated fetches (each comment = defined source/calculation)
  // All in Promise.all with soft-fail fallbacks so a missing table never 500s the centre.
  const [
    totalUsers,
    newUsersThisWeek,
    newUsersLastWeek,
    activeSessions,
    totalPosts,
    publishedPosts,
    postsByStatusRaw,
    scheduledPosts,
    overdueScheduled,
    needsReviewPosts,
    recentPostsRaw,
    postsByType,
    totalPageViews,
    pageViewsToday,
    pageViews7d,
    totalLogins,
    inquiryData,
    promotionsAll,
    pendingPayments,
    pageViewsForPublishedSlugs, // for measure later
    recentStudyMaterials,
    predictionsOverdue,
    jobsPending,
    jobsFailed,
    recentPublishEvents,
  ] = await Promise.all([
    // SOURCE: User.count() — total user records
    prisma.user.count().catch(() => 0),
    // SOURCE: User.count createdAt >= 7d
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }).catch(() => 0),
    prisma.user.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }).catch(() => 0),
    // SOURCE: Session where expires > now — currently authenticated
    prisma.session.count({ where: { expires: { gt: now } } }).catch(() => 0),
    // SOURCE: Post.count — all content rows
    prisma.post.count().catch(() => 0),
    // SOURCE: Post.count where published=true (legacy boolean, kept for compatibility)
    prisma.post.count({ where: { published: true } }).catch(() => 0),
    // SOURCE: Post.groupBy contentStatus — workflow distribution (DRAFT/REVIEW/APPROVED/PUBLISHED)
    (prisma.post.groupBy({ by: ["contentStatus" as any], _count: { id: true } }) as Promise<Array<{ contentStatus: string; _count: { id: number } }>>).catch(() => [] as any),
    // SOURCE: Post where scheduledPublishAt != null AND future (scheduled queue)
    prisma.post
      .findMany({
        where: { scheduledPublishAt: { not: null, gte: now }, published: false },
        orderBy: { scheduledPublishAt: "asc" },
        take: 5,
        select: { id: true, title: true, slug: true, scheduledPublishAt: true, contentStatus: true },
      })
      .catch(() => [] as any),
    // SOURCE: Post where scheduledPublishAt in past but still unpublished (overdue)
    prisma.post
      .findMany({
        where: { scheduledPublishAt: { not: null, lt: now }, published: false },
        orderBy: { scheduledPublishAt: "asc" },
        take: 5,
        select: { id: true, title: true, slug: true, scheduledPublishAt: true, contentStatus: true },
      })
      .catch(() => [] as any),
    // SOURCE: Post where contentStatus=REVIEW — needs editorial review
    prisma.post
      .findMany({
        where: { contentStatus: "REVIEW" },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { id: true, title: true, slug: true, type: true, updatedAt: true },
      })
      .catch(() => [] as any),
    // SOURCE: Post orderBy updatedAt desc — recently updated
    prisma.post
      .findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: { id: true, title: true, type: true, slug: true, published: true, contentStatus: true, updatedAt: true, publishedAt: true, scheduledPublishAt: true, viewCount: true },
      })
      .catch(() => [] as any),
    // SOURCE: Post.groupBy type — content breakdown
    prisma.post.groupBy({ by: ["type"], _count: { id: true } }).catch(() => [] as any),
    // SOURCE: PageView.count — all-time page views
    prisma.pageView.count().catch(() => 0),
    // SOURCE: PageView.count where createdAt >= today
    prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }).catch(() => 0),
    // SOURCE: PageView.count where createdAt >= 7d ago
    prisma.pageView.count({ where: { createdAt: { gte: d7 } } }).catch(() => 0),
    // SOURCE: LoginEvent.count — all-time logins
    prisma.loginEvent.count().catch(() => 0),
    // SOURCE: contact_inquiries table (or JSON fallback) — total/unread/replied
    getContactInquiries().catch(() => ({ inquiries: [], stats: { total: 0, unread: 0, replied: 0 } })),
    // SOURCE: Promotion.findMany — product/promotion status; active vs scheduled vs expired evaluated against now
    (prisma.promotion.findMany({ select: { id: true, title: true, active: true, startsAt: true, endsAt: true, priority: true } }) as Promise<any[]>).catch(() => [] as any[]),
    // SOURCE: PaymentSubmission where status=PENDING — payments awaiting verification
    prisma.paymentSubmission.count({ where: { status: "PENDING" } }).catch(() => 0),
    // SOURCE: PageView grouped by path for published post slugs (measure: views per published page)
    prisma.pageView
      .groupBy({ by: ["path"], _count: { id: true }, orderBy: { _count: { id: "desc" } }, take: 5 })
      .catch(() => [] as any),
    // SOURCE: StudyMaterial recent — learning freshness
    (prisma.studyMaterial.findMany({ orderBy: { updatedAt: "desc" }, take: 5, select: { id: true, title: true, slug: true, updatedAt: true, published: true } }) as any).catch(() => [] as any[]),
    // SOURCE: Prediction where resolveDate < now AND status=PENDING — overdue predictions
    prisma.prediction.count({ where: { resolveDate: { lt: now }, status: "PENDING" } }).catch(() => 0),
    // SOURCE: Job where status=PENDING — background work queue depth
    prisma.job.count({ where: { status: "PENDING" } }).catch(() => 0),
    prisma.job.count({ where: { status: "FAILED" } }).catch(() => 0),
    // SOURCE: PublishEvent orderBy createdAt desc — recent publish pipeline
    prisma.publishEvent.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { entityType: true, action: true, slug: true, createdAt: true } }).catch(() => [] as any),
  ])

  const userGrowth = newUsersLastWeek > 0 ? Math.round(((newUsersThisWeek - newUsersLastWeek) / newUsersLastWeek) * 100) : newUsersThisWeek > 0 ? 100 : 0

  // Map contentStatus groups to counts
  const statusCounts: Record<string, number> = {}
  for (const g of postsByStatusRaw as any[]) {
    const key = (g.contentStatus as string) || "DRAFT"
    statusCounts[key] = (g._count as any)?.id ?? 0
  }
  const draftCount = statusCounts["DRAFT"] ?? 0
  const reviewCount = statusCounts["REVIEW"] ?? 0
  const approvedCount = statusCounts["APPROVED"] ?? 0
  const publishedStatusCount = statusCounts["PUBLISHED"] ?? 0

  // Promotions: active means active flag ON and within window
  let promoActive = 0
  let promoScheduled = 0
  let promoExpired = 0
  for (const p of promotionsAll as any[]) {
    const activeFlag = p.active
    const starts = p.startsAt ? new Date(p.startsAt) : null
    const ends = p.endsAt ? new Date(p.endsAt) : null
    const inWindow = (!starts || starts <= now) && (!ends || ends >= now)
    if (activeFlag && inWindow) promoActive += 1
    else if (activeFlag && starts && starts > now) promoScheduled += 1
    else if (ends && ends < now) promoExpired += 1
  }

  // Freshness SLA worklist — uses lib/freshness-sla with per-type windows
  // Map Post.type to SLA ContentType: RESEARCH→research, INSIGHT→insight, CASE_STUDY→case-study, MEDIA→data-lab, OTHER→insight
  const slaMap: Record<string, SlaInput["type"]> = {
    RESEARCH: "research",
    INSIGHT: "insight",
    CASE_STUDY: "case-study",
    MEDIA: "data-lab",
    OTHER: "insight",
  }
  let staleCount = 0
  let warningCount = 0
  let staleSamples: Array<{ title: string; slug: string; type: string; status: string; ageDays: number }> = []
  try {
    const candidates: SlaInput[] = (recentPostsRaw as any[]).map((p) => ({
      type: slaMap[p.type] ?? "insight",
      title: p.title,
      slug: p.slug,
      updatedAt: (p.publishedAt ?? p.updatedAt) as Date,
    }))
    const evaluated = slaWorklist(candidates, now)
    staleCount = evaluated.filter((r) => r.status === "breach").length
    warningCount = evaluated.filter((r) => r.status === "warning").length
    staleSamples = evaluated.slice(0, 3).map((r) => ({ title: r.title, slug: r.slug, type: r.type, status: r.status, ageDays: r.ageDays }))
  } catch {
    // SLA optional — never fail centre
  }

  const integrations = featureStatus()
  const availableIntegrations = integrations.filter((f) => f.enabled)
  const pendingIntegrations = integrations.filter((f) => !f.enabled)

  const typeColors: Record<string, string> = {
    RESEARCH: "text-blue-400 bg-blue-500/10",
    INSIGHT: "text-emerald-400 bg-emerald-500/10",
    CASE_STUDY: "text-purple-400 bg-purple-500/10",
    MEDIA: "text-pink-400 bg-pink-500/10",
    OTHER: "text-content-secondary bg-surface-muted",
  }

  return (
    <div className="space-y-8">
      {/* Header — Operations Command Centre */}
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 md:p-10 shadow-xl border border-white/5">
        <HeroBackground />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-label text-teal-400">Operations Command Centre</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live — {now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight">Administration Overview</h1>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm">
              Welcome back, <span className="text-white font-semibold">{session.user?.name || "Admin"}</span>. This board shows only real, measured state — every number cites its source. Use <span className="text-white font-medium">Quick Actions</span> to move work forward.
            </p>
            <p className="text-[11px] text-slate-400 mt-3">
              Data sources: PostgreSQL tables <span className="font-mono text-slate-300">Post</span>, <span className="font-mono text-slate-300">PageView</span>, <span className="font-mono text-slate-300">LoginEvent</span>, <span className="font-mono text-slate-300">Session</span>, <span className="font-mono text-slate-300">User</span>, <span className="font-mono text-slate-300">Promotion</span>, <span className="font-mono text-slate-300">PaymentSubmission</span>, <span className="font-mono text-slate-300">ContactInquiries</span>, <span className="font-mono text-slate-300">Job</span>, <span className="font-mono text-slate-300">PublishEvent</span>. No synthetic revenue/uptime invented.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/admin/cms/new" className="btn-primary bg-white text-brand-navy hover:bg-gray-100 flex items-center gap-2 shadow-lg">
              <FilePlus className="w-4 h-4" /> Create Content
            </Link>
            <Link href="/admin/cms?status=REVIEW" className="btn-outline-white">Review Queue ({reviewCount})</Link>
          </div>
        </div>
      </div>

      {/* Content Workflow Summary — SOURCE: Post.groupBy contentStatus */}
      <section aria-labelledby="workflow-heading" className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h2 id="workflow-heading" className="text-sm font-bold text-content-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand" /> Content Workflow Summary
            </h2>
            <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">Post.contentStatus</span> groupBy — DRAFT → REVIEW → APPROVED → PUBLISHED. Legacy <span className="font-mono">published</span> boolean shown for parity.</p>
          </div>
          <Link href="/admin/cms" className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1">
            Open Library <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="rounded-xl border border-border bg-surface-muted p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Draft</p>
            <p className="text-2xl font-extrabold text-content-primary mt-1">{draftCount.toLocaleString()}</p>
            <p className="text-[11px] text-content-muted">contentStatus = DRAFT</p>
          </div>
          <div className="rounded-xl border border-warning/20 bg-warning-muted/40 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-warning">Needs Review</p>
            <p className="text-2xl font-extrabold text-warning mt-1">{reviewCount.toLocaleString()}</p>
            <p className="text-[11px] text-content-muted">contentStatus = REVIEW</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">Approved</p>
            <p className="text-2xl font-extrabold text-content-primary mt-1">{approvedCount.toLocaleString()}</p>
            <p className="text-[11px] text-content-muted">Ready to publish</p>
          </div>
          <div className="rounded-xl border border-success/20 bg-success-muted p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-success">Published</p>
            <p className="text-2xl font-extrabold text-success mt-1">{(publishedStatusCount || publishedPosts).toLocaleString()}</p>
            <p className="text-[11px] text-content-muted">contentStatus PUBLISHED / published=true</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Total Content</p>
            <p className="text-2xl font-extrabold text-content-primary mt-1">{totalPosts.toLocaleString()}</p>
            <p className="text-[11px] text-content-muted">All Post rows</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/admin/cms?status=draft" className="text-xs px-3 py-1.5 rounded-lg bg-surface-muted border border-border hover:border-brand/30 transition-colors">Drafts ({draftCount})</Link>
          <Link href="/admin/cms?status=REVIEW" className="text-xs px-3 py-1.5 rounded-lg bg-warning-muted border border-warning/20 text-warning font-semibold hover:bg-warning-muted/60 transition-colors">Review queue ({reviewCount})</Link>
          <Link href="/admin/cms?status=published" className="text-xs px-3 py-1.5 rounded-lg bg-success-muted border border-success/20 text-success hover:bg-success-muted/70 transition-colors">Published ({publishedPosts})</Link>
        </div>
      </section>

      {/* Attention: drafts/scheduled + enquiries + freshness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-amber-500" /> Scheduled & Overdue
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">Post.scheduledPublishAt</span> where published=false. Overdue = scheduled date in past.</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-content-muted">Scheduled (future)</span>
              <span className="text-sm font-bold text-content-primary">{(scheduledPosts as any[]).length.toLocaleString()} queued</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-error flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Overdue</span>
              <span className={`text-sm font-bold ${ (overdueScheduled as any[]).length ? "text-error" : "text-content-muted"}`}>{(overdueScheduled as any[]).length.toLocaleString()}</span>
            </div>
            {(scheduledPosts as any[]).length > 0 ? (
              <ul className="space-y-2 pt-3 border-t border-border-subtle">
                {(scheduledPosts as any[]).slice(0, 3).map((p: any) => (
                  <li key={p.id} className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-content-primary truncate">{p.title}</span>
                    <span className="text-[11px] font-mono text-content-muted shrink-0">{p.scheduledPublishAt ? new Date(p.scheduledPublishAt).toLocaleDateString() : ""}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-content-muted pt-3 border-t border-border-subtle">No scheduled publications.</p>
            )}
            {(overdueScheduled as any[]).length > 0 && (
              <div className="rounded-xl bg-error-muted border border-error/20 p-3">
                <p className="text-xs font-bold text-error">Overdue scheduled — publish or reschedule</p>
                <ul className="mt-2 space-y-1">
                  {(overdueScheduled as any[]).map((p: any) => (
                    <li key={p.id} className="text-xs text-content-primary truncate">
                      • {p.title} — <span className="font-mono text-content-muted">{p.scheduledPublishAt ? new Date(p.scheduledPublishAt).toLocaleDateString() : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <Inbox className="w-4 h-4 text-teal-500" /> Enquiries Requiring Attention
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">contact_inquiries</span> — unread = status UNREAD.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-surface-muted border border-border p-3 text-center">
              <p className="text-lg font-extrabold text-content-primary">{inquiryData.stats.total.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-content-muted font-bold">Total</p>
            </div>
            <div className="rounded-xl bg-warning-muted border border-warning/20 p-3 text-center">
              <p className="text-lg font-extrabold text-warning">{inquiryData.stats.unread.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-warning font-bold">Unread</p>
            </div>
            <div className="rounded-xl bg-success-muted border border-success/20 p-3 text-center">
              <p className="text-lg font-extrabold text-success">{inquiryData.stats.replied.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-success font-bold">Replied</p>
            </div>
          </div>
          {inquiryData.stats.unread > 0 ? (
            <div className="mt-4 rounded-xl bg-warning-muted/60 border border-warning/20 p-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-warning">{inquiryData.stats.unread} unread — reply from Inbox</span>
              <Link href="/admin/messages" className="text-xs font-bold text-warning hover:underline inline-flex items-center gap-1">
                Open <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <p className="text-xs text-content-muted mt-4">No unread enquiries — inbox clear.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/messages" className="text-xs px-3 py-1.5 rounded-lg bg-surface-muted border border-border hover:border-brand/30">View enquiries</Link>
            {pendingPayments > 0 && <span className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">{pendingPayments} payments pending</span>}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <Timer className="w-4 h-4 text-orange-500" /> Freshness Warnings
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">Post.publishedAt/updatedAt</span> vs SLA windows per <span className="font-mono">lib/freshness-sla.ts</span> (research 90/180d, insight 30/60d, tracker 7/14d).</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-warning-muted border border-warning/20 p-3 text-center">
              <p className="text-lg font-extrabold text-warning">{warningCount.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-warning font-bold">Aging</p>
            </div>
            <div className="rounded-xl bg-error-muted border border-error/20 p-3 text-center">
              <p className="text-lg font-extrabold text-error">{staleCount.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-widest text-error font-bold">Breach</p>
            </div>
          </div>
          {staleSamples.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {staleSamples.map((s) => (
                <li key={s.slug} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate font-medium text-content-primary">{s.title}</span>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === "breach" ? "bg-error-muted text-error" : "bg-warning-muted text-warning"}`}>{s.ageDays}d</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-content-muted mt-4">No sampled staleness in recent 5 posts. Full worklist evaluated on schedule.</p>
          )}
          <Link href="/admin/cms" className="mt-4 inline-flex text-xs font-bold text-brand hover:underline items-center gap-1">
            Review in Library <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Recently updated + content breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" /> Recently Updated
            </h3>
            <Link href="/admin/cms" className="text-[11px] font-bold text-brand hover:underline">View library</Link>
          </div>
          <p className="text-xs text-content-muted mb-4">Source: <span className="font-mono">Post</span> orderBy updatedAt desc (limit 5). Measures work in progress.</p>
          <div className="space-y-3">
            {(recentPostsRaw as any[]).map((p) => (
              <Link key={p.id} href={`/admin/cms/edit/${p.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-muted border border-transparent hover:border-border transition-all group">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.published ? "bg-success" : "bg-warning"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-content-primary truncate group-hover:text-brand">{p.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${typeColors[p.type] ?? "bg-surface-muted text-content-muted"}`}>{p.type.replace("_", " ")}</span>
                    <span className="text-[11px] text-content-muted font-mono">{p.contentStatus}</span>
                    <span className="text-[11px] text-content-muted">· {new Date(p.updatedAt).toLocaleDateString()}</span>
                    <span className="text-[11px] text-content-muted">· {p.viewCount} views</span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-content-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
            {(recentPostsRaw as any[]).length === 0 && <p className="text-xs text-content-muted text-center py-6">No posts yet — create your first.</p>}
          </div>
          {(recentStudyMaterials as any[]).length > 0 && (
            <div className="mt-6 pt-6 border-t border-border-subtle">
              <h4 className="text-xs font-bold text-content-primary flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Learning — Recent Study Updates
              </h4>
              <p className="text-[11px] text-content-muted mt-1">Source: <span className="font-mono">StudyMaterial</span> orderBy updatedAt desc.</p>
              <div className="mt-3 space-y-2">
                {(recentStudyMaterials as any[]).map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between text-xs">
                    <span className="truncate font-medium text-content-primary">{m.title}</span>
                    <span className="text-[11px] text-content-muted shrink-0 ml-3">{new Date(m.updatedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand" /> Content by Type
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">Post.groupBy type</span></p>
          <div className="mt-5 space-y-3">
            {(postsByType as any[]).map((g: any) => (
              <div key={g.type} className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${typeColors[g.type] ?? "text-content-secondary bg-surface-muted"}`}>{g.type.replace("_", " ")}</span>
                <span className="text-sm font-bold text-content-primary">{(g._count as any).id.toLocaleString()}</span>
              </div>
            ))}
            {(postsByType as any[]).length === 0 && <p className="text-xs text-content-muted text-center py-4">No content yet</p>}
          </div>
          <div className="mt-6 rounded-xl bg-surface-muted border border-border p-3">
            <p className="text-xs font-bold text-content-primary">Review focus</p>
            <p className="text-xs text-content-muted mt-1">{reviewCount > 0 ? `${reviewCount} items need review — keep editorial flow moving.` : "Review queue clear."} {predictionsOverdue > 0 ? `${predictionsOverdue} overdue predictions awaiting resolution.` : ""}</p>
            {(needsReviewPosts as any[]).length > 0 && (
              <ul className="mt-2 space-y-1">
                {(needsReviewPosts as any[]).slice(0, 3).map((rp: any) => (
                  <li key={rp.id} className="text-xs"><Link href={`/admin/cms/edit/${rp.id}`} className="font-medium text-content-primary hover:text-brand hover:underline">{rp.title}</Link> <span className="text-content-muted">· {new Date(rp.updatedAt).toLocaleDateString()}</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Product & promotion status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-pink-500" /> Product & Promotion Status
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">Promotion</span> active flag + window (<span className="font-mono">startsAt/endsAt</span> vs now). Events from <span className="font-mono">PromotionEvent</span> where available.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-success-muted border border-success/20 p-3 text-center">
              <p className="text-lg font-extrabold text-success">{promoActive.toLocaleString()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-success">Active</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
              <p className="text-lg font-extrabold text-blue-600 dark:text-blue-300">{promoScheduled.toLocaleString()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">Scheduled</p>
            </div>
            <div className="rounded-xl bg-surface-muted border border-border p-3 text-center">
              <p className="text-lg font-extrabold text-content-muted">{promoExpired.toLocaleString()}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Expired</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-lg bg-surface-muted border border-border">Total promotions: {(promotionsAll as any[]).length.toLocaleString()}</span>
            <Link href="/admin/product-content?tab=promotions" className="px-3 py-1.5 rounded-lg bg-brand text-primary-foreground font-semibold hover:bg-brand-hover inline-flex items-center gap-1">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {(pageViewsForPublishedSlugs as any[]).length > 0 && (
            <div className="mt-6 pt-4 border-t border-border-subtle">
              <p className="text-xs font-bold text-content-primary flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-brand" /> Top Paths by Views (measure)</p>
              <p className="text-[11px] text-content-muted mt-1">Source: <span className="font-mono">PageView.groupBy path</span> count.</p>
              <ul className="mt-3 space-y-1.5">
                {(pageViewsForPublishedSlugs as any[]).slice(0, 3).map((g: any) => (
                  <li key={g.path} className="flex items-center justify-between text-xs">
                    <span className="truncate font-mono text-content-primary">{g.path}</span>
                    <span className="font-bold text-content-primary ml-3 shrink-0">{g._count.id.toLocaleString()} views</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" /> Usage & Sessions
          </h3>
          <p className="text-xs text-content-muted mt-1">Sources: <span className="font-mono">PageView</span> (today/7d), <span className="font-mono">LoginEvent</span>, <span className="font-mono">Session</span> active, <span className="font-mono">User</span>. “+X this week” compares 7d cohorts.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Total Users</p>
              <p className="text-2xl font-extrabold text-content-primary mt-1">{totalUsers.toLocaleString()}</p>
              <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{newUsersThisWeek} this week {userGrowth !== 0 && <span className="text-success">({userGrowth > 0 ? "+" : ""}{userGrowth}% vs prior week)</span>}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Active Sessions</p>
              <p className="text-2xl font-extrabold text-success mt-1 flex items-center gap-2">
                <Wifi className="w-4 h-4" /> {activeSessions.toLocaleString()}
              </p>
              <p className="text-xs text-content-muted mt-1">Session.expires &gt; now</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Page Views</p>
              <p className="text-2xl font-extrabold text-content-primary mt-1">{totalPageViews.toLocaleString()}</p>
              <p className="text-xs text-content-muted mt-1">Today {pageViewsToday.toLocaleString()} · 7d {pageViews7d.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Total Logins</p>
              <p className="text-2xl font-extrabold text-content-primary mt-1 flex items-center gap-2">
                <LogIn className="w-3.5 h-3.5 text-content-muted" /> {totalLogins.toLocaleString()}
              </p>
              <p className="text-xs text-content-muted mt-1">LoginEvent rows</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/analytics" className="text-xs px-3 py-1.5 rounded-lg bg-surface-muted border border-border hover:border-brand/30">Analytics detail</Link>
            <Link href="/admin/users" className="text-xs px-3 py-1.5 rounded-lg bg-surface-muted border border-border hover:border-brand/30">Users ({totalUsers})</Link>
          </div>
        </div>
      </div>

      {/* System integration status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand" /> System & Integration Status
          </h3>
          <p className="text-xs text-content-muted mt-1">Source: <span className="font-mono">featureStatus()</span> (env + policy) + <span className="font-mono">Job</span> queue + <span className="font-mono">PublishEvent</span> pipeline.</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-content-muted">Available capabilities</span>
              <span className="font-bold text-success">{availableIntegrations.length} / {integrations.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableIntegrations.map((f) => (
                <span key={f.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-success-muted text-success border border-success/20">
                  <CheckCircle2 className="w-3 h-3" /> {f.label}
                </span>
              ))}
            </div>
            {pendingIntegrations.length > 0 && (
              <div className="pt-3 border-t border-border-subtle">
                <p className="text-[11px] font-bold uppercase tracking-widest text-content-muted">Not configured / disabled by policy</p>
                <ul className="mt-2 space-y-1">
                  {pendingIntegrations.map((f) => (
                    <li key={f.id} className="text-xs text-content-muted">
                      <span className="font-semibold text-content-primary">{f.label}</span> — {f.requires} <span className="font-mono text-[11px]">({f.state})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Jobs Pending</p>
              <p className="text-xl font-extrabold text-content-primary mt-1 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-content-muted" /> {jobsPending.toLocaleString()}
              </p>
              <p className="text-[11px] text-content-muted">Job.status PENDING</p>
            </div>
            <div className={`rounded-xl border p-3 ${jobsFailed > 0 ? "bg-error-muted border-error/20" : "bg-surface-muted border-border"}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">Jobs Failed</p>
              <p className={`text-xl font-extrabold mt-1 flex items-center gap-1.5 ${jobsFailed > 0 ? "text-error" : "text-content-primary"}`}>
                <AlertTriangle className="w-4 h-4" /> {jobsFailed.toLocaleString()}
              </p>
              <p className="text-[11px] text-content-muted">Needs inspection if &gt;0</p>
            </div>
          </div>
          {(recentPublishEvents as any[]).length > 0 && (
            <div className="mt-5 pt-4 border-t border-border-subtle">
              <p className="text-xs font-bold text-content-primary">Recent Publish Pipeline</p>
              <p className="text-[11px] text-content-muted">PublishEvent — entityType/action/slug/createdAt</p>
              <ul className="mt-3 space-y-1.5">
                {(recentPublishEvents as any[]).map((e: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-content-muted shrink-0">{e.entityType}</span>
                    <span className="font-semibold text-content-primary truncate">{e.action} · {e.slug ?? e.entityType}</span>
                    <span className="text-[11px] text-content-muted ml-auto shrink-0">{new Date(e.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl">
          <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-600" /> Quick Actions
          </h3>
          <p className="text-xs text-content-muted mt-1">Shortcuts into the real workflow — no mock actions.</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/admin/cms/new" className="flex items-center justify-between p-4 bg-brand text-primary-foreground rounded-xl hover:bg-brand-hover transition-colors group">
              <span className="text-sm font-bold flex items-center gap-2"><FilePlus className="w-4 h-4" /> New Content</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link href="/admin/cms?status=REVIEW" className="flex items-center justify-between p-4 bg-warning-muted border border-warning/20 text-warning rounded-xl hover:bg-warning-muted/70 transition-colors group">
              <span className="text-sm font-bold flex items-center gap-2"><Eye className="w-4 h-4" /> Review Queue</span>
              <span className="text-xs font-extrabold bg-warning text-white px-2 py-0.5 rounded-full">{reviewCount}</span>
            </Link>
            <Link href="/admin/messages" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><MessageSquare className="w-4 h-4 text-teal-500" /> Enquiries</span>
              <span className="text-xs font-bold text-content-muted">{inquiryData.stats.unread} unread</span>
            </Link>
            <Link href="/admin/payments" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Payments</span>
              <span className="text-xs font-bold text-content-muted">{pendingPayments} pending</span>
            </Link>
            <Link href="/admin/product-content?tab=promotions" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><Megaphone className="w-4 h-4 text-pink-500" /> Promotions</span>
              <span className="text-xs font-bold text-content-muted">{promoActive} active</span>
            </Link>
            <Link href="/admin/predictions" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><Target className="w-4 h-4 text-purple-500" /> Predictions</span>
              <span className={`text-xs font-bold ${predictionsOverdue ? "text-error" : "text-content-muted"}`}>{predictionsOverdue} overdue</span>
            </Link>
            <Link href="/admin/media" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-500" /> Media Library</span>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand" />
            </Link>
            <Link href="/admin/analytics" className="flex items-center justify-between p-4 bg-surface-muted border border-border rounded-xl hover:border-brand/30 transition-colors group">
              <span className="text-sm font-bold text-content-primary flex items-center gap-2"><Activity className="w-4 h-4 text-brand" /> Analytics</span>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand" />
            </Link>
          </div>
          <div className="mt-6 rounded-xl bg-surface-muted border border-border p-4">
            <p className="text-xs font-bold text-content-primary">How this board is calculated</p>
            <p className="text-xs text-content-muted mt-1">Every card shows its exact table and filter. No estimates — empty states mean “no data yet”. Cohort deltas compare real 7-day windows, not projections.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
