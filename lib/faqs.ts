import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

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
    return prisma.faqItem.findMany({
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
  },
  ['public-faq-context-v1'],
  { revalidate: 3600, tags: ['public-faqs'] },
);

export function getPublicFaqs(relatedType: string, relatedSlug: string) {
  return readFaqContext(relatedType.trim().toUpperCase(), relatedSlug.trim());
}
