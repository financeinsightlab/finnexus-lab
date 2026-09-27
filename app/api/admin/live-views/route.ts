import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorizeApi } from '@/lib/auth-guards';
import { ADMIN_ROLES } from '@/lib/auth-guards';

export async function GET() {
  const authz = await authorizeApi(ADMIN_ROLES);
  if (!authz.ok) return authz.response;

  const views = await prisma.pageView.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });

  const userIds = [...new Set(views.map((v) => v.userId).filter((id): id is string => Boolean(id)))];
  const usersMap: Record<string, { name: string | null; email: string | null }> = {};
  if (userIds.length > 0) {
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    users.forEach((u) => {
      usersMap[u.id] = { name: u.name, email: u.email };
    });
  }

  const formatted = views.map((v) => ({
    id: v.id,
    path: v.path,
    userId: v.userId,
    sessionId: v.sessionId,
    durationMs: v.durationMs,
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
    userName: v.userId ? usersMap[v.userId]?.name ?? null : null,
    userEmail: v.userId ? usersMap[v.userId]?.email ?? null : null,
  }));

  return NextResponse.json({ views: formatted });
}
