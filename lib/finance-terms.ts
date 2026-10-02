import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const FINANCE_TERMS_BASE = 'https://kunwaranalytics.in/finance-terms';
export const FINANCE_TERM_PAGE_SIZE = 40;

const publicTermSelect = {
  id: true,
  slug: true,
  term: true,
  simpleMeaning: true,
  example: true,
  interviewAnswer: true,
  formula: true,
  category: true,
  difficulty: true,
  keywords: true,
  synonyms: true,
  relatedTermSlugs: true,
  featured: true,
  published: true,
  seoVisible: true,
  displayOrder: true,
  updatedAt: true,
} as const;

export type FinanceTermRecord = Awaited<ReturnType<typeof getFinanceTermBySlug>>;

const readFinanceTerm = unstable_cache(
  async (slug: string) => prisma.financeTerm.findFirst({
    where: { slug, published: true },
    select: publicTermSelect,
  }),
  ['public-finance-term-v1'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

const readFeaturedTerms = unstable_cache(
  async (limit: number) => prisma.financeTerm.findMany({
    where: { published: true, seoVisible: true, featured: true },
    orderBy: [{ displayOrder: 'asc' }, { term: 'asc' }],
    take: Math.max(0, Math.min(limit, 12)),
    select: publicTermSelect,
  }),
  ['featured-finance-terms-v1'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

const readRelatedTerms = unstable_cache(
  async (categories: string[], keywords: string[], excludeSlug: string, limit: number) => {
    const terms = await prisma.financeTerm.findMany({
      where: {
        published: true,
        seoVisible: true,
        slug: { not: excludeSlug },
        OR: [
          ...(categories.length ? [{ category: { in: categories } }] : []),
          ...(keywords.length ? [{ keywords: { hasSome: keywords } }] : []),
        ],
      },
      orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { term: 'asc' }],
      take: Math.max(0, Math.min(limit, 12)),
      select: publicTermSelect,
    });
    return terms;
  },
  ['related-finance-terms-v1'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

const readTermIndex = unstable_cache(
  async (query: string, category: string, page: number, pageSize: number) => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const tokens = normalizedQuery.split(/\s+/).filter((token) => token.length > 1);
    const where = {
      published: true,
      seoVisible: true,
      ...(category ? { category } : {}),
      ...(normalizedQuery
        ? {
            OR: [
              { term: { contains: normalizedQuery, mode: 'insensitive' as const } },
              { slug: { contains: normalizedQuery, mode: 'insensitive' as const } },
              { simpleMeaning: { contains: normalizedQuery, mode: 'insensitive' as const } },
              { example: { contains: normalizedQuery, mode: 'insensitive' as const } },
              { interviewAnswer: { contains: normalizedQuery, mode: 'insensitive' as const } },
              { searchText: { contains: normalizedQuery, mode: 'insensitive' as const } },
              ...(tokens.length ? [{ keywords: { hasSome: tokens } }, { synonyms: { hasSome: tokens } }] : []),
            ],
          }
        : {}),
    };
    const [terms, total] = await Promise.all([
      prisma.financeTerm.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { term: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: publicTermSelect,
      }),
      prisma.financeTerm.count({ where }),
    ]);
    return { terms, total };
  },
  ['finance-term-index-v1'],
  { revalidate: 900, tags: ['public-finance-terms'] },
);

export function getFinanceTermBySlug(slug: string) {
  return readFinanceTerm(slug.trim().toLowerCase());
}

export function getFeaturedFinanceTerms(limit = 6) {
  return readFeaturedTerms(limit);
}

export function getRelatedFinanceTerms(input: {
  categories?: string[];
  keywords?: string[];
  excludeSlug: string;
  limit?: number;
}) {
  const categories = [...new Set((input.categories ?? []).map((value) => value.trim()).filter(Boolean))].sort();
  const keywords = [...new Set((input.keywords ?? []).map((value) => value.trim().toLowerCase()).filter(Boolean))].sort();
  return readRelatedTerms(categories, keywords, input.excludeSlug, input.limit ?? 4);
}

export async function getFinanceTermIndex(input: {
  query?: string;
  category?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const pageSize = Math.max(1, Math.min(100, Math.floor(input.pageSize ?? FINANCE_TERM_PAGE_SIZE)));
  return readTermIndex((input.query ?? '').trim(), (input.category ?? '').trim(), page, pageSize);
}

const readTermCategories = unstable_cache(
  async () => {
    const terms = await prisma.financeTerm.findMany({
      where: { published: true, seoVisible: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
      select: { category: true },
    });
    return terms.map((term) => term.category);
  },
  ['public-finance-term-categories-v1'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

export function getFinanceTermCategories() {
  return readTermCategories();
}

export async function getFinanceTermsBySlugs(slugs: string[]) {
  const normalized = [...new Set(slugs.map((slug) => slug.trim().toLowerCase()).filter(Boolean))].slice(0, 12);
  if (normalized.length === 0) return [];
  return prisma.financeTerm.findMany({
    where: { slug: { in: normalized }, published: true, seoVisible: true },
    orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { term: 'asc' }],
    select: publicTermSelect,
  });
}
