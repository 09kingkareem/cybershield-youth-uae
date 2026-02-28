'use client';

import { useState } from 'react';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import type { KnowledgeCheckItem } from '@/lib/types';

interface KnowledgeCheckProps {
  items: KnowledgeCheckItem[];
}

export default function KnowledgeCheck({ items }: KnowledgeCheckProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = items[currentQ];
  const isCorrect = selected === item?.correct;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected === null) return;
    setShowResult(true);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (currentQ < items.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <Panel className="p-6 text-center" glow>
        <div className="text-xs font-mono text-accent mb-2">KNOWLEDGE CHECK COMPLETE</div>
        <div className="text-3xl font-bold font-mono text-accent">{correctCount}/{items.length}</div>
        <p className="text-sm text-muted mt-2">
          {correctCount === items.length ? 'Perfect score! Mission mastered.' : 'Review the lessons and try again.'}
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="p-6" glow>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-accent">KNOWLEDGE CHECK</span>
        <span className="text-xs text-muted">{currentQ + 1} / {items.length}</span>
      </div>
      <h4 className="text-sm font-medium mb-4">{item.question}</h4>
      <div className="space-y-2 mb-4">
        {item.options.map((opt, i) => {
          let optClass = 'border-panel-border bg-surface/50 text-muted hover:border-accent/30 cursor-pointer';
          if (showResult && i === item.correct) {
            optClass = 'border-success bg-success/10 text-success';
          } else if (showResult && i === selected && !isCorrect) {
            optClass = 'border-danger bg-danger/10 text-danger';
          } else if (selected === i && !showResult) {
            optClass = 'border-accent bg-accent/10 text-foreground';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${optClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {!showResult ? (
        <Button onClick={handleCheck} disabled={selected === null} size="sm">
          Check Answer
        </Button>
      ) : (
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isCorrect ? 'text-success' : 'text-danger'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </span>
          <Button onClick={handleNext} size="sm">
            {currentQ < items.length - 1 ? 'Next Question' : 'Finish'}
          </Button>
        </div>
      )}
    </Panel>
  );
}
