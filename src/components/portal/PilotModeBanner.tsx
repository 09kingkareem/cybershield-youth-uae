'use client';

import { usePortal } from '@/lib/portal-context';

export default function PilotModeBanner() {
  const { mode } = usePortal();
  if (mode !== 'pilot') return null;
  return (
    <div className="inline-block mb-4 px-3 py-1 rounded-full border border-success/30 bg-success/5 text-xs font-mono text-success">
      PILOT MODE ACTIVE
    </div>
  );
}
