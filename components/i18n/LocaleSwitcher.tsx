'use client';

// components/i18n/LocaleSwitcher.tsx — lightweight locale selector (Pillar F2)

import { useEffect, useRef, useState } from 'react';
import {
    LOCALES,
    LOCALE_FLAGS,
    LOCALE_LABELS,
    type Locale,
} from '@/lib/i18n/config';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function LocaleSwitcher({ className = '' }: { className?: string }) {
    const { locale, setLocale } = useLocale();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [open]);

    const choose = (next: Locale) => {
        setLocale(next);
        setOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-content-secondary hover:text-content-primary hover:bg-accent transition-all duration-200 text-sm font-medium border border-transparent hover:border-border-strong min-h-[40px]"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Change language"
            >
                <span aria-hidden>{LOCALE_FLAGS[locale]}</span>
                <span className="hidden xl:inline">{locale}</span>
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 overflow-hidden rounded-2xl border border-border bg-surface-overlay py-1 shadow-2xl shadow-black/20 backdrop-blur-xl"
                >
                    {LOCALES.map((option) => (
                        <li key={option}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={option === locale}
                                onClick={() => choose(option)}
                                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${option === locale
                                    ? 'bg-brand-muted text-brand'
                                    : 'text-content-secondary hover:bg-accent hover:text-content-primary'
                                    }`}
                            >
                                <span aria-hidden>{LOCALE_FLAGS[option]}</span>
                                <span className="flex-1">{LOCALE_LABELS[option]}</span>
                                {option === locale ? <span className="text-brand">✓</span> : null}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
