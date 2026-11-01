import Link from 'next/link';

interface DashboardSubNavProps {
  currentTab?: 'overview' | 'saved' | 'learning' | 'tools' | 'certificates' | 'account' | 'billing';
}

export default function DashboardSubNav({ currentTab = 'overview' }: DashboardSubNavProps) {
  const tabs = [
    { id: 'overview', label: 'Workspace Overview', href: '/dashboard', icon: '📊' },
    { id: 'learning', label: 'Learning Progress', href: '/study', icon: '🎓' },
    { id: 'saved', label: 'Saved Research', href: '/research', icon: '📑' },
    { id: 'tools', label: 'Financial Models', href: '/tools', icon: '🧮' },
    { id: 'certificates', label: 'Certificates', href: '/certificates', icon: '🏅' },
    { id: 'account', label: 'Account Profile', href: '/account', icon: '👤' },
    { id: 'billing', label: 'Plan & Billing', href: '/pricing', icon: '💳' },
  ];

  return (
    <div className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-16 z-30 mb-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Dashboard Workspace Sections">
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-brand/10 text-brand border border-brand/20 shadow-xs'
                    : 'text-content-muted hover:text-content-primary hover:bg-surface-muted/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

