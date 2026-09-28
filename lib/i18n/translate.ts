// lib/i18n/translate.ts — pure translation helper (Pillar F2)

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

export type TranslatorVars = Record<string, string | number>;

/** Replace `{token}` placeholders with values from `vars`. */
function interpolate(template: string, vars?: TranslatorVars): string {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (match, token: string) =>
        token in vars ? String(vars[token]) : match,
    );
}

/**
 * Resolve a dotted key for a locale, falling back to the default locale and
 * finally to the raw key so missing strings are visible but never throw.
 */
export function translate(locale: Locale, key: string, vars?: TranslatorVars): string {
    const catalog = getMessages(locale);
    const fallback = getMessages(DEFAULT_LOCALE);
    const template = catalog[key] ?? fallback[key] ?? key;
    return interpolate(template, vars);
}

export type Translator = (key: string, vars?: TranslatorVars) => string;

/**
 * Create a translator bound to a locale. When `namespace` is supplied, keys are
 * resolved relative to it (matching the `next-intl` `useTranslations('ns')`
 * ergonomics) while still accepting fully-qualified keys.
 */
export function createTranslator(locale: Locale, namespace?: string): Translator {
    return (key, vars) => {
        const qualified = namespace && !key.includes('.') ? `${namespace}.${key}` : key;
        return translate(locale, qualified, vars);
    };
}
