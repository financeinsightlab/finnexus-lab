'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SUBJECTS = [
  'Research Inquiry',
  'Financial Modelling',
  'Data Analytics Project',
  'Partnership / Collaboration',
  'Other',
];

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: '',
    organisation: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setForm((prev) => ({ ...prev, subject: service }));
    }
  }, [searchParams]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ important fix
        },
        body: JSON.stringify(form),
      });

      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-green-600 font-medium">✅ Message sent successfully</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-4">

      {/* Name */}
      <input
        id="name"
        name="name"
        placeholder="Name"
        className="input"
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        required
      />

      {/* Email */}
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        className="input"
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
        required
      />

      {/* Subject (FIXED ACCESSIBILITY) */}
      <div>
        <label htmlFor="subject" className="sr-only">
          Select subject
        </label>

        <select
          id="subject"
          name="subject"
          className="input"
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          required
        >
          <option value="">Select subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="input"
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        required
      />

      {/* Button */}
      <button className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-600 text-sm">❌ Something went wrong. Try again.</p>
      )}
    </form>
  );
}