'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import GlobalSearch from '@/components/layout/GlobalSearch';
import LocaleSwitcher from '@/components/i18n/LocaleSwitcher';
import { lockBodyScroll } from '@/components/ui/bodyScrollLock';
import { useSession, signOut } from 'next-auth/react';
import { NAV_CLUSTERS, NAV_CTA, type NavCluster } from '@/lib/navigation';

/* ─────────────────────── ICONS ─────────────────────── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─────────────────────── THEME TOGGLE ─────────────────────── */

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-content-secondary hover:text-content-primary hover:bg-accent transition-all duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

/* ─────────────────────── LOGO ─────────────────────── */

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center group shrink-0">
      <span className="text-base sm:text-lg font-bold text-content-primary group-hover:text-brand transition-colors duration-200">
        Kunwar<span className="text-brand">Analytics</span>
      </span>
    </Link>
  );
}

/* ─────────────────────── MAIN NAVBAR ─────────────────────── */

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const wasMobileOpenRef = useRef(false);
  const [openCluster, setOpenCluster] = useState<string | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchOpenRef = useRef(searchOpen);
  searchOpenRef.current = searchOpen;
  const { data: session } = useSession();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const clusterActive = (cluster: NavCluster) =>
    isActive(cluster.href) || cluster.items.some((item) => isActive(item.href));

  /* Ctrl+K / Cmd+K opens search; close the drawer first on mobile. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!searchOpen && mobileOpen) {
          searchButtonRef.current?.focus();
          setMobileOpen(false);
        }
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, searchOpen]);

  /* Close user-dropdown on outside click */
  useEffect(() => {
    if (!userOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-user-dropdown]')) setUserOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [userOpen]);

  /* Lock body scroll while the mobile drawer is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    return lockBodyScroll();
  }, [mobileOpen]);

  /* Give the mobile drawer modal keyboard behavior and restore focus on close. */
  useEffect(() => {
    if (!mobileOpen) {
      if (wasMobileOpenRef.current) {
        wasMobileOpenRef.current = false;
        requestAnimationFrame(() => {
          if (!searchOpenRef.current) mobileMenuButtonRef.current?.focus();
        });
      }
      return;
    }

    wasMobileOpenRef.current = true;
    const drawer = mobileDrawerRef.current;
    const focusTimer = window.setTimeout(() => {
      drawer?.querySelector<HTMLElement>('[data-drawer-first]')?.focus();
    }, 0);
    if (!drawer) return () => window.clearTimeout(focusTimer);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter((element) => element.offsetParent !== null);
      if (!focusable.length) {
        event.preventDefault();
        drawer.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  /* Close menus on route change */
  useEffect(() => { setMobileOpen(false); setOpenCluster(null); }, [pathname]);

  const clusterButtonClass = (cluster: NavCluster) =>
    `relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap group ${clusterActive(cluster)
      ? 'text-brand bg-brand-muted'
      : 'text-content-secondary hover:text-content-primary hover:bg-accent'
    }`;

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium"
      >
        Skip to content
      </a>

      <header className="fixed top-0 inset-x-0 z-50 h-16 glass-cinema border-b border-border-subtle shadow-depth-1">
        <nav className="h-full max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">

          {/* ── LOGO ── */}
          <Logo />

          {/* ── DESKTOP NAV — clustered hover dropdowns ── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className="relative"
                onMouseEnter={() => setOpenCluster(cluster.id)}
                onMouseLeave={() => setOpenCluster((cur) => (cur === cluster.id ? null : cur))}
              >
                <Link
                  href={cluster.href}
                  onFocus={() => setOpenCluster(cluster.id)}
                  aria-expanded={openCluster === cluster.id}
                  aria-haspopup="true"
                  className={clusterButtonClass(cluster)}
                >
                  <span className="text-sm opacity-75">{cluster.icon}</span>
                  {cluster.label}
                  <ChevronDown open={openCluster === cluster.id} />
                  <span className="absolute inset-x-2 bottom-0.5 h-px bg-gradient-to-r from-teal-500/0 via-teal-500 to-teal-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>

                {openCluster === cluster.id && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <div className="anim-fade w-[580px] max-w-[92vw] rounded-2xl border border-border bg-surface-overlay backdrop-blur-xl p-4 shadow-2xl shadow-black/60">
                      <div className="flex items-start gap-3 px-2 pb-3">
                        <span className="text-2xl leading-none">{cluster.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-content-primary">{cluster.label}</p>
                          <p className="text-xs text-content-muted">{cluster.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {cluster.items.map((item) => (
                          <Link
                            key={`${cluster.id}-${item.href}`}
                            href={item.href}
                            onClick={() => setOpenCluster(null)}
                            className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors group/item ${isActive(item.href)
                              ? 'bg-brand-muted'
                              : 'hover:bg-accent'
                              }`}
                          >
                            <span className="mt-0.5 text-base leading-none">{item.icon}</span>
                            <span className="min-w-0">
                              <span className={`block text-sm font-medium ${isActive(item.href) ? 'text-brand' : 'text-content-secondary group-hover/item:text-content-primary'}`}>
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="mt-0.5 block text-xs text-content-muted group-hover/item:text-content-secondary">
                                  {item.description}
                                </span>
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-border-subtle px-3 pt-3">
                        <Link
                          href={cluster.href}
                          onClick={() => setOpenCluster(null)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
                        >
                          Open {cluster.label}
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── RIGHT CONTROLS ── */}
          <div className="flex items-center gap-0 sm:gap-1 shrink-0">
            {/* Search — also opens with Ctrl+K */}
            <button
              ref={searchButtonRef}
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl text-content-secondary hover:text-content-primary hover:bg-accent transition-all duration-200 text-sm font-medium border border-transparent hover:border-border-strong min-w-[36px] min-h-[36px] justify-center"
              aria-label="Search (Ctrl+K)"
            >
              <SearchIcon />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:inline rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-content-muted">⌘K</kbd>
            </button>

            {/* Language (Pillar F2) */}
            <LocaleSwitcher />

            {/* Theme */}
            <ThemeToggle />

            {/* User dropdown — desktop */}
            <div className="hidden lg:flex items-center ml-1" data-user-dropdown>
              {!session ? (
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-teal-500/20 hover:bg-primary-hover hover:scale-[1.02] transition-all duration-200"
                >
                  Sign In
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setUserOpen(v => !v)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r bg-brand/10 text-brand border border-brand/30 text-sm font-medium hover:bg-brand-muted hover:border-brand transition-all"
                    aria-expanded={userOpen}
                    aria-haspopup="true"
                  >
                    <span className="text-base">👤</span>
                    <span>Account</span>
                    <ChevronDown open={userOpen} />
                  </button>

                  {userOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 w-56 bg-surface-overlay backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl shadow-black/60 z-50 anim-fade flex flex-col" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                      <div className="px-4 pt-3 pb-1 shrink-0">
                        <p className="text-[10px] text-content-muted font-semibold uppercase tracking-widest">Account</p>
                        <div className="mt-1 px-1 py-1.5 bg-surface-muted/40 rounded-lg border border-border-subtle">
                          <p className="text-[11px] text-content-muted">Signed in as</p>
                          <p className="text-sm font-medium text-content-primary truncate mt-0.5">{session.user?.email}</p>
                        </div>
                      </div>
                      <div className="px-2 pb-1 overflow-y-auto no-scrollbar">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group/item text-content-secondary hover:bg-accent hover:text-content-primary"
                        >
                          <span className="text-sm opacity-70">📊</span>
                          <span className="flex-1">Dashboard</span>
                          <span className="text-content-muted group-hover/item:text-brand transition-colors text-xs">→</span>
                        </Link>
                        <Link
                          href="/account"
                          onClick={() => setUserOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group/item text-content-secondary hover:bg-accent hover:text-content-primary"
                        >
                          <span className="text-sm opacity-70">👤</span>
                          <span className="flex-1">Your account</span>
                          <span className="text-content-muted group-hover/item:text-brand transition-colors text-xs">→</span>
                        </Link>
                        {['ADMIN', 'ANALYST'].includes((session.user as { role?: string })?.role || '') && (
                          <Link
                            href={(session.user as { role?: string })?.role === 'ADMIN' ? "/admin" : "/admin/cms"}
                            onClick={() => setUserOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group/item text-content-secondary hover:bg-accent hover:text-content-primary"
                          >
                            <span className="text-sm opacity-70">⚙️</span>
                            <span className="flex-1">Admin Panel</span>
                            <span className="text-content-muted group-hover/item:text-brand transition-colors text-xs">→</span>
                          </Link>
                        )}
                        <button
                          onClick={() => { setUserOpen(false); signOut(); }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-error hover:bg-error-muted hover:text-error transition-colors mt-1"
                        >
                          <span>🚪</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA — desktop only */}
            <Link
              href={NAV_CTA.href}
              className="hidden xl:flex items-center gap-2 ml-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-teal-500/20 hover:bg-primary-hover hover:scale-[1.02] transition-all duration-200 whitespace-nowrap"
            >
              <span>{NAV_CTA.icon}</span>
              {NAV_CTA.label}
            </Link>

            {/* Hamburger — visible below lg */}
            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden relative ml-1 w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-accent text-content-primary transition-all duration-200 active:scale-95"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ────────────────────────────────────────────────────────────
          MOBILE DRAWER  (slides in from right, below lg)
      ──────────────────────────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <button
          type="button"
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={mobileOpen ? 0 : -1}
        />

        {/* Drawer panel */}
        <aside
          ref={mobileDrawerRef}
          id="mobile-navigation"
          className={`absolute right-0 top-0 h-full w-[340px] max-w-[92vw] bg-surface-overlay border-l border-border-subtle shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
          aria-label="Mobile navigation"
          tabIndex={-1}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <Logo onClick={() => setMobileOpen(false)} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-content-muted hover:text-content-primary hover:bg-accent transition-all"
              aria-label="Close menu"
              data-drawer-first
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">

            {/* Search */}
            <div className="p-4">
              <button
                type="button"
                onClick={() => { searchButtonRef.current?.focus(); setSearchOpen(true); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-surface-muted hover:bg-accent border border-border rounded-xl transition-colors"
              >
                <SearchIcon className="text-brand shrink-0" />
                <span className="text-content-secondary text-sm">Search anything…</span>
                <span className="ml-auto text-xs text-content-muted bg-surface-muted px-2 py-0.5 rounded-md">⌘K</span>
              </button>
            </div>

            {/* Clustered nav */}
            <div className="px-4 pb-2 space-y-5">
              {NAV_CLUSTERS.map((cluster) => (
                <div key={cluster.id}>
                  <Link
                    href={cluster.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-1 mb-2"
                  >
                    <span className="text-[10px] text-content-muted font-semibold uppercase tracking-widest">
                      {cluster.icon} {cluster.label}
                    </span>
                  </Link>
                  <div className="space-y-0.5">
                    {cluster.items.map((item) => (
                      <Link
                        key={`${cluster.id}-${item.href}`}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(item.href)
                          ? 'bg-brand-muted text-brand border border-brand/20'
                          : 'text-content-secondary hover:bg-accent hover:text-content-primary border border-transparent'
                          }`}
                      >
                        <span className="text-base w-6 text-center">{item.icon}</span>
                        {item.label}
                        {isActive(item.href) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Account */}
            <div className="px-4 pb-4 mt-4 border-t border-border-subtle pt-4">
              <p className="text-[10px] text-content-muted font-semibold uppercase tracking-widest mb-3 px-1">Account</p>
              {!session ? (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
                >
                  <span>🔐</span>
                  Sign In / Sign Up
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-surface-muted/40 rounded-xl border border-border-subtle">
                    <p className="text-[11px] text-content-muted">Signed in as</p>
                    <p className="text-sm font-medium text-content-primary truncate mt-0.5">{session.user?.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 py-2.5 border border-brand/40 text-brand rounded-xl text-sm font-medium hover:bg-brand-muted transition-all">
                      Dashboard
                    </Link>
                    {['ADMIN', 'ANALYST'].includes((session.user as { role?: string })?.role || '') && (
                      <Link
                        href={(session.user as { role?: string })?.role === 'ADMIN' ? "/admin" : "/admin/cms"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 py-2.5 bg-info text-content-inverse rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => { setMobileOpen(false); signOut(); }}
                    className="w-full py-2.5 bg-error-muted text-error border border-error/30 rounded-xl text-sm font-medium hover:bg-error-muted transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="px-4 pb-6">
              <Link
                href={NAV_CTA.href}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-primary-hover hover:scale-[1.01] transition-all"
              >
                <span>{NAV_CTA.icon}</span>
                {NAV_CTA.label}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
