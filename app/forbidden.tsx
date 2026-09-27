import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">403</p>
                <h1 className="mt-2 text-2xl font-extrabold text-brand-navy">Access denied</h1>
                <p className="mt-3 text-sm text-brand-slate">
                    Your account does not have permission to view this page.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90"
                >
                    Back home
                </Link>
            </div>
        </div>
    );
}
