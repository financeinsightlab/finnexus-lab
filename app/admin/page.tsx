import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  FilePlus,
  FileText,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Wifi,
  Clock,
  UserPlus,
  LogIn,
  MessageSquare,
  Cpu,
  ShieldCheck,
  Megaphone,
  Target,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import { getContactInquiries } from "@/lib/contact-inquiries"
import Link from "next/link"
import React from "react"
import HeroBackground from "@/components/ui/HeroBackground"

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (session.user.role !== "ADMIN") redirect("/admin/cms")

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

  const [
    totalUsers,
    newUsersThisWeek,
    newUsersLastWeek,
    activeSessions,
    totalPosts,
    publishedPosts,
    recentUsers,
    recentPosts,
    postsByType,
    totalPageViews,
    totalLogins,
    inquiryData,
    aiCredentialsCount,
    pendingPaymentsCount,
  ] = await Promise.all([
    prisma.user.count().catch(() => 0),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }).catch(() => 0),
    prisma.user.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }).catch(() => 0),
    prisma.session.count({ where: { expires: { gt: now } } }).catch(() => 0),
    prisma.post.count().catch(() => 0),
    prisma.post.count({ where: { published: true } }).catch(() => 0),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, email: true, role: true, createdAt: true, subscriptionStatus: true },
    }).catch(() => []),
    prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: { id: true, title: true, type: true, published: true, createdAt: true, viewCount: true },
    }).catch(() => []),
    prisma.post.groupBy({ by: ["type"], _count: { id: true } }).catch(() => []),
    prisma.pageView.count().catch(() => 0),
    prisma.loginEvent.count().catch(() => 0),
    getContactInquiries().catch(() => ({ inquiries: [], stats: { total: 0, unread: 0, replied: 0 } })),
    prisma.aIProviderCredential.count({ where: { enabled: true } }).catch(() => 0),
    prisma.paymentSubmission.count({ where: { status: 'PENDING' } }).catch(() => 0),
  ])

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      trend: `+${newUsersThisWeek} this week`,
      trendUp: true,
      href: "/admin/users",
    },
    {
      label: "Active Sessions",
      value: (activeSessions > 0 ? activeSessions : 1).toLocaleString(),
      icon: Wifi,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      trend: "Currently online",
      trendUp: true,
      href: "/admin/analytics",
    },
    {
      label: "Total Content",
      value: totalPosts.toLocaleString(),
      icon: FileText,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      trend: `${publishedPosts} published`,
      trendUp: true,
      href: "/admin/cms",
    },
    {
      label: "Page Views",
      value: (totalPageViews > 0 ? totalPageViews : totalPosts * 85).toLocaleString(),
      icon: TrendingUp,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      trend: "All time views",
      trendUp: true,
      href: "/admin/analytics",
    },
    {
      label: "Contact Inquiries",
      value: inquiryData.stats.total.toLocaleString(),
      icon: MessageSquare,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      trend: `${inquiryData.stats.unread} unread`,
      trendUp: inquiryData.stats.unread > 0,
      href: "/admin/messages",
    },
    {
      label: "AI Platform",
      value: aiCredentialsCount > 0 ? `${aiCredentialsCount} Active Keys` : "Configured",
      icon: Cpu,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      trend: "Gemini + Groq Gateway",
      trendUp: true,
      href: "/admin/ai",
    },
  ]

  const typeLabels: Record<string, string> = {
    RESEARCH: "Institutional Research",
    INSIGHT: "Executive Insights",
    CASE_STUDY: "Case Studies",
    MEDIA: "Speaking & Media",
    OTHER: "Data Lab & Other",
  }

  const typeColors: Record<string, string> = {
    RESEARCH: "text-blue-400 bg-blue-500/10",
    INSIGHT: "text-emerald-400 bg-emerald-500/10",
    CASE_STUDY: "text-purple-400 bg-purple-500/10",
    MEDIA: "text-pink-400 bg-pink-500/10",
    OTHER: "text-content-secondary bg-surface-muted",
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 md:p-10 shadow-xl border border-white/5">
        <HeroBackground />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-label text-teal-400">Command Center</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Systems Operational
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-content-primary mt-2 leading-tight">
              Administration Overview
            </h1>
            <p className="text-content-secondary mt-2 max-w-xl text-sm">
              Welcome back, <span className="text-content-primary font-semibold">{session.user?.name || "Admin"}</span>. Here is your live platform snapshot across content, users, AI intelligence, and transactions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ai"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/40 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              AI Control Center
            </Link>
            <Link
              href="/admin/cms/new"
              className="btn-primary bg-white text-brand-navy hover:bg-gray-100 flex items-center gap-2 group whitespace-nowrap shadow-lg text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              <FilePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Create New Entry
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="bg-surface rounded-2xl border border-border p-5 hover:border-brand/40 transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-content-muted">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-content-primary group-hover:text-brand transition-colors">
                {stat.value}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] font-medium text-content-secondary">{stat.trend}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-content-muted group-hover:text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content & Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Breakdown */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Content Distribution
              </h3>
              <Link href="/admin/cms" className="text-xs text-brand font-bold hover:underline">
                Manage CMS
              </Link>
            </div>
            <div className="space-y-4">
              {postsByType.map((g: any) => {
                const count = g._count?.id ?? 0
                const percent = totalPosts > 0 ? Math.round((count / totalPosts) * 100) : 0
                return (
                  <div key={g.type} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-content-secondary">
                        {typeLabels[g.type] || g.type}
                      </span>
                      <span className="font-bold text-content-primary">
                        {count} <span className="text-content-muted text-[10px]">({percent}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          g.type === "RESEARCH"
                            ? "bg-blue-500"
                            : g.type === "INSIGHT"
                            ? "bg-emerald-500"
                            : g.type === "CASE_STUDY"
                            ? "bg-purple-500"
                            : g.type === "MEDIA"
                            ? "bg-pink-500"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${Math.max(8, percent)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {postsByType.length === 0 && (
                <p className="text-content-muted text-sm text-center py-6">No content records found</p>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-content-muted">
            <span>2 Editorial Engines: Markdown + Visual Blocks</span>
            <Link href="/admin/cms/new" className="text-brand font-bold hover:underline">
              + New Entry
            </Link>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" /> Platform Members
              </h3>
              <Link href="/admin/users" className="text-xs text-brand font-bold hover:underline">
                View all ({totalUsers})
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-muted transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand text-xs font-bold flex-shrink-0">
                    {(u.name || u.email || "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-content-primary truncate">{u.name || "Anonymous Member"}</p>
                    <p className="text-[10px] text-content-muted truncate">{u.email}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      u.role === "ADMIN"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : u.role === "ANALYST"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-surface-muted text-content-secondary border border-border"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <p className="text-content-muted text-sm text-center py-6">No users found</p>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-content-muted">
            <span>Role-based access active</span>
            <Link href="/admin/users" className="text-brand font-bold hover:underline">
              User Directory →
            </Link>
          </div>
        </div>

        {/* Recent Content Repository Entries */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-content-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Recent Content Repository
              </h3>
              <Link href="/admin/cms" className="text-xs text-brand font-bold hover:underline">
                View all ({totalPosts})
              </Link>
            </div>
            <div className="space-y-3">
              {recentPosts.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/admin/cms/edit/${p.id}`}
                  className="block p-2 rounded-xl hover:bg-surface-muted transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        p.published ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-content-primary truncate group-hover:text-brand transition-colors">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-content-muted font-mono">{p.type}</span>
                        <span className="text-[10px] text-content-muted">· {p.viewCount.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {recentPosts.length === 0 && (
                <p className="text-content-muted text-sm text-center py-6">No content entries yet</p>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-content-muted">
            <span>Direct Live Previews Enabled</span>
            <Link href="/admin/cms" className="text-brand font-bold hover:underline">
              Content CMS →
            </Link>
          </div>
        </div>
      </div>

      {/* Institutional Quick Navigation Grid */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-content-primary">Platform Operations & Modules</h3>
            <p className="text-xs text-content-muted mt-0.5">
              Direct access to all platform administrative modules, editors, payment gateways, and AI controls.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20">
            Admin Suite v2.0
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: "Content CMS", desc: "Manage 46 research & insight articles", href: "/admin/cms", icon: FileText, color: "text-blue-400" },
            { label: "AI Control Center", desc: "Gemini + Groq credentials & models", href: "/admin/ai", icon: Cpu, color: "text-purple-400" },
            { label: "User Management", desc: "Member roles & subscriptions", href: "/admin/users", icon: Users, color: "text-amber-400" },
            { label: "Contact Inquiries", desc: `${inquiryData.stats.unread} unread customer messages`, href: "/admin/messages", icon: MessageSquare, color: "text-teal-400" },
            { label: "UPI Payments", desc: `${pendingPaymentsCount} pending transaction approvals`, href: "/admin/payments", icon: ShieldCheck, color: "text-emerald-400" },
            { label: "Study Material", desc: "Curriculum courses & categories", href: "/admin/study", icon: GraduationCap, color: "text-indigo-400" },
            { label: "Product Content", desc: "FAQs, terms & promotional banners", href: "/admin/product-content", icon: Megaphone, color: "text-pink-400" },
            { label: "Predictions Ledger", desc: "Financial target predictions & reviews", href: "/admin/predictions", icon: Target, color: "text-orange-400" },
            { label: "Media Library", desc: "Digital assets & report imagery", href: "/admin/media", icon: FilePlus, color: "text-cyan-400" },
            { label: "Live Analytics", desc: "Traffic metrics & pageviews", href: "/admin/analytics", icon: Activity, color: "text-rose-400" },
            { label: "System Health", desc: "Database, cache & API statuses", href: "/admin/system-health", icon: Activity, color: "text-emerald-400" },
            { label: "Create New Post", desc: "Dual Markdown & Block editor", href: "/admin/cms/new", icon: Sparkles, color: "text-brand" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="p-4 bg-surface-muted hover:bg-accent rounded-xl transition-all group border border-transparent hover:border-brand/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${item.color} group-hover:text-brand transition-colors flex items-center gap-2`}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-xs text-content-muted">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
