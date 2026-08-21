import { useState } from 'react';
import { LessonShell } from '../../components/LessonShell';
import { MathContent } from '../../components/MathContent';
import { SessionResumeDialog } from '../../components/SessionResumeDialog';
import { SubstituteInstructions } from '../../components/SubstituteInstructions';
import { TagBadge } from '../../components/TagBadge';
import { generateSession } from '../../session/generateSession';
import { useSession } from '../../session/useSession';
import type { PhysicsUnit } from '../../types';
import { ExperimentalDesignSetup } from './ExperimentalDesignSetup';
import { experimentalDesignQuestions } from './questions';

const ROUND_LABELS: Record<string, string> = {
  warmup: 'Warm-up',
  restricted: 'Restricted',
  hard: 'Hard',
  define_the_thing: 'Define The Thing',
};

const ROUND_DESCRIPTIONS: Record<string, string> = {
  warmup: 'A straightforward design prompt to get everyone talking.',
  restricted: 'The restrictions are the whole point — read them aloud before groups start.',
  hard: 'The hardest prompt of the day. Expect this one to take the full time.',
  define_the_thing: 'An operationally-defined quantity — design a way to measure it, then discuss the follow-up question.',
};

const questionsById = new Map(experimentalDesignQuestions.map((q) => [q.id, q]));

export function ExperimentalDesign() {
  const { session, resumableSession, startSession, resume, discardResumable, endSession, updateSession } =
    useSession('experimental-design');
  const [shortageNotes, setShortageNotes] = useState<string[]>([]);
  const [instructionsDismissed, setInstructionsDismissed] = useState(false);

  async function handleStart(selectedUnits: PhysicsUnit[], seed: string) {
    const { session: next, shortageNotes: notes } = await generateSession({
      activityId: 'experimental-design',
      selectedUnits,
      seed: seed || undefined,
    });
    setShortageNotes(notes);
    setInstructionsDismissed(false);
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

  if (!instructionsDismissed) {
    return <SubstituteInstructions activityTitle="Experimental Design" onDismiss={() => setInstructionsDismissed(true)} />;
  }

  return (
    <LessonShell
      activityTitle="Experimental Design"
      session={session}
      roundLabels={ROUND_LABELS}
      roundDescriptions={ROUND_DESCRIPTIONS}
      shortageNotes={shortageNotes}
      onNavigate={(roundIndex, questionIndex) =>
        updateSession((prev) => ({ ...prev, currentRoundIndex: roundIndex, currentQuestionIndex: questionIndex }))
      }
      onEndSession={endSession}
      renderQuestion={(questionId) => {
        const question = questionsById.get(questionId);
        if (!question) return null;
        return (
          <div className="card stack">
            <MathContent text={question.prompt} />
            <div>
              <strong>Restrictions:</strong>
              <ul>
                {question.restrictions.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="row-wrap">
              <TagBadge label={`difficulty ${question.difficulty}`} />
            </div>
          </div>
        );
      }}
    />
  );
}
