// app/admin/ai/page.tsx — AI Control Center (Server Entry)

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import AIControlCenterClient from './AIControlCenterClient';

export const metadata: Metadata = {
  title: 'AI Control Center | Admin | Kunwar Analytics',
  description: 'Centralized AI Gateway, Multi-Credential Security, Routing Engine, and Knowledge Intelligence.',
};

export default async function AIControlCenterPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/signin');
  if (!isStaff(user)) redirect('/');

  return <AIControlCenterClient adminEmail={user.email || 'staff@kunwaranalytics.in'} />;
}

