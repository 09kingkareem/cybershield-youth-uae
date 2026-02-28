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

// --- Strategic Elevation Types ---

export type NationalStatus = 'Stable' | 'Watch' | 'Elevated' | 'Critical';

export type TrendDirection = 'up' | 'down' | 'flat';

export interface StrategicIndex {
  label: string;
  key: string;
  value: number;
  status: NationalStatus;
  trend: TrendDirection;
  delta: number;
  briefing: string;
}

export interface ThreatContextItem {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  trend: TrendDirection;
  delta: string;
  severity: 'info' | 'elevated' | 'critical';
  briefing: string;
}

export interface ThreatContext {
  lastUpdated: string;
  source: string;
  items: ThreatContextItem[];
}

export interface ProjectionInput {
  missionId: string;
  missionTitle: string;
  category: Category;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completionRate: number;
  currentCategoryAvg: number;
}

export interface ProjectionResult {
  currentAvg: number;
  projectedAvg: number;
  improvement: number;
  riskReduction: number;
  headroom: number;
  impactWeight: number;
  briefing: string;
}

export interface TrendDataPoint {
  period: string;
  value: number;
}

export interface SchoolTrend {
  name: string;
  emirate: string;
  cri: number[];
  password: number[];
  phishing: number[];
  privacy: number[];
  device: number[];
}

export interface ExecutiveBriefing {
  nationalStatus: NationalStatus;
  nationalCRI: number;
  strengths: string[];
  weaknesses: string[];
  actions: string[];
  outlook: string;
}

export interface EmirateDetailData extends EmirateData {
  password: number;
  phishing: number;
  privacy: number;
  device: number;
  weakest: Category;
  strongest: Category;
}

export type AggregateViewLevel = 'school' | 'emirate' | 'national';
