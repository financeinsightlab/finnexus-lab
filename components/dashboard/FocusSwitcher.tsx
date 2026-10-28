'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export type DashboardFocus = 'business' | 'analyst' | 'learner';

export const FOCUS_COOKIE = 'dash-focus';

const OPTIONS: Array<{ id: DashboardFocus; label: string; title: string }> = [
    { id: 'business', label: 'Business', title: 'Models, valuation and advisory first' },
    { id: 'analyst', label: 'Analyst', title: 'Research, trackers and predictions first' },
    { id: 'learner', label: 'Learner', title: 'Courses, progress and study tools first' },
];

/**
 * Lets the user override the inferred dashboard persona. The dashboard
 * infers a sensible default from real activity (enrollments / saved
 * articles / plan), but inference is a guess — this switcher is the
 * corrective. The choice persists in a first-party cookie (same pattern
 * as lib/visit-store) so no database change is needed; it is a UI
 * preference only and carries no entitlement or permission weight.
 */
export default function FocusSwitcher({ current }: { current: DashboardFocus }) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const choose = (focus: DashboardFocus) => {
        if (focus === current) return;
        document.cookie = `${FOCUS_COOKIE}=${focus}; path=/; max-age=31536000; samesite=lax`;
        startTransition(() => router.refresh());
    };

    return (
        <div className="flex items-center gap-2" role="group" aria-label="Workspace focus">
            <span className="hidden md:inline text-xs text-content-muted">Focus</span>
            <div className="inline-flex rounded-xl border border-border bg-surface p-0.5">
                {OPTIONS.map((option) => {
                    const selected = option.id === current;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            title={option.title}
                            aria-pressed={selected}
                            disabled={pending}
                            onClick={() => choose(option.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 disabled:opacity-60 ${selected
                                ? 'bg-brand text-white'
                                : 'text-content-muted hover:bg-accent hover:text-content-primary'}`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
