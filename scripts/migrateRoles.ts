import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Migrating legacy roles...');

  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.role === 'ADMIN') {
      // Keep Admin
      console.log(`Keeping ${user.email} as ADMIN`);
      continue;
    }

    // For everyone else, migrate their old role into their SubscriptionPlan
    // and forcefully set their actual Access Role to MEMBER.
    let oldRole = user.role as string;
    let newPlan = user.subscriptionPlan || oldRole;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'MEMBER',
        subscriptionPlan: newPlan === 'MEMBER' || newPlan === 'FREE' ? 'FREE' : newPlan,
      },
    });

    console.log(`Migrated ${user.email} -> Role: MEMBER, Plan: ${newPlan}`);
  }

  console.log('Migration complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
