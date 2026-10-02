import { afterEach, describe, expect, it } from 'vitest';
import { featureStatus } from './status';

const originalStripeSecret = process.env.STRIPE_SECRET_KEY;
const originalStripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const originalResendKey = process.env.RESEND_API_KEY;

afterEach(() => {
    if (originalStripeSecret === undefined) delete process.env.STRIPE_SECRET_KEY;
    else process.env.STRIPE_SECRET_KEY = originalStripeSecret;
    if (originalStripeWebhookSecret === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
    else process.env.STRIPE_WEBHOOK_SECRET = originalStripeWebhookSecret;
    if (originalResendKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalResendKey;
});

describe('featureStatus', () => {
    it('keeps Stripe and email disabled regardless of legacy provider keys', () => {
        process.env.STRIPE_SECRET_KEY = 'test-only-placeholder';
        process.env.STRIPE_WEBHOOK_SECRET = 'test-only-placeholder';
        process.env.RESEND_API_KEY = 'test-only-placeholder';

        const features = featureStatus();
        expect(features.find((feature) => feature.id === 'stripe')).toMatchObject({
            enabled: false,
            state: 'disabled',
        });
        expect(features.find((feature) => feature.id === 'email')).toMatchObject({
            enabled: false,
            state: 'disabled',
        });
    });
});
