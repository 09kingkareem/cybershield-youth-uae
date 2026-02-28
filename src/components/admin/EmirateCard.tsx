import Panel from '@/components/ui/Panel';
import { getTier, getTierColor } from '@/lib/scoring';
import type { EmirateData } from '@/lib/types';

interface EmirateCardProps {
  data: EmirateData;
}

export default function EmirateCard({ data }: EmirateCardProps) {
  const tier = getTier(data.averageCRI);
  const color = getTierColor(tier);

  return (
    <Panel className="p-4" glow>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">{data.emirate}</h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {tier}
        </span>
      </div>
      <div className="text-2xl font-bold font-mono" style={{ color }}>{data.averageCRI}</div>
      <div className="text-xs text-muted mt-1">Average CRI</div>
      <div className="flex gap-4 mt-2 text-xs text-muted">
        <span>{data.schools} schools</span>
        <span>{data.students.toLocaleString()} students</span>
      </div>
    </Panel>
  );
}
