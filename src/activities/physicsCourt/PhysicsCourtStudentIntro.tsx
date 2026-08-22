interface PhysicsCourtStudentIntroProps {
  onBegin: () => void;
}

/** Shown once per fresh start, right before the first statement. Meant for the class to read. */
export function PhysicsCourtStudentIntro({ onBegin }: PhysicsCourtStudentIntroProps) {
  return (
    <div className="page stack">
      <div className="card stack">
        <p className="badge" style={{ alignSelf: 'flex-start' }}>
          Show this to the class
        </p>
        <h2 style={{ margin: 0 }}>How Physics Court works</h2>
        <p>
          A <span className="statement-text">statement</span> will appear in blue, followed by a{' '}
          <span className="claim-text">claim</span> in red.
        </p>
        <p>
          As a class, discuss and reach a <strong>consensus</strong>: is the claim <strong>Always</strong>{' '}
          true, <strong>Maybe</strong> true, or <strong>Never</strong> true as a result of the statement?
          Everyone has to agree — you're not done until the vote is unanimous.
        </p>
        <p>Once everyone agrees, tell your substitute to reveal the conclusion.</p>
        <p style={{ fontWeight: 600 }}>No notes or devices allowed!</p>
        <button className="button button-primary" onClick={onBegin}>
          Begin
        </button>
      </div>
    </div>
  );
}
