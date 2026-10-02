import { prisma } from '@/lib/prisma';
import { addCalendarMonth, type ManualUpiPlan } from '@/lib/payments/manual-upi-provider';

export type PaymentStoreErrorCode =
    | 'PENDING_PAYMENT_EXISTS'
    | 'TRANSACTION_REFERENCE_ALREADY_USED'
    | 'PAYMENT_NOT_FOUND'
    | 'PAYMENT_NOT_PENDING';

export class PaymentStoreError extends Error {
    constructor(readonly code: PaymentStoreErrorCode) {
        super(code);
        this.name = 'PaymentStoreError';
    }
}

function isUniqueConstraintError(error: unknown): boolean {
    return Boolean(
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code?: unknown }).code === 'P2002',
    );
}

export async function createManualUpiSubmission(input: {
    userId: string;
    plan: ManualUpiPlan;
    amountMinor: number;
    transactionReference: string;
}) {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingPending = await tx.paymentSubmission.findFirst({
                where: { activeKey: input.userId, status: 'PENDING' },
                select: { id: true },
            });
            if (existingPending) throw new PaymentStoreError('PENDING_PAYMENT_EXISTS');

            return tx.paymentSubmission.create({
                data: {
                    userId: input.userId,
                    plan: input.plan,
                    amountMinor: input.amountMinor,
                    currency: 'INR',
                    paymentMethod: 'MANUAL_UPI',
                    transactionReference: input.transactionReference,
                    status: 'PENDING',
                    activeKey: input.userId,
                    auditEvents: {
                        create: {
                            actorId: input.userId,
                            action: 'SUBMITTED',
                            fromStatus: null,
                            toStatus: 'PENDING',
                        },
                    },
                },
                select: {
                    id: true,
                    plan: true,
                    amountMinor: true,
                    currency: true,
                    transactionReference: true,
                    status: true,
                    submittedAt: true,
                },
            });
        });
    } catch (error) {
        if (error instanceof PaymentStoreError) throw error;
        if (isUniqueConstraintError(error)) {
            const pending = await prisma.paymentSubmission.findFirst({
                where: { activeKey: input.userId, status: 'PENDING' },
                select: { id: true },
            });
            if (pending) throw new PaymentStoreError('PENDING_PAYMENT_EXISTS');
            throw new PaymentStoreError('TRANSACTION_REFERENCE_ALREADY_USED');
        }
        throw error;
    }
}

export async function listUserPaymentSubmissions(userId: string) {
    return prisma.paymentSubmission.findMany({
        where: { userId },
        orderBy: { submittedAt: 'desc' },
        take: 20,
        select: {
            id: true,
            plan: true,
            amountMinor: true,
            currency: true,
            transactionReference: true,
            status: true,
            submittedAt: true,
            verifiedAt: true,
            rejectionReason: true,
            expiresAt: true,
        },
    });
}

export async function approveManualUpiPayment(paymentId: string, adminId: string, approvedAt = new Date()) {
    const expiresAt = addCalendarMonth(approvedAt);

    return prisma.$transaction(async (tx) => {
        const payment = await tx.paymentSubmission.findUnique({
            where: { id: paymentId },
            select: { id: true, userId: true, plan: true, status: true },
        });
        if (!payment) throw new PaymentStoreError('PAYMENT_NOT_FOUND');
        if (payment.status !== 'PENDING' || !payment.userId) {
            throw new PaymentStoreError('PAYMENT_NOT_PENDING');
        }

        const changed = await tx.paymentSubmission.updateMany({
            where: { id: payment.id, status: 'PENDING', userId: payment.userId },
            data: {
                status: 'APPROVED',
                verifiedAt: approvedAt,
                verifiedById: adminId,
                expiresAt,
                activeKey: null,
            },
        });
        if (changed.count !== 1) throw new PaymentStoreError('PAYMENT_NOT_PENDING');

        await tx.user.update({
            where: { id: payment.userId },
            data: {
                subscriptionPlan: payment.plan,
                subscriptionStatus: 'ACTIVE',
                subscriptionExpiresAt: expiresAt,
            },
        });

        await tx.paymentAuditEvent.create({
            data: {
                paymentId: payment.id,
                actorId: adminId,
                action: 'APPROVED',
                fromStatus: 'PENDING',
                toStatus: 'APPROVED',
                createdAt: approvedAt,
            },
        });

        return { paymentId: payment.id, plan: payment.plan, approvedAt, expiresAt };
    });
}

export async function rejectManualUpiPayment(
    paymentId: string,
    adminId: string,
    reason: string,
    rejectedAt = new Date(),
) {
    return prisma.$transaction(async (tx) => {
        const payment = await tx.paymentSubmission.findUnique({
            where: { id: paymentId },
            select: { id: true, status: true },
        });
        if (!payment) throw new PaymentStoreError('PAYMENT_NOT_FOUND');
        if (payment.status !== 'PENDING') throw new PaymentStoreError('PAYMENT_NOT_PENDING');

        const changed = await tx.paymentSubmission.updateMany({
            where: { id: payment.id, status: 'PENDING' },
            data: {
                status: 'REJECTED',
                verifiedAt: rejectedAt,
                verifiedById: adminId,
                rejectionReason: reason,
                activeKey: null,
            },
        });
        if (changed.count !== 1) throw new PaymentStoreError('PAYMENT_NOT_PENDING');

        await tx.paymentAuditEvent.create({
            data: {
                paymentId: payment.id,
                actorId: adminId,
                action: 'REJECTED',
                fromStatus: 'PENDING',
                toStatus: 'REJECTED',
                reason,
                createdAt: rejectedAt,
            },
        });

        return { paymentId: payment.id, rejectedAt };
    });
}
