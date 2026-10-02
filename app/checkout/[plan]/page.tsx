import type { Metadata } from 'next';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth-guards';
import { manualUPIProvider } from '@/lib/payments/manual-upi-provider';
import { PLAN_CATALOG } from '@/lib/entitlements';
import CheckoutClient from './CheckoutClient';

// Checkout displays the current user session and payment state; never cache it.
export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
    params: Promise<{ plan: string }>;
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
    const { plan } = await params;
    const normalizedPlan = plan.toUpperCase();
    const name = manualUPIProvider.supports(normalizedPlan)
        ? PLAN_CATALOG[normalizedPlan].name
        : 'Upgrade';
    return {
        title: `Checkout — ${name}`,
        robots: { index: false, follow: false },
    };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { plan } = await params;
    const normalizedPlan = plan.toUpperCase();

    if (!manualUPIProvider.supports(normalizedPlan)) {
        return (
            <div className="mx-auto max-w-md px-6 py-24 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Unknown plan</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Manual UPI checkout is currently available for Pro and Elite plans.
                </p>
                <Link
                    href="/pricing"
                    className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                    Compare plans
                </Link>
            </div>
        );
    }

    const instructions = manualUPIProvider.instructions(normalizedPlan);
    const user = await getCurrentUser();

    return (
        <div className="min-h-[70vh] bg-slate-50 px-6 py-20 dark:bg-background">
            <CheckoutClient
                plan={instructions.plan}
                planName={PLAN_CATALOG[instructions.plan].name}
                amountLabel={instructions.amountLabel}
                period={instructions.periodLabel}
                upiId={instructions.upiId}
                qrPath={instructions.qrPath}
                signedIn={Boolean(user)}
            />
            <p className="mx-auto mt-8 max-w-md text-center text-xs text-slate-400">
                Manual transfer? Access begins only after an administrator verifies the payment reference.
            </p>
        </div>
    );
}
