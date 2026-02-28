'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import ScoreMeter from '@/components/ui/ScoreMeter';
import ResilienceBadge from '@/components/ui/ResilienceBadge';
import CategoryBreakdown from '@/components/ui/CategoryBreakdown';
import StrategicStatusCard from '@/components/ui/StrategicStatusCard';
import { SESSION_KEY } from '@/lib/constants';
import { getRecommendations, getTierColor } from '@/lib/scoring';
import type { AssessmentResult } from '@/lib/types';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <PageShell title="Assessment Results">
        <Panel className="p-8 text-center max-w-md mx-auto" glow>
          <p className="text-muted mb-4">No assessment data found. Complete the assessment first.</p>
          <Button href="/assessment">Start Assessment</Button>
        </Panel>
      </PageShell>
    );
  }

  const recommendations = getRecommendations(result.scores);
  const weakest = result.scores.reduce((a, b) => a.normalized < b.normalized ? a : b);
  const strongest = result.scores.reduce((a, b) => a.normalized > b.normalized ? a : b);

  return (
    <PageShell title="Assessment Results" subtitle="Your Cyber Resilience Index breakdown">
      {/* Top section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Score meter */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <ScoreMeter score={result.overall} tier={result.tier} />
          <div className="mt-4">
            <ResilienceBadge tier={result.tier} />
          </div>
        </div>

        {/* Status cards */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <StrategicStatusCard
            title="Overall CRI"
            value={`${result.overall}/100`}
            subtitle="Cyber Resilience Index"
            tier={result.tier}
          />
          <StrategicStatusCard
            title="Tier Status"
            value={result.tier}
            subtitle={result.tier === 'Resilience Ready' ? 'Excellent standing' : 'Room for improvement'}
            tier={result.tier}
          />
          <StrategicStatusCard
            title="Strongest Area"
            value={strongest.label}
            subtitle={`Score: ${strongest.normalized}/100`}
          />
          <StrategicStatusCard
            title="Focus Area"
            value={weakest.label}
            subtitle={`Score: ${weakest.normalized}/100`}
          />
        </div>
      </div>

      {/* Category breakdown + Recommendations */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <CategoryBreakdown scores={result.scores} />

        <Panel className="p-6">
          <h3 className="text-sm font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.category} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: getTierColor(result.scores.find(s => s.category === rec.category)!.normalized >= 75 ? 'Resilience Ready' : result.scores.find(s => s.category === rec.category)!.normalized >= 50 ? 'Operational' : 'Foundational') }}
                />
                <div>
                  <div className="text-sm font-medium">{rec.label}</div>
                  <div className="text-xs text-muted mt-0.5">{rec.message}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <Button href="/missions">Explore Training Missions</Button>
        <Button variant="secondary" onClick={() => { sessionStorage.removeItem(SESSION_KEY); router.push('/assessment'); }}>
          Retake Assessment
        </Button>
      </div>
    </PageShell>
  );
}
