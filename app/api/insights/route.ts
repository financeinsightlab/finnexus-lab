// FILE: app/api/insights/route.ts
import { NextResponse } from 'next/server';
import { getAllInsights } from '@/lib/content';

export const revalidate = 3600;

export async function GET() {
  try {
    const insights = getAllInsights();
    return NextResponse.json(insights, {
      headers: {
        // Local content changes with a deployment; retain the full public response.
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}