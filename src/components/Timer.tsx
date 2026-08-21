import { useEffect, useRef, useState } from 'react';

interface TimerProps {
  initialElapsedMs?: number;
  initialRunning?: boolean;
  onChange?: (elapsedMs: number, running: boolean) => void;
}

function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/** Opt-in start/pause/reset timer. Never advances the lesson on its own. */
export function Timer({ initialElapsedMs = 0, initialRunning = false, onChange }: TimerProps) {
  const [elapsedMs, setElapsedMs] = useState(initialElapsedMs);
  const [running, setRunning] = useState(initialRunning);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      lastTickRef.current = null;
      return;
    }
    lastTickRef.current = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const last = lastTickRef.current ?? now;
      lastTickRef.current = now;
      setElapsedMs((prev) => prev + (now - last));
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    onChange?.(elapsedMs, running);
  }, [elapsedMs, running, onChange]);

  return (
    <div className="row" data-print="hide">
      <span style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-lg)', minWidth: '3.5em' }}>{formatMs(elapsedMs)}</span>
      {!running ? (
        <button className="button" onClick={() => setRunning(true)}>
          Start
        </button>
      ) : (
        <button className="button" onClick={() => setRunning(false)}>
          Pause
        </button>
      )}
      <button
        className="button"
        onClick={() => {
          setRunning(false);
          setElapsedMs(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}
