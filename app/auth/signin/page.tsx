// app/auth/signin/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';

type Mode = 'signin' | 'register';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = (await res.json().catch(() => null)) as
          | { success?: boolean; error?: string }
          | null;

        if (!res.ok || !data?.success) {
          setError(data?.error ?? 'Could not create account. Please try again.');
          return;
        }

        setMode('signin');
        setPassword('');
        return;
      }

      // Sign in
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-silver px-4 py-10">
      <div className="bg-white rounded-2xl p-8 md:p-10 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <div className="font-extrabold tracking-tight text-2xl text-brand-navy">FinNexusLab</div>
          <div className="text-sm text-brand-slate mt-1">Financial Intelligence Platform</div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode('signin');
            }}
            className={`pill ${mode === 'signin' ? 'pill-on' : 'pill-off'} w-full justify-center`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode('register');
            }}
            className={`pill ${mode === 'register' ? 'pill-on' : 'pill-off'} w-full justify-center`}
          >
            Create Account
          </button>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:bg-gray-50 transition-colors focus-ring"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.377 4.844-5.74 8.33-11.303 8.33-6.627 0-12-5.373-12-12 0-6.627 5.373-12 12-12 3.059 0 5.842 1.154 7.963 3.034l5.657-5.657C34.425 9.053 29.704 7 24 7 12.955 7 4 16.955 4 28c0 11.045 8.955 21 20 21 11.045 0 20-9.955 20-21 0-1.303-.138-2.567-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 16.108 19.081 13 24 13c3.059 0 5.842 1.154 7.963 3.034l5.657-5.657C34.425 9.053 29.704 7 24 7c-7.31 0-13.99 3.934-17.694 7.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 43c5.701 0 10.424-2.056 13.97-5.71l-6.476-4.742C29.897 34.323 27.226 35.5 24 35.5c-5.563 0-9.926-3.486-11.303-8.33l-6.571 4.819C8.01 39.066 15.689 43 24 43z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303c-.656 2.31-2.07 4.252-3.97 5.552l6.476 4.742C39.701 34.697 42 29.5 42 24c0-1.303-.138-2.567-.389-3.917z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</div>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' ? (
            <div>
              <label className="block text-sm font-semibold text-brand-navy mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Your name"
                autoComplete="name"
                disabled={loading}
              />
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@company.com"
              type="email"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-brand-navy mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Minimum 8 characters"
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              disabled={loading}
              required
            />
          </div>

          {error ? <p className="text-red-600 text-sm">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center"
          >
            {loading ? 'Please wait…' : mode === 'register' ? 'Create Account' : 'Sign In'}
          </button>

          <div className="pt-1 text-center">
            {mode === 'register' ? (
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="btn btn-ghost"
              >
                Already have an account? Sign In
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('register')}
                className="btn btn-ghost"
              >
                Create a new account
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-brand-teal hover:tracking-wider">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

