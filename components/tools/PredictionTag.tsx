'use client';

import { formatDate } from '@/lib/utils';

// ─── Usage in MDX ─────────────────────────────────────────────────────────────
// <PredictionTag
//   claim="Blinkit will achieve positive EBITDA by Q2 FY27"
//   resolveDate="2027-09-30"
//   sector="Quick Commerce"
//   status="PENDING"
// />

interface PredictionTagProps {
  claim:       string;
  resolveDate: string;
  sector:      string;
  status?:     string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  CONFIRMED: { label: 'CONFIRMED', color: 'hsl(var(--success))', bg: 'hsl(var(--success-muted))', border: 'hsl(var(--success) / .42)' },
  INCORRECT: { label: 'INCORRECT', color: 'hsl(var(--error))', bg: 'hsl(var(--error-muted))', border: 'hsl(var(--error) / .42)' },
  PARTIAL: { label: 'PARTIAL', color: 'hsl(var(--warning))', bg: 'hsl(var(--warning-muted))', border: 'hsl(var(--warning) / .42)' },
  PENDING: { label: 'PENDING', color: 'hsl(var(--warning))', bg: 'hsl(var(--warning-muted))', border: 'hsl(var(--warning) / .42)' },
};

export default function PredictionTag({
  claim,
  resolveDate,
  sector,
  status = 'PENDING',
}: PredictionTagProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;

  const daysRemaining = Math.ceil(
    (new Date(resolveDate).getTime() - Date.now()) / 86_400_000,
  );
  const isPast = daysRemaining < 0;

  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '8px',
        background: 'linear-gradient(135deg, hsl(var(--warning-muted)), hsl(var(--surface)))',
        border: '1px solid hsl(var(--warning) / .35)',
        borderLeft: '4px solid hsl(var(--warning))',
        borderRadius: '10px',
        padding: '12px 16px',
        margin: '12px 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header row */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'hsl(var(--warning))',
            color: 'hsl(var(--content-inverse))',
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.08em',
            padding: '2px 8px',
            borderRadius: '999px',
          }}
        >
          🎯 PREDICTION
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: 'hsl(var(--warning))',
            background: 'hsl(var(--warning-muted))',
            border: '1px solid hsl(var(--warning) / .35)',
            padding: '1px 8px',
            borderRadius: '999px',
          }}
        >
          {sector}
        </span>
        {status && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: cfg.color,
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              padding: '2px 8px',
              borderRadius: '999px',
            }}
          >
            {cfg.label}
          </span>
        )}
      </span>

      {/* Claim text */}
      <span
        style={{
          fontStyle: 'italic',
          color: 'hsl(var(--content-primary))',
          fontSize: '15px',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        &ldquo;{claim}&rdquo;
      </span>

      {/* Resolve date */}
      <span style={{ fontSize: '12px', color: 'hsl(var(--content-secondary))' }}>
        <span style={{ fontWeight: 600 }}>Resolves:</span>{' '}
        {formatDate(resolveDate)}
        {isPast ? (
          <span style={{ color: 'hsl(var(--error))', marginLeft: '8px', fontWeight: 600 }}>
            · Resolved {Math.abs(daysRemaining)} days ago
          </span>
        ) : (
          <span style={{ color: 'hsl(var(--success))', marginLeft: '8px', fontWeight: 600 }}>
            · {daysRemaining} days remaining
          </span>
        )}
      </span>
    </span>
  );
}
