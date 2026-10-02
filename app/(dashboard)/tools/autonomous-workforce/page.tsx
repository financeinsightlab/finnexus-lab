import AutonomousWorkforceCalc from '@/components/calculators/AutonomousWorkforceCalc';
import { auth } from '@/auth';
import { hasPremiumAccess } from '@/lib/utils';
import Paywall from '@/components/premium/Paywall';

export default async function AutonomousWorkforcePage() {
  const session = await auth();
  const isPremiumUser = hasPremiumAccess(session?.user || {});

  if (!isPremiumUser) {
    return (
      <div className="mx-auto min-h-screen max-w-5xl bg-surface px-6 py-16 text-content-primary">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Premium financial tool</p>
        <h1 className="mt-3 text-3xl font-extrabold">Autonomous Workforce Restructuring Simulator</h1>
        <Paywall user={session?.user} minimumPlan="PRO" preview={<p className="mt-3 text-slate-300">Model the EBITDA and valuation impact of autonomous-agent workforce scenarios.</p>}>
          {null}
        </Paywall>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <AutonomousWorkforceCalc slug="autonomous-workforce-simulator" isPremiumUser />
    </div>
  );
}
