import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { resolvePlan } from '@/lib/entitlements';
import {
  calculateStartupModel,
  type StartupInputs,
} from '@/lib/startup-financials-engine';

export async function POST(req: Request) {
  try {
    const session = await auth().catch(() => null);
    const plan = resolvePlan(session?.user as Parameters<typeof resolvePlan>[0]);
    const isPaid = plan === 'PRO' || plan === 'ELITE' || plan === 'ENTERPRISE';

    const body = await req.json();
    const inputs: StartupInputs = body.inputs;

    if (!inputs || typeof inputs.currentMonthlyRevenue !== 'number') {
      return NextResponse.json(
        { error: 'Invalid or missing startup inputs' },
        { status: 400 }
      );
    }

    const modelResult = calculateStartupModel(inputs);

    return NextResponse.json({
      success: true,
      result: modelResult,
      isPaid,
      userPlan: plan,
    });
  } catch (error) {
    console.error('Error generating startup financial model:', error);
    return NextResponse.json(
      { error: 'Internal server error while generating model' },
      { status: 500 }
    );
  }
}
