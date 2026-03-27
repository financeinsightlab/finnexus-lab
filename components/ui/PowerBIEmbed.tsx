// Usage: <PowerBIEmbed url='https://app.powerbi.com/reportEmbed?...' />
// Get this URL from Power BI Desktop → File → Publish to Web

'use client';

import { useState } from 'react';

interface PowerBIEmbedProps {
  url: string;
  title?: string;
  height?: number;
}

export default function PowerBIEmbed({
  url,
  title = 'Analytics Dashboard',
  height = 500,
}: PowerBIEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-gray-200"
      style={{ height: `${height}px` }}
    >
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-silver gap-3">
          {/* Spinner */}
          <svg
            className="animate-spin h-8 w-8 text-brand-teal"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm font-medium text-brand-slate">Loading dashboard...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white p-6 text-center">
          <span className="text-4xl" aria-hidden="true">📊</span>
          <p className="font-semibold text-brand-navy">Dashboard unavailable</p>
          <p className="text-sm text-brand-slate mb-2">
            The embedded dashboard could not be loaded.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-teal hover:underline"
          >
            Open in Power BI →
          </a>
        </div>
      )}

      {/* The actual iframe */}
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        title={title}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
}
