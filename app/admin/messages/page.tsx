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
    <div className="min-w-0 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-brand-navy rounded-3xl p-8 shadow-xl border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="section-label text-teal-400">Admin Inbox</span>
              <span className="inline-flex max-w-full items-center gap-1.5 break-all px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Mail className="w-3 h-3 shrink-0" /> kunwaranalytics@gmail.com
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2 leading-tight">
              Contact Form Inquiries
            </h1>
            <p className="text-slate-300 mt-2 max-w-xl text-sm">
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
        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#2D3748] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Inquiries</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">{stats.total}</p>
          <p className="text-xs text-slate-500 mt-1">Received from /contact</p>
        </div>

        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#2D3748] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Awaiting Reply</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-500 mt-3">{stats.unread}</p>
          <p className="text-xs text-slate-500 mt-1">Pending user replies</p>
        </div>

        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#2D3748] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Replies Saved</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-500 mt-3">{stats.replied}</p>
          <p className="text-xs text-slate-500 mt-1">In-app notifications may be sent; no email is sent</p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-gray-100 dark:bg-[#1A1F2E] rounded-xl border border-gray-200 dark:border-[#2D3748] self-start">
          <button
            onClick={() => setFilter('ALL')}
            className={`inline-flex min-h-11 items-center px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-[#0D6E6E] text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`inline-flex min-h-11 items-center px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'UNREAD'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Unread ({stats.unread})
          </button>
          <button
            onClick={() => setFilter('REPLIED')}
            className={`inline-flex min-h-11 items-center px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'REPLIED'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            Replied ({stats.replied})
          </button>
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sender, email, subject..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-[#2D3748] rounded-xl text-gray-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-200 dark:border-[#2D3748]">
            <RefreshCw className="w-8 h-8 text-[#0D6E6E] animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading inquiries from database...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-200 dark:border-[#2D3748]">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-[#0D6E6E] flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No inquiries found</h3>
            <p className="text-sm text-slate-500 mt-1">
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
                className="bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-200 dark:border-[#2D3748] p-6 shadow-sm transition-all hover:border-[#0D6E6E]/40"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md">
                      {inquiry.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words font-bold text-gray-900 dark:text-white text-base">
                          {inquiry.name}
                        </h3>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="break-all text-xs text-[#0D6E6E] hover:underline font-mono"
                        >
                          {inquiry.email}
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                        {inquiry.organisation && (
                          <span className="flex items-center gap-1 font-medium text-slate-400">
                            <Building className="w-3.5 h-3.5" /> {inquiry.organisation}
                          </span>
                        )}
                        {inquiry.budget && (
                          <span className="flex items-center gap-1 font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
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
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Replied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5 animate-pulse" /> New / Unread
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject badge and message content */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 space-y-2">
                  <div className="inline-block max-w-full break-words px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Subject: {inquiry.subject}
                  </div>
                  <div className="break-words p-4 rounded-xl bg-gray-50 dark:bg-[#121622] text-sm text-gray-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed border border-gray-200 dark:border-white/5">
                    {inquiry.message}
                  </div>
                </div>

                {/* If already replied, display the reply thread */}
                {isReplied && inquiry.replyText && (
                  <div className="mt-4 p-4 rounded-xl bg-teal-500/5 border border-teal-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Admin Reply (Dispatched via kunwaranalytics@gmail.com):
                      </span>
                      {inquiry.repliedAt && (
                        <span className="text-slate-500">
                          {new Date(inquiry.repliedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="break-words text-sm text-slate-300 whitespace-pre-wrap">
                      {inquiry.replyText}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="min-w-0 break-all text-xs text-slate-500">
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
                    className={`flex min-h-11 items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isReplying
                        ? 'bg-slate-700 text-white'
                        : isReplied
                        ? 'bg-white/5 hover:bg-white/10 text-slate-300'
                        : 'bg-[#0D6E6E] hover:bg-[#0b5c5c] text-white shadow-md'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {isReplying ? 'Close Reply Box' : isReplied ? 'Send Another Reply' : 'Reply & Notify User'}
                  </button>
                </div>

                {/* Inline Reply Composer */}
                {isReplying && (
                  <div className="mt-5 p-5 rounded-2xl bg-gray-50 dark:bg-[#121622] border border-[#0D6E6E]/40 space-y-4 anim-fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="min-w-0 break-words text-sm font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                        <Send className="w-4 h-4 text-[#0D6E6E]" />
                        Compose Reply to {inquiry.name} ({inquiry.email})
                      </h4>
                      <span className="text-xs text-slate-400">
                        From: <strong className="text-teal-400">kunwaranalytics@gmail.com</strong>
                      </span>
                    </div>

                    {/* Quick Response Templates */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Quick Templates:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {TEMPLATES.map((tmpl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyTemplate(tmpl.text, inquiry)}
                            className="px-3 py-1 rounded-lg text-xs bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/10 hover:border-[#0D6E6E] text-slate-700 dark:text-slate-300 font-medium transition-all"
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
                      className="w-full p-4 text-sm bg-white dark:bg-[#1A1F2E] border border-gray-200 dark:border-[#2D3748] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] font-sans leading-relaxed"
                    />

                    {notificationStatus && notificationStatus.id === inquiry.id && (
                      <div className="break-words p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        {notificationStatus.message}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveReplyId(null)}
                        className="inline-flex min-h-11 items-center px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={sendingReply || !replyText.trim()}
                        onClick={() => handleSendReply(inquiry)}
                        className="flex min-h-11 max-w-full items-center justify-center gap-2 whitespace-normal px-4 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#0b5c5c] text-white font-bold text-xs shadow-lg transition-all disabled:opacity-50"
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
