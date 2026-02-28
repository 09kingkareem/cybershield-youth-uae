import { getTierColor } from '@/lib/scoring';
import type { Tier } from '@/lib/types';

interface ResilienceBadgeProps {
  tier: Tier;
  className?: string;
}

export default function ResilienceBadge({ tier, className = '' }: ResilienceBadgeProps) {
  const color = getTierColor(tier);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${className}`}
      style={{ borderColor: `${color}40`, backgroundColor: `${color}10`, color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {tier}
    </div>
  );
}
