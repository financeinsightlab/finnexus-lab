'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Wrench, 
  GraduationCap, 
  Target,
  Radar,
  Mic,
  BriefcaseBusiness,
  Building2,
  FileText,
  BadgeIndianRupee,
  Activity,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const sidebarGroups = [
  {
    title: 'Ecosystem',
    links: [
      { label: 'Trackers', href: '/tracker', icon: BarChart3 },
      { label: 'Tools', href: '/tools', icon: Wrench },
      { label: 'Radar', href: '/radar', icon: Radar },
      { label: 'Predictions', href: '/predictions', icon: Target },
      { label: 'Data Freshness', href: '/data-freshness', icon: Activity },
    ]
  },
  {
    title: 'Learn',
    links: [
      { label: 'Study', href: '/study', icon: GraduationCap },
      { label: 'Case Studies', href: '/case-studies', icon: BriefcaseBusiness },
      { label: 'Podcast', href: '/podcast', icon: Mic },
    ]
  },
  {
    title: 'Corporate',
    links: [
      { label: 'Enterprise', href: '/enterprise', icon: Building2 },
      { label: 'Services', href: '/services', icon: LayoutDashboard },
      { label: 'Pricing', href: '/pricing', icon: BadgeIndianRupee },
      { label: 'Resume', href: '/resume', icon: FileText },
    ]
  }
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 bg-white dark:bg-[#0a1120] border-r border-slate-200 dark:border-slate-800/50 z-40 transition-all duration-300"
    >
      <div className="flex-1 min-h-0 overflow-y-auto py-6 px-3 custom-scrollbar">
        
        {/* Toggle Button */}
        <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} mb-6`}>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {sidebarGroups.map((group, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                {group.title}
              </motion.div>
            )}
            
            <nav className="space-y-1">
              {group.links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    title={collapsed ? link.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active 
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <link.icon 
                      size={20} 
                      className={`shrink-0 ${active ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'}`} 
                    />
                    
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium text-sm whitespace-nowrap overflow-hidden"
                        >
                          {link.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {active && !collapsed && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
