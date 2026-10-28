"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useModalAccessibility } from "@/components/ui/useModalAccessibility"

import {
  BarChart3,
  Users,
  Settings,
  FileText,
  LayoutDashboard,
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Menu,
  X,
  Target,
  Lock,
  Image as ImageIcon,
  MessageSquare,
  CreditCard,
  Megaphone,
  BadgePercent,
  GraduationCap,
  Search,
  type LucideIcon,
} from "lucide-react"

interface CollapsibleSidebarProps {
  userName?: string
  userRole?: string
  userInitial?: string
}

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  adminOnly?: boolean
  exact?: boolean
  tabMatch?: string // e.g. "promotions" when href includes ?tab=promotions
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Operations Centre", href: "/admin", icon: LayoutDashboard, adminOnly: true, exact: true },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Content Library", href: "/admin/cms", icon: FileText },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "Learning",
    items: [
      { label: "Study Material", href: "/admin/study", icon: GraduationCap },
    ],
  },
  {
    label: "Product",
    items: [
      { label: "Product Content", href: "/admin/product-content", icon: Megaphone },
      { label: "Promotions", href: "/admin/product-content?tab=promotions", icon: BadgePercent, tabMatch: "promotions" },
      { label: "Predictions", href: "/admin/predictions", icon: Target },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Enquiries", href: "/admin/messages", icon: MessageSquare, adminOnly: true },
      { label: "Users", href: "/admin/users", icon: Users, adminOnly: true },
      { label: "UPI Payments", href: "/admin/payments", icon: CreditCard, adminOnly: true },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3, adminOnly: true },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
    ],
  },
]

function isItemActive(item: NavItem, pathname: string | null, searchParams: URLSearchParams | null): boolean {
  if (!pathname) return false
  const [baseHref] = item.href.split("?")
  // Promotions is a tab of product-content — match via search param
  if (item.tabMatch) {
    const tab = searchParams?.get("tab")
    return pathname === "/admin/product-content" && tab === item.tabMatch
  }
  // Product Content default should NOT be active when promotions tab is active
  if (baseHref === "/admin/product-content" && !item.tabMatch) {
    if (pathname !== "/admin/product-content") return false
    const tab = searchParams?.get("tab")
    return tab !== "promotions"
  }
  if (item.exact) return pathname === baseHref
  // CMS and others: prefix match for nested routes (new, edit/[id], categories)
  return pathname === baseHref || pathname.startsWith(baseHref + "/")
}

export default function CollapsibleSidebar({
  userName = "Admin",
  userRole = "ADMIN",
  userInitial = "A"
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [navFilter, setNavFilter] = useState("")

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const mobileSidebarRef = useRef<HTMLElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null)

  useModalAccessibility(isMobileOpen, mobileSidebarRef, () => setIsMobileOpen(false), {
    initialFocusRef: mobileCloseButtonRef,
    restoreFocusRef: mobileToggleRef,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("admin-sidebar-collapsed")
      if (savedState !== null) {
        setIsCollapsed(savedState === "true")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin-sidebar-collapsed", isCollapsed.toString())
    }
  }, [isCollapsed])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sidebar-toggle", {
          detail: { isCollapsed: newState }
        })
      )
    }
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const filteredGroups = useMemo(() => {
    const q = navFilter.trim().toLowerCase()
    if (!q) return NAV_GROUPS
    return NAV_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((it) => it.label.toLowerCase().includes(q) || g.label.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0)
  }, [navFilter])

  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  const renderNavLink = (item: NavItem, opts: { collapsed: boolean; onNavigate?: () => void }) => {
    const Icon = item.icon
    const active = isItemActive(item, pathname, searchParams as unknown as URLSearchParams)
    const isLocked = item.adminOnly && userRole !== "ADMIN"

    if (isLocked) {
      return (
        <div
          key={item.href}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative overflow-hidden group opacity-40 cursor-not-allowed bg-transparent ${opts.collapsed ? 'justify-center' : ''}`}
          title={opts.collapsed ? `${item.label} (Locked)` : "ADMIN only"}
          aria-disabled
        >
          <Icon className="w-[18px] h-5 opacity-50 flex-shrink-0 text-content-muted" />
          <span className={`text-[13px] font-medium transition-all duration-300 text-content-muted ${opts.collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100 truncate'}`}>
            {item.label}
          </span>
          {!opts.collapsed && (
            <Lock className="ml-auto w-3.5 h-3.5 text-content-muted flex-shrink-0" />
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={opts.onNavigate}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden border text-[13px] font-medium ${opts.collapsed ? 'justify-center' : ''} ${active ? 'bg-brand/10 border-brand/20 text-brand shadow-sm' : 'bg-transparent border-transparent text-content-muted hover:text-content-primary hover:bg-accent hover:border-border/40'}`}
        title={opts.collapsed ? item.label : undefined}
      >
        {active && <div className="absolute inset-y-2 left-0 w-1 bg-primary rounded-full" aria-hidden />}
        {!active && <div className="absolute inset-y-2 left-0 w-1 bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200" aria-hidden />}
        <Icon className={`w-[18px] h-5 flex-shrink-0 ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
        <span className={`transition-all duration-300 ${opts.collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100 truncate'}`}>
          {item.label}
        </span>
        {!opts.collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden />}
        {!opts.collapsed && !active && <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-20 group-hover:opacity-60 transition-opacity flex-shrink-0" />}
      </Link>
    )
  }

  return (
    <>
      <button
        ref={mobileToggleRef}
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-[68px] left-4 z-50 p-2.5 rounded-xl bg-surface border border-border text-content-primary shadow-md"
        aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isMobileOpen}
        aria-controls="admin-mobile-navigation"
        aria-haspopup="dialog"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside
        className={`fixed top-16 bottom-0 left-0 ${sidebarWidth} bg-surface border-r border-border-subtle z-40 hidden lg:flex lg:flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
        aria-label="Admin navigation"
      >
        <div className="ui-scroll-region flex h-full min-h-0 flex-col overflow-hidden">
          <div className="px-4 py-5 flex items-center justify-between gap-2 shrink-0">
            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-1 whitespace-nowrap">
                Admin Portal
              </h2>
              <div className="h-px w-8 bg-primary opacity-30"></div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-accent transition-colors shrink-0"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4 text-content-muted" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-content-muted" />
              )}
            </button>
          </div>

          {!isCollapsed && (
            <div className="px-4 pb-3 shrink-0">
              <label htmlFor="admin-nav-filter" className="sr-only">Filter navigation</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
                <input
                  id="admin-nav-filter"
                  type="search"
                  value={navFilter}
                  onChange={(e) => setNavFilter(e.target.value)}
                  placeholder="Filter navigation…"
                  className="w-full pl-8 pr-3 py-2 bg-surface-muted border border-border rounded-xl text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand/40 focus:bg-accent transition-all"
                />
              </div>
            </div>
          )}

          <nav className="ui-scroll-region min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-2 space-y-5" data-lenis-prevent aria-label="Admin navigation">
            {filteredGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-content-muted/70">
                    {group.label}
                  </p>
                )}
                {isCollapsed && <div className="mx-2 h-px bg-border-subtle" aria-hidden />}
                <div className="space-y-1">
                  {group.items.map((item) => renderNavLink(item, { collapsed: isCollapsed }))}
                </div>
              </div>
            ))}
            {filteredGroups.length === 0 && !isCollapsed && (
              <p className="px-3 py-4 text-xs text-content-muted text-center border border-dashed border-border rounded-xl">
                No sections match “{navFilter}”.
              </p>
            )}
          </nav>

          <div className="p-3 border-t border-border-subtle shrink-0">
            <div className={`flex items-center gap-3 px-3 py-3 mb-2 bg-surface-muted rounded-xl border border-border-subtle ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow flex-shrink-0">
                {userInitial}
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                <p className="text-sm font-semibold text-content-primary truncate">{userName}</p>
                <p className="text-[10px] text-content-muted truncate uppercase tracking-tight">{userRole}</p>
              </div>
            </div>
            <Link
              href="/"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-content-muted hover:text-error transition-all font-medium text-sm group ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? "Back to Site" : undefined}
            >
              <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform flex-shrink-0 ${isCollapsed ? 'm-0' : ''}`} />
              <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                Back to Site
              </span>
            </Link>
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-mobile-navigation"
        ref={mobileSidebarRef}
        className={`ui-scroll-region lg:hidden fixed top-16 bottom-0 left-0 w-72 max-h-[calc(100dvh-4rem)] overflow-hidden bg-white dark:bg-[#1A1F2E] border-r border-gray-200 dark:border-[#2D3748] z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Admin navigation"
        aria-labelledby="admin-mobile-navigation-title"
        role={isMobileOpen ? 'dialog' : undefined}
        aria-modal={isMobileOpen ? true : undefined}
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen ? true as unknown as undefined : undefined}
        tabIndex={-1}
        data-lenis-prevent
      >
        <div className="ui-scroll-region flex h-full min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 dark:border-[#2D3748]">
            <div>
              <h2 id="admin-mobile-navigation-title" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D6E6E] mb-1">
                Admin Portal
              </h2>
              <div className="h-px w-8 bg-[#0D6E6E] opacity-30"></div>
            </div>
            <button
              ref={mobileCloseButtonRef}
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Close admin navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-3 shrink-0">
            <label htmlFor="admin-nav-filter-mobile" className="sr-only">Filter navigation</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
              <input
                id="admin-nav-filter-mobile"
                type="search"
                value={navFilter}
                onChange={(e) => setNavFilter(e.target.value)}
                placeholder="Filter navigation…"
                className="w-full pl-8 pr-3 py-2 bg-surface-muted border border-border rounded-xl text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand/40"
              />
            </div>
          </div>

          <nav className="ui-scroll-region min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-2 space-y-5" data-lenis-prevent aria-label="Admin navigation links">
            {filteredGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-content-muted/70">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => renderNavLink(item, { collapsed: false, onNavigate: toggleMobileSidebar }))}
                </div>
              </div>
            ))}
          </nav>

          <div className="ui-scroll-region min-h-0 max-h-[min(38dvh,18rem)] shrink-0 overflow-y-auto overscroll-y-contain border-t border-gray-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-[#2D3748]" data-lenis-prevent>
            <div className="flex items-center gap-3 px-4 py-4 mb-2 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-[#0D6E6E] flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {userInitial}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-content-primary truncate">{userName}</p>
                <p className="text-[10px] text-content-muted truncate uppercase tracking-tight">{userRole}</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-content-muted hover:text-error transition-all font-medium text-sm group"
              onClick={toggleMobileSidebar}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .sidebar-expanded { width: 16rem; }
        .sidebar-collapsed { width: 4rem; }
        .content-margin-expanded { margin-left: 16rem; }
        .content-margin-collapsed { margin-left: 4rem; }
      `}</style>
    </>
  )
}
