import { PHYSICS_UNITS, type PhysicsUnit } from '../types';

interface UnitSelectorProps {
  selected: PhysicsUnit[];
  onChange: (units: PhysicsUnit[]) => void;
}

const UNIT_LABELS: Record<PhysicsUnit, string> = {
  kinematics: 'Kinematics',
  forces: 'Forces',
  energy: 'Energy',
  momentum: 'Momentum',
  rotation: 'Rotation',
  gravitation: 'Gravitation',
  oscillations: 'Oscillations',
};

/** requiredUnits is AND semantics: a question needs every selected... no — every one of
 * its OWN required units to be selected. Selecting more units only ever adds eligible
 * questions, never removes them (BUILD-SPEC.md §4). */
export function UnitSelector({ selected, onChange }: UnitSelectorProps) {
  function toggle(unit: PhysicsUnit) {
    onChange(selected.includes(unit) ? selected.filter((u) => u !== unit) : [...selected, unit]);
  }

  return (
    <fieldset className="stack" style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Units covered so far</legend>
      <div className="row-wrap">
        {PHYSICS_UNITS.map((unit) => (
          <label key={unit} className="row" style={{ gap: 'var(--space-1)' }}>
            <input type="checkbox" checked={selected.includes(unit)} onChange={() => toggle(unit)} />
            {UNIT_LABELS[unit]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
