import type { Metadata } from 'next';
import Link from 'next/link';
import { UNIFIED_QUESTION_BANK } from '@/lib/placement-war-room/unified-question-bank';
import QuestionBankView from '../components/QuestionBankView';

export const metadata: Metadata = {
  title: 'Finance Question Bank | Placement Day War Room | Kunwar Analytics',
  description: 'Search and practice 200+ verified finance interview questions across accounting, valuation, corporate finance, credit, and behavioral interviews.',
};

export default function QuestionBankPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/placement-day-war-room" className="hover:text-amber-400 transition">
            ← Placement Day War Room
          </Link>
          <span>/</span>
          <span className="text-slate-200">Question Bank</span>
        </div>

        <QuestionBankView questions={UNIFIED_QUESTION_BANK} />
      </div>
    </div>
  );
}