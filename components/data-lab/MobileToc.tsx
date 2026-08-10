'use client';

import { useEffect, useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import type { TocItem } from './DataLabToc';

export default function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="lg:hidden glass-cinema rounded-2xl border border-white/10 overflow-hidden mb-6">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 text-cinema-cyan text-sm font-semibold uppercase tracking-widest">
          <List className="w-4 h-4" /> On this page
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="px-5 pb-5 space-y-2.5 border-t border-white/10 pt-3">
          {items.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block text-sm leading-snug transition-colors ${
                  item.level === 2 ? 'font-medium' : 'pl-4'
                } ${active === item.id ? 'text-cinema-cyan' : 'text-gray-400 hover:text-white'}`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
