// app/api/admin/ai/routes/route.ts — AI Task Routing Configuration API

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { aiRouter } from '@/lib/ai/router';
import { prisma } from '@/lib/prisma';
import type { AITaskId } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const routes = await aiRouter.getAllRoutes();
    return NextResponse.json({ success: true, routes });
  } catch (error) {
    console.error('Failed to get routes:', error);
    return NextResponse.json({ error: 'Failed to retrieve routes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { taskKey, primaryProvider, primaryModel, fallbackProvider, fallbackModel, temperature, maxTokens, enabled } = body;

    if (!taskKey) {
      return NextResponse.json({ error: 'Missing taskKey' }, { status: 400 });
    }

    const updated = await aiRouter.updateRoute(taskKey as AITaskId, {
      primaryProvider,
      primaryModel,
      fallbackProvider,
      fallbackModel,
      temperature,
      maxTokens,
      enabled,
    });

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'UPDATE_ROUTE',
        entityType: 'ROUTE',
        entityId: taskKey,
        details: { primaryProvider, primaryModel, fallbackProvider, fallbackModel },
      },
    });

    return NextResponse.json({ success: true, route: updated });
  } catch (error) {
    console.error('Failed to update route:', error);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}

