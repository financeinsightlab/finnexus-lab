import { NextResponse } from 'next/server';
import { MANUAL_UPI_PLANS } from '@/lib/payments/manual-upi-provider';

export const runtime = 'nodejs';

/** Compatibility response for old clients: only manual UPI checkout is active. */
export async function GET() {
    return NextResponse.json({
        provider: 'MANUAL_UPI',
        plans: MANUAL_UPI_PLANS,
        automaticCheckout: false,
    });
}

/** Stripe checkout is intentionally disabled; never create a Stripe session. */
export async function POST() {
    return NextResponse.json(
        {
            error: 'Stripe checkout is disabled. Use the manual UPI checkout flow.',
            provider: 'MANUAL_UPI',
            checkout: '/pricing',
        },
        { status: 410 },
    );
}
