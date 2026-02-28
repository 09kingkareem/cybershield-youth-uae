'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import QuestionCard from '@/components/assessment/QuestionCard';
import AssessmentProgress from '@/components/assessment/AssessmentProgress';
import CategoryIndicator from '@/components/assessment/CategoryIndicator';
import { getQuestions } from '@/lib/data';
import { buildResult } from '@/lib/scoring';
import { CATEGORIES, SESSION_KEY } from '@/lib/constants';
import type { Category } from '@/lib/types';

type Phase = 'intro' | 'questions' | 'complete';

export default function AssessmentPage() {
  const router = useRouter();
  const questions = getQuestions();
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[current];
  const currentCategory = question?.category;

  const completedCategories = CATEGORIES.filter((cat) =>
    questions
      .filter((q) => q.category === cat)
      .every((q) => answers[q.id] !== undefined)
  );

  function handleSelect(value: number) {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setPhase('complete');
      }
    }, 300);
  }

  function handleViewResults() {
    const result = buildResult(answers, questions);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
    router.push('/results');
  }

  // Reset scroll on question change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [current]);

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Panel className="p-8 text-center" glow>
          <div className="text-xs font-mono text-accent mb-3">CYBER RESILIENCE INDEX</div>
          <h1 className="text-2xl font-bold mb-3">Assessment Console</h1>
          <p className="text-muted text-sm leading-relaxed max-w-md mx-auto mb-6">
            Answer 12 behavioral questions across 4 cyber hygiene categories.
            Your responses generate a personalized Cyber Resilience Index (CRI) score.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto text-left">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {cat === 'password' && 'Password Hygiene'}
                {cat === 'phishing' && 'Phishing Awareness'}
                {cat === 'privacy' && 'Data Privacy'}
                {cat === 'device' && 'Device Security'}
              </div>
            ))}
          </div>
          <Button onClick={() => setPhase('questions')} size="lg">
            Begin Assessment
          </Button>
          <p className="mt-4 text-xs text-muted">Takes approximately 5 minutes</p>
        </Panel>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Panel className="p-8 text-center" glow>
          <div className="text-xs font-mono text-success mb-3">ASSESSMENT COMPLETE</div>
          <h1 className="text-2xl font-bold mb-3">All Clear</h1>
          <p className="text-muted text-sm mb-6">
            Your responses have been recorded. View your Cyber Resilience Index and personalized recommendations.
          </p>
          <Button onClick={handleViewResults} size="lg">
            View Results
          </Button>
        </Panel>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <CategoryIndicator
        currentCategory={currentCategory}
        completedCategories={completedCategories}
      />
      <AssessmentProgress
        current={current}
        total={questions.length}
        currentCategory={currentCategory}
      />
      <QuestionCard
        question={question}
        selectedValue={answers[question.id]}
        onSelect={handleSelect}
      />
      <div className="mt-4 flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          Previous
        </Button>
        <span className="text-xs text-muted self-center font-mono">
          {Object.keys(answers).length}/{questions.length} answered
        </span>
      </div>
    </div>
  );
}
