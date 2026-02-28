import type { TrendDirection } from '@/lib/types';

interface TrendArrowProps {
  direction: TrendDirection;
  label?: string;
  size?: 'sm' | 'md';
}

const ARROW_CONFIG: Record<TrendDirection, { symbol: string; color: string; text: string }> = {
  up: { symbol: '\u25B2', color: '#22c55e', text: 'Improving' },
  down: { symbol: '\u25BC', color: '#ef4444', text: 'Declining' },
  flat: { symbol: '\u25C6', color: '#f59e0b', text: 'Stable' },
};

export default function TrendArrow({ direction, label, size = 'sm' }: TrendArrowProps) {
  const config = ARROW_CONFIG[direction];
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-1 ${textSize}`} style={{ color: config.color }}>
      <span className={size === 'sm' ? 'text-[10px]' : 'text-xs'}>{config.symbol}</span>
      <span>{label ?? config.text}</span>
    </span>
  );
}
