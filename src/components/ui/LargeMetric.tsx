interface LargeMetricProps {
  value: number | string;
  label: string;
  sublabel?: string;
  color?: string;
  suffix?: string;
  className?: string;
}

export default function LargeMetric({ value, label, sublabel, color = '#3b82f6', suffix, className = '' }: LargeMetricProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono tracking-tight" style={{ color }}>
        {value}{suffix && <span className="text-lg text-muted ml-1">{suffix}</span>}
      </div>
      <div className="text-sm font-medium mt-1">{label}</div>
      {sublabel && <div className="text-xs text-muted mt-0.5">{sublabel}</div>}
    </div>
  );
}
