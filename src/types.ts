// Shared cross-activity types. Individual activities extend these but never
// redefine them, so a single edit here keeps every activity's unions in sync.

export type ActivityId = 'physics-court' | 'alien-physics' | 'experimental-design';

export type PhysicsUnit =
  | 'kinematics'
  | 'forces'
  | 'energy'
  | 'momentum'
  | 'rotation'
  | 'gravitation'
  | 'oscillations';

export type ReasoningSkill =
  | 'algebra'
  | 'proportional_reasoning'
  | 'vectors'
  | 'graph_interpretation'
  | 'derivatives'
  | 'integrals'
  | 'initial_conditions'
  | 'dimensional_analysis'
  | 'conservation'
  | 'differential_equations'
  | 'limits'
  | 'modeling';

export type Verdict = 'always' | 'sometimes' | 'never';

export const PHYSICS_UNITS: PhysicsUnit[] = [
  'kinematics',
  'forces',
  'energy',
  'momentum',
  'rotation',
  'gravitation',
  'oscillations',
];

export const REASONING_SKILLS: ReasoningSkill[] = [
  'algebra',
  'proportional_reasoning',
  'vectors',
  'graph_interpretation',
  'derivatives',
  'integrals',
  'initial_conditions',
  'dimensional_analysis',
  'conservation',
  'differential_equations',
  'limits',
  'modeling',
];

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
