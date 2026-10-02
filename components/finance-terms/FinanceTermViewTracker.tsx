'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function FinanceTermViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('finance_term_view', { term_slug: slug });
  }, [slug]);
  return null;
}
