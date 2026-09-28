import type { Metadata } from 'next';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth-guards';
import {
    billingConfig,
    isCheckoutPlan,
    toCheckoutPlan,
    type CheckoutPlan,
} from '@/lib/billing';
import { PLAN_CATALOG, PLAN_PRICING } from '@/lib/entitlements';
import CheckoutClient from './CheckoutClient';

// Checkout must reflect the live session, so never statically cache it.
export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
    params: Promise<{ plan: string }>;
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
    const { plan } = await params;
    const checkoutPlan = toCheckoutPlan(plan);
    const name = checkoutPlan ? PLAN_CATALOG[checkoutPlan].name : 'Upgrade';
    return {
        title: `Checkout — ${name}`,
        robots: { index: false, follow: false },
    };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { plan } = await params;

    if (!isCheckoutPlan(plan)) {
        return (
            <div className="mx-auto max-w-md px-6 py-24 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Unknown plan
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    We couldn't find a checkout for &ldquo;{plan}&rdquo;.
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

    const checkoutPlan = plan.toUpperCase() as CheckoutPlan;
    const config = billingConfig();
    const user = await getCurrentUser();
    const pricing = PLAN_PRICING[checkoutPlan];

    return (
        <div className="min-h-[70vh] bg-slate-50 px-6 py-20 dark:bg-[#0a1120]">
            <CheckoutClient
                plan={checkoutPlan}
                planName={PLAN_CATALOG[checkoutPlan].name}
                price={pricing.price}
                period={pricing.period}
                configured={config.configured}
                missing={config.missing}
                signedIn={Boolean(user)}
            />
            <p className="mx-auto mt-8 max-w-md text-center text-xs text-slate-400">
                Prefer a custom agreement?{' '}
                <Link href="/contact?service=Team" className="underline">
                    Talk to us
                </Link>
                .
            </p>
        </div>
    );
}
