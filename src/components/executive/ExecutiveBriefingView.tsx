import Panel from '@/components/ui/Panel';
import StatusBadge from '@/components/ui/StatusBadge';
import LargeMetric from '@/components/ui/LargeMetric';
import type { ExecutiveBriefing } from '@/lib/types';
import { getStatusColor } from '@/lib/national-status';

interface ExecutiveBriefingViewProps {
  briefing: ExecutiveBriefing;
}

export default function ExecutiveBriefingView({ briefing }: ExecutiveBriefingViewProps) {
  const color = getStatusColor(briefing.nationalStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Panel className="p-6 relative overflow-hidden scan-line" glow>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Executive Briefing</div>
            <h2 className="text-xl font-bold">UAE Youth Cyber Resilience — Strategic Assessment</h2>
          </div>
          <StatusBadge status={briefing.nationalStatus} pulse size="lg" />
        </div>
        <div className="flex items-center gap-8">
          <LargeMetric
            value={briefing.nationalCRI}
            label="National CRI"
            color={color}
            suffix="/100"
          />
        </div>
      </Panel>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <Panel className="p-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {briefing.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-success font-mono text-xs mt-0.5 shrink-0">S{i + 1}</span>
                <span className="text-muted leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger" />
            Weaknesses
          </h3>
          <ul className="space-y-3">
            {briefing.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-danger font-mono text-xs mt-0.5 shrink-0">W{i + 1}</span>
                <span className="text-muted leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Recommended Actions */}
      <Panel className="p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Recommended Actions
        </h3>
        <ul className="space-y-3">
          {briefing.actions.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="text-accent font-mono text-xs mt-0.5 shrink-0">A{i + 1}</span>
              <span className="text-muted leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Strategic Outlook */}
      <Panel className="p-6" glow>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warning" />
          Strategic Outlook
        </h3>
        <p className="text-sm text-muted leading-relaxed">{briefing.outlook}</p>
      </Panel>
    </div>
  );
}
