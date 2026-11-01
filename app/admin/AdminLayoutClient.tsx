"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const isCmsEditor = pathname === "/admin/cms/new" || /^\/admin\/cms\/edit\/[^/]+$/.test(pathname)

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
    <div className="admin-theme flex min-h-screen bg-background text-content-primary font-sans mt-16">
      <CollapsibleSidebar 
        userName={userName}
        userRole={userRole}
        userInitial={userInitial}
      />

      {/* Main Content Area - Dynamic margin based on sidebar state */}
      <main className={`flex-1 min-w-0 ${contentMarginClass} ${isCmsEditor ? 'p-0 overflow-hidden' : 'p-6 md:p-10'} transition-all duration-300`}>
        <div className={isCmsEditor ? 'w-full h-full min-w-0' : 'max-w-6xl mx-auto anim-fade-up'}>
          {children}
        </div>
      </main>
    </div>
  )
}