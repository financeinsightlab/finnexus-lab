"use client"

import { useState, useEffect } from "react"
import CollapsibleSidebar from "@/components/admin/CollapsibleSidebar"

interface AdminLayoutClientProps {
  children: React.ReactNode
  userName?: string
  userRole?: string
  userInitial?: string
}

export default function AdminLayoutClient({
  children,
  userName = "Admin",
  userRole = "ADMIN",
  userInitial = "A"
}: AdminLayoutClientProps) {
  // Initialize state to false (same on server and client to avoid hydration mismatch)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Load state from localStorage after hydration (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("admin-sidebar-collapsed")
      if (savedState !== null) {
        setIsSidebarCollapsed(savedState === "true")
      }
    }
  }, [])

  // Listen for sidebar state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        const savedState = localStorage.getItem("admin-sidebar-collapsed")
        if (savedState !== null) {
          setIsSidebarCollapsed(savedState === "true")
        }
      }

      // Listen for storage changes (from other tabs/windows)
      window.addEventListener("storage", handleStorageChange)

      // Custom event for sidebar toggle within same tab
      const handleSidebarToggle = (event: CustomEvent) => {
        setIsSidebarCollapsed(event.detail.isCollapsed)
      }
      
      window.addEventListener("sidebar-toggle", handleSidebarToggle as EventListener)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        window.removeEventListener("sidebar-toggle", handleSidebarToggle as EventListener)
      }
    }
  }, [])

  // Dynamic margin classes
  const contentMarginClass = isSidebarCollapsed 
    ? "lg:ml-16"  // 64px when collapsed
    : "lg:ml-64"  // 256px when expanded

  return (
    <div className="mt-16 flex min-h-[calc(100dvh-4rem)] min-w-0 bg-gray-50 font-sans text-gray-800 dark:bg-[#0F1117] dark:text-slate-300">
      <CollapsibleSidebar 
        userName={userName}
        userRole={userRole}
        userInitial={userInitial}
      />

      {/* Main Content Area - Dynamic margin based on sidebar state */}
      <main className={`min-w-0 flex-1 ${contentMarginClass} p-6 md:p-10 transition-all duration-300`}>
        <div className="content-page anim-fade-up">
          {children}
        </div>
      </main>
    </div>
  )
}