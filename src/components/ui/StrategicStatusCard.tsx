import Panel from './Panel';
import { getTierColor } from '@/lib/scoring';
import type { Tier } from '@/lib/types';

interface StrategicStatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  tier?: Tier;
}

export default function StrategicStatusCard({ title, value, subtitle, tier }: StrategicStatusCardProps) {
  const color = tier ? getTierColor(tier) : 'var(--accent)';

  return (
    <Panel className="p-5" glow>
      <div className="text-xs text-muted font-mono uppercase tracking-wider">{title}</div>
      <div className="text-2xl font-bold font-mono mt-1" style={{ color }}>{value}</div>
      {subtitle && <div className="text-xs text-muted mt-1">{subtitle}</div>}
    </Panel>
  );
}
