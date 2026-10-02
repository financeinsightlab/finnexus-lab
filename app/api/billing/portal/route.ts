import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/** Stripe's self-serve portal is disabled for the manual-approval billing flow. */
export async function POST() {
    return NextResponse.json(
        { error: 'The Stripe billing portal is disabled. Manual UPI renewals require a new payment and approval.' },
        { status: 410 },
    );
}
