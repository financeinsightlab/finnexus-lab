const SITE_ORIGIN = 'https://kunwaranalytics.in';

/** Keep model-generated links on the site; citations and prose cannot open arbitrary schemes. */
export function safeAskHref(value: string): string | null {
    const candidate = value.trim();
    if (!candidate || candidate.includes('\\')) return null;

    try {
        const url = new URL(candidate, SITE_ORIGIN);
        if (url.protocol !== 'https:' || !['kunwaranalytics.in', 'www.kunwaranalytics.in'].includes(url.hostname)) {
            return null;
        }
        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return null;
    }
}
