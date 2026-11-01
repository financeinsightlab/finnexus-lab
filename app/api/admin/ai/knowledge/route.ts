// app/api/admin/ai/knowledge/route.ts — Knowledge Base Management API

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { websiteKnowledgeIndexer } from '@/lib/knowledge/website-indexer';
import { chunkDocument } from '@/lib/knowledge/chunker';
import { parseTextDocument } from '@/lib/knowledge/document-parser';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const documents = await prisma.knowledgeDocument.findMany({
      include: {
        _count: {
          select: { chunks: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 100,
    });

    const safeDocs = documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      sourceUrl: doc.sourceUrl,
      sourceType: doc.sourceType,
      category: doc.category,
      status: doc.status,
      chunkCount: doc._count.chunks,
      lastIndexedAt: doc.lastIndexedAt,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json({ success: true, documents: safeDocs });
  } catch (error) {
    console.error('Failed to load knowledge documents:', error);
    return NextResponse.json({ error: 'Failed to retrieve documents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();

    // Trigger website re-index
    if (body.action === 'reindex_website') {
      const result = await websiteKnowledgeIndexer.indexAllWebsiteContent();
      await prisma.aIAdminAuditLog.create({
        data: {
          adminEmail: user.email || 'staff@kunwaranalytics.in',
          action: 'REINDEX_WEBSITE',
          entityType: 'KNOWLEDGE',
          details: result,
        },
      });
      return NextResponse.json({ success: true, result });
    }

    // Add manual document or parsed file
    const { title, content, category, sourceUrl, sourceType } = body;
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const parsed = parseTextDocument(title, content);

    const doc = await prisma.knowledgeDocument.create({
      data: {
        title: parsed.title,
        sourceUrl: sourceUrl || null,
        sourceType: sourceType || 'MANUAL_ENTRY',
        category: category || 'general',
        content: parsed.text,
        status: 'INDEXED',
        lastIndexedAt: new Date(),
      },
    });

    const chunks = chunkDocument(doc.title, doc.content, { maxChunkLength: 700 });
    for (const ch of chunks) {
      await prisma.knowledgeChunk.create({
        data: {
          documentId: doc.id,
          chunkIndex: ch.chunkIndex,
          title: ch.title,
          content: ch.content,
          tokenCount: ch.approxTokenCount,
        },
      });
    }

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'ADD_DOCUMENT',
        entityType: 'KNOWLEDGE',
        entityId: doc.id,
        details: { title: doc.title, chunkCount: chunks.length },
      },
    });

    return NextResponse.json({ success: true, documentId: doc.id, chunksCreated: chunks.length });
  } catch (error) {
    console.error('Failed to ingest document:', error);
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Document ID required' }, { status: 400 });
  }

  try {
    await prisma.knowledgeDocument.delete({
      where: { id },
    });

    await prisma.aIAdminAuditLog.create({
      data: {
        adminEmail: user.email || 'staff@kunwaranalytics.in',
        action: 'DELETE_DOCUMENT',
        entityType: 'KNOWLEDGE',
        entityId: id,
      },
    });

    return NextResponse.json({ success: true, message: 'Document removed' });
  } catch (error) {
    console.error('Failed to delete document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}

