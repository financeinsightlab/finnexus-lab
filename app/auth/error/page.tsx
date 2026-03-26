// app/auth/error/page.tsx
import Link from 'next/link';

type ErrorPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const raw = searchParams?.error;
  const errorCode =
    typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined;

  const message =
    errorCode === 'OAuthCallback'
      ? 'Could not sign in with Google. Please try email instead.'
      : errorCode === 'OAuthAccountNotLinked'
        ? 'An account with this email already exists. Sign in with email.'
        : errorCode
          ? 'Something went wrong during sign in.'
          : 'Something went wrong during sign in.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-silver px-4 py-10">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-brand-navy">Sign in error</h1>
          <p className="mt-3 text-sm text-brand-slate">{message}</p>
        </div>

        <Link href="/auth/signin" className="btn btn-primary w-full justify-center mt-7">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

