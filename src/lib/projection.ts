import type { ProjectionInput, ProjectionResult } from './types';
import { MISSION_IMPACT_FACTORS, MAX_PROJECTION_IMPROVEMENT } from './constants';

export function computeProjection(input: ProjectionInput): ProjectionResult {
  const {
    missionId,
    missionTitle,
    category,
    completionRate,
    currentCategoryAvg,
  } = input;

  const impactWeight = MISSION_IMPACT_FACTORS[missionId] ?? 0.6;
  const headroom = 100 - currentCategoryAvg;
  const rawImprovement =
    (completionRate / 100) * impactWeight * MAX_PROJECTION_IMPROVEMENT;
  const cappedImprovement = Math.min(rawImprovement, headroom);
  const projectedAvg = Math.round(currentCategoryAvg + cappedImprovement);
  const improvement = Math.round(cappedImprovement);
  const riskReduction =
    currentCategoryAvg > 0
      ? Math.round((cappedImprovement / (100 - currentCategoryAvg)) * 100)
      : 0;

  const briefing = buildProjectionBriefing(
    missionTitle,
    category,
    currentCategoryAvg,
    projectedAvg,
    improvement,
    riskReduction,
    completionRate
  );

  return {
    currentAvg: currentCategoryAvg,
    projectedAvg,
    improvement,
    riskReduction,
    headroom,
    impactWeight,
    briefing,
  };
}

function buildProjectionBriefing(
  missionTitle: string,
  category: string,
  current: number,
  projected: number,
  improvement: number,
  riskReduction: number,
  completionRate: number
): string {
  if (completionRate === 0) {
    return `No projection available — mission "${missionTitle}" has 0% completion rate.`;
  }

  const impact =
    improvement >= 8
      ? 'high-impact'
      : improvement >= 4
        ? 'moderate-impact'
        : 'incremental';

  return `Deploying "${missionTitle}" at ${completionRate}% completion would yield a ${impact} improvement: ${category} index ${current} → ${projected} (+${improvement} pts). Estimated risk reduction: ${riskReduction}%. This projection assumes uniform completion across enrolled students.`;
}
