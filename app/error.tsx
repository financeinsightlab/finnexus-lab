'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // No Sentry yet — the digest links this client error to server logs so it
        // can be grepped. Wire a real sink here when observability is added.
        console.error('[app/error]', error.digest ?? '', error.message);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">Error</p>
                <h1 className="mt-2 text-2xl font-extrabold text-content-primary">
                    Something went wrong
                </h1>
                <p className="mt-3 text-sm text-content-secondary">
                    An unexpected error occurred while rendering this page. You can retry, or head back home.
                </p>
                {error.digest ? (
                    <p className="mt-2 text-xs text-content-muted">Reference: {error.digest}</p>
                ) : null}
                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-brand-navy hover:border-brand-teal hover:text-brand-teal"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    );
}
