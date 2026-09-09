import type { ExperimentalDesignQuestion } from './experimentalDesignTypes';

// Student-safe fields only. Restrictions must be airtight — the substitute cannot rule on
// edge cases. Deliberately unusual prompts — measuring something strange enough to force
// real thinking rather than a familiar textbook setup. Distribution: 3 kinematics,
// 3 forces, 2 each for energy, momentum, rotation, and oscillations (14 total).

export const experimentalDesignQuestions: ExperimentalDesignQuestion[] = [
  // ===== Kinematics (3) =====
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
    id: 'ED-KIN-002',
    prompt:
      'A student claims they can throw a ball harder with their dominant hand than their non-dominant hand. Design an experiment to determine the launch speed of the ball each way and settle the claim.',
    restrictions: [
      'No radar guns, speed apps, or motion sensors.',
      'The ball must be thrown the same way (same angle, same release height) as consistently as possible for both hands.',
      'Only a stopwatch and a meter stick may be used for measurement.',
    ],
    requiredUnits: ['kinematics'],
    difficulty: 4,
  },
  {
    id: 'ED-KIN-003',
    prompt:
      "Design an experiment to determine a classmate's reaction time, without using a stopwatch app or any electronic timing device to time the reaction itself.",
    restrictions: [
      'No stopwatch app, phone, or other electronic device may be used to time the reaction.',
      'You may use a ruler or meter stick and known facts about free fall.',
      'The person reacting may not be given any warning of exactly when the test will start.',
    ],
    requiredUnits: ['kinematics'],
    difficulty: 4,
  },

  // ===== Forces (3) =====
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
    id: 'ED-FOR-002',
    prompt:
      'A flat sheet of paper and the same sheet crumpled into a ball (same mass, same material) are both dropped from the same height. Design an experiment to determine which one experiences more air resistance while falling.',
    restrictions: [
      'No fans, wind tunnels, or airflow sensors.',
      'No electronic motion sensors — only a stopwatch and a meter stick.',
      'Both sheets must be dropped from the same height in every trial.',
    ],
    requiredUnits: ['forces'],
    difficulty: 3,
  },
  {
    id: 'ED-FOR-003',
    prompt:
      "Two identical-looking wooden blocks are given to you; one has its center of mass exactly in the geometric middle, and the other's is shifted toward one end. Design an experiment to determine which block is which, without cutting, drilling, or weighing either one.",
    restrictions: [
      'You may not cut, drill into, or otherwise open either block.',
      'No scale or balance that measures weight directly.',
      'You may use a ruler or straightedge as a pivot or fulcrum.',
    ],
    requiredUnits: ['forces'],
    difficulty: 4,
  },

  // ===== Energy (2) =====
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
    id: 'ED-ENE-002',
    prompt:
      'A ball of known mass rolls across a carpeted floor and gradually slows to a stop. Design an experiment to determine what fraction of its initial kinetic energy is lost to rolling friction over a specific measured stretch of the floor.',
    restrictions: [
      'No force sensors of any kind.',
      'Only a stopwatch and a meter stick may be used for measurement.',
      'You may not assume the ball starts at a speed you already know — it must be measured.',
    ],
    requiredUnits: ['energy'],
    difficulty: 4,
  },

  // ===== Momentum (2) =====
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
    id: 'ED-MOM-002',
    prompt:
      'Two students sit on separate wheeled chairs, facing each other, at rest. They push off from each other with their hands, and each chair rolls away in opposite directions. Design an experiment to determine the ratio of the two students\' masses, without ever weighing either of them.',
    restrictions: [
      'No scale, balance, or device that measures weight directly.',
      'You may use a stopwatch and a meter stick to measure distance and time.',
      'The two students may not push off from anything except each other.',
    ],
    requiredUnits: ['momentum'],
    difficulty: 5,
  },

  // ===== Rotation (2) =====
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
    id: 'ED-ROT-002',
    prompt:
      'You are given two cylinders of the same outer size and the same total mass, released at the same time from the top of the same ramp — one is solid, the other is a hollow tube. Design an experiment to determine which cylinder is which by watching them roll, without cutting either one open.',
    restrictions: [
      'You may not cut, drill into, or otherwise open either cylinder.',
      'No scale — you are told the two cylinders already have equal total mass.',
      'Only a stopwatch and a meter stick may be used for measurement.',
    ],
    requiredUnits: ['rotation'],
    difficulty: 4,
  },

  // ===== Oscillations (2) =====
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
  {
    id: 'ED-OSC-002',
    prompt:
      'Some students believe a heavier rider makes a playground swing complete each back-and-forth swing more slowly than a lighter rider does, for the same swing length. Design an experiment to test this belief.',
    restrictions: [
      'No electronic timing devices — only a mechanical stopwatch, a wristwatch, or counting aloud.',
      'The length of the swing (the chains or ropes) may not change between trials.',
      'The amplitude (how far back the swing starts) must be kept consistent between trials.',
    ],
    requiredUnits: ['oscillations'],
    difficulty: 3,
  },
];
