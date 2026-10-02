import { revalidatePath, revalidateTag } from 'next/cache';

const CONTENT_ROUTE_BY_TYPE: Record<string, (slug: string) => string> = {
  PAGE: (slug) => slug === 'home' ? '/' : `/${slug}`,
  COURSE: (slug) => `/pgdm/${encodeURIComponent(slug)}`,
  PGDM_COURSE: (slug) => `/pgdm/${encodeURIComponent(slug)}`,
  FINANCE_TERM: (slug) => `/finance-terms/${encodeURIComponent(slug)}`,
  STUDY: (slug) => `/study/${encodeURIComponent(slug)}`,
  STUDY_COURSE: (slug) => `/study/${encodeURIComponent(slug)}`,
  TOOL: (slug) => `/tools/${encodeURIComponent(slug)}`,
  RESEARCH: (slug) => `/research/${encodeURIComponent(slug)}`,
  INSIGHT: (slug) => `/insights/${encodeURIComponent(slug)}`,
  TRACKER: (slug) => `/tracker/${encodeURIComponent(slug)}`,
  DATASET: (slug) => `/data-lab/${encodeURIComponent(slug)}`,
  CASE_STUDY: (slug) => `/case-studies/${encodeURIComponent(slug)}`,
  PRICING: () => '/pricing',
  CONTACT: () => '/contact',
  PREDICTION_LEDGER: () => '/predictions/ledger',
  ASK: () => '/ask',
};

function revalidateContextRoute(type: string | undefined, slug: string | undefined) {
  const normalizedType = type?.toUpperCase() ?? '';
  const normalizedSlug = slug ?? '';
  if (normalizedType === 'COURSE_LESSON') {
    const courseSlug = normalizedSlug.split('/')[0];
    if (courseSlug) {
      revalidatePath(`/pgdm/${encodeURIComponent(courseSlug)}`);
      revalidatePath(`/study/${encodeURIComponent(courseSlug)}`);
    }
    revalidatePath('/pgdm/[subject]/[lecture]', 'page');
    revalidatePath('/pgdm/[subject]/lesson/[lessonSlug]', 'page');
    revalidatePath('/study/[slug]', 'page');
    revalidatePath('/study/[slug]/lessons/[lessonSlug]', 'page');
    return;
  }
  const route = CONTENT_ROUTE_BY_TYPE[normalizedType]?.(normalizedSlug);
  if (route) revalidatePath(route);
}

/** Revalidate the existing public cache tags and, where known, their routes. */
export function revalidateProductContent(input: {
  type: 'FAQ' | 'FINANCE_TERM' | 'RELATED' | 'PROMOTION' | 'COURSE';
  sourceType?: string;
  sourceSlug?: string;
  targetType?: string;
  targetSlug?: string;
}) {
  try {
    if (input.type === 'FAQ') {
      try { revalidateTag('public-faqs', { expire: 0 }); } catch {}
      revalidateContextRoute(input.sourceType, input.sourceSlug);
      return;
    }
    if (input.type === 'FINANCE_TERM') {
      try { revalidateTag('public-finance-terms', { expire: 0 }); } catch {}
      try { revalidatePath('/finance-terms'); } catch {}
      if (input.sourceSlug) {
        try { revalidatePath(`/finance-terms/${encodeURIComponent(input.sourceSlug)}`); } catch {}
      }
      try { revalidatePath('/sitemap.xml'); } catch {}
      return;
    }
    if (input.type === 'RELATED') {
      try { revalidateTag('public-related-content', { expire: 0 }); } catch {}
      revalidateContextRoute(input.sourceType, input.sourceSlug);
      revalidateContextRoute(input.targetType, input.targetSlug);
      return;
    }
    if (input.type === 'PROMOTION') {
      try { revalidateTag('public-promotions', { expire: 0 }); } catch {}
      try { revalidatePath('/'); } catch {}
      for (const route of ['/pricing', '/pgdm', '/tools', '/research', '/study', '/finance-terms']) {
        try { revalidatePath(route); } catch {}
      }
      return;
    }
    if (input.type === 'COURSE') {
      if (input.sourceSlug) {
        try { revalidatePath(`/pgdm/${encodeURIComponent(input.sourceSlug)}`); } catch {}
        try { revalidatePath(`/study/${encodeURIComponent(input.sourceSlug)}`); } catch {}
      }
      try { revalidatePath('/sitemap.xml'); } catch {}
    }
  } catch {
    // Non-fatal cache revalidation error
  }
}

export function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}
