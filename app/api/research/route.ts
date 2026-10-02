import { NextResponse } from 'next/server';
import { getAllResearch } from '@/lib/content';

export const revalidate = 3600;

export async function GET() {
  try {
    const research = getAllResearch();
    return NextResponse.json(research, {
      headers: {
        // Local content changes with a deployment; retain the full public response.
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching research:', error);
    return NextResponse.json({ error: 'Failed to fetch research' }, { status: 500 });
  }
}