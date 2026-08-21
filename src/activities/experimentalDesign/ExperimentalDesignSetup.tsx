import { useState } from 'react';
import { AdvancedOptions } from '../../components/AdvancedOptions';
import { UnitSelector } from '../../components/UnitSelector';
import type { PhysicsUnit } from '../../types';
import { countEligible } from './experimentalDesignGenerator';

interface ExperimentalDesignSetupProps {
  onStart: (selectedUnits: PhysicsUnit[], seed: string) => void;
}

const MIN_ELIGIBLE = 4;

export function ExperimentalDesignSetup({ onStart }: ExperimentalDesignSetupProps) {
  const [selectedUnits, setSelectedUnits] = useState<PhysicsUnit[]>([]);
  const [seed, setSeed] = useState('');

  const eligible = countEligible(selectedUnits);
  const blocked = selectedUnits.length === 0 || eligible < MIN_ELIGIBLE;

  return (
    <div className="page stack">
      <h1>Experimental Design</h1>
      <p className="text-muted">
        Students design (but never run) an experiment to measure something, under explicit restrictions.
        There is no single right answer — you are grading whether the plan is airtight, not adjudicating physics.
      </p>
      <div className="card stack">
        <UnitSelector selected={selectedUnits} onChange={setSelectedUnits} />
        <AdvancedOptions seed={seed} onSeedChange={setSeed} />
        {blocked && (
          <p style={{ color: 'var(--color-danger)' }}>
            {selectedUnits.length === 0
              ? 'Select at least one unit to see how many prompts are available.'
              : `Only ${eligible} prompt${eligible === 1 ? '' : 's'} available for these units — select at least one more unit to reach ${MIN_ELIGIBLE}.`}
          </p>
        )}
        <button className="button button-primary" disabled={blocked} onClick={() => onStart(selectedUnits, seed)}>
          Start lesson
        </button>
      </div>
    </div>
  );
}
