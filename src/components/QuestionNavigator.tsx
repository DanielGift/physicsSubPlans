interface QuestionNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  nextLabel?: string;
}

/** Previous / Next only. No auto-advance, ever (BUILD-SPEC.md §6). */
export function QuestionNavigator({ onPrevious, onNext, canGoPrevious, nextLabel = 'Next' }: QuestionNavigatorProps) {
  return (
    <div className="row" style={{ justifyContent: 'space-between' }} data-print="hide">
      <button className="button" onClick={onPrevious} disabled={!canGoPrevious}>
        Previous
      </button>
      <button className="button button-primary" onClick={onNext}>
        {nextLabel}
      </button>
    </div>
  );
}
