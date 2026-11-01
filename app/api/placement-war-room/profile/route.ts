import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-guards';
import { z } from 'zod';

const profileSchema = z.object({
  qualification: z.string().optional(),
  specialisation: z.string().optional(),
  academicLevel: z.string().optional(),
  targetRole: z.string().optional(),
  targetCompany: z.string().optional(),
  interviewDate: z.string().optional(),
  experience: z.string().optional(),
  internships: z.string().optional(),
  skills: z.string().optional(),
  proficiency: z.string().optional(),
  preferredDifficulty: z.string().optional(),
  dailyPrepTime: z.number().optional(),
  explanationStyle: z.string().optional(),
  preferredLanguage: z.string().optional(),
  improvementTopics: z.string().optional(),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ profile: profile ?? null });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = profileSchema.parse(body);

    const profile = await prisma.candidateProfile.upsert({
      where: { userId: user.id },
      update: {
        ...validated,
        interviewDate: validated.interviewDate ? new Date(validated.interviewDate) : undefined,
        onboardingComplete: true,
        onboardedAt: new Date(),
      },
      create: {
        userId: user.id,
        ...validated,
        interviewDate: validated.interviewDate ? new Date(validated.interviewDate) : undefined,
        onboardingComplete: true,
        onboardedAt: new Date(),
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}