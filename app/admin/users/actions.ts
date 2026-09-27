'use server';

import { UserRole, SubscriptionStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guards';
import { revalidatePath } from 'next/cache';
import { logger } from '@/lib/logger';

export async function updateUserAccess(
  userId: string,
  role: UserRole,
  subscriptionStatus: string,
  subscriptionPlan: string
) {
  await requireAdmin();

  try {
    // Define premium plans
    const premiumPlans = ['PRO', 'ELITE', 'TEAM', 'PROFESSIONAL', 'ENTERPRISE', 'API_ONLY'];
    const isPremiumPlan = premiumPlans.includes(subscriptionPlan);

    // If user is given a premium plan, automatically set status to ACTIVE
    const finalStatus = (isPremiumPlan ? 'ACTIVE' : subscriptionStatus) as SubscriptionStatus;

    await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        subscriptionStatus: finalStatus,
        subscriptionPlan: subscriptionPlan === 'NULL' ? null : subscriptionPlan,
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to update user access', {
      error: error instanceof Error ? error.message : String(error),
    });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

export async function updatePurchasedServices(userId: string, services: string[]) {
  await requireAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        purchasedServices: services,
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to update services', {
      error: error instanceof Error ? error.message : String(error),
    });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

export async function deleteUser(userId: string) {
  await requireAdmin();

  try {
    const { getCurrentUser } = await import('@/lib/auth-guards');
    const currentUser = await getCurrentUser();
    if (currentUser?.id === userId) {
      throw new Error('Cannot delete your own admin account.');
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    logger.error('Failed to delete user', {
      error: error instanceof Error ? error.message : String(error),
    });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
