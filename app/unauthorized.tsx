import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">401</p>
                <h1 className="mt-2 text-2xl font-extrabold text-content-primary">Sign in required</h1>
                <p className="mt-3 text-sm text-content-secondary">
                    You need to be signed in to view this page.
                </p>
                <Link
                    href="/auth/signin"
                    className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
}
