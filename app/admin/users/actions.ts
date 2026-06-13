'use server';

import { PrismaClient, UserRole, SubscriptionStatus } from '@prisma/client';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Security wrapper ensuring ONLY an ADMIN can execute
async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized. You must have the ADMIN Role to execute this action.');
  }
}

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
    console.error('Failed to update user access:', error);
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
    console.error('Failed to update services:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

export async function deleteUser(userId: string) {
  await requireAdmin();

  try {
    const session = await auth();
    if (session?.user?.id === userId) {
      throw new Error('Cannot delete your own admin account.');
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to delete user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
