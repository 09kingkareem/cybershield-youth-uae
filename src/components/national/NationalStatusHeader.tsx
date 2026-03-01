import Panel from '@/components/ui/Panel';
import StatusBadge from '@/components/ui/StatusBadge';
import LargeMetric from '@/components/ui/LargeMetric';
import StrategicIndexCard from './StrategicIndexCard';
import type { NationalStatus, StrategicIndex } from '@/lib/types';
import { getStatusColor } from '@/lib/national-status';

interface NationalStatusHeaderProps {
  nationalCRI: number;
  status: NationalStatus;
  totalSchools: number;
  totalStudents: number;
  indices: StrategicIndex[];
}

export default function NationalStatusHeader({
  nationalCRI,
  status,
  totalSchools,
  totalStudents,
  indices,
}: NationalStatusHeaderProps) {
  const color = getStatusColor(status);

  return (
    <div>
      {/* Top banner */}
      <Panel className="p-6 mb-6 relative overflow-hidden scan-line" glow>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <LargeMetric
              value={nationalCRI}
              label="National CRI"
              sublabel="Cyber Resilience Index"
              color={color}
              suffix="/100"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted uppercase">National Status</span>
            <StatusBadge status={status} pulse size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-accent">{totalSchools}</div>
              <div className="text-xs text-muted">Schools</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-accent">{totalStudents.toLocaleString()}</div>
              <div className="text-xs text-muted">Students</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-mono text-accent">7</div>
              <div className="text-xs text-muted">Emirates</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Strategic indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indices.map((index) => (
          <StrategicIndexCard key={index.key} index={index} />
        ))}
      </div>
    </div>
  );
}
