import Link from 'next/link';
import Panel from '@/components/ui/Panel';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { CATEGORY_META } from '@/lib/constants';
import type { Mission } from '@/lib/types';

interface MissionCardProps {
  mission: Mission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const meta = CATEGORY_META[mission.category];

  return (
    <Link href={`/missions/${mission.id}`}>
      <Panel className="p-5 h-full hover:border-accent/40 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center gap-2 mb-3">
          <CategoryIcon category={mission.category} size="sm" />
          <span
            className="text-xs px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${meta.color}40`, color: meta.color, backgroundColor: `${meta.color}10` }}
          >
            {meta.label}
          </span>
        </div>
        <h3 className="font-semibold group-hover:text-accent transition-colors">{mission.title}</h3>
        <p className="text-xs text-muted mt-1 leading-relaxed">{mission.description}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted">
          <span>{mission.difficulty}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span>{mission.duration}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span>{mission.lessons.length} lessons</span>
        </div>
      </Panel>
    </Link>
  );
}
