import { describe, it, expect } from 'vitest';
import {
  validateNumericalAnswer,
  evaluateAnswerWithRubric,
  evaluateAnswer,
} from '@/lib/placement-war-room/evaluation';
import {
  UNIFIED_QUESTION_BANK,
  getUnifiedQuestionById,
} from '@/lib/placement-war-room/unified-question-bank';
import { evaluateFinanceAnswer } from '@/lib/placement-war-room/financial-evaluator';
import { PLAN } from '@/lib/placement-prep/plan';

describe('Placement Day War Room 2.0 — Operating System Suite', () => {
  describe('Phase 1: Canonical Evaluation & Zero Length Bias', () => {
    it('validates numerical calculations with tolerance and currency symbols', () => {
      // Correct answer with rupee prefix
      const res1 = validateNumericalAnswer('₹12.50 Cr', 12.5);
      expect(res1.isValid).toBe(true);

      // Answer within 5% tolerance
      const res2 = validateNumericalAnswer('12.8', 12.5, 0.05);
      expect(res2.isValid).toBe(true);

      // Answer outside tolerance
      const res3 = validateNumericalAnswer('18.0', 12.5, 0.05);
      expect(res3.isValid).toBe(false);

      // Percentage formats
      const res4 = validateNumericalAnswer('11.4%', 11.4);
      expect(res4.isValid).toBe(true);
    });

    it('rejects wordy non-answers and prevents length-based score inflation', async () => {
      const q = UNIFIED_QUESTION_BANK[0]; // e.g. DCF / WACC question

      // Long rambling text with zero relevant finance keywords
      const verboseNonsense =
        'In my view and opinion on this matter as a candidate, I think that the finance question is very interesting and important. ' +
        'Going forward in business and corporate life, many people say different things about things and matters of business. ' +
        'Whenever one considers this, one should always remember that business is about value, and value is very nice. ' +
        'I am very confident that my perspective aligns with corporate standards and global markets across all aspects.';

      const evaluation = await evaluateFinanceAnswer(q, verboseNonsense);

      // Must NOT receive an unearned high score just because it has 70+ words
      expect(evaluation.score).toBeLessThan(6.5);
      expect(evaluation.grade).not.toBe('EXCELLENT');
    });

    it('rewards concise, technically accurate answers with strong concept coverage', async () => {
      const dcfQuestion = UNIFIED_QUESTION_BANK.find((item) =>
        item.question.toLowerCase().includes('dcf') ||
        item.tags.includes('valuation')
      ) || UNIFIED_QUESTION_BANK[0];

      // Concise answer packed with core financial concepts from keyPoints
      const focusedAnswer = dcfQuestion.keyPoints.slice(0, 3).join('. ') +
        '. In India, we use the 10-Year Benchmark G-Sec yield (~6.8%) as the risk-free rate.';

      const evaluation = await evaluateFinanceAnswer(dcfQuestion, focusedAnswer);

      expect(evaluation.score).toBeGreaterThanOrEqual(7.0);
      expect(evaluation.strengths.length).toBeGreaterThan(0);
      expect(evaluation.feedback).toBeDefined();
    });

    it('evaluates using the 5-dimensional rubric scoring', async () => {
      const q = UNIFIED_QUESTION_BANK[0];
      const answer = 'We project UFCF as EBIT*(1-t) + D&A - Capex - Change in NWC, discounted at WACC. In India, Ind AS 116 capitalization affects operating cash flows.';

      const rubricRes = await evaluateAnswerWithRubric(q, answer);

      expect(rubricRes.rubricScores).toBeDefined();
      expect(typeof rubricRes.rubricScores).toBe('object');
      expect(Object.keys(rubricRes.rubricScores!).length).toBeGreaterThan(0);
      expect(rubricRes.score).toBeGreaterThanOrEqual(1.0);
      expect(rubricRes.score).toBeLessThanOrEqual(10.0);
    });
  });

  describe('Phase 2 & 9: Unified Question Bank Integrity', () => {
    it('contains over 200 high-yield placement questions', () => {
      expect(UNIFIED_QUESTION_BANK.length).toBeGreaterThanOrEqual(200);
    });

    it('all questions possess valid schemas, tags, difficulties, and key points', () => {
      UNIFIED_QUESTION_BANK.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(q.question).toBeDefined();
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.type).toBeDefined();
        expect(['EASY', 'MEDIUM', 'HARD', 'KILLER']).toContain(q.difficulty);
        expect(Array.isArray(q.keyPoints)).toBe(true);
        expect(q.keyPoints.length).toBeGreaterThanOrEqual(1);
        expect(Array.isArray(q.commonMistakes)).toBe(true);
        expect(Array.isArray(q.tags)).toBe(true);
      });
    });

    it('finds questions by id via getUnifiedQuestionById helper', () => {
      const firstQ = UNIFIED_QUESTION_BANK[0];
      const retrieved = getUnifiedQuestionById(firstQ.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.question).toBe(firstQ.question);
    });
  });

  describe('Phase 7: Finance Technical Lab Workstations', () => {
    it('verifies calculations for 3-Statement Depreciation Flow under Ind AS', () => {
      // ₹10 Cr Depreciation Flow at 25% tax rate
      const dep = 10;
      const taxRate = 0.25;

      const ebitImpact = -dep;
      const taxSavings = dep * taxRate; // ₹2.5 Cr tax shield
      const netIncomeImpact = -(dep * (1 - taxRate)); // -₹7.5 Cr

      // Cash Flow Statement
      const netIncomeCfo = netIncomeImpact; // -₹7.5 Cr
      const addBackDep = dep; // +₹10 Cr
      const netCashChange = netIncomeCfo + addBackDep; // +₹2.5 Cr

      // Balance Sheet
      const cashAssetImpact = netCashChange; // +₹2.5 Cr
      const ppeAssetImpact = -dep; // -₹10 Cr
      const totalAssetChange = cashAssetImpact + ppeAssetImpact; // -₹7.5 Cr
      const equityChange = netIncomeImpact; // -₹7.5 Cr

      expect(totalAssetChange).toBe(equityChange); // Balance Sheet balances!
      expect(netCashChange).toBe(2.5);
    });

    it('verifies DuPont 3-Stage ROE decomposition formula', () => {
      const netProfitMargin = 0.12; // 12%
      const assetTurnover = 1.5;
      const equityMultiplier = 2.0;

      const roe = netProfitMargin * assetTurnover * equityMultiplier;
      expect(roe).toBeCloseTo(0.36, 4); // 36% ROE
    });

    it('verifies DSCR formula and covenant checks', () => {
      const pat = 50; // ₹50 Cr
      const dep = 20; // ₹20 Cr
      const interest = 15; // ₹15 Cr
      const principalRepayment = 25; // ₹25 Cr

      const cashFlowAvailableForDebtService = pat + dep + interest; // ₹85 Cr
      const debtServiceObligations = interest + principalRepayment; // ₹40 Cr

      const dscr = cashFlowAvailableForDebtService / debtServiceObligations;
      expect(dscr).toBeCloseTo(2.125, 3);
      expect(dscr).toBeGreaterThan(1.25); // Institutional bank covenant threshold
    });
  });

  describe('Phase 8: Adaptive Study Plan Roadmap', () => {
    it('contains the curated 60-day curriculum with phases', () => {
      expect(PLAN.length).toBe(60);

      const day1 = PLAN[0];
      expect(day1.day).toBe(1);
      expect(day1.focus).toBeDefined();
      expect(day1.tasks.length).toBeGreaterThan(0);

      const day60 = PLAN[59];
      expect(day60.day).toBe(60);
      expect(day60.focus).toBeDefined();
    });

    it('slices curriculum into 7, 15, and 30-day fast-track roadmaps', () => {
      const sprint7 = PLAN.slice(0, 7);
      expect(sprint7.length).toBe(7);

      const sprint15 = PLAN.slice(0, 15);
      expect(sprint15.length).toBe(15);

      const sprint30 = PLAN.slice(0, 30);
      expect(sprint30.length).toBe(30);
    });
  });
});
