// app/api/admin/ai/kill-switch/route.ts — Global Emergency AI Kill Switch

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { setGlobalAiKillSwitch, isGlobalAiKillSwitchActive } from '@/lib/ai/gateway';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  return NextResponse.json({ active: isGlobalAiKillSwitchActive() });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const active = Boolean(body.active);
    setGlobalAiKillSwitch(active);

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: active ? 'ACTIVATE_KILL_SWITCH' : 'DEACTIVATE_KILL_SWITCH',
        entityType: 'CONFIG',
        details: { killSwitchActive: active },
      },
    });

    return NextResponse.json({ success: true, killSwitchActive: active });
  } catch (error) {
    console.error('Failed to toggle kill switch:', error);
    return NextResponse.json({ error: 'Failed to update kill switch' }, { status: 500 });
  }
}

