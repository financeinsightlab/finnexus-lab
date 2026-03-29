import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import React from "react"
import type { Metadata } from "next"
import UsersTableClient from "./UsersTableClient"

export const metadata: Metadata = {
  title: "Manage Users | Admin Panel",
  description: "User management and analytics for FinNexus Lab.",
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
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
        {
          email: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
      ],
    })
  }

  if (searchParams.role) {
    filters.AND.push({ role: searchParams.role })
  }

  if (searchParams.status) {
    filters.AND.push({
      subscriptionStatus: searchParams.status,
    })
  }

  const where = filters.AND.length ? filters : undefined

  // ✅ OPTIMIZED QUERY (NO HEAVY LOAD)
  const users = await prisma.user.findMany({
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

  // ✅ TOTAL COUNT
  const totalUsersCount = await prisma.user.count({
    where,
  })

  const totalPages = Math.ceil(totalUsersCount / pageSize)

  // ✅ METRICS (LIGHTWEIGHT)
  const totalUsers = totalUsersCount
  const activeUsers = await prisma.user.count({
    where: { subscriptionStatus: "ACTIVE" },
  })
  const proUsers = await prisma.user.count({
    where: { subscriptionPlan: "PRO" },
  })

  return (
    <div className="min-h-screen bg-[#0B1C2C] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">
          Admin Panel — Users
        </h1>

        {/* 📊 METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-[#1A2B3C] p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-xl font-semibold">{totalUsers}</p>
          </div>

          <div className="bg-[#1A2B3C] p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Active Users</p>
            <p className="text-xl text-green-400">{activeUsers}</p>
          </div>

          <div className="bg-[#1A2B3C] p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Pro Users</p>
            <p className="text-xl text-teal-400">{proUsers}</p>
          </div>

        </div>

        {/* 🔍 FILTERS */}
        <form className="mb-6 flex flex-wrap gap-3 relative z-50">

          <input
            type="text"
            name="search"
            placeholder="Search name or email..."
            defaultValue={searchParams.search || ""}
            className="px-4 py-2 rounded bg-white/10 border border-white/10 text-sm w-60"
          />

          <select
            name="role"
            defaultValue={searchParams.role || ""}
            className="px-4 py-2 rounded bg-[#1A2B3C] text-white border border-white/10 text-sm"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="VIEWER">VIEWER</option>
            <option value="MEMBER">MEMBER</option>
          </select>

          <select
            name="plan"
            defaultValue={searchParams.status || ""}
            className="px-4 py-2 rounded bg-[#1A2B3C] text-white border border-white/10 text-sm"
          >
            <option value="">All Plans</option>
            <option value="FREE">FREE</option>
            <option value="PRO">PRO</option>
            <option value="ELITE">ELITE</option>
            <option value="TEAM">TEAM</option>
            <option value="ENTERPRISE">ENTERPRISE</option>
          </select>

          <button className="bg-[#0D6E6E] px-4 py-2 rounded text-sm">
            Apply
          </button>

        </form>

        {/* INTERACTIVE TABLE COMPONENTS */}
        <UsersTableClient initialUsers={users} />

        {/* PAGINATION */}
        <div className="flex justify-between mt-6">

          <p className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">

            {page > 1 && (
              <a
                href={`?page=${page - 1}&search=${searchParams.search || ""}&role=${searchParams.role || ""}&status=${searchParams.status || ""}`}
                className="px-3 py-1 bg-white/10 rounded"
              >
                Prev
              </a>
            )}

            {page < totalPages && (
              <a
                href={`?page=${page + 1}&search=${searchParams.search || ""}&role=${searchParams.role || ""}&status=${searchParams.status || ""}`}
                className="px-3 py-1 bg-[#0D6E6E] rounded"
              >
                Next
              </a>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}