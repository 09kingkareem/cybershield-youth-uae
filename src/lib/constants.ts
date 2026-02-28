import { Category } from './types';

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  password: { label: 'Password Hygiene', icon: '🔑', color: '#3b82f6' },
  phishing: { label: 'Phishing Awareness', icon: '🎣', color: '#f59e0b' },
  privacy: { label: 'Data Privacy', icon: '🛡', color: '#22c55e' },
  device: { label: 'Device Security', icon: '💻', color: '#a855f7' },
};

export const CATEGORIES: Category[] = ['password', 'phishing', 'privacy', 'device'];

export const TIER_THRESHOLDS = {
  foundational: { min: 0, max: 49, label: 'Foundational' as const, color: '#ef4444' },
  operational: { min: 50, max: 74, label: 'Operational' as const, color: '#f59e0b' },
  resilient: { min: 75, max: 100, label: 'Resilience Ready' as const, color: '#22c55e' },
};

export const QUESTIONS_PER_CATEGORY = 3;
export const MAX_POINTS_PER_QUESTION = 5;
export const MAX_RAW_PER_CATEGORY = QUESTIONS_PER_CATEGORY * MAX_POINTS_PER_QUESTION;

export const SESSION_KEY = 'cybershield_assessment';
