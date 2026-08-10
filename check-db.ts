import { prisma } from './lib/prisma';

async function check() {
  const f = await prisma.featuredContent.findMany();
  console.log("FeaturedContent:", f);
  const hp = await prisma.homePageItem.findMany();
  console.log("HomePageItem:", hp);
}

check().catch(console.error).finally(() => prisma.$disconnect());
