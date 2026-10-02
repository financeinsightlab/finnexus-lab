'use client';

import { useId, useState, useRef } from 'react';
import { computeFreshness, type FreshnessStatus } from '@/lib/freshness';

// ─── Usage in MDX ─────────────────────────────────────────────────────────────
// Blinkit operates <FreshStat value="2,027 dark stores" date="2025-12-01"
//   halfLifeDays={45} source="Eternal Ltd Q3 FY26 Earnings Call"
//   updateUrl="https://ir.eternal.in" /> across India.
// ─────────────────────────────────────────────────────────────────────────────

interface FreshStatProps {
  value:        string;
  date:         string;
  halfLifeDays: number;
  source?:      string;
  updateUrl?:   string;
}

const STATUS_STYLES: Record<FreshnessStatus, {
  dot: string; badge: string; label: string; icon: string;
}> = {
  fresh: {
    dot:   'hsl(var(--success))',
    badge: 'hsl(var(--success-muted))',
    label: 'text-green-700',
    icon:  '🟢',
  },
  aging: {
    dot:   'hsl(var(--warning))',
    badge: 'hsl(var(--warning-muted))',
    label: 'text-amber-700',
    icon:  '⚠️',
  },
  stale: {
    dot:   'hsl(var(--error))',
    badge: 'hsl(var(--error-muted))',
    label: 'text-red-700',
    icon:  '🔴',
  },
};

function formatDateShort(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function FreshStat({
  value,
  date,
  halfLifeDays,
  source,
  updateUrl,
}: FreshStatProps) {
  const { daysOld, status } = computeFreshness(date, halfLifeDays);
  const cfg = STATUS_STYLES[status];
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const badgeText =
    status === 'fresh'
      ? `Current as of ${daysOld}d ago`
      : status === 'aging'
        ? `${cfg.icon} ${daysOld}d old — verify before use`
        : `${cfg.icon} STALE — ${daysOld}d old`;

  return (
    <span
      ref={wrapperRef}
      tabIndex={0}
      aria-describedby={showTooltip ? tooltipId : undefined}
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onKeyDown={(event) => { if (event.key === 'Escape') setShowTooltip(false); }}
    >
      {/* The actual value */}
      <strong
        style={{
          background:
            status === 'stale'
              ? 'hsl(var(--error-muted) / .62)'
              : status === 'aging'
                ? 'hsl(var(--warning-muted) / .62)'
                : 'hsl(var(--success-muted) / .62)',
          borderRadius: '4px',
          padding: '0 4px',
          borderBottom: `2px solid ${cfg.dot}`,
          cursor: 'help',
        }}
      >
        {value}
      </strong>

      {/* Freshness badge */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          background: cfg.badge,
          color: cfg.dot,
          border: `1px solid ${cfg.dot}`,
          borderRadius: '999px',
          padding: '1px 7px',
          marginLeft: '5px',
          verticalAlign: 'middle',
          cursor: 'help',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: cfg.dot,
          }}
        />
        {badgeText}
      </span>

      {/* Hover Tooltip */}
      {showTooltip && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: '240px',
            maxWidth: '320px',
            background: 'hsl(var(--surface-overlay))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '10px',
            padding: '12px 14px',
            boxShadow: '0 10px 30px rgb(var(--shadow-rgb) / .32)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            pointerEvents: 'none',
          }}
        >
          {/* Arrow */}
          <span
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '6px',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '12px',
                height: '12px',
                background: 'hsl(var(--surface-overlay))',
                border: '1px solid hsl(var(--border))',
                transform: 'rotate(45deg) translate(0%, -50%)',
                marginLeft: '0',
              }}
            />
          </span>

          <span style={{ fontSize: '11px', fontWeight: 700, color: 'hsl(var(--content-muted))', letterSpacing: '0.05em' }}>
            DATA FRESHNESS
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'hsl(var(--content-primary))' }}>{value}</span>
          <span style={{ fontSize: '11px', color: 'hsl(var(--content-muted))' }}>
            Valid as of: <strong style={{ color: 'hsl(var(--content-secondary))' }}>{formatDateShort(date)}</strong>
          </span>
          <span style={{ fontSize: '11px', color: 'hsl(var(--content-muted))' }}>
            Half-life: <strong style={{ color: 'hsl(var(--content-secondary))' }}>{halfLifeDays} days</strong>
          </span>
          <span style={{ fontSize: '11px', color: 'hsl(var(--content-muted))' }}>
            Age: <strong style={{ color: cfg.dot }}>{daysOld} days old</strong>
          </span>
          {source && (
            <span style={{ fontSize: '11px', color: 'hsl(var(--content-muted))' }}>
              Source: <span style={{ color: 'hsl(var(--content-secondary))' }}>{source}</span>
            </span>
          )}
          {updateUrl && (
            <a
              href={updateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px',
                color: 'hsl(var(--brand))',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: '2px',
                pointerEvents: 'auto',
              }}
            >
              Check for newer data →
            </a>
          )}
        </span>
      )}
    </span>
  );
}
