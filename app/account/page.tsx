import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AccountHub from '@/components/account/AccountHub';

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
        <div className="min-h-screen bg-slate-50 dark:bg-background pt-20 pb-16">
            <AccountHub />
        </div>
    );
}
