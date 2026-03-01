'use client';

import { useState, useMemo } from 'react';
import Panel from '@/components/ui/Panel';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { computeProjection } from '@/lib/projection';
import { CATEGORY_META } from '@/lib/constants';
import type { Mission, School, Category, ProjectionResult } from '@/lib/types';

interface ProjectionSimulatorProps {
  missions: Mission[];
  schools: School[];
}

export default function ProjectionSimulator({ missions, schools }: ProjectionSimulatorProps) {
  const [selectedMission, setSelectedMission] = useState(missions[0]?.id ?? '');
  const [completionRate, setCompletionRate] = useState(70);

  const mission = missions.find((m) => m.id === selectedMission);

  const categoryAvg = useMemo(() => {
    if (!mission) return 0;
    const cat = mission.category;
    return Math.round(schools.reduce((sum, s) => sum + s[cat], 0) / schools.length);
  }, [mission, schools]);

  const result: ProjectionResult | null = useMemo(() => {
    if (!mission) return null;
    return computeProjection({
      missionId: mission.id,
      missionTitle: mission.title,
      category: mission.category,
      difficulty: mission.difficulty,
      completionRate,
      currentCategoryAvg: categoryAvg,
    });
  }, [mission, completionRate, categoryAvg]);

  if (!mission || !result) return null;

  const color = CATEGORY_META[mission.category].color;

  return (
    <Panel className="p-6" glow>
      <h3 className="text-sm font-semibold mb-4">Mission Impact Projection Simulator</h3>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs text-muted block mb-1.5 font-mono">Mission</label>
          <select
            value={selectedMission}
            onChange={(e) => setSelectedMission(e.target.value)}
            className="w-full bg-surface border border-panel-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent"
          >
            {missions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} ({CATEGORY_META[m.category].icon} — {m.difficulty})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted block mb-1.5 font-mono">
            Completion Rate: {completionRate}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={completionRate}
            onChange={(e) => setCompletionRate(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-[10px] text-muted mt-0.5">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-muted font-mono mb-1">Current</div>
          <div className="text-2xl font-bold font-mono" style={{ color: '#64748b' }}>{result.currentAvg}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted font-mono mb-1">Projected</div>
          <div className="text-2xl font-bold font-mono" style={{ color }}>{result.projectedAvg}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted font-mono mb-1">Improvement</div>
          <div className="text-2xl font-bold font-mono text-success">+{result.improvement}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted font-mono mb-1">Risk Reduction</div>
          <div className="text-2xl font-bold font-mono text-accent">{result.riskReduction}%</div>
        </div>
      </div>

      {/* Visual bar */}
      <div className="relative h-3 rounded-full bg-surface overflow-hidden mb-4">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 opacity-40"
          style={{ width: `${result.currentAvg}%`, backgroundColor: color }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{ width: `${result.projectedAvg}%`, backgroundColor: color }}
        />
      </div>

      {/* Briefing */}
      <div className="flex items-start gap-2">
        <CategoryIcon category={mission.category} size="sm" />
        <p className="text-xs text-muted leading-relaxed">{result.briefing}</p>
      </div>
    </Panel>
  );
}
