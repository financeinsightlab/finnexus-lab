import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPlanView from '../components/StudyPlanView';

export const metadata: Metadata = {
  title: '60-Day Study Plan | Placement Day War Room | Kunwar Analytics',
  description: 'Structured 60-day placement preparation curriculum for PGDM & MBA Finance candidates targeting 15+ LPA roles.',
};

export default function StudyPlanPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/placement-day-war-room" className="hover:text-amber-400 transition">
            ← Placement Day War Room
          </Link>
          <span>/</span>
          <span className="text-slate-200">60-Day Study Plan</span>
        </div>

        <StudyPlanView />
      </div>
    </div>
  );
}