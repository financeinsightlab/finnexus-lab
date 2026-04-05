'use client';

import { useState, useRef } from 'react';
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
    dot:   '#22c55e',
    badge: 'rgba(34,197,94,0.12)',
    label: 'text-green-700',
    icon:  '🟢',
  },
  aging: {
    dot:   '#f59e0b',
    badge: 'rgba(245,158,11,0.12)',
    label: 'text-amber-700',
    icon:  '⚠️',
  },
  stale: {
    dot:   '#ef4444',
    badge: 'rgba(239,68,68,0.12)',
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
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {/* The actual value */}
      <strong
        style={{
          background:
            status === 'stale'
              ? 'rgba(239,68,68,0.08)'
              : status === 'aging'
                ? 'rgba(245,158,11,0.08)'
                : 'rgba(34,197,94,0.06)',
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
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: '240px',
            maxWidth: '320px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '12px 14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
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
                background: '#1e293b',
                border: '1px solid #334155',
                transform: 'rotate(45deg) translate(0%, -50%)',
                marginLeft: '0',
              }}
            />
          </span>

          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>
            DATA FRESHNESS
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{value}</span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Valid as of: <strong style={{ color: '#94a3b8' }}>{formatDateShort(date)}</strong>
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Half-life: <strong style={{ color: '#94a3b8' }}>{halfLifeDays} days</strong>
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Age: <strong style={{ color: cfg.dot }}>{daysOld} days old</strong>
          </span>
          {source && (
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              Source: <span style={{ color: '#cbd5e1' }}>{source}</span>
            </span>
          )}
          {updateUrl && (
            <a
              href={updateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px',
                color: '#0d6e6e',
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
