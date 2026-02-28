'use client';

import { EXECUTIVE_MODE_KEY } from '@/lib/constants';

interface ExecutiveToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function ExecutiveToggle({ active, onToggle }: ExecutiveToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold tracking-wider border transition-all ${
        active
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-panel-border text-muted hover:text-foreground hover:border-accent/40'
      }`}
      title={active ? 'Exit Executive Mode' : 'Enter Executive Mode'}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-accent' : 'bg-muted'}`} />
      EXEC
    </button>
  );
}
