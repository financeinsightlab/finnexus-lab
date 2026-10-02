'use client';

import { useEffect, useState } from 'react';

interface CheckoutClientProps {
    plan: 'PRO' | 'ELITE';
    planName: string;
    amountLabel: string;
    period: string;
    upiId: string;
    qrPath: string;
    signedIn: boolean;
}

interface UserPayment {
    id: string;
    plan: string;
    amountMinor: number;
    currency: string;
    transactionReference: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
    submittedAt: string;
    verifiedAt: string | null;
    rejectionReason: string | null;
    expiresAt: string | null;
}

function formatDate(value: string | null): string {
    if (!value) return '—';
    return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(value));
}

export default function CheckoutClient({
    plan,
    planName,
    amountLabel,
    period,
    upiId,
    qrPath,
    signedIn,
}: CheckoutClientProps) {
    const [transactionReference, setTransactionReference] = useState('');
    const [payments, setPayments] = useState<UserPayment[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(signedIn);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    async function refreshPayments() {
        try {
            const response = await fetch('/api/payments/manual-upi/submissions', { cache: 'no-store' });
            if (!response.ok) return;
            const data = await response.json() as { payments?: UserPayment[] };
            setPayments(data.payments ?? []);
        } catch {
            // Checkout remains usable if history cannot be refreshed.
        } finally {
            setLoadingHistory(false);
        }
    }

    useEffect(() => {
        if (signedIn) void refreshPayments();
    }, [signedIn]);

    async function submitPayment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        setNotice(null);

        try {
            const response = await fetch('/api/payments/manual-upi/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan, transactionReference }),
            });
            const data = await response.json() as { error?: string; payment?: UserPayment };
            if (!response.ok) {
                setError(data.error ?? 'Unable to submit the payment reference.');
                return;
            }
            setTransactionReference('');
            setNotice('Reference submitted. Premium access remains inactive until an administrator approves it.');
            await refreshPayments();
        } catch {
            setError('Unable to reach the payment service. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-surface-raised sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">{planName}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {amountLabel}<span className="text-base font-normal text-slate-500">{period}</span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Manual UPI · {amountLabel} for one month of {planName} access. The month starts when an administrator approves your payment.
            </p>

            {!signedIn ? (
                <>
                    <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">Sign in to continue to payment.</p>
                    <a
                        href={`/auth/signin?callbackUrl=/checkout/${plan.toLowerCase()}`}
                        className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
                    >
                        Sign in to upgrade
                    </a>
                </>
            ) : (
                <div className="mt-7 grid gap-7 text-left md:grid-cols-[minmax(220px,280px)_1fr] md:items-start">
                    <div className="mx-auto w-full max-w-[280px]">
                        <p className="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">Scan to pay</p>
                        <img
                            src={qrPath}
                            alt={`UPI QR code for ${upiId}`}
                            className="mx-auto aspect-square w-full rounded-xl border border-slate-200 bg-white p-2 dark:border-white/10"
                            width={280}
                            height={280}
                        />
                        <p className="mt-3 break-all rounded-lg bg-surface-muted px-3 py-2 text-center text-sm font-semibold text-brand">
                            UPI ID: {upiId}
                        </p>
                    </div>

                    <div>
                        <div className="rounded-xl border border-brand/25 bg-brand-muted p-4 text-sm text-content-secondary">
                            Pay exactly <strong>{amountLabel}</strong> to the displayed UPI ID. After the transfer, enter the transaction reference shown by your UPI app. Do not upload or email a screenshot.
                        </div>

                        <form onSubmit={submitPayment} className="mt-5 space-y-3">
                            <label htmlFor="transactionReference" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                UPI transaction reference
                            </label>
                            <input
                                id="transactionReference"
                                name="transactionReference"
                                value={transactionReference}
                                onChange={(event) => setTransactionReference(event.target.value)}
                                autoComplete="off"
                                spellCheck={false}
                                minLength={6}
                                maxLength={64}
                                pattern="[A-Za-z0-9-]{6,64}"
                                required
                                placeholder="Enter the UTR / transaction ID"
                                className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm text-content-primary outline-none focus-visible:border-brand"
                            />
                            <p className="text-xs text-slate-500">Only the reference is stored so an administrator can match it to the transfer.</p>
                            {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}
                            {notice && <p role="status" className="text-sm text-teal-700 dark:text-teal-300">{notice}</p>}
                            <button
                                type="submit"
                                disabled={submitting || transactionReference.trim().length < 6}
                                className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? 'Submitting…' : 'Submit payment reference'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {signedIn && (
                <section aria-labelledby="payment-history" className="mt-8 border-t border-slate-200 pt-6 text-left dark:border-white/10">
                    <h2 id="payment-history" className="text-base font-bold text-slate-900 dark:text-white">Your manual payment history</h2>
                    {loadingHistory ? (
                        <p className="mt-3 text-sm text-slate-500">Loading submissions…</p>
                    ) : payments.length === 0 ? (
                        <p className="mt-3 text-sm text-slate-500">No payment references submitted yet.</p>
                    ) : (
                        <ul className="mt-3 space-y-3">
                            {payments.map((payment) => (
                                <li key={payment.id} className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{payment.plan} · {new Intl.NumberFormat('en-IN', { style: 'currency', currency: payment.currency, maximumFractionDigits: 0 }).format(payment.amountMinor / 100)}</p>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${payment.status === 'APPROVED' ? 'bg-success-muted text-success' : payment.status === 'REJECTED' ? 'bg-error-muted text-error' : 'bg-warning-muted text-warning'}`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 break-all font-mono text-xs text-slate-500">Reference: {payment.transactionReference}</p>
                                    <p className="mt-1 text-xs text-slate-500">Submitted {formatDate(payment.submittedAt)}</p>
                                    {payment.expiresAt && <p className="mt-1 text-xs text-slate-500">Premium access expires {formatDate(payment.expiresAt)}</p>}
                                    {payment.rejectionReason && <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">Reason: {payment.rejectionReason}</p>}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </div>
    );
}
