import Panel from '@/components/ui/Panel';
import { getTier, getTierColor } from '@/lib/scoring';

interface ReadinessIndicatorProps {
  nationalCRI: number;
  totalStudents: number;
  totalSchools: number;
  tierDistribution: { tier: string; count: number; percentage: number }[];
}

export default function ReadinessIndicator({ nationalCRI, totalStudents, totalSchools, tierDistribution }: ReadinessIndicatorProps) {
  const tier = getTier(nationalCRI);
  const color = getTierColor(tier);

  return (
    <Panel className="p-6" glow>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* National score */}
        <div className="text-center">
          <div className="text-xs font-mono text-accent mb-2">NATIONAL CRI</div>
          <svg width="140" height="140" className="-rotate-90">
            <circle cx="70" cy="70" r="58" fill="none" stroke="var(--surface)" strokeWidth="8" />
            <circle
              cx="70" cy="70" r="58" fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 * (1 - nationalCRI / 100)}
              style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
            />
          </svg>
          <div className="relative -mt-[95px] mb-[30px]">
            <span className="text-3xl font-bold font-mono" style={{ color }}>{nationalCRI}</span>
            <div className="text-xs text-muted mt-0.5">{tier}</div>
          </div>
        </div>

        {/* Stats + Tier distribution */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted">Total Schools</div>
              <div className="text-xl font-bold font-mono">{totalSchools}</div>
            </div>
            <div>
              <div className="text-xs text-muted">Total Students</div>
              <div className="text-xl font-bold font-mono">{totalStudents.toLocaleString()}</div>
            </div>
          </div>

          <div className="text-xs text-muted mb-2">Tier Distribution</div>
          <div className="space-y-2">
            {tierDistribution.map((t) => {
              const tColor = t.tier === 'Resilience Ready' ? '#22c55e' : t.tier === 'Operational' ? '#f59e0b' : '#ef4444';
              return (
                <div key={t.tier} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tColor }} />
                  <span className="text-xs w-28 truncate">{t.tier}</span>
                  <div className="flex-1 h-2 rounded-full bg-surface overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${t.percentage}%`, backgroundColor: tColor }}
                    />
                  </div>
                  <span className="text-xs text-muted font-mono w-16 text-right">
                    {t.count} ({t.percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}
