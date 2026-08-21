import type { PhysicsCourtAnswer } from './physicsCourtTypes';

// Verdicts, explanations, and every other adjudicated field. Imported only by
// TeacherAnswerPanel and BankBrowser, via a lazy `await import(...)` — see
// BUILD-SPEC.md §3. Never import this module from student-facing components.

export const physicsCourtAnswers: Record<string, PhysicsCourtAnswer> = {
  'PC-KIN-001': {
    verdict: 'always',
    assumptions: [
      'Motion may be in one, two, or three dimensions.',
      'Velocity is nonzero at the instant in question.',
      'Position is a differentiable function of time.',
    ],
    explanation:
      'Speed is |v|, and d|v|/dt = (v·a)/|v|. When v and a are perpendicular, v·a = 0, so the derivative of speed is exactly zero at that instant — speed is momentarily flat.',
    proofSketch:
      'd|v|/dt = (v·a)/|v| by the chain rule applied to |v| = sqrt(v·v). If v·a = 0, the right-hand side is 0.',
    misconception:
      'Students assume "speed not changing" requires the acceleration vector itself to be zero, rather than just its component along the velocity direction.',
    teacherNotes:
      'At a projectile\'s apex, v and a are perpendicular and the speed derivative is zero, but speed is at a local minimum there, not a plateau. A sharp student may raise this — that is a feature of the claim, not a flaw. It is still true that the derivative is zero at that instant.',
  },
  'PC-KIN-002': {
    verdict: 'sometimes',
    assumptions: ['One-dimensional motion.', 'A fixed positive direction is used consistently throughout.'],
    explanation:
      'A positive acceleration only guarantees the velocity is increasing, not that the velocity (and hence displacement) is positive. If the object starts out moving fast enough in the negative direction, it can still be moving backward net over the interval even while continuously slowing that backward motion.',
    counterexample:
      'v0 = -10 m/s, a = +2 m/s^2, over a 1 s interval: displacement = v0*t + 0.5*a*t^2 = -10(1) + 0.5(2)(1)^2 = -9 m, which is negative.',
    misconception:
      'Students treat "speeding up" and "moving forward" as the same fact, missing that a positive acceleration can describe a car slowing its backward motion.',
    validRewrite:
      'If a > 0 throughout the interval and the particle\'s velocity is nonnegative at the start of the interval, its displacement over the interval is positive.',
  },
  'PC-KIN-003': {
    verdict: 'never',
    assumptions: ['Speed is constant and nonzero.', 'Radius is fixed and nonzero.', 'Motion is planar circular motion.'],
    explanation:
      'Centripetal acceleration has magnitude v^2/r, which stays constant and nonzero whenever v and r are nonzero. The direction of the acceleration continuously rotates to keep pointing toward the center, but its magnitude never drops to zero.',
    misconception:
      'Students associate acceleration only with speeding up or slowing down, missing that a continuously changing velocity direction is itself an acceleration. Circular motion is the standard counterexample to any kinematics claim that something "must be zero at some instant."',
    validRewrite: 'The tangential component of the particle\'s acceleration is zero at every instant.',
  },

  'PC-FOR-001': {
    verdict: 'always',
    assumptions: [
      'Forces and motion are analyzed along the horizontal line of motion (component language, not full 2D vector direction).',
      'Any number of forces may act simultaneously.',
    ],
    explanation:
      'If every force acting on the object had a non-negative horizontal component, the net force\'s horizontal component would also be non-negative, which would prevent the object from slowing while moving right. So at least one force must have a leftward (negative) horizontal component.',
    proofSketch:
      'Suppose all forces have x-component >= 0. Then the sum (net force) has x-component >= 0, so a_x >= 0. But moving right while slowing requires a_x < 0. Contradiction, so some force has a leftward component.',
    misconception:
      'Students look for a single named force that visibly "points left," rather than checking whether the vector sum\'s x-component is negative — a force pointing up-and-left still counts, and no individual force need point due left.',
  },
  'PC-FOR-002': {
    verdict: 'sometimes',
    assumptions: ['No other forces act on either object besides the stated interaction pair.', 'Masses may differ.'],
    explanation:
      "Newton's third law guarantees the two interaction forces have equal magnitude, but acceleration is F/m for each object separately. Unless the masses are also equal, the accelerations differ.",
    counterexample:
      'A bowling ball and a ping-pong ball push off each other with equal-magnitude forces (by the third law). Because a = F/m, the much lighter ping-pong ball accelerates far more than the bowling ball.',
    misconception:
      "Students conflate Newton's third law (equal forces) with equal effects, forgetting that a = F/m depends on each object's own mass.",
    validRewrite: 'If the two objects also have equal mass and no other forces act on either one, they have equal acceleration magnitudes.',
  },
  'PC-FOR-003': {
    verdict: 'never',
    assumptions: ['The scale reads the normal force it exerts on the passenger.', 'Only gravity and the normal force act on the passenger.'],
    explanation:
      "Slowing down while descending means the acceleration points upward (opposite the downward velocity). Newton's second law gives N - mg = ma with a pointing up, so N = mg + ma > mg. The scale reads more than the passenger's weight, never less.",
    misconception:
      'Students associate "decelerating in an elevator" with "feeling lighter," pattern-matching to the wrong phase of elevator motion — a downward elevator feels lighter while speeding up, not while slowing down.',
    validRewrite: 'An elevator moving downward while speeding up has a scale that reads less than the passenger\'s true weight.',
  },

  'PC-ENE-001': {
    verdict: 'sometimes',
    assumptions: ['Multiple forces may act simultaneously.', 'Work is computed over the same displacement for each force.'],
    explanation:
      'Net work is the sum of the work done by each individual force. That sum can be zero while individual terms are nonzero and cancel.',
    counterexample:
      'A block slides at constant velocity across a rough floor, pulled by a force equal in magnitude to friction. The net work is zero, but the pulling force does positive work and friction does negative work — neither is individually zero.',
    misconception:
      'Students treat "net" as though it must distribute evenly to zero across every term, instead of as a sum that can hide large canceling pieces.',
    validRewrite: 'If the net work is zero because no force acts, or because every force is perpendicular to the displacement, then every force does zero work.',
  },
  'PC-ENE-002': {
    verdict: 'sometimes',
    assumptions: ['Point-particle model unless the object is explicitly free to rotate.', 'No other energy losses (e.g., heat) occur.'],
    explanation:
      'The work-energy theorem v = sqrt(2W/m) assumes all of the net work becomes translational kinetic energy. An extended body that is free to rotate can bank part of the work as rotational kinetic energy instead, ending up slower translationally than a point mass that received the same work.',
    counterexample:
      'A solid sphere and a point mass of equal total mass each receive the same net work from rest. The sphere, free to spin, converts some of that work into rotational kinetic energy, so its translational speed ends up lower than the point mass\'s speed.',
    misconception:
      'Students apply v = sqrt(2W/m) unconditionally, forgetting that an extended body can store energy in rotation rather than having it all appear as translational kinetic energy.',
    validRewrite: 'If both objects are point particles of equal mass and all of the net work converts to translational kinetic energy, the same net work from rest gives the same final speed.',
  },
  'PC-ENE-003': {
    verdict: 'sometimes',
    assumptions: ['Other forces may also act on the object during the same displacement.'],
    explanation:
      "A single force doing negative work removes energy on its own, but other forces acting at the same time can supply more positive work than that force removes, leaving the net work — and hence the speed change — positive overall.",
    counterexample:
      'A skater is pushed forward by a strong shove while friction (a smaller force) does negative work at the same time; the net work is still positive, so the skater speeds up even though friction alone did negative work.',
    misconception:
      "Students treat the work-energy theorem as applying force-by-force, concluding a speed decrease from any single force's negative work instead of from the net work.",
    validRewrite: 'If that force is the only force acting on the object, its speed decreases when the force does negative work.',
  },

  'PC-MOM-001': {
    verdict: 'sometimes',
    assumptions: ['The two objects may or may not exert forces on each other.'],
    explanation:
      'Conservation of total momentum only requires the sum p1 + p2 to be constant. If the objects interact (e.g., collide or push off each other), momentum transfers between them, so each individual momentum can change even while the total stays fixed.',
    counterexample:
      'Two objects collide and bounce off each other. Their total momentum before and after (and throughout, if no external force acts) is conserved, but each object\'s own momentum changes during the collision.',
    misconception:
      'Students treat "the total is constant" as implying "each part is constant," missing that conservation laws constrain sums, not every term individually.',
    validRewrite: 'If the two objects never exert forces on each other (and no external force acts), each object\'s momentum is separately constant.',
  },
  'PC-MOM-002': {
    verdict: 'sometimes',
    assumptions: ['The system is isolated during the collision (no external impulse).', 'Both objects move along the same line.'],
    explanation:
      'Momentum conservation alone fixes the stationary object\'s final speed in terms of the masses and the mover\'s initial speed. Whether kinetic energy is also conserved (the definition of elastic) depends on whether the masses happen to be equal — it is not guaranteed just because the mover stops.',
    counterexample:
      'If a 2 kg object moving at 6 m/s strikes a stationary object and stops completely, momentum conservation requires the struck object to leave with 12 kg*m/s of momentum. Only when its mass is also 2 kg does its resulting kinetic energy equal the mover\'s initial kinetic energy (the elastic case); for any other mass, kinetic energy is not conserved.',
    misconception:
      'Students treat "the first object stopped" as itself a signature of an elastic collision, when it is really a signature of equal masses combined with momentum conservation.',
    validRewrite: 'The collision was elastic if and only if the two masses are equal.',
  },
  'PC-MOM-003': {
    verdict: 'sometimes',
    assumptions: ['Mass is constant throughout the interval.', 'Only the time-integral (impulse) of the external force over the whole interval is known to be zero.'],
    explanation:
      'Zero net external impulse is a statement about the time-integral of force over the whole interval — it guarantees the center-of-mass velocity is the same at the two endpoints, but says nothing about what happens in between.',
    counterexample:
      'An external force pushes the system to the right during the first half of the interval, then pushes it left with an equal and opposite impulse during the second half. The net impulse over the whole interval is zero, but the center-of-mass velocity clearly changes during the interval — it speeds up, then reverses — even though it returns to its original value at the very end.',
    misconception:
      'Students treat "zero net impulse" (a time-integrated, endpoint statement) as equivalent to "zero net force at every instant" (an instantaneous statement). This is one of the sharpest interval-vs-instant traps in the whole unit.',
    validRewrite: 'If the net external force on the system is zero at every instant throughout the interval — not just its time-integral — the center-of-mass velocity is constant throughout the interval.',
    teacherNotes: 'One of the best claims in the bank for showing interval-vs-instant confusion. Worth slowing down on if a student pushes back.',
  },

  'PC-ROT-001': {
    verdict: 'sometimes',
    assumptions: ['The body is not constrained to a fixed axis.', 'The body is rigid but need not be symmetric about any axis.'],
    explanation:
      'Zero net torque about the center of mass keeps the angular momentum vector L constant, but L = I(omega)*omega only equals a constant multiple of omega when the body rotates about a principal axis with constant moment of inertia. For a general asymmetric body tumbling freely, constant L does not force constant angular velocity — this is the intermediate-axis (tennis-racket) effect.',
    counterexample:
      'A rigid body shaped so its three principal moments of inertia are all different (e.g., a book or a tennis racket), thrown spinning about its intermediate axis, tumbles even though its angular momentum about the center of mass stays perfectly constant with zero net torque.',
    misconception:
      'Students assume "L constant" and "omega constant" are the same fact, which is true only for rotation about a fixed axis or a principal axis of a symmetric body, not for a general tumbling rigid body.',
    validRewrite: 'If the body rotates about a fixed axis (or a principal axis with constant moment of inertia) and experiences zero net torque about that axis, its angular velocity about that axis remains constant.',
    teacherNotes: 'Ship this alongside PC-ROT-002, the fixed-axis companion claim, so students see exactly which assumption flips the verdict.',
  },
  'PC-ROT-002': {
    verdict: 'always',
    assumptions: ['Rotation is about a fixed axis.', 'The moment of inertia about that axis is constant.', 'Net torque about the axis is zero at every instant, not just on average.'],
    explanation:
      'For rotation about a fixed axis with constant moment of inertia I, angular momentum about the axis is L = I*omega. Zero net torque means dL/dt = 0, and since I is constant, that forces omega to be constant — the direct rotational analog of F = 0 implying constant velocity.',
    proofSketch:
      'Torque = dL/dt = I * d(omega)/dt (I constant, fixed axis). If torque = 0 at every instant, d(omega)/dt = 0 at every instant, so omega is constant.',
    misconception:
      'Students think this claim needs the same intermediate-axis caveat as the free-rotation case (PC-ROT-001), missing that fixing the axis and holding I constant is exactly what removes that escape hatch.',
  },
  'PC-ROT-003': {
    verdict: 'sometimes',
    assumptions: ['P is a fixed point.', 'The force may have any magnitude, including zero.'],
    explanation:
      'For a nonzero force, zero torque about P (r x F = 0) does force the line of action through P, since that cross product vanishes only when F is parallel to the vector from P to the point of application. But a force of zero magnitude produces zero torque about every point while having no line of action at all — there is nothing for "passes through P" to mean.',
    counterexample:
      'A force of zero magnitude produces zero torque about any point P, but a zero vector has no direction and therefore no line of action, so the claim "its line of action passes through P" is not meaningfully true or false.',
    misconception:
      'Students treat "zero torque" as always implying a well-defined geometric line of action, forgetting that the zero-force edge case breaks that inference.',
    validRewrite: 'If a nonzero force produces zero torque about P, its line of action passes through P.',
  },
  'PC-ROT-004': {
    verdict: 'sometimes',
    assumptions: ['Rolling without slipping (contact point has zero velocity).', 'The wheel is rigid and circular.'],
    explanation:
      'Rolling without slipping guarantees the contact point has zero velocity, but not zero acceleration. The contact point\'s acceleration is the center\'s acceleration plus the rotational terms alpha x r and omega x (omega x r); the first two can cancel, but the centripetal-like term omega^2 * R pointing toward the center survives whenever omega is nonzero.',
    counterexample:
      'A wheel rolling without slipping at a nonzero, constant angular speed has a contact point with zero velocity but nonzero acceleration of magnitude omega^2 * R, directed toward the wheel\'s center — easiest to see because the contact point must trace a cycloid path with curvature at that instant.',
    misconception:
      'Students conflate "the contact point is momentarily at rest" with "the contact point is momentarily unaccelerated," the same instantaneous-velocity-vs-acceleration confusion that shows up throughout kinematics.',
    validRewrite: 'A wheel that rolls without slipping and is momentarily starting from rest (omega = 0) has a contact point with zero acceleration at that instant.',
  },

  'PC-GRA-001': {
    verdict: 'always',
    assumptions: ['Orbit is circular.', 'Only gravity acts (idealized, no drag).'],
    explanation:
      'Circular motion at constant speed still requires a centripetal acceleration of v^2/r directed toward the planet, because the velocity\'s direction is continuously changing even though its magnitude is not. "Weightless" describes the sensation of free fall, not zero acceleration.',
    proofSketch:
      'Uniform circular motion has acceleration magnitude v^2/r toward the center at every instant; this is nonzero whenever v and r are nonzero, regardless of how the motion feels to an observer inside the orbit.',
    misconception:
      'Students equate the common phrase "weightless" with "not accelerating," when astronauts in orbit are in continuous free fall — nonzero acceleration the whole time.',
  },
  'PC-GRA-002': {
    verdict: 'never',
    assumptions: ['Shell has uniform surface mass density.', 'Point is strictly inside the shell, not at its surface.'],
    explanation:
      'The field inside a uniform shell is exactly zero everywhere inside (by symmetry, or Gauss\'s law for gravity). But potential is the integral of the field from infinity, and it is constant and negative throughout the interior — equal to the potential at the shell\'s surface, not zero. Zero field only forces constant potential, not zero potential.',
    misconception:
      'Students assume field and potential must vanish together, treating potential like a value tied pointwise to the field rather than an integrated quantity that can be nonzero (and constant) exactly where the field is zero.',
    validRewrite: 'The gravitational field is zero everywhere strictly inside a uniform spherical shell.',
  },
  'PC-GRA-003': {
    verdict: 'always',
    assumptions: ['Orbit is circular.', 'Only the two-body gravitational force acts.', 'Potential energy is defined so U = 0 at infinite separation.'],
    explanation:
      'Setting the gravitational force equal to the required centripetal force for a circular orbit fixes a strict algebraic relationship between kinetic and potential energy, which in turn fixes the total energy.',
    proofSketch:
      'GMm/r^2 = mv^2/r gives K = (1/2)mv^2 = GMm/(2r). Since U = -GMm/r = -2K, the total energy E = K + U = K - 2K = -K, and U/2 = -GMm/(2r) = -K = E as well.',
    misconception:
      'Students compute K and U as independent numbers without noticing that a circular orbit forces the fixed relationship U = -2K, so the three quantities E, -K, and U/2 are not independently free to differ.',
  },
  'PC-GRA-004': {
    verdict: 'sometimes',
    assumptions: ['Both orbits are circular.', 'Each satellite orbits under only its own central body\'s gravity.'],
    explanation:
      "Kepler's third law relates period and radius through a constant that depends on the central body's mass: T^2 = (4*pi^2 / (GM)) * r^3. Two satellites orbiting different central masses can match periods at very different radii.",
    counterexample:
      'A satellite orbiting a small asteroid and a satellite orbiting Earth can share the same orbital period while orbiting at very different radii, because the Kepler\'s-third-law constant 4*pi^2/(GM) depends on the central mass M, which differs between the two systems.',
    misconception:
      "Students treat Kepler's third law as a single universal relationship between T and r, forgetting the proportionality constant depends on the central mass.",
    validRewrite: 'If the two satellites orbit the same central mass, the same orbital period implies the same orbital radius.',
  },

  'PC-OSC-001': {
    verdict: 'always',
    assumptions: ['Motion is ideal simple harmonic motion.', 'Equilibrium is at x = 0.'],
    explanation:
      'For SHM, acceleration is a = -omega^2 * x, which is exactly zero at x = 0. Energy conservation (all energy kinetic at x = 0) then forces speed to be at its maximum there.',
    proofSketch:
      'a = -omega^2 * x gives a = 0 at x = 0. Total energy (1/2)k*A^2 = (1/2)k*x^2 + (1/2)m*v^2 gives v^2 maximal exactly when x = 0.',
    misconception:
      'Students sometimes think the restoring force being zero at equilibrium means "nothing is happening" there, missing that this is precisely the instant of maximum speed.',
  },
  'PC-OSC-002': {
    verdict: 'never',
    assumptions: ['The oscillator is an ideal mass-spring system (linear restoring force).', 'Mass and spring constant are unchanged.'],
    explanation:
      'For an ideal mass-spring oscillator, T = 2*pi*sqrt(m/k), which contains no dependence on amplitude at all. Doubling the amplitude leaves the period exactly unchanged.',
    misconception:
      'Students generalize from pendulums or intuition about "bigger swings take longer," but the ideal mass-spring period is amplitude-independent by construction of Hooke\'s law.',
    validRewrite: 'Doubling the amplitude of an ideal mass-spring oscillator leaves its period unchanged.',
  },
  'PC-OSC-003': {
    verdict: 'sometimes',
    assumptions: ['Both systems are ideal mass-spring oscillators.'],
    explanation:
      'Period depends only on the ratio k/m, not on k and m separately, since T = 2*pi*sqrt(m/k). Two systems can share that ratio while having different individual spring constants.',
    counterexample:
      'A system with k = 4 N/m and m = 1 kg has the same period as a system with k = 16 N/m and m = 4 kg, since k/m = 4 in both cases, but the spring constants differ.',
    misconception:
      'Students assume period determines each parameter individually, rather than only the ratio k/m.',
    validRewrite: 'If the two systems also have equal mass, the same period implies the same spring constant.',
  },
  'PC-OSC-004': {
    verdict: 'sometimes',
    assumptions: ['Motion is ideal simple harmonic motion.', 'The instant in question is not the equilibrium or turning point, where one vector is momentarily zero.'],
    explanation:
      'Velocity and acceleration are antiparallel while the object moves away from equilibrium (acceleration always points back toward equilibrium, opposing outward motion) and parallel while the object moves back toward equilibrium.',
    counterexample:
      'Release an ideal SHM object from x = +A (at rest). As it moves back toward equilibrium, velocity points toward equilibrium and acceleration also points toward equilibrium (both in the same direction) — they are parallel there, not opposite.',
    misconception:
      'Students memorize "velocity and acceleration are opposite in SHM" from the outward-moving half of the cycle and apply it unconditionally to the whole cycle.',
    validRewrite: 'While the object moves away from equilibrium during ideal SHM, its velocity and acceleration point in opposite directions.',
  },
};
