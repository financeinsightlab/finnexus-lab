'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

const BASE = 'https://kunwaranalytics.in';

export default function DataLabShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${BASE}/data-lab/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`, label: 'Share on X' },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, label: 'Share on LinkedIn' },
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${encodedUrl}`, label: 'Share on WhatsApp' },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-gray-500 mr-1">Share</span>
      {shareLinks.map(s => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cinema-cyan hover:border-cinema-cyan/40 transition text-sm font-semibold"
        >
          {s.name}
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cinema-cyan hover:border-cinema-cyan/40 transition"
      >
        {copied ? <Check className="w-4 h-4 text-cinema-aurora" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
