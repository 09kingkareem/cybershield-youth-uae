'use client';

import { usePortal } from '@/lib/portal-context';

export default function PortalSwitcher() {
  const { mode, setMode } = usePortal();

  return (
    <div className="inline-flex items-center border border-panel-border rounded-lg overflow-hidden text-xs font-mono">
      <button
        onClick={() => setMode('demo')}
        className={`px-2.5 py-1 transition-colors ${
          mode === 'demo'
            ? 'bg-accent/15 text-accent font-semibold'
            : 'text-muted hover:text-foreground'
        }`}
      >
        DEMO
      </button>
      <button
        onClick={() => setMode('pilot')}
        className={`px-2.5 py-1 border-l border-panel-border transition-colors ${
          mode === 'pilot'
            ? 'bg-success/15 text-success font-semibold'
            : 'text-muted hover:text-foreground'
        }`}
      >
        PILOT
      </button>
    </div>
  );
}
