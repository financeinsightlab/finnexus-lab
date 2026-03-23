// FILE: app/api/insights/route.ts
import { NextResponse } from 'next/server';
import { getAllInsights } from '@/lib/content';

export async function GET() {
  try {
    const insights = getAllInsights();
    return NextResponse.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}