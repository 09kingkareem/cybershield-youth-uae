import Panel from '@/components/ui/Panel';
import StatusBadge from '@/components/ui/StatusBadge';
import TrendArrow from '@/components/ui/TrendArrow';
import CategoryIcon from '@/components/ui/CategoryIcon';
import type { StrategicIndex, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { getStatusColor } from '@/lib/national-status';

interface StrategicIndexCardProps {
  index: StrategicIndex;
}

export default function StrategicIndexCard({ index }: StrategicIndexCardProps) {
  const color = getStatusColor(index.status);
  const isCategory = CATEGORIES.includes(index.key as Category);

  return (
    <Panel className="p-5" glow>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isCategory && <CategoryIcon category={index.key as Category} size="sm" />}
          <span className="text-xs font-mono uppercase text-muted">{index.label}</span>
        </div>
        <StatusBadge status={index.status} size="sm" />
      </div>
      <div className="flex items-end gap-3 mb-3">
        <span className="text-3xl font-bold font-mono" style={{ color }}>{index.value}</span>
        <span className="text-sm text-muted mb-1">/100</span>
        <div className="ml-auto mb-1">
          <TrendArrow direction={index.trend} label={`+${index.delta} pts`} />
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${index.value}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-muted leading-relaxed">{index.briefing}</p>
    </Panel>
  );
}
