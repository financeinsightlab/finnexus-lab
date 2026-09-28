'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface CheckoutClientProps {
    plan: string;
    planName: string;
    price: string;
    period: string;
    /** False when the server already knows Stripe isn't configured. */
    configured: boolean;
    /** Env vars still required, surfaced when `configured` is false. */
    missing: string[];
    signedIn: boolean;
}

/**
 * Kicks off Stripe Checkout for a plan. Auto-starts once on mount when the user
 * is signed in and billing is configured; otherwise it shows an explanatory
 * state with a manual retry (and the exact env vars an operator must add).
 */
export default function CheckoutClient({
    plan,
    planName,
    price,
    period,
    configured,
    missing,
    signedIn,
}: CheckoutClientProps) {
    const [status, setStatus] = useState<'idle' | 'redirecting' | 'error'>('idle');
    const [message, setMessage] = useState<string | null>(null);
    const started = useRef(false);

    const start = useCallback(async () => {
        setStatus('redirecting');
        setMessage(null);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan }),
            });
            const data = (await response.json().catch(() => null)) as
                | { url?: string; error?: string; missing?: string[] }
                | null;

            if (response.ok && data?.url) {
                window.location.href = data.url;
                return;
            }
            setStatus('error');
            setMessage(
                data?.error ??
                (data?.missing?.length
                    ? `Billing is not configured. Missing: ${data.missing.join(', ')}`
                    : 'Could not start checkout. Please try again.'),
            );
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }, [plan]);

    useEffect(() => {
        if (!signedIn || !configured || started.current) return;
        started.current = true;
        void start();
    }, [signedIn, configured, start]);

    const blocked = !signedIn || !configured;

    return (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-[#111c31]">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {planName}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {price}
                <span className="text-base font-normal text-slate-500">{period}</span>
            </h1>

            {!signedIn ? (
                <>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        Sign in to continue to secure Stripe Checkout.
                    </p>
                    <a
                        href={`/auth/signin?callbackUrl=/checkout/${plan.toLowerCase()}`}
                        className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Sign in to upgrade
                    </a>
                </>
            ) : !configured ? (
                <>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        Billing is not switched on for this deployment yet.
                    </p>
                    {missing.length > 0 && (
                        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
                            Missing environment variables:{' '}
                            <code className="font-mono">{missing.join(', ')}</code>
                        </p>
                    )}
                    <a
                        href="/pricing"
                        className="mt-6 inline-block rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                        Back to pricing
                    </a>
                </>
            ) : (
                <>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        {status === 'redirecting'
                            ? 'Redirecting you to Stripe Checkout…'
                            : message ?? 'Ready to check out.'}
                    </p>
                    {status !== 'redirecting' && (
                        <button
                            type="button"
                            onClick={() => void start()}
                            className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                        >
                            {status === 'error' ? 'Try again' : 'Continue to payment'}
                        </button>
                    )}
                </>
            )}

            {blocked && status === 'idle' && (
                <p className="mt-6 text-xs text-slate-400">
                    Payments are processed securely by Stripe. Cancel anytime.
                </p>
            )}
        </div>
    );
}
