import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { jsonObject, parseJsonBody, toInputJson } from './validation';

const schema = z.object({ name: z.string().min(1), count: z.number().int().optional() });

function jsonRequest(body: unknown): Request {
    return new Request('http://localhost/api/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: typeof body === 'string' ? body : JSON.stringify(body),
    });
}

async function bodyOf(response: Response): Promise<Record<string, unknown>> {
    return (await response.json()) as Record<string, unknown>;
}

describe('parseJsonBody', () => {
    it('returns the parsed data on success', async () => {
        const result = await parseJsonBody(jsonRequest({ name: 'alpha', count: 2 }), schema);
        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.data).toEqual({ name: 'alpha', count: 2 });
        }
    });

    it('returns a 400 for malformed JSON', async () => {
        const result = await parseJsonBody(jsonRequest('{ not json'), schema);
        expect(result.ok).toBe(false);
        if (!result.ok) {
            expect(result.response.status).toBe(400);
            expect(await bodyOf(result.response)).toMatchObject({ error: 'Invalid JSON body' });
        }
    });

    it('returns a 400 with field issues when validation fails', async () => {
        const result = await parseJsonBody(jsonRequest({ name: '' }), schema);
        expect(result.ok).toBe(false);
        if (!result.ok) {
            expect(result.response.status).toBe(400);
            const body = await bodyOf(result.response);
            expect(body.error).toBe('Validation failed');
            expect(Array.isArray(body.issues)).toBe(true);
        }
    });
});

describe('jsonObject', () => {
    it('accepts an object and rejects arrays', () => {
        expect(jsonObject.safeParse({ a: 1 }).success).toBe(true);
        expect(jsonObject.safeParse([1, 2]).success).toBe(false);
    });
});

describe('toInputJson', () => {
    it('passes the value through unchanged', () => {
        const value = { blocks: [{ type: 'text' }] };
        expect(toInputJson(value)).toBe(value);
    });
});
