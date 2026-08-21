interface RoundIntroProps {
  roundLabel: string;
  description?: string;
  onBegin: () => void;
}

/** Shown at every round boundary; advancing always requires this explicit confirm. */
export function RoundIntro({ roundLabel, description, onBegin }: RoundIntroProps) {
  return (
    <div className="card stack" role="dialog" aria-modal="true">
      <h2 style={{ margin: 0 }}>Up next: {roundLabel}</h2>
      {description && <p>{description}</p>}
      <button className="button button-primary" onClick={onBegin}>
        Begin {roundLabel}
      </button>
    </div>
  );
}
