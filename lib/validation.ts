// lib/validation.ts — shared request-body parsing helpers built on zod.

import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { z, type ZodType } from 'zod';

export type ParseResult<T> =
    | { ok: true; data: T }
    | { ok: false; response: NextResponse };

/** Parse + validate a JSON body. Returns a ready-made 400 on failure. */
export async function parseJsonBody<T>(
    request: Request,
    schema: ZodType<T>,
): Promise<ParseResult<T>> {
    let raw: unknown;
    try {
        raw = await request.json();
    } catch {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }),
        };
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
        return {
            ok: false,
            response: NextResponse.json(
                {
                    error: 'Validation failed',
                    issues: parsed.error.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message,
                    })),
                },
                { status: 400 },
            ),
        };
    }

    return { ok: true, data: parsed.data };
}

/** Parse + validate an `application/json` object-shaped payload. */
export const jsonObject = z.record(z.string(), z.unknown());

/**
 * Bridge a validated (but structurally loose) value into Prisma's JSON input
 * type. This is the single, explicit cast allowed at the JSON boundary —
 * far narrower than the previous `block.data as any`.
 */
export function toInputJson(value: unknown): Prisma.InputJsonValue {
    return value as Prisma.InputJsonValue;
}
