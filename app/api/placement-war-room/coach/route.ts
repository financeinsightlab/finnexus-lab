import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { placementWarRoomAiChat, buildSystemPrompt } from '@/lib/placement-war-room/ai-client';
import { consumeRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: max 40 coach messages per hour per candidate
    const rateLimit = await consumeRateLimit('placement-war-room:coach', user.id, {
      limit: 40,
      windowSeconds: 3600,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a few moments before asking another question.', retryAfterSeconds: rateLimit.retryAfterSeconds },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, history = [], context = {} } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message exceeds maximum length of 2000 characters' }, { status: 400 });
    }

    // Load candidate profile from database
    const profile = await prisma.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    // Load candidate weak/strong topics from database
    const topicPerfs = await prisma.topicPerformance.findMany({
      where: { userId: user.id },
      take: 10,
      orderBy: { updatedAt: 'desc' },
    });

    const weakTopics = topicPerfs.filter((t) => t.weakest).map((t) => `${t.subject} (${t.subtopic})`);
    const strongTopics = topicPerfs.filter((t) => t.strongest).map((t) => `${t.subject} (${t.subtopic})`);

    const targetRole = context.targetRole || profile?.targetRole || 'Investment Banking';
    const targetCompany = context.targetCompany || profile?.targetCompany || 'Top Institutional Firm';
    const interviewDate = profile?.interviewDate ? profile.interviewDate.toISOString().split('T')[0] : 'Upcoming';

    // System prompt with rich candidate context
    const systemPrompt = `${buildSystemPrompt('coach')}

CANDIDATE CONTEXT:
- Target Role: ${targetRole}
- Target Company / Category: ${targetCompany}
- Scheduled Interview: ${interviewDate}
- Identified Weak Topics: ${weakTopics.length > 0 ? weakTopics.join(', ') : 'Accounting Fundamentals, WACC Build-up'}
- Strong Areas: ${strongTopics.length > 0 ? strongTopics.join(', ') : 'Ratio Analysis'}
- Qualification: ${profile?.qualification || 'PGDM / MBA Finance'}

GUIDELINES:
1. Explain financial formulas and mechanics step-by-step with Indian regulatory nuances (Ind AS, RBI, 10Y G-Sec, SEBI).
2. Clearly distinguish verified financial facts from educational assumptions and general role preparation guidance.
3. If asked about numerical problems, show the exact calculations clearly.
4. Never invent internal hiring processes or confidential interview questions for named companies.
5. Keep explanations dense, institutional, and directly actionable for interview rounds.`;

    const chatMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    // Include last 6 messages from conversation history for context
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    for (const h of recentHistory) {
      if (h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string') {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1500) });
      }
    }

    // Add current user message
    chatMessages.push({ role: 'user', content: message.trim() });

    try {
      const reply = await placementWarRoomAiChat(chatMessages, {
        maxTokens: 900,
        temperature: 0.3,
      });

      return NextResponse.json({
        success: true,
        reply,
        provider: 'central-ai-gateway',
      });
    } catch (aiError) {
      console.warn('AI Coach provider call failed, returning rule-based coaching response:', (aiError as Error).message);
      
      // Fallback response with structured guidance
      const fallbackReply = generateFallbackCoachReply(message, targetRole, targetCompany);
      return NextResponse.json({
        success: true,
        reply: fallbackReply,
        provider: 'rule-based-fallback',
      });
    }
  } catch (error) {
    console.error('AI Coach error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateFallbackCoachReply(message: string, role: string, company: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('dcf') || lower.includes('wacc') || lower.includes('discount')) {
    return `**DCF & WACC Quick Reference:**\n\n1. **Unlevered Free Cash Flow (UFCF)**:\n   $$\\text{UFCF} = \\text{EBIT}(1 - T) + \\text{D\\&A} - \\text{CapEx} - \\Delta\\text{NWC}$$\n2. **WACC for Indian Firms**:\n   - Cost of Equity ($K_e$): Risk-free rate (India 10Y G-Sec benchmark ~6.84%) + Beta × Equity Risk Premium (India ERP ~5.5% - 6.0%).\n   - Cost of Debt ($K_d$): Pre-tax borrowing rate × $(1 - 25.17\\%\\text{ statutory corporate tax})$.\n   - Indian WACCs typically trade between **11.5% - 14.0%**, compared to 7.5% - 9.0% in mature US markets due to sovereign risk spreads.\n\n*Practice tip for ${role}*: Interviewers at ${company} routinely ask how a ₹10 Cr increase in CapEx flows through all 3 statements.`;
  }

  if (lower.includes('depreciation') || lower.includes('statement') || lower.includes('accounting')) {
    return `**Three-Statement Mechanics (e.g., ₹10 Cr Depreciation Increase under Ind AS):**\n\n1. **Income Statement**:\n   - Operating Expenses increase by ₹10 Cr.\n   - Operating Profit (EBIT) decreases by ₹10 Cr.\n   - Assuming a 25% corporate tax rate, Net Profit (PAT) decreases by **₹7.5 Cr** (₹10 Cr - ₹2.5 Cr tax shield).\n2. **Cash Flow Statement**:\n   - Net income starts ₹7.5 Cr lower.\n   - Add back non-cash Depreciation: +₹10 Cr.\n   - Cash flow from operations (CFO) increases by **₹2.5 Cr** (the cash tax shield).\n3. **Balance Sheet**:\n   - Assets: Cash is up by ₹2.5 Cr; PP&E is down by ₹10 Cr (Net Assets: -₹7.5 Cr).\n   - Equity: Retained Earnings is down by ₹7.5 Cr (from Net Income).\n   - The Balance Sheet balances!`;
  }

  return `Here is key guidance for your **${role}** interview at **${company}**:\n\n- **Structure Your Answers (MECE)**: Always start with your conclusion, provide 2-3 structured supporting pillars, and conclude with the quantified impact.\n- **Quantify Everything**: Mention exact metrics (e.g., 10Y G-Sec yield ~6.84%, corporate tax rate 25.17%, typical net debt/EBITDA covenants 2.5x-3.0x).\n- **Indian Regulatory Nuances**: Refer explicitly to Ind AS 116 (Leases), Ind AS 115 (Revenue), and RBI master directions on provisioning/NPA classification.\n\n*Feel free to ask for step-by-step model walkthroughs, numerical drills, or a mock interview question.*`;
}

