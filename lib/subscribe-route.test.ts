import { describe, expect, it } from 'vitest';
import { POST } from '../app/api/subscribe/route';

function requestWith(body: unknown) {
  return new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }) as Parameters<typeof POST>[0];
}

describe('newsletter signup API', () => {
  it('does not claim a subscription or echo the address when no provider is configured', async () => {
    const response = await POST(requestWith({ email: 'reader@example.com' }));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.error).toContain('Your email was not saved');
    expect(JSON.stringify(payload)).not.toContain('reader@example.com');
  });

  it('keeps the legacy calculator unlock response separate from subscription status', async () => {
    const response = await POST(requestWith({
      email: 'reader@example.com',
      tag: 'unlocked_dcf-valuation-model',
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      subscriptionRecorded: false,
    });
  });
});
