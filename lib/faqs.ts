import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { TOOL_FAQS } from '@/lib/tool-faqs';

export type PublicFaq = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string | null;
  displayOrder: number;
  seoVisible: boolean;
};

const readFaqContext = unstable_cache(
  async (relatedType: string, relatedSlug: string): Promise<PublicFaq[]> => {
    try {
      const dbFaqs = await prisma.faqItem.findMany({
        where: { relatedType, relatedSlug, published: true },
        orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
        select: {
          id: true,
          slug: true,
          question: true,
          answer: true,
          category: true,
          displayOrder: true,
          seoVisible: true,
        },
      });

      if (dbFaqs.length > 0) {
        return dbFaqs;
      }
    } catch (e) {
      // In dev or offline environments where DB is unreachable, fall through to static registry
    }

    // High-value fallback for all calculator tools
    if (relatedType === 'TOOL' && TOOL_FAQS[relatedSlug]) {
      return TOOL_FAQS[relatedSlug];
    }

    return [];
  },
  ['public-faq-context-v2'],
  { revalidate: 3600, tags: ['public-faqs'] },
);

export function getPublicFaqs(relatedType: string, relatedSlug: string) {
  return readFaqContext(relatedType.trim().toUpperCase(), relatedSlug.trim());
}
