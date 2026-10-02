'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export interface TocItem { id: string; text: string; level: number }

export default function DataLabToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
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
    <nav className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
        <List className="h-4 w-4" /> On this page
      </div>
      <ul className="space-y-2.5">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-snug transition-colors ${
                item.level === 2 ? 'font-medium' : 'pl-4'
              } ${active === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
