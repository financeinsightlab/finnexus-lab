import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ taskId: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { taskId } = await params;
    const body = await req.json();
    const { completed } = body;

    const task = await prisma.studyTask.findUnique({
      where: { id: taskId },
      include: { plan: true },
    });
    if (!task || task.plan.userId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const updated = await prisma.studyTask.update({
      where: { id: taskId },
      data: {
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error('Study task update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}