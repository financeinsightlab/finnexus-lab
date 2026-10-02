'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import {
    approveManualUpiPayment,
    PaymentStoreError,
    rejectManualUpiPayment,
} from '@/lib/payments/payment-store';

const paymentIdSchema = z.string().trim().min(1).max(100);
const rejectionSchema = z.string().trim().min(3, 'Add a short reason for rejection.').max(500);

function messageFor(error: unknown): string {
    if (error instanceof PaymentStoreError) {
        if (error.code === 'PAYMENT_NOT_FOUND') return 'Payment submission not found.';
        if (error.code === 'PAYMENT_NOT_PENDING') return 'This payment has already been reviewed.';
    }
    return 'The payment review could not be completed.';
}

export async function approvePaymentAction(paymentId: string) {
    const admin = await requireAdmin();
    const parsedId = paymentIdSchema.safeParse(paymentId);
    if (!parsedId.success) return { success: false, error: 'Invalid payment submission.' };

    try {
        await approveManualUpiPayment(parsedId.data, admin.id);
        revalidatePath('/admin/payments');
        revalidatePath('/account');
        revalidatePath('/checkout/pro');
        revalidatePath('/checkout/elite');
        return { success: true };
    } catch (error) {
        logger.error('Admin approval of a manual UPI payment failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return { success: false, error: messageFor(error) };
    }
}

export async function rejectPaymentAction(paymentId: string, reason: string) {
    const admin = await requireAdmin();
    const parsedId = paymentIdSchema.safeParse(paymentId);
    const parsedReason = rejectionSchema.safeParse(reason);
    if (!parsedId.success) return { success: false, error: 'Invalid payment submission.' };
    if (!parsedReason.success) return { success: false, error: parsedReason.error.issues[0]?.message ?? 'Invalid reason.' };

    try {
        await rejectManualUpiPayment(parsedId.data, admin.id, parsedReason.data);
        revalidatePath('/admin/payments');
        revalidatePath('/checkout/pro');
        revalidatePath('/checkout/elite');
        return { success: true };
    } catch (error) {
        logger.error('Admin rejection of a manual UPI payment failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return { success: false, error: messageFor(error) };
    }
}
