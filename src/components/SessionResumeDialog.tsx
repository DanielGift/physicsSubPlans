interface SessionResumeDialogProps {
  onResume: () => void;
  onDiscard: () => void;
}

export function SessionResumeDialog({ onResume, onDiscard }: SessionResumeDialogProps) {
  return (
    <div className="card stack" role="dialog" aria-modal="true">
      <h2 style={{ margin: 0 }}>Resume in-progress lesson?</h2>
      <p>A lesson for this activity was already in progress on this device. Pick up where it left off, or start fresh.</p>
      <div className="row">
        <button className="button button-primary" onClick={onResume}>
          Resume
        </button>
        <button className="button" onClick={onDiscard}>
          Start over
        </button>
      </div>
    </div>
  );
}
