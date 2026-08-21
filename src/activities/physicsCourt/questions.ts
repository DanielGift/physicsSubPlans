import type { PhysicsCourtQuestion } from './physicsCourtTypes';

// Student-safe fields only. Verdicts, explanations, and every other adjudicated
// field live in the answer key module and must never be imported here (see BUILD-SPEC.md §3).

export const physicsCourtQuestions: PhysicsCourtQuestion[] = [
  // Kinematics
  {
    id: 'PC-KIN-001',
    setup: 'A particle moves along some path with a differentiable position function and nonzero velocity.',
    claim: 'At an instant when the velocity and acceleration vectors are perpendicular, the speed is neither increasing nor decreasing at that instant.',
    requiredUnits: ['kinematics'],
    topicTags: ['vectors', 'derivatives'],
    difficulty: 4,
    requiresCalculus: true,
  },
  {
    id: 'PC-KIN-002',
    setup: 'A particle moves along a line. Over some time interval, its acceleration is positive at every instant in the interval.',
    claim: "The particle's displacement over that interval is positive.",
    requiredUnits: ['kinematics'],
    topicTags: ['1D motion'],
    difficulty: 3,
  },
  {
    id: 'PC-KIN-003',
    setup: 'A particle moves at constant speed around a circle of fixed, nonzero radius.',
    claim: "The particle's acceleration is zero at some instant.",
    requiredUnits: ['kinematics'],
    topicTags: ['circular motion'],
    difficulty: 3,
  },

  // Forces
  {
    id: 'PC-FOR-001',
    setup: 'An object moves to the right while its speed is decreasing.',
    claim: 'At least one force acting on the object has a leftward component.',
    requiredUnits: ['forces'],
    topicTags: ['vectors', 'Newton\'s second law'],
    difficulty: 3,
  },
  {
    id: 'PC-FOR-002',
    setup: 'Two objects exert equal-magnitude forces on each other (a Newton\'s-third-law pair).',
    claim: 'The two objects have equal acceleration magnitudes.',
    requiredUnits: ['forces'],
    topicTags: ["Newton's third law"],
    difficulty: 3,
  },
  {
    id: 'PC-FOR-003',
    setup: 'A passenger stands on a scale inside an elevator that is moving downward while slowing down.',
    claim: "The scale reads less than the passenger's true weight.",
    requiredUnits: ['forces'],
    topicTags: ['normal force', 'apparent weight'],
    difficulty: 4,
  },

  // Energy
  {
    id: 'PC-ENE-001',
    setup: 'The net work done on an object over some displacement is zero.',
    claim: 'Every individual force acting on the object does zero work over that displacement.',
    requiredUnits: ['energy'],
    topicTags: ['work'],
    difficulty: 3,
  },
  {
    id: 'PC-ENE-002',
    setup: 'Two objects, initially at rest, each receive the same amount of net work.',
    claim: 'The two objects have the same final speed.',
    requiredUnits: ['energy', 'rotation'],
    topicTags: ['work-energy theorem', 'rotational energy'],
    difficulty: 4,
  },
  {
    id: 'PC-ENE-003',
    setup: 'One particular force acting on an object does negative work over some displacement.',
    claim: "The object's speed decreases over that displacement.",
    requiredUnits: ['energy'],
    topicTags: ['work'],
    difficulty: 3,
  },

  // Momentum
  {
    id: 'PC-MOM-001',
    setup: 'The total momentum of a two-object system is constant over some time interval.',
    claim: "Each object's individual momentum is constant over that interval.",
    requiredUnits: ['momentum'],
    topicTags: ['conservation'],
    difficulty: 3,
  },
  {
    id: 'PC-MOM-002',
    setup: 'A moving object strikes an initially stationary object and comes to a complete stop; the stationary object moves off.',
    claim: 'The collision was elastic.',
    requiredUnits: ['momentum'],
    topicTags: ['collisions'],
    difficulty: 4,
  },
  {
    id: 'PC-MOM-003',
    setup: 'A constant-mass system experiences zero net external impulse over some time interval.',
    claim: 'The center-of-mass velocity of the system is constant throughout that interval.',
    requiredUnits: ['momentum'],
    topicTags: ['impulse', 'center of mass'],
    difficulty: 5,
    requiresCalculus: true,
  },

  // Rotation
  {
    id: 'PC-ROT-001',
    setup: 'A rigid body is free to rotate about any axis (not constrained to a fixed axis) and experiences zero net torque about its center of mass.',
    claim: "The body's angular velocity remains constant.",
    requiredUnits: ['rotation'],
    topicTags: ['angular momentum'],
    difficulty: 5,
  },
  {
    id: 'PC-ROT-002',
    setup: 'A rigid body rotates about a fixed axis. The net torque about that axis is zero at every instant.',
    claim: "The body's angular velocity about that axis is constant.",
    requiredUnits: ['rotation'],
    topicTags: ['fixed-axis rotation'],
    difficulty: 3,
  },
  {
    id: 'PC-ROT-003',
    setup: 'A force acting on a rigid body produces zero torque about a point P.',
    claim: "The force's line of action passes through P.",
    requiredUnits: ['rotation'],
    topicTags: ['torque'],
    difficulty: 4,
  },
  {
    id: 'PC-ROT-004',
    setup: 'A wheel rolls without slipping on a stationary surface.',
    claim: 'The point of the wheel currently touching the surface has zero acceleration.',
    requiredUnits: ['rotation'],
    topicTags: ['rolling motion'],
    difficulty: 5,
  },

  // Gravitation
  {
    id: 'PC-GRA-001',
    setup: 'An astronaut is in a circular orbit around a planet.',
    claim: 'The astronaut is accelerating.',
    requiredUnits: ['gravitation'],
    topicTags: ['orbits'],
    difficulty: 3,
  },
  {
    id: 'PC-GRA-002',
    setup: 'A point lies strictly inside a uniform, hollow spherical shell of mass, at a location where the shell\'s gravitational field is zero.',
    claim: "The gravitational potential at that point (due to the shell) is zero.",
    requiredUnits: ['gravitation'],
    topicTags: ['shell theorem', 'potential'],
    difficulty: 5,
    requiresCalculus: true,
  },
  {
    id: 'PC-GRA-003',
    setup: 'A body is in a circular orbit under gravity alone, with potential energy defined so U = 0 at infinite separation.',
    claim: "The body's total mechanical energy equals both $-K$ and $U/2$.",
    requiredUnits: ['gravitation'],
    topicTags: ['orbital energy'],
    difficulty: 4,
  },
  {
    id: 'PC-GRA-004',
    setup: 'Two satellites, each in its own circular orbit (possibly around different central bodies), have the same orbital period.',
    claim: 'The two satellites have the same orbital radius.',
    requiredUnits: ['gravitation'],
    topicTags: ["Kepler's third law"],
    difficulty: 3,
  },

  // Oscillations
  {
    id: 'PC-OSC-001',
    setup: 'An object undergoes ideal simple harmonic motion and passes through the equilibrium position.',
    claim: 'At that instant, its acceleration is zero and its speed is at a maximum.',
    requiredUnits: ['oscillations'],
    topicTags: ['SHM'],
    difficulty: 3,
  },
  {
    id: 'PC-OSC-002',
    setup: 'The amplitude of an ideal mass-spring oscillator is doubled, with the spring constant and mass unchanged.',
    claim: 'The period of oscillation doubles.',
    requiredUnits: ['oscillations'],
    topicTags: ['SHM', 'period'],
    difficulty: 3,
  },
  {
    id: 'PC-OSC-003',
    setup: 'Two ideal mass-spring systems have the same period of oscillation.',
    claim: 'The two systems have the same spring constant.',
    requiredUnits: ['oscillations'],
    topicTags: ['SHM', 'period'],
    difficulty: 3,
  },
  {
    id: 'PC-OSC-004',
    setup: 'An object undergoes ideal simple harmonic motion.',
    claim: 'At a given instant, its velocity and acceleration point in opposite directions.',
    requiredUnits: ['oscillations'],
    topicTags: ['SHM', 'vectors'],
    difficulty: 4,
  },
];
