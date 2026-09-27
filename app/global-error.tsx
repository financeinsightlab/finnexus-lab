'use client';

import { useEffect } from 'react';

/**
 * Catches errors thrown in the root layout itself (which app/error.tsx cannot).
 * Must render its own <html>/<body>.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[app/global-error]', error.digest ?? '', error.message);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, sans-serif',
                    margin: 0,
                    background: '#faf9f6',
                    color: '#1A2B3C',
                }}
            >
                <div style={{ maxWidth: 420, textAlign: 'center', padding: 24 }}>
                    <h1 style={{ fontSize: 22, fontWeight: 800 }}>Application error</h1>
                    <p style={{ fontSize: 14, color: '#5b6b7b' }}>
                        The application failed to load. Please retry.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            marginTop: 16,
                            padding: '10px 16px',
                            borderRadius: 12,
                            border: 'none',
                            background: '#1A2B3C',
                            color: '#fff',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
