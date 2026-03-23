export interface ResearchPost {
  slug: string;
  title: string;
  date: string;
  sector: string;
  tags: string[];
  summary: string;
  pageCount: number;
  author: string;
  featured: boolean;
  coverImage?: string;
  content?: string;
}

export interface InsightPost {
  slug: string;
  title: string;
  date: string;
  category: 'Strategy Note' | 'Sector Analysis' | 'Company Note' | 'Market Update';
  readingTime: number;
  thesis: string;
  author: string;
  featured: boolean;
  content?: string;
}

export interface Tool {
  id: string;
  title: string;
  category: string;
  tool: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  desc: string;
  includes: string[];
  gated: boolean;
  price?: string;
  icon: string;
}

export interface Service {
  icon: string;
  title: string;
  price: string;
  timeline: string;
  desc: string;
  includes: string[];
  for: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}