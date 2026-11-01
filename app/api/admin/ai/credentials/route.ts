// app/api/admin/ai/credentials/route.ts — Credential Management API (Encrypted Server-Side)

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { aiCredentialManager } from '@/lib/ai/credential-manager';

export const dynamic = 'force-dynamic';

const addCredentialSchema = z.object({
  providerId: z.enum(['gemini', 'groq']),
  label: z.string().min(2).max(100),
  apiKey: z.string().min(5).max(300),
  priority: z.number().int().min(1).max(10).default(1),
  requestLimitPerMinute: z.number().int().min(5).max(1000).default(60),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const credentials = await prisma.aIProviderCredential.findMany({
      include: {
        provider: {
          select: { provider: true, label: true, enabled: true },
        },
      },
      orderBy: [{ provider: { priority: 'asc' } }, { priority: 'asc' }],
    });

    // Strip sensitive fields (encryptedSecret, nonce, authTag)
    const safeCredentials = credentials.map((c) => ({
      id: c.id,
      providerId: c.provider.provider,
      providerLabel: c.provider.label,
      label: c.label,
      maskedKey: c.maskedKey,
      priority: c.priority,
      enabled: c.enabled,
      status: c.status,
      requestLimitPerMinute: c.requestLimitPerMinute,
      lastTestedAt: c.lastTestedAt,
      lastUsedAt: c.lastUsedAt,
      lastErrorCode: c.lastErrorCode,
      totalRequests: c.totalRequests,
      totalSuccess: c.totalSuccess,
      totalErrors: c.totalErrors,
      createdAt: c.createdAt,
    }));

    return NextResponse.json({ success: true, credentials: safeCredentials }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Failed to list credentials:', error);
    return NextResponse.json({ error: 'Failed to retrieve credentials' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = addCredentialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 400 });
    }

    const { providerId, label, apiKey, priority, requestLimitPerMinute } = parsed.data;

    const result = await aiCredentialManager.addCredential({
      providerId,
      label,
      apiKey,
      priority,
      requestLimitPerMinute,
    });

    // Record admin audit log without secret
    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'ADD_CREDENTIAL',
        entityType: 'CREDENTIAL',
        entityId: result.id,
        details: {
          providerId,
          label: result.label,
          maskedKey: result.maskedKey,
          priority,
        },
      },
    });

    return NextResponse.json({
      success: true,
      credential: {
        id: result.id,
        label: result.label,
        maskedKey: result.maskedKey,
      },
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Failed to add credential:', error);
    return NextResponse.json({ error: 'Failed to securely store credential' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing credential ID' }, { status: 400 });
  }

  try {
    await aiCredentialManager.deleteCredential(id);

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'DELETE_CREDENTIAL',
        entityType: 'CREDENTIAL',
        entityId: id,
      },
    });

    return NextResponse.json({ success: true, message: 'Credential safely deleted' });
  } catch (error) {
    console.error('Failed to delete credential:', error);
    return NextResponse.json({ error: 'Failed to delete credential' }, { status: 500 });
  }
}

