'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch current user data
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          setName(data.name || '');
          setEmail(data.email || '');
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrap py-10">
      <div className="mx-auto max-w-md rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-brand-navy">Edit Profile</h1>
          <p className="text-brand-slate mt-2">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-error/30 bg-error-muted p-4 text-sm text-error" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-success/30 bg-success-muted p-4 text-sm text-success" role="status">
              {success}
            </div>
          )}

          <div>
            <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-content-primary">
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-content-primary">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
            <Link
              href="/dashboard"
              className="btn-secondary flex-1"
            >
              Cancel
            </Link>
          </div>
        </form>

        <div className="mt-10 text-sm text-brand-slate">
          <p>Note: Changing your email may affect your login.</p>
        </div>
      </div>
    </div>
  );
}