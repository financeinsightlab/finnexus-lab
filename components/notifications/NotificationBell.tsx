'use client';

// components/notifications/NotificationBell.tsx — In-app notification bell & inbox (Pillar D3)

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  readAt: string | null;
  createdAt: string;
}

export default function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user) return;
    try {
      setLoading(true);
      const res = await fetch('/api/notifications', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnread(data.unread || 0);
      }
    } catch {
      // Non-blocking
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    if (session?.user) {
      fetchNotifications();
      // Refresh every 60 seconds
      const timer = setInterval(fetchNotifications, 60000);
      return () => clearInterval(timer);
    }
  }, [session?.user, fetchNotifications]);

  // Handle outside click & escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const markAllRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setUnread(0);
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, readAt: n.readAt || new Date().toISOString() }))
        );
      }
    } catch {
      // Non-blocking
    }
  };

  if (!session?.user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-border bg-surface text-content-primary hover:bg-accent hover:border-brand transition-all"
        aria-label="View notifications"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white shadow-sm">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 sm:w-96 rounded-2xl border border-border bg-surface-overlay backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
          style={{ maxHeight: 'calc(100dvh - 6rem)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-content-primary">Notifications</span>
              {unread > 0 && (
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
                  {unread} new
                </span>
              )}
            </div>

            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-content-muted hover:text-brand transition-colors"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto p-2 divide-y divide-border/40">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-content-muted">
                {loading ? 'Checking notifications…' : "You're all caught up! No notifications."}
              </div>
            ) : (
              notifications.slice(0, 10).map((n) => {
                const isUnread = !n.readAt;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      isUnread ? 'bg-primary/5' : 'hover:bg-accent/40'
                    }`}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface border border-border text-xs">
                      {n.type === 'COMMENT_REPLY'
                        ? '💬'
                        : n.type === 'PAYMENT_APPROVED'
                        ? '💳'
                        : n.type === 'BADGE_EARNED'
                        ? '🏆'
                        : '🔔'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={`text-xs font-semibold ${isUnread ? 'text-content-primary font-bold' : 'text-content-secondary'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-content-muted shrink-0">
                          {new Date(n.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      {n.body && (
                        <p className="mt-0.5 text-xs text-content-muted line-clamp-2">
                          {n.body}
                        </p>
                      )}

                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={() => setOpen(false)}
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-brand hover:underline"
                        >
                          View details <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5 text-center bg-surface-muted/20">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold text-content-muted hover:text-content-primary transition-colors"
            >
              Manage notification preferences &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
