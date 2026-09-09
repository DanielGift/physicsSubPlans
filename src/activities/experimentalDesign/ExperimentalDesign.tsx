import { useState } from 'react';
import { MathContent } from '../../components/MathContent';
import { TagBadge } from '../../components/TagBadge';
import type { PhysicsUnit } from '../../types';
import { ExperimentalDesignSetup } from './ExperimentalDesignSetup';
import { buildWorksheet } from './experimentalDesignGenerator';
import { experimentalDesignQuestions } from './questions';

const questionsById = new Map(experimentalDesignQuestions.map((q) => [q.id, q]));

function PromptCard({ questionId, number }: { questionId: string; number: number }) {
  const question = questionsById.get(questionId);
  if (!question) return null;

  return (
    <div
      className="card stack"
      style={{ minHeight: '45vh', justifyContent: 'center', boxSizing: 'border-box' }}
    >
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>Scenario {number}</strong>
        <TagBadge label={`difficulty ${question.difficulty}`} />
      </div>
      <MathContent text={question.prompt} />
      <div>
        <strong>Restrictions:</strong>
        <ul>
          {question.restrictions.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperimentalDesign() {
  const [questionIds, setQuestionIds] = useState<string[] | null>(null);

  if (!questionIds) {
    return <ExperimentalDesignSetup onStart={(selectedUnits: PhysicsUnit[]) => setQuestionIds(buildWorksheet(selectedUnits))} />;
  }

  return (
    <div className="page stack">
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0 }}>Experimental Design</h1>
          <p className="text-muted" style={{ margin: 0 }}>
            {questionIds.length} scenario{questionIds.length === 1 ? '' : 's'} — scroll down as groups finish.
          </p>
        </div>
        <div data-print="hide">
          <button className="button" onClick={() => setQuestionIds(null)}>
            Back to instructions
          </button>
        </div>
      </header>

      <div className="stack">
        {questionIds.map((id, i) => (
          <PromptCard key={id} questionId={id} number={i + 1} />
        ))}
      </div>
    </div>
  );
}
