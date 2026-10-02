import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full">
      <DashboardSidebar />
      <main className="flex-1 w-full overflow-x-hidden pt-20 lg:pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
