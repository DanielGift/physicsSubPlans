import type { ExperimentalDesignQuestion } from './experimentalDesignTypes';

// Student-safe fields only. Restrictions must be airtight — the substitute cannot rule on edge cases.

export const experimentalDesignQuestions: ExperimentalDesignQuestion[] = [
  {
    id: 'ED-RES-001',
    prompt:
      'You are given a small rubber ball, a meter stick, and a stopwatch. Design an experiment to measure the coefficient of restitution of the ball bouncing off a hard floor (the ratio of rebound height to drop height).',
    restrictions: [
      'No photogates or motion sensors — timing and length measurements only.',
      'The ball must be dropped, not thrown.',
    ],
    requiredUnits: ['energy'],
    difficulty: 1,
  },
  {
    id: 'ED-KIN-001',
    prompt: 'Using only a stopwatch and a meter stick, design an experiment to measure the average speed of a toy car as it rolls down a ramp.',
    restrictions: [
      'No motion sensors or photogates.',
      'You may mark positions on the ramp but may not touch the car once it is released.',
    ],
    requiredUnits: ['kinematics'],
    difficulty: 2,
  },
  {
    id: 'ED-MAS-001',
    prompt: 'Without moving it off the ground, design an experiment to determine the mass of a classroom table.',
    restrictions: [
      'No scale may be placed under any part of the table, including under individual legs.',
      'You may not lift the table — defined as supporting its full weight — at any point.',
      "You may not look up or use the manufacturer's specifications.",
    ],
    requiredUnits: ['forces', 'rotation'],
    difficulty: 4,
  },
  {
    id: 'ED-PRJ-001',
    prompt: "A ball is thrown across the room. Design an experiment to determine its average speed while it was in the air, without measuring its position while it is in flight.",
    restrictions: [
      'You may measure the launch point and the landing point.',
      'You may measure the total flight time.',
      "You may not track or measure the ball's position at any instant while it is airborne.",
    ],
    requiredUnits: ['kinematics'],
    difficulty: 3,
  },
  {
    id: 'ED-GRV-001',
    prompt:
      'Design an experiment to measure the acceleration due to gravity, g, using only a stopwatch, a meter stick, and small objects available in a classroom. Propose at least two genuinely different methods, based on different physics.',
    restrictions: ['No smartphone apps or sensors — only the stopwatch and meter stick may be used for measurement.'],
    requiredUnits: ['kinematics'],
    topicTags: ['free fall', 'pendulum', 'springs', 'inclined plane', 'Atwood machine'],
    difficulty: 5,
  },
  {
    id: 'ED-ROT-001',
    prompt: 'Without disassembling it, design an experiment to determine the moment of inertia of an irregularly shaped rigid object about a specified axis through its center of mass.',
    restrictions: ['You may not cut, weigh piece-by-piece, or otherwise disassemble the object.'],
    requiredUnits: ['rotation'],
    difficulty: 4,
  },
  {
    id: 'ED-PWR-001',
    prompt:
      'A researcher defines a property M for a person climbing a staircase: M = (mass * g * height climbed) / (time taken). Design an experiment to measure M for a student climbing a specific staircase. Then answer: if two students of different mass carry the same backpack up the same staircase in the same time, do they have the same M?',
    restrictions: ['You may not use any equipment other than a scale, a meter stick or known step height, and a stopwatch.'],
    requiredUnits: ['energy'],
    difficulty: 3,
  },
];
