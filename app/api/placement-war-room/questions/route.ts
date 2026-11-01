import { NextResponse } from 'next/server';
import {
  UNIFIED_QUESTION_BANK,
  getUnifiedQuestionsForRole,
  searchUnifiedQuestions,
  getUnifiedQuestionById,
} from '@/lib/placement-war-room/unified-question-bank';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const type = searchParams.get('type');
    const difficulty = searchParams.get('difficulty');
    const id = searchParams.get('id');
    const query = searchParams.get('q');
    const count = parseInt(searchParams.get('count') ?? '50', 10);

    if (id) {
      const question = getUnifiedQuestionById(id);
      if (!question) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
      }
      return NextResponse.json({ question });
    }

    let questions = query ? searchUnifiedQuestions(query) : UNIFIED_QUESTION_BANK;

    if (role) {
      questions = questions.filter((q) => q.role.includes(role as any));
    }

    if (type && type !== 'ALL') {
      questions = questions.filter((q) => q.type === type);
    }

    if (difficulty && difficulty !== 'ALL') {
      questions = questions.filter((q) => q.difficulty === difficulty);
    }

    return NextResponse.json({
      totalCount: UNIFIED_QUESTION_BANK.length,
      filteredCount: questions.length,
      questions: questions.slice(0, count),
    });
  } catch (error) {
    console.error('Questions API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}