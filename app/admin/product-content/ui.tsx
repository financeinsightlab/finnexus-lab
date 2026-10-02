'use client';

import type { ReactNode } from 'react';

/**
 * Shared building blocks for the product-content admin (FAQs, finance terms,
 * learning, promotions, related links). Kept in one place so every tab uses the
 * same inputs, buttons and notices.
 */

export type Notice = { kind: 'success' | 'error' | 'info'; text: string } | null;

export const inputClass = 'mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring';
export const textAreaClass = `${inputClass} min-h-24 resize-y`;
export const buttonClass = 'inline-flex min-h-10 items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
export const smallButtonClass = 'inline-flex min-h-8 items-center justify-center rounded-lg border border-border px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
export const primaryButtonClass = 'inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
export const dangerButtonClass = 'inline-flex min-h-8 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400';

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
    cache: 'no-store',
  });
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
    issues?: { path?: string; message?: string }[];
  };
  if (!response.ok) {
    const detail = data.issues?.map((i) => (i.path ? `${i.path}: ${i.message}` : i.message)).filter(Boolean).join(', ');
    throw new Error(detail ? `${data.error}: ${detail}` : data.error || `Request failed (${response.status})`);
  }
  return data;
}

export function listFromText(text: string) {
  return [...new Set(text.split(/[\n,]/).map((value) => value.trim()).filter(Boolean))];
}

export function dateToLocal(value: string | Date | null | undefined) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function localToIso(value: string) {
  return value ? new Date(value).toISOString() : null;
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Toggle({ id, label, checked, onChange, hint, disabled }: { id: string; label: string; checked: boolean; onChange: (checked: boolean) => void; hint?: string; disabled?: boolean }) {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 rounded-xl border border-border bg-background p-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
      <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-4 w-4 accent-primary focus-visible:ring-2 focus-visible:ring-ring" />
      <span><span className="block text-sm font-semibold text-foreground">{label}</span>{hint && <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{hint}</span>}</span>
    </label>
  );
}

export function NoticeBanner({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  if (!notice) return null;
  const color = notice.kind === 'error'
    ? 'border-destructive/30 bg-destructive/10 text-destructive'
    : notice.kind === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
      : 'border-primary/30 bg-primary/10 text-foreground';
  return <div className={`flex items-start justify-between gap-3 rounded-xl border p-3 text-sm ${color}`} role={notice.kind === 'error' ? 'alert' : 'status'}><p>{notice.text}</p><button type="button" onClick={onDismiss} className="shrink-0 font-bold underline underline-offset-2">Dismiss</button></div>;
}

export function StatusBadge({ active, label = 'Published', inactiveLabel = 'Draft' }: { active: boolean; label?: string; inactiveLabel?: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${active ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-muted text-muted-foreground'}`}>{active ? label : inactiveLabel}</span>;
}

export function Chip({ children, tone = 'muted', title }: { children: ReactNode; tone?: 'muted' | 'primary' | 'warning' | 'danger' | 'success'; title?: string }) {
  const tones: Record<string, string> = {
    muted: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    danger: 'bg-red-500/10 text-red-700 dark:text-red-300',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  };
  return <span title={title} className={`inline-flex max-w-full items-center truncate rounded-full px-2 py-0.5 text-[10px] font-bold ${tones[tone]}`}>{children}</span>;
}

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground" role="status">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      {label}
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">{children}</p>;
}
