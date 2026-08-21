import { useState } from 'react';

interface SubstituteInstructionsProps {
  activityTitle: string;
  onDismiss: () => void;
}

/** Must be dismissed before a lesson can start (BUILD-SPEC.md §6). */
export function SubstituteInstructions({ activityTitle, onDismiss }: SubstituteInstructionsProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="card stack" data-print="hide">
      <h2 style={{ margin: 0 }}>Before you start: {activityTitle}</h2>
      <p>
        You do not need to know physics to run this activity. Everything the class needs is already on
        screen — the questions and the timing. You will never be asked to judge who is right.
      </p>
      <ul>
        <li>Read each prompt aloud, or let students read it themselves.</li>
        <li>Use Previous / Next to move through questions — nothing advances on its own.</li>
        <li>
          <strong>Never give the answer yourself.</strong> If students get stuck, have them re-read the
          setup and check their assumptions out loud to each other.
        </li>
        <li>The timer is optional and never changes the screen for you.</li>
        <li>You'll see a confirm screen before each new round begins.</li>
      </ul>
      <label className="row">
        <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} />
        I understand I should not give the answer myself.
      </label>
      <button className="button button-primary" disabled={!acknowledged} onClick={onDismiss}>
        Start lesson
      </button>
    </div>
  );
}
