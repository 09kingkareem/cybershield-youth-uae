import PageShell from '@/components/layout/PageShell';
import MissionCard from '@/components/missions/MissionCard';
import { getMissions } from '@/lib/data';
import { CATEGORIES, CATEGORY_META } from '@/lib/constants';

export default function MissionsPage() {
  const missions = getMissions();

  return (
    <PageShell title="Training Missions" subtitle="Targeted cyber hygiene training modules across 4 categories">
      {CATEGORIES.map((cat) => {
        const catMissions = missions.filter((m) => m.category === cat);
        if (catMissions.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <section key={cat} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>{meta.icon}</span>
              {meta.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {catMissions.map((m) => (
                <MissionCard key={m.id} mission={m} />
              ))}
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
