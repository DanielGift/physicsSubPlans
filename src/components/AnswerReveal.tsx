import { useEffect, useState } from 'react';

interface AnswerRevealProps {
  questionId: string;
}

type AnswerRecord = Record<string, unknown>;

const FIELD_LABELS: Record<string, string> = {
  possibleApproaches: 'Possible approaches',
  majorPitfalls: 'Major pitfalls',
  teacherNotes: 'Notes',
};

/**
 * On-demand reveal, available to everyone — there is no more hidden teacher-only view.
 * Lazily imports the answer key only once clicked, so it still ships as its own bundle
 * chunk (BUILD-SPEC.md §3), and resets whenever the question changes.
 */
export function AnswerReveal({ questionId }: AnswerRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [record, setRecord] = useState<AnswerRecord | null | undefined>(undefined);

  useEffect(() => {
    setRevealed(false);
    setRecord(undefined);
  }, [questionId]);

  if (!revealed) {
    return (
      <button
        className="button"
        data-print="hide"
        onClick={() => {
          setRevealed(true);
          import('../activities/experimentalDesign/answers').then(({ experimentalDesignAnswers }) =>
            setRecord((experimentalDesignAnswers[questionId] as unknown as AnswerRecord) ?? null),
          );
        }}
      >
        Show answer
      </button>
    );
  }

  if (record === undefined) {
    return <div className="card">Loading…</div>;
  }
  if (record === null) {
    return <div className="card">No answer record found for {questionId}.</div>;
  }

  return (
    <div className="card stack">
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
