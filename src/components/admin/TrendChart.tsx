import Panel from '@/components/ui/Panel';

interface TrendChartProps {
  label: string;
  values: number[];
  periods: string[];
  color?: string;
}

export default function TrendChart({ label, values, periods, color = '#3b82f6' }: TrendChartProps) {
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  return (
    <Panel className="p-4">
      <div className="text-xs font-mono text-muted uppercase mb-3">{label}</div>
      <div className="flex items-end gap-1.5 h-16">
        {values.map((v, i) => {
          const height = ((v - min) / range) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono" style={{ color }}>{v}</span>
              <div
                className="w-full rounded-sm transition-all duration-300"
                style={{
                  height: `${Math.max(height, 4)}%`,
                  backgroundColor: color,
                  opacity: 0.3 + (i / (values.length - 1)) * 0.7,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-1.5">
        {periods.map((p, i) => (
          <div key={i} className="flex-1 text-center text-[9px] text-muted truncate">{p}</div>
        ))}
      </div>
    </Panel>
  );
}
