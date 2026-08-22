import { useState } from 'react';
import { AdvancedOptions } from '../../components/AdvancedOptions';
import { UnitSelector } from '../../components/UnitSelector';
import type { PhysicsUnit } from '../../types';
import { countEligible } from './experimentalDesignGenerator';

interface ExperimentalDesignSetupProps {
  onStart: (selectedUnits: PhysicsUnit[], seed: string) => void;
}

export function ExperimentalDesignSetup({ onStart }: ExperimentalDesignSetupProps) {
  const [selectedUnits, setSelectedUnits] = useState<PhysicsUnit[]>([]);
  const [seed, setSeed] = useState('');

  const eligible = countEligible(selectedUnits);
  const blocked = selectedUnits.length === 0;

  return (
    <div className="page stack">
      <h1>Experimental Design</h1>
      <p className="text-muted">
        One deliberately strange thing to measure per unit — students design (but never run) an
        experiment, under explicit restrictions. There is no single right answer — you are grading
        whether the plan is airtight, not adjudicating physics.
      </p>
      <div className="card stack">
        <UnitSelector selected={selectedUnits} onChange={setSelectedUnits} />
        <AdvancedOptions seed={seed} onSeedChange={setSeed} />
        {blocked ? (
          <p style={{ color: 'var(--color-danger)' }}>Select at least one unit to generate a worksheet.</p>
        ) : (
          <p className="text-muted" style={{ margin: 0 }}>
            {eligible} experiment{eligible === 1 ? '' : 's'} on this worksheet.
          </p>
        )}
        <button className="button button-primary" disabled={blocked} onClick={() => onStart(selectedUnits, seed)}>
          Generate worksheet
        </button>
      </div>
    </div>
  );
}
