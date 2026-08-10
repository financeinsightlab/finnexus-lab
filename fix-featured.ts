import { prisma } from './lib/prisma';

async function fix() {
  await prisma.featuredContent.deleteMany();
  console.log("Deleted all FeaturedContent to allow fallback to MDX");
}

fix().catch(console.error).finally(() => prisma.$disconnect());
