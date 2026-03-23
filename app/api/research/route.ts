import { NextResponse } from 'next/server';
import { getAllResearch } from '@/lib/content';

export async function GET() {
  try {
    const research = getAllResearch();
    return NextResponse.json(research);
  } catch (error) {
    console.error('Error fetching research:', error);
    return NextResponse.json({ error: 'Failed to fetch research' }, { status: 500 });
  }
}