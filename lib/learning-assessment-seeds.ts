import { Prisma } from '@prisma/client';
import { getAnalystLevelCourse } from '@/lib/analyst-level-catalog';
import { getSkillAcademyCourse } from '@/lib/skill-academy-catalog';
import { QUIZZES } from '@/lib/pgdm/quizzes';
import { escapeMdxTextSyntax } from '@/lib/markdown-content';
import { prisma } from '@/lib/prisma';
import type { CourseDefinition } from '@/lib/learning-progress';

interface SeedQuestion {
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
  marks: number;
  displayOrder: number;
  published: boolean;
}

interface SeedAssessment {
  title: string;
  instructions: string;
  passPercentage: number;
  maxAttempts: null;
  questions: SeedQuestion[];
}

interface ParsedQuizItem {
  number: number;
  text: string;
}

interface Choice {
  letter: string;
  text: string;
  markedCorrect: boolean;
}

interface QuizSourceQuestion {
  lessonSlug: string;
  lessonIndex: number;
  questionIndex: number;
  prompt: string;
  answerText: string;
  explanation: string;
  choices: Choice[];
  answerLetter: string | null;
  markedCorrectIndex: number;
}

interface ExamCandidate {
  lessonSlug: string;
  lessonIndex: number;
  questionIndex: number;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

const NUMBERED_START = /^\s*(?:[-*+]\s*)?(?:\*\*)?(?:Q)?(\d{1,2})[.)](?:\*\*)?\s*(.*)$/i;
const INLINE_NUMBERED = /\s+(?=(?:\*\*)?(?:Q)?\d{1,2}[.)](?:\*\*)?\s+(?=[A-Z*"'`“]))/g;
const OPTION_LINE = /^\s*(?:[-*+]\s*)?(?:\(([a-f])\)|([a-f])[.)])\s+(.+?)\s*$/i;

function cleanMarkdown(value: string) {
  return escapeMdxTextSyntax(value)
    .replace(/^\s*(?:[-*_]\s*){3,}$/gm, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/&amp;/g, '&')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitInlineNumbered(number: number, text: string): ParsedQuizItem[] {
  const matches = [...text.matchAll(INLINE_NUMBERED)];
  if (!matches.length) return [{ number, text: text.trim() }];

  const items: ParsedQuizItem[] = [];
  let start = 0;
  for (const match of matches) {
    const splitAt = match.index ?? 0;
    const piece = text.slice(start, splitAt).trim();
    if (piece) items.push({ number, text: piece });
    start = splitAt + match[0].length;
  }
  const tail = text.slice(start).trim();
  if (tail) items.push({ number, text: tail });

  // The inline markers are part of the next piece. Re-read the leading number
  // so compact quizzes such as "1. ...? 2. ...?" retain their real numbering.
  return items.map((item, index) => {
    if (index === 0) return item;
    const match = NUMBERED_START.exec(item.text);
    return match
      ? { number: Number(match[1]), text: match[2].trim() }
      : item;
  });
}

function parseNumberedItems(block: string) {
  const parsed: ParsedQuizItem[] = [];
  let current: ParsedQuizItem | null = null;

  for (const line of block.split('\n')) {
    const match = NUMBERED_START.exec(line);
    if (match) {
      if (current) parsed.push(current);
      const parts = splitInlineNumbered(Number(match[1]), match[2]);
      for (const part of parts.slice(0, -1)) parsed.push(part);
      current = parts.at(-1) ?? { number: Number(match[1]), text: match[2].trim() };
    } else if (current) {
      current.text += `\n${line}`;
    }
  }
  if (current) parsed.push(current);

  return new Map(parsed.map((item) => [item.number, item.text.trim()]));
}

function quizSections(markdown: string) {
  const lines = markdown.split('\n');
  const quizIndex = lines.findIndex((line) => /^##\s*❓\s*Quiz\b/i.test(line.trim()));
  if (quizIndex < 0) return null;

  let answerIndex = -1;
  for (let index = quizIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = /^(#{2,6})\s+(.+)$/.exec(line.trim());
    if (!heading) continue;
    if (/(answers?|solutions?|answer\s*key)/i.test(heading[2])) {
      answerIndex = index;
      break;
    }
    if (heading[1].length <= 2) break;
  }
  if (answerIndex < 0) return null;

  let answerEnd = lines.length;
  for (let index = answerIndex + 1; index < lines.length; index += 1) {
    if (/^#{1,2}\s+/.test(lines[index].trim())) {
      answerEnd = index;
      break;
    }
  }

  const questionBlock = lines.slice(quizIndex + 1, answerIndex).join('\n');
  const answerBlock = lines.slice(answerIndex + 1, answerEnd).join('\n');
  return { questions: parseNumberedItems(questionBlock), answers: parseNumberedItems(answerBlock) };
}

function extractChoices(question: string) {
  const lines = question.split('\n');
  const choices: Choice[] = [];
  const promptLines: string[] = [];
  let current: Choice | null = null;
  let foundChoice = false;

  for (const line of lines) {
    const match = OPTION_LINE.exec(line);
    if (match) {
      foundChoice = true;
      if (current) choices.push(current);
      current = {
        letter: (match[1] ?? match[2]).toLowerCase(),
        text: match[3].trim(),
        markedCorrect: match[3].includes('**'),
      };
    } else if (current) {
      if (line.trim()) current.text += ` ${line.trim()}`;
    } else {
      promptLines.push(line);
    }
  }
  if (current) choices.push(current);

  if (choices.length >= 2) return { prompt: promptLines.join('\n').trim(), choices };

  // A few authored quizzes put all (a)/(b)/(c) alternatives on one line.
  for (const line of lines) {
    const markers = [...line.matchAll(/(?<![\w])(?:\(([a-f])\)|([a-f])[.)])\s+/gi)];
    if (markers.length < 2) continue;
    const inlineChoices = markers.map((marker, index): Choice => {
      const start = (marker.index ?? 0) + marker[0].length;
      const end = index + 1 < markers.length ? (markers[index + 1].index ?? line.length) : line.length;
      const text = line.slice(start, end).trim();
      return {
        letter: (marker[1] ?? marker[2]).toLowerCase(),
        text,
        markedCorrect: text.includes('**'),
      };
    });
    const first = markers[0].index ?? 0;
    const prefix = lines.slice(0, lines.indexOf(line)).concat(line.slice(0, first)).join('\n').trim();
    return { prompt: prefix, choices: inlineChoices };
  }

  return { prompt: question.trim(), choices: foundChoice ? choices : [] };
}

function answerKeyLetter(answer: string) {
  const parenthesized = /^\s*(?:\*\*)?\(([a-f])\)(?:\*\*)?\s*(?:[—–:.-]|$)/i.exec(answer);
  if (parenthesized) return parenthesized[1].toLowerCase();
  const labeled = /^\s*(?:answer\s*:?\s*)?(?:\*\*)?([a-f])(?:\*\*)?\s*(?:[—–:-])/i.exec(answer);
  return labeled?.[1]?.toLowerCase() ?? null;
}

function stripAnswerMarker(answer: string) {
  return answer
    .replace(/^\s*(?:\*\*)?\(([a-f])\)(?:\*\*)?\s*(?:[—–:.-])?\s*/i, '')
    .replace(/^\s*(?:answer\s*:?\s*)?(?:\*\*)?[a-f](?:\*\*)?\s*(?:[—–:-])\s*/i, '')
    .trim();
}

function shortOption(value: string) {
  const text = cleanMarkdown(value).replace(/\s+/g, ' ').trim();
  if (text.length <= 470) return text;
  const shortened = text.slice(0, 455);
  const boundary = Math.max(shortened.lastIndexOf('. '), shortened.lastIndexOf('; '), shortened.lastIndexOf(' '));
  return `${shortened.slice(0, boundary > 240 ? boundary : 455).trim()}…`;
}

function normalized(value: string) {
  return cleanMarkdown(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function shuffle<T>(items: T[], seed: string) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = hash(`${seed}:${index}`) % (index + 1);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function prepareSkillQuestions(courseSlug: string, course: NonNullable<ReturnType<typeof getSkillAcademyCourse>>) {
  const parsed: QuizSourceQuestion[] = [];
  course.lessons.forEach((lesson, lessonIndex) => {
    const sections = quizSections(lesson.content);
    if (!sections) return;

    for (const [questionNumber, questionText] of sections.questions) {
      const answerText = sections.answers.get(questionNumber);
      if (!answerText) continue;
      const { prompt: questionPrompt, choices } = extractChoices(questionText);
      const answerLetter = answerKeyLetter(answerText);
      const markedCorrectIndex = choices.findIndex((choice) => choice.markedCorrect);
      const answerBody = stripAnswerMarker(answerText);
      if (!questionPrompt.trim() && choices.length >= 2) continue;
      if (!answerBody.trim() && markedCorrectIndex < 0 && !answerLetter) continue;

      parsed.push({
        lessonSlug: lesson.slug,
        lessonIndex,
        questionIndex: questionNumber,
        prompt: cleanMarkdown(questionPrompt || questionText),
        answerText: answerBody,
        explanation: cleanMarkdown(answerText),
        choices,
        answerLetter,
        markedCorrectIndex,
      });
    }
  });

  const answerBank = [...new Set(parsed.map((item) => {
    const correctChoice = item.answerLetter
      ? item.choices.find((choice) => choice.letter === item.answerLetter)?.text
      : item.markedCorrectIndex >= 0
        ? item.choices[item.markedCorrectIndex]?.text
        : undefined;
    return shortOption(correctChoice || item.answerText);
  }).filter(Boolean))];

  return parsed.flatMap((item): ExamCandidate[] => {
    const sourceChoices = item.choices;
    let correctText = '';
    const explanation = item.explanation || item.answerText;

    if (item.answerLetter) {
      const keyed = sourceChoices.find((choice) => choice.letter === item.answerLetter);
      if (keyed) correctText = keyed.text;
    }
    if (!correctText && item.markedCorrectIndex >= 0) correctText = sourceChoices[item.markedCorrectIndex]?.text ?? '';

    if (sourceChoices.length >= 2 && correctText) {
      const cleaned = sourceChoices
        .map((choice) => shortOption(choice.text))
        .filter((choice, index, array) => choice && array.findIndex((other) => normalized(other) === normalized(choice)) === index);
      const correctNormalized = normalized(shortOption(correctText));
      if (!cleaned.some((choice) => normalized(choice) === correctNormalized)) cleaned.unshift(shortOption(correctText));
      correctText = cleaned.find((choice) => normalized(choice) === correctNormalized) ?? shortOption(correctText);

      const distractors = answerBank.filter((answer) => normalized(answer) !== correctNormalized);
      for (const distractor of shuffle(distractors, `${courseSlug}:${item.lessonSlug}:${item.questionIndex}`)) {
        if (cleaned.length >= 4) break;
        if (!cleaned.some((choice) => normalized(choice) === normalized(distractor))) cleaned.push(distractor);
      }
      const options = shuffle(cleaned.slice(0, 6), `${courseSlug}:${item.lessonSlug}:${item.questionIndex}:choices`);
      const correctOption = options.findIndex((option) => normalized(option) === correctNormalized);
      if (correctOption < 0 || options.length < 2) return [];
      return [{
        lessonSlug: item.lessonSlug,
        lessonIndex: item.lessonIndex,
        questionIndex: item.questionIndex,
        prompt: item.prompt.slice(0, 1950),
        options,
        correctOption,
        explanation: explanation.slice(0, 2900),
      }];
    }

    // Open-response source quizzes are converted into a course-specific
    // multiple-choice check. The correct response comes from that module's
    // answer key; distractors come from other answer keys in the same course.
    correctText = shortOption(item.answerText);
    if (!correctText) return [];
    const correctNormalized = normalized(correctText);
    const options = [correctText];
    const distractors = answerBank.filter((answer) => normalized(answer) !== correctNormalized);
    for (const distractor of shuffle(distractors, `${courseSlug}:${item.lessonSlug}:${item.questionIndex}`)) {
      if (options.length >= 4) break;
      if (!options.some((choice) => normalized(choice) === normalized(distractor))) options.push(distractor);
    }
    if (options.length < 2) return [];
    const shuffledOptions = shuffle(options, `${courseSlug}:${item.lessonSlug}:${item.questionIndex}:choices`);
    const correctOption = shuffledOptions.findIndex((option) => normalized(option) === correctNormalized);
    return [{
      lessonSlug: item.lessonSlug,
      lessonIndex: item.lessonIndex,
      questionIndex: item.questionIndex,
      prompt: `Choose the answer best supported by the course lesson: ${item.prompt}`.slice(0, 1950),
      options: shuffledOptions,
      correctOption,
      explanation: explanation.slice(0, 2900),
    }];
  });
}

function prepareAnalystQuestions(courseSlug: string, course: NonNullable<ReturnType<typeof getAnalystLevelCourse>>) {
  const answerBank = [...new Set(course.lessons.map((lesson) => shortOption(lesson.answer ?? '')).filter(Boolean))];
  return course.lessons.flatMap((lesson, lessonIndex): ExamCandidate[] => {
    if (!lesson.practice?.trim() || !lesson.answer?.trim()) return [];
    const correct = shortOption(lesson.answer);
    const correctNormalized = normalized(correct);
    const options = [correct];
    const distractors = answerBank.filter((answer) => normalized(answer) !== correctNormalized);
    for (const distractor of shuffle(distractors, `${courseSlug}:${lesson.slug}`)) {
      if (options.length >= 4) break;
      if (!options.some((choice) => normalized(choice) === normalized(distractor))) options.push(distractor);
    }
    if (options.length < 2) return [];

    const shuffledOptions = shuffle(options, `${courseSlug}:${lesson.slug}:choices`);
    const correctOption = shuffledOptions.findIndex((option) => normalized(option) === correctNormalized);
    return [{
      lessonSlug: lesson.slug,
      lessonIndex,
      questionIndex: 1,
      prompt: `A learner is asked to complete this practice task: ${cleanMarkdown(lesson.practice)}`.slice(0, 1950),
      options: shuffledOptions,
      correctOption,
      explanation: `Model response: ${cleanMarkdown(lesson.answer)}`.slice(0, 2900),
    }];
  });
}

function spreadAcrossLessons(candidates: ExamCandidate[], courseSlug: string, maximum = 10) {
  const byLesson = new Map<number, ExamCandidate[]>();
  for (const candidate of candidates) {
    const group = byLesson.get(candidate.lessonIndex) ?? [];
    group.push(candidate);
    byLesson.set(candidate.lessonIndex, group);
  }
  const lessons = [...byLesson.values()].map((group) => group.sort((a, b) => a.questionIndex - b.questionIndex));
  if (!lessons.length) return [];

  const selected: ExamCandidate[] = [];
  if (lessons.length > maximum) {
    for (let index = 0; index < maximum; index += 1) {
      const lessonIndex = Math.round(index * (lessons.length - 1) / (maximum - 1));
      const group = lessons[lessonIndex];
      const pick = hash(`${courseSlug}:${group[0].lessonSlug}`) % group.length;
      selected.push(group[pick]);
    }
    return selected;
  }

  const pickedByRound = new Map<number, number>();
  while (selected.length < maximum) {
    let found = false;
    for (let lessonIndex = 0; lessonIndex < lessons.length && selected.length < maximum; lessonIndex += 1) {
      const group = lessons[lessonIndex];
      const used = pickedByRound.get(lessonIndex) ?? 0;
      if (used >= group.length) continue;
      const pick = (hash(`${courseSlug}:${group[0].lessonSlug}`) + used) % group.length;
      selected.push(group[pick]);
      pickedByRound.set(lessonIndex, used + 1);
      found = true;
    }
    if (!found) break;
  }
  return selected;
}

export function buildBuiltInAssessment(courseSlug: string, courseTitle: string): SeedAssessment | null {
  const pgdmQuiz = QUIZZES[courseSlug];
  if (pgdmQuiz?.length) {
    const questions: SeedQuestion[] = pgdmQuiz.map((question, index) => ({
      prompt: question.q,
      options: question.options,
      correctOption: question.answer,
      explanation: question.explain,
      marks: 1,
      displayOrder: index,
      published: true,
    }));
    return {
      title: `${courseTitle} · Final Assessment`,
      instructions: 'Answer every question. The test is scored on the server; passing this assessment after completing the published course lessons records a private completion certificate.',
      passPercentage: 70,
      maxAttempts: null,
      questions,
    };
  }

  const skillCourse = getSkillAcademyCourse(courseSlug);
  const analystCourse = skillCourse ? undefined : getAnalystLevelCourse(courseSlug);
  if (!skillCourse && !analystCourse) return null;

  const candidates = skillCourse
    ? prepareSkillQuestions(courseSlug, skillCourse)
    : prepareAnalystQuestions(courseSlug, analystCourse!);
  const selected = spreadAcrossLessons(candidates, courseSlug, 10);
  if (selected.length < 5) return null;

  const questions: SeedQuestion[] = selected.map((question, index) => ({
    prompt: question.prompt,
    options: question.options,
    correctOption: question.correctOption,
    explanation: question.explanation,
    marks: 1,
    displayOrder: index,
    published: true,
  }));

  return {
    title: `${courseTitle} · Final Assessment`,
    instructions: 'This course-specific final test draws from its module quiz keys and applied exercises. Complete every lesson before submitting. Pass mark: 70%; retakes are available.',
    passPercentage: 70,
    maxAttempts: null,
    questions,
  };
}

/** Provision a built-in final test once, without replacing an editor-managed
 * assessment or an unpublished draft. The unique courseSlug constraint makes
 * simultaneous first visits safe; a losing request reads the winning record. */
export async function ensureBuiltInAssessment(course: CourseDefinition) {
  const existing = await prisma.courseAssessment.findUnique({
    where: { courseSlug: course.slug },
    select: { id: true },
  });
  if (existing) return existing;

  const seed = buildBuiltInAssessment(course.slug, course.title);
  if (!seed || seed.questions.length === 0) return null;

  try {
    return await prisma.$transaction(async (tx) => {
      const concurrent = await tx.courseAssessment.findUnique({
        where: { courseSlug: course.slug },
        select: { id: true },
      });
      if (concurrent) return concurrent;

      const assessment = await tx.courseAssessment.create({
        data: {
          courseSlug: course.slug,
          title: seed.title,
          instructions: seed.instructions,
          passPercentage: seed.passPercentage,
          maxAttempts: seed.maxAttempts,
          published: true,
        },
        select: { id: true },
      });
      await tx.courseAssessmentQuestion.createMany({
        data: seed.questions.map((question) => ({
          ...question,
          assessmentId: assessment.id,
          options: question.options as Prisma.InputJsonValue,
        })),
      });
      return assessment;
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return prisma.courseAssessment.findUnique({ where: { courseSlug: course.slug }, select: { id: true } });
    }
    throw error;
  }
}
