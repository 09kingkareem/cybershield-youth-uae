'use client';

import type { AggregateViewLevel } from '@/lib/types';

interface ViewToggleProps {
  level: AggregateViewLevel;
  onChange: (level: AggregateViewLevel) => void;
}

const LEVELS: { value: AggregateViewLevel; label: string }[] = [
  { value: 'school', label: 'School' },
  { value: 'emirate', label: 'Emirate' },
  { value: 'national', label: 'National' },
];

export default function ViewToggle({ level, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center border border-panel-border rounded-lg overflow-hidden">
      {LEVELS.map((l) => (
        <button
          key={l.value}
          onClick={() => onChange(l.value)}
          className={`px-4 py-1.5 text-xs font-mono font-semibold transition-all ${
            level === l.value
              ? 'bg-accent/15 text-accent border-accent/30'
              : 'text-muted hover:text-foreground hover:bg-panel-bg'
          } ${l.value !== 'school' ? 'border-l border-panel-border' : ''}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
