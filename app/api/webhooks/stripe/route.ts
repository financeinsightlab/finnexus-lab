import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Stripe is not an active payment provider in this release. Acknowledge and
 * ignore legacy webhook deliveries so they can never grant or revoke access.
 */
export async function POST() {
    return NextResponse.json({ received: true, ignored: 'Stripe billing is disabled; manual UPI approval is required.' });
}
