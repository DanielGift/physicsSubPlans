import { useState } from 'react';
import { Graph } from '../../components/Graph';
import { LessonShell } from '../../components/LessonShell';
import { MathContent } from '../../components/MathContent';
import { SessionResumeDialog } from '../../components/SessionResumeDialog';
import { SubstituteInstructions } from '../../components/SubstituteInstructions';
import { TagBadge } from '../../components/TagBadge';
import { generateSession } from '../../session/generateSession';
import { useSession } from '../../session/useSession';
import type { ReasoningSkill } from '../../types';
import { AlienPhysicsSetup } from './AlienPhysicsSetup';
import { alienPhysicsQuestions } from './questions';

const ROUND_LABELS: Record<string, string> = {
  decode: 'Decode',
  calculation: 'Calculation',
  error_analysis: 'Error Analysis',
  synthesis: 'Synthesis',
};

const ROUND_DESCRIPTIONS: Record<string, string> = {
  decode: 'Read the law and the given data, and decode what it means.',
  calculation: 'Apply the law given on screen to compute an exact answer.',
  error_analysis: "Find the first step where a fictional student's work goes wrong.",
  synthesis: 'Look past the arithmetic for the general fact this problem reveals.',
};

const questionsById = new Map(alienPhysicsQuestions.map((q) => [q.id, q]));

export function AlienPhysics() {
  const { session, resumableSession, startSession, resume, discardResumable, endSession, updateSession } =
    useSession('alien-physics');
  const [shortageNotes, setShortageNotes] = useState<string[]>([]);
  const [instructionsDismissed, setInstructionsDismissed] = useState(false);

  async function handleStart(selectedSkills: ReasoningSkill[], seed: string) {
    const { session: next, shortageNotes: notes } = await generateSession({
      activityId: 'alien-physics',
      selectedSkills,
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
    return <AlienPhysicsSetup onStart={handleStart} />;
  }

  if (!instructionsDismissed) {
    return <SubstituteInstructions activityTitle="Alien Physics" onDismiss={() => setInstructionsDismissed(true)} />;
  }

  return (
    <LessonShell
      activityTitle="Alien Physics"
      session={session}
      roundLabels={ROUND_LABELS}
      roundDescriptions={ROUND_DESCRIPTIONS}
      shortageNotes={shortageNotes}
      onNavigate={(roundIndex, questionIndex) =>
        updateSession((prev) => ({ ...prev, currentRoundIndex: roundIndex, currentQuestionIndex: questionIndex }))
      }
      onEndSession={endSession}
      closingActivity={{
        title: 'Invent Your Own',
        description:
          'Have students invent their own fictional law (with fictional units defined on screen) and a one-step problem for a neighbor to solve. No answer key needed — you\'re just timing it.',
      }}
      renderQuestion={(questionId) => {
        const question = questionsById.get(questionId);
        if (!question) return null;
        return (
          <div className="card stack">
            <div className="stack" style={{ gap: 'var(--space-1)' }}>
              {question.laws.map((law) => (
                <p key={law.name} className="text-muted" style={{ margin: 0 }}>
                  <strong>{law.name}:</strong> <MathContent text={law.statement} />
                </p>
              ))}
            </div>
            <MathContent text={question.prompt} />
            {question.graph && <Graph graph={question.graph} />}
            {question.flawedSolution && (
              <ol>
                {question.flawedSolution.map((step, i) => (
                  <li key={i}>
                    <MathContent text={step} />
                  </li>
                ))}
              </ol>
            )}
            <div className="row-wrap">
              <TagBadge label={question.questionType} />
              <TagBadge label={`difficulty ${question.difficulty}`} />
            </div>
          </div>
        );
      }}
    />
  );
}
