import type { Metadata } from 'next';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import { UNIFIED_QUESTION_BANK } from '@/lib/placement-war-room/unified-question-bank';
import { isAdmin as checkIsAdmin } from '@/lib/auth-guards';
import PlacementWarRoomClient from './PlacementWarRoomClient';

export const metadata: Metadata = {
  title: 'Placement Day War Room | Finance Interview Simulator | Kunwar Analytics',
  description:
    "India's #1 AI-powered Placement Day Simulator + Finance Interview War Room. 6-round mock placement day, AI grader, question bank, and study plan for IIM, Goldman Sachs India, Avendus, Kotak IB, and Big 4 TAS.",
  alternates: { canonical: '/placement-day-war-room' },
  openGraph: {
    title: 'Placement Day War Room — Kunwar Analytics',
    description:
      'Full placement day simulation + unlimited AI interview grader. Graded on Ind AS, SEBI, and RBI standards.',
    url: 'https://kunwaranalytics.in/placement-day-war-room',
    type: 'website',
  },
};

export default async function PlacementDayWarRoomPage() {
  const session = await auth();
  const user = session?.user as Parameters<typeof resolvePlan>[0] | undefined;

  // Resolve plan — admin/analyst always resolve to ENTERPRISE inside resolvePlan
  const plan = resolvePlan(user);

  // No pricing restriction — all features accessible to everyone
  const adminFlag = checkIsAdmin(session?.user ?? null);

  return (
    <PlacementWarRoomClient
      initialQuestions={UNIFIED_QUESTION_BANK}
      userPlan={plan}
      isAdmin={adminFlag}
      userName={session?.user?.name ?? null}
    />
  );
}
