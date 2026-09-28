'use client';

// lib/i18n/LocaleProvider.tsx — client locale context (Pillar F2)
//
// The active locale is stored in a cookie and applied on the client, so the
// app keeps its existing static generation (no `app/[locale]/…` restructure).
// The provider also keeps <html lang> in sync with the chosen locale.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    DEFAULT_LOCALE,
    LOCALE_COOKIE,
    LOCALE_COOKIE_MAX_AGE,
    normalizeLocale,
    type Locale,
} from '@/lib/i18n/config';
import { createTranslator, type Translator } from '@/lib/i18n/translate';

interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translator;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

    // Hydrate from the cookie after mount to keep server/client markup identical.
    useEffect(() => {
        const stored = normalizeLocale(readCookie(LOCALE_COOKIE));
        setLocaleState(stored);
        document.documentElement.lang = stored;
    }, []);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        if (typeof document !== 'undefined') {
            const secure = window.location.protocol === 'https:' ? '; secure' : '';
            document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(next)}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
            document.documentElement.lang = next;
        }
    }, []);

    const value = useMemo<LocaleContextValue>(
        () => ({ locale, setLocale, t: createTranslator(locale) }),
        [locale, setLocale],
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
    const ctx = useContext(LocaleContext);
    if (!ctx) {
        // Safe fallback so components can render outside the provider (tests/embeds).
        return {
            locale: DEFAULT_LOCALE,
            setLocale: () => { },
            t: createTranslator(DEFAULT_LOCALE),
        };
    }
    return ctx;
}
