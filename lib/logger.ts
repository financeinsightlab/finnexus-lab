// lib/logger.ts — minimal structured logger
//
// Emits single-line, greppable records with a level + ISO timestamp. Kept
// dependency-free so it can be imported from server components, route
// handlers, server actions and scripts alike.
//
// NOTE: `next.config.ts` sets `compiler.removeConsole` in production, which
// strips bare `console.*` calls from the bundle. To keep production logs
// working when a real log sink (e.g. Sentry/Vercel log drain) is added,
// route everything through this module and swap the sink here.

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isProduction = process.env.NODE_ENV === 'production';

function stringifyMeta(meta: unknown): string {
    if (meta === undefined) return '';
    try {
        return ` ${JSON.stringify(meta)}`;
    } catch {
        return ' [unserializable meta]';
    }
}

function emit(level: LogLevel, message: string, meta?: unknown): void {
    const line = `[${new Date().toISOString()}] ${level.toUpperCase()} ${message}${stringifyMeta(meta)}`;

    switch (level) {
        case 'error':
            console.error(line);
            break;
        case 'warn':
            console.warn(line);
            break;
        case 'info':
            console.log(line);
            break;
        case 'debug':
        default:
            if (!isProduction) console.log(line);
            break;
    }
}

export const logger = {
    debug: (message: string, meta?: unknown) => emit('debug', message, meta),
    info: (message: string, meta?: unknown) => emit('info', message, meta),
    warn: (message: string, meta?: unknown) => emit('warn', message, meta),
    error: (message: string, meta?: unknown) => emit('error', message, meta),
};

/** Normalise an unknown thrown value into a loggable message. */
export function errorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Unknown error';
}
