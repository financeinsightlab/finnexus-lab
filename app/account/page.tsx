import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AccountHub from '@/components/account/AccountHub';
import BreadcrumbNav from '@/components/hub-navigation/BreadcrumbNav';
import DashboardSubNav from '@/components/hub-navigation/DashboardSubNav';

export const metadata: Metadata = {
    title: 'Your account',
    description:
        'Manage your Kunwar Analytics profile, badges, notifications and developer API keys.',
    robots: { index: false, follow: false },
};

export default async function AccountPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/account');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background pt-16 pb-16">
            <DashboardSubNav currentTab="account" />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <BreadcrumbNav
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Account Profile' },
                    ]}
                />
            </div>
            <AccountHub />
        </div>
    );
}
