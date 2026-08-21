import { useState } from 'react';
import { LessonShell } from '../../components/LessonShell';
import { MathContent } from '../../components/MathContent';
import { SessionResumeDialog } from '../../components/SessionResumeDialog';
import { SubstituteInstructions } from '../../components/SubstituteInstructions';
import { TagBadge } from '../../components/TagBadge';
import { generateSession } from '../../session/generateSession';
import { useSession } from '../../session/useSession';
import type { PhysicsUnit } from '../../types';
import { PhysicsCourtSetup } from './PhysicsCourtSetup';
import { physicsCourtQuestions } from './questions';

const ROUND_LABELS: Record<string, string> = {
  verdict: 'Verdict',
  prosecution: 'Prosecution',
  defense: 'Defense',
  rewrite: 'Rewrite',
};

const ROUND_DESCRIPTIONS: Record<string, string> = {
  verdict: 'For each claim, the class argues always / sometimes / never.',
  prosecution: 'Every claim here is only sometimes true — find the counterexample that breaks it.',
  defense: 'Every claim here is always true — build the argument for why nothing can break it.',
  rewrite: 'Take a claim that failed and fix the wording so it becomes true.',
};

const questionsById = new Map(physicsCourtQuestions.map((q) => [q.id, q]));

export function PhysicsCourt() {
  const { session, resumableSession, startSession, resume, discardResumable, endSession, updateSession } =
    useSession('physics-court');
  const [shortageNotes, setShortageNotes] = useState<string[]>([]);
  const [instructionsDismissed, setInstructionsDismissed] = useState(false);

  async function handleStart(selectedUnits: PhysicsUnit[], seed: string) {
    const { session: next, shortageNotes: notes } = await generateSession({
      activityId: 'physics-court',
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
    return <PhysicsCourtSetup onStart={handleStart} />;
  }

  if (!instructionsDismissed) {
    return <SubstituteInstructions activityTitle="Physics Court" onDismiss={() => setInstructionsDismissed(true)} />;
  }

  return (
    <LessonShell
      activityTitle="Physics Court"
      session={session}
      roundLabels={ROUND_LABELS}
      roundDescriptions={ROUND_DESCRIPTIONS}
      shortageNotes={shortageNotes}
      onNavigate={(roundIndex, questionIndex) =>
        updateSession((prev) => ({ ...prev, currentRoundIndex: roundIndex, currentQuestionIndex: questionIndex }))
      }
      onEndSession={endSession}
      closingActivity={{
        title: 'Write the Trap',
        description:
          "Have students write their own always/sometimes/never claim about anything covered today, then trade with a neighbor to adjudicate. No answer key needed — you're just timing it.",
      }}
      renderQuestion={(questionId) => {
        const question = questionsById.get(questionId);
        if (!question) return null;
        return (
          <div className="card stack">
            {question.setup && <MathContent text={question.setup} className="text-muted" />}
            <MathContent text={question.claim} />
            <div className="row-wrap">
              {question.topicTags?.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
              <TagBadge label={`difficulty ${question.difficulty}`} />
            </div>
          </div>
        );
      }}
    />
  );
}
