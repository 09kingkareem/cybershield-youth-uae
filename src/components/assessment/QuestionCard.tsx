import Panel from '@/components/ui/Panel';
import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
}

export default function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <Panel className="p-6" glow>
      <h2 className="text-lg font-medium leading-relaxed mb-5">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const selected = selectedValue === opt.value;
          return (
            <button
              key={i}
              onClick={() => onSelect(opt.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 cursor-pointer text-sm ${
                selected
                  ? 'border-accent bg-accent/10 text-foreground'
                  : 'border-panel-border bg-surface/50 text-muted hover:border-accent/30 hover:text-foreground'
              }`}
            >
              <span className="font-mono text-xs text-accent mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt.label}
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
