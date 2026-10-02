import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import PaymentReviewClient from './PaymentReviewClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Manual UPI payments | Admin',
    robots: { index: false, follow: false },
};

export default async function AdminPaymentsPage() {
    const user = await getCurrentUser();
    if (!user) redirect('/auth/signin?callbackUrl=/admin/payments');
    if (user.role !== 'ADMIN') redirect('/admin');

    const [pending, recentHistory] = await Promise.all([
        prisma.paymentSubmission.findMany({
            where: { status: 'PENDING' },
            orderBy: { submittedAt: 'asc' },
            include: {
                user: { select: { id: true, name: true, email: true } },
                verifiedBy: { select: { name: true, email: true } },
                auditEvents: {
                    orderBy: { createdAt: 'asc' },
                    include: { actor: { select: { name: true, email: true } } },
                },
            },
        }),
        prisma.paymentSubmission.findMany({
            where: { status: { in: ['APPROVED', 'REJECTED'] } },
            orderBy: { submittedAt: 'desc' },
            take: 50,
            include: {
                user: { select: { id: true, name: true, email: true } },
                verifiedBy: { select: { name: true, email: true } },
                auditEvents: {
                    orderBy: { createdAt: 'asc' },
                    include: { actor: { select: { name: true, email: true } } },
                },
            },
        }),
    ]);

    const serialized = [...pending, ...recentHistory].map((payment) => ({
        id: payment.id,
        plan: payment.plan,
        amountMinor: payment.amountMinor,
        currency: payment.currency,
        transactionReference: payment.transactionReference,
        status: payment.status,
        submittedAt: payment.submittedAt.toISOString(),
        verifiedAt: payment.verifiedAt?.toISOString() ?? null,
        rejectionReason: payment.rejectionReason,
        expiresAt: payment.expiresAt?.toISOString() ?? null,
        user: payment.user,
        verifiedBy: payment.verifiedBy,
        auditEvents: payment.auditEvents.map((event) => ({
            action: event.action,
            fromStatus: event.fromStatus,
            toStatus: event.toStatus,
            reason: event.reason,
            createdAt: event.createdAt.toISOString(),
            actor: event.actor,
        })),
    }));

    return <PaymentReviewClient initialPayments={serialized} />;
}
