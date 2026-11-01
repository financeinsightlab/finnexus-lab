// app/api/admin/ai/credentials/[id]/test/route.ts — Live Credential Verification

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { aiCredentialManager } from '@/lib/ai/credential-manager';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: 'Missing credential ID' }, { status: 400 });
  }

  try {
    const result = await aiCredentialManager.testCredential(id);

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'TEST_CREDENTIAL',
        entityType: 'CREDENTIAL',
        entityId: id,
        details: {
          success: result.success,
          latencyMs: result.latencyMs,
          error: result.error,
        },
      },
    });

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Credential test failed:', error);
    return NextResponse.json({
      success: false,
      latencyMs: 0,
      error: error instanceof Error ? error.message : 'Test failed',
    }, { status: 500 });
  }
}

