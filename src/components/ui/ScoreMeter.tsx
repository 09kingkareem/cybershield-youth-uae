'use client';

import { useEffect, useState } from 'react';
import { getTierColor } from '@/lib/scoring';
import type { Tier } from '@/lib/types';

interface ScoreMeterProps {
  score: number;
  tier: Tier;
  size?: number;
}

export default function ScoreMeter({ score, tier, size: propSize = 200 }: ScoreMeterProps) {
  // Responsive: use smaller size on mobile
  const size = typeof window !== 'undefined' && window.innerWidth < 640 ? Math.min(propSize, 160) : propSize;
  const [animated, setAnimated] = useState(0);
  const color = getTierColor(tier);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;
  const center = size / 2;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--surface)"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold font-mono" style={{ color }}>{animated}</span>
        <span className="text-xs text-muted mt-1">CRI Score</span>
      </div>
    </div>
  );
}
