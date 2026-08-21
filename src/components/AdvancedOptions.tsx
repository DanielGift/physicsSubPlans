import { useState } from 'react';

interface AdvancedOptionsProps {
  seed: string;
  onSeedChange: (seed: string) => void;
}

/** Manual seed entry, so a teacher can type a seed from one section into another to sync them. */
export function AdvancedOptions({ seed, onSeedChange }: AdvancedOptionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="stack">
      <button type="button" className="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide advanced options' : 'Advanced options'}
      </button>
      {open && (
        <label className="stack" style={{ gap: 'var(--space-1)' }}>
          <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
            Seed — type a seed from another section to run the identical lesson
          </span>
          <input
            type="text"
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            placeholder="e.g. k7m2-q4x9"
            style={{ padding: 'var(--space-2)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}
          />
        </label>
      )}
    </div>
  );
}
