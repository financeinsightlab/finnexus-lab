// lib/observability.ts — provider-agnostic error reporting (Pillar G1)
//
// We want Sentry-grade signal without making Sentry a hard dependency (or a
// paid one). This module defines a tiny reporter seam:
//
//   • by default errors are logged through `lib/logger` (structured, free),
//   • any sink can be plugged in via `setErrorReporter` (Sentry, Axiom, a
//     webhook, …) — including lazily, from a client-side init script.
//
// Nothing here imports a vendor SDK, so it costs nothing and cannot break the
// build. `captureError` is safe to call from server or client code.

import { logger } from '@/lib/logger';

export interface ErrorContext {
    /** Where it happened, e.g. `api/checkout` or a component name. */
    source?: string;
    /** Arbitrary structured metadata (ids, route params, plan, …). */
    extra?: Record<string, unknown>;
    /** Severity hint; defaults to `error`. */
    level?: 'info' | 'warning' | 'error' | 'fatal';
    user?: { id?: string; email?: string; plan?: string } | null;
}

export interface ErrorReporter {
    name: string;
    capture(error: unknown, context?: ErrorContext): void;
}

function serializeError(error: unknown): { message: string; stack?: string; name?: string } {
    if (error instanceof Error) {
        return { message: error.message, stack: error.stack, name: error.name };
    }
    if (typeof error === 'string') return { message: error };
    try {
        return { message: JSON.stringify(error) };
    } catch {
        return { message: String(error) };
    }
}

/** Default reporter: structured logging through the existing logger. */
export const logReporter: ErrorReporter = {
    name: 'logger',
    capture(error: unknown, context?: ErrorContext) {
        const { message, stack, name } = serializeError(error);
        const payload = {
            source: context?.source,
            level: context?.level ?? 'error',
            errorName: name,
            stack,
            ...context?.extra,
        };
        if (context?.level === 'info') logger.info(message, payload);
        else if (context?.level === 'warning') logger.warn(message, payload);
        else logger.error(message, payload);
    },
};

let activeReporter: ErrorReporter = logReporter;

/** Install a custom sink. Returns the previous reporter so callers can restore. */
export function setErrorReporter(reporter: ErrorReporter | null): ErrorReporter {
    const previous = activeReporter;
    activeReporter = reporter ?? logReporter;
    return previous;
}

export function getErrorReporter(): ErrorReporter {
    return activeReporter;
}

/**
 * Report an error to the active sink. Never throws — observability must not be
 * able to take down the thing it is observing.
 */
export function captureError(error: unknown, context?: ErrorContext): void {
    try {
        activeReporter.capture(error, context);
    } catch {
        // Last-resort: swallow. We've already tried to report.
    }
}

/** Report a non-error event (e.g. a business milestone worth tracing). */
export function captureMessage(message: string, context?: ErrorContext): void {
    captureError(new Error(message), { ...context, level: context?.level ?? 'info' });
}
