import type { ExperimentalDesignAnswer } from './experimentalDesignTypes';

// Imported only by TeacherAnswerPanel and BankBrowser via a lazy import — see
// BUILD-SPEC.md §3. Never import this module from student-facing components.

export const experimentalDesignAnswers: Record<string, ExperimentalDesignAnswer> = {
  'ED-RES-001': {
    possibleApproaches: [
      'Drop the ball from a measured height and directly measure the maximum rebound height with the meter stick (or by eye against a marked backdrop); the coefficient of restitution is sqrt(h_rebound / h_drop).',
      'Drop the ball from a measured height and time the interval between the first and second bounce; use free-fall timing on that interval to back out the rebound height instead of measuring it directly.',
    ],
    majorPitfalls: [
      'Measuring drop height from the wrong reference point (bottom of the ball vs. the tabletop).',
      'A single trial with no repeats or averaging.',
      "Not accounting for the ball's spin or an uneven floor.",
    ],
  },
  'ED-KIN-001': {
    possibleApproaches: [
      'Time the whole descent and divide the total ramp distance by the total time to get the average speed over the whole run.',
      'Mark two points partway down the ramp, time only the interval between them, and divide that segment\'s distance by its time.',
    ],
    majorPitfalls: [
      'Starting the stopwatch late relative to the release.',
      'A single trial with no repeats.',
      'Reporting a segment speed as if it were the average speed over the whole ramp, or vice versa.',
    ],
  },
  'ED-MAS-001': {
    possibleApproaches: [
      'Lever/torque method: place a fulcrum (such as a rod) under the table near one end and use a scale to measure the upward force needed at the far end to just begin lifting that end (a partial-lift torque balance); solve for the total weight from the lever-arm ratio without ever supporting the table\'s full weight.',
      'Tipping-point method: slowly lift one edge of the table and use a scale to measure the applied force at that edge at the exact angle where the table is on the verge of tipping about its far edge; combine with the measured geometry to solve for the mass via a torque balance about the pivot edge.',
    ],
    majorPitfalls: [
      "Accidentally supporting the table's full weight while measuring (this is disallowed).",
      'Measuring force at the wrong lever arm — it must be the perpendicular distance from the pivot, not the distance along the table surface.',
      'Assuming the mass is distributed uniformly without any justification.',
      'No repeated trials.',
    ],
  },
  'ED-PRJ-001': {
    possibleApproaches: [
      'Projectile-range method: measure the launch height, horizontal range, and total flight time; use kinematics to reconstruct the initial velocity components and compute the average speed.',
      'Catch-and-conserve-momentum method: have the ball land in and stick to a known, freely-moving object (a cart, or a hanging pendulum bob); measure that object\'s motion immediately after the catch and use momentum conservation to back out the ball\'s speed just before impact.',
    ],
    majorPitfalls: [
      'Attempting to time or track the ball mid-flight by eye (explicitly banned).',
      'Reporting the horizontal speed component as if it were the total average speed, or vice versa.',
      'Ignoring a difference between launch height and landing height.',
    ],
  },
  'ED-GRV-001': {
    possibleApproaches: [
      'Free-fall timing: drop an object from a measured height, time the fall, and use h = (1/2) g t^2.',
      'Simple pendulum: measure the pendulum length and its period of small oscillations, and use T = 2*pi*sqrt(L/g).',
      'Static spring extension: hang a known mass on a spring of known (or separately measured) spring constant and measure the equilibrium stretch, using mg = kx.',
      'Inclined-plane acceleration: measure the acceleration of an object sliding down a known-angle, low-friction incline and relate it to g via a = g sin(theta).',
      'Atwood machine: connect two different known masses over a pulley, measure the acceleration of the system, and solve for g from the mass difference and the measured acceleration.',
    ],
    majorPitfalls: [
      'Not accounting for air resistance or friction in a method sensitive to it.',
      'No repeated trials or averaging.',
      'Labeling a method\'s known systematic error as "human error."',
      "Relying on equipment another group in the room wouldn't also have access to.",
    ],
    teacherNotes: 'At least four genuinely different methods, spanning kinematics, oscillations, forces (springs), and dynamics — not four variations on timing a fall.',
  },
  'ED-ROT-001': {
    possibleApproaches: [
      'Torsion-pendulum method: suspend the object from a torsion fiber or rod of known torsional stiffness about the specified axis, measure its oscillation period, and use the torsional-oscillator period relationship to solve for the moment of inertia.',
      'Physical (compound) pendulum method: pivot the object about an axis parallel to the specified one, at a measured distance from the center of mass; measure the period of small oscillations and combine the physical-pendulum period formula with the parallel-axis theorem to solve for the moment of inertia about the center of mass.',
    ],
    majorPitfalls: [
      'Assuming the object is a simple shape and using a textbook formula instead of measuring it.',
      'Ignoring the parallel-axis correction when pivoting about an axis other than the one specified.',
      'Letting the oscillation amplitude grow too large for the small-angle approximation to hold.',
    ],
  },
  'ED-PWR-001': {
    possibleApproaches: [
      "Measure the student's total mass (including anything carried) on a scale beforehand, measure the staircase's total vertical height climbed, time the climb with a stopwatch, and compute M directly from its definition.",
      'Repeat the timed climb several times and average the time, to reduce the effect of timing error on the computed M.',
    ],
    majorPitfalls: [
      "Forgetting to include a carried backpack's mass in \"mass.\"",
      "Measuring the staircase's slanted length instead of the vertical height climbed.",
      'A single, untimed, or unrepeated trial.',
    ],
    teacherNotes:
      'M is just average power (mgh/t) under an unfamiliar name — say so explicitly rather than pretending it is a novel quantity. The follow-up is the real content: two students carrying the same backpack up the same stairs in the same time do NOT necessarily have the same M, because M depends on each student\'s total mass (their own body plus the backpack), not on the backpack alone.',
  },
};
