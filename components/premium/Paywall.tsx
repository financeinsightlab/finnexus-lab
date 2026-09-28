import Link from 'next/link';
import type { ReactNode } from 'react';
import { PLAN_CATALOG, canAccess, normalizePlan, type PlanId } from '@/lib/entitlements';
import type { EntitledUser } from '@/lib/entitlements';

/**
 * Server-side content gate (Pillar A2).
 *
 * The critical property is enforced by *where* this is used: the caller decides
 * whether to pass the gated body as `children`. When the user is not entitled,
 * the children are simply never rendered — the gated content is not sent to the
 * browser at all. This is a boundary, not a CSS blur.
 *
 * ```tsx
 * <Paywall user={user} minimumPlan="ELITE" preview={<Teaser />}>
 *   <FullReportBody />
 * </Paywall>
 * ```
 */
export interface PaywallProps {
    user: EntitledUser | null | undefined;
    minimumPlan?: PlanId;
    /** Always-visible teaser shown above the gate for everyone. */
    preview?: ReactNode;
    /** Gated body — only rendered for entitled users. */
    children: ReactNode;
}

export default function Paywall({
    user,
    minimumPlan = 'PRO',
    preview,
    children,
}: PaywallProps) {
    const entitled = canAccess(user, minimumPlan);

    if (entitled) {
        return <>{preview}{children}</>;
    }

    const plan = PLAN_CATALOG[minimumPlan];
    const href = `/checkout/${minimumPlan.toLowerCase()}`;

    return (
        <div className="space-y-6">
            {preview}
            <div className="relative overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-50 to-white p-8 text-center shadow-sm dark:from-amber-950/30 dark:to-neutral-900">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {plan.name} members only
                </p>
                <h3 className="mt-3 text-2xl font-bold text-neutral-900 dark:text-white">
                    Unlock the full analysis
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-300">
                    {plan.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href={href}
                        className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                    >
                        Upgrade to {plan.name}
                    </Link>
                    <Link
                        href="/pricing"
                        className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                        Compare plans
                    </Link>
                </div>
                <p className="mt-4 text-xs text-neutral-400">
                    You are currently on the {normalizePlan(user?.subscriptionPlan)} plan.
                </p>
            </div>
        </div>
    );
}
