interface PhysicsCourtSubIntroProps {
  onContinue: () => void;
}

/** Shown once per fresh start, before the student-facing screen. For the substitute only. */
export function PhysicsCourtSubIntro({ onContinue }: PhysicsCourtSubIntroProps) {
  return (
    <div className="page stack">
      <div className="card stack">
        <h2 style={{ margin: 0 }}>Running Physics Court</h2>
        <p>
          The next screen is for the class — display it and read it aloud, or let students read it
          themselves.
        </p>
        <ul>
          <li>
            Ask the class to reach a <strong>consensus</strong>. Every student votes the same way —
            Always, Maybe, or Never — and you don't reveal until everyone agrees.
          </li>
          <li>Let discussion run at least <strong>2 minutes</strong> before pushing for a vote. Longer is fine if the class is engaged.</li>
          <li>You don't need to know the physics. Once the class agrees, reveal the conclusion — the explanation appears for everyone.</li>
        </ul>
        <button className="button button-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
