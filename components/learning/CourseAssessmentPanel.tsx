'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';

interface TestQuestion {
  id: string;
  prompt: string;
  options: unknown[];
  marks: number;
}
interface AssessmentPayload {
  assessment: null | {
    id: string;
    title: string;
    instructions: string | null;
    passPercentage: number;
    maxAttempts: number | null;
    questions: TestQuestion[];
  };
  completion?: { totalLessons: number; completedLessons: number; eligible: boolean };
  attempts?: { id: string; attemptNumber: number; score: number; maxScore: number; percentage: number; passed: boolean; submittedAt: string }[];
  attemptsRemaining?: number | null;
  alreadyPassed?: boolean;
  certificate?: { certificateId: string; status: string; issuedAt: string } | null;
}
interface SubmissionResult {
  attempt: { attemptNumber: number; score: number; maxScore: number; percentage: number; passed: boolean };
  passed: boolean;
  passPercentage: number;
  review: { questionId: string; prompt: string; selectedOption: number; correctOption: number; options: unknown[]; isCorrect: boolean; explanation: string }[];
  certificate: { certificateId: string; status: string } | null;
}

function optionLabel(option: unknown) {
  return typeof option === 'string' || typeof option === 'number' ? String(option) : '';
}

export default function CourseAssessmentPanel({ courseSlug, returnTo }: { courseSlug: string; returnTo: string }) {
  const [data, setData] = useState<AssessmentPayload | null>(null);
  const [status, setStatus] = useState<'loading' | 'anonymous' | 'ready' | 'error'>('loading');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const questionCount = data?.assessment?.questions.length ?? 0;
  const allAnswered = useMemo(() => questionCount > 0 && data?.assessment?.questions.every((question) => answers[question.id] !== undefined), [answers, data?.assessment?.questions, questionCount]);

  const loadAssessment = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`/api/learning/courses/${encodeURIComponent(courseSlug)}/assessment`, { cache: 'no-store', signal });
      if (response.status === 401) { setStatus('anonymous'); return; }
      if (!response.ok) throw new Error('Assessment status could not be loaded. Please retry.');
      const payload = await response.json() as AssessmentPayload;
      setData(payload);
      setStatus('ready');
    } catch (error) {
      if (!signal?.aborted) {
        setMessage(error instanceof Error ? error.message : 'Assessment unavailable.');
        setStatus('error');
      }
    }
  }, [courseSlug]);

  useEffect(() => {
    const controller = new AbortController();
    void loadAssessment(controller.signal);
    return () => controller.abort();
  }, [loadAssessment]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data?.assessment || !allAnswered || busy) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/learning/assessments/${encodeURIComponent(data.assessment.id)}/attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: data.assessment.questions.map((question) => ({ questionId: question.id, selectedOption: answers[question.id] })) }),
        cache: 'no-store',
      });
      const payload = await response.json().catch(() => ({})) as SubmissionResult & { error?: string };
      if (!response.ok) {
        setMessage(payload.error ?? 'Test submission failed. Please retry.');
        return;
      }
      setResult(payload);
      await loadAssessment();
    } catch {
      setMessage('Test submission failed. Check your connection and retry.');
    } finally {
      setBusy(false);
    }
  };

  const retry = () => {
    setResult(null);
    setAnswers({});
    setMessage('');
  };

  return (
    <section id="final-test" className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8" aria-labelledby="final-test-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Course completion</p>
          <h2 id="final-test-heading" className="mt-2 text-2xl font-extrabold text-foreground">Final knowledge check</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">The course is complete only when every published lesson is completed and you pass this course’s published final test. Retakes follow the limit set by the course editor.</p>
        </div>
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">Passing score required</span>
      </div>

      {status === 'loading' && <p className="mt-6 text-sm text-muted-foreground" role="status">Loading final test…</p>}
      {status === 'anonymous' && (
        <p className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">Sign in to see your progress and take the final test.{' '}
          <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(returnTo)}`} className="font-semibold text-primary underline underline-offset-4">Sign in</Link>
        </p>
      )}
      {status === 'error' && <p className="mt-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive" role="alert">{message}</p>}
      {status === 'ready' && !data?.assessment && (
        <p className="mt-6 rounded-xl border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">A final test has not been published for this course yet. Course completion and certificates remain unavailable until an editor publishes one.</p>
      )}
      {status === 'ready' && data?.assessment && (
        <div className="mt-6">
          <div className="rounded-2xl border border-border bg-background p-5">
            <h3 className="text-lg font-bold text-foreground">{data.assessment.title}</h3>
            {data.assessment.instructions && <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">{data.assessment.instructions}</p>}
            <p className="mt-3 text-xs text-muted-foreground">Pass mark: {data.assessment.passPercentage}% · {questionCount} questions · {data.assessment.maxAttempts === null ? 'Retakes allowed' : `${data.assessment.maxAttempts} maximum attempts`}</p>
          </div>

          {data.completion && (
            <div className="mt-4 rounded-xl bg-muted/70 p-4 text-sm" role="status">
              <p className="font-semibold text-foreground">Lesson criteria: {data.completion.completedLessons} / {data.completion.totalLessons} completed</p>
              <p className="mt-1 text-muted-foreground">{data.completion.eligible ? 'You are eligible to take the final test.' : 'Complete every published lesson before submitting the test.'}</p>
            </div>
          )}
          {data.certificate?.status === 'ACTIVE' && (
            <p className="mt-4 text-sm font-semibold text-primary">This course has an active completion certificate.{' '}
              <Link href={`/certificates/course/${encodeURIComponent(courseSlug)}`} className="underline underline-offset-4">View private completion certificate</Link>
            </p>
          )}

          {result && (
            <div className={`mt-5 rounded-2xl border p-5 ${result.passed ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-amber-500/30 bg-amber-500/10'}`} role="status" aria-live="polite">
              <p className="text-lg font-bold text-foreground">{result.passed ? 'Final test passed' : 'Final test not passed yet'}</p>
              <p className="mt-1 text-sm text-muted-foreground">Attempt {result.attempt.attemptNumber}: {result.attempt.score} / {result.attempt.maxScore} points ({result.attempt.percentage}%). Required: {result.passPercentage}%.</p>
              {result.certificate?.certificateId && <Link href={`/certificates/course/${encodeURIComponent(courseSlug)}`} className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">View your course certificate</Link>}
              <ol className="mt-5 space-y-3">
                {result.review.map((answer, index) => (
                  <li key={answer.questionId} className="rounded-xl bg-background/80 p-4">
                    <p className="font-semibold text-foreground">{index + 1}. {answer.prompt}</p>
                    <p className={`mt-2 text-sm ${answer.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-destructive'}`}>
                      Your answer: {optionLabel(answer.options[answer.selectedOption])}{answer.isCorrect ? ' — correct' : ` · Correct: ${optionLabel(answer.options[answer.correctOption])}`}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{answer.explanation}</p>
                  </li>
                ))}
              </ol>
              {!result.passed && data.attemptsRemaining !== 0 && (
                <button type="button" onClick={retry} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent">Retake final test</button>
              )}
            </div>
          )}

          {!result && !data.alreadyPassed && data.completion?.eligible && data.attemptsRemaining !== 0 && (
            <form onSubmit={submit} className="mt-6 space-y-5">
              {data.assessment.questions.map((question, questionIndex) => (
                <fieldset key={question.id} className="rounded-2xl border border-border p-4 sm:p-5">
                  <legend className="max-w-full px-2 text-sm font-bold leading-6 text-foreground">{questionIndex + 1}. {question.prompt} <span className="text-xs font-normal text-muted-foreground">({question.marks} {question.marks === 1 ? 'point' : 'points'})</span></legend>
                  <div className="mt-3 space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const label = optionLabel(option);
                      const id = `${question.id}-${optionIndex}`;
                      return (
                        <label key={id} htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground hover:bg-accent">
                          <input id={id} type="radio" name={question.id} value={optionIndex} checked={answers[question.id] === optionIndex} onChange={() => setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))} className="mt-1 h-4 w-4 accent-teal-700" />
                          <span>{label || `Option ${optionIndex + 1}`}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
              {message && <p className="text-sm text-destructive" role="alert">{message}</p>}
              <button type="submit" disabled={!allAnswered || busy} className="min-h-12 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {busy ? 'Submitting…' : 'Submit final test'}
              </button>
            </form>
          )}
          {data.alreadyPassed && !result && <p className="mt-5 rounded-xl bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-800 dark:text-emerald-200">You have already passed this course’s final test. Retakes are closed after a pass.</p>}
          {data.attemptsRemaining === 0 && !data.alreadyPassed && <p className="mt-5 rounded-xl bg-muted p-4 text-sm text-muted-foreground">You have used all allowed attempts. Ask a course administrator if the assessment policy should be reviewed.</p>}
          {(data.attempts?.length ?? 0) > 0 && (
            <details className="mt-6 rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer font-semibold text-foreground">Your previous attempts</summary>
              <ul className="mt-3 space-y-2">
                {data.attempts?.map((attempt) => <li key={attempt.id} className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground"><span>Attempt {attempt.attemptNumber} · {attempt.passed ? 'Passed' : 'Not passed'}</span><span>{attempt.percentage}% · {new Date(attempt.submittedAt).toLocaleDateString('en-IN')}</span></li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
