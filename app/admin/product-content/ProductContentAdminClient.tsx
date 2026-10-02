'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PromotionManager from './promotions/PromotionManager';
import {
  api,
  buttonClass,
  Field,
  inputClass,
  listFromText,
  NoticeBanner,
  primaryButtonClass,
  StatusBadge,
  textAreaClass,
  Toggle,
  type Notice,
} from './ui';

export interface AdminCourseOption {
  slug: string;
  title: string;
  kind: 'PGDM' | 'STUDY';
  published: boolean;
}

type AdminTab = 'faqs' | 'terms' | 'courses' | 'promotions' | 'related';
interface FaqRecord {
  id: string; slug: string; question: string; answer: string; category: string | null;
  relatedType: string; relatedSlug: string; displayOrder: number; published: boolean; seoVisible: boolean;
}
type FaqDraft = Omit<FaqRecord, 'id' | 'category'> & { id?: string; category: string };
function blankFaq(): FaqDraft { return { slug: '', question: '', answer: '', category: '', relatedType: 'PAGE', relatedSlug: '', displayOrder: 0, published: false, seoVisible: true }; }

function FaqManager() {
  const [faqs, setFaqs] = useState<FaqRecord[]>([]);
  const [draft, setDraft] = useState<FaqDraft>(blankFaq);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => { void api<{ faqs: FaqRecord[] }>('/api/admin/content/faqs').then((data) => setFaqs(data.faqs)).catch((error: unknown) => setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'FAQs could not be loaded.' })).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => faqs.filter((faq) => `${faq.question} ${faq.relatedType} ${faq.relatedSlug}`.toLowerCase().includes(filter.toLowerCase())), [faqs, filter]);
  const update = <K extends keyof FaqDraft>(key: K, value: FaqDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setNotice(null);
    try {
      const { faq } = await api<{ faq: FaqRecord }>('/api/admin/content/faqs', { method: 'POST', body: JSON.stringify({ ...draft, category: draft.category.trim() || null }) });
      setFaqs((current) => [faq, ...current.filter((entry) => entry.id !== faq.id)]);
      setDraft(blankFaq()); setNotice({ kind: 'success', text: 'FAQ saved. Published content and matching schema will update after cache revalidation.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'FAQ could not be saved.' }); }
    finally { setSaving(false); }
  };
  const unpublish = async (id: string) => {
    try { await api('/api/admin/content/faqs', { method: 'DELETE', body: JSON.stringify({ id }) }); setFaqs((current) => current.map((faq) => faq.id === id ? { ...faq, published: false } : faq)); setNotice({ kind: 'success', text: 'FAQ unpublished. The record is retained for editing.' }); }
    catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'FAQ could not be unpublished.' }); }
  };
  const edit = (faq: FaqRecord) => { setDraft({ ...faq, category: faq.category ?? '' }); setNotice({ kind: 'info', text: `Editing “${faq.question}”.` }); };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <section className="order-2 rounded-2xl border border-border bg-card p-5 xl:order-1" aria-labelledby="faq-list-title">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="faq-list-title" className="text-lg font-bold text-foreground">Contextual FAQs</h2><p className="mt-1 text-sm text-muted-foreground">Visible Q&amp;A is grouped by page or content slug.</p></div><span className="text-xs text-muted-foreground">{faqs.length} records</span></div>
        <label htmlFor="faq-filter" className="sr-only">Filter FAQs</label><input id="faq-filter" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter by question or context" className={inputClass} />
        {loading ? <p className="py-8 text-sm text-muted-foreground" role="status">Loading FAQs…</p> : visible.length ? <ul className="mt-4 divide-y divide-border">{visible.map((faq) => <li key={faq.id} className="flex flex-wrap items-start justify-between gap-3 py-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><StatusBadge active={faq.published} /><span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">{faq.relatedType} · {faq.relatedSlug}</span>{faq.published && faq.seoVisible && <span className="text-[10px] text-primary">FAQ schema enabled</span>}</div><p className="mt-2 font-semibold text-foreground">{faq.question}</p><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{faq.answer}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => edit(faq)} className={buttonClass}>Edit</button>{faq.published && <button type="button" onClick={() => void unpublish(faq.id)} className={buttonClass}>Unpublish</button>}</div></li>)}</ul> : <p className="py-8 text-sm text-muted-foreground">No FAQs match this filter.</p>}
      </section>
      <section className="order-1 rounded-2xl border border-border bg-card p-5 xl:order-2" aria-labelledby="faq-editor-title">
        <h2 id="faq-editor-title" className="text-lg font-bold text-foreground">{draft.id ? 'Edit FAQ' : 'Create FAQ'}</h2><p className="mt-1 text-sm text-muted-foreground">FAQPage schema is emitted only for published FAQs marked SEO-visible, and the Q&amp;A is also rendered on the page.</p>
        <div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div>
        <form onSubmit={save} className="mt-4 space-y-4">
          <Field label="Question slug" htmlFor="faq-slug" hint="Lowercase, hyphenated, stable identifier within this page."><input id="faq-slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={120} value={draft.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} /></Field>
          <Field label="Question" htmlFor="faq-question"><input id="faq-question" required minLength={5} maxLength={240} value={draft.question} onChange={(e) => update('question', e.target.value)} className={inputClass} /></Field>
          <Field label="Answer" htmlFor="faq-answer"><textarea id="faq-answer" required minLength={10} maxLength={6000} rows={5} value={draft.answer} onChange={(e) => update('answer', e.target.value)} className={textAreaClass} /></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Context type" htmlFor="faq-type" hint="Examples: PAGE, COURSE, COURSE_LESSON, TRACKER, TOOL."><input id="faq-type" required value={draft.relatedType} onChange={(e) => update('relatedType', e.target.value.toUpperCase())} className={inputClass} /></Field><Field label="Context slug" htmlFor="faq-related-slug" hint="For course lessons, use course-slug/lesson-slug."><input id="faq-related-slug" required value={draft.relatedSlug} onChange={(e) => update('relatedSlug', e.target.value)} className={inputClass} /></Field></div>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Category (optional)" htmlFor="faq-category"><input id="faq-category" value={draft.category} onChange={(e) => update('category', e.target.value)} className={inputClass} /></Field><Field label="Display order" htmlFor="faq-order"><input id="faq-order" type="number" min={0} max={10000} value={draft.displayOrder} onChange={(e) => update('displayOrder', Number(e.target.value))} className={inputClass} /></Field></div>
          <Toggle id="faq-published" label="Published" checked={draft.published} onChange={(value) => update('published', value)} hint="Published FAQs become visible on the matching page." />
          <Toggle id="faq-seo" label="Include in FAQPage schema" checked={draft.seoVisible} onChange={(value) => update('seoVisible', value)} hint="Only mark this if the answer is accurate and visible to visitors." />
          <div className="flex flex-wrap gap-2"><button type="submit" disabled={saving} className={primaryButtonClass}>{saving ? 'Saving…' : 'Save FAQ'}</button><button type="button" onClick={() => { setDraft(blankFaq()); setNotice(null); }} className={buttonClass}>Clear form</button></div>
        </form>
      </section>
    </div>
  );
}

interface TermRecord {
  id: string; slug: string; term: string; simpleMeaning: string; example: string; interviewAnswer: string; formula: string | null;
  category: string; subCategory: string | null; difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'; keywords: string[]; synonyms: string[];
  relatedTermSlugs: string[]; featured: boolean; published: boolean; seoVisible: boolean; displayOrder: number;
}
type TermDraft = Omit<TermRecord, 'id' | 'keywords' | 'synonyms' | 'relatedTermSlugs' | 'formula' | 'subCategory'> & { id?: string; keywordsText: string; synonymsText: string; relatedTermSlugsText: string; formula: string; subCategory: string };
function blankTerm(): TermDraft { return { slug: '', term: '', simpleMeaning: '', example: '', interviewAnswer: '', formula: '', category: 'Finance', subCategory: '', difficulty: 'BEGINNER', keywordsText: '', synonymsText: '', relatedTermSlugsText: '', featured: false, published: false, seoVisible: true, displayOrder: 0 }; }

function FinanceTermManager() {
  const [terms, setTerms] = useState<TermRecord[]>([]);
  const [draft, setDraft] = useState<TermDraft>(blankTerm);
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null); const [filter, setFilter] = useState('');
  useEffect(() => { void api<{ terms: TermRecord[] }>('/api/admin/content/finance-terms').then((data) => setTerms(data.terms)).catch((error: unknown) => setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Finance terms could not be loaded.' })).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => terms.filter((term) => `${term.term} ${term.category} ${term.subCategory ?? ''} ${term.slug}`.toLowerCase().includes(filter.toLowerCase())), [terms, filter]);
  const update = <K extends keyof TermDraft>(key: K, value: TermDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const edit = (term: TermRecord) => { setDraft({ ...term, formula: term.formula ?? '', subCategory: term.subCategory ?? '', keywordsText: term.keywords.join(', '), synonymsText: term.synonyms.join(', '), relatedTermSlugsText: term.relatedTermSlugs.join(', ') }); setNotice({ kind: 'info', text: `Editing “${term.term}”.` }); };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setNotice(null);
    try {
      const { term } = await api<{ term: TermRecord }>('/api/admin/content/finance-terms', { method: 'POST', body: JSON.stringify({ ...draft, subCategory: draft.subCategory.trim() || null, keywords: listFromText(draft.keywordsText), synonyms: listFromText(draft.synonymsText), relatedTermSlugs: listFromText(draft.relatedTermSlugsText), formula: draft.formula || null }) });
      setTerms((current) => [term, ...current.filter((entry) => entry.id !== term.id)]); setDraft(blankTerm()); setNotice({ kind: 'success', text: 'Finance term saved and public glossary caches revalidated.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Finance term could not be saved.' }); }
    finally { setSaving(false); }
  };
  const unpublish = async (id: string) => { try { await api('/api/admin/content/finance-terms', { method: 'DELETE', body: JSON.stringify({ id }) }); setTerms((current) => current.map((term) => term.id === id ? { ...term, published: false } : term)); setNotice({ kind: 'success', text: 'Term unpublished. Its database record remains available for editing.' }); } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Term could not be unpublished.' }); } };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
      <section className="order-2 rounded-2xl border border-border bg-card p-5 xl:order-1" aria-labelledby="terms-list-title">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="terms-list-title" className="text-lg font-bold text-foreground">Finance Terms</h2><p className="mt-1 text-sm text-muted-foreground">Only CMS-authored terms are listed; no sample production terms are preloaded.</p></div><span className="text-xs text-muted-foreground">{terms.length} records</span></div>
        <label htmlFor="term-filter" className="sr-only">Filter finance terms</label><input id="term-filter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by term, category, or subcategory" className={inputClass} />
        {loading ? <p className="py-8 text-sm text-muted-foreground" role="status">Loading terms…</p> : visible.length ? <ul className="mt-4 divide-y divide-border">{visible.map((term) => <li key={term.id} className="flex flex-wrap items-start justify-between gap-3 py-4"><div><div className="flex flex-wrap items-center gap-2"><StatusBadge active={term.published} /><span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{term.category}</span>{term.subCategory && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{term.subCategory}</span>}{term.featured && <span className="text-[10px] text-amber-700 dark:text-amber-300">Featured</span>}</div><p className="mt-2 font-semibold text-foreground">{term.term}</p><p className="mt-1 text-xs text-muted-foreground">/finance-terms/{term.slug}</p></div><div className="flex gap-2"><button type="button" onClick={() => edit(term)} className={buttonClass}>Edit</button>{term.published && <button type="button" onClick={() => void unpublish(term.id)} className={buttonClass}>Unpublish</button>}</div></li>)}</ul> : <p className="py-8 text-sm text-muted-foreground">No glossary terms match this filter.</p>}
      </section>
      <section className="order-1 rounded-2xl border border-border bg-card p-5 xl:order-2" aria-labelledby="term-editor-title">
        <h2 id="term-editor-title" className="text-lg font-bold text-foreground">{draft.id ? 'Edit finance term' : 'Create finance term'}</h2><p className="mt-1 text-sm text-muted-foreground">Each published term gets a stable, searchable URL and a DefinedTerm structured-data record.</p>
        <div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div>
        <form onSubmit={save} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Slug" htmlFor="term-slug"><input id="term-slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={120} value={draft.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} /></Field><Field label="Term" htmlFor="term-name"><input id="term-name" required maxLength={160} value={draft.term} onChange={(e) => update('term', e.target.value)} className={inputClass} /></Field></div>
          <Field label="Simple meaning" htmlFor="term-meaning"><textarea id="term-meaning" required minLength={10} maxLength={6000} rows={3} value={draft.simpleMeaning} onChange={(e) => update('simpleMeaning', e.target.value)} className={textAreaClass} /></Field>
          <Field label="Practical example" htmlFor="term-example"><textarea id="term-example" required minLength={5} maxLength={6000} rows={3} value={draft.example} onChange={(e) => update('example', e.target.value)} className={textAreaClass} /></Field>
          <Field label="Interview-ready explanation" htmlFor="term-answer"><textarea id="term-answer" required minLength={5} maxLength={6000} rows={3} value={draft.interviewAnswer} onChange={(e) => update('interviewAnswer', e.target.value)} className={textAreaClass} /></Field>
          <div className="grid gap-4 sm:grid-cols-3"><Field label="Formula (optional)" htmlFor="term-formula"><input id="term-formula" maxLength={2000} value={draft.formula} onChange={(e) => update('formula', e.target.value)} className={inputClass} /></Field><Field label="Category" htmlFor="term-category"><input id="term-category" required maxLength={80} value={draft.category} onChange={(e) => update('category', e.target.value)} className={inputClass} /></Field><Field label="Subcategory (optional)" htmlFor="term-subcategory" hint="e.g. Valuation, Ratios"><input id="term-subcategory" maxLength={80} value={draft.subCategory} onChange={(e) => update('subCategory', e.target.value)} placeholder="e.g. DCF" className={inputClass} /></Field></div>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Difficulty" htmlFor="term-difficulty"><select id="term-difficulty" value={draft.difficulty} onChange={(e) => update('difficulty', e.target.value as TermDraft['difficulty'])} className={inputClass}><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option><option value="EXPERT">Expert</option></select></Field><Field label="Display order" htmlFor="term-order"><input id="term-order" type="number" min={0} max={10000} value={draft.displayOrder} onChange={(e) => update('displayOrder', Number(e.target.value))} className={inputClass} /></Field></div>
          <Field label="Keywords" htmlFor="term-keywords" hint="Separate keywords with commas or new lines."><textarea id="term-keywords" rows={2} value={draft.keywordsText} onChange={(e) => update('keywordsText', e.target.value)} className={textAreaClass} /></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Synonyms" htmlFor="term-synonyms"><textarea id="term-synonyms" rows={2} value={draft.synonymsText} onChange={(e) => update('synonymsText', e.target.value)} className={textAreaClass} /></Field><Field label="Related term slugs" htmlFor="term-related"><textarea id="term-related" rows={2} value={draft.relatedTermSlugsText} onChange={(e) => update('relatedTermSlugsText', e.target.value)} className={textAreaClass} /></Field></div>
          <div className="grid gap-3 sm:grid-cols-3"><Toggle id="term-published" label="Published" checked={draft.published} onChange={(value) => update('published', value)} /><Toggle id="term-featured" label="Feature on home" checked={draft.featured} onChange={(value) => update('featured', value)} /><Toggle id="term-seo" label="SEO-visible" checked={draft.seoVisible} onChange={(value) => update('seoVisible', value)} hint="Only visible terms are included in the crawlable glossary and sitemap." /></div>
          <div className="flex flex-wrap gap-2"><button type="submit" disabled={saving} className={primaryButtonClass}>{saving ? 'Saving…' : 'Save term'}</button><button type="button" onClick={() => { setDraft(blankTerm()); setNotice(null); }} className={buttonClass}>Clear form</button></div>
        </form>
      </section>
    </div>
  );
}

interface LessonRecord { id: string; courseSlug: string; slug: string; title: string; summary: string | null; content: string; durationMinutes: number | null; displayOrder: number; published: boolean }
type LessonDraft = Omit<LessonRecord, 'id' | 'courseSlug'> & { id?: string };
function blankLesson(): LessonDraft { return { slug: '', title: '', summary: '', content: '', durationMinutes: 5, displayOrder: 0, published: false }; }
interface QuestionDraft { id?: string; prompt: string; optionsText: string; correctOption: number; explanation: string; marks: number; displayOrder: number; published: boolean }
interface AssessmentDraft { title: string; instructions: string; passPercentage: number; maxAttempts: number | null; published: boolean; questions: QuestionDraft[] }
function blankAssessment(courseTitle: string): AssessmentDraft { return { title: `${courseTitle} Final Test`, instructions: '', passPercentage: 70, maxAttempts: null, published: false, questions: [] }; }

function LearningManager({ courses }: { courses: AdminCourseOption[] }) {
  const firstCourse = courses[0]?.slug ?? '';
  const [courseSlug, setCourseSlug] = useState(firstCourse);
  const [lessons, setLessons] = useState<LessonRecord[]>([]);
  const [lessonDraft, setLessonDraft] = useState<LessonDraft>(blankLesson);
  const [assessmentDraft, setAssessmentDraft] = useState<AssessmentDraft>(blankAssessment(courses[0]?.title ?? 'Course'));
  const [loading, setLoading] = useState(false); const [savingLesson, setSavingLesson] = useState(false); const [savingAssessment, setSavingAssessment] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const selectedCourse = courses.find((course) => course.slug === courseSlug);

  useEffect(() => {
    if (!courseSlug) return;
    let live = true;
    setLoading(true); setNotice(null); setLessonDraft(blankLesson());
    Promise.all([
      api<{ lessons: LessonRecord[] }>(`/api/admin/content/courses/${encodeURIComponent(courseSlug)}/lessons`),
      api<{ assessment: null | { title: string; instructions: string | null; passPercentage: number; maxAttempts: number | null; published: boolean; questions: { id: string; prompt: string; options: unknown; correctOption: number; explanation: string; marks: number; displayOrder: number; published: boolean }[] } }>(`/api/admin/content/courses/${encodeURIComponent(courseSlug)}/assessment`),
    ]).then(([lessonResult, assessmentResult]) => {
      if (!live) return;
      setLessons(lessonResult.lessons);
      const saved = assessmentResult.assessment;
      setAssessmentDraft(saved ? {
        title: saved.title, instructions: saved.instructions ?? '', passPercentage: saved.passPercentage, maxAttempts: saved.maxAttempts,
        published: saved.published,
        questions: saved.questions.map((question) => ({
          id: question.id, prompt: question.prompt,
          optionsText: Array.isArray(question.options) ? question.options.map((option) => String(option)).join('\n') : '',
          correctOption: question.correctOption, explanation: question.explanation, marks: question.marks, displayOrder: question.displayOrder, published: question.published,
        })),
      } : blankAssessment(selectedCourse?.title ?? 'Course'));
    }).catch((error: unknown) => { if (live) setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Course content could not be loaded.' }); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [courseSlug, selectedCourse?.title]);

  const lessonUpdate = <K extends keyof LessonDraft>(key: K, value: LessonDraft[K]) => setLessonDraft((current) => ({ ...current, [key]: value }));
  const assessmentUpdate = <K extends keyof AssessmentDraft>(key: K, value: AssessmentDraft[K]) => setAssessmentDraft((current) => ({ ...current, [key]: value }));
  const questionUpdate = (index: number, patch: Partial<QuestionDraft>) => setAssessmentDraft((current) => ({ ...current, questions: current.questions.map((question, i) => i === index ? { ...question, ...patch } : question) }));
  const saveLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!courseSlug) return;
    setSavingLesson(true); setNotice(null);
    try {
      const payload = { ...lessonDraft, courseSlug, summary: lessonDraft.summary?.trim() || null, durationMinutes: lessonDraft.durationMinutes || null };
      const { lesson } = await api<{ lesson: LessonRecord }>(`/api/admin/content/courses/${encodeURIComponent(courseSlug)}/lessons`, { method: 'POST', body: JSON.stringify(payload) });
      setLessons((current) => [...current.filter((entry) => entry.id !== lesson.id), lesson].sort((a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title)));
      setLessonDraft(blankLesson()); setNotice({ kind: 'success', text: 'Lesson saved. Publishing makes its stable course URL public.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Lesson could not be saved.' }); }
    finally { setSavingLesson(false); }
  };
  const unpublishLesson = async (id: string) => {
    try { await api(`/api/admin/content/courses/${encodeURIComponent(courseSlug)}/lessons`, { method: 'DELETE', body: JSON.stringify({ id }) }); setLessons((current) => current.map((lesson) => lesson.id === id ? { ...lesson, published: false } : lesson)); setNotice({ kind: 'success', text: 'Lesson unpublished; existing completion records are retained.' }); }
    catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Lesson could not be unpublished.' }); }
  };
  const saveAssessment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!courseSlug) return;
    setSavingAssessment(true); setNotice(null);
    try {
      const questions = assessmentDraft.questions.map((question, index) => ({
        ...(question.id ? { id: question.id } : {}), prompt: question.prompt, options: listFromText(question.optionsText),
        correctOption: question.correctOption, explanation: question.explanation, marks: question.marks,
        displayOrder: question.displayOrder ?? index, published: question.published,
      }));
      const { assessment } = await api<{ assessment: { title: string; published: boolean; questions: { id: string; prompt: string; options: unknown; correctOption: number; explanation: string; marks: number; displayOrder: number; published: boolean }[] } }>(`/api/admin/content/courses/${encodeURIComponent(courseSlug)}/assessment`, {
        method: 'POST', body: JSON.stringify({ ...assessmentDraft, instructions: assessmentDraft.instructions.trim() || null, questions }),
      });
      setAssessmentDraft((current) => ({ ...current, questions: assessment.questions.map((question) => ({ id: question.id, prompt: question.prompt, optionsText: Array.isArray(question.options) ? question.options.map(String).join('\n') : '', correctOption: question.correctOption, explanation: question.explanation, marks: question.marks, displayOrder: question.displayOrder, published: question.published })) }));
      setNotice({ kind: 'success', text: 'Final test saved. Learners need every course lesson completed and a passing score before course completion or certificate issuance.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Final test could not be saved.' }); }
    finally { setSavingAssessment(false); }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"><Field label="Select a course" htmlFor="course-select" hint="PGDM courses use their existing URLs. Study courses are selected from CMS entries."><select id="course-select" value={courseSlug} onChange={(event) => setCourseSlug(event.target.value)} className={inputClass}><option value="">Select a course…</option>{courses.map((course) => <option key={course.slug} value={course.slug}>[{course.kind}{course.published ? '' : ' draft'}] {course.title} — {course.slug}</option>)}</select></Field><span className="text-xs text-muted-foreground">{lessons.length} managed lesson records</span></div>
        <div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div>
      </section>
      {!courses.length ? <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">No course records are available. Static PGDM course options could not be loaded.</p> : loading ? <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground" role="status">Loading course content…</p> : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="space-y-5 rounded-2xl border border-border bg-card p-5" aria-labelledby="course-lessons-admin-title">
            <div><h2 id="course-lessons-admin-title" className="text-lg font-bold text-foreground">CMS lessons</h2><p className="mt-1 text-sm text-muted-foreground">Published lessons are crawlable. Unpublishing hides them without removing stored learning progress.</p></div>
            <form onSubmit={saveLesson} className="space-y-4 rounded-xl border border-border bg-background p-4">
              <h3 className="font-semibold text-foreground">{lessonDraft.id ? 'Edit lesson' : 'Add lesson'}</h3>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Permanent lesson slug" htmlFor="lesson-slug" hint="Cannot be renamed after creation."><input id="lesson-slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" minLength={2} maxLength={160} value={lessonDraft.slug} onChange={(e) => lessonUpdate('slug', e.target.value)} className={inputClass} /></Field><Field label="Title" htmlFor="lesson-title"><input id="lesson-title" required minLength={2} maxLength={200} value={lessonDraft.title} onChange={(e) => lessonUpdate('title', e.target.value)} className={inputClass} /></Field></div>
              <Field label="Summary" htmlFor="lesson-summary"><textarea id="lesson-summary" maxLength={1000} rows={2} value={lessonDraft.summary ?? ''} onChange={(e) => lessonUpdate('summary', e.target.value)} className={textAreaClass} /></Field>
              <Field label="Lesson content (MDX/Markdown)" htmlFor="lesson-content" hint="Only trusted CMS editors can publish MDX content."><textarea id="lesson-content" required minLength={10} maxLength={50000} rows={12} value={lessonDraft.content} onChange={(e) => lessonUpdate('content', e.target.value)} className={`${textAreaClass} font-mono text-xs leading-6`} /></Field>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Estimated duration (minutes)" htmlFor="lesson-duration"><input id="lesson-duration" type="number" min={1} max={600} value={lessonDraft.durationMinutes ?? ''} onChange={(e) => lessonUpdate('durationMinutes', e.target.value ? Number(e.target.value) : null)} className={inputClass} /></Field><Field label="Display order" htmlFor="lesson-order"><input id="lesson-order" type="number" min={0} max={10000} value={lessonDraft.displayOrder} onChange={(e) => lessonUpdate('displayOrder', Number(e.target.value))} className={inputClass} /></Field></div>
              <Toggle id="lesson-published" label="Published" checked={lessonDraft.published} onChange={(value) => lessonUpdate('published', value)} />
              <div className="flex flex-wrap gap-2"><button type="submit" disabled={savingLesson || !courseSlug} className={primaryButtonClass}>{savingLesson ? 'Saving…' : 'Save lesson'}</button><button type="button" onClick={() => setLessonDraft(blankLesson())} className={buttonClass}>Clear form</button></div>
            </form>
            <ul className="divide-y divide-border">{lessons.map((lesson) => <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><div className="flex items-center gap-2"><StatusBadge active={lesson.published} /><span className="text-xs text-muted-foreground">{lesson.displayOrder} · {lesson.durationMinutes ?? '—'} min</span></div><p className="mt-1 font-semibold text-foreground">{lesson.title}</p><p className="text-xs text-muted-foreground">{lesson.slug}</p></div><div className="flex gap-2"><button type="button" onClick={() => { setLessonDraft({ id: lesson.id, slug: lesson.slug, title: lesson.title, summary: lesson.summary, content: lesson.content, durationMinutes: lesson.durationMinutes, displayOrder: lesson.displayOrder, published: lesson.published }); setNotice({ kind: 'info', text: `Editing “${lesson.title}”.` }); }} className={buttonClass}>Edit</button>{lesson.published && <button type="button" onClick={() => void unpublishLesson(lesson.id)} className={buttonClass}>Unpublish</button>}</div></li>)}</ul>
          </section>
          <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="assessment-admin-title">
            <div><h2 id="assessment-admin-title" className="text-lg font-bold text-foreground">Final test and completion policy</h2><p className="mt-1 text-sm text-muted-foreground">No attempt or certificate is created until the server validates every lesson and scores the published answers.</p></div>
            <form onSubmit={saveAssessment} className="mt-4 space-y-4">
              <Field label="Test title" htmlFor="assessment-title"><input id="assessment-title" required minLength={3} maxLength={200} value={assessmentDraft.title} onChange={(e) => assessmentUpdate('title', e.target.value)} className={inputClass} /></Field>
              <Field label="Learner instructions" htmlFor="assessment-instructions"><textarea id="assessment-instructions" maxLength={3000} rows={3} value={assessmentDraft.instructions} onChange={(e) => assessmentUpdate('instructions', e.target.value)} className={textAreaClass} /></Field>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Pass percentage" htmlFor="assessment-pass"><input id="assessment-pass" type="number" required min={50} max={100} value={assessmentDraft.passPercentage} onChange={(e) => assessmentUpdate('passPercentage', Number(e.target.value))} className={inputClass} /></Field><Field label="Maximum attempts" htmlFor="assessment-attempts" hint="Leave blank to allow retakes until a pass."><input id="assessment-attempts" type="number" min={1} max={50} value={assessmentDraft.maxAttempts ?? ''} onChange={(e) => assessmentUpdate('maxAttempts', e.target.value ? Number(e.target.value) : null)} className={inputClass} /></Field></div>
              <Toggle id="assessment-published" label="Publish final test" checked={assessmentDraft.published} onChange={(value) => assessmentUpdate('published', value)} hint="Publishing requires at least one published question." />
              <div className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-semibold text-foreground">Questions ({assessmentDraft.questions.length})</h3><button type="button" onClick={() => assessmentUpdate('questions', [...assessmentDraft.questions, { prompt: '', optionsText: '', correctOption: 0, explanation: '', marks: 1, displayOrder: assessmentDraft.questions.length, published: true }])} className={buttonClass}>Add question</button></div>
                {assessmentDraft.questions.map((question, index) => <fieldset key={question.id ?? `new-${index}`} className="space-y-3 rounded-xl border border-border bg-background p-4"><legend className="px-1 text-sm font-bold text-foreground">Question {index + 1}</legend><Field label="Prompt" htmlFor={`question-${index}-prompt`}><textarea id={`question-${index}-prompt`} required minLength={5} maxLength={2000} rows={2} value={question.prompt} onChange={(e) => questionUpdate(index, { prompt: e.target.value })} className={textAreaClass} /></Field><Field label="Answer options (one per line)" htmlFor={`question-${index}-options`}><textarea id={`question-${index}-options`} required rows={4} value={question.optionsText} onChange={(e) => questionUpdate(index, { optionsText: e.target.value })} className={`${textAreaClass} font-mono text-xs`} /></Field><div className="grid gap-4 sm:grid-cols-3"><Field label="Correct option index" htmlFor={`question-${index}-correct`} hint="Zero-based: the first option is 0."><input id={`question-${index}-correct`} type="number" min={0} max={5} value={question.correctOption} onChange={(e) => questionUpdate(index, { correctOption: Number(e.target.value) })} className={inputClass} /></Field><Field label="Points" htmlFor={`question-${index}-marks`}><input id={`question-${index}-marks`} type="number" min={1} max={100} value={question.marks} onChange={(e) => questionUpdate(index, { marks: Number(e.target.value) })} className={inputClass} /></Field><Field label="Order" htmlFor={`question-${index}-order`}><input id={`question-${index}-order`} type="number" min={0} max={10000} value={question.displayOrder} onChange={(e) => questionUpdate(index, { displayOrder: Number(e.target.value) })} className={inputClass} /></Field></div><Field label="Explanation shown after submission" htmlFor={`question-${index}-explanation`}><textarea id={`question-${index}-explanation`} required minLength={3} maxLength={3000} rows={2} value={question.explanation} onChange={(e) => questionUpdate(index, { explanation: e.target.value })} className={textAreaClass} /></Field><div className="flex flex-wrap items-center justify-between gap-3"><Toggle id={`question-${index}-published`} label="Question published" checked={question.published} onChange={(value) => questionUpdate(index, { published: value })} /><button type="button" onClick={() => assessmentUpdate('questions', assessmentDraft.questions.filter((_, questionIndex) => questionIndex !== index))} className={buttonClass}>Remove from test</button></div></fieldset>)}
              </div>
              <button type="submit" disabled={savingAssessment || !courseSlug} className={primaryButtonClass}>{savingAssessment ? 'Saving…' : 'Save final test'}</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

interface RelatedRecord { id: string; sourceType: string; sourceSlug: string; targetType: string; targetSlug: string; anchorText: string | null; linkKind: 'RELATED' | 'CTA'; displayOrder: number; published: boolean }
type RelatedDraft = Omit<RelatedRecord, 'id' | 'anchorText'> & { id?: string; anchorText: string };
function blankRelated(): RelatedDraft { return { sourceType: 'PAGE', sourceSlug: '', targetType: 'PRICING', targetSlug: 'pricing', anchorText: '', linkKind: 'RELATED', displayOrder: 0, published: false }; }
const sourceTypes = ['PAGE', 'COURSE', 'PGDM_COURSE', 'COURSE_LESSON', 'STUDY', 'STUDY_COURSE', 'TOOL', 'RESEARCH', 'INSIGHT', 'FINANCE_TERM', 'TRACKER', 'DATASET', 'CASE_STUDY'];
const targetTypes = ['PAGE', 'COURSE', 'PGDM_COURSE', 'STUDY', 'STUDY_COURSE', 'TOOL', 'RESEARCH', 'INSIGHT', 'FINANCE_TERM', 'TRACKER', 'DATASET', 'CASE_STUDY', 'PREDICTION_LEDGER', 'ASK', 'PRICING', 'CONTACT', 'DATA_LAB', 'TOOLS'];

function RelatedManager() {
  const [relations, setRelations] = useState<RelatedRecord[]>([]); const [draft, setDraft] = useState<RelatedDraft>(blankRelated); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [notice, setNotice] = useState<Notice>(null);
  useEffect(() => { void api<{ relations: RelatedRecord[] }>('/api/admin/content/related').then((data) => setRelations(data.relations)).catch((error: unknown) => setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Related links could not be loaded.' })).finally(() => setLoading(false)); }, []);
  const update = <K extends keyof RelatedDraft>(key: K, value: RelatedDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaving(true); setNotice(null); try { const { relation } = await api<{ relation: RelatedRecord }>('/api/admin/content/related', { method: 'POST', body: JSON.stringify({ ...draft, anchorText: draft.anchorText.trim() || null }) }); setRelations((current) => [relation, ...current.filter((item) => item.id !== relation.id)]); setDraft(blankRelated()); setNotice({ kind: 'success', text: 'Contextual link saved. It appears only when published and the target route is supported.' }); } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Related link could not be saved.' }); } finally { setSaving(false); } };
  const unpublish = async (id: string) => { try { await api('/api/admin/content/related', { method: 'DELETE', body: JSON.stringify({ id }) }); setRelations((current) => current.map((item) => item.id === id ? { ...item, published: false } : item)); setNotice({ kind: 'success', text: 'Link unpublished; the record was retained.' }); } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Link could not be unpublished.' }); } };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <section className="order-2 rounded-2xl border border-border bg-card p-5 xl:order-1" aria-labelledby="related-list-title"><div className="flex items-center justify-between gap-3"><div><h2 id="related-list-title" className="text-lg font-bold text-foreground">Related content and CTAs</h2><p className="mt-1 text-sm text-muted-foreground">Links are editorial records; no automatic content is invented.</p></div><span className="text-xs text-muted-foreground">{relations.length} records</span></div>{loading ? <p className="py-8 text-sm text-muted-foreground" role="status">Loading links…</p> : relations.length ? <ul className="mt-4 divide-y divide-border">{relations.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><div className="flex flex-wrap items-center gap-2"><StatusBadge active={item.published} /><span className="rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">{item.linkKind}</span></div><p className="mt-2 text-sm font-semibold text-foreground">{item.sourceType}:{item.sourceSlug} → {item.targetType}:{item.targetSlug}</p><p className="text-xs text-muted-foreground">{item.anchorText || 'Uses target slug as link label'} · order {item.displayOrder}</p></div><div className="flex gap-2"><button type="button" onClick={() => { setDraft({ ...item, anchorText: item.anchorText ?? '' }); setNotice({ kind: 'info', text: 'Editing this contextual link.' }); }} className={buttonClass}>Edit</button>{item.published && <button type="button" onClick={() => void unpublish(item.id)} className={buttonClass}>Unpublish</button>}</div></li>)}</ul> : <p className="py-8 text-sm text-muted-foreground">No contextual links configured.</p>}</section>
      <section className="order-1 rounded-2xl border border-border bg-card p-5 xl:order-2" aria-labelledby="related-editor-title"><h2 id="related-editor-title" className="text-lg font-bold text-foreground">{draft.id ? 'Edit contextual link' : 'Create contextual link'}</h2><div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div>
        <form onSubmit={save} className="mt-4 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Source type" htmlFor="related-source-type"><select id="related-source-type" value={draft.sourceType} onChange={(e) => update('sourceType', e.target.value)} className={inputClass}>{sourceTypes.map((type) => <option key={type}>{type}</option>)}</select></Field><Field label="Source slug" htmlFor="related-source-slug"><input id="related-source-slug" required value={draft.sourceSlug} onChange={(e) => update('sourceSlug', e.target.value)} className={inputClass} /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Target type" htmlFor="related-target-type"><select id="related-target-type" value={draft.targetType} onChange={(e) => update('targetType', e.target.value)} className={inputClass}>{targetTypes.map((type) => <option key={type}>{type}</option>)}</select></Field><Field label="Target slug" htmlFor="related-target-slug"><input id="related-target-slug" required value={draft.targetSlug} onChange={(e) => update('targetSlug', e.target.value)} className={inputClass} /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Link type" htmlFor="related-kind"><select id="related-kind" value={draft.linkKind} onChange={(e) => update('linkKind', e.target.value as RelatedDraft['linkKind'])} className={inputClass}><option value="RELATED">Related content</option><option value="CTA">Next step / CTA</option></select></Field><Field label="Display order" htmlFor="related-order"><input id="related-order" type="number" min={0} max={10000} value={draft.displayOrder} onChange={(e) => update('displayOrder', Number(e.target.value))} className={inputClass} /></Field></div><Field label="Anchor text (optional)" htmlFor="related-anchor" hint="Use a clear, descriptive label; avoid keyword stuffing."><input id="related-anchor" maxLength={180} value={draft.anchorText} onChange={(e) => update('anchorText', e.target.value)} className={inputClass} /></Field><Toggle id="related-published" label="Published" checked={draft.published} onChange={(value) => update('published', value)} /><div className="flex flex-wrap gap-2"><button type="submit" disabled={saving} className={primaryButtonClass}>{saving ? 'Saving…' : 'Save link'}</button><button type="button" onClick={() => { setDraft(blankRelated()); setNotice(null); }} className={buttonClass}>Clear form</button></div></form>
      </section>
    </div>
  );
}

const tabs: { id: AdminTab; title: string; description: string }[] = [
  { id: 'faqs', title: 'FAQs', description: 'Visible Q&A and schema' },
  { id: 'terms', title: 'Finance Terms', description: 'Glossary and search' },
  { id: 'courses', title: 'Courses', description: 'Lessons and final tests' },
  { id: 'promotions', title: 'Promotions', description: 'Scheduled, disclosed campaigns' },
  { id: 'related', title: 'Related Content', description: 'Editorial links and CTAs' },
];

const isAdminTab = (value: string | null): value is AdminTab => tabs.some((tab) => tab.id === value);

export default function ProductContentAdminClient({ courses }: { courses: AdminCourseOption[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTabState] = useState<AdminTab>(isAdminTab(requestedTab) ? requestedTab : 'faqs');
  // Deep links such as /admin/product-content?tab=promotions (used by the sidebar) select the tab.
  useEffect(() => { if (isAdminTab(requestedTab)) setActiveTabState(requestedTab); }, [requestedTab]);
  const setActiveTab = (tab: AdminTab) => {
    setActiveTabState(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="space-y-7">
      <header className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Content operations</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">Product Experience CMS</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Manage contextual FAQs, glossary terms, learning content, real partner campaigns, and editorial links using the existing PostgreSQL CMS. Public submissions and dashboards remain private; no sample partner campaigns are seeded.</p>
      </header>
      <div role="tablist" aria-label="Product content sections" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {tabs.map((tab) => <button key={tab.id} type="button" role="tab" id={`product-tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls={`product-panel-${tab.id}`} onClick={() => setActiveTab(tab.id)} className={`min-h-16 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeTab === tab.id ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}><span className="block font-bold">{tab.title}</span><span className="mt-1 block text-xs">{tab.description}</span></button>)}
      </div>
      {tabs.map((tab) => activeTab === tab.id && <div key={tab.id} role="tabpanel" id={`product-panel-${tab.id}`} aria-labelledby={`product-tab-${tab.id}`} className="outline-none">{tab.id === 'faqs' ? <FaqManager /> : tab.id === 'terms' ? <FinanceTermManager /> : tab.id === 'courses' ? <LearningManager courses={courses} /> : tab.id === 'promotions' ? <PromotionManager /> : <RelatedManager />}</div>)}
    </div>
  );
}
