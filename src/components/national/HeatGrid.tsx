import Panel from '@/components/ui/Panel';
import { getTier, getTierColor } from '@/lib/scoring';
import type { EmirateData } from '@/lib/types';

interface HeatGridProps {
  emirates: EmirateData[];
}

export default function HeatGrid({ emirates }: HeatGridProps) {
  const sorted = [...emirates].sort((a, b) => b.averageCRI - a.averageCRI);
  const maxStudents = Math.max(...emirates.map((e) => e.students));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {sorted.map((e) => {
        const tier = getTier(e.averageCRI);
        const color = getTierColor(tier);
        const intensity = 0.15 + (e.averageCRI / 100) * 0.35;
        const sizeRatio = e.students / maxStudents;

        return (
          <Panel
            key={e.emirate}
            className="p-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Background heat */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: color, opacity: intensity * 0.3 }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{e.emirate}</h3>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                />
              </div>
              <div className="text-3xl font-bold font-mono" style={{ color }}>
                {e.averageCRI}
              </div>
              <div className="text-xs text-muted mt-1">{tier}</div>

              {/* Mini bar showing student population */}
              <div className="mt-3">
                <div className="h-1 rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sizeRatio * 100}%`, backgroundColor: color }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted">
                  <span>{e.schools} schools</span>
                  <span>{e.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
