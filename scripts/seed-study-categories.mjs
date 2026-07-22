/**
 * Seed script: Creates initial Study Material categories.
 * Run with: node scripts/seed-study-categories.mjs
 *
 * Safe to run multiple times — skips categories that already exist (by slug prefix).
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  {
    name: "Finance",
    slug: "finance",
    description: "Core financial concepts, markets, instruments, and investment fundamentals.",
    icon: "💰",
    color: "#0D6E6E",
    order: 0,
  },
  {
    name: "Business Analytics",
    slug: "business-analytics",
    description: "Data-driven decision making, KPIs, dashboards, and business intelligence.",
    icon: "📊",
    color: "#2563EB",
    order: 1,
  },
  {
    name: "Research Methods",
    slug: "research-methods",
    description: "Quantitative and qualitative research methodologies, data collection, and analysis.",
    icon: "🔬",
    color: "#7C3AED",
    order: 2,
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Statistics, machine learning, Python, and data visualization for finance.",
    icon: "🧮",
    color: "#059669",
    order: 3,
  },
  {
    name: "Economics",
    slug: "economics",
    description: "Microeconomics, macroeconomics, monetary policy, and economic indicators.",
    icon: "📈",
    color: "#EA580C",
    order: 4,
  },
  {
    name: "Investment Analysis",
    slug: "investment-analysis",
    description: "Valuation models, DCF, portfolio theory, and equity research techniques.",
    icon: "🏦",
    color: "#92620A",
    order: 5,
  },
];

async function main() {
  console.log("🌱 Seeding Study Material categories...\n");

  let created = 0;
  let skipped = 0;

  for (const cat of CATEGORIES) {
    // Check if a category with this slug already exists
    const existing = await prisma.studyCategory.findUnique({
      where: { slug: cat.slug },
    });

    if (existing) {
      console.log(`⏭️  Skipping (already exists): ${cat.name}`);
      skipped++;
      continue;
    }

    await prisma.studyCategory.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        order: cat.order,
      },
    });

    console.log(`✅ Created: ${cat.icon} ${cat.name}`);
    created++;
  }

  console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
