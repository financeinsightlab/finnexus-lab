import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicPredictionBoard } from '@/lib/predictions';
import PredictionsClient from './PredictionsClient';
import PromotionSlot from '@/components/promotions/PromotionSlot';

export const metadata: Metadata = {
  title: 'Predictions Board | Kunwar Analytics',
  description:
    'Every prediction made by Kunwar Analytics analysts — tracked, timestamped, and resolved publicly. Full accountability in financial intelligence.',
};

export const dynamic = 'force-dynamic';

export default async function PredictionsBoardPage() {
  const predictions = await getPublicPredictionBoard();

  // Unique sectors for filter pills
  const sectors = [...new Set(predictions.map((p) => p.sector))].sort() as string[];

  const stats = {
    total:     predictions.length,
    confirmed: predictions.filter((p) => p.status === 'CONFIRMED').length,
    incorrect: predictions.filter((p) => p.status === 'INCORRECT').length,
    pending:   predictions.filter((p) => p.status === 'PENDING').length,
    partial:   predictions.filter((p) => p.status === 'PARTIAL').length,
  };

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0D13]">
      <PromotionSlot slot="CONTENT_TOP" path="/predictions" />

      {/* Public Prediction Ledger Banner (Pillar C2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5 text-foreground backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg shadow-sm">
              ⚖️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">Public Prediction Ledger &middot; Verified Track Record</span>
                <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Open JSON-LD Dataset
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Inspect every historical forecast, resolution timestamps, weighted accuracy, and streaks in public.
              </p>
            </div>
          </div>
          <Link
            href="/predictions/ledger"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all shrink-0"
          >
            <span>Explore Ledger</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <PredictionsClient
        predictions={predictions}
        sectors={sectors}
        stats={stats}
      />
      <PromotionSlot slot="CONTENT_BOTTOM" path="/predictions" />
      <PromotionSlot slot="FOOTER" path="/predictions" />
    </div>
  );
}
