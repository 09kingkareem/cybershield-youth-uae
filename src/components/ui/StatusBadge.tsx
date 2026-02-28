import type { NationalStatus } from '@/lib/types';
import { getStatusColor } from '@/lib/national-status';

interface StatusBadgeProps {
  status: NationalStatus;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, pulse = false, size = 'md' }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const shouldPulse = pulse && (status === 'Critical' || status === 'Elevated');

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-semibold border ${sizeClasses[size]} ${shouldPulse ? (status === 'Critical' ? 'pulse-critical' : 'pulse-elevated') : ''}`}
      style={{
        color,
        borderColor: `${color}40`,
        backgroundColor: `${color}15`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  );
}
