import { describe, expect, it } from 'vitest';
import {
  getLearningCatalog,
  getSkillAcademyLearningCatalog,
  getAnalystCompleteLearningCatalog,
} from '@/lib/learning-course-catalog';
import { getAnalystLevelCourses } from '@/lib/analyst-level-catalog';
import { escapeMdxTextSyntax } from '@/lib/markdown-content';

const courses = getLearningCatalog();

describe('structured learning catalog', () => {
  it('exposes 54 Skill Academy tracks and 15 separate Analyst levels', () => {
    expect(courses).toHaveLength(69);
    expect(courses.filter((course) => course.source === 'SKILL_ACADEMY')).toHaveLength(54);
    expect(courses.filter((course) => course.source === 'ANALYST_COMPLETE')).toHaveLength(15);
    expect(courses.filter((course) => course.source === 'ANALYST_COMPLETE').map((course) => course.level)).toEqual(
      Array.from({ length: 15 }, (_, level) => level),
    );
  });

  it('keeps the Skill Academy and Analyst Complete clusters independently selectable', () => {
    const skillAcademy = getSkillAcademyLearningCatalog();
    const analystComplete = getAnalystCompleteLearningCatalog();

    expect(skillAcademy).toHaveLength(54);
    expect(analystComplete).toHaveLength(15);
    expect(skillAcademy.every((course) => course.source === 'SKILL_ACADEMY')).toBe(true);
    expect(analystComplete.every((course) => course.source === 'ANALYST_COMPLETE')).toBe(true);
    expect(new Set(skillAcademy.map((course) => course.slug)).size).toBe(54);
    expect(new Set(analystComplete.map((course) => course.slug)).size).toBe(15);
    expect(new Set([...skillAcademy, ...analystComplete].map((course) => course.slug)).size).toBe(69);
  });

  it('gives every course its own slug, course page, and existing lesson content', () => {
    expect(new Set(courses.map((course) => course.slug)).size).toBe(69);
    for (const course of courses) {
      expect(course.href).toBe(`/study/course/${course.slug}`);
      expect(course.lessonCount).toBeGreaterThan(0);
      expect(course.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it('keeps the two IC tracks distinct and keeps supplementary references out of lesson counts', () => {
    const interview = courses.find((course) => course.slug === 'academy-interview-communication');
    const inventory = courses.find((course) => course.slug === 'academy-inventory-cogs');
    const powerBi = courses.find((course) => course.slug === 'academy-power-bi');
    expect(interview?.lessonCount).toBe(5);
    expect(inventory?.lessonCount).toBe(12);
    expect(powerBi?.lessonCount).toBe(10);
  });

  it('retains applied practice and model answers throughout Analyst Levels 0–14', () => {
    const levels = getAnalystLevelCourses();
    expect(levels).toHaveLength(15);
    for (const level of levels) {
      expect(level.lessons.length).toBeGreaterThan(0);
      for (const lesson of level.lessons) {
        expect(lesson.practice.trim()).not.toBe('');
        expect(lesson.answer.trim()).not.toBe('');
        expect(lesson.content).toContain(escapeMdxTextSyntax(lesson.practice));
        expect(lesson.content).toContain(escapeMdxTextSyntax(lesson.answer));
      }
    }
  });
});
