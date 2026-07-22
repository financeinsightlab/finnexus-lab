// FILE: app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  organisation: z.string().max(200).optional(),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message too long'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { name, organisation, email, subject, message } = parsed.data;

    // ⚠ Uncomment this block and add RESEND_API_KEY to Vercel env vars
    /*
    const resend = require('resend');
    const { Resend } = resend;
    const resendClient = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Organisation:</strong> ${organisation || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    await resendClient.emails.send({
      from: 'contact@kunwaranalytics.in',
      to: 'hello@kunwaranalytics.in',
      subject: `New Contact: ${subject}`,
      html: emailHtml,
    });
    */

    // Active implementation - log to console
    console.log('Contact form submission:', {
      name,
      organisation: organisation || 'Not provided',
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
