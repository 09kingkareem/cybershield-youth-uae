export type Category = 'password' | 'phishing' | 'privacy' | 'device';

export interface Question {
  id: number;
  category: Category;
  text: string;
  options: { label: string; value: number }[];
}

export interface CategoryScore {
  category: Category;
  label: string;
  raw: number;
  max: number;
  normalized: number;
}

export interface AssessmentResult {
  scores: CategoryScore[];
  overall: number;
  tier: Tier;
  completedAt: string;
}

export type Tier = 'Foundational' | 'Operational' | 'Resilience Ready';

export interface Mission {
  id: string;
  title: string;
  category: Category;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  lessons: Lesson[];
  knowledgeCheck: KnowledgeCheckItem[];
}

export interface Lesson {
  title: string;
  content: string;
}

export interface KnowledgeCheckItem {
  question: string;
  options: string[];
  correct: number;
}

export interface School {
  name: string;
  emirate: string;
  students: number;
  cri: number;
  password: number;
  phishing: number;
  privacy: number;
  device: number;
}

export interface EmirateData {
  emirate: string;
  averageCRI: number;
  schools: number;
  students: number;
}
