'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { resolvePrediction, createPrediction } from '@/lib/predictions';
import type { PredictionStatus } from '@prisma/client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}


async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');
  return session;
}

async function requireAdminOrAnalyst() {
  const session = await auth();
  const userRole = session?.user?.role as string;
  if (!session?.user) redirect('/auth/signin');
  if (!['ADMIN', 'ANALYST'].includes(userRole)) redirect('/');
  return session;
}

export async function resolvePredictionAction(formData: FormData) {
  await requireAdmin();

  const id     = formData.get('id') as string;
  const status = formData.get('status') as PredictionStatus;
  const note   = (formData.get('note') as string) || undefined;

  if (!id || !status) return;

  await resolvePrediction(id, status, note);
  revalidatePath('/admin/predictions');
  revalidatePath('/predictions');
}

export async function createPredictionAction(formData: FormData) {
  const session = await requireAdminOrAnalyst();

  const claim       = (formData.get('claim') as string)?.trim();
  const sector      = (formData.get('sector') as string)?.trim();
  const resolveDate = formData.get('resolveDate') as string;
  const reportSlug  = (formData.get('reportSlug') as string) || undefined;

  if (!claim || !sector || !resolveDate) return;

  const slug = `${slugify(claim).slice(0, 40)}-${Date.now()}`;

  // Fix for Local Dev: Ensure user exists in DB to prevent Foreign Key Constraint errors 
  // if database was wiped but browser JWT is still active.
  let validAuthorId = session.user.id!;
  const existingUser = await prisma.user.findUnique({ where: { id: validAuthorId } });
  if (!existingUser) {
    console.warn("Cached session ID not found in database. Creating emergency dev user.");
    await prisma.user.create({
      data: {
        id: validAuthorId,
        email: `dev-${validAuthorId}@finnexus.com`,
        name: 'Admin Developer',
        role: 'ADMIN'
      }
    });
  }

  await createPrediction({
    slug,
    authorId:    validAuthorId,
    claim,
    sector,
    resolveDate: new Date(resolveDate),
    reportSlug,
  });

  revalidatePath('/admin/predictions');
  revalidatePath('/predictions');
}

export async function deletePredictionAction(formData: FormData) {
  const session = await requireAdminOrAnalyst();
  const id = formData.get('id') as string;
  if (!id) return;

  const existingPrediction = await prisma.prediction.findUnique({ where: { id } });
  if (!existingPrediction) return;
  
  if ((session.user.role as string) === 'ANALYST' && existingPrediction.authorId !== session.user.id) {
    throw new Error("You can only delete your own predictions.");
  }

  const { deletePrediction } = await import('@/lib/predictions');
  await deletePrediction(id);
  
  revalidatePath('/admin/predictions');
  revalidatePath('/predictions');
}

export async function updatePredictionAction(formData: FormData) {
  const session = await requireAdminOrAnalyst();
  const id          = formData.get('id') as string;
  const claim       = (formData.get('claim') as string)?.trim();
  const sector      = (formData.get('sector') as string)?.trim();
  const resolveDate = formData.get('resolveDate') as string;
  const reportSlug  = (formData.get('reportSlug') as string) || undefined;

  if (!id || !claim || !sector || !resolveDate) return;

  const existingPrediction = await prisma.prediction.findUnique({ where: { id } });
  if (!existingPrediction) return;
  
  if ((session.user.role as string) === 'ANALYST' && existingPrediction.authorId !== session.user.id) {
    throw new Error("You can only edit your own predictions.");
  }

  const { updatePrediction } = await import('@/lib/predictions');
  await updatePrediction(id, {
    claim,
    sector,
    resolveDate: new Date(resolveDate),
    reportSlug,
  });
  
  revalidatePath('/admin/predictions');
  revalidatePath('/predictions');
}
