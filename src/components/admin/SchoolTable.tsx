import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import { getTier, getTierColor } from '@/lib/scoring';
import type { School } from '@/lib/types';

interface SchoolTableProps {
  schools: School[];
}

export default function SchoolTable({ schools }: SchoolTableProps) {
  const sorted = [...schools].sort((a, b) => b.cri - a.cri);

  return (
    <Panel className="overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-panel-border text-xs text-muted">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">School</th>
              <th className="text-left px-4 py-3 font-medium">Emirate</th>
              <th className="text-right px-4 py-3 font-medium">Students</th>
              <th className="text-right px-4 py-3 font-medium">CRI</th>
              <th className="px-4 py-3 font-medium w-32">Tier</th>
              <th className="px-4 py-3 font-medium w-24">PWD</th>
              <th className="px-4 py-3 font-medium w-24">PHI</th>
              <th className="px-4 py-3 font-medium w-24">PRI</th>
              <th className="px-4 py-3 font-medium w-24">DEV</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => {
              const tier = getTier(s.cri);
              const color = getTierColor(tier);
              return (
                <tr key={s.name} className="border-b border-panel-border/50 hover:bg-panel-bg/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted">{s.emirate}</td>
                  <td className="px-4 py-3 text-right text-muted">{s.students}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold" style={{ color }}>{s.cri}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {tier}
                    </span>
                  </td>
                  <td className="px-4 py-3"><ProgressBar value={s.password} color={getTierColor(getTier(s.password))} /></td>
                  <td className="px-4 py-3"><ProgressBar value={s.phishing} color={getTierColor(getTier(s.phishing))} /></td>
                  <td className="px-4 py-3"><ProgressBar value={s.privacy} color={getTierColor(getTier(s.privacy))} /></td>
                  <td className="px-4 py-3"><ProgressBar value={s.device} color={getTierColor(getTier(s.device))} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-panel-border/50">
        {sorted.map((s, i) => {
          const tier = getTier(s.cri);
          const color = getTierColor(tier);
          return (
            <div key={s.name} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted">#{i + 1}</span>
                    <span className="font-medium text-sm truncate">{s.name}</span>
                  </div>
                  <div className="text-xs text-muted mt-0.5">{s.emirate} &middot; {s.students} students</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold font-mono" style={{ color }}>{s.cri}</div>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {tier}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['password', 'phishing', 'privacy', 'device'] as const).map((cat) => {
                  const val = s[cat];
                  const catColor = getTierColor(getTier(val));
                  return (
                    <div key={cat} className="text-center">
                      <div className="text-[10px] text-muted uppercase">{cat.slice(0, 3)}</div>
                      <div className="text-xs font-mono font-bold" style={{ color: catColor }}>{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
