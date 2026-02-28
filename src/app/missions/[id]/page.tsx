import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import CategoryIcon from '@/components/ui/CategoryIcon';
import LessonContent from '@/components/missions/LessonContent';
import KnowledgeCheck from '@/components/missions/KnowledgeCheck';
import { getMissions } from '@/lib/data';
import { CATEGORY_META } from '@/lib/constants';

export function generateStaticParams() {
  return getMissions().map((m) => ({ id: m.id }));
}

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const missions = getMissions();
  const mission = missions.find((m) => m.id === id);

  if (!mission) return notFound();

  const meta = CATEGORY_META[mission.category];

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto">
        {/* Mission header */}
        <div className="mb-6">
          <Button href="/missions" variant="ghost" size="sm" className="mb-4">
            &larr; All Missions
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <CategoryIcon category={mission.category} size="md" />
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${meta.color}40`, color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="text-xs text-muted">{mission.difficulty}</span>
            <span className="text-xs text-muted">{mission.duration}</span>
          </div>
          <h1 className="text-2xl font-bold">{mission.title}</h1>
          <p className="text-sm text-muted mt-1">{mission.description}</p>
        </div>

        {/* Lessons */}
        <div className="mb-8">
          {mission.lessons.map((lesson, i) => (
            <LessonContent key={i} lesson={lesson} index={i} />
          ))}
        </div>

        {/* Knowledge Check */}
        {mission.knowledgeCheck.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Knowledge Check</h2>
            <KnowledgeCheck items={mission.knowledgeCheck} />
          </div>
        )}
      </div>
    </PageShell>
  );
}
