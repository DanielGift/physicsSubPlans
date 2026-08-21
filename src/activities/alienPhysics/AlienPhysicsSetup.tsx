import { useState } from 'react';
import { AdvancedOptions } from '../../components/AdvancedOptions';
import { SkillSelector } from '../../components/SkillSelector';
import type { ReasoningSkill } from '../../types';
import { countEligible } from './alienPhysicsGenerator';

interface AlienPhysicsSetupProps {
  onStart: (selectedSkills: ReasoningSkill[], seed: string) => void;
}

const MIN_ELIGIBLE = 4;

export function AlienPhysicsSetup({ onStart }: AlienPhysicsSetupProps) {
  const [selectedSkills, setSelectedSkills] = useState<ReasoningSkill[]>([]);
  const [seed, setSeed] = useState('');

  const eligible = countEligible(selectedSkills);
  const blocked = selectedSkills.length === 0 || eligible < MIN_ELIGIBLE;

  return (
    <div className="page stack">
      <h1>Alien Physics</h1>
      <p className="text-muted">
        Students apply made-up laws from an alien world using only reasoning skills the class has already
        learned. Every law needed is on screen — no real-world physics required.
      </p>
      <div className="card stack">
        <SkillSelector selected={selectedSkills} onChange={setSelectedSkills} />
        <AdvancedOptions seed={seed} onSeedChange={setSeed} />
        {blocked && (
          <p style={{ color: 'var(--color-danger)' }}>
            {selectedSkills.length === 0
              ? 'Select at least one skill to see how many problems are available.'
              : `Only ${eligible} problem${eligible === 1 ? '' : 's'} available for these skills — select at least one more to reach ${MIN_ELIGIBLE}.`}
          </p>
        )}
        <button className="button button-primary" disabled={blocked} onClick={() => onStart(selectedSkills, seed)}>
          Start lesson
        </button>
      </div>
    </div>
  );
}
