import { useEffect, useState } from 'react';
import { MathContent } from '../../components/MathContent';
import { TagBadge } from '../../components/TagBadge';
import type { PhysicsCourtAnswer } from './physicsCourtTypes';
import { VERDICT_DISPLAY_LABEL } from './physicsCourtTypes';

interface PhysicsCourtConclusionProps {
  questionId: string;
}

/**
 * The reveal step of each cycle. Lazily imports the answer key only once the class has
 * reached the conclusion, so it still ships as its own bundle chunk (BUILD-SPEC.md §3) —
 * there is no more separate hidden "teacher" view, this is just the next screen everyone sees.
 */
export function PhysicsCourtConclusion({ questionId }: PhysicsCourtConclusionProps) {
  const [answer, setAnswer] = useState<PhysicsCourtAnswer | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setAnswer(undefined);
    import('./answers').then(({ physicsCourtAnswers }) => {
      if (!cancelled) setAnswer(physicsCourtAnswers[questionId] ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [questionId]);

  if (!answer) return null;

  return (
    <div className="card stack">
      <TagBadge label={VERDICT_DISPLAY_LABEL[answer.verdict]} tone={answer.verdict} />
      <p style={{ margin: 0 }}>{answer.explanation}</p>
      {answer.proofSketch && (
        <p style={{ margin: 0 }}>
          <strong>Why:</strong> {answer.proofSketch}
        </p>
      )}
      {answer.counterexample && (
        <p style={{ margin: 0 }}>
          <strong>Counterexample:</strong> {answer.counterexample}
        </p>
      )}
      <p style={{ margin: 0 }}>
        <strong>Common mix-up:</strong> {answer.misconception}
      </p>
      {answer.validRewrite && (
        <p style={{ margin: 0 }}>
          <strong>A version of this that is true:</strong> <MathContent text={answer.validRewrite} />
        </p>
      )}
    </div>
  );
}
