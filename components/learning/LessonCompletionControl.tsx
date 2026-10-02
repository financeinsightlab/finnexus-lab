'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProgressSnapshot {
  progress?: { completed: boolean; completedAt: string | null; startedAt: string | null } | null;
}

export default function LessonCompletionControl({
  courseSlug,
  lessonSlug,
  returnTo,
}: {
  courseSlug: string;
  lessonSlug: string;
  returnTo: string;
}) {
  const [status, setStatus] = useState<'loading' | 'anonymous' | 'ready' | 'completed' | 'error'>('loading');
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [requiredSeconds, setRequiredSeconds] = useState(60);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function initialise() {
      try {
        const params = new URLSearchParams({ courseSlug, lessonSlug });
        const previous = await fetch(`/api/learning/progress?${params}`, { cache: 'no-store', signal: controller.signal });
        if (previous.status === 401) { setStatus('anonymous'); return; }
        if (!previous.ok) throw new Error('Progress could not be loaded. Please try again.');
        const snapshot = await previous.json() as ProgressSnapshot;
        if (snapshot.progress?.completed) { setStatus('completed'); return; }

        const started = await fetch('/api/learning/progress/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseSlug, lessonSlug }),
          cache: 'no-store',
          signal: controller.signal,
        });
        if (started.status === 401) { setStatus('anonymous'); return; }
        if (!started.ok) throw new Error('Learning session could not be started. Please retry.');
        const data = await started.json() as { startedAt?: string; requiredSeconds?: number; completed?: boolean };
        if (data.completed) { setStatus('completed'); return; }
        const start = data.startedAt ?? new Date().toISOString();
        const requirement = data.requiredSeconds ?? 60;
        setStartedAt(start);
        setRequiredSeconds(requirement);
        setRemainingSeconds(Math.max(0, requirement - Math.floor((Date.now() - new Date(start).getTime()) / 1000)));
        setStatus('ready');
      } catch (error) {
        if (!controller.signal.aborted) {
          setMessage(error instanceof Error ? error.message : 'Progress is unavailable.');
          setStatus('error');
        }
      }
    }
    void initialise();
    return () => controller.abort();
  }, [courseSlug, lessonSlug]);

  useEffect(() => {
    if (status !== 'ready' || !startedAt) return;
    const getRemaining = () => Math.max(0, requiredSeconds - Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000));
    let timer: number | undefined;
    const update = () => {
      const remaining = getRemaining();
      setRemainingSeconds(remaining);
      if (remaining === 0 && timer !== undefined) window.clearInterval(timer);
    };
    update();
    if (getRemaining() > 0) timer = window.setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    return () => {
      if (timer !== undefined) window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
    };
  }, [requiredSeconds, startedAt, status]);

  const completeLesson = async () => {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/learning/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, lessonSlug, completed: true }),
        cache: 'no-store',
      });
      const data = await response.json().catch(() => ({})) as { error?: string; remainingSeconds?: number };
      if (!response.ok) {
        setMessage(data.error ?? 'Lesson completion could not be recorded.');
        if (data.remainingSeconds) setRemainingSeconds(data.remainingSeconds);
        return;
      }
      setStatus('completed');
      setMessage('Lesson progress saved to your private learning dashboard.');
    } catch {
      setMessage('Lesson completion could not be recorded. Check your connection and retry.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm" aria-labelledby="lesson-progress-title">
      <h2 id="lesson-progress-title" className="text-lg font-bold text-foreground">Your learning progress</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">A minimum time gate starts when you open this lesson, and the server checks elapsed time before accepting completion. The timer is not proof of attention. Completing lessons alone does not complete the course; a passing final test is also required.</p>
      {status === 'loading' && <p className="mt-4 text-sm text-muted-foreground" role="status">Checking your private progress…</p>}
      {status === 'anonymous' && (
        <p className="mt-4 text-sm text-muted-foreground">Sign in to save lesson progress and unlock the course final test.{' '}
          <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(returnTo)}`} className="font-semibold text-primary underline underline-offset-4">Sign in</Link>
        </p>
      )}
      {status === 'ready' && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {remainingSeconds > 0 ? `Minimum time gate: ${remainingSeconds} seconds remaining.` : 'Minimum time gate met. Mark this lesson complete when you have finished it.'}
          </p>
          <button type="button" onClick={completeLesson} disabled={remainingSeconds > 0 || busy} className="min-h-11 shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {busy ? 'Saving…' : 'Mark lesson complete'}
          </button>
        </div>
      )}
      {status === 'completed' && <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary" role="status">Lesson complete ✓</p>}
      {status === 'error' && <p className="mt-4 text-sm text-destructive" role="alert">{message}</p>}
      {message && status !== 'error' && <p className="mt-3 text-sm text-muted-foreground" role="status" aria-live="polite">{message}</p>}
    </section>
  );
}
