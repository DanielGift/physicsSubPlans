import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';

interface LessonHeaderProps {
  activityTitle: string;
  roundLabel: string;
  roundIndex: number;
  roundCount: number;
  questionIndex: number;
  questionCount: number;
  shortageNote?: string;
  seed: string;
  rightSlot?: ReactNode;
}

export function LessonHeader({
  activityTitle,
  roundLabel,
  roundIndex,
  roundCount,
  questionIndex,
  questionCount,
  shortageNote,
  seed,
  rightSlot,
}: LessonHeaderProps) {
  return (
    <header className="stack">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: 0 }}>{activityTitle}</h1>
          <span className="text-muted">
            Round {roundIndex + 1} of {roundCount}: {roundLabel}
          </span>
        </div>
        <div className="row" data-print="hide">
          {rightSlot}
          <span className="badge" title="Session seed — type it into Teacher Mode on another section to sync">
            seed: {seed}
          </span>
        </div>
      </div>
      {shortageNote && (
        <p className="text-muted" style={{ margin: 0 }}>
          {shortageNote}
        </p>
      )}
      <ProgressBar current={questionIndex + 1} total={questionCount} label={`Question ${questionIndex + 1} of ${questionCount}`} />
    </header>
  );
}
