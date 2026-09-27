import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">401</p>
                <h1 className="mt-2 text-2xl font-extrabold text-brand-navy">Sign in required</h1>
                <p className="mt-3 text-sm text-brand-slate">
                    You need to be signed in to view this page.
                </p>
                <Link
                    href="/auth/signin"
                    className="mt-6 inline-flex rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
}
