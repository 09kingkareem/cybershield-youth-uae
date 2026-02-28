import PageShell from '@/components/layout/PageShell';
import Panel from '@/components/ui/Panel';
import StrategicStatusCard from '@/components/ui/StrategicStatusCard';
import SchoolTable from '@/components/admin/SchoolTable';
import EmirateCard from '@/components/admin/EmirateCard';
import { getSchools, getEmirateData } from '@/lib/data';
import { getTier } from '@/lib/scoring';

export default function AdminPage() {
  const schools = getSchools();
  const emirates = getEmirateData(schools);
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const avgCRI = Math.round(schools.reduce((sum, s) => sum + s.cri, 0) / schools.length);
  const tier = getTier(avgCRI);

  return (
    <PageShell title="Admin Dashboard" subtitle="Institutional cyber resilience overview — demo data">
      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StrategicStatusCard title="Schools" value={schools.length} subtitle="Participating institutions" />
        <StrategicStatusCard title="Students" value={totalStudents.toLocaleString()} subtitle="Total assessed" />
        <StrategicStatusCard title="Average CRI" value={avgCRI} subtitle="Institutional average" tier={tier} />
        <StrategicStatusCard title="Emirates" value={emirates.length} subtitle="With enrolled schools" />
      </div>

      {/* Emirate overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Emirate Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emirates.sort((a, b) => b.averageCRI - a.averageCRI).map((e) => (
            <EmirateCard key={e.emirate} data={e} />
          ))}
        </div>
      </div>

      {/* School rankings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">School Rankings</h2>
        <SchoolTable schools={schools} />
      </div>

      {/* Category weakness analysis */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Category Analysis</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {(['password', 'phishing', 'privacy', 'device'] as const).map((cat) => {
            const avg = Math.round(schools.reduce((sum, s) => sum + s[cat], 0) / schools.length);
            const weakest = [...schools].sort((a, b) => a[cat] - b[cat])[0];
            return (
              <Panel key={cat} className="p-4">
                <div className="text-xs text-muted uppercase font-mono">{cat}</div>
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
    </PageShell>
  );
}
