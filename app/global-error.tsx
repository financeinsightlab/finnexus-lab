'use client';

import { useEffect } from 'react';
import { captureError } from '@/lib/observability';

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
        // Route through the observability seam so a real sink (Sentry or any
        // custom reporter) can pick this up without changing the boundary.
        captureError(error, {
            source: 'app/global-error',
            level: 'fatal',
            extra: { digest: error.digest },
        });
    }, [error]);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var pref=localStorage.getItem('theme')||'system';var dark=pref==='dark'||(pref==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`,
                    }}
                />
                <style>{`
                    :root { color-scheme: light; --page-bg: #faf9f6; --page-fg: #17212b; --page-muted: #4c5b66; --page-brand: #0d6e6e; --page-on-brand: #ffffff; }
                    :root.dark { color-scheme: dark; --page-bg: #101821; --page-fg: #e8f0f4; --page-muted: #b1c0c8; --page-brand: #4ec9bd; --page-on-brand: #071312; }
                    * { box-sizing: border-box; }
                    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; margin: 0; padding: 24px; background: var(--page-bg); color: var(--page-fg); font: 16px/1.5 system-ui, sans-serif; }
                    button { border: 0; border-radius: 12px; padding: 10px 16px; background: var(--page-brand); color: var(--page-on-brand); font: inherit; font-weight: 700; cursor: pointer; }
                    button:hover { filter: brightness(.94); }
                    :focus-visible { outline: 2px solid var(--page-brand); outline-offset: 3px; }
                `}</style>
            </head>
            <body>
                <div style={{ maxWidth: 420, textAlign: 'center', padding: 24 }}>
                    <p style={{ margin: '0 0 8px', color: 'var(--page-brand)', fontSize: 12, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase' }}>Kunwar Analytics</p>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Application error</h1>
                    <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--page-muted)' }}>
                        The application failed to load. Please retry.
                    </p>
                    <button type="button" onClick={reset} style={{ marginTop: 16 }}>
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
