interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div className="stack" style={{ gap: 'var(--space-1)' }}>
      {label && (
        <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
          {label}
        </span>
      )}
      <div className="progress-bar-track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
