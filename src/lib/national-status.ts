import type { NationalStatus, StrategicIndex, School, Category } from './types';
import { CATEGORIES, CATEGORY_META, NATIONAL_STATUS_THRESHOLDS } from './constants';

export function getNationalStatus(cri: number): NationalStatus {
  if (cri >= 70) return 'Stable';
  if (cri >= 55) return 'Watch';
  if (cri >= 40) return 'Elevated';
  return 'Critical';
}

export function getStatusColor(status: NationalStatus): string {
  switch (status) {
    case 'Stable': return NATIONAL_STATUS_THRESHOLDS.stable.color;
    case 'Watch': return NATIONAL_STATUS_THRESHOLDS.watch.color;
    case 'Elevated': return NATIONAL_STATUS_THRESHOLDS.elevated.color;
    case 'Critical': return NATIONAL_STATUS_THRESHOLDS.critical.color;
  }
}

export function computeNationalCRI(schools: School[]): number {
  if (schools.length === 0) return 0;
  const sum = schools.reduce((acc, s) => acc + s.cri, 0);
  return Math.round(sum / schools.length);
}

export function buildStrategicIndices(schools: School[]): StrategicIndex[] {
  const n = schools.length;
  if (n === 0) return [];

  const categoryAvg = (cat: Category) =>
    Math.round(schools.reduce((acc, s) => acc + s[cat], 0) / n);

  const coverageRate = Math.round((n / 15) * 100); // 15 = target school count
  const avgCRI = computeNationalCRI(schools);

  const indices: StrategicIndex[] = [
    {
      label: 'Credential Security Index',
      key: 'password',
      value: categoryAvg('password'),
      status: getNationalStatus(categoryAvg('password')),
      trend: 'up',
      delta: 4,
      briefing: `National password hygiene stands at ${categoryAvg('password')}%. ${categoryAvg('password') < 60 ? 'Urgent intervention required — credential compromise is the #1 attack vector.' : 'Moderate posture; continued training will reduce credential-based compromise risk.'}`,
    },
    {
      label: 'Phishing Resilience Index',
      key: 'phishing',
      value: categoryAvg('phishing'),
      status: getNationalStatus(categoryAvg('phishing')),
      trend: 'up',
      delta: 3,
      briefing: `Phishing awareness at ${categoryAvg('phishing')}%. Youth-targeted social engineering attacks are rising 18% QoQ. ${categoryAvg('phishing') < 60 ? 'Critical gap — phishing is the primary entry point for ransomware.' : 'Awareness is growing but must keep pace with evolving attack patterns.'}`,
    },
    {
      label: 'Privacy Posture Index',
      key: 'privacy',
      value: categoryAvg('privacy'),
      status: getNationalStatus(categoryAvg('privacy')),
      trend: 'up',
      delta: 3,
      briefing: `Data privacy awareness at ${categoryAvg('privacy')}%. ${categoryAvg('privacy') < 60 ? 'Students are over-sharing personal data online, creating identity theft risk.' : 'Students show moderate privacy awareness; advanced data protection training recommended.'}`,
    },
    {
      label: 'Device Security Index',
      key: 'device',
      value: categoryAvg('device'),
      status: getNationalStatus(categoryAvg('device')),
      trend: 'up',
      delta: 3,
      briefing: `Device security posture at ${categoryAvg('device')}%. ${categoryAvg('device') < 60 ? 'Unpatched devices and weak configurations are creating network-level vulnerabilities.' : 'Reasonable device hygiene; focus on network security and update compliance.'}`,
    },
    {
      label: 'Program Coverage Index',
      key: 'coverage',
      value: coverageRate,
      status: getNationalStatus(coverageRate),
      trend: 'up',
      delta: 8,
      briefing: `${n} of 15 target schools enrolled (${coverageRate}%). Expanding coverage is essential for nationally representative resilience data.`,
    },
  ];

  return indices;
}

export function generateNationalBriefing(schools: School[]): string {
  const cri = computeNationalCRI(schools);
  const status = getNationalStatus(cri);
  const indices = buildStrategicIndices(schools);
  const weakest = indices.slice(0, 4).reduce((a, b) => a.value < b.value ? a : b);
  const strongest = indices.slice(0, 4).reduce((a, b) => a.value > b.value ? a : b);

  return `National Cyber Resilience Index: ${cri}/100 — Status: ${status}. Strongest domain: ${strongest.label} (${strongest.value}%). Priority focus: ${weakest.label} (${weakest.value}%). ${schools.length} schools reporting across 7 emirates.`;
}
