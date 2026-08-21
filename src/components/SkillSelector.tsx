import { REASONING_SKILLS, type ReasoningSkill } from '../types';

interface SkillSelectorProps {
  selected: ReasoningSkill[];
  onChange: (skills: ReasoningSkill[]) => void;
}

const SKILL_LABELS: Record<ReasoningSkill, string> = {
  algebra: 'Algebra',
  proportional_reasoning: 'Proportional reasoning',
  vectors: 'Vectors',
  graph_interpretation: 'Graph interpretation',
  derivatives: 'Derivatives',
  integrals: 'Integrals',
  initial_conditions: 'Initial conditions',
  dimensional_analysis: 'Dimensional analysis',
  conservation: 'Conservation laws',
  differential_equations: 'Differential equations',
  limits: 'Limits',
  modeling: 'Modeling',
};

export function SkillSelector({ selected, onChange }: SkillSelectorProps) {
  function toggle(skill: ReasoningSkill) {
    onChange(selected.includes(skill) ? selected.filter((s) => s !== skill) : [...selected, skill]);
  }

  return (
    <fieldset className="stack" style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Skills covered so far</legend>
      <div className="row-wrap">
        {REASONING_SKILLS.map((skill) => (
          <label key={skill} className="row" style={{ gap: 'var(--space-1)' }}>
            <input type="checkbox" checked={selected.includes(skill)} onChange={() => toggle(skill)} />
            {SKILL_LABELS[skill]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
