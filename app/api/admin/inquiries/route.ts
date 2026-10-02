// app/api/admin/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { getContactInquiries } from '@/lib/contact-inquiries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !isStaff(user)) {
      return NextResponse.json({ error: 'Unauthorized — Staff access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const data = await getContactInquiries(status);
    return NextResponse.json(data);
  } catch {
    console.error('Failed to load contact inquiries.');
    return NextResponse.json({ error: 'Failed to load inquiries' }, { status: 500 });
  }
}
