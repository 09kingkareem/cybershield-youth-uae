'use client';

import { useState, useEffect } from 'react';
import PageShell from '@/components/layout/PageShell';
import NationalStatusHeader from '@/components/national/NationalStatusHeader';
import ThreatContextPanel from '@/components/threat/ThreatContextPanel';
import ExecutiveBriefingView from '@/components/executive/ExecutiveBriefingView';
import ExecutiveToggle from '@/components/executive/ExecutiveToggle';
import AccessGate from '@/components/portal/AccessGate';
import { getSchools, getThreatContext } from '@/lib/data';
import { getNationalStatus, computeNationalCRI, buildStrategicIndices } from '@/lib/national-status';
import { buildExecutiveBriefing } from '@/lib/executive';
import { EXECUTIVE_MODE_KEY } from '@/lib/constants';

export default function NationalPage() {
  return (
    <AccessGate
      allowedRoles={['admin']}
      title="Strategic Console"
      description="This console requires administrator access."
    >
      <NationalContent />
    </AccessGate>
  );
}

function NationalContent() {
  const [execMode, setExecMode] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(EXECUTIVE_MODE_KEY);
    if (stored === 'true') setExecMode(true);
  }, []);

  const toggleExec = () => {
    const next = !execMode;
    setExecMode(next);
    sessionStorage.setItem(EXECUTIVE_MODE_KEY, String(next));
  };

  const schools = getSchools();
  const threatContext = getThreatContext();
  const nationalCRI = computeNationalCRI(schools);
  const status = getNationalStatus(nationalCRI);
  const indices = buildStrategicIndices(schools);
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);

  return (
    <PageShell
      title="Strategic Console"
      subtitle="National Cyber Resilience Monitoring & Projection — UAE Youth Cyber Posture"
    >
      {/* Executive toggle */}
      <div className="flex justify-end mb-4">
        <ExecutiveToggle active={execMode} onToggle={toggleExec} />
      </div>

      {execMode ? (
        /* Executive Briefing Mode */
        <ExecutiveBriefingView briefing={buildExecutiveBriefing(schools)} />
      ) : (
        /* Strategic Console Mode */
        <div className="space-y-8">
          {/* National Status Header + Strategic Indices */}
          <NationalStatusHeader
            nationalCRI={nationalCRI}
            status={status}
            totalSchools={schools.length}
            totalStudents={totalStudents}
            indices={indices}
          />

          {/* External Threat Context */}
          <ThreatContextPanel
            items={threatContext.items}
            lastUpdated={threatContext.lastUpdated}
          />
        </div>
      )}
    </PageShell>
  );
}
