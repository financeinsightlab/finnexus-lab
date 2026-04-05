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
  CONFIRMED: { label: 'CONFIRMED',  color: '#065f46', bg: '#d1fae5', border: '#6ee7b7' },
  INCORRECT: { label: 'INCORRECT',  color: '#7f1d1d', bg: '#fee2e2', border: '#fca5a5' },
  PARTIAL:   { label: 'PARTIAL',    color: '#78350f', bg: '#fef3c7', border: '#fcd34d' },
  PENDING:   { label: 'PENDING',    color: '#78350f', bg: '#fef9c3', border: '#fde047' },
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
        background: 'linear-gradient(135deg, #fefce8 0%, #fff7ed 100%)',
        border: '1px solid #fde68a',
        borderLeft: '4px solid #f59e0b',
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
            background: '#f59e0b',
            color: 'white',
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
            color: '#92400e',
            background: '#fef3c7',
            border: '1px solid #fde68a',
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
          color: '#1c1917',
          fontSize: '15px',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        &ldquo;{claim}&rdquo;
      </span>

      {/* Resolve date */}
      <span style={{ fontSize: '12px', color: '#6b7280' }}>
        <span style={{ fontWeight: 600 }}>Resolves:</span>{' '}
        {formatDate(resolveDate)}
        {isPast ? (
          <span style={{ color: '#ef4444', marginLeft: '8px', fontWeight: 600 }}>
            · Resolved {Math.abs(daysRemaining)} days ago
          </span>
        ) : (
          <span style={{ color: '#059669', marginLeft: '8px', fontWeight: 600 }}>
            · {daysRemaining} days remaining
          </span>
        )}
      </span>
    </span>
  );
}
