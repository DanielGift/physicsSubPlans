// Shared cross-activity types. Individual activities extend these but never
// redefine them, so a single edit here keeps every activity's unions in sync.

export type ActivityId = 'physics-court' | 'experimental-design';

// Gravitation is not its own unit in the current AP Physics C: Mechanics framework — its
// content now lives inside Forces (orbital dynamics as a force/circular-motion application)
// and Energy (orbital and potential energy). See physicsCourt/questions.ts for where each
// former gravitation claim landed.
export type PhysicsUnit =
  | 'kinematics'
  | 'forces'
  | 'energy'
  | 'momentum'
  | 'rotation'
  | 'oscillations';

export type Verdict = 'always' | 'sometimes' | 'never';

export const PHYSICS_UNITS: PhysicsUnit[] = ['kinematics', 'forces', 'energy', 'momentum', 'rotation', 'oscillations'];

export interface GraphSeries {
  label: string;
  color?: string;
  points: [number, number][];
}

export interface GraphDefinition {
  xLabel: string;
  yLabel: string;
  series: GraphSeries[];
}
