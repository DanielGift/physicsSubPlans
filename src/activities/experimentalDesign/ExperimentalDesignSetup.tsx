import { useState } from 'react';
import { UnitSelector } from '../../components/UnitSelector';
import type { PhysicsUnit } from '../../types';

interface ExperimentalDesignSetupProps {
  onStart: (selectedUnits: PhysicsUnit[]) => void;
}

/** The only screen before the scenarios — instructions for the substitute, plus which units to include. */
export function ExperimentalDesignSetup({ onStart }: ExperimentalDesignSetupProps) {
  const [selectedUnits, setSelectedUnits] = useState<PhysicsUnit[]>([]);
  const blocked = selectedUnits.length === 0;

  return (
    <div className="page stack">
      <h1>Experimental Design</h1>
      <div className="card stack">
        <p>Tell the class:</p>
        <ul>
          <li>Get into groups of 3 or 4.</li>
          <li>
            Each group will be <strong>designing</strong> an experiment, not running one — paper and
            pencil (or pen) only, no other materials.
          </li>
          <li>Each group will be shown a scenario and needs to design an experiment to measure what it asks for.</li>
          <li>
            When a group finishes a scenario, tell them to move on — you can scroll down for more. Two
            scenarios fit on the screen at once.
          </li>
          <li>Groups don't need to finish every scenario, but should show real evidence of effort on each one they attempt.</li>
          <li>
            Each group should write <strong>everyone's name</strong> on what they write, and turn it in to
            you at the end of class.
          </li>
        </ul>
        <p>
          <strong>Substitute:</strong> please leave everything the groups turn in for me.
        </p>

        <UnitSelector selected={selectedUnits} onChange={setSelectedUnits} />
        {blocked && <p style={{ color: 'var(--color-danger)' }}>Select at least one unit to include its scenario.</p>}

        <button className="button button-primary" disabled={blocked} onClick={() => onStart(selectedUnits)}>
          Show scenarios
        </button>
      </div>
    </div>
  );
}
