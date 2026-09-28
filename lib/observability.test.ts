import { describe, expect, it, vi } from 'vitest';
import {
    captureError,
    captureMessage,
    getErrorReporter,
    logReporter,
    setErrorReporter,
    type ErrorReporter,
} from './observability';

describe('observability', () => {
    it('defaults to the log reporter', () => {
        setErrorReporter(null);
        expect(getErrorReporter()).toBe(logReporter);
    });

    it('routes captured errors to a custom sink and can be restored', () => {
        const captured: unknown[] = [];
        const sink: ErrorReporter = {
            name: 'test',
            capture: (error) => captured.push(error),
        };
        const previous = setErrorReporter(sink);
        expect(previous).toBe(logReporter);

        captureError(new Error('boom'), { source: 'unit' });
        expect(captured).toHaveLength(1);

        setErrorReporter(null);
        expect(getErrorReporter()).toBe(logReporter);
    });

    it('never throws even when the sink throws', () => {
        setErrorReporter({
            name: 'bad',
            capture: () => {
                throw new Error('sink failed');
            },
        });
        expect(() => captureError(new Error('x'))).not.toThrow();
        setErrorReporter(null);
    });

    it('captureMessage forwards an info-level event', () => {
        const spy = vi.fn();
        setErrorReporter({ name: 'spy', capture: spy });
        captureMessage('milestone', { source: 'test' });
        expect(spy).toHaveBeenCalledTimes(1);
        const context = spy.mock.calls[0][1];
        expect(context?.level).toBe('info');
        setErrorReporter(null);
    });
});
