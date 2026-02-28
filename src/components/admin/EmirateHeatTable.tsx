import Panel from '@/components/ui/Panel';
import CategoryIcon from '@/components/ui/CategoryIcon';
import type { EmirateDetailData, Category } from '@/lib/types';
import { CATEGORY_META } from '@/lib/constants';

interface EmirateHeatTableProps {
  emirates: EmirateDetailData[];
}

const CATEGORIES: Category[] = ['password', 'phishing', 'privacy', 'device'];

function heatColor(value: number): string {
  if (value >= 75) return '#22c55e';
  if (value >= 60) return '#f59e0b';
  if (value >= 45) return '#f97316';
  return '#ef4444';
}

function cellBg(value: number): string {
  const color = heatColor(value);
  return `${color}18`;
}

export default function EmirateHeatTable({ emirates }: EmirateHeatTableProps) {
  const sorted = [...emirates].sort((a, b) => b.averageCRI - a.averageCRI);

  return (
    <Panel className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-panel-border">
              <th className="text-left text-xs font-mono text-muted px-4 py-3">Emirate</th>
              <th className="text-center text-xs font-mono text-muted px-3 py-3">CRI</th>
              {CATEGORIES.map((cat) => (
                <th key={cat} className="text-center px-3 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <CategoryIcon category={cat} size="sm" />
                    <span className="text-xs font-mono text-muted">{CATEGORY_META[cat].icon}</span>
                  </div>
                </th>
              ))}
              <th className="text-center text-xs font-mono text-muted px-3 py-3">Weakest</th>
              <th className="text-center text-xs font-mono text-muted px-3 py-3">Schools</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e) => (
              <tr key={e.emirate} className="border-b border-panel-border/50 hover:bg-panel-bg/50 transition-colors">
                <td className="px-4 py-3 font-medium">{e.emirate}</td>
                <td className="text-center px-3 py-3">
                  <span className="font-mono font-bold" style={{ color: heatColor(e.averageCRI) }}>
                    {e.averageCRI}
                  </span>
                </td>
                {CATEGORIES.map((cat) => (
                  <td key={cat} className="text-center px-3 py-3">
                    <span
                      className="inline-block px-2 py-0.5 rounded font-mono text-xs"
                      style={{ backgroundColor: cellBg(e[cat]), color: heatColor(e[cat]) }}
                    >
                      {e[cat]}
                    </span>
                  </td>
                ))}
                <td className="text-center px-3 py-3">
                  <span className="text-xs text-danger font-mono">{CATEGORY_META[e.weakest].icon}</span>
                </td>
                <td className="text-center px-3 py-3 text-muted font-mono">{e.schools}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
