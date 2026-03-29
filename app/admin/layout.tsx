import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ArrowLeft
} from "lucide-react"
import React from "react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect("/auth/signin")
  if (session.user.role !== "ADMIN") redirect("/")

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Content CMS", href: "/admin/cms", icon: FileText },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-[#0F1117] text-slate-300 font-sans mt-16">
      {/* Sidebar - Starts below the fixed Global Navbar (64px / top-16) */}
      <aside className="fixed top-16 bottom-0 left-0 w-64 bg-[#1A1F2E] border-r border-[#2D3748] z-40 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Internal Title (Section Label Style) */}
          <div className="px-6 py-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D6E6E] mb-1">
              Admin Portal
            </h2>
            <div className="h-px w-8 bg-[#0D6E6E] opacity-30"></div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 hover:text-white group relative overflow-hidden"
              >
                <div className="absolute inset-y-2 left-0 w-1 bg-[#0D6E6E] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200"></div>
                <item.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-medium">{item.label}</span>
                <ChevronRight className="ml-auto w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* User Profile / Exit Control */}
          <div className="p-4 border-t border-[#2D3748]">
            <div className="flex items-center gap-3 px-4 py-4 mb-2 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-[#0D6E6E] flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {session?.user?.name?.[0] || "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{session?.user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate uppercase tracking-tight">{session?.user?.role}</p>
              </div>
            </div>
            
            <Link 
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all font-medium text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Aligned to Sidebar on Desktop */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10">
        <div className="max-w-6xl mx-auto anim-fade-up">
          {children}
        </div>
      </main>
    </div>
  )
}
