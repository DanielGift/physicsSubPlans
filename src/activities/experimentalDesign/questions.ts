import type { ExperimentalDesignQuestion } from './experimentalDesignTypes';

// Student-safe fields only. Restrictions must be airtight — the substitute cannot rule on
// edge cases. One deliberately unusual prompt per unit (kinematics, forces, energy,
// momentum, rotation, oscillations) — measuring something strange enough to force real
// thinking rather than a familiar textbook setup.

export const experimentalDesignQuestions: ExperimentalDesignQuestion[] = [
  {
    id: 'ED-KIN-001',
    prompt:
      'Design an experiment to determine the terminal velocity of a falling coffee filter (or a single sheet of paper), using no sensor faster than your own reaction time.',
    restrictions: [
      'No photogates, motion sensors, or smartphone apps.',
      'Only a stopwatch and a meter stick may be used for measurement.',
      'You must justify why your measurement actually reflects terminal velocity, and not the filter still speeding up.',
    ],
    requiredUnits: ['kinematics'],
    difficulty: 4,
  },
  {
    id: 'ED-FOR-001',
    prompt:
      'A bicycle wheel is spun by hand and raised off the ground so it coasts to a stop on its own. Design an experiment to determine whether the wheel is slowed more by air resistance or by friction at its axle.',
    restrictions: [
      'You may not disassemble, oil, or otherwise alter the wheel or its axle.',
      'You may not touch the wheel once it is spinning, except to bring it to a stop between trials.',
      'Only a stopwatch and simple markings on the wheel may be used for measurement.',
    ],
    requiredUnits: ['forces'],
    difficulty: 5,
  },
  {
    id: 'ED-ENE-001',
    prompt:
      "Design an experiment to determine the elastic potential energy stored in a stretched rubber band at its maximum stretch, without cutting it or using any force sensor.",
    restrictions: [
      "The rubber band may not be cut, and you may not assume it obeys Hooke's law without checking.",
      'No electronic force or motion sensors — only a stopwatch, a meter stick, and objects of known mass.',
    ],
    requiredUnits: ['energy'],
    difficulty: 4,
  },
  {
    id: 'ED-MOM-001',
    prompt:
      'Design an experiment to determine the mass of a rolling object, using no scale, balance, or any device that measures weight directly.',
    restrictions: [
      'No scale or balance of any kind, and no comparing the object by hand-feel to a known weight.',
      'You may use a stopwatch, a meter stick, and other objects of precisely known mass.',
    ],
    requiredUnits: ['momentum'],
    difficulty: 4,
  },
  {
    id: 'ED-ROT-001',
    prompt:
      'You have two eggs that look identical — one raw, one hard-boiled — but you do not know which is which. Design an experiment to determine which egg is which, using only a flat table.',
    restrictions: [
      'You may not crack, weigh, candle (shine a light through), or otherwise open either egg.',
      'The two eggs must be treated identically in every trial, so the comparison is fair.',
    ],
    requiredUnits: ['rotation'],
    difficulty: 4,
  },
  {
    id: 'ED-OSC-001',
    prompt:
      'Design an experiment to determine the mass of a small, irregularly-shaped rock, using a rubber band and a stopwatch — no scale, and you may not compare it by hand to a known weight.',
    restrictions: [
      'No scale or balance of any kind.',
      'You may use rubber bands, a stopwatch, a meter stick, and objects of precisely known mass.',
      'Keep oscillations small enough that you are not relying on the rubber band being linear at large stretch.',
    ],
    requiredUnits: ['oscillations'],
    difficulty: 4,
  },
];
