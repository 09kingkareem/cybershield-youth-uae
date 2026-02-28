import { CATEGORIES } from '@/lib/constants';
import { CATEGORY_META } from '@/lib/constants';
import type { Category } from '@/lib/types';

interface AssessmentProgressProps {
  current: number;
  total: number;
  currentCategory: Category;
}

export default function AssessmentProgress({ current, total, currentCategory }: AssessmentProgressProps) {
  const pct = ((current) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-mono text-muted">Question {current + 1} of {total}</span>
        <span className="text-accent font-medium">{CATEGORY_META[currentCategory].label}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={`text-xs ${cat === currentCategory ? 'text-accent' : 'text-muted/50'}`}
          >
            {CATEGORY_META[cat].icon}
          </div>
        ))}
      </div>
    </div>
  );
}
