import type { Metadata } from 'next';
import Link from 'next/link';
import FinanceLabView from '../components/FinanceLabView';

export const metadata: Metadata = {
  title: 'Finance Technical Lab | Placement Day War Room | Kunwar Analytics',
  description: 'Interactive financial modeling workstations: DCF valuation, WACC (India G-Sec benchmarks), 3-statement linkages, and DSCR credit covenants.',
};

export default function FinanceLabPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/placement-day-war-room" className="hover:text-amber-400 transition">
            ← Placement Day War Room
          </Link>
          <span>/</span>
          <span className="text-slate-200">Finance Technical Lab</span>
        </div>

        <FinanceLabView />
      </div>
    </div>
  );
}