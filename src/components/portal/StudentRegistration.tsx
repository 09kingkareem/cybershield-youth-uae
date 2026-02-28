'use client';

import { useState } from 'react';
import { usePortal } from '@/lib/portal-context';
import Panel from '@/components/ui/Panel';
import type { StudentProfile } from '@/lib/types';

interface StudentRegistrationProps {
  onComplete: () => void;
}

const SCHOOL_OPTIONS = [
  'GEMS Wellington Academy',
  'Dubai International Academy',
  'GEMS Modern Academy',
  'Abu Dhabi Grammar School',
  'Al Bateen Academy',
  'Cranleigh Abu Dhabi',
  'Sharjah American International School',
  'Victoria International School',
  'Ajman Academy',
  'RAK Academy',
  'Fujairah International Academy',
  'UAQ National School',
  'Other',
];

const GRADE_OPTIONS = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'University Year 1', 'University Year 2'];

export default function StudentRegistration({ onComplete }: StudentRegistrationProps) {
  const { registerStudent } = usePortal();
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [studentId, setStudentId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!schoolName) e.schoolName = 'School is required';
    if (!grade) e.grade = 'Grade is required';
    if (!studentId.trim()) e.studentId = 'Student ID is required';
    else if (studentId.trim().length < 3) e.studentId = 'Student ID must be at least 3 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const profile: StudentProfile = {
      schoolName,
      grade,
      studentId: studentId.trim(),
      registeredAt: new Date().toISOString(),
    };
    registerStudent(profile);
    onComplete();
  }

  const inputClasses = 'w-full px-4 py-2.5 rounded-lg bg-surface border border-panel-border text-foreground text-sm focus:outline-none focus:border-accent';

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Panel className="p-8" glow>
        <div className="text-xs font-mono text-accent mb-3 text-center">PILOT MODE</div>
        <h2 className="text-xl font-bold mb-2 text-center">Student Registration</h2>
        <p className="text-muted text-sm mb-6 text-center">
          Enter your details before starting the assessment.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1.5 font-mono">SCHOOL</label>
            <select value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className={inputClasses}>
              <option value="">Select school...</option>
              {SCHOOL_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.schoolName && <p className="text-danger text-xs mt-1">{errors.schoolName}</p>}
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5 font-mono">GRADE</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className={inputClasses}>
              <option value="">Select grade...</option>
              {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.grade && <p className="text-danger text-xs mt-1">{errors.grade}</p>}
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5 font-mono">STUDENT ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. STU-2026-001"
              className={inputClasses}
            />
            {errors.studentId && <p className="text-danger text-xs mt-1">{errors.studentId}</p>}
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer bg-accent text-white hover:bg-blue-600 shadow-lg shadow-accent/20 px-7 py-3 text-base"
            >
              Continue to Assessment
            </button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
