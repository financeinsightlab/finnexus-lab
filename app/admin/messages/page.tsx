// app/admin/messages/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Building,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Inbox,
} from 'lucide-react';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  organisation?: string | null;
  subject: string;
  budget?: string | null;
  message: string;
  status: 'UNREAD' | 'REPLIED' | 'ARCHIVED';
  replyText?: string | null;
  repliedAt?: string | null;
  repliedBy?: string | null;
  createdAt: string;
}

const TEMPLATES = [
  {
    label: 'Standard Acknowledgement',
    text: `Hi {name},\n\nThank you for reaching out to Kunwar Analytics! We have received your inquiry regarding "{subject}".\n\nOur research and analysis desk has logged your request, and we will get back to you with detailed notes shortly.\n\nBest regards,\nKunwar Analytics Research Desk\nkunwaranalytics@gmail.com`,
  },
  {
    label: 'Schedule Scoping Call',
    text: `Hi {name},\n\nThank you for contacting Kunwar Analytics. We would be delighted to discuss your requirements regarding "{subject}".\n\nCould you please let us know your availability over the next few business days for a brief 15-minute scoping call?\n\nLooking forward to speaking with you.\n\nWarm regards,\nKunwar Analytics Desk\nkunwaranalytics@gmail.com`,
  },
  {
    label: 'Custom Models & Enterprise Quote',
    text: `Hi {name},\n\nThank you for reaching out about our institutional financial models and analytics services. Based on your note regarding "{subject}", we can configure a tailored research engagement and model delivery timeline.\n\nPlease let us know if you have specific company tickers or sectors in scope.\n\nBest regards,\nKunwar Analytics Team\nkunwaranalytics@gmail.com`,
  },
];

export default function AdminMessagesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'REPLIED'>('ALL');
  const [search, setSearch] = useState('');

  // Active reply composer
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<{ id: string; message: string } | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setStats(data.stats || { total: 0, unread: 0, replied: 0 });
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStartReply = (inquiry: ContactInquiry) => {
    setActiveReplyId(inquiry.id);
    const template = TEMPLATES[0].text
      .replace('{name}', inquiry.name || 'there')
      .replace('{subject}', inquiry.subject || 'your inquiry');
    setReplyText(template);
    setNotificationStatus(null);
  };

  const applyTemplate = (templateText: string, inquiry: ContactInquiry) => {
    const formatted = templateText
      .replace('{name}', inquiry.name || 'there')
      .replace('{subject}', inquiry.subject || 'your inquiry');
    setReplyText(formatted);
  };

  const handleSendReply = async (inquiry: ContactInquiry) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await fetch('/api/admin/inquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: inquiry.id,
          replyText: replyText.trim(),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setNotificationStatus({
          id: inquiry.id,
          message: result.message || 'Reply saved. Email delivery is not configured.',
        });

        // Update list locally
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === inquiry.id
              ? {
                  ...item,
                  status: 'REPLIED',
                  replyText: replyText.trim(),
                  repliedAt: new Date().toISOString(),
                }
              : item
          )
        );
        setStats((prev) => ({
          ...prev,
          unread: Math.max(0, prev.unread - 1),
          replied: prev.replied + 1,
        }));

        setTimeout(() => {
          setActiveReplyId(null);
          setReplyText('');
        }, 1500);
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to submit reply');
      }
    } catch (err) {
      alert('Network error while sending reply');
    } finally {
      setSendingReply(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (filter === 'UNREAD' && item.status !== 'UNREAD') return false;
    if (filter === 'REPLIED' && item.status !== 'REPLIED') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchEmail = item.email?.toLowerCase().includes(q);
      const matchSubject = item.subject?.toLowerCase().includes(q);
      const matchMsg = item.message?.toLowerCase().includes(q);
      return matchName || matchEmail || matchSubject || matchMsg;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 shadow-xl border border-border-subtle">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-label text-brand">Admin Inbox</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand/20 text-brand border border-brand/30">
                <Mail className="w-3 h-3" /> kunwaranalytics@gmail.com
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2 leading-tight">
              Contact Form Inquiries
            </h1>
            <p className="text-content-secondary mt-2 max-w-xl text-sm">
              Contact-form messages appear here. Replies are saved and may trigger an in-app notification for registered users; email delivery is not configured, so replies are not emailed.
            </p>
          </div>

          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Messages
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-content-muted">Total Inquiries</span>
            <div className="p-2.5 rounded-xl bg-info-muted text-info">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-content-primary mt-3">{stats.total}</p>
          <p className="text-xs text-content-muted mt-1">Received from /contact</p>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-warning">Awaiting Reply</span>
            <div className="p-2.5 rounded-xl bg-warning-muted text-warning">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-warning mt-3">{stats.unread}</p>
          <p className="text-xs text-content-muted mt-1">Pending user replies</p>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-success">Replies Saved</span>
            <div className="p-2.5 rounded-xl bg-success-muted text-success">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-success mt-3">{stats.replied}</p>
          <p className="text-xs text-content-muted mt-1">In-app notifications may be sent; no email is sent</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-surface-muted rounded-xl border border-border self-start">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-primary text-primary-foreground shadow'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'UNREAD'
                ? 'bg-warning text-content-inverse shadow'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Unread ({stats.unread})
          </button>
          <button
            onClick={() => setFilter('REPLIED')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'REPLIED'
                ? 'bg-success text-content-inverse shadow'
                : 'text-content-muted hover:text-content-primary'
            }`}
          >
            Replied ({stats.replied})
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-content-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sender, email, subject..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-border rounded-xl text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-surface rounded-2xl border border-border">
            <RefreshCw className="w-8 h-8 text-brand animate-spin mx-auto mb-3" />
            <p className="text-sm text-content-muted">Loading inquiries from database...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-16 text-center bg-surface rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-2xl bg-brand-muted text-brand flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-content-primary">No inquiries found</h3>
            <p className="text-sm text-content-muted mt-1">
              {search ? 'Try modifying your search keywords.' : 'When someone fills the contact form, it will show up here.'}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => {
            const isReplying = activeReplyId === inquiry.id;
            const isReplied = inquiry.status === 'REPLIED';

            return (
              <div
                key={inquiry.id}
                className="bg-surface rounded-2xl border border-border p-6 shadow-sm transition-all hover:border-brand/40"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-primary-foreground font-bold text-base flex-shrink-0 shadow-md">
                      {inquiry.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-content-primary text-base">
                          {inquiry.name}
                        </h3>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-xs text-brand hover:underline font-mono"
                        >
                          {inquiry.email}
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-content-muted">
                        {inquiry.organisation && (
                          <span className="flex items-center gap-1 font-medium text-content-secondary">
                            <Building className="w-3.5 h-3.5" /> {inquiry.organisation}
                          </span>
                        )}
                        {inquiry.budget && (
                          <span className="flex items-center gap-1 font-medium text-success bg-success-muted px-2 py-0.5 rounded-md">
                            <DollarSign className="w-3 h-3" /> Budget: {inquiry.budget}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(inquiry.createdAt).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3 self-start">
                    {isReplied ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success-muted text-success border border-success/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Replied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-warning-muted text-warning border border-warning/20">
                        <Clock className="w-3.5 h-3.5 animate-pulse" /> New / Unread
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject badge and message content */}
                <div className="mt-4 pt-4 border-t border-border-subtle space-y-2">
                  <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-info-muted text-info border border-info/20">
                    Subject: {inquiry.subject}
                  </div>
                  <div className="p-4 rounded-xl bg-surface-muted text-sm text-content-secondary whitespace-pre-wrap leading-relaxed border border-border-subtle">
                    {inquiry.message}
                  </div>
                </div>

                {/* If already replied, display the reply thread */}
                {isReplied && inquiry.replyText && (
                  <div className="mt-4 p-4 rounded-xl bg-brand-muted/60 border border-brand/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Admin Reply (Dispatched via kunwaranalytics@gmail.com):
                      </span>
                      {inquiry.repliedAt && (
                        <span className="text-content-muted">
                          {new Date(inquiry.repliedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-content-secondary whitespace-pre-wrap">
                      {inquiry.replyText}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="text-xs text-content-muted">
                    ID: <span className="font-mono text-[10px]">{inquiry.id}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (isReplying) {
                        setActiveReplyId(null);
                      } else {
                        handleStartReply(inquiry);
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isReplying
                        ? 'bg-surface-muted text-content-primary'
                        : isReplied
                        ? 'bg-surface-muted hover:bg-accent text-content-secondary'
                        : 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-md'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {isReplying ? 'Close Reply Box' : isReplied ? 'Send Another Reply' : 'Reply & Notify User'}
                  </button>
                </div>

                {/* Inline Reply Composer */}
                {isReplying && (
                  <div className="mt-5 p-5 rounded-2xl bg-surface-muted border border-brand/40 space-y-4 anim-fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-content-primary flex items-center gap-2">
                        <Send className="w-4 h-4 text-brand" />
                        Compose Reply to {inquiry.name} ({inquiry.email})
                      </h4>
                      <span className="text-xs text-content-secondary">
                        From: <strong className="text-brand">kunwaranalytics@gmail.com</strong>
                      </span>
                    </div>

                    {/* Quick Response Templates */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-content-muted uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-warning" /> Quick Templates:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {TEMPLATES.map((tmpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyTemplate(tmpl.text, inquiry)}
                            className="px-3 py-1 rounded-lg text-xs bg-surface border border-border hover:border-brand text-content-primary font-medium transition-all"
                          >
                            {tmpl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={6}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply message here..."
                      className="w-full p-4 text-sm bg-surface border border-border rounded-xl text-content-primary focus:outline-none focus:ring-2 focus:ring-brand font-sans leading-relaxed"
                    />

                    {notificationStatus && notificationStatus.id === inquiry.id && (
                      <div className="p-3 rounded-xl bg-success-muted border border-success/20 text-success text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        {notificationStatus.message}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveReplyId(null)}
                        className="px-4 py-2 text-xs font-semibold text-content-secondary hover:text-content-primary transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={sendingReply || !replyText.trim()}
                        onClick={() => handleSendReply(inquiry)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-xs shadow-lg transition-all disabled:opacity-50"
                      >
                        {sendingReply ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Dispatching Notification...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Send Reply & Notify User
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
