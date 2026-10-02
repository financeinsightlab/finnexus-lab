import { prisma } from '../lib/prisma';
import { COMPREHENSIVE_FINANCE_TERMS } from '../lib/finance-terms-data';

async function seed() {
  console.log(`Starting to upsert ${COMPREHENSIVE_FINANCE_TERMS.length} finance terms...`);
  let count = 0;

  for (let i = 0; i < COMPREHENSIVE_FINANCE_TERMS.length; i++) {
    const item = COMPREHENSIVE_FINANCE_TERMS[i];
    const searchText = [
      item.term,
      item.category,
      item.subCategory ?? '',
      item.simpleMeaning,
      item.example,
      item.interviewAnswer,
      ...(item.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase();

    await prisma.financeTerm.upsert({
      where: { slug: item.slug },
      update: {
        term: item.term,
        simpleMeaning: item.simpleMeaning,
        example: item.example,
        interviewAnswer: item.interviewAnswer,
        formula: item.formula,
        category: item.category,
        subCategory: item.subCategory ?? null,
        difficulty: item.difficulty,
        keywords: item.keywords,
        searchText,
        published: true,
        featured: i < 12, // First 12 are marked featured for homepage
        seoVisible: true,
        displayOrder: i + 1,
      },
      create: {
        slug: item.slug,
        term: item.term,
        simpleMeaning: item.simpleMeaning,
        example: item.example,
        interviewAnswer: item.interviewAnswer,
        formula: item.formula,
        category: item.category,
        subCategory: item.subCategory ?? null,
        difficulty: item.difficulty,
        keywords: item.keywords,
        synonyms: [],
        relatedTermSlugs: [],
        searchText,
        published: true,
        featured: i < 12,
        seoVisible: true,
        displayOrder: i + 1,
      },
    });
    count++;
  }

  console.log(`Successfully upserted ${count} terms into the database!`);
}

seed()
  .catch((err) => {
    console.error('Failed to seed finance terms:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
