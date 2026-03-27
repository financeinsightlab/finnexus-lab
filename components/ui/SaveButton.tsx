'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SaveButtonProps {
  slug: string;
  type: 'research' | 'insight';
  title?: string;
}

export default function SaveButton({ slug, type, title = '' }: SaveButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/saved?slug=${slug}&type=${type}`)
        .then((res) => res.json())
        .then((data) => {
          setSaved(data.saved);
          setInitialCheckDone(true);
        })
        .catch(console.error);
    } else if (status === 'unauthenticated') {
      setInitialCheckDone(true); // Don't block UI if not auth'd
    }
  }, [status, slug, type]);

  const handleSave = async () => {
    if (status !== 'authenticated') {
      alert('Sign in to save articles');
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        await fetch('/api/saved', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, type }),
        });
        setSaved(false);
      } else {
        await fetch('/api/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, type, title }),
        });
        setSaved(true);
      }
    } catch (error) {
      console.error('Save error', error);
      alert('Failed to save. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render until we know the initial status, to prevent hydration mismatch/flicker
  if (!initialCheckDone && status === 'loading') {
    return (
      <button disabled className="flex items-center gap-1.5 text-sm font-medium transition-colors text-gray-400">
        <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
        saved ? 'text-brand-teal hover:text-teal-700' : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : saved ? (
        // Filled bookmark
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ) : (
        // Outline bookmark
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
