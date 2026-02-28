interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PageShell({ children, title, subtitle, className = '' }: PageShellProps) {
  return (
    <main className={`mx-auto max-w-7xl px-4 py-8 ${className}`}>
      {title && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </main>
  );
}
