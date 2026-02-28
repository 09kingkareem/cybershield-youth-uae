import type { Category } from '@/lib/types';
import { CATEGORY_META, CATEGORY_ABBREVIATIONS } from '@/lib/constants';

interface CategoryIconProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: { box: 24, text: 8, icon: 10 },
  md: { box: 32, text: 10, icon: 14 },
  lg: { box: 44, text: 12, icon: 18 },
};

const SHAPES: Record<Category, (size: number, color: string) => React.ReactElement> = {
  password: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={c} strokeWidth="1.5" fill={`${c}15`} />
      <rect x="8" y="8" width="8" height="8" rx="1" stroke={c} strokeWidth="1.5" fill={`${c}25`} />
    </svg>
  ),
  phishing: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 22,18 2,18" stroke={c} strokeWidth="1.5" fill={`${c}15`} strokeLinejoin="round" />
      <line x1="12" y1="9" x2="12" y2="13" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="0.75" fill={c} />
    </svg>
  ),
  privacy: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" stroke={c} strokeWidth="1.5" fill={`${c}15`} strokeLinejoin="round" />
    </svg>
  ),
  device: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" fill={`${c}15`} />
      <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.5" fill={`${c}25`} />
    </svg>
  ),
};

export default function CategoryIcon({ category, size = 'md', className = '' }: CategoryIconProps) {
  const meta = CATEGORY_META[category];
  const dims = SIZE_MAP[size];

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      title={meta.label}
      aria-label={meta.label}
    >
      {SHAPES[category](dims.icon, meta.color)}
    </span>
  );
}
