// app/api/admin/ai/overview/route.ts — AI Control Center System Telemetry & Overview

import { NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { isGlobalAiKillSwitchActive } from '@/lib/ai/gateway';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized — Staff access required' }, { status: 403 });
  }

  try {
    const [
      totalRequests,
      successRequests,
      errorRequests,
      fallbackRequests,
      recentLogs,
      providers,
      credentials,
      knowledgeDocsCount,
      knowledgeChunksCount,
    ] = await Promise.all([
      prisma.aIUsageLog.count(),
      prisma.aIUsageLog.count({ where: { status: 'SUCCESS' } }),
      prisma.aIUsageLog.count({ where: { status: 'ERROR' } }),
      prisma.aIUsageLog.count({ where: { fallbackUsed: true } }),
      prisma.aIUsageLog.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.aIProviderConfig.findMany({
        include: {
          credentials: {
            select: {
              id: true,
              label: true,
              maskedKey: true,
              enabled: true,
              status: true,
              priority: true,
              lastTestedAt: true,
              lastUsedAt: true,
              lastErrorCode: true,
              totalRequests: true,
              totalSuccess: true,
              totalErrors: true,
            },
          },
        },
      }),
      prisma.aIProviderCredential.findMany({
        select: { id: true, enabled: true, status: true },
      }),
      prisma.knowledgeDocument.count(),
      prisma.knowledgeChunk.count(),
    ]);

    const activeProvidersCount = providers.filter((p) => p.enabled).length;
    const activeCredentialsCount = credentials.filter((c) => c.enabled && c.status === 'ACTIVE').length;

    // Calculate average latency from recent 50 logs
    const avgLatency =
      recentLogs.length > 0
        ? Math.round(
            recentLogs.reduce((acc, log) => acc + log.latencyMs, 0) / recentLogs.length
          )
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalRequests,
        successRequests,
        errorRequests,
        fallbackRequests,
        avgLatencyMs: avgLatency,
        activeProvidersCount,
        totalProvidersCount: providers.length,
        activeCredentialsCount,
        totalCredentialsCount: credentials.length,
        knowledgeDocsCount,
        knowledgeChunksCount,
        killSwitchActive: isGlobalAiKillSwitchActive(),
        providers,
        recentLogs,
      },
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('Failed to load AI overview:', error);
    return NextResponse.json({ error: 'Failed to load AI overview metrics' }, { status: 500 });
  }
}

