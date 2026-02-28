'use client';

import { usePortal } from '@/lib/portal-context';
import { ROLE_LABELS } from '@/lib/constants';

export default function PortalBadge() {
  const { mode, role, logout, studentProfile } = usePortal();

  if (mode === 'demo' || role === 'guest') return null;

  const label = ROLE_LABELS[role] || role;
  const displayName = role === 'student' && studentProfile
    ? studentProfile.studentId
    : label;

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="flex items-center gap-1.5 px-2 py-1 rounded border border-success/30 bg-success/10 text-success">
        <span className="w-1.5 h-1.5 rounded-full bg-success" />
        {displayName}
      </span>
      <button
        onClick={logout}
        className="text-muted hover:text-danger transition-colors"
        title="Sign out"
      >
        EXIT
      </button>
    </div>
  );
}
