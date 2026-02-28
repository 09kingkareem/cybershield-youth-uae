import { Category } from './types';

export const CATEGORY_META: Record<Category, { label: string; icon: string; color: string }> = {
  password: { label: 'Password Hygiene', icon: 'PWD', color: '#3b82f6' },
  phishing: { label: 'Phishing Awareness', icon: 'PHI', color: '#f59e0b' },
  privacy: { label: 'Data Privacy', icon: 'PRI', color: '#22c55e' },
  device: { label: 'Device Security', icon: 'DEV', color: '#a855f7' },
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

// --- Strategic Elevation Constants ---

export const NATIONAL_STATUS_THRESHOLDS = {
  critical: { min: 0, max: 39, label: 'Critical' as const, color: '#ef4444' },
  elevated: { min: 40, max: 54, label: 'Elevated' as const, color: '#f97316' },
  watch: { min: 55, max: 69, label: 'Watch' as const, color: '#f59e0b' },
  stable: { min: 70, max: 100, label: 'Stable' as const, color: '#22c55e' },
};

export const MISSION_IMPACT_FACTORS: Record<string, number> = {
  'pw-101': 0.6,
  'pw-201': 0.8,
  'ph-101': 0.6,
  'ph-201': 0.8,
  'pr-101': 0.6,
  'pr-201': 0.8,
  'dv-101': 0.6,
  'dv-201': 0.8,
};

export const MAX_PROJECTION_IMPROVEMENT = 15;

export const EXECUTIVE_MODE_KEY = 'cybershield_executive_mode';

export const CATEGORY_ABBREVIATIONS: Record<Category, string> = {
  password: 'PWD',
  phishing: 'PHI',
  privacy: 'PRI',
  device: 'DEV',
};

// --- Portal System Constants ---

export const PORTAL_MODE_KEY = 'cybershield_portal_mode';
export const PORTAL_ROLE_KEY = 'cybershield_portal_role';
export const STUDENT_PROFILE_KEY = 'cybershield_student_profile';

export const ACCESS_CODES: Record<string, string> = {
  admin: 'CYBER-ADMIN-2026',
  school_admin: 'CYBER-SCHOOL-2026',
  student: 'CYBER-STUDENT-2026',
};

export const ROLE_LABELS: Record<string, string> = {
  guest: 'Guest',
  student: 'Student',
  admin: 'Administrator',
  school_admin: 'School Admin',
};
