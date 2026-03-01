'use client';

import { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import Panel from '@/components/ui/Panel';
import StrategicStatusCard from '@/components/ui/StrategicStatusCard';
import SchoolTable from '@/components/admin/SchoolTable';
import EmirateCard from '@/components/admin/EmirateCard';
import ViewToggle from '@/components/admin/ViewToggle';
import ProjectionSimulator from '@/components/admin/ProjectionSimulator';
import TrendChart from '@/components/admin/TrendChart';
import EmirateHeatTable from '@/components/admin/EmirateHeatTable';
import CategoryIcon from '@/components/ui/CategoryIcon';
import AccessGate from '@/components/portal/AccessGate';
import { getSchools, getEmirateData, getMissions, getTrendData, getEmirateDetailData } from '@/lib/data';
import { getTier } from '@/lib/scoring';
import { computeNationalCRI, getNationalStatus } from '@/lib/national-status';
import type { AggregateViewLevel, Category } from '@/lib/types';

export default function AdminPage() {
  return (
    <AccessGate
      allowedRoles={['admin', 'school_admin']}
      title="Admin Dashboard"
      description="Enter your administrator access code to view the dashboard."
    >
      <AdminContent />
    </AccessGate>
  );
}

function AdminContent() {
  const [viewLevel, setViewLevel] = useState<AggregateViewLevel>('school');

  const schools = getSchools();
  const emirates = getEmirateData(schools);
  const emirateDetails = getEmirateDetailData(schools);
  const missions = getMissions();
  const trends = getTrendData();
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const avgCRI = computeNationalCRI(schools);
  const tier = getTier(avgCRI);
  const status = getNationalStatus(avgCRI);

  return (
    <PageShell title="Admin Dashboard" subtitle="Institutional cyber resilience overview — demo data">
      {/* View Toggle + Overview cards */}
      <div className="flex items-center justify-between mb-6">
        <ViewToggle level={viewLevel} onChange={setViewLevel} />
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StrategicStatusCard title="Schools" value={schools.length} subtitle="Participating institutions" />
        <StrategicStatusCard title="Students" value={totalStudents.toLocaleString()} subtitle="Total assessed" />
        <StrategicStatusCard title="Average CRI" value={avgCRI} subtitle={`Status: ${status}`} tier={tier} />
        <StrategicStatusCard title="Emirates" value={emirates.length} subtitle="With enrolled schools" />
      </div>

      {/* Conditional views */}
      {viewLevel === 'school' && (
        <>
          {/* School Rankings */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">School Rankings</h2>
            <SchoolTable schools={schools} />
          </div>

          {/* Trend Charts */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">3-Month CRI Trends</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trends.schools.slice(0, 8).map((s) => (
                <TrendChart
                  key={s.name}
                  label={s.name.length > 20 ? s.name.slice(0, 20) + '...' : s.name}
                  values={s.cri}
                  periods={trends.period}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {viewLevel === 'emirate' && (
        <>
          {/* Emirate Heat Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Emirate Performance Matrix</h2>
            <EmirateHeatTable emirates={emirateDetails} />
          </div>

          {/* Emirate Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Emirate Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {emirates.sort((a, b) => b.averageCRI - a.averageCRI).map((e) => (
                <EmirateCard key={e.emirate} data={e} />
              ))}
            </div>
          </div>
        </>
      )}

      {viewLevel === 'national' && (
        <>
          {/* Category Analysis */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">National Category Analysis</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {(['password', 'phishing', 'privacy', 'device'] as const).map((cat) => {
                const avg = Math.round(schools.reduce((sum, s) => sum + s[cat], 0) / schools.length);
                const weakest = [...schools].sort((a, b) => a[cat] - b[cat])[0];
                return (
                  <Panel key={cat} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon category={cat} size="sm" />
                      <span className="text-xs text-muted uppercase font-mono">{cat}</span>
                    </div>
                    <div className="text-xl font-bold font-mono mt-1" style={{ color: avg >= 75 ? '#22c55e' : avg >= 50 ? '#f59e0b' : '#ef4444' }}>
                      {avg}
                    </div>
                    <div className="text-xs text-muted mt-2">
                      Weakest: {weakest.name} ({weakest[cat]})
                    </div>
                  </Panel>
                );
              })}
            </div>
          </div>

          {/* National Trend */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">National CRI Trend</h2>
            <div className="max-w-md">
              <TrendChart
                label="National Average CRI"
                values={trends.period.map((_, pi) =>
                  Math.round(trends.schools.reduce((sum, s) => sum + s.cri[pi], 0) / trends.schools.length)
                )}
                periods={trends.period}
                color="#3b82f6"
              />
            </div>
          </div>
        </>
      )}

      {/* Projection Simulator (always visible) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Mission Impact Projection</h2>
        <ProjectionSimulator missions={missions} schools={schools} />
      </div>
    </PageShell>
  );
}
