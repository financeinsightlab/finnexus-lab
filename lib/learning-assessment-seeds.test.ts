import { describe, expect, it, vi } from 'vitest';

vi.mock('@prisma/client', () => ({
  Prisma: { PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {} },
}));
vi.mock('@/lib/prisma', () => ({ prisma: {} }));

import { buildBuiltInAssessment } from '@/lib/learning-assessment-seeds';
import { getLearningCatalog } from '@/lib/learning-course-catalog';

describe('built-in course final assessments', () => {
  it('provides a separate ten-question final test for all 69 Skill Academy and Analyst courses', () => {
    const courses = getLearningCatalog();
    expect(courses).toHaveLength(69);

    for (const course of courses) {
      const assessment = buildBuiltInAssessment(course.slug, course.title);
      expect(assessment, `${course.slug} should have a final assessment`).not.toBeNull();
      expect(assessment?.questions).toHaveLength(10);
      for (const question of assessment?.questions ?? []) {
        expect(question.prompt.length).toBeGreaterThanOrEqual(5);
        expect(question.prompt.length).toBeLessThanOrEqual(2000);
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(question.options.length).toBeLessThanOrEqual(6);
        expect(question.options[question.correctOption]).toBeTruthy();
        expect(question.explanation.length).toBeLessThanOrEqual(3000);
      }
    }
  });

  it('leaves PGDM assessments sourced from the existing subject quiz bank', () => {
    const assessment = buildBuiltInAssessment('project-management', 'Project Management');
    expect(assessment?.questions).toHaveLength(10);
    expect(assessment?.questions[0].prompt).toBe('What does the project triple constraint trade off?');
  });
});
