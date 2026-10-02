// lib/contact-inquiries.ts
//
// Persistent storage and notification engine for Contact Form submissions.
// Saves to PostgreSQL (with fallback to local JSON file).
// When an admin replies, it can send an in-app notification to a registered user.
// Email delivery is not configured.

import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  organisation?: string | null;
  subject: string;
  budget?: string | null;
  message: string;
  status: 'UNREAD' | 'REPLIED' | 'ARCHIVED';
  replyText?: string | null;
  repliedAt?: string | null;
  repliedBy?: string | null;
  ip?: string | null;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_FILE = path.join(DATA_DIR, 'contact-inquiries.json');

// Ensure JSON backup directory exists
function ensureFileStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(JSON_FILE)) {
    fs.writeFileSync(JSON_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readJsonInquiries(): ContactInquiry[] {
  try {
    ensureFileStore();
    const raw = fs.readFileSync(JSON_FILE, 'utf8');
    return JSON.parse(raw) as ContactInquiry[];
  } catch {
    return [];
  }
}

function writeJsonInquiries(inquiries: ContactInquiry[]): void {
  try {
    ensureFileStore();
    fs.writeFileSync(JSON_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
  } catch {
    console.error('Failed to write contact inquiries to the local fallback.');
  }
}

let tableEnsured = false;
async function ensureDbTable(): Promise<void> {
  if (tableEnsured) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        organisation VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        budget VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(32) DEFAULT 'UNREAD',
        reply_text TEXT,
        replied_at TIMESTAMP WITH TIME ZONE,
        replied_by VARCHAR(255),
        ip VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    tableEnsured = true;
  } catch {
    console.warn('Could not ensure the contact inquiry table; using the local fallback.');
  }
}

export async function createContactInquiry(data: {
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  budget?: string;
  message: string;
}): Promise<ContactInquiry> {
  const id = `cinq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const inquiry: ContactInquiry = {
    id,
    name: data.name,
    email: data.email,
    organisation: data.organisation || null,
    subject: data.subject,
    budget: data.budget || null,
    message: data.message,
    status: 'UNREAD',
    ip: null,
    createdAt: now,
  };

  // 1. Try to save to PostgreSQL
  try {
    await ensureDbTable();
    await prisma.$executeRawUnsafe(
      `INSERT INTO contact_inquiries (id, name, email, organisation, subject, budget, message, status, ip, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      inquiry.id,
      inquiry.name,
      inquiry.email,
      inquiry.organisation,
      inquiry.subject,
      inquiry.budget,
      inquiry.message,
      inquiry.status,
      inquiry.ip,
      new Date(inquiry.createdAt)
    );
  } catch {
    console.warn('Postgres insert failed for contact inquiry; using JSON fallback.');
  }

  // 2. Always persist to JSON fallback
  const all = readJsonInquiries();
  all.unshift(inquiry);
  writeJsonInquiries(all);

  return inquiry;
}

export async function getContactInquiries(statusFilter?: string): Promise<{
  inquiries: ContactInquiry[];
  stats: { total: number; unread: number; replied: number };
}> {
  let list: ContactInquiry[] = [];

  // Try DB first
  try {
    await ensureDbTable();
    const rows: any[] = await prisma.$queryRawUnsafe(`
      SELECT id, name, email, organisation, subject, budget, message, status,
             reply_text as "replyText", replied_at as "repliedAt", replied_by as "repliedBy",
             ip, created_at as "createdAt"
      FROM contact_inquiries
      ORDER BY created_at DESC
    `);

    if (Array.isArray(rows) && rows.length > 0) {
      list = rows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        organisation: r.organisation,
        subject: r.subject,
        budget: r.budget,
        message: r.message,
        status: r.status as 'UNREAD' | 'REPLIED' | 'ARCHIVED',
        replyText: r.replyText,
        repliedAt: r.repliedAt ? new Date(r.repliedAt).toISOString() : null,
        repliedBy: r.repliedBy,
        ip: r.ip,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
      }));
    }
  } catch {
    console.warn('Could not read contact inquiries from Postgres; loading the local fallback.');
  }

  // Merge with JSON file items in case any was stored offline
  const jsonList = readJsonInquiries();
  const map = new Map<string, ContactInquiry>();
  for (const item of list) map.set(item.id, item);
  for (const item of jsonList) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const stats = {
    total: merged.length,
    unread: merged.filter((i) => i.status === 'UNREAD').length,
    replied: merged.filter((i) => i.status === 'REPLIED').length,
  };

  const filtered = statusFilter && statusFilter !== 'ALL'
    ? merged.filter((i) => i.status === statusFilter)
    : merged;

  return { inquiries: filtered, stats };
}

export async function replyToContactInquiry(params: {
  id: string;
  replyText: string;
  repliedBy?: string;
}): Promise<{
  success: boolean;
  inquiry: ContactInquiry | null;
  notifiedInApp: boolean;
  notifiedEmail: boolean;
}> {
  const { id, replyText, repliedBy = 'Admin' } = params;
  const now = new Date().toISOString();

  let target: ContactInquiry | null = null;

  // 1. Update DB
  try {
    await ensureDbTable();
    await prisma.$executeRawUnsafe(
      `UPDATE contact_inquiries
       SET status = 'REPLIED', reply_text = $1, replied_at = $2, replied_by = $3
       WHERE id = $4`,
      replyText,
      new Date(now),
      repliedBy,
      id
    );
  } catch {
    console.warn('Could not update the contact inquiry in Postgres.');
  }

  // 2. Update JSON fallback
  const all = readJsonInquiries();
  const idx = all.findIndex((i) => i.id === id);
  if (idx >= 0) {
    all[idx].status = 'REPLIED';
    all[idx].replyText = replyText;
    all[idx].repliedAt = now;
    all[idx].repliedBy = repliedBy;
    target = all[idx];
    writeJsonInquiries(all);
  }

  if (!target) {
    // If not in JSON, try to fetch from DB
    const { inquiries } = await getContactInquiries();
    target = inquiries.find((i) => i.id === id) || null;
  }

  if (!target) {
    return { success: false, inquiry: null, notifiedInApp: false, notifiedEmail: false };
  }

  // 3. User Notification: Check if sender has an account
  let notifiedInApp = false;
  try {
    const user = await prisma.user.findFirst({
      where: { email: { equals: target.email, mode: 'insensitive' } },
    });

    if (user) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'system',
          title: `Reply from Kunwar Analytics: ${target.subject}`,
          body: replyText,
          href: '/contact',
          read: false,
        },
      });
      notifiedInApp = true;
    }
  } catch {
    console.warn('Failed to insert the in-app contact reply notification.');
  }

  // No email provider is configured. Keep this false and do not log recipient
  // addresses or message contents as a substitute for delivery.
  const notifiedEmail = false;

  return {
    success: true,
    inquiry: target,
    notifiedInApp,
    notifiedEmail,
  };
}
