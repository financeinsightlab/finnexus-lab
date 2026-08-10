import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full">
      {session && <DashboardSidebar />}
      <main className="flex-1 w-full overflow-x-hidden pt-20 lg:pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
