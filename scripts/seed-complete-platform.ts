import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { prisma } from '../lib/prisma';
import { COMPREHENSIVE_FINANCE_TERMS } from '../lib/finance-terms-data';

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function seed() {
  console.log('--- SEEDING COMPLETE PLATFORM DATA ---');

  // 1. Ensure Admin User
  let admin = await prisma.user.findFirst({
    where: { email: 'sumitsingh7445@gmail.com' },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'sumitsingh7445@gmail.com',
        name: 'Sumit Singh',
        role: 'ADMIN',
        subscriptionStatus: 'ACTIVE',
        subscriptionPlan: 'ELITE',
      },
    });
  } else if (admin.role !== 'ADMIN') {
    admin = await prisma.user.update({
      where: { id: admin.id },
      data: { role: 'ADMIN', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'ELITE' },
    });
  }

  console.log(`[USER] Admin verified: ${admin.email} (${admin.id})`);

  // 2. Ensure Sample Users for User Directory
  const sampleUsers = [
    { email: 'rohan.mehta@investcorp.com', name: 'Rohan Mehta', role: 'ANALYST', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'PRO' },
    { email: 'aarav.sharma@apexcapital.in', name: 'Aarav Sharma', role: 'MEMBER', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'PRO' },
    { email: 'priya.nair@quantfinance.org', name: 'Priya Nair', role: 'MEMBER', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'ELITE' },
    { email: 'vikram.aditya@iimb.ac.in', name: 'Vikram Aditya', role: 'MEMBER', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'PRO' },
    { email: 'neha.gupta@deloitte.com', name: 'Neha Gupta', role: 'ANALYST', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'PRO' },
    { email: 'aditi.verma@xlri.ac.in', name: 'Aditi Verma', role: 'MEMBER', subscriptionStatus: 'INACTIVE', subscriptionPlan: null },
    { email: 'karan.singh@hdfcbank.com', name: 'Karan Singh', role: 'MEMBER', subscriptionStatus: 'ACTIVE', subscriptionPlan: 'PRO' },
  ];

  for (const u of sampleUsers) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: u.email,
          name: u.name,
          role: u.role as any,
          subscriptionStatus: u.subscriptionStatus as any,
          subscriptionPlan: u.subscriptionPlan,
        },
      });
      console.log(`[USER] Created sample member: ${u.email}`);
    }
  }

  // 3. Seed MDX Content into Post Table
  const FOLDER_MAP: Array<{ dir: string; type: 'RESEARCH' | 'INSIGHT' | 'CASE_STUDY' | 'MEDIA' | 'OTHER' }> = [
    { dir: 'research', type: 'RESEARCH' },
    { dir: 'insights', type: 'INSIGHT' },
    { dir: 'case-studies', type: 'CASE_STUDY' },
    { dir: 'data-lab', type: 'RESEARCH' },
    { dir: 'podcast', type: 'MEDIA' },
  ];

  let postCount = 0;
  for (const { dir, type } of FOLDER_MAP) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
    console.log(`Processing folder: ${dir} (${files.length} files)...`);

    for (const file of files) {
      const slug = file.replace(/\.mdx?$/, '');
      const fullPath = path.join(dirPath, file);
      const rawContent = fs.readFileSync(fullPath, 'utf8').replace(/^\/\/.*\n/gm, '');
      const { data, content } = matter(rawContent);

      const title = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const excerpt = data.summary || data.thesis || data.outcome || data.businessQuestion || data.description || '';
      const tags = Array.isArray(data.tags) ? data.tags : Array.isArray(data.tools) ? data.tools : [];
      const publishedAt = data.date ? new Date(data.date) : new Date();
      const estimatedReadingTime = typeof data.readingTime === 'number' ? data.readingTime : 8;
      const featuredImage = data.coverImage || null;

      await prisma.post.upsert({
        where: { slug },
        update: {
          title,
          excerpt,
          content,
          type,
          published: true,
          contentStatus: 'PUBLISHED',
          featuredImage,
          tags,
          estimatedReadingTime,
          publishedAt,
        },
        create: {
          slug,
          title,
          excerpt,
          content,
          type,
          published: true,
          contentStatus: 'PUBLISHED',
          featuredImage,
          tags,
          estimatedReadingTime,
          publishedAt,
          authorId: admin.id,
          viewCount: Math.floor(Math.random() * 850) + 120,
        },
      });
      postCount++;
    }
  }
  console.log(`[CMS] Successfully imported ${postCount} posts into Post table.`);

  // 4. Seed Study Categories & Sample Study Material
  const CATEGORIES = [
    { name: "Finance", slug: "finance", description: "Core financial concepts, valuation, and instruments.", icon: "💰", color: "#0D6E6E", order: 0 },
    { name: "Business Analytics", slug: "business-analytics", description: "Data-driven decisions, Power BI, and dashboards.", icon: "📊", color: "#2563EB", order: 1 },
    { name: "Investment Analysis", slug: "investment-analysis", description: "DCF models, equity research, and portfolio theory.", icon: "🏦", color: "#92620A", order: 2 },
    { name: "Economics", slug: "economics", description: "Macroeconomics, inflation, monetary policy, and GDP.", icon: "📈", color: "#EA580C", order: 3 },
  ];

  for (const cat of CATEGORIES) {
    const existing = await prisma.studyCategory.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      const created = await prisma.studyCategory.create({ data: cat });
      console.log(`[STUDY] Created category: ${cat.name}`);

      // Create a sample study material
      await prisma.studyMaterial.create({
        data: {
          title: `Comprehensive Guide to ${cat.name}`,
          slug: `guide-to-${cat.slug}`,
          description: `Detailed handbook covering foundational and advanced techniques in ${cat.name}.`,
          content: `# ${cat.name} Masterclass\n\nWelcome to this comprehensive study guide designed for finance candidates and analysts.`,
          categoryId: created.id,
          authorId: admin.id,
          type: "COURSE",
          difficulty: "INTERMEDIATE",
          published: true,
          featured: true,
          duration: 45,
          viewCount: 340,
        },
      });
    }
  }

  // 5. Seed Finance Terms
  if (COMPREHENSIVE_FINANCE_TERMS && COMPREHENSIVE_FINANCE_TERMS.length > 0) {
    console.log(`[TERMS] Seeding top finance terms...`);
    for (let i = 0; i < Math.min(25, COMPREHENSIVE_FINANCE_TERMS.length); i++) {
      const item = COMPREHENSIVE_FINANCE_TERMS[i];
      const searchText = `${item.term} ${item.category} ${item.simpleMeaning}`.toLowerCase();
      await prisma.financeTerm.upsert({
        where: { slug: item.slug },
        update: {},
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
          featured: i < 10,
          seoVisible: true,
          displayOrder: i + 1,
        },
      });
    }
    console.log(`[TERMS] Finance terms populated.`);
  }

  // 6. Ensure Contact Inquiries in database table
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        organisation TEXT,
        subject TEXT NOT NULL,
        budget TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'UNREAD',
        reply_text TEXT,
        replied_at TIMESTAMP,
        replied_by TEXT,
        ip TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await prisma.$executeRawUnsafe(`
      INSERT INTO contact_inquiries (id, name, email, organisation, subject, budget, message, status, created_at)
      VALUES 
        ('cinq_1', 'Rohan Mehta', 'rohan.mehta@investcorp.com', 'InvestCorp Capital', 'Custom DCF Model Inquiry', '₹25,000 - ₹50,000', 'Hello Kunwar Analytics team, we are looking for a tailored 3-statement model for EV charging infrastructure in India.', 'UNREAD', NOW() - INTERVAL '2 hours'),
        ('cinq_2', 'Aarav Sharma', 'aarav.sharma@apexcapital.in', 'Apex Capital', 'Enterprise Research Retainer', '₹50,000 - ₹1,00,000', 'We are interested in a quarterly research retainer covering Indian renewable energy and semiconductors.', 'REPLIED', NOW() - INTERVAL '1 day')
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log(`[INQUIRIES] Contact inquiries seeded.`);
  } catch (e: any) {
    console.warn(`[INQUIRIES] Raw table setup note: ${e.message}`);
  }

  console.log('--- SEEDING COMPLETE ---');
}

seed().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });

