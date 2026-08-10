'use client';

// ─────────────────────────────────────────────────────────────────────────────
// CartoonSectorScene — a real-time cartoon ANIMATION (not a zooming still).
// Each sector plays continuous activity: a delivery scooter riding across,
// an EV scooter + charging battery, flipping coins + card, SaaS cloud with
// rising data bars, a swinging D2C bag, a beating heart with ECG, a grad cap
// with books. Draws to fill its entire container (no cropping).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

type Mode = 'commerce' | 'fintech' | 'ev' | 'food' | 'saas' | 'd2c' | 'health' | 'edtech';

const CFG: Record<string, { colors: [string, string, string]; mode: Mode }> = {
  'quick-commerce': { colors: ['#38bdf8', '#0ea5e9', '#1d4ed8'], mode: 'commerce' },
  fintech:          { colors: ['#2dd4bf', '#14b8a6', '#0d6e6e'], mode: 'fintech' },
  ev:               { colors: ['#4ade80', '#22c55e', '#0d9488'], mode: 'ev' },
  'food-delivery':  { colors: ['#fb923c', '#f97316', '#ea580c'], mode: 'food' },
  saas:             { colors: ['#60a5fa', '#3b82f6', '#2563eb'], mode: 'saas' },
  d2c:              { colors: ['#f472b6', '#ec4899', '#be185d'], mode: 'd2c' },
  healthcare:       { colors: ['#22d3ee', '#06b6d4', '#0e7490'], mode: 'health' },
  edtech:           { colors: ['#a78bfa', '#8b5cf6', '#6d28d9'], mode: 'edtech' },
};

export default function CartoonSectorScene({ slug, className = '' }: { slug: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cfg = CFG[slug] ?? CFG.fintech;
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bubbles: { x: number; y: number; r: number; vy: number; hue: number; a: number }[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = (rect?.width ?? canvas.clientWidth) || 320;
      H = (rect?.height ?? canvas.clientHeight) || 180;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const c = cfgRef.current;
      bubbles = Array.from({ length: 22 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: 1.5 + Math.random() * 3, vy: 0.2 + Math.random() * 0.5,
        hue: Math.floor(Math.random() * 3), a: 0.15 + Math.random() * 0.35,
      }));
    };

    const rr = (x: number, y: number, w: number, h: number, r: number) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };

    // Cartoon rider on a scooter (commerce / ev / food)
    const rider = (c1: string, c2: string, x: number, y: number, t: number, helmet: string, hasBag: boolean) => {
      ctx.save(); ctx.translate(x, y);
      const bob = Math.sin(t) * 1.2;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(-13, 8, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(13, 8, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-13, 8); ctx.lineTo(-13 + Math.cos(t * 2) * 4, 8 + Math.sin(t * 2) * 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(13, 8); ctx.lineTo(13 + Math.cos(t * 2 + 1) * 4, 8 + Math.sin(t * 2 + 1) * 4); ctx.stroke();
      ctx.fillStyle = c1; rr(-16, -8 + bob, 32, 15, 5);
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(9, -6 + bob); ctx.lineTo(13, -16 + bob); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(10, -8 + bob); ctx.lineTo(18, -10 + bob); ctx.stroke();
      ctx.fillStyle = '#fcd7b6';
      ctx.beginPath(); ctx.arc(3, -16 + bob, 4.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = helmet;
      ctx.beginPath(); ctx.arc(3, -18 + bob, 4.6, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(5, -19 + bob, 1, 0, Math.PI * 2); ctx.fill();
      if (hasBag) {
        ctx.fillStyle = c2; rr(-22, -18 + bob, 9, 12, 3);
        ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.6; rr(-21, -17 + bob, 7, 4, 1); ctx.globalAlpha = 1;
      }
      ctx.restore();
    };

    const bolt = (c: string, x: number, y: number, s = 1, rot = 0) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(rot);
      ctx.fillStyle = c;
      ctx.beginPath(); ctx.moveTo(-4, -10); ctx.lineTo(4, -2); ctx.lineTo(1, -2); ctx.lineTo(4, 9); ctx.lineTo(-4, 0); ctx.lineTo(-1, 0); ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    const coin = (c1: string, c2: string, x: number, y: number, t: number, s = 1) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      const w = Math.max(Math.abs(Math.cos(t)) * 8, 1.5);
      ctx.fillStyle = c1;
      ctx.beginPath(); ctx.ellipse(0, 0, w, 8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = c2; ctx.lineWidth = 1.5; ctx.stroke();
      if (w > 4) { ctx.fillStyle = c2; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₹', 0, 1); }
      ctx.restore();
    };

    const card = (c1: string, c2: string, x: number, y: number, t: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t) * 0.12);
      ctx.fillStyle = c1; ctx.strokeStyle = c2; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(-22, -13, 44, 26, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c2; ctx.fillRect(-22, -8, 44, 2);
      ctx.beginPath(); ctx.arc(9, 7, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };

    const cloud = (c: string, x: number, y: number, breathe: number) => {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = 0.92; ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(-8, 3, 11 + breathe, 0, Math.PI * 2);
      ctx.arc(6, -2, 12 + breathe, 0, Math.PI * 2);
      ctx.arc(20, 3, 10 + breathe, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-19, 0, 39, 12);
      ctx.restore();
    };

    const battery = (c1: string, c2: string, x: number, y: number, charge: number) => {
      ctx.save(); ctx.translate(x, y);
      ctx.fillStyle = c1; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(-20, -16, 40, 32, 5); ctx.fill(); ctx.stroke();
      const h = 32 * charge;
      ctx.fillStyle = c2; rr(-20, 16 - h, 40, h, 3);
      bolt('#fff', 0, 0, 0.9);
      ctx.restore();
    };

    const heart = (c: string, x: number, y: number, s = 1) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-9, -4, -9, -10, -3, -10);
      ctx.bezierCurveTo(0, -10, 2, -8, 3, -7);
      ctx.bezierCurveTo(4, -8, 6, -10, 9, -10);
      ctx.bezierCurveTo(15, -10, 15, -4, 6, 4);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    const cap = (c1: string, c2: string, x: number, y: number, t: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t) * 0.1);
      ctx.fillStyle = c1;
      ctx.beginPath(); ctx.moveTo(-20, -5); ctx.lineTo(0, -16); ctx.lineTo(20, -5); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = c2;
      ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, 15); ctx.lineTo(7, 11); ctx.lineTo(7, 3); ctx.closePath(); ctx.fill();
      ctx.fillStyle = c1; ctx.beginPath(); ctx.arc(0, -5, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };

    const book = (c: string, x: number, y: number, t: number) => {
      ctx.save(); ctx.translate(x, y + Math.sin(t) * 4); ctx.rotate(Math.sin(t) * 0.1);
      ctx.fillStyle = c; ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(-14, -9, 28, 18, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0f172a'; ctx.fillRect(-1, -9, 2, 18);
      ctx.restore();
    };

    const bag = (c1: string, c2: string, x: number, y: number, t: number, label: string) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t) * 0.12);
      ctx.fillStyle = c1; ctx.strokeStyle = c2; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-18, -8); ctx.lineTo(-13, 18); ctx.lineTo(13, 18); ctx.lineTo(18, -8); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = c2; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-9, -10); ctx.quadraticCurveTo(0, -20, 9, -10); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, 0, 8);
      ctx.restore();
    };

    const drawScene = (mode: Mode, t: number) => {
      const c = cfgRef.current;
      const [c0, c1, c2] = c.colors;
      const T = t * 0.001;
      ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, H - 14); ctx.lineTo(W, H - 14); ctx.stroke();

      const travel = ((t * 0.00012) % 1 + 1) % 1;
      const x = travel * (W + 100) - 50;

      if (mode === 'commerce') {
        rider(c0, c1, x, H - 30, T * 4, c1, true);
        bolt(c2, x + 34, H - 52, 1, Math.sin(T) * 0.3);
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = i % 2 ? c1 : c2;
          const px = W * 0.15 + i * W * 0.28;
          const py = H * 0.28 + Math.sin(T * 3 + i * 2) * 8;
          rr(px, py, 18, 14, 3);
        }
      } else if (mode === 'ev') {
        rider(c0, c1, x, H - 30, T * 4, c2, false);
        const charge = 0.45 + 0.4 * Math.sin(T * 1.5);
        battery(c2, c1, W * 0.8, H * 0.45, charge);
        bolt(c1, W * 0.25, H * 0.35, 1, Math.sin(T * 2) * 0.4);
      } else if (mode === 'food') {
        bag(c0, c2, W * 0.3, H * 0.42, T * 2, '🍕');
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.beginPath(); ctx.arc(W * 0.3 + i * 8 - 8, H * 0.3 - Math.sin(T * 2 + i) * 8, 2.5, 0, Math.PI * 2); ctx.fill();
        }
        rider(c1, c2, x, H - 30, T * 4, c0, true);
      } else if (mode === 'fintech') {
        card(c0, c1, W * 0.5, H * 0.5, T * 2);
        for (let i = 0; i < 3; i++) coin(c1, c2, W * 0.22 + i * W * 0.26, H * 0.28 + Math.sin(T * 3 + i * 2) * 6, T * 6 + i, i === 1 ? 1.3 : 1);
        ctx.strokeStyle = c1; ctx.lineWidth = 3;
        const gx = W * 0.8, gy = H * 0.62;
        ctx.beginPath(); ctx.moveTo(gx - 12, gy); ctx.lineTo(gx, gy - 18); ctx.lineTo(gx + 12, gy); ctx.stroke();
        ctx.fillStyle = c1;
        ctx.beginPath(); ctx.moveTo(gx, gy - 22); ctx.lineTo(gx + 4, gy - 12); ctx.lineTo(gx - 4, gy - 12); ctx.closePath(); ctx.fill();
      } else if (mode === 'saas') {
        cloud(c0, W * 0.32, H * 0.42, Math.sin(T * 2) * 1.5);
        for (let i = 0; i < 4; i++) {
          const bh = 14 + Math.sin(T * 3 + i) * 9;
          ctx.fillStyle = i % 2 ? c1 : c2;
          rr(W * 0.6 + i * 22, H * 0.52 - bh, 14, bh, 3);
        }
        ctx.fillStyle = c1; ctx.beginPath(); ctx.arc(W * 0.5, H * 0.22, 6, 0, Math.PI * 2); ctx.fill();
      } else if (mode === 'd2c') {
        bag(c0, c2, W * 0.35, H * 0.45, T * 2, '✚');
        for (let i = 0; i < 2; i++) {
          const bx = W * 0.58 + i * 44, by = H * 0.42 + Math.sin(T * 3 + i) * 7;
          ctx.fillStyle = i ? c1 : c2;
          ctx.beginPath(); ctx.roundRect(bx - 8, by - 16, 16, 26, 6); ctx.fill();
          ctx.fillStyle = '#0f172a'; ctx.fillRect(bx - 3, by - 20, 6, 6);
        }
      } else if (mode === 'health') {
        heart(c0, W * 0.38, H * 0.42, 1.1 + Math.sin(T * 2) * 0.08);
        ctx.strokeStyle = c1; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(W * 0.5, H * 0.52); ctx.lineTo(W * 0.58, H * 0.52);
        ctx.lineTo(W * 0.63, H * 0.42); ctx.lineTo(W * 0.68, H * 0.62);
        ctx.lineTo(W * 0.73, H * 0.52); ctx.lineTo(W * 0.82, H * 0.52);
        ctx.stroke();
        ctx.fillStyle = c2;
        ctx.fillRect(W * 0.78, H * 0.3, 8, 22); ctx.fillRect(W * 0.71, H * 0.37, 22, 8);
      } else if (mode === 'edtech') {
        cap(c0, c1, W * 0.35, H * 0.4, T * 2);
        book(c1, W * 0.68, H * 0.42, T * 2);
        book(c2, W * 0.8, H * 0.34, T * 2 + 1);
        ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(W * 0.55, H * 0.24, 4, 0, Math.PI * 2); ctx.fill();
      }
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const c = cfgRef.current;
      const g = ctx.createRadialGradient(W / 2, H / 2, 8, W / 2, H / 2, Math.max(W, H) * 0.7);
      g.addColorStop(0, `${c.colors[0]}30`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (const b of bubbles) {
        b.y -= b.vy; if (b.y < -8) { b.y = H + 8; b.x = Math.random() * W; }
        ctx.globalAlpha = b.a; ctx.fillStyle = c.colors[b.hue % 3];
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      drawScene(c.mode, t);
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
