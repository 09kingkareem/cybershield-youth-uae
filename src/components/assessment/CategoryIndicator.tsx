import { CATEGORIES, CATEGORY_META } from '@/lib/constants';
import type { Category } from '@/lib/types';

interface CategoryIndicatorProps {
  currentCategory: Category;
  completedCategories: Category[];
}

export default function CategoryIndicator({ currentCategory, completedCategories }: CategoryIndicatorProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {CATEGORIES.map((cat) => {
        const completed = completedCategories.includes(cat);
        const active = cat === currentCategory;
        return (
          <div
            key={cat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
              active
                ? 'border-accent bg-accent/10 text-accent'
                : completed
                ? 'border-success/30 bg-success/5 text-success'
                : 'border-panel-border text-muted'
            }`}
          >
            <span>{CATEGORY_META[cat].icon}</span>
            <span className="hidden sm:inline">{CATEGORY_META[cat].label}</span>
          </div>
        );
      })}
    </div>
  );
}
