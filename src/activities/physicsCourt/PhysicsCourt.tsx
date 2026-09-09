import { useEffect, useState } from 'react';
import { MathContent } from '../../components/MathContent';
import { SessionResumeDialog } from '../../components/SessionResumeDialog';
import { TagBadge } from '../../components/TagBadge';
import { generateReadableSeed } from '../../utilities/rng';
import { useSession } from '../../session/useSession';
import type { LessonSession } from '../../session/sessionTypes';
import type { PhysicsUnit } from '../../types';
import { PhysicsCourtConclusion } from './PhysicsCourtConclusion';
import { PhysicsCourtSetup } from './PhysicsCourtSetup';
import { PhysicsCourtSubIntro } from './PhysicsCourtSubIntro';
import { PhysicsCourtStudentIntro } from './PhysicsCourtStudentIntro';
import { countEligible, shuffleLap } from './physicsCourtGenerator';
import { physicsCourtQuestions } from './questions';

const questionsById = new Map(physicsCourtQuestions.map((q) => [q.id, q]));

type Phase = 'presentation' | 'conclusion';
type IntroStep = 'sub' | 'student' | 'done';

// Keep at least this many not-yet-shown ids buffered ahead of the current position.
const BUFFER_AHEAD = 2;

function buildCycleRound(selectedUnits: PhysicsUnit[], seed: string) {
  return { roundId: 'cycle', questionIds: shuffleLap(selectedUnits, seed, 0) };
}

export function PhysicsCourt() {
  const { session, resumableSession, startSession, resume, discardResumable, endSession, updateSession } =
    useSession('physics-court');
  const [phase, setPhase] = useState<Phase>('presentation');
  const [introStep, setIntroStep] = useState<IntroStep>('sub');

  // Keep the id buffer topped up so the cycle never runs dry — each additional lap is
  // a fresh, deterministic reshuffle of the whole eligible pool (see shuffleLap).
  useEffect(() => {
    if (!session) return;
    const ids = session.rounds[0].questionIds;
    const eligibleCount = countEligible(session.selectedUnits ?? []);
    if (eligibleCount === 0) return;
    if (session.currentQuestionIndex + BUFFER_AHEAD < ids.length) return;

    const lapIndex = Math.floor(ids.length / eligibleCount);
    const nextLap = shuffleLap(session.selectedUnits ?? [], session.seed, lapIndex);
    updateSession((prev) => ({
      ...prev,
      rounds: [{ roundId: prev.rounds[0].roundId, questionIds: [...prev.rounds[0].questionIds, ...nextLap] }],
    }));
  }, [session, updateSession]);

  function handleStart(selectedUnits: PhysicsUnit[], seedInput: string) {
    const seed = seedInput || generateReadableSeed();
    const session: LessonSession = {
      version: 1,
      activityId: 'physics-court',
      seed,
      createdAt: new Date().toISOString(),
      selectedUnits,
      rounds: [buildCycleRound(selectedUnits, seed)],
      currentRoundIndex: 0,
      currentQuestionIndex: 0,
    };
    setPhase('presentation');
    setIntroStep('sub');
    startSession(session);
  }

  function handleResume() {
    setPhase('presentation');
    setIntroStep('done'); // the class has already seen the intro screens in this lesson
    resume();
  }

  function goNext() {
    if (phase === 'presentation') {
      setPhase('conclusion');
      return;
    }
    setPhase('presentation');
    updateSession((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
  }

  function goPrevious() {
    if (phase === 'conclusion') {
      setPhase('presentation');
      return;
    }
    if (!session || session.currentQuestionIndex === 0) return;
    setPhase('conclusion');
    updateSession((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
  }

  if (resumableSession) {
    return (
      <div className="page stack">
        <SessionResumeDialog onResume={handleResume} onDiscard={discardResumable} />
      </div>
    );
  }

  if (!session) {
    return <PhysicsCourtSetup onStart={handleStart} />;
  }

  if (introStep === 'sub') {
    return <PhysicsCourtSubIntro onContinue={() => setIntroStep('student')} />;
  }

  if (introStep === 'student') {
    return <PhysicsCourtStudentIntro onBegin={() => setIntroStep('done')} />;
  }

  const questionId = session.rounds[0].questionIds[session.currentQuestionIndex];
  const question = questionsById.get(questionId);

  return (
    <div className="page stack">
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0 }}>Physics Court</h1>
          <p className="text-muted" style={{ margin: 0 }}>
            Blue = statement · Red = claim
          </p>
        </div>
        <div className="row" data-print="hide">
          <span className="badge">seed: {session.seed}</span>
          <button className="button" onClick={endSession}>
            End lesson
          </button>
        </div>
      </header>

      {question && (
        <div className="card stack">
          {question.setup && <MathContent text={question.setup} className="statement-text" />}
          <MathContent text={question.claim} className="claim-text" />
          <div className="row-wrap">
            {question.topicTags?.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
            <TagBadge label={`difficulty ${question.difficulty}`} />
          </div>
        </div>
      )}

      {phase === 'conclusion' && <PhysicsCourtConclusion questionId={questionId} />}

      <div className="row" style={{ justifyContent: 'space-between' }} data-print="hide">
        <button className="button" onClick={goPrevious} disabled={phase === 'presentation' && session.currentQuestionIndex === 0}>
          Previous
        </button>
        <button className="button button-primary" onClick={goNext}>
          {phase === 'presentation' ? 'Reveal conclusion' : 'Next statement'}
        </button>
      </div>
    </div>
  );
}
