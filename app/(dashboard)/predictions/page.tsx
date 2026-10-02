import type { Metadata } from 'next';
import { getPublicPredictionBoard } from '@/lib/predictions';
import PredictionsClient from './PredictionsClient';

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
      <PredictionsClient
        predictions={predictions}
        sectors={sectors}
        stats={stats}
      />
    </div>
  );
}
