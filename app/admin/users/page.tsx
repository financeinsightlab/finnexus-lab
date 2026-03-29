import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import React from "react"
import type { Metadata } from "next"
import UsersTableClient from "./UsersTableClient"
import { Users as UsersIcon, ShieldCheck, Zap, Search, ChevronLeft, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Users | Admin Panel",
  description: "User management and analytics for FinNexus Lab.",
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    role?: string
    status?: string
    page?: string
  }
}) {
  const session = await auth()

  if (!session?.user) redirect("/auth/signin")
  if (session.user.role !== "ADMIN") redirect("/")

  // ✅ PAGINATION
  const page = Number(searchParams.page || 1)
  const pageSize = 10
  const skip = (page - 1) * pageSize

  // ✅ FILTERS
  const filters: any = { AND: [] }

  if (searchParams.search) {
    filters.AND.push({
      OR: [
        { email: { contains: searchParams.search, mode: "insensitive" } },
        { name: { contains: searchParams.search, mode: "insensitive" } },
      ],
    })
  }

  if (searchParams.role) {
    filters.AND.push({ role: searchParams.role })
  }

  const where = filters.AND.length ? filters : undefined

  // Fetch data with error handling for connection issues
  let users: any[] = []
  let totalUsersCount = 0
  let activeUsers = 0
  let proUsers = 0

  try {
    users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      include: {
        _count: {
          select: {
            accounts: true,
            sessions: true,
            savedArticles: true,
          },
        },
      },
    })

    totalUsersCount = await prisma.user.count({ where })
    
    // Metrics
    activeUsers = await prisma.user.count({
      where: { subscriptionStatus: "ACTIVE" },
    })
    proUsers = await prisma.user.count({
      where: { subscriptionPlan: "PRO" },
    })
  } catch (error) {
    console.error("Database connection error in AdminUsersPage:", error)
    // We'll proceed with empty values to avoid a complete crash, 
    // showing the user a more graceful (though limited) interface.
  }

  const totalPages = Math.ceil(totalUsersCount / pageSize)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="section-label">Access Control</span>
          <h1 className="text-3xl font-extrabold text-white mt-2">User Directory</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md">Oversee platform membership, subscription tiers, and administrative privileges.</p>
        </div>
      </div>

      {/* 📊 METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Membership", value: totalUsersCount, icon: UsersIcon, color: "text-blue-400" },
          { label: "Active Sessions", value: activeUsers, icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Tier 1 (Pro)", value: proUsers, icon: Zap, color: "text-amber-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1A1F2E] p-6 rounded-3xl border border-[#2D3748] shadow-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.label}</p>
            </div>
            <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 🔍 SEARCH & FILTERS */}
      <div className="bg-[#1A1F2E] p-6 rounded-3xl border border-[#2D3748] shadow-2xl">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#0D6E6E] transition-colors" />
            <input
              type="text"
              name="search"
              placeholder="Filter by name or email identity..."
              defaultValue={searchParams.search || ""}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-[#0D6E6E]/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
            />
          </div>

          <select
            name="role"
            defaultValue={searchParams.role || ""}
            className="appearance-none bg-white/5 border border-white/10 rounded-2xl text-sm px-5 py-3 text-slate-300 outline-none focus:border-[#0D6E6E]/50 focus:bg-white/10 transition-all cursor-pointer"
          >
            <option value="" className="bg-[#1A1F2E]">All Authority Levels</option>
            <option value="ADMIN" className="bg-[#1A1F2E]">ADMIN</option>
            <option value="VIEWER" className="bg-[#1A1F2E]">VIEWER</option>
            <option value="MEMBER" className="bg-[#1A1F2E]">MEMBER</option>
          </select>

          <button className="btn-primary flex items-center justify-center gap-2">
            Confirm Filter
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-[#1A1F2E] rounded-3xl border border-[#2D3748] overflow-hidden shadow-2xl">
        <UsersTableClient initialUsers={users} />
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Showing <span className="text-white">{(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalUsersCount)}</span> of <span className="text-white">{totalUsersCount}</span> Identities
        </p>

        <div className="flex items-center gap-2">
          {page > 1 && (
            <a
              href={`?page=${page - 1}&search=${searchParams.search || ""}&role=${searchParams.role || ""}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </a>
          )}

          <div className="flex items-center gap-1 px-4 py-2 bg-[#0D6E6E]/10 rounded-xl border border-[#0D6E6E]/20">
             <span className="text-xs font-bold text-[#0D6E6E]">PAGE {page}</span>
          </div>

          {page < totalPages && (
            <a
              href={`?page=${page + 1}&search=${searchParams.search || ""}&role=${searchParams.role || ""}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}