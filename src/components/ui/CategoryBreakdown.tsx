import Panel from './Panel';
import ProgressBar from './ProgressBar';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_META } from '@/lib/constants';
import { getTier, getTierColor } from '@/lib/scoring';
import type { CategoryScore } from '@/lib/types';

interface CategoryBreakdownProps {
  scores: CategoryScore[];
}

export default function CategoryBreakdown({ scores }: CategoryBreakdownProps) {
  return (
    <Panel className="p-6">
      <h3 className="text-sm font-semibold mb-4">Category Breakdown</h3>
      <div className="space-y-4">
        {scores.map((s) => {
          const meta = CATEGORY_META[s.category];
          const tier = getTier(s.normalized);
          const color = getTierColor(tier);
          return (
            <div key={s.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm flex items-center gap-2">
                  <CategoryIcon category={s.category} size="sm" />
                  {meta.label}
                </span>
                <span className="text-sm font-mono" style={{ color }}>{s.normalized}</span>
              </div>
              <ProgressBar value={s.normalized} color={color} />
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
