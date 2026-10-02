import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { COMPREHENSIVE_FINANCE_TERMS, type FinanceTermSlideData } from '@/lib/finance-terms-data';

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
  subCategory: true,
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

function toLocalTermRecord(fallback: FinanceTermSlideData, index = 1) {
  return {
    id: `local-${fallback.slug}`,
    slug: fallback.slug,
    term: fallback.term,
    simpleMeaning: fallback.simpleMeaning,
    example: fallback.example,
    interviewAnswer: fallback.interviewAnswer,
    formula: fallback.formula,
    category: fallback.category,
    subCategory: fallback.subCategory ?? null,
    difficulty: fallback.difficulty,
    keywords: fallback.keywords,
    synonyms: [] as string[],
    relatedTermSlugs: [] as string[],
    featured: true,
    published: true,
    seoVisible: true,
    displayOrder: index,
    updatedAt: new Date(),
  };
}

const readFinanceTerm = unstable_cache(
  async (slug: string) =>
    prisma.financeTerm.findFirst({
      where: { slug, published: true },
      select: publicTermSelect,
    }),
  ['public-finance-term-v2'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

const readFeaturedTerms = unstable_cache(
  async (limit: number) =>
    prisma.financeTerm.findMany({
      where: { published: true, seoVisible: true, featured: true },
      orderBy: [{ displayOrder: 'asc' }, { term: 'asc' }],
      take: Math.max(0, Math.min(limit, 24)),
      select: publicTermSelect,
    }),
  ['featured-finance-terms-v2'],
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
  ['related-finance-terms-v2'],
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
  ['finance-term-index-v2'],
  { revalidate: 900, tags: ['public-finance-terms'] },
);

export async function getFinanceTermBySlug(slug: string) {
  const norm = slug.trim().toLowerCase();
  try {
    const term = await readFinanceTerm(norm);
    if (term) return term;
  } catch {
    try {
      const term = await prisma.financeTerm.findFirst({
        where: { slug: norm, published: true },
        select: publicTermSelect,
      });
      if (term) return term;
    } catch {
      // ignore
    }
  }

  const fallback = COMPREHENSIVE_FINANCE_TERMS.find((t) => t.slug.toLowerCase() === norm);
  if (fallback) {
    return toLocalTermRecord(fallback);
  }
  return null;
}

export async function getFeaturedFinanceTerms(limit = 12) {
  try {
    const terms = await readFeaturedTerms(limit);
    if (terms && terms.length > 0) return terms;
  } catch {
    try {
      const terms = await prisma.financeTerm.findMany({
        where: { published: true, seoVisible: true, featured: true },
        orderBy: [{ displayOrder: 'asc' }, { term: 'asc' }],
        take: Math.max(0, Math.min(limit, 24)),
        select: publicTermSelect,
      });
      if (terms && terms.length > 0) return terms;
    } catch {
      // ignore
    }
  }

  return COMPREHENSIVE_FINANCE_TERMS.slice(0, limit).map((t, i) => toLocalTermRecord(t, i + 1));
}

export async function getRelatedFinanceTerms(input: {
  categories?: string[];
  keywords?: string[];
  excludeSlug: string;
  limit?: number;
}) {
  const categories = [...new Set((input.categories ?? []).map((value) => value.trim()).filter(Boolean))].sort();
  const keywords = [...new Set((input.keywords ?? []).map((value) => value.trim().toLowerCase()).filter(Boolean))].sort();
  const limit = input.limit ?? 4;

  try {
    return await readRelatedTerms(categories, keywords, input.excludeSlug, limit);
  } catch {
    try {
      return await prisma.financeTerm.findMany({
        where: {
          published: true,
          seoVisible: true,
          slug: { not: input.excludeSlug },
          OR: [
            ...(categories.length ? [{ category: { in: categories } }] : []),
            ...(keywords.length ? [{ keywords: { hasSome: keywords } }] : []),
          ],
        },
        orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { term: 'asc' }],
        take: Math.max(0, Math.min(limit, 12)),
        select: publicTermSelect,
      });
    } catch {
      const matches = COMPREHENSIVE_FINANCE_TERMS.filter(
        (t) => t.slug !== input.excludeSlug && (categories.includes(t.category) || t.keywords.some((k) => keywords.includes(k.toLowerCase()))),
      ).slice(0, limit);
      return matches.map((t, i) => toLocalTermRecord(t, i + 1));
    }
  }
}

export async function getFinanceTermIndex(input: {
  query?: string;
  category?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const pageSize = Math.max(1, Math.min(100, Math.floor(input.pageSize ?? FINANCE_TERM_PAGE_SIZE)));
  const query = (input.query ?? '').trim();
  const category = (input.category ?? '').trim();

  try {
    const res = await readTermIndex(query, category, page, pageSize);
    if (res && res.terms.length > 0) return res;
  } catch {
    try {
      const normalizedQuery = query.toLocaleLowerCase();
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
      if (terms.length > 0) return { terms, total };
    } catch {
      // fallback
    }
  }

  // In-memory filter fallback
  let list = COMPREHENSIVE_FINANCE_TERMS;
  if (category) {
    list = list.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.simpleMeaning.toLowerCase().includes(q) ||
        t.example.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }

  const total = list.length;
  const paged = list.slice((page - 1) * pageSize, page * pageSize);
  return {
    terms: paged.map((t, i) => toLocalTermRecord(t, (page - 1) * pageSize + i + 1)),
    total,
  };
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
  ['public-finance-term-categories-v2'],
  { revalidate: 1800, tags: ['public-finance-terms'] },
);

export async function getFinanceTermCategories(): Promise<string[]> {
  try {
    const cats = await readTermCategories();
    if (cats && cats.length > 0) {
      const allUnique = [...new Set([...cats, ...COMPREHENSIVE_FINANCE_TERMS.map((t) => t.category)])].sort();
      return allUnique;
    }
  } catch {
    try {
      const terms = await prisma.financeTerm.findMany({
        where: { published: true, seoVisible: true },
        distinct: ['category'],
        orderBy: { category: 'asc' },
        select: { category: true },
      });
      if (terms.length > 0) {
        return [...new Set([...terms.map((t) => t.category), ...COMPREHENSIVE_FINANCE_TERMS.map((t) => t.category)])].sort();
      }
    } catch {
      // fallback
    }
  }

  return [...new Set(COMPREHENSIVE_FINANCE_TERMS.map((t) => t.category))].sort();
}

export async function getFinanceTermsBySlugs(slugs: string[]) {
  const normalized = [...new Set(slugs.map((slug) => slug.trim().toLowerCase()).filter(Boolean))].slice(0, 12);
  if (normalized.length === 0) return [];
  try {
    return await prisma.financeTerm.findMany({
      where: { slug: { in: normalized }, published: true, seoVisible: true },
      orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { term: 'asc' }],
      select: publicTermSelect,
    });
  } catch {
    const matches = COMPREHENSIVE_FINANCE_TERMS.filter((t) => normalized.includes(t.slug.toLowerCase()));
    return matches.map((t, i) => toLocalTermRecord(t, i + 1));
  }
}
