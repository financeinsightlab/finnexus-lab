import type { Metadata } from 'next';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import { QUESTION_BANK } from '@/lib/interview-engine';
import InterviewWarRoomClient from './InterviewWarRoomClient';

export const metadata: Metadata = {
  title: 'Finance Interview War Room | India AI Finance Coach | Kunwar Analytics',
  description:
    'Simulate high-pressure finance interviews for Indian Investment Banking, Private Equity, Equity Research, and Big4 TAS. Graded on Ind AS, SEBI regulations, and RBI policies.',
  alternates: { canonical: '/interview-war-room' },
  openGraph: {
    title: 'Finance Interview War Room — Kunwar Analytics',
    description:
      "India's #1 AI Finance Interview Simulator. Prepare for Goldman Sachs India, Avendus, Kotak IB, and Blackstone with real-time AI feedback.",
    url: 'https://kunwaranalytics.in/interview-war-room',
    type: 'website',
  },
};

export default async function InterviewWarRoomPage() {
  const session = await auth();
  const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
  const isPaid = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';

  return (
    <InterviewWarRoomClient
      initialQuestions={QUESTION_BANK}
      userPlan={plan}
      isPaid={isPaid}
    />
  );
}
