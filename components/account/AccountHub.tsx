'use client';

// components/account/AccountHub.tsx — Account area (Pillar D2/D3/D4 + A4/A5)
//
// Single client surface that talks to the community + billing-free API routes:
//   • Profile      → /api/profile                (GET/PUT)
//   • Badges/XP     → /api/badges                 (GET/POST)
//   • Notifications → /api/notifications          (GET/PATCH)
//   • API keys      → /api/keys                   (GET/POST/DELETE)

import { useCallback, useEffect, useState } from 'react';

type TabId = 'profile' | 'badges' | 'notifications' | 'keys' | 'billing';

interface ProfileShape {
    headline?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    github?: string | null;
    isPublic?: boolean;
}

interface BadgeItem {
    slug: string;
    name: string;
    icon: string;
    points: number;
    threshold: number;
    awardedAt: string | null;
}

interface BadgeStats {
    comments: number;
    predictions: number;
    lessons: number;
    streakDays: number;
}

interface NotificationItem {
    id: string;
    type: string;
    title: string;
    body: string | null;
    link: string | null;
    readAt: string | null;
    createdAt: string;
}

interface ApiKeyItem {
    id: string;
    name: string;
    prefix: string;
    scopes: string[];
    orgId: string | null;
    rateLimitPerMin: number;
    lastUsedAt: string | null;
    revokedAt: string | null;
    createdAt: string;
}

const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-teal dark:border-white/10 dark:bg-[#0f1c2d] dark:text-slate-200';

function formatDate(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-IN');
}

export default function AccountHub() {
    const [tab, setTab] = useState<TabId>('profile');

    return (
        <div className="wrap py-10">
            <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">Your account</h1>
            <p className="mt-1 text-sm text-brand-slate dark:text-slate-400">
                Profile, gamification, notifications and developer API keys.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 dark:border-white/10">
                {(
                    [
                        ['profile', 'Profile'],
                        ['badges', 'Badges & XP'],
                        ['notifications', 'Notifications'],
                        ['keys', 'API keys'],
                        ['billing', 'Billing'],
                    ] as [TabId, string][]
                ).map(([id, label]) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${tab === id
                            ? 'border-brand-teal text-brand-teal'
                            : 'border-transparent text-brand-slate hover:text-brand-navy dark:text-slate-400 dark:hover:text-white'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mt-8">
                {tab === 'profile' && <ProfilePanel />}
                {tab === 'badges' && <BadgesPanel />}
                {tab === 'notifications' && <NotificationsPanel />}
                {tab === 'keys' && <KeysPanel />}
                {tab === 'billing' && <BillingPanel />}
            </div>
        </div>
    );
}

interface BillingState {
    provider: 'MANUAL_UPI' | string;
    plan: string | null;
    status: string;
    resolvedPlan: string;
    expiresAt: string | null;
    renewalHref: string;
    renewalRequiresApproval: boolean;
}

function BillingPanel() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<BillingState | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/billing', { cache: 'no-store' });
            const data = (await response.json().catch(() => null)) as BillingState | null;
            if (!response.ok || !data) throw new Error('Could not load billing details.');
            setState(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const statusTone: Record<string, string> = {
        ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
        INACTIVE: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
    };

    if (loading) {
        return <p className="text-sm text-brand-slate dark:text-slate-400">Loading billing…</p>;
    }

    if (!state) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0f1c2d]">
                <p className="text-sm text-rose-600 dark:text-rose-400">
                    {error ?? 'Billing is unavailable right now.'}
                </p>
                <button
                    onClick={() => void load()}
                    className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium dark:border-white/15"
                >
                    Retry
                </button>
            </div>
        );
    }

    const expiresOn = state.expiresAt
        ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(state.expiresAt))
        : null;

    return (
        <div className="max-w-2xl space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0f1c2d]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate dark:text-slate-400">Current plan</p>
                        <h2 className="mt-1 text-xl font-bold text-brand-navy dark:text-white">{state.resolvedPlan}</h2>
                        {state.plan && state.plan !== state.resolvedPlan && (
                            <p className="mt-1 text-xs text-brand-slate dark:text-slate-400">Previous plan: {state.plan}</p>
                        )}
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[state.status] ?? statusTone.INACTIVE}`}>
                        {state.status}
                    </span>
                </div>

                {expiresOn ? (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Premium access expires {expiresOn}.</p>
                ) : state.resolvedPlan !== 'FREE' ? (
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No expiry date is recorded for this legacy or administrator-managed grant.</p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-3">
                    <a href={state.renewalHref} className="rounded-lg bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
                        {state.resolvedPlan === 'FREE' ? 'Choose a plan' : 'Renew with UPI'}
                    </a>
                    <a href="/pricing" className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5">
                        Compare plans
                    </a>
                </div>
            </div>

            <div className="rounded-2xl border border-teal-200/60 bg-teal-50 p-5 text-sm text-teal-900 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-100">
                Manual UPI payments are reviewed by an administrator. A renewal is another one-month payment that takes effect only after approval; there is no automatic renewal or Stripe checkout.
            </div>
            {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
        </div>
    );
}

function ProfilePanel() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [form, setForm] = useState<ProfileShape>({ isPublic: true });

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/profile', { cache: 'no-store' });
            const data = (await res.json()) as { profile?: ProfileShape | null };
            if (data.profile) setForm({ isPublic: true, ...data.profile });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const update = (key: keyof ProfileShape, value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const save = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            setMessage(res.ok ? 'Profile saved ✓' : 'Could not save profile');
        } catch {
            setMessage('Network error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-sm text-brand-slate dark:text-slate-400">Loading profile…</p>;

    return (
        <div className="card max-w-2xl space-y-4 p-6 dark:bg-[#0f1c2d]">
            <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">Headline</label>
                <input
                    className={inputClass}
                    value={form.headline ?? ''}
                    maxLength={160}
                    onChange={(e) => update('headline', e.target.value)}
                    placeholder="Finance analyst · Valuations"
                />
            </div>
            <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">Bio</label>
                <textarea
                    className={inputClass}
                    rows={4}
                    maxLength={2000}
                    value={form.bio ?? ''}
                    onChange={(e) => update('bio', e.target.value)}
                    placeholder="A short introduction…"
                />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">Location</label>
                    <input
                        className={inputClass}
                        value={form.location ?? ''}
                        onChange={(e) => update('location', e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">Website</label>
                    <input
                        className={inputClass}
                        value={form.website ?? ''}
                        onChange={(e) => update('website', e.target.value)}
                        placeholder="https://"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">X / Twitter</label>
                    <input
                        className={inputClass}
                        value={form.twitter ?? ''}
                        onChange={(e) => update('twitter', e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">GitHub</label>
                    <input
                        className={inputClass}
                        value={form.github ?? ''}
                        onChange={(e) => update('github', e.target.value)}
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">LinkedIn</label>
                    <input
                        className={inputClass}
                        value={form.linkedin ?? ''}
                        onChange={(e) => update('linkedin', e.target.value)}
                        placeholder="https://"
                    />
                </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-brand-slate dark:text-slate-300">
                <input
                    type="checkbox"
                    checked={Boolean(form.isPublic)}
                    onChange={(e) => update('isPublic', e.target.checked)}
                />
                Make my profile public (appears on community pages)
            </label>

            <div className="flex flex-wrap items-center gap-4">
                <button onClick={save} disabled={saving} className="btn btn-primary disabled:opacity-60">
                    {saving ? 'Saving…' : 'Save profile'}
                </button>
                {message && <span className="text-sm text-brand-slate">{message}</span>}
            </div>
        </div>
    );
}

function BadgesPanel() {
    const [loading, setLoading] = useState(true);
    const [catalog, setCatalog] = useState<BadgeItem[]>([]);
    const [points, setPoints] = useState(0);
    const [stats, setStats] = useState<BadgeStats | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/badges', { cache: 'no-store' });
                const data = (await res.json()) as {
                    catalog?: BadgeItem[];
                    points?: number;
                    stats?: BadgeStats;
                };
                setCatalog(data.catalog ?? []);
                setPoints(data.points ?? 0);
                setStats(data.stats ?? null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p className="text-sm text-brand-slate dark:text-slate-400">Loading badges…</p>;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    ['XP points', points],
                    ['Comments', stats?.comments ?? 0],
                    ['Predictions', stats?.predictions ?? 0],
                    ['Lessons done', stats?.lessons ?? 0],
                ].map(([label, value]) => (
                    <div key={label as string} className="card p-4 text-center dark:bg-[#0f1c2d]">
                        <div className="text-2xl font-extrabold text-brand-navy dark:text-white">{value}</div>
                        <div className="text-xs uppercase tracking-wide text-brand-slate">{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catalog.map((badge) => {
                    const earned = Boolean(badge.awardedAt);
                    return (
                        <div
                            key={badge.slug}
                            className={`card flex items-center gap-4 p-5 dark:bg-[#0f1c2d] ${earned ? 'border-brand-teal/40' : 'opacity-60'
                                }`}
                        >
                            <div className="text-3xl" aria-hidden>
                                {badge.icon}
                            </div>
                            <div className="min-w-0">
                                <div className="font-bold text-brand-navy dark:text-white">{badge.name}</div>
                                <div className="text-xs text-brand-slate">
                                    {badge.points} XP · {earned ? `Earned ${formatDate(badge.awardedAt)}` : 'Locked'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function NotificationsPanel() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<NotificationItem[]>([]);
    const [unread, setUnread] = useState(0);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/notifications', { cache: 'no-store' });
            const data = (await res.json()) as { notifications?: NotificationItem[]; unread?: number };
            setItems(data.notifications ?? []);
            setUnread(data.unread ?? 0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const markAll = async () => {
        await fetch('/api/notifications', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });
        void load();
    };

    if (loading) return <p className="text-sm text-brand-slate dark:text-slate-400">Loading notifications…</p>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-brand-slate dark:text-slate-400">
                    {unread} unread
                </span>
                <button onClick={markAll} disabled={unread === 0} className="btn btn-outline disabled:opacity-50">
                    Mark all read
                </button>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-brand-slate dark:text-slate-400">No notifications yet.</p>
            ) : (
                <ul className="space-y-2">
                    {items.map((n) => (
                        <li
                            key={n.id}
                            className={`card p-4 dark:bg-[#0f1c2d] ${n.readAt ? 'opacity-70' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="break-words font-semibold text-brand-navy dark:text-white">{n.title}</div>
                                    {n.body && (
                                        <p className="mt-1 break-words text-sm text-brand-slate dark:text-slate-400">{n.body}</p>
                                    )}
                                    <div className="mt-1 text-xs text-brand-slate">{formatDate(n.createdAt)}</div>
                                </div>
                                {!n.readAt && (
                                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                                )}
                            </div>
                            {n.link && (
                                <a
                                    href={n.link}
                                    className="mt-2 inline-block text-sm font-semibold text-brand-teal hover:underline"
                                >
                                    View →
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function KeysPanel() {
    const [loading, setLoading] = useState(true);
    const [personal, setPersonal] = useState<ApiKeyItem[]>([]);
    const [organization, setOrganization] = useState<ApiKeyItem[]>([]);
    const [name, setName] = useState('');
    const [secret, setSecret] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/keys', { cache: 'no-store' });
            const data = (await res.json()) as { personal?: ApiKeyItem[]; organization?: ApiKeyItem[] };
            setPersonal(data.personal ?? []);
            setOrganization(data.organization ?? []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const issue = async () => {
        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters');
            return;
        }
        setBusy(true);
        setError(null);
        setSecret(null);
        try {
            const res = await fetch('/api/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            });
            const data = (await res.json()) as { secret?: string; error?: string };
            if (!res.ok) {
                setError(data.error ?? 'Could not issue key');
            } else {
                setSecret(data.secret ?? null);
                setName('');
                void load();
            }
        } catch {
            setError('Network error');
        } finally {
            setBusy(false);
        }
    };

    const revoke = async (id: string) => {
        if (!confirm('Revoke this API key? Applications using it will stop working.')) return;
        await fetch(`/api/keys?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        void load();
    };

    const renderList = (label: string, list: ApiKeyItem[]) => (
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-slate">{label}</h3>
            {list.length === 0 ? (
                <p className="mt-2 text-sm text-brand-slate dark:text-slate-400">No keys.</p>
            ) : (
                <ul className="mt-3 space-y-2">
                    {list.map((key) => (
                        <li
                            key={key.id}
                            className={`card flex flex-wrap items-center justify-between gap-3 p-4 dark:bg-[#0f1c2d] ${key.revokedAt ? 'opacity-60' : ''
                                }`}
                        >
                            <div className="min-w-0">
                                <div className="break-words font-semibold text-brand-navy dark:text-white">{key.name}</div>
                                <div className="font-mono text-xs text-brand-slate">
                                    {key.prefix}••••••••  ·  {key.rateLimitPerMin}/min
                                </div>
                                <div className="text-xs text-brand-slate">
                                    {key.revokedAt ? 'Revoked' : `Last used ${formatDate(key.lastUsedAt)}`}
                                </div>
                            </div>
                            {!key.revokedAt && (
                                <button
                                    onClick={() => revoke(key.id)}
                                    className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                                >
                                    Revoke
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="card max-w-xl space-y-3 p-6 dark:bg-[#0f1c2d]">
                <h3 className="font-bold text-brand-navy dark:text-white">Create a personal API key</h3>
                <p className="text-sm text-brand-slate dark:text-slate-400">
                    The secret is shown once. We only store a hash — copy it now.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        className={inputClass}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Research notebook"
                        maxLength={120}
                    />
                    <button onClick={issue} disabled={busy} className="btn btn-primary min-h-11 shrink-0 disabled:opacity-60">
                        {busy ? 'Issuing…' : 'Issue key'}
                    </button>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                {secret && (
                    <div className="rounded-xl border border-brand-teal/40 bg-brand-teal/5 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">
                            Copy your secret now
                        </p>
                        <code className="mt-1 block break-all font-mono text-sm text-brand-navy dark:text-white">
                            {secret}
                        </code>
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-sm text-brand-slate dark:text-slate-400">Loading keys…</p>
            ) : (
                <div className="space-y-6">
                    {renderList('Personal keys', personal)}
                    {organization.length > 0 && renderList('Organization keys', organization)}
                </div>
            )}
        </div>
    );
}
