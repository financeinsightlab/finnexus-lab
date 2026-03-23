'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setMsg('You are on the list. Welcome!');
        setEmail('');
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Try again.');
    }
  };

  if (status === 'success') {
    return <p className="text-green-400 text-sm">{msg}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-brand-teal transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-brand-teal text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-teal-700 disabled:opacity-60"
      >
        {status === 'loading' ? 'Joining...' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs">{msg}</p>}
    </form>
  );
}