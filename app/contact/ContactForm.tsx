'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const SUBJECTS = [
  'Research Inquiry',
  'Financial Modelling',
  'Data Analytics Project',
  'Partnership / Collaboration',
  'Enterprise / Team Plan',
  'Support',
  'Other',
] as const;

const BUDGETS = [
  'Not sure yet',
  'Under ₹25,000',
  '₹25,000 – ₹1,00,000',
  '₹1,00,000 – ₹5,00,000',
  '₹5,00,000+',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  organisation: string;
  subject: string;
  budget: string;
  message: string;
  /** Honeypot — must stay empty. */
  website: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: '',
  email: '',
  organisation: '',
  subject: '',
  budget: '',
  message: '',
  website: '',
};

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:ring-2 dark:bg-[#0f1522] dark:text-white dark:placeholder:text-slate-500 ${invalid
    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60'
    : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 dark:border-white/10'
  }`;

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('service') ?? '';

  const startingState = useMemo<FormState>(
    () => ({ ...EMPTY, subject: SUBJECTS.includes(initialSubject as (typeof SUBJECTS)[number]) ? initialSubject : '' }),
    [initialSubject],
  );

  const [form, setForm] = useState<FormState>(startingState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (data: FormState): FormErrors => {
    const next: FormErrors = {};
    if (data.name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).';
    if (!EMAIL_RE.test(data.email.trim())) next.email = 'Please enter a valid email address.';
    if (!data.subject) next.subject = 'Please choose a topic.';
    if (data.message.trim().length < 20) next.message = 'Please add a little more detail (at least 20 characters).';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organisation: form.organisation.trim() || undefined,
          subject: form.subject,
          budget: form.budget || undefined,
          message: form.message.trim(),
          website: form.website,
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setServerError(payload?.error ?? 'We could not send your message. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm(EMPTY);
    } catch {
      setServerError('Network error — please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="card flex flex-col items-start gap-4 p-8 text-left" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-2xl">✅</span>
        <div>
          <h2 className="text-xl font-bold text-brand-navy dark:text-white">Message sent</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Thanks for reaching out. I'll get back to you within 24–48 hours. If it's urgent,
            email <a href="mailto:hello@kunwaranalytics.in" className="text-brand-teal underline">hello@kunwaranalytics.in</a>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>Name <span className="text-red-500">*</span></label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass(Boolean(errors.name))}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>Email <span className="text-red-500">*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass(Boolean(errors.email))}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Organisation */}
        <div>
          <label htmlFor="organisation" className={labelClass}>Organisation</label>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            placeholder="Company / institution (optional)"
            className={inputClass(false)}
            value={form.organisation}
            onChange={(e) => update('organisation', e.target.value)}
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className={labelClass}>Topic <span className="text-red-500">*</span></label>
          <select
            id="subject"
            name="subject"
            className={inputClass(Boolean(errors.subject))}
            value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            <option value="">Select a topic…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.subject && <p id="subject-error" className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
        </div>

        {/* Budget */}
        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelClass}>Budget range</label>
          <select
            id="budget"
            name="budget"
            className={inputClass(false)}
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="message" className={labelClass}>Message <span className="text-red-500">*</span></label>
          <span className="text-xs text-slate-400">{form.message.length}/5000</span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={7}
          maxLength={5000}
          placeholder="Tell me about your question, dataset, or project — scope, timeline and what a good outcome looks like."
          className={inputClass(Boolean(errors.message))}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from users, tempting to bots */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300" role="alert">
          {serverError ?? 'Please fix the highlighted fields and try again.'}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-400">
          By sending this you agree to our <a href="/privacy" className="underline hover:text-slate-600">privacy policy</a>.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>Send Message →</>
          )}
        </button>
      </div>
    </form>
  );
}
