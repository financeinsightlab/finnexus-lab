import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { parseJsonBody } from '@/lib/validation';
import { consumeRateLimit } from '@/lib/rate-limit';
import {
    isValidTransactionReference,
    manualUPIProvider,
    normalizeTransactionReference,
} from '@/lib/payments/manual-upi-provider';
import {
    createManualUpiSubmission,
    listUserPaymentSubmissions,
    PaymentStoreError,
} from '@/lib/payments/payment-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const createSchema = z.object({
    plan: z.enum(['PRO', 'ELITE']),
    transactionReference: z.string().trim().min(6).max(64),
});

function tooManyRequests(retryAfterSeconds: number) {
    return NextResponse.json(
        { error: 'Too many payment submissions. Please wait before trying again.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    );
}

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const payments = await listUserPaymentSubmissions(auth.user.id);
        return NextResponse.json(
            { payments },
            { headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
        );
    } catch (error) {
        logger.error('Unable to list the current user payment submissions', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Unable to load payment history' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const rateLimit = await consumeRateLimit('manual-upi-submit', auth.user.id, {
            limit: 5,
            windowSeconds: 60 * 60,
        });
        if (!rateLimit.allowed) return tooManyRequests(rateLimit.retryAfterSeconds);
    } catch (error) {
        logger.error('Payment submission rate-limit check failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Payment submissions are temporarily unavailable' }, { status: 503 });
    }

    const parsed = await parseJsonBody(request, createSchema);
    if (!parsed.ok) return parsed.response;

    const plan = parsed.data.plan;
    const transactionReference = normalizeTransactionReference(parsed.data.transactionReference);
    if (!isValidTransactionReference(transactionReference)) {
        return NextResponse.json(
            { error: 'Enter a valid UPI transaction reference (6–64 letters, numbers, or hyphens).' },
            { status: 400 },
        );
    }

    if (!manualUPIProvider.supports(plan)) {
        return NextResponse.json({ error: 'This plan is not available for UPI checkout.' }, { status: 400 });
    }

    try {
        const instructions = manualUPIProvider.instructions(plan);
        const payment = await createManualUpiSubmission({
            userId: auth.user.id,
            plan,
            amountMinor: instructions.amountMinor,
            transactionReference,
        });
        return NextResponse.json({ payment }, { status: 201 });
    } catch (error) {
        if (error instanceof PaymentStoreError) {
            if (error.code === 'PENDING_PAYMENT_EXISTS') {
                return NextResponse.json(
                    { error: 'You already have a payment awaiting review.' },
                    { status: 409 },
                );
            }
            if (error.code === 'TRANSACTION_REFERENCE_ALREADY_USED') {
                return NextResponse.json(
                    { error: 'This transaction reference has already been submitted.' },
                    { status: 409 },
                );
            }
        }
        logger.error('Manual UPI submission failed', {
            error: error instanceof Error ? error.message : String(error),
            userId: auth.user.id,
        });
        return NextResponse.json({ error: 'Unable to submit payment for review' }, { status: 500 });
    }
}
