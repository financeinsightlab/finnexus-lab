import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">403</p>
                <h1 className="mt-2 text-2xl font-extrabold text-content-primary">Access denied</h1>
                <p className="mt-3 text-sm text-content-secondary">
                    Your account does not have permission to view this page.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                    Back home
                </Link>
            </div>
        </div>
    );
}
