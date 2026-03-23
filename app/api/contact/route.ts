// FILE: app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, organisation, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

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
      from: 'contact@finnexuslab.com',
      to: 'hello@finnexuslab.com',
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