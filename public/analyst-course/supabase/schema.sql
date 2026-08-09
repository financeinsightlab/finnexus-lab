-- SignalPath production data model (Supabase/Postgres)
-- Run in Supabase SQL Editor after enabling the uuid-ossp/pgcrypto extension.
create extension if not exists pgcrypto;

create type public.progress_status as enum ('not_started','in_progress','completed','mastered');
create type public.submission_status as enum ('draft','submitted','reviewed');
create type public.difficulty as enum ('beginner','intermediate','advanced','professional','expert');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Analyst',
  target_role text,
  target_timeline_months integer check (target_timeline_months between 1 and 60),
  weekly_hours numeric(5,1) default 8 check (weekly_hours >= 0),
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.skills (
  id text primary key,
  name text not null, category text not null,
  description text not null, target_level smallint not null default 80 check (target_level between 0 and 100)
);
create table public.levels (
  id text primary key, sequence smallint unique not null, title text not null, description text not null, estimated_hours integer not null
);
create table public.modules (
  id text primary key, level_id text not null references public.levels(id) on delete cascade,
  sequence smallint not null, title text not null, summary text not null, unique(level_id, sequence)
);
create table public.lessons (
  id text primary key, module_id text not null references public.modules(id) on delete cascade,
  sequence smallint not null, title text not null, duration_minutes integer not null,
  content jsonb not null default '{}'::jsonb, -- authored blocks: objective, explanation, analogy, worked_example, exercise, interview_question
  published boolean not null default false, unique(module_id, sequence)
);
create table public.exercises (
  id uuid primary key default gen_random_uuid(), lesson_id text references public.lessons(id) on delete cascade,
  title text not null, kind text not null check (kind in ('mcq','written','sql','python','spreadsheet','bi','case')),
  prompt text not null, rubric jsonb not null default '{}'::jsonb, test_spec jsonb not null default '{}'::jsonb,
  difficulty public.difficulty not null default 'beginner', estimated_minutes integer not null default 10
);
create table public.datasets (
  id uuid primary key default gen_random_uuid(), title text not null, domain text not null, description text not null,
  grain_statement text not null, data_dictionary jsonb not null default '[]'::jsonb,
  source_url text, storage_path text, license text, difficulty public.difficulty not null default 'beginner', created_at timestamptz not null default now()
);
create table public.projects (
  id text primary key, title text not null, summary text not null, difficulty public.difficulty not null,
  estimated_hours integer not null, dataset_id uuid references public.datasets(id), brief jsonb not null default '{}'::jsonb,
  rubric jsonb not null default '{}'::jsonb, published boolean not null default false
);

create table public.user_lesson_progress (
  user_id uuid not null references public.profiles(id) on delete cascade, lesson_id text not null references public.lessons(id) on delete cascade,
  status public.progress_status not null default 'not_started', completion_percent smallint not null default 0 check (completion_percent between 0 and 100),
  last_seen_at timestamptz not null default now(), completed_at timestamptz, primary key(user_id, lesson_id)
);
create table public.user_skill_scores (
  user_id uuid not null references public.profiles(id) on delete cascade, skill_id text not null references public.skills(id) on delete cascade,
  understanding numeric(5,2) not null default 0 check (understanding between 0 and 100),
  practice numeric(5,2) not null default 0 check (practice between 0 and 100),
  project_evidence numeric(5,2) not null default 0 check (project_evidence between 0 and 100),
  interview numeric(5,2) not null default 0 check (interview between 0 and 100),
  mastery numeric(5,2) generated always as (round((understanding*.25 + practice*.30 + project_evidence*.30 + interview*.15)::numeric,2)) stored,
  reviewed_at timestamptz, updated_at timestamptz not null default now(), primary key(user_id, skill_id)
);
create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade, answer jsonb not null default '{}'::jsonb,
  score numeric(5,2) check (score between 0 and 100), feedback jsonb not null default '{}'::jsonb,
  attempt_number integer not null default 1, submitted_at timestamptz not null default now()
);
create table public.project_submissions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  project_id text not null references public.projects(id) on delete cascade, status public.submission_status not null default 'draft',
  repository_url text, dashboard_url text, artifact_paths jsonb not null default '[]'::jsonb,
  executive_summary text, self_assessment jsonb not null default '{}'::jsonb,
  score numeric(5,2) check (score between 0 and 100), evaluator_feedback jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), submitted_at timestamptz, reviewed_at timestamptz
);
create table public.notes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  entity_type text not null, entity_id text not null, body text not null, tags text[] not null default '{}', bookmarked boolean not null default false, updated_at timestamptz not null default now()
);
create table public.review_queue (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  skill_id text references public.skills(id) on delete cascade, lesson_id text references public.lessons(id) on delete cascade,
  due_at timestamptz not null, interval_days integer not null default 1, ease numeric(4,2) not null default 2.5, last_score numeric(5,2), unique(user_id, skill_id, lesson_id)
);
create table public.interview_attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
  mode text not null, questions jsonb not null, answers jsonb not null default '[]'::jsonb, score numeric(5,2), feedback jsonb not null default '{}'::jsonb, started_at timestamptz not null default now(), completed_at timestamptz
);

-- User-owned data protection
alter table public.profiles enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.user_skill_scores enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.project_submissions enable row level security;
alter table public.notes enable row level security;
alter table public.review_queue enable row level security;
alter table public.interview_attempts enable row level security;
create policy "profile owner" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "lesson progress owner" on public.user_lesson_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "skill score owner" on public.user_skill_scores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "attempt owner" on public.exercise_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "submission owner" on public.project_submissions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "note owner" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "review owner" on public.review_queue for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "interview owner" on public.interview_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Authenticated learners can read published curriculum; content writing stays service-role/admin only.
alter table public.levels enable row level security; alter table public.modules enable row level security; alter table public.lessons enable row level security;
alter table public.exercises enable row level security; alter table public.datasets enable row level security; alter table public.projects enable row level security; alter table public.skills enable row level security;
create policy "read published levels" on public.levels for select to authenticated using (true);
create policy "read published modules" on public.modules for select to authenticated using (true);
create policy "read published lessons" on public.lessons for select to authenticated using (published = true);
create policy "read exercises" on public.exercises for select to authenticated using (true);
create policy "read datasets" on public.datasets for select to authenticated using (true);
create policy "read published projects" on public.projects for select to authenticated using (published = true);
create policy "read skills" on public.skills for select to authenticated using (true);

create index idx_lesson_module on public.lessons(module_id, sequence);
create index idx_attempt_user_exercise on public.exercise_attempts(user_id, exercise_id, submitted_at desc);
create index idx_review_due on public.review_queue(user_id, due_at);
create index idx_submission_user_project on public.project_submissions(user_id, project_id);
