import type { Question, School, Mission, EmirateData } from './types';
import questionsData from '@/data/questions.json';
import missionsData from '@/data/missions.json';
import demoData from '@/data/demo.json';

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
