/* ─────────────────────────────────────────────────────────────___
   PGDM Learning Content — type definitions
   Finance (Major) + Business Analytics (Minor) · Semester 3 & 4
   ──────────────────────────────────────────────────────────────── */

export type Track = 'CORE' | 'FINANCE' | 'ANALYTICS';

export interface Callout {
  type: 'note' | 'warning' | 'excel' | 'exam';
  text: string;
}

export interface LectureSection {
  heading: string;
  body: string[];
  bullets?: string[];
  callout?: Callout;
}

export interface WorkedExample {
  title: string;
  given: string[];
  steps: { text: string; calc?: string }[];
  answer: string;
}

export interface PracticeQ {
  q: string;
  a: string;
}

export interface Diagram {
  title: string;
  caption: string;
  svg: string;
}

export interface Formula {
  name: string;
  expr: string;
  meaning: string;
}

export interface Lecture {
  slug: string;
  number: number;
  title: string;
  minutes: number;
  summary: string;
  status: 'live' | 'building';
  objectives: string[];
  sections: LectureSection[];
  diagram?: Diagram;
  formulas?: Formula[];
  examples: WorkedExample[];
  caseStudy?: {
    title: string;
    body: string[];
    questions: string[];
    takeaways: string[];
  };
  revision: string[]; // exam-ready quick notes ("handwritten style" summary)
  practice: PracticeQ[];
  tools?: { label: string; href: string }[];
}

export interface Subject {
  slug: string;
  code: string;
  name: string;
  track: Track;
  credits: number;
  hours?: number;
  semester: 3 | 4;
  tagline: string;
  description: string;
  outcomes: string[];
  units: string[];
  lectures: Lecture[];
  books?: { title: string; author: string }[];
  heroImage?: string;
}

export const TRACK_META: Record<
  Track,
  { label: string; kind: 'Core' | 'Major' | 'Minor'; icon: string; blurb: string }
> = {
  CORE: {
    label: 'Core Papers',
    kind: 'Core',
    icon: '🏛️',
    blurb:
      'The Semester III common core — project management from idea to audit, and the legal & business environment every decision operates inside.',
  },
  FINANCE: {
    label: 'Finance',
    kind: 'Major',
    icon: '💹',
    blurb:
      'Valuation, markets, and risk — the full analyst toolkit from three-statement modeling to portfolio construction and derivatives.',
  },
  ANALYTICS: {
    label: 'Business Analytics',
    kind: 'Minor',
    icon: '📈',
    blurb:
      'From data to decisions — descriptive, predictive and prescriptive analytics, visualization, and machine learning applied to business problems.',
  },
};
