// app/api/admin/ai/credentials/[id]/toggle/route.ts — Enable/Disable/Cooldown Credential

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { aiCredentialManager } from '@/lib/ai/credential-manager';

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
  const body = await req.json().catch(() => ({}));
  const { enabled, cooldownSeconds } = body;

  try {
    if (typeof cooldownSeconds === 'number' && cooldownSeconds > 0) {
      await aiCredentialManager.setCooldown(id, cooldownSeconds);
      return NextResponse.json({ success: true, message: `Cooldown applied for ${cooldownSeconds}s` });
    }

    if (typeof enabled === 'boolean') {
      const updated = await prisma.aIProviderCredential.update({
        where: { id },
        data: {
          enabled,
          status: enabled ? 'ACTIVE' : 'DISABLED',
        },
      });

      await prisma.aIAdminAuditLog.create({
        data: {
          adminEmail: user.email || 'staff@kunwaranalytics.in',
          action: enabled ? 'ENABLE_CREDENTIAL' : 'DISABLE_CREDENTIAL',
          entityType: 'CREDENTIAL',
          entityId: id,
        },
      });

      return NextResponse.json({ success: true, enabled: updated.enabled, status: updated.status });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (error) {
    console.error('Failed to update credential status:', error);
    return NextResponse.json({ error: 'Failed to update credential' }, { status: 500 });
  }
}

