import type { Question, School, Mission, EmirateData, ThreatContext, SchoolTrend, EmirateDetailData, Category } from './types';
import { CATEGORIES } from './constants';
import questionsData from '@/data/questions.json';
import missionsData from '@/data/missions.json';
import demoData from '@/data/demo.json';
import threatContextData from '@/data/threat-context.json';
import trendsData from '@/data/trends.json';

export function getQuestions(): Question[] {
  return questionsData as Question[];
}

export function getMissions(): Mission[] {
  return missionsData as Mission[];
}

export function getSchools(): School[] {
  return demoData as School[];
}

export function getEmirateData(schools: School[]): EmirateData[] {
  const map = new Map<string, { total: number; count: number; students: number }>();
  for (const s of schools) {
    const existing = map.get(s.emirate) || { total: 0, count: 0, students: 0 };
    existing.total += s.cri;
    existing.count += 1;
    existing.students += s.students;
    map.set(s.emirate, existing);
  }
  return Array.from(map.entries()).map(([emirate, d]) => ({
    emirate,
    averageCRI: Math.round(d.total / d.count),
    schools: d.count,
    students: d.students,
  }));
}

export function getThreatContext(): ThreatContext {
  return threatContextData as ThreatContext;
}

export function getTrendData(): { period: string[]; schools: SchoolTrend[] } {
  return trendsData as { period: string[]; schools: SchoolTrend[] };
}

export function getEmirateDetailData(schools: School[]): EmirateDetailData[] {
  const map = new Map<string, { schools: School[] }>();
  for (const s of schools) {
    const existing = map.get(s.emirate) || { schools: [] };
    existing.schools.push(s);
    map.set(s.emirate, existing);
  }

  return Array.from(map.entries()).map(([emirate, d]) => {
    const n = d.schools.length;
    const avg = (cat: Category) =>
      Math.round(d.schools.reduce((acc, s) => acc + s[cat], 0) / n);

    const catScores: Record<Category, number> = {
      password: avg('password'),
      phishing: avg('phishing'),
      privacy: avg('privacy'),
      device: avg('device'),
    };

    const sorted = CATEGORIES.slice().sort((a, b) => catScores[a] - catScores[b]);

    return {
      emirate,
      averageCRI: Math.round(d.schools.reduce((acc, s) => acc + s.cri, 0) / n),
      schools: n,
      students: d.schools.reduce((acc, s) => acc + s.students, 0),
      password: catScores.password,
      phishing: catScores.phishing,
      privacy: catScores.privacy,
      device: catScores.device,
      weakest: sorted[0],
      strongest: sorted[sorted.length - 1],
    };
  });
}
