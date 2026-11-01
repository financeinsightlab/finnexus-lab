import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import { UNIFIED_QUESTION_BANK } from '@/lib/placement-war-room/unified-question-bank';
import { isAdmin as checkIsAdmin } from '@/lib/auth-guards';
import PlacementWarRoomClient from './PlacementWarRoomClient';

export const metadata: Metadata = {
  title: 'Placement Day War Room 2.0 | AI-Powered Finance Placement Operating System | Kunwar Analytics',
  description:
    "India's #1 AI-powered Finance Placement Operating System. Comprehensive diagnostic centre, AI career coach, 6-round placement day simulator, 10 technical finance workstations, adaptive study plans, and 200+ verified interview questions for Goldman Sachs India, Avendus, Kotak IB, and Big 4 TAS.",
  alternates: { canonical: '/placement-day-war-room' },
  openGraph: {
    title: 'Placement Day War Room 2.0 — Kunwar Analytics',
    description:
      'AI-powered Finance Placement Operating System with multi-dimensional rubrics, Ind AS, SEBI, and RBI standards.',
    url: 'https://kunwaranalytics.in/placement-day-war-room',
    type: 'website',
  },
};

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-base animate-pulse">
        KA
      </div>
      <div className="text-sm font-mono text-slate-400">
        Initializing Placement Day War Room 2.0 Operating System...
      </div>
    </div>
  );
}

export default async function PlacementDayWarRoomPage() {
  const session = await auth();
  const user = session?.user as Parameters<typeof resolvePlan>[0] | undefined;

  // Resolve plan — admin/analyst always resolve to ENTERPRISE inside resolvePlan
  const plan = resolvePlan(user);

  // Full access enabled
  const adminFlag = checkIsAdmin(session?.user ?? null);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PlacementWarRoomClient
        initialQuestions={UNIFIED_QUESTION_BANK}
        userPlan={plan}
        isAdmin={adminFlag}
        userName={session?.user?.name ?? null}
      />
    </Suspense>
  );
}
