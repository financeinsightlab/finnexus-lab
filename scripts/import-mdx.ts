import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { prisma } from '../lib/prisma';

const CONTENT = path.join(process.cwd(), 'content');

async function importDirectory(dirName: string, postType: 'INSIGHT' | 'RESEARCH') {
  const dirPath = path.join(CONTENT, dirName);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || 
                await prisma.user.create({ data: { email: 'admin@kunwaranalytics.in', name: 'Admin', role: 'ADMIN' }});

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const fullPath = path.join(dirPath, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Skip if already exists
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      console.log(`[SKIP] ${slug} already exists in DB`);
      continue;
    }

    const excerpt = data.summary || data.thesis || data.excerpt || '';
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const estimatedReadingTime = data.readingTime || (postType === 'INSIGHT' ? 7 : 15);
    const publishedAt = data.date ? new Date(data.date) : new Date();

    await prisma.post.create({
      data: {
        slug,
        title: data.title || slug,
        excerpt,
        content, // the raw MDX content
        type: postType,
        published: true,
        publishedAt,
        authorId: admin.id,
        featuredImage: data.coverImage || null,
        tags,
        estimatedReadingTime,
      }
    });

    console.log(`[OK] Imported ${postType}: ${slug}`);
  }
}

async function main() {
  console.log("Importing Research...");
  await importDirectory('research', 'RESEARCH');
  
  console.log("Importing Insights...");
  await importDirectory('insights', 'INSIGHT');
  
  console.log("Done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
