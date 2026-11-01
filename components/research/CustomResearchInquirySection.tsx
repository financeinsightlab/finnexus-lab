'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Building2, Briefcase, Clock, FileText, ArrowRight } from 'lucide-react';

const DELIVERABLES = [
  'Sector Deep-Dive & Market Architecture',
  'Bespoke DCF & 3-Statement Financial Model',
  'Competitor Benchmarking & KPI Matrix',
  'Dark Store / Unit Economics Teardown',
  'India Market-Entry & Regulatory Assessment',
  'Commercial Due Diligence & M&A Analysis',
  'Other Bespoke Research',
];

const BUDGET_RANGES = [
  'Under ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000+',
  'To Be Defined / Hourly Retainer',
];

interface Props {
  initialSubject?: string;
  className?: string;
}

export default function CustomResearchInquirySection({ initialSubject = '', className = '' }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [deliverable, setDeliverable] = useState(DELIVERABLES[0]);
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields (Name, Email, and Project Details).');
      return;
    }

    if (message.trim().length < 20) {
      setError('Please provide at least 20 characters of detail regarding your research requirements.');
      return;
    }

    setLoading(true);

    try {
      const subject = initialSubject
        ? `Custom Research Inquiry: ${initialSubject} (${deliverable})`
        : `Custom Research Commission: ${deliverable}`;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organisation: organisation.trim() || undefined,
          subject,
          budget,
          message: `[DELIVERABLE REQUESTED]: ${deliverable}\n[ORGANISATION]: ${organisation.trim() || 'N/A'}\n[INDICATIVE BUDGET]: ${budget}\n\n[REQUIREMENTS DETAILS]:\n${message.trim()}`,
          website, // Honeypot
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom-research" className={`rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20 mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Institutional Advisory &amp; Modeling
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight">
            Commission Custom Financial Research
          </h2>
          <p className="mt-2 text-sm text-content-muted leading-relaxed">
            Engage our research desk for bespoke sector teardowns, proprietary DCF &amp; 3-statement models, competitor benchmarking, and due diligence memos.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center max-w-xl mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-content-primary mb-2">
              Research Inquiry Received
            </h3>
            <p className="text-xs sm:text-sm text-content-muted leading-relaxed mb-6">
              Thank you, <strong className="text-content-primary">{name}</strong>. Our institutional research desk has logged your scoping inquiry. We will evaluate requirements and return an initial delivery framework and quotation within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="px-5 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-content-primary hover:bg-surface-muted transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Honeypot hidden input */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Aditya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Corporate / Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@fund-or-company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Organisation / Fund (Optional)
                </label>
                <input
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  placeholder="e.g., Horizon Capital / Apex Mobility"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Target Scope / Deliverable *
                </label>
                <select
                  value={deliverable}
                  onChange={(e) => setDeliverable(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  {DELIVERABLES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Indicative Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  Expected Timeline
                </label>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-muted text-xs text-content-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand" /> Standard Delivery: 7–14 Business Days
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-primary mb-1.5">
                Research Requirements &amp; Specific Focus Areas *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your research objective, companies/sectors to cover, key hypotheses, or specific financial model outputs required..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-surface text-xs text-content-primary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand leading-relaxed"
              />
              <span className="text-[11px] text-content-muted mt-1 block">
                Minimum 20 characters. All client information is held under strict professional confidentiality.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-content-muted">
                🛡️ Scoped and delivered by Kunwar Analytics Research Desk.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting Inquiry...' : 'Submit Custom Research Proposal'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

