'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { approvePaymentAction, rejectPaymentAction } from './actions';

interface AuditEvent {
    action: string;
    fromStatus: string | null;
    toStatus: string;
    reason: string | null;
    createdAt: string;
    actor: { name: string | null; email: string | null } | null;
}

interface PaymentRecord {
    id: string;
    plan: string;
    amountMinor: number;
    currency: string;
    transactionReference: string;
    status: string;
    submittedAt: string;
    verifiedAt: string | null;
    rejectionReason: string | null;
    expiresAt: string | null;
    user: { id: string; name: string | null; email: string | null } | null;
    verifiedBy: { name: string | null; email: string | null } | null;
    auditEvents: AuditEvent[];
}

function formatDate(value: string | null): string {
    if (!value) return '—';
    return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
    }).format(new Date(value));
}

function formatAmount(amountMinor: number, currency: string): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(amountMinor / 100);
}

export default function PaymentReviewClient({ initialPayments }: { initialPayments: PaymentRecord[] }) {
    const router = useRouter();
    const [view, setView] = useState<'PENDING' | 'HISTORY'>('PENDING');
    const [reasons, setReasons] = useState<Record<string, string>>({});
    const [busyId, setBusyId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const pendingPayments = initialPayments.filter((payment) => payment.status === 'PENDING');
    const reviewedPayments = initialPayments.filter((payment) => payment.status !== 'PENDING');
    const visiblePayments = view === 'PENDING' ? pendingPayments : reviewedPayments;

    async function approve(paymentId: string) {
        setBusyId(paymentId);
        setMessage(null);
        try {
            const result = await approvePaymentAction(paymentId);
            if (!result.success) {
                setMessage(result.error ?? 'Approval failed.');
                return;
            }
            setMessage('Payment approved. Paid access now expires one calendar month from approval.');
            router.refresh();
        } catch {
            setMessage('Approval failed. Please refresh and try again.');
        } finally {
            setBusyId(null);
        }
    }

    async function reject(paymentId: string) {
        setBusyId(paymentId);
        setMessage(null);
        try {
            const result = await rejectPaymentAction(paymentId, reasons[paymentId] ?? '');
            if (!result.success) {
                setMessage(result.error ?? 'Rejection failed.');
                return;
            }
            setReasons((current) => ({ ...current, [paymentId]: '' }));
            setMessage('Payment rejected; no premium access was granted.');
            router.refresh();
        } catch {
            setMessage('Rejection failed. Please refresh and try again.');
        } finally {
            setBusyId(null);
        }
    }

    return (
        <section className="space-y-8">
            <header>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-500">Billing review</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Manual UPI payments</h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
                    Check each transaction in the payment provider before approving. Approval grants the selected plan
                    for one calendar month; renewals require a new UPI payment and another review. No automatic
                    verification or screenshot uploads are used.
                </p>
            </header>

            {message && (
                <p role="status" className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-4 py-3 text-sm text-teal-700 dark:text-teal-300">
                    {message}
                </p>
            )}

            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
                <button
                    type="button"
                    onClick={() => setView('PENDING')}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === 'PENDING' ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                    Pending ({pendingPayments.length})
                </button>
                <button
                    type="button"
                    onClick={() => setView('HISTORY')}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === 'HISTORY' ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                    Review history ({reviewedPayments.length})
                </button>
            </div>

            {visiblePayments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-white/10">
                    {view === 'PENDING' ? 'No payments are waiting for review.' : 'No reviewed payments in the latest 50 records.'}
                </div>
            ) : (
                <div className="space-y-5">
                    {visiblePayments.map((payment) => (
                        <article key={payment.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-surface-raised md:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{payment.plan} · {formatAmount(payment.amountMinor, payment.currency)}</h2>
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${payment.status === 'PENDING' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : payment.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300'}`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                        {payment.user?.name || 'Deleted account'}{payment.user?.email ? ` · ${payment.user.email}` : ''}
                                    </p>
                                </div>
                                <p className="text-xs text-slate-500">Submitted {formatDate(payment.submittedAt)}</p>
                            </div>

                            <dl className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm dark:bg-white/[0.03] sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">UPI transaction reference</dt>
                                    <dd className="mt-1 break-all font-mono font-semibold text-slate-900 dark:text-white">{payment.transactionReference}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment method</dt>
                                    <dd className="mt-1 text-slate-800 dark:text-slate-200">Manual UPI · external transfer</dd>
                                </div>
                                {payment.expiresAt && (
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Premium access expires</dt>
                                        <dd className="mt-1 text-slate-800 dark:text-slate-200">{formatDate(payment.expiresAt)}</dd>
                                    </div>
                                )}
                                {payment.verifiedAt && (
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reviewed</dt>
                                        <dd className="mt-1 text-slate-800 dark:text-slate-200">{formatDate(payment.verifiedAt)}{payment.verifiedBy?.email ? ` · ${payment.verifiedBy.email}` : ''}</dd>
                                    </div>
                                )}
                            </dl>

                            {payment.status === 'PENDING' && (
                                <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-white/10 sm:flex-row sm:items-end">
                                    <label className="flex-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                        Rejection reason (required to reject)
                                        <textarea
                                            value={reasons[payment.id] ?? ''}
                                            onChange={(event) => setReasons((current) => ({ ...current, [payment.id]: event.target.value }))}
                                            maxLength={500}
                                            rows={2}
                                            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-background dark:text-white"
                                        />
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            disabled={busyId === payment.id}
                                            onClick={() => void approve(payment.id)}
                                            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                        >
                                            {busyId === payment.id ? 'Saving…' : 'Approve'}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={busyId === payment.id || (reasons[payment.id] ?? '').trim().length < 3}
                                            onClick={() => void reject(payment.id)}
                                            className="rounded-lg border border-rose-300 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50 dark:border-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-950/30"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )}

                            {payment.rejectionReason && (
                                <p className="mt-4 rounded-lg bg-rose-500/5 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
                                    Rejection reason: {payment.rejectionReason}
                                </p>
                            )}

                            <details className="mt-5 border-t border-slate-200 pt-4 text-sm dark:border-white/10">
                                <summary className="cursor-pointer font-semibold text-slate-600 dark:text-slate-300">Audit trail ({payment.auditEvents.length})</summary>
                                <ol className="mt-3 space-y-3">
                                    {payment.auditEvents.map((event, index) => (
                                        <li key={`${payment.id}-${index}`} className="border-l-2 border-teal-500/40 pl-3">
                                            <p className="font-semibold text-slate-800 dark:text-slate-200">{event.action}: {event.fromStatus ?? '—'} → {event.toStatus}</p>
                                            <p className="text-xs text-slate-500">{formatDate(event.createdAt)}{event.actor?.email ? ` · ${event.actor.email}` : ''}</p>
                                            {event.reason && <p className="mt-1 text-slate-600 dark:text-slate-300">{event.reason}</p>}
                                        </li>
                                    ))}
                                </ol>
                            </details>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
