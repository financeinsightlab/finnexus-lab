import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] min-w-0 w-full">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 w-full pt-20 lg:pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
