'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Compass,
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { NAV_CLUSTERS, type NavCluster } from '@/lib/navigation';

/** Map each navigation cluster to a lucide icon for the sidebar rail. */
const CLUSTER_ICONS: Record<string, LucideIcon> = {
  research: BarChart3,
  intelligence: Compass,
  learn: GraduationCap,
  portfolio: BriefcaseBusiness,
  company: Building2,
};

export default function DashboardSidebar() {
  const { status } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Keep session-dependent navigation out of the server-rendered public shell.
  if (status !== 'authenticated') return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const clusterActive = (cluster: NavCluster) =>
    isActive(cluster.href) || cluster.items.some((item) => isActive(item.href));

  const toggle = (id: string) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 272 }}
      className="hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 bg-white dark:bg-[#0a1120] border-r border-slate-200 dark:border-slate-800/50 z-40 transition-all duration-300"
    >
      <div className="flex-1 min-h-0 overflow-y-auto py-6 px-3 custom-scrollbar">

        {/* Dashboard (always first) */}
        <div className="mb-4">
          <Link
            href="/dashboard"
            title={collapsed ? 'Dashboard' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive('/dashboard')
                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
          >
            <LayoutDashboard size={20} className={`shrink-0 ${isActive('/dashboard') ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'}`} />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm whitespace-nowrap overflow-hidden"
                >
                  Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Toggle Button */}
        <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} mb-6`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Clustered groups */}
        {NAV_CLUSTERS.map((cluster) => {
          const Icon = CLUSTER_ICONS[cluster.id] ?? BarChart3;
          const active = clusterActive(cluster);
          const open = expanded === cluster.id;
          const childActive = cluster.items.some((item) => isActive(item.href));

          return (
            <div key={cluster.id} className="mb-2 last:mb-0">
              {collapsed ? (
                /* Collapsed: icon links straight to the cluster landing page */
                <Link
                  href={cluster.href}
                  title={cluster.label}
                  className={`flex items-center justify-center px-3 py-2.5 rounded-xl transition-all duration-200 ${active
                      ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                >
                  <Icon size={20} className={active ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400'} />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggle(cluster.id)}
                    aria-expanded={open}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                  >
                    <Icon size={20} className={`shrink-0 ${active ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'}`} />
                    <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-left flex-1">
                      {cluster.label}
                    </span>
                    {childActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                    <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4 mt-1 pl-3 border-l border-slate-200 dark:border-slate-800/60 space-y-0.5"
                      >
                        {cluster.items.map((item) => {
                          const itemActive = isActive(item.href);
                          return (
                            <Link
                              key={`${cluster.id}-${item.href}`}
                              href={item.href}
                              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${itemActive
                                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium'
                                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                              <span className="text-sm leading-none">{item.icon}</span>
                              <span className="truncate">{item.label}</span>
                              {itemActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
                            </Link>
                          );
                        })}
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}
