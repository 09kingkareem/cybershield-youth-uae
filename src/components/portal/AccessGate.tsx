'use client';

import { useState, type ReactNode } from 'react';
import { usePortal } from '@/lib/portal-context';
import Panel from '@/components/ui/Panel';

interface AccessGateProps {
  children: ReactNode;
  allowedRoles: string[];
  title?: string;
  description?: string;
}

export default function AccessGate({
  children,
  allowedRoles,
  title = 'Access Required',
  description = 'Enter your access code to continue.',
}: AccessGateProps) {
  const { mode, role, authenticate } = usePortal();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (mode === 'demo') return <>{children}</>;
  if (allowedRoles.includes(role)) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = authenticate(code);
    if (result && allowedRoles.includes(result)) {
      setError('');
    } else if (result) {
      setError(`Your role (${result}) does not have access to this page.`);
    } else {
      setError('Invalid access code. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <Panel className="p-8 text-center" glow>
        <div className="text-xs font-mono text-accent mb-3">PILOT MODE</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-muted text-sm mb-6">{description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="Enter access code"
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-panel-border text-foreground text-sm font-mono placeholder:text-muted focus:outline-none focus:border-accent"
          />
          {error && <p className="text-danger text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer bg-accent text-white hover:bg-blue-600 shadow-lg shadow-accent/20 px-5 py-2.5 text-sm"
          >
            Authenticate
          </button>
        </form>
      </Panel>
    </div>
  );
}
