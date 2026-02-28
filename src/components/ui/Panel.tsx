interface PanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Panel({ children, className = '', glow = false }: PanelProps) {
  return (
    <div
      className={`rounded-lg border border-panel-border bg-panel-bg backdrop-blur-sm ${
        glow ? 'glow-border' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
