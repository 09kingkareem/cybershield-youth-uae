import Panel from '@/components/ui/Panel';
import TrendArrow from '@/components/ui/TrendArrow';
import type { ThreatContextItem } from '@/lib/types';

interface ThreatContextPanelProps {
  items: ThreatContextItem[];
  lastUpdated: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  info: '#3b82f6',
  elevated: '#f97316',
  critical: '#ef4444',
};

export default function ThreatContextPanel({ items, lastUpdated }: ThreatContextPanelProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">External Threat Context</h2>
        <span className="text-xs text-muted font-mono">
          Updated: {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const color = SEVERITY_COLORS[item.severity] ?? '#3b82f6';
          return (
            <Panel key={item.id} className="p-4" glow>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-mono uppercase text-muted">{item.label}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full border font-mono"
                  style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                >
                  {item.severity}
                </span>
              </div>
              <div className="text-2xl font-bold font-mono" style={{ color }}>
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                {item.unit && <span className="text-xs text-muted ml-1.5 font-normal">{item.unit}</span>}
              </div>
              <div className="flex items-center justify-between mt-2">
                <TrendArrow direction={item.trend} label={item.delta} />
              </div>
              <p className="text-xs text-muted mt-2 leading-relaxed">{item.briefing}</p>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
