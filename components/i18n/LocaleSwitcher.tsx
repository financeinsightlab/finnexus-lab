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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
        triggerRef.current?.focus();
    };

    const focusOption = (index: number) => {
        optionRefs.current[index]?.focus();
    };

    const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusOption((index + 1) % LOCALES.length);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusOption((index - 1 + LOCALES.length) % LOCALES.length);
        } else if (event.key === 'Home') {
            event.preventDefault();
            focusOption(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            focusOption(LOCALES.length - 1);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
        }
    };

    return (
        <div
            className={`relative ${className}`}
            ref={ref}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
            }}
        >
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && open) {
                        event.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                    } else if (open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                        event.preventDefault();
                        const selectedIndex = Math.max(0, LOCALES.indexOf(locale));
                        focusOption(selectedIndex);
                    }
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-brand-slate hover:text-brand-navy hover:bg-black/5 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium border border-transparent dark:hover:border-gray-700 min-h-[40px]"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls="locale-options"
                aria-label="Change language"
            >
                <span aria-hidden>{LOCALE_FLAGS[locale]}</span>
                <span className="hidden xl:inline">{locale}</span>
            </button>

            {open && (
                <ul
                    id="locale-options"
                    role="listbox"
                    aria-label="Available languages"
                    className="ui-scroll-region absolute right-0 top-[calc(100%+8px)] z-50 max-h-[min(70dvh,24rem)] w-52 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-2xl shadow-black/20 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/98 dark:shadow-black/60"
                    data-lenis-prevent
                >
                    {LOCALES.map((option, index) => (
                        <li key={option}>
                            <button
                                ref={(element) => { optionRefs.current[index] = element; }}
                                type="button"
                                role="option"
                                aria-selected={option === locale}
                                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                                onClick={() => choose(option)}
                                className={`flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${option === locale
                                    ? 'bg-brand-teal/10 text-brand-navy dark:bg-white/5 dark:text-white'
                                    : 'text-brand-slate hover:bg-black/5 hover:text-brand-navy dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                                    }`}
                            >
                                <span aria-hidden>{LOCALE_FLAGS[option]}</span>
                                <span className="flex-1">{LOCALE_LABELS[option]}</span>
                                {option === locale ? <span className="text-teal-400">✓</span> : null}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
