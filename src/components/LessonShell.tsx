import { useState, type ReactNode } from 'react';
import type { LessonSession } from '../session/sessionTypes';
import { useTeacherMode } from '../teacher/TeacherModeContext';
import { LessonHeader } from './LessonHeader';
import { ProjectorModeToggle } from './ProjectorModeToggle';
import { QuestionNavigator } from './QuestionNavigator';
import { RoundIntro } from './RoundIntro';
import { TeacherAnswerPanel } from './TeacherAnswerPanel';
import { Timer } from './Timer';

interface LessonShellProps {
  activityTitle: string;
  session: LessonSession;
  roundLabels: Record<string, string>;
  roundDescriptions?: Record<string, string>;
  shortageNotes: string[];
  onNavigate: (roundIndex: number, questionIndex: number) => void;
  onEndSession: () => void;
  renderQuestion: (questionId: string) => ReactNode;
  /** An instructions-only closing activity with no question data, e.g. "Write the Trap". */
  closingActivity?: { title: string; description: string };
}

/**
 * Presentational shell shared by all three activities. It owns navigation and round
 * boundaries only — question content is supplied by the caller, since each activity
 * owns its own schema (BUILD-SPEC.md §2).
 */
export function LessonShell({
  activityTitle,
  session,
  roundLabels,
  roundDescriptions,
  shortageNotes,
  onNavigate,
  onEndSession,
  renderQuestion,
  closingActivity,
}: LessonShellProps) {
  const { teacherMode } = useTeacherMode();
  const [awaitingRoundConfirm, setAwaitingRoundConfirm] = useState(false);

  const round = session.rounds[session.currentRoundIndex];
  const isLastRound = session.currentRoundIndex >= session.rounds.length - 1;
  const isLastQuestionInRound = session.currentQuestionIndex >= round.questionIds.length - 1;

  function goNext() {
    if (!isLastQuestionInRound) {
      onNavigate(session.currentRoundIndex, session.currentQuestionIndex + 1);
      return;
    }
    // At a round boundary (or the end of the lesson) — always confirm first, never auto-advance.
    setAwaitingRoundConfirm(true);
  }

  function goPrevious() {
    if (session.currentQuestionIndex > 0) {
      onNavigate(session.currentRoundIndex, session.currentQuestionIndex - 1);
      return;
    }
    if (session.currentRoundIndex > 0) {
      const previousRound = session.rounds[session.currentRoundIndex - 1];
      onNavigate(session.currentRoundIndex - 1, previousRound.questionIds.length - 1);
    }
  }

  function beginNextRound() {
    setAwaitingRoundConfirm(false);
    onNavigate(session.currentRoundIndex + 1, 0);
  }

  if (awaitingRoundConfirm && isLastRound && isLastQuestionInRound) {
    return (
      <div className="page stack">
        <div className="card stack">
          <h2 style={{ margin: 0 }}>{closingActivity ? closingActivity.title : 'Lesson complete'}</h2>
          <p>{closingActivity ? closingActivity.description : 'Every round has been run. You can end the session now.'}</p>
          <button className="button button-primary" onClick={onEndSession}>
            End lesson
          </button>
        </div>
      </div>
    );
  }

  if (awaitingRoundConfirm) {
    const nextRound = session.rounds[session.currentRoundIndex + 1];
    return (
      <div className="page stack">
        <RoundIntro
          roundLabel={roundLabels[nextRound.roundId] ?? nextRound.roundId}
          description={roundDescriptions?.[nextRound.roundId]}
          onBegin={beginNextRound}
        />
      </div>
    );
  }

  const questionId = round.questionIds[session.currentQuestionIndex];
  const shortageNote = session.currentQuestionIndex === 0 ? shortageNotes[session.currentRoundIndex] : undefined;

  return (
    <div className="page stack">
      <LessonHeader
        activityTitle={activityTitle}
        roundLabel={roundLabels[round.roundId] ?? round.roundId}
        roundIndex={session.currentRoundIndex}
        roundCount={session.rounds.length}
        questionIndex={session.currentQuestionIndex}
        questionCount={round.questionIds.length}
        shortageNote={shortageNote}
        seed={session.seed}
        rightSlot={
          <>
            <Timer />
            <ProjectorModeToggle />
          </>
        }
      />
      {renderQuestion(questionId)}
      {teacherMode && <TeacherAnswerPanel activityId={session.activityId} questionId={questionId} />}
      <QuestionNavigator
        onPrevious={goPrevious}
        onNext={goNext}
        canGoPrevious={session.currentRoundIndex > 0 || session.currentQuestionIndex > 0}
        nextLabel={isLastQuestionInRound ? (isLastRound ? 'Finish lesson' : 'Next round') : 'Next'}
      />
    </div>
  );
}
