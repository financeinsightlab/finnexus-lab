// lib/pgdm/learning-adapter.ts — adapt the static PGDM curriculum into the
// generic `CourseDefinition` shape consumed by the learning-progress engine.
//
// Keeping this mapping here means the pure progress/recommendation core has no
// knowledge of PGDM specifics — swap in another curriculum and nothing else
// changes.

import { SUBJECTS } from '@/lib/pgdm/curriculum';
import type { CourseDefinition, LessonDefinition } from '@/lib/learning-progress';

type Subject = (typeof SUBJECTS)[number];

export function subjectToCourse(subject: Subject): CourseDefinition {
    const liveLectures = subject.lectures.filter((lecture) => lecture.status === 'live');
    const lessons: LessonDefinition[] = liveLectures.map((lecture, index) => ({
        slug: lecture.slug,
        title: lecture.title,
        minutes: lecture.minutes,
        // Earlier lectures are more foundational — gently prefer them as a
        // tie-breaker while keeping the ranking deterministic.
        weight: Math.max(0, 10 - index),
        tags: [subject.slug, subject.track.toLowerCase()],
    }));

    return {
        slug: subject.slug,
        title: subject.name,
        trackSlug: subject.track,
        tags: [subject.track.toLowerCase(), subject.code.toLowerCase()],
        lessons,
    };
}

export function getCourses(): CourseDefinition[] {
    return SUBJECTS.map(subjectToCourse);
}

export function getCourse(slug: string): CourseDefinition | undefined {
    const subject = SUBJECTS.find((s) => s.slug === slug);
    return subject ? subjectToCourse(subject) : undefined;
}
