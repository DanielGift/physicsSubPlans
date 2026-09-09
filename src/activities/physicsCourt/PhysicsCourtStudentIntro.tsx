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
          You should all be in groups of 3-4 each. Each group will discuss the question and reach a consensus.
        </p>
        <p>
          A <span className="statement-text">statement</span> will appear in blue, followed by a{' '}
          <span className="claim-text">claim</span> in red.
        </p>
        <p>
          As a group, discuss and reach a <strong>consensus</strong>: is the claim <strong>Always</strong>{' '}
          true, <strong>Maybe</strong> true, or <strong>Never</strong> true as a result of the statement?
          Everyone in the group has to agree — you're not done until the vote is unanimous.
        </p>
        <p>Once the sub goes asks for answers, reveal yours. The sub will reveal the real conclusion. 
          You can keep track of scores for bragging rights if you so desire!
          </p>
        <p style={{ fontWeight: 600 }}>No notes or devices allowed!</p>
        <button className="button button-primary" onClick={onBegin}>
          Begin
        </button>
      </div>
    </div>
  );
}
