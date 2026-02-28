import PageShell from '@/components/layout/PageShell';
import Panel from '@/components/ui/Panel';
import HeatGrid from '@/components/national/HeatGrid';
import ReadinessIndicator from '@/components/national/ReadinessIndicator';
import { getSchools, getEmirateData } from '@/lib/data';
import { getTier } from '@/lib/scoring';
import { CATEGORIES, CATEGORY_META } from '@/lib/constants';

export default function NationalPage() {
  const schools = getSchools();
  const emirates = getEmirateData(schools);
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const nationalCRI = Math.round(schools.reduce((sum, s) => sum + s.cri, 0) / schools.length);

  // Tier distribution
  const tiers = ['Foundational', 'Operational', 'Resilience Ready'] as const;
  const tierDistribution = tiers.map((t) => {
    const count = schools.filter((s) => getTier(s.cri) === t).length;
    return { tier: t, count, percentage: Math.round((count / schools.length) * 100) };
  });

  // Category national averages
  const categoryAverages = CATEGORIES.map((cat) => {
    const avg = Math.round(schools.reduce((sum, s) => sum + s[cat], 0) / schools.length);
    return { category: cat, average: avg, ...CATEGORY_META[cat] };
  });

  return (
    <PageShell title="National Dashboard" subtitle="UAE-wide cyber resilience metrics — aggregated from institutional data">
      {/* National readiness */}
      <div className="mb-8">
        <ReadinessIndicator
          nationalCRI={nationalCRI}
          totalStudents={totalStudents}
          totalSchools={schools.length}
          tierDistribution={tierDistribution}
        />
      </div>

      {/* Emirate heat grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Emirate Heat Map</h2>
        <HeatGrid emirates={emirates} />
      </div>

      {/* National category averages */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">National Category Averages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryAverages.map((c) => {
            const tier = getTier(c.average);
            const color = c.average >= 75 ? '#22c55e' : c.average >= 50 ? '#f59e0b' : '#ef4444';
            return (
              <Panel key={c.category} className="p-5 text-center" glow>
                <span className="text-2xl">{c.icon}</span>
                <div className="text-2xl font-bold font-mono mt-2" style={{ color }}>{c.average}</div>
                <div className="text-xs text-muted mt-1">{c.label}</div>
                <div className="text-xs mt-1" style={{ color }}>{tier}</div>
              </Panel>
            );
          })}
        </div>
      </div>

      {/* Key insights */}
      <Panel className="p-6">
        <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <div className="w-1 rounded-full bg-success shrink-0" />
            <div>
              <div className="font-medium">Strongest Category</div>
              <div className="text-muted text-xs mt-0.5">
                {categoryAverages.sort((a, b) => b.average - a.average)[0].label} leads with a national average of {categoryAverages.sort((a, b) => b.average - a.average)[0].average}/100
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full bg-danger shrink-0" />
            <div>
              <div className="font-medium">Focus Area</div>
              <div className="text-muted text-xs mt-0.5">
                {categoryAverages.sort((a, b) => a.average - b.average)[0].label} needs attention with a national average of {categoryAverages.sort((a, b) => a.average - b.average)[0].average}/100
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full bg-accent shrink-0" />
            <div>
              <div className="font-medium">Top Emirate</div>
              <div className="text-muted text-xs mt-0.5">
                {emirates.sort((a, b) => b.averageCRI - a.averageCRI)[0].emirate} leads with an average CRI of {emirates.sort((a, b) => b.averageCRI - a.averageCRI)[0].averageCRI}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full bg-warning shrink-0" />
            <div>
              <div className="font-medium">Coverage</div>
              <div className="text-muted text-xs mt-0.5">
                {emirates.length} of 7 emirates with {schools.length} schools and {totalStudents.toLocaleString()} students assessed
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </PageShell>
  );
}
