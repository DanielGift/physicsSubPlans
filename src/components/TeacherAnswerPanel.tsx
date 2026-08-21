import { useEffect, useState } from 'react';
import type { ActivityId } from '../types';

interface TeacherAnswerPanelProps {
  activityId: ActivityId;
  questionId: string;
}

type AnswerRecord = Record<string, unknown>;

async function loadAnswerRecord(activityId: ActivityId, questionId: string): Promise<AnswerRecord | undefined> {
  if (activityId === 'physics-court') {
    const { physicsCourtAnswers } = await import('../activities/physicsCourt/answers');
    return physicsCourtAnswers[questionId] as unknown as AnswerRecord;
  }
  if (activityId === 'alien-physics') {
    const { alienPhysicsAnswers } = await import('../activities/alienPhysics/answers');
    return alienPhysicsAnswers[questionId] as unknown as AnswerRecord;
  }
  const { experimentalDesignAnswers } = await import('../activities/experimentalDesign/answers');
  return experimentalDesignAnswers[questionId] as unknown as AnswerRecord;
}

const FIELD_LABELS: Record<string, string> = {
  verdict: 'Verdict',
  assumptions: 'Assumptions',
  explanation: 'Explanation',
  counterexample: 'Counterexample',
  proofSketch: 'Proof sketch',
  misconception: 'Misconception',
  validRewrite: 'A valid rewrite',
  teacherNotes: 'Teacher notes',
  answer: 'Answer',
  workedSolution: 'Worked solution',
  firstBadStepIndex: 'First bad step (0-indexed)',
  possibleApproaches: 'Possible approaches',
  majorPitfalls: 'Major pitfalls',
};

/** Lazy-imports the activity's answers.ts only when rendered, so it lands in its own chunk (BUILD-SPEC.md §3). */
export function TeacherAnswerPanel({ activityId, questionId }: TeacherAnswerPanelProps) {
  const [record, setRecord] = useState<AnswerRecord | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setRecord(undefined);
    loadAnswerRecord(activityId, questionId).then((r) => {
      if (!cancelled) setRecord(r ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [activityId, questionId]);

  if (record === undefined) {
    return (
      <div className="teacher-panel" data-print="teacher-only">
        Loading answer…
      </div>
    );
  }
  if (record === null) {
    return (
      <div className="teacher-panel" data-print="teacher-only">
        No answer record found for {questionId}.
      </div>
    );
  }

  return (
    <div className="teacher-panel stack" data-print="teacher-only">
      <strong>Teacher Mode — {questionId}</strong>
      {Object.entries(record).map(([key, value]) => (
        <div key={key}>
          <div style={{ fontWeight: 600 }}>{FIELD_LABELS[key] ?? key}</div>
          {Array.isArray(value) ? (
            <ul style={{ margin: 0 }}>
              {value.map((item, i) => (
                <li key={i}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0 }}>{String(value)}</p>
          )}
        </div>
      ))}
    </div>
  );
}
