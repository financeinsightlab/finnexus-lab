import AutonomousWorkforceCalc from '@/components/calculators/AutonomousWorkforceCalc';
import { auth } from '@/auth';
import { hasPremiumAccess } from '@/lib/utils';

export default async function AutonomousWorkforcePage() {
  const session = await auth();
  const isPremiumUser = hasPremiumAccess(session?.user || {});

  return (
    <div className="pt-16 min-h-screen bg-[#0a0a0f]">
      <AutonomousWorkforceCalc slug="autonomous-workforce-simulator" isPremiumUser={isPremiumUser} />
    </div>
  );
}
