'use server';

import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { ingestFrankfurterFx, ingestWorldBankMacro, ingestRbiMonetaryPolicy } from '@/lib/financial-data';
import { processDueJobs } from '@/lib/jobs-store';
import { revalidatePath } from 'next/cache';
import { logger } from '@/lib/logger';

export async function triggerManualFinancialIngest() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    throw new Error('Unauthorized');
  }

  logger.info('Admin triggered manual financial data ingestion', { adminId: user.id });

  const [fx, wb, rbi] = await Promise.allSettled([
    ingestFrankfurterFx(),
    ingestWorldBankMacro(),
    ingestRbiMonetaryPolicy(),
  ]);

  revalidatePath('/admin/system-health');
  revalidatePath('/data-freshness');
  revalidatePath('/financial-intelligence');

  return {
    success: true,
    at: new Date().toISOString(),
    results: {
      fx: fx.status === 'fulfilled' ? fx.value : { error: String(fx.reason) },
      worldBank: wb.status === 'fulfilled' ? wb.value : { error: String(wb.reason) },
      rbi: rbi.status === 'fulfilled' ? rbi.value : { error: String(rbi.reason) },
    },
  };
}

export async function triggerManualJobQueueDrain() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    throw new Error('Unauthorized');
  }

  logger.info('Admin triggered manual job queue drain', { adminId: user.id });

  const result = await processDueJobs(50);
  revalidatePath('/admin/system-health');

  return {
    success: true,
    at: new Date().toISOString(),
    ...result,
  };
}

