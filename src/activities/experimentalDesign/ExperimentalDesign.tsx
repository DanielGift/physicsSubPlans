import { AnswerReveal } from '../../components/AnswerReveal';
import { MathContent } from '../../components/MathContent';
import { SessionResumeDialog } from '../../components/SessionResumeDialog';
import { TagBadge } from '../../components/TagBadge';
import { Timer } from '../../components/Timer';
import type { LessonSession } from '../../session/sessionTypes';
import { useSession } from '../../session/useSession';
import type { PhysicsUnit } from '../../types';
import { createRng, generateReadableSeed } from '../../utilities/rng';
import { ExperimentalDesignSetup } from './ExperimentalDesignSetup';
import { buildWorksheet } from './experimentalDesignGenerator';
import { experimentalDesignQuestions } from './questions';

const questionsById = new Map(experimentalDesignQuestions.map((q) => [q.id, q]));

function PromptCard({ questionId, number }: { questionId: string; number: number }) {
  const question = questionsById.get(questionId);
  if (!question) return null;

  return (
    <div className="card stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>Experiment {number}</strong>
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
      <AnswerReveal questionId={questionId} />
    </div>
  );
}

export function ExperimentalDesign() {
  const { session, resumableSession, startSession, resume, discardResumable, endSession } =
    useSession('experimental-design');

  function handleStart(selectedUnits: PhysicsUnit[], seedInput: string) {
    const seed = seedInput || generateReadableSeed();
    const questionIds = buildWorksheet(selectedUnits, createRng(seed));
    const next: LessonSession = {
      version: 1,
      activityId: 'experimental-design',
      seed,
      createdAt: new Date().toISOString(),
      selectedUnits,
      rounds: [{ roundId: 'worksheet', questionIds }],
      currentRoundIndex: 0,
      currentQuestionIndex: 0,
    };
    startSession(next);
  }

  if (resumableSession) {
    return (
      <div className="page stack">
        <SessionResumeDialog onResume={resume} onDiscard={discardResumable} />
      </div>
    );
  }

  if (!session) {
    return <ExperimentalDesignSetup onStart={handleStart} />;
  }

  const questionIds = session.rounds[0]?.questionIds ?? [];

  return (
    <div className="page stack">
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0 }}>Experimental Design</h1>
          <p className="text-muted" style={{ margin: 0 }}>
            {questionIds.length} experiment{questionIds.length === 1 ? '' : 's'} — work them in any order.
          </p>
        </div>
        <div className="row" data-print="hide">
          <Timer />
          <span className="badge">seed: {session.seed}</span>
          <button className="button" onClick={endSession}>
            New worksheet
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
