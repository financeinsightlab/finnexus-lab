import { prisma } from './lib/prisma';

async function check() {
  const dbResearch = await prisma.featuredContent.findMany({ where: { section: 'RESEARCH' } });
  const dbPosts = await prisma.post.findMany({
    where: { id: { in: dbResearch.map(r => r.contentId) } },
  });
  console.log("Found Posts:", dbPosts.map(p => ({ id: p.id, title: p.title, featuredImage: p.featuredImage })));
}

check().catch(console.error).finally(() => prisma.$disconnect());
