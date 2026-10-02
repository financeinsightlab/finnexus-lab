'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';

export interface AdminCourseOption {
  slug: string;
  title: string;
  kind: 'PGDM' | 'STUDY';
  published: boolean;
}

type AdminTab = 'faqs' | 'terms' | 'courses' | 'promotions' | 'related';
type Notice = { kind: 'success' | 'error' | 'info'; text: string } | null;

const inputClass = 'mt-1.5 min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring';
const textAreaClass = `${inputClass} min-h-24 resize-y`;
const buttonClass = 'inline-flex min-h-10 items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
const primaryButtonClass = 'inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
    cache: 'no-store',
  });
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
    issues?: { path?: string; message?: string }[];
  };
  if (!response.ok) {
    const detail = data.issues?.map((i) => (i.path ? `${i.path}: ${i.message}` : i.message)).filter(Boolean).join(', ');
    throw new Error(detail ? `${data.error}: ${detail}` : data.error || `Request failed (${response.status})`);
  }
  return data;
}

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-foreground">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Toggle({ id, label, checked, onChange, hint }: { id: string; label: string; checked: boolean; onChange: (checked: boolean) => void; hint?: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-4 w-4 accent-primary focus-visible:ring-2 focus-visible:ring-ring" />
      <span><span className="block text-sm font-semibold text-foreground">{label}</span>{hint && <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{hint}</span>}</span>
    </label>
  );
}

function NoticeBanner({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  if (!notice) return null;
  const color = notice.kind === 'error'
    ? 'border-destructive/30 bg-destructive/10 text-destructive'
    : notice.kind === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
      : 'border-primary/30 bg-primary/10 text-foreground';
  return <div className={`flex items-start justify-between gap-3 rounded-xl border p-3 text-sm ${color}`} role={notice.kind === 'error' ? 'alert' : 'status'}><p>{notice.text}</p><button type="button" onClick={onDismiss} className="shrink-0 font-bold underline underline-offset-2">Dismiss</button></div>;
}

function StatusBadge({ active, label = 'Published' }: { active: boolean; label?: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${active ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-muted text-muted-foreground'}`}>{active ? label : 'Draft'}</span>;
}

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
function listFromText(text: string) { return [...new Set(text.split(/[\n,]/).map((value) => value.trim()).filter(Boolean))]; }

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

interface PromotionRecord {
  id: string; brandName: string; title: string; shortDescription: string; fullDescription: string | null; logoUrl: string | null;
  imageUrl: string | null; videoUrl: string | null; lightCreativeUrl: string | null; darkCreativeUrl: string | null; ctaText: string; destinationUrl: string;
  affiliateUrl: string | null; trackingUrl: string | null; category: string; placement: string; targetPages: string[];
  targetContentTypes: string[]; startsAt: string | null; endsAt: string | null; active: boolean; priority: number; displayFrequency: number;
  mobileVisible: boolean; desktopVisible: boolean; disclosureType: string; disclosureText: string; campaignId: string | null; utmParameters: unknown;
}
type PromotionDraft = Omit<PromotionRecord, 'id' | 'targetPages' | 'targetContentTypes' | 'startsAt' | 'endsAt' | 'utmParameters'> & {
  id?: string; targetPagesText: string; targetContentTypesText: string; startsAtLocal: string; endsAtLocal: string; utmText: string;
};
function blankPromotion(): PromotionDraft { return { brandName: '', title: '', shortDescription: '', fullDescription: '', logoUrl: '', imageUrl: '', videoUrl: '', lightCreativeUrl: '', darkCreativeUrl: '', ctaText: 'Learn more', destinationUrl: '', affiliateUrl: '', trackingUrl: '', category: 'Education', placement: 'SIDEBAR', targetPagesText: 'ALL', targetContentTypesText: '', startsAtLocal: '', endsAtLocal: '', active: false, priority: 0, displayFrequency: 1, mobileVisible: true, desktopVisible: true, disclosureType: 'SPONSORED', disclosureText: 'Sponsored · Paid promotion', campaignId: '', utmText: '{}' }; }
const promotionPlacements = [
  { value: 'ALL', label: '🌟 ALL PLACEMENTS & PAGES (Universal Global Everywhere)' },
  { value: 'SIDEBAR', label: 'SIDEBAR — Sticky Right-Side Card (Recommended)' },
  { value: 'HOME_SECTION', label: 'HOME SECTION — Between Hero & Pillars' },
  { value: 'HOME_HERO', label: 'HOME HERO — Top of Homepage' },
  { value: 'BETWEEN_CONTENT', label: 'BETWEEN CONTENT — In Content Pages' },
  { value: 'RESEARCH_PAGE', label: 'RESEARCH PAGE — Research Reports' },
  { value: 'COURSE_PAGE', label: 'COURSE PAGE — Study & PGDM Lectures' },
  { value: 'TOOL_PAGE', label: 'TOOL PAGE — Calculators & Frameworks' },
  { value: 'CALCULATOR_PAGE', label: 'CALCULATOR PAGE — Individual Calculators' },
  { value: 'ARTICLE_PAGE', label: 'ARTICLE PAGE — Insights & Articles' },
  { value: 'STUDY_PAGE', label: 'STUDY PAGE — Study Materials' },
  { value: 'DASHBOARD', label: 'DASHBOARD — User Dashboard' },
  { value: 'CTA_BLOCK', label: 'CTA BLOCK — Call-to-Action Slot' },
  { value: 'FOOTER', label: 'FOOTER — Bottom of Pages' },
];

const TARGET_PAGE_PRESETS = [
  { label: '🌟 All Pages (Global)', path: 'ALL' },
  { label: '🏠 Home (/)', path: '/' },
  { label: '📊 Research (/research)', path: '/research' },
  { label: '💡 Insights (/insights)', path: '/insights' },
  { label: '🎓 Study / PGDM (/pgdm)', path: '/pgdm' },
  { label: '🛠️ Tools (/tools)', path: '/tools' },
  { label: '📖 Case Studies (/case-studies)', path: '/case-studies' },
  { label: '📚 Finance Terms (/finance-terms)', path: '/finance-terms' },
  { label: '💳 Pricing (/pricing)', path: '/pricing' },
];

interface PromotionReport { id: string; brandName: string; title: string; active: boolean; campaignId: string | null; impressions: number; clicks: number; ctr: number }
function dateToLocal(value: string | null) { if (!value) return ''; const date = new Date(value); return Number.isNaN(date.getTime()) ? '' : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16); }
function localToIso(value: string) { return value ? new Date(value).toISOString() : null; }

function PromotionManager() {
  const [promotions, setPromotions] = useState<PromotionRecord[]>([]); const [reports, setReports] = useState<PromotionReport[]>([]);
  const [draft, setDraft] = useState<PromotionDraft>(blankPromotion); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [notice, setNotice] = useState<Notice>(null);
  const [crawling, setCrawling] = useState(false);
  const [crawlUrlInput, setCrawlUrlInput] = useState('');

  useEffect(() => { let live = true; Promise.all([api<{ promotions: PromotionRecord[] }>('/api/admin/content/promotions'), api<{ reports: PromotionReport[] }>('/api/admin/content/promotions/report')]).then(([campaigns, report]) => { if (live) { setPromotions(campaigns.promotions); setReports(report.reports); } }).catch((error: unknown) => { if (live) setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion data could not be loaded.' }); }).finally(() => { if (live) setLoading(false); }); return () => { live = false; }; }, []);
  const update = <K extends keyof PromotionDraft>(key: K, value: PromotionDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const edit = (campaign: PromotionRecord) => setDraft({ ...campaign, videoUrl: campaign.videoUrl ?? '', targetPagesText: campaign.targetPages.join('\n'), targetContentTypesText: campaign.targetContentTypes.join(', '), startsAtLocal: dateToLocal(campaign.startsAt), endsAtLocal: dateToLocal(campaign.endsAt), utmText: JSON.stringify(campaign.utmParameters ?? {}, null, 2) });
  
  const [crawledData, setCrawledData] = useState<{
    liveScreenshotUrl?: string;
    extractedImages?: string[];
  } | null>(null);

  const handleCrawlWebsite = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || crawlUrlInput || draft.destinationUrl || '').trim();
    if (!targetUrl) {
      setNotice({ kind: 'error', text: 'Please enter a Website Page URL to crawl.' });
      return;
    }
    setCrawling(true);
    setNotice(null);
    try {
      const res = await api<{ ok: boolean; metadata: {
        brandName: string;
        title: string;
        shortDescription: string;
        imageUrl: string | null;
        liveScreenshotUrl?: string;
        logoUrl: string | null;
        destinationUrl: string;
        suggestedCta: string;
        category: string;
        extractedImages?: string[];
      } }>('/api/admin/content/promotions/crawl', {
        method: 'POST',
        body: JSON.stringify({ url: targetUrl }),
      });
      if (res.metadata) {
        const m = res.metadata;
        const chosenImage = m.imageUrl || m.liveScreenshotUrl || null;
        setCrawledData({
          liveScreenshotUrl: m.liveScreenshotUrl,
          extractedImages: m.extractedImages || [],
        });
        setDraft((current) => ({
          ...current,
          brandName: m.brandName || current.brandName,
          title: m.title || current.title,
          shortDescription: m.shortDescription || current.shortDescription,
          imageUrl: chosenImage || current.imageUrl,
          lightCreativeUrl: chosenImage || current.lightCreativeUrl,
          darkCreativeUrl: chosenImage || current.darkCreativeUrl,
          logoUrl: m.logoUrl || current.logoUrl,
          destinationUrl: m.destinationUrl || current.destinationUrl,
          ctaText: m.suggestedCta || current.ctaText,
          category: m.category || current.category,
          targetPagesText: 'ALL',
          placement: 'ALL',
        }));
        setCrawlUrlInput(m.destinationUrl);
        setNotice({
          kind: 'success',
          text: `✨ Successfully extracted live data for ${m.brandName}! Live website screenshot and details auto-filled.`,
        });
      }
    } catch (err) {
      setNotice({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Could not crawl website URL.',
      });
    } finally {
      setCrawling(false);
    }
  };
  
  const togglePreset = (path: string) => {
    const current = listFromText(draft.targetPagesText);
    let updated: string[];
    if (path === 'ALL') {
      updated = current.includes('ALL') ? [] : ['ALL'];
    } else {
      const filtered = current.filter((p) => p !== 'ALL');
      updated = filtered.includes(path) ? filtered.filter((p) => p !== path) : [...filtered, path];
    }
    update('targetPagesText', updated.length ? updated.join('\n') : 'ALL');
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setNotice(null);
    try {
      let utmParameters: unknown = null;
      if (draft.utmText.trim()) { utmParameters = JSON.parse(draft.utmText); if (!utmParameters || typeof utmParameters !== 'object' || Array.isArray(utmParameters)) throw new Error('UTM parameters must be a JSON object.'); }
      const body = {
        ...draft,
        logoUrl: draft.logoUrl?.trim() || null,
        imageUrl: draft.imageUrl?.trim() || null,
        videoUrl: draft.videoUrl?.trim() || null,
        lightCreativeUrl: draft.lightCreativeUrl?.trim() || null,
        darkCreativeUrl: draft.darkCreativeUrl?.trim() || null,
        affiliateUrl: draft.affiliateUrl?.trim() || null,
        trackingUrl: draft.trackingUrl?.trim() || null,
        campaignId: draft.campaignId?.trim() || null,
        targetPages: listFromText(draft.targetPagesText),
        targetContentTypes: listFromText(draft.targetContentTypesText).map((value) => value.toUpperCase()),
        startsAt: draft.startsAtLocal ? localToIso(draft.startsAtLocal) : null,
        endsAt: draft.endsAtLocal ? localToIso(draft.endsAtLocal) : null,
        utmParameters,
      };
      const { promotion } = await api<{ promotion: PromotionRecord }>('/api/admin/content/promotions', { method: 'POST', body: JSON.stringify(body) });
      setPromotions((current) => [promotion, ...current.filter((campaign) => campaign.id !== promotion.id)]); setDraft(blankPromotion()); setCrawledData(null); setNotice({ kind: 'success', text: 'Promotion saved. Live rendering is updated immediately on enabled pages.' });
    } catch (error) { setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Promotion could not be saved.' }); }
    finally { setSaving(false); }
  };

  const deleteCampaign = async (id: string, brandName: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the promotion campaign for "${brandName}"?\n\nThis cannot be undone.`)) {
      return;
    }
    try {
      await api('/api/admin/content/promotions', {
        method: 'DELETE',
        body: JSON.stringify({ id, permanent: true }),
      });
      setPromotions((current) => current.filter((c) => c.id !== id));
      if (draft.id === id) {
        setDraft(blankPromotion());
        setCrawledData(null);
      }
      setNotice({ kind: 'success', text: `Campaign "${brandName}" was permanently deleted.` });
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Campaign could not be deleted.' });
    }
  };

  const toggleCampaignActive = async (id: string, currentActive: boolean) => {
    try {
      await api('/api/admin/content/promotions', {
        method: 'DELETE',
        body: JSON.stringify({ id, permanent: false, active: !currentActive }),
      });
      setPromotions((current) => current.map((c) => c.id === id ? { ...c, active: !currentActive } : c));
      setNotice({ kind: 'success', text: !currentActive ? 'Campaign activated.' : 'Campaign deactivated.' });
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Status could not be updated.' });
    }
  };

  const currentTargets = listFromText(draft.targetPagesText);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-foreground">Affiliate and sponsored partner promotions</h2><p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">Manage right-side cards, video/image media promotions, and in-content ads. When enabled for pages, promotions appear in an attractive animated card format with full disclosure.</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{promotions.length} campaigns</span></div><div className="mt-4"><NoticeBanner notice={notice} onDismiss={() => setNotice(null)} /></div></section>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="promotion-list-title"><h3 id="promotion-list-title" className="text-lg font-bold text-foreground">Campaigns and last-30-day reporting</h3>{loading ? <p className="py-6 text-sm text-muted-foreground" role="status">Loading campaigns…</p> : promotions.length ? <ul className="mt-3 divide-y divide-border">{promotions.map((campaign) => { const report = reports.find((item) => item.id === campaign.id); return <li key={campaign.id} className="py-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><StatusBadge active={campaign.active} label="Active" /><span className="rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">{campaign.placement}</span>{campaign.videoUrl && <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">Video Promo</span>}</div><p className="mt-2 font-semibold text-foreground">{campaign.title}</p><p className="text-xs text-muted-foreground">{campaign.brandName} · {campaign.campaignId || 'No campaign ID'}</p><p className="mt-1 text-xs text-muted-foreground">Target pages: {campaign.targetPages.length ? campaign.targetPages.join(', ') : 'All Pages'}</p><p className="mt-2 text-xs text-muted-foreground">{report?.impressions ?? 0} impressions · {report?.clicks ?? 0} clicks · {report?.ctr ?? 0}% CTR</p></div><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => edit(campaign)} className={buttonClass}>Edit</button><button type="button" onClick={() => void toggleCampaignActive(campaign.id, campaign.active)} className={buttonClass}>{campaign.active ? 'Deactivate' : 'Activate'}</button><button type="button" onClick={() => void deleteCampaign(campaign.id, campaign.brandName)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-500/20 dark:text-red-400 transition-colors">Delete</button></div></div></li>; })}</ul> : <p className="py-6 text-sm text-muted-foreground">No promotions configured. Create a partnership campaign below.</p>}</section>
        <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="promotion-editor-title"><h3 id="promotion-editor-title" className="text-lg font-bold text-foreground">{draft.id ? 'Edit campaign' : 'Create campaign'}</h3><p className="mt-1 text-sm text-muted-foreground">Card form with animated appearance. Supports high-res images and video promotions.</p>
          <form onSubmit={save} className="mt-4 space-y-4">
            {/* ── 1-Click Website URL Auto-Extractor & Crawler ── */}
            <div className="rounded-2xl border-2 border-dashed border-teal-500/50 bg-teal-500/5 p-4 space-y-3 dark:border-teal-400/40 dark:bg-teal-950/20">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                  ✨ 1-Click Website URL Auto-Crawler & Extractor
                </span>
                <span className="rounded-md bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  Instant Auto-Fill
                </span>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Add only a website page URL (e.g. <code>https://geoseolab.com/</code>). Our crawler extracts the live brand name, title, description, banner graphic, logo, and optimal CTA automatically!
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="Paste website page URL (e.g. https://geoseolab.com/)"
                  value={crawlUrlInput || draft.destinationUrl}
                  onChange={(e) => {
                    setCrawlUrlInput(e.target.value);
                    update('destinationUrl', e.target.value);
                  }}
                  className={inputClass}
                />
                <button
                  type="button"
                  disabled={crawling}
                  onClick={() => handleCrawlWebsite()}
                  className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-black text-white shadow-md hover:from-teal-600 hover:to-cyan-700 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {crawling ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Crawling page…
                    </>
                  ) : (
                    '🔍 Extract & Auto-Fill'
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2"><Field label="Brand / partner" htmlFor="promo-brand"><input id="promo-brand" required maxLength={120} value={draft.brandName} onChange={(e) => update('brandName', e.target.value)} placeholder="e.g. Acme Analytics" className={inputClass} /></Field><Field label="Campaign ID (optional)" htmlFor="promo-campaign"><input id="promo-campaign" maxLength={120} value={draft.campaignId ?? ''} onChange={(e) => update('campaignId', e.target.value)} placeholder="e.g. ACME_2026" className={inputClass} /></Field></div>
            <Field label="Promotion title / headline" htmlFor="promo-title"><input id="promo-title" required minLength={3} maxLength={180} value={draft.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Institutional Financial Modeling Toolkit" className={inputClass} /></Field>
            <Field label="Short description" htmlFor="promo-description"><textarea id="promo-description" required minLength={10} maxLength={500} rows={3} value={draft.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} placeholder="Compelling 2-3 line value proposition that appeals to finance visitors." className={textAreaClass} /></Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="CTA button text" htmlFor="promo-cta"><input id="promo-cta" required maxLength={60} value={draft.ctaText} onChange={(e) => update('ctaText', e.target.value)} placeholder="e.g. Explore Now / Claim 20% Off" className={inputClass} /></Field><Field label="Category" htmlFor="promo-category"><input id="promo-category" required maxLength={80} value={draft.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. SAAS / Education / Broker" className={inputClass} /></Field></div>
            <Field label="Destination URL (Website link)" htmlFor="promo-destination" hint="Target landing page (HTTP or HTTPS).">
              <div className="flex gap-2">
                <input id="promo-destination" type="url" required maxLength={2048} value={draft.destinationUrl} onChange={(e) => update('destinationUrl', e.target.value)} placeholder="https://example.com/landing" className={inputClass} />
                <button
                  type="button"
                  disabled={crawling}
                  onClick={() => handleCrawlWebsite(draft.destinationUrl)}
                  className="shrink-0 rounded-xl border border-teal-500/40 bg-teal-500/10 px-3 py-2 text-xs font-bold text-teal-600 hover:bg-teal-500/20 dark:text-teal-400 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {crawling ? 'Crawling…' : '🔍 Crawl'}
                </button>
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Affiliate URL (optional)" htmlFor="promo-affiliate"><input id="promo-affiliate" type="url" value={draft.affiliateUrl ?? ''} onChange={(e) => update('affiliateUrl', e.target.value)} placeholder="https://partner.link/..." className={inputClass} /></Field><Field label="Tracking URL (optional)" htmlFor="promo-tracking"><input id="promo-tracking" type="url" value={draft.trackingUrl ?? ''} onChange={(e) => update('trackingUrl', e.target.value)} placeholder="https://click.track/..." className={inputClass} /></Field></div>
            
            <div className="space-y-2">
              <Field label="Placement form" htmlFor="promo-placement">
                <select id="promo-placement" value={draft.placement} onChange={(e) => update('placement', e.target.value)} className={inputClass}>
                  {promotionPlacements.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </Field>
              <p className="text-xs text-muted-foreground">Select <strong>SIDEBAR</strong> for the sticky/floating right-side card with animated appearance.</p>
            </div>

            {/* Target pages with presets */}
            <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
              <label className="text-xs font-bold text-foreground">Target Pages on Kunwar Analytics</label>
              <p className="text-xs text-muted-foreground">Click buttons to enable/disable for specific sections, or use All Pages:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {TARGET_PAGE_PRESETS.map((preset) => {
                  const active = preset.path === 'ALL' ? currentTargets.includes('ALL') || currentTargets.length === 0 : currentTargets.includes(preset.path);
                  return (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => togglePreset(preset.path)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        active ? 'bg-primary text-primary-foreground font-semibold shadow-sm' : 'border border-border bg-background text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              <Field label="Custom Target Paths (one per line)" htmlFor="promo-paths" hint="Leave empty or use ALL for all pages. Use relative paths like /research or /tools.">
                <textarea id="promo-paths" rows={2} value={draft.targetPagesText} onChange={(e) => update('targetPagesText', e.target.value)} placeholder="/research&#10;/insights&#10;ALL" className={textAreaClass} />
              </Field>
            </div>

            {/* Creative media: Image, Video, Logo */}
            <div className="rounded-xl border border-border p-3 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">Creative Media (Video & Images)</p>
                  <p className="text-xs text-muted-foreground">Top websites use live website screenshots, animated videos or rich imagery.</p>
                </div>
                {draft.destinationUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const liveShot = `https://s0.wp.com/mshots/v1/${encodeURIComponent(draft.destinationUrl.trim())}?w=1280`;
                      update('imageUrl', liveShot);
                      update('lightCreativeUrl', liveShot);
                      update('darkCreativeUrl', liveShot);
                      setNotice({ kind: 'info', text: '📸 Set display image to live website snapshot preview.' });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-colors"
                  >
                    📸 Set Live Webpage Snapshot
                  </button>
                )}
              </div>

              {/* Extracted Image Chips if crawler found candidates */}
              {crawledData?.extractedImages && crawledData.extractedImages.length > 0 && (
                <div className="rounded-lg bg-muted/40 p-2 space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground">Discovered Web Images (Click to use):</p>
                  <div className="flex flex-wrap gap-2">
                    {crawledData.liveScreenshotUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          update('imageUrl', crawledData.liveScreenshotUrl!);
                          update('lightCreativeUrl', crawledData.liveScreenshotUrl!);
                          update('darkCreativeUrl', crawledData.liveScreenshotUrl!);
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-teal-500/50 bg-teal-500/15 px-2.5 py-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-500/25"
                      >
                        📸 Live Web Snapshot
                      </button>
                    )}
                    {crawledData.extractedImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          update('imageUrl', imgUrl);
                          update('lightCreativeUrl', imgUrl);
                          update('darkCreativeUrl', imgUrl);
                        }}
                        className="flex items-center gap-1 rounded-lg border border-border bg-background px-2 py-1 text-[11px] text-foreground hover:border-primary transition-colors truncate max-w-[140px]"
                        title={imgUrl}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt="" className="h-4 w-4 rounded object-cover shrink-0" />
                        <span className="truncate">Image {idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Video URL (MP4 / WebM)" htmlFor="promo-video" hint="Auto-loops video promotion">
                  <input id="promo-video" type="url" value={draft.videoUrl ?? ''} onChange={(e) => update('videoUrl', e.target.value)} placeholder="https://.../creative.mp4" className={inputClass} />
                </Field>
                <Field label="Image / Banner URL" htmlFor="promo-image" hint="Creative display image or live website snapshot">
                  <input id="promo-image" type="url" value={draft.imageUrl ?? ''} onChange={(e) => update('imageUrl', e.target.value)} placeholder="https://.../banner.png" className={inputClass} />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Brand Logo URL (optional)" htmlFor="promo-logo">
                  <input id="promo-logo" type="url" value={draft.logoUrl ?? ''} onChange={(e) => update('logoUrl', e.target.value)} placeholder="https://.../logo.png" className={inputClass} />
                </Field>
                <Field label="Dark-mode Creative URL (optional)" htmlFor="promo-darkCreativeUrl">
                  <input id="promo-darkCreativeUrl" type="url" value={draft.darkCreativeUrl ?? ''} onChange={(e) => update('darkCreativeUrl', e.target.value)} placeholder="https://.../banner-dark.png" className={inputClass} />
                </Field>
              </div>
            </div>

            {/* Live Interactive Preview Card */}
            {(draft.title || draft.brandName || draft.imageUrl || draft.videoUrl) && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Live Card Form Preview (Right-Side Widget)</p>
                <div className="max-w-[320px] rounded-2xl border border-border bg-card shadow-xl overflow-hidden p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      {draft.disclosureText || 'Sponsored · Paid promotion'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Preview</span>
                  </div>
                  {draft.videoUrl ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/20">
                      <video src={draft.videoUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                    </div>
                  ) : draft.imageUrl ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={draft.imageUrl} alt="Creative Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{draft.brandName || 'Partner Brand'}</p>
                    <p className="text-xs font-bold text-foreground leading-snug">{draft.title || 'Compelling Headline Here'}</p>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{draft.shortDescription || 'Short description of the promotion here...'}</p>
                  </div>
                  <div className="w-full text-center rounded-xl bg-primary py-2 text-xs font-bold text-primary-foreground shadow-sm">
                    {draft.ctaText || 'Learn more'} →
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2"><Field label="Disclosure text" htmlFor="promo-disclosure"><input id="promo-disclosure" required minLength={6} maxLength={120} value={draft.disclosureText} onChange={(e) => update('disclosureText', e.target.value)} className={inputClass} /></Field><Field label="Priority (higher shows first)" htmlFor="promo-priority"><input id="promo-priority" type="number" min={-100} max={1000} value={draft.priority} onChange={(e) => update('priority', Number(e.target.value))} className={inputClass} /></Field></div>
            <div className="grid gap-3 sm:grid-cols-3"><Toggle id="promo-active" label="Campaign active" checked={draft.active} onChange={(value) => update('active', value)} hint="Must be checked to show on pages." /><Toggle id="promo-mobile" label="Visible on mobile" checked={draft.mobileVisible} onChange={(value) => update('mobileVisible', value)} /><Toggle id="promo-desktop" label="Visible on desktop" checked={draft.desktopVisible} onChange={(value) => update('desktopVisible', value)} /></div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button type="submit" disabled={saving} className={primaryButtonClass}>
                {saving ? 'Saving…' : 'Save campaign'}
              </button>
              <button
                type="button"
                onClick={() => { setDraft(blankPromotion()); setCrawledData(null); setNotice(null); }}
                className={buttonClass}
              >
                Clear form
              </button>
              {draft.id && (
                <button
                  type="button"
                  onClick={() => void deleteCampaign(draft.id!, draft.brandName)}
                  className="ml-auto rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-500/20 dark:text-red-400 transition-colors"
                >
                  🗑️ Delete Campaign
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
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

export default function ProductContentAdminClient({ courses }: { courses: AdminCourseOption[] }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('faqs');
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
