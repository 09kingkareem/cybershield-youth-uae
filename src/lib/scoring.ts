import { Category, CategoryScore, Tier, AssessmentResult } from './types';
import { CATEGORIES, CATEGORY_META, MAX_RAW_PER_CATEGORY } from './constants';

export function computeCategoryScores(answers: Record<number, number>, questions: { id: number; category: Category }[]): CategoryScore[] {
  return CATEGORIES.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat);
    const raw = catQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const normalized = Math.round((raw / MAX_RAW_PER_CATEGORY) * 100);
    return {
      category: cat,
      label: CATEGORY_META[cat].label,
      raw,
      max: MAX_RAW_PER_CATEGORY,
      normalized,
    };
  });
}

export function computeOverallCRI(scores: CategoryScore[]): number {
  const sum = scores.reduce((acc, s) => acc + s.normalized, 0);
  return Math.round(sum / scores.length);
}

export function getTier(score: number): Tier {
  if (score >= 75) return 'Resilience Ready';
  if (score >= 50) return 'Operational';
  return 'Foundational';
}

export function getTierColor(tier: Tier): string {
  switch (tier) {
    case 'Resilience Ready': return '#22c55e';
    case 'Operational': return '#f59e0b';
    case 'Foundational': return '#ef4444';
  }
}

export function buildResult(answers: Record<number, number>, questions: { id: number; category: Category }[]): AssessmentResult {
  const scores = computeCategoryScores(answers, questions);
  const overall = computeOverallCRI(scores);
  const tier = getTier(overall);
  return { scores, overall, tier, completedAt: new Date().toISOString() };
}

export function getRecommendations(scores: CategoryScore[]): { category: Category; label: string; message: string }[] {
  const sorted = [...scores].sort((a, b) => a.normalized - b.normalized);
  return sorted.map((s) => {
    let message: string;
    if (s.normalized < 50) {
      message = `Your ${s.label.toLowerCase()} practices need significant improvement. Start with the basics.`;
    } else if (s.normalized < 75) {
      message = `Good foundation in ${s.label.toLowerCase()}, but there's room to strengthen your practices.`;
    } else {
      message = `Strong ${s.label.toLowerCase()} habits. Keep it up and help others reach this level.`;
    }
    return { category: s.category, label: s.label, message };
  });
}
