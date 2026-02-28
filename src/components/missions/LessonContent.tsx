import Panel from '@/components/ui/Panel';
import type { Lesson } from '@/lib/types';

interface LessonContentProps {
  lesson: Lesson;
  index: number;
}

export default function LessonContent({ lesson, index }: LessonContentProps) {
  // Simple markdown-like rendering: bold, lists, headings
  function renderContent(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;

      // Render bold
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (trimmed.startsWith('- ')) {
        return <li key={i} className="ml-4 text-sm text-muted leading-relaxed">{rendered.slice(0, 1)}{rendered.slice(1).map((r, idx) => typeof r === 'string' ? r.replace(/^- /, '') : r)}</li>;
      }

      if (/^\d+\./.test(trimmed)) {
        return <li key={i} className="ml-4 list-decimal text-sm text-muted leading-relaxed">{rendered}</li>;
      }

      return <p key={i} className="text-sm text-muted leading-relaxed">{rendered}</p>;
    });
  }

  return (
    <Panel className="p-6 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
          Lesson {index + 1}
        </span>
        <h3 className="text-sm font-semibold">{lesson.title}</h3>
      </div>
      <div className="space-y-1">
        {renderContent(lesson.content)}
      </div>
    </Panel>
  );
}
