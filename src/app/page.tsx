import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';

const STATS = [
  { value: '7', label: 'Emirates', sub: 'Nationwide coverage' },
  { value: '4', label: 'Categories', sub: 'Cyber hygiene domains' },
  { value: '12', label: 'Questions', sub: 'Behavioral assessment' },
  { value: '8', label: 'Missions', sub: 'Training modules' },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-xs font-mono text-accent">
          National Cyber Resilience Initiative
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          <span className="text-accent">CyberShield</span> Youth UAE
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted text-lg leading-relaxed">
          Measuring and strengthening cyber hygiene readiness for UAE youth aged 15-22.
          From individual assessments to national-level resilience dashboards.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button href="/assessment" size="lg">Start Assessment</Button>
          <Button href="/missions" variant="secondary" size="lg">Explore Missions</Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
        {STATS.map((s) => (
          <Panel key={s.label} className="p-5 text-center" glow>
            <div className="text-3xl font-bold font-mono text-accent">{s.value}</div>
            <div className="mt-1 text-sm font-medium">{s.label}</div>
            <div className="mt-0.5 text-xs text-muted">{s.sub}</div>
          </Panel>
        ))}
      </section>

      {/* How It Works */}
      <section className="pb-16">
        <h2 className="text-xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Assess', desc: 'Complete a 12-question behavioral assessment across 4 cyber hygiene categories.' },
            { step: '02', title: 'Train', desc: 'Access targeted training missions to strengthen identified weak areas.' },
            { step: '03', title: 'Monitor', desc: 'Institutions and national bodies track aggregated cyber resilience metrics.' },
          ].map((item) => (
            <Panel key={item.step} className="p-6">
              <span className="text-xs font-mono text-accent">{item.step}</span>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <Panel className="p-8 max-w-2xl mx-auto" glow>
          <h2 className="text-xl font-bold">Ready to measure your cyber resilience?</h2>
          <p className="mt-2 text-sm text-muted">The assessment takes about 5 minutes and covers password hygiene, phishing awareness, data privacy, and device security.</p>
          <div className="mt-6">
            <Button href="/assessment" size="lg">Begin Assessment</Button>
          </div>
        </Panel>
      </section>
    </main>
  );
}
