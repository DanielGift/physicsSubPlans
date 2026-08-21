import { useState } from 'react';
import { AdvancedOptions } from '../../components/AdvancedOptions';
import { UnitSelector } from '../../components/UnitSelector';
import type { PhysicsUnit } from '../../types';
import { countEligible } from './physicsCourtGenerator';

interface PhysicsCourtSetupProps {
  onStart: (selectedUnits: PhysicsUnit[], seed: string) => void;
}

const MIN_ELIGIBLE = 4;

export function PhysicsCourtSetup({ onStart }: PhysicsCourtSetupProps) {
  const [selectedUnits, setSelectedUnits] = useState<PhysicsUnit[]>([]);
  const [seed, setSeed] = useState('');

  const eligible = countEligible(selectedUnits);
  const blocked = selectedUnits.length === 0 || eligible < MIN_ELIGIBLE;

  return (
    <div className="page stack">
      <h1>Physics Court</h1>
      <p className="text-muted">
        Students argue whether a claim is always, sometimes, or never true. Check off what the class has
        covered, then start — no physics knowledge required to run it.
      </p>
      <div className="card stack">
        <UnitSelector selected={selectedUnits} onChange={setSelectedUnits} />
        <AdvancedOptions seed={seed} onSeedChange={setSeed} />
        {blocked && (
          <p style={{ color: 'var(--color-danger)' }}>
            {selectedUnits.length === 0
              ? 'Select at least one unit to see how many questions are available.'
              : `Only ${eligible} question${eligible === 1 ? '' : 's'} available for these units — select at least one more unit to reach ${MIN_ELIGIBLE}.`}
          </p>
        )}
        <button className="button button-primary" disabled={blocked} onClick={() => onStart(selectedUnits, seed)}>
          Start lesson
        </button>
      </div>
    </div>
  );
}
