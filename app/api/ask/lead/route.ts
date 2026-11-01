// app/api/ask/lead/route.ts — Progressive Lead Capture from Ask Kunwar Assistant

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createContactInquiry } from '@/lib/contact-inquiries';

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(120),
  phone: z.string().max(25).optional(),
  organization: z.string().max(120).optional(),
  serviceInterest: z.string().max(50).default('CONSULTATION'),
  projectRequirements: z.string().max(2000).optional(),
  sourceUrl: z.string().max(300).optional(),
  conversationSummary: z.string().max(3000).optional(),
  consentGiven: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.format() }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      organization,
      serviceInterest,
      projectRequirements,
      sourceUrl,
      conversationSummary,
      consentGiven,
    } = parsed.data;

    // Save to AILeadCapture
    const lead = await prisma.aILeadCapture.create({
      data: {
        name,
        email,
        phone,
        organization,
        serviceInterest,
        projectRequirements,
        sourceUrl,
        conversationSummary,
        consentGiven,
        status: 'NEW',
      },
    });

    // Also bridge to Contact Inquiries for unified admin messages
    await createContactInquiry({
      name,
      email,
      organisation: organization,
      subject: `[AI Lead] ${serviceInterest} Request from ${name}`,
      message: `Service Interest: ${serviceInterest}
Phone: ${phone || 'Not provided'}
Organization: ${organization || 'Individual'}
Page Source: ${sourceUrl || 'Global Assistant'}

Requirements / Context:
${projectRequirements || 'Inquired via Ask Kunwar assistant.'}

Recent Conversation Summary:
${conversationSummary || 'N/A'}`,
    }).catch(() => {
      // Fallback safe if contact store issues
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Thank you! A member of the Kunwar Analytics institutional advisory team will review your inquiry.',
    });
  } catch (error) {
    console.error('Failed to capture lead:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
