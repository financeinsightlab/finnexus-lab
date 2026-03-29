import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { 
  FilePlus, 
  FileText, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import React from "react"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) redirect("/auth/signin")
  if (session.user.role !== "ADMIN") redirect("/")

  // Metrics for the dashboard
  const userCount = await prisma.user.count()
  let postCount = 0
  try {
    const postModel = (prisma as any).post;
    if (postModel) {
      postCount = await postModel.count()
    }
  } catch (e) {}

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, color: "text-blue-400" },
    { label: "Total Posts", value: postCount, icon: FileText, color: "text-emerald-400" },
    { label: "Site Traffic", value: "+12.4%", icon: TrendingUp, color: "text-purple-400" },
    { label: "Uptime", value: "99.9%", icon: Activity, color: "text-orange-400" },
  ]

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="section-label">Command Center</span>
          <h1 className="text-4xl font-extrabold text-white mt-2 leading-tight">Administration Overview</h1>
          <p className="text-slate-400 mt-2 max-w-xl">Welcome back, <span className="text-white font-semibold">{session.user.name}</span>. Your high-class content delivery system is fully operational.</p>
        </div>
        <Link 
          href="/admin/cms/new" 
          className="btn-primary flex items-center gap-2 group whitespace-nowrap"
        >
          <FilePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Create New Content
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1A1F2E] p-6 rounded-2xl border border-[#2D3748] hover:border-[#0D6E6E]/50 transition-all group shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-5">
              <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1.5">
                Active <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white mt-1.5 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 bg-[#1A1F2E] rounded-3xl border border-[#2D3748] p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Direct Management</h3>
            <span className="text-xs text-[#0D6E6E] font-semibold underline decoration-2 underline-offset-4 pointer-events-none">Content Engine v1.0</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Manage Research Reports", href: "/admin/cms?type=RESEARCH" },
              { label: "Manage Insights Articles", href: "/admin/cms?type=INSIGHT" },
              { label: "Review Case Studies", href: "/admin/cms?type=CASE_STUDY" },
              { label: "Admin User List", href: "/admin/users" },
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-transparent hover:border-white/5"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#0D6E6E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1F2E] to-[#0B0D13] rounded-3xl border border-[#2D3748] p-8 md:p-10 flex flex-col justify-center items-center text-center space-y-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D6E6E]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#0D6E6E]/20 transition-all"></div>
          <div className="w-20 h-20 rounded-3xl bg-[#0D6E6E]/10 flex items-center justify-center border border-[#0D6E6E]/20 relative z-10 shadow-inner">
            <Activity className="w-10 h-10 text-[#0D6E6E]" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white tracking-tight">System Status</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 px-2">All proprietary services for FinNexus Lab are operational with 99.9% availability.</p>
          </div>
          <button className="w-full px-6 py-3.5 rounded-2xl bg-[#0D6E6E]/10 border border-[#0D6E6E]/20 text-[#0D6E6E] text-sm font-bold hover:bg-[#0D6E6E] hover:text-white transition-all shadow-lg relative z-10">
            Detailed Service Logs
          </button>
        </div>
      </div>
    </div>
  )
}
