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
            <div className="relative overflow-hidden rounded-2xl border border-warning/30 bg-warning-muted p-8 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-warning">
                    {plan.name} members only
                </p>
                <h3 className="mt-3 text-2xl font-bold text-content-primary">
                    Unlock the full analysis
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-content-secondary">
                    {plan.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href={href}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
                    >
                        Upgrade to {plan.name}
                    </Link>
                    <Link
                        href="/pricing"
                        className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-content-secondary transition hover:bg-surface-muted hover:text-content-primary"
                    >
                        Compare plans
                    </Link>
                </div>
                <p className="mt-4 text-xs text-content-muted">
                    You are currently on the {normalizePlan(user?.subscriptionPlan)} plan.
                </p>
            </div>
        </div>
    );
}
