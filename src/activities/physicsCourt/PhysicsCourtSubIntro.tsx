interface PhysicsCourtSubIntroProps {
  onContinue: () => void;
}

/** Shown once per fresh start, before the student-facing screen. For the substitute only. */
export function PhysicsCourtSubIntro({ onContinue }: PhysicsCourtSubIntroProps) {
  return (
    <div className="page stack">
      <div className="card stack">
        <h2 style={{ margin: 0 }}>Running Physics Court</h2>
        <ul>
          <li>
            Have the class split into groups of 3-4. Ask each group to decide within themselves what their group answer will be for each question.
            Every group votes the same way — Always, Maybe, or Never. Show the question, wait 2 minutes for discussion, 
            then ask each group for their vote. Then reveal the answer. If you want to keep score, you can, but you don't have to.
          </li>
          <li>Let discussion run at least <strong>2 minutes</strong> before pushing for a vote. Longer is fine if the class is engaged.</li>
          <li>You don't need to know the physics. Once the class votes, reveal the conclusion — the explanation appears for everyone.</li>
        </ul>
        <p>
          The next screen is for the class — display it and read it aloud, or let students read it
          themselves.
        </p>
        <button className="button button-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
