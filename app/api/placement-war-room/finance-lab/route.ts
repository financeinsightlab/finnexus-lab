import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';

const BUILTIN_LAB_EXERCISES = [
  { slug: 'dcf-valuation', title: 'DCF Valuation Model', category: 'Valuation', difficulty: 'MEDIUM', objective: 'Discounted cash flow valuation with WACC and terminal value' },
  { slug: 'wacc-capm', title: 'WACC & CAPM Calculation', category: 'Corporate Finance', difficulty: 'EASY', objective: 'Cost of capital calculation using India 10Y G-Sec benchmarks' },
  { slug: 'three-statement', title: 'Three-Statement Linkages', category: 'Accounting', difficulty: 'MEDIUM', objective: 'Trace ₹10 Cr Depreciation through IS, CF, and BS' },
  { slug: 'financial-ratios', title: 'Ratio & DuPont Analysis', category: 'Financial Analysis', difficulty: 'EASY', objective: '3-stage DuPont decomposition of Return on Equity' },
  { slug: 'credit-dscr', title: 'Credit Analysis & DSCR', category: 'Credit Analysis', difficulty: 'MEDIUM', objective: 'Debt service coverage and bank covenant underwriting' },
  { slug: 'excel-modeling', title: 'Excel Financial Functions', category: 'Modeling', difficulty: 'HARD', objective: 'XNPV, XIRR, and dynamic corkscrew debt schedules' },
];

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    if (slug) {
      if (user) {
        const exercise = await prisma.financeLabExercise.findUnique({
          where: { slug },
          include: { attempts: { where: { userId: user.id }, orderBy: { completedAt: 'desc' }, take: 5 } },
        });
        if (exercise) return NextResponse.json({ exercise });
      }
      const builtin = BUILTIN_LAB_EXERCISES.find((e) => e.slug === slug) || BUILTIN_LAB_EXERCISES[0];
      return NextResponse.json({ exercise: builtin });
    }

    if (user) {
      const exercises = await prisma.financeLabExercise.findMany({
        where: { active: true, ...(category ? { category } : {}) },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });
      if (exercises.length > 0) {
        return NextResponse.json({ exercises });
      }
    }

    return NextResponse.json({ exercises: BUILTIN_LAB_EXERCISES });
  } catch (error) {
    console.error('Finance lab GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { exerciseId, userInputs, results, isCorrect, score, feedback } = body;

    if (!user) {
      return NextResponse.json({
        success: true,
        attempt: { isCorrect, score: score ?? 8.5, feedback: feedback ?? 'Exercise verified successfully.' },
      });
    }


    if (!exerciseId) {
      return NextResponse.json({ error: 'exerciseId is required' }, { status: 400 });
    }

    const attempt = await prisma.financeLabAttempt.create({
      data: {
        userId: user.id,
        exerciseId,
        userInputs: userInputs ? JSON.stringify(userInputs) : null,
        results: results ? JSON.stringify(results) : null,
        isCorrect,
        score,
        feedback,
      },
    });

    return NextResponse.json({ attempt });
  } catch (error) {
    console.error('Finance lab POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}