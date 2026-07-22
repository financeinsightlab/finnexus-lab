// scripts/algolia-index.ts

import { config as loadEnv } from 'dotenv';
import { algoliasearch } from 'algoliasearch';
import { getAllResearch, getAllInsights } from '../lib/content.ts';
import { prisma } from '../lib/prisma.ts';

// Support local development where values are stored in `.env.local`.
// In Vercel, environment variables are injected and this becomes a no-op.
loadEnv({ path: '.env.local' });

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_KEY;

async function runIndexing() {
  try {
    if (!appId || !adminKey) {
      console.warn('⚠️  Algolia ENV variables are missing. Skipping indexing. Set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY in .env.local to enable.');
      return;
    }

    // ✅ Algolia client (Admin key used for indexing)
    const client = algoliasearch(appId, adminKey);

    console.log('🚀 Starting Algolia indexing...');

    // ─── 1. MDX Content (Research + Insights) ────────────────────────────────
    const research = getAllResearch();
    const insights = getAllInsights();

    const mdxRecords = [
      ...research.map((post) => ({
        objectID: `research-${post.slug}`,
        type: 'research',
        source: 'mdx',
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        sector: post.sector,
        tags: post.tags,
        date: post.date,
        author: post.author,
        url: `/research/${post.slug}`,
      })),

      ...insights.map((post) => ({
        objectID: `insight-${post.slug}`,
        type: 'insight',
        source: 'mdx',
        slug: post.slug,
        title: post.title,
        thesis: post.thesis,
        category: post.category,
        date: post.date,
        author: post.author,
        url: `/insights/${post.slug}`,
      })),
    ];

    // ─── 2. DB Content (Published Posts from CMS) ────────────────────────────
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        type: true,
        tags: true,
        publishedAt: true,
        authorId: true,
      },
    });

    const dbRecords = dbPosts.map((post) => ({
      objectID: `db-post-${post.id}`,
      type: post.type.toLowerCase(),
      source: 'database',
      slug: post.slug,
      title: post.title,
      summary: post.excerpt ?? '',
      tags: post.tags,
      date: post.publishedAt?.toISOString() ?? new Date().toISOString(),
      url: post.type === 'RESEARCH'
        ? `/research/${post.slug}`
        : post.type === 'INSIGHT'
        ? `/insights/${post.slug}`
        : post.type === 'CASE_STUDY'
        ? `/case-studies/${post.slug}`
        : `/research/${post.slug}`,
    }));

    // ─── 3. Study Materials (if they exist) ──────────────────────────────────
    let studyRecords: Record<string, unknown>[] = [];
    try {
      const studyMaterials = await prisma.studyMaterial.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          tags: true,
          type: true,
          difficulty: true,
          publishedAt: true,
          category: { select: { name: true, slug: true } },
        },
      });

      studyRecords = studyMaterials.map((m) => ({
        objectID: `study-${m.id}`,
        type: 'study',
        source: 'database',
        slug: m.slug,
        title: m.title,
        summary: m.description,
        tags: m.tags,
        materialType: m.type,
        difficulty: m.difficulty,
        category: m.category?.name ?? '',
        date: m.publishedAt?.toISOString() ?? new Date().toISOString(),
        url: `/study/${m.slug}`,
      }));
    } catch {
      // StudyMaterial table may not exist yet — skip silently
      console.log('ℹ️  StudyMaterial table not found — skipping study indexing');
    }

    const records = [...mdxRecords, ...dbRecords, ...studyRecords];

    console.log(`📦 Preparing ${records.length} records...`);
    console.log(`   - MDX: ${mdxRecords.length}`);
    console.log(`   - DB Posts: ${dbRecords.length}`);
    console.log(`   - Study Materials: ${studyRecords.length}`);

    // ✅ Algolia v5 indexing
    // In algoliasearch v5, `initIndex()` isn't available; use `client.saveObjects`.
    await client.saveObjects({
      indexName: 'kunwar_analytics_content',
      objects: records,
    });

    console.log(`✅ Indexed ${records.length} records successfully.`);
  } catch (error) {
    console.error('❌ Algolia indexing failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

runIndexing();
