import type { PhysicsCourtAnswer } from './physicsCourtTypes';

// Verdicts, explanations, and every other adjudicated field. Imported only by
// PhysicsCourtConclusion, via a lazy `await import(...)` — see BUILD-SPEC.md §3. Never
// import this module from the presentation/question-rendering code.

export const physicsCourtAnswers: Record<string, PhysicsCourtAnswer> = {
  // ===== Kinematics =====
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
  'PC-KIN-004': {
    verdict: 'always',
    assumptions: ['One-dimensional motion.', 'Position is differentiable on the interval.', 'The interval is open (or the argument applies to its interior).'],
    explanation:
      'A positive derivative at every point of an interval means the function is strictly increasing on that interval — this is a direct consequence of the mean value theorem.',
    proofSketch:
      'For any t1 < t2 in the interval, the mean value theorem gives x(t2) - x(t1) = v(c)(t2 - t1) for some c between them. Since v(c) > 0 and t2 - t1 > 0, x(t2) > x(t1).',
    misconception:
      'Students sometimes think "positive velocity" only guarantees the position increases "on average," rather than realizing strict positivity at every instant forces strict monotonicity of the position itself.',
  },
  'PC-KIN-005': {
    verdict: 'sometimes',
    assumptions: ['One-dimensional motion.', 'A fixed positive direction is used consistently throughout.'],
    explanation:
      '"Velocity increasing" is a statement about the derivative of velocity (i.e., positive acceleration) — it says the velocity is becoming a larger number, not that the velocity itself is positive. A velocity can increase while remaining negative the whole time, which means the particle is moving in the negative direction throughout.',
    counterexample:
      'A car moving in the negative direction has its velocity change from -8 m/s to -2 m/s over an interval. The velocity is increasing (-2 > -8), but the car moves in the negative direction throughout, never the positive direction.',
    misconception:
      'Students conflate "increasing" (getting numerically larger, including becoming less negative) with "positive," the same sign-vs-derivative confusion that appears throughout this unit.',
    validRewrite:
      'If the particle\'s velocity is increasing throughout the interval AND is nonnegative at the start of the interval, the particle moves in the positive direction throughout.',
  },
  'PC-KIN-006': {
    verdict: 'never',
    assumptions: ['One-dimensional motion.', 'Position is differentiable on the interval.', '"Increasing" refers to the instant-by-instant (derivative) sense.'],
    explanation:
      'If velocity changed sign at some instant strictly inside the interval, speed (|v|) would equal zero at that instant. For speed to be strictly increasing across the whole interval, every earlier value of speed must be less than every later value — but a speed of exactly zero at an interior instant, with positive speed on both sides of it, means speed decreased into that instant and then increased out of it. That contradicts strict increase across the entire interval.',
    misconception:
      'Students picture a ball thrown straight up and caught (velocity does change sign, at the top) and think this contradicts the claim, without checking that the ball\'s speed there is not strictly increasing throughout the whole flight — it decreases to zero on the way up first.',
    validRewrite: "If a particle's velocity changes sign at some instant during a time interval, its speed is not strictly increasing throughout that interval.",
  },
  'PC-KIN-007': {
    verdict: 'always',
    assumptions: ['No air resistance.', 'Gravity is uniform.', 'The projectile returns to exactly the same height it was launched from.'],
    explanation:
      "The horizontal velocity component never changes. The vertical velocity component satisfies vy^2 = vy0^2 - 2g(Δy); at the same height, Δy = 0, so vy^2 = vy0^2 — the vertical component returns to the same magnitude (with reversed direction). Since both components return to their original magnitudes, the total speed (which depends only on the magnitudes) is unchanged.",
    proofSketch:
      "vx is constant throughout. vy^2 = vy0^2 - 2gΔy, and Δy = 0 at the same height, so vy^2 = vy0^2. Speed^2 = vx^2 + vy^2 is therefore the same at launch and at return to that height.",
    misconception:
      'Students think a projectile "loses energy" or "slows down permanently" as it rises, without recognizing that speed is fully recovered once it returns to the same height — only altitude change permanently trades speed for height, not time elapsed.',
  },
  'PC-KIN-008': {
    verdict: 'sometimes',
    assumptions: ['No air resistance.', 'Gravity is uniform and acts only vertically.'],
    explanation:
      'At the top of the trajectory, the vertical velocity component is momentarily zero (that is what "top" means). But the horizontal velocity component is unaffected by gravity and keeps whatever value it had at launch. Only when that horizontal component is itself zero — i.e., the object was launched straight up with no horizontal motion — is the total velocity zero at the top.',
    counterexample:
      'A ball launched at 30° above the horizontal keeps its horizontal velocity component unchanged throughout the flight. At the top of its arc, the vertical component is zero, but the horizontal component is not — so the total velocity is horizontal and nonzero, not zero.',
    misconception:
      'Students carry over the 1D "thrown straight up" case, where velocity really is zero at the top, into the general 2D case without checking whether there is a horizontal component to begin with — a direct instance of the classic 1D-vs-2D trap.',
    validRewrite: "At the top of its trajectory, the particle's vertical velocity component is zero.",
  },
  'PC-KIN-009': {
    verdict: 'sometimes',
    assumptions: ['Motion may be in two or three dimensions.', '"Same speed" means the same magnitude of velocity, not necessarily the same direction.'],
    explanation:
      'Matching speeds only constrains how fast each particle moves, not which way. If the two particles move in different directions while sharing the same speed at every instant, they trace different paths and end up in different places, even though they started together.',
    counterexample:
      'Two particles leave the same point at t = 0, both moving at a constant speed v. One moves in a straight line; the other moves in a circle. Both have speed v at every instant, but they immediately diverge in position, since their velocity directions differ.',
    misconception:
      'Students conflate "same speed" (a scalar, magnitude only) with "same velocity" (a vector, magnitude and direction), missing that position depends on the full vector history, not just the magnitude.',
    validRewrite: 'If the two particles have the same velocity vector — not just the same speed — at every instant after t = 0, they are at the same position at every instant after t = 0.',
  },
  'PC-KIN-010': {
    verdict: 'never',
    assumptions: ['One-dimensional motion.', 'The acceleration is exactly constant and nonzero over all time under consideration.'],
    explanation:
      'With constant acceleration a ≠ 0, velocity is the linear function v(t) = v0 + at. A linear function with nonzero slope is one-to-one (injective): it can take any particular value, including zero, at most once.',
    misconception:
      'Students picture scenarios like a ball thrown up and caught, where velocity is zero once at the top, and imagine a longer flight might make it zero twice — but this "up and down" story actually only has constant acceleration during free flight, and even then, v(t) = v0 - gt is still linear and crosses zero exactly once.',
    validRewrite: 'A particle moving along a straight line with nonzero, constant acceleration has its velocity equal to zero at exactly one instant (over all time).',
  },

  // ===== Forces =====
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
  'PC-FOR-004': {
    verdict: 'always',
    assumptions: ['Orbit is circular.', 'Only gravity acts (idealized, no drag).'],
    explanation:
      'Circular motion at constant speed still requires a centripetal acceleration of v^2/r directed toward the planet, because the velocity\'s direction is continuously changing even though its magnitude is not. "Weightless" describes the sensation of free fall, not zero acceleration.',
    proofSketch:
      'Uniform circular motion has acceleration magnitude v^2/r toward the center at every instant; this is nonzero whenever v and r are nonzero, regardless of how the motion feels to an observer inside the orbit.',
    misconception:
      'Students equate the common phrase "weightless" with "not accelerating," when astronauts in orbit are in continuous free fall — nonzero acceleration the whole time. Gravity here is the force producing that acceleration, which is why this claim lives with Forces rather than a separate "gravitation" unit.',
  },
  'PC-FOR-005': {
    verdict: 'sometimes',
    assumptions: ['Both orbits are circular.', 'Each satellite orbits under only its own central body\'s gravity.'],
    explanation:
      "Kepler's third law relates period and radius through a constant that depends on the central body's mass: T^2 = (4*pi^2 / (GM)) * r^3. This falls directly out of setting the gravitational force equal to the required centripetal force (Newton's second law). Two satellites orbiting different central masses can match periods at very different radii.",
    counterexample:
      'A satellite orbiting a small asteroid and a satellite orbiting Earth can share the same orbital period while orbiting at very different radii, because the Kepler\'s-third-law constant 4*pi^2/(GM) depends on the central mass M, which differs between the two systems.',
    misconception:
      "Students treat Kepler's third law as a single universal relationship between T and r, forgetting the proportionality constant depends on the central mass.",
    validRewrite: 'If the two satellites orbit the same central mass, the same orbital period implies the same orbital radius.',
  },
  'PC-FOR-006': {
    verdict: 'always',
    assumptions: ['Exactly three forces act on the object, all nonzero.', 'The net force on the object is zero.'],
    explanation:
      'Equilibrium means F1 + F2 + F3 = 0, which is exactly the vector condition for three vectors, placed tip-to-tail in any order, to close back up into a triangle with no gap.',
    proofSketch:
      'F1 + F2 + F3 = 0 means F3 = -(F1 + F2). Drawing F1, then F2 starting where F1 ended, the vector from the start of F1 to the end of F2 is F1 + F2 = -F3. Drawing F3 from there exactly closes the loop back to the starting point.',
    misconception:
      'Students think a closed triangle requires the three forces to have some special relationship like equal magnitudes, rather than recognizing any three vectors that sum to zero will close up, regardless of their individual magnitudes.',
  },
  'PC-FOR-007': {
    verdict: 'sometimes',
    assumptions: ['The block remains at rest (static friction, not kinetic).', 'The applied force is horizontal.'],
    explanation:
      'Static friction is not a fixed value — it adjusts to whatever magnitude is needed to keep the object in equilibrium, up to some maximum. As long as the applied force does not exceed that maximum, friction simply matches the applied force, which can be far less than the maximum.',
    counterexample:
      'A block with maximum static friction of 10 N is pushed with only 2 N. The block does not move, and the friction force is exactly 2 N — matching the applied force, not the 10 N maximum.',
    misconception:
      'Students treat "not moving" as synonymous with "friction is at its limit," rather than recognizing static friction is a responsive force that matches whatever is needed for equilibrium, only capping out at a maximum when pushed hard enough.',
    validRewrite: 'If the block is on the verge of slipping, the applied force equals the maximum possible static friction force.',
  },
  'PC-FOR-008': {
    verdict: 'never',
    assumptions: ['Mass is constant.', 'The velocity is truly constant (not just momentarily matching the direction of motion).'],
    explanation:
      "Constant velocity means zero acceleration, so by Newton's second law the net force must be exactly zero. A net force that points in the direction of motion — even a small one — would cause the object to speed up, contradicting constant velocity.",
    misconception:
      "This is the classic Aristotelian intuition that motion requires a continuously applied net force in the direction of travel, rather than recognizing constant-velocity motion is precisely what zero net force produces.",
    validRewrite: 'An object of constant mass moving in a straight line at a constant, nonzero velocity has zero net force acting on it.',
  },
  'PC-FOR-009': {
    verdict: 'sometimes',
    assumptions: ['Only gravity, the normal force, and the rope tension act on the block.', 'The incline is rigid.'],
    explanation:
      'N = mg cos(θ) only follows from balancing forces perpendicular to the incline surface, and that balance depends on every other force having zero component in that perpendicular direction. If the rope pulls at any angle other than parallel to the incline surface, its perpendicular component changes what N must be to keep the net perpendicular force at whatever it needs to be (zero, if the block stays on the surface).',
    counterexample:
      'If the rope is horizontal rather than parallel to the incline, it has a component perpendicular to the incline surface. That component adds to or subtracts from gravity\'s perpendicular component, so the normal force needed to balance them is no longer simply mg cos(θ).',
    misconception:
      'Students memorize N = mg cos(θ) as a fixed formula for "a block on an incline," without checking that it specifically requires every other force (here, the rope) to have zero component perpendicular to the incline.',
    validRewrite: 'If the rope pulls exactly parallel to the incline surface, the normal force on the block equals mg cos(θ).',
  },
  'PC-FOR-010': {
    verdict: 'always',
    assumptions: [
      'No relative sliding between the two blocks (static friction between them).',
      'The floor beneath the bottom block is frictionless.',
      'The only horizontal contact the top block has is with the block beneath it.',
    ],
    explanation:
      "The top block is not touched by the applied force directly — its only horizontal contact is with the block below it. By Newton's second law, whatever horizontal force is needed to give the top block its (shared) acceleration must come entirely from that one contact, which is friction.",
    proofSketch:
      "The top block has exactly one horizontal force acting on it: friction from the block beneath. Newton's second law for the top block alone is F_friction = m_top * a, where a is the common acceleration of both blocks — friction alone supplies exactly this.",
    misconception:
      'Students imagine the applied push somehow "passes through" to the top block directly, rather than recognizing forces only act through actual points of contact — the top block only ever feels the push indirectly, transmitted via friction from the block beneath it.',
  },

  // ===== Energy =====
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
  'PC-ENE-004': {
    verdict: 'never',
    assumptions: ['Shell has uniform surface mass density.', 'Point is strictly inside the shell, not at its surface.'],
    explanation:
      'The field inside a uniform shell is exactly zero everywhere inside (by symmetry, or Gauss\'s law for gravity). But potential is the integral of the field from infinity, and it is constant and negative throughout the interior — equal to the potential at the shell\'s surface, not zero. Zero field only forces constant potential, not zero potential.',
    misconception:
      'Students assume field and potential must vanish together, treating potential like a value tied pointwise to the field rather than an integrated quantity that can be nonzero (and constant) exactly where the field is zero.',
    validRewrite: 'The gravitational field is zero everywhere strictly inside a uniform spherical shell.',
  },
  'PC-ENE-005': {
    verdict: 'always',
    assumptions: ['Orbit is circular.', 'Only the two-body gravitational force acts.', 'Potential energy is defined so U = 0 at infinite separation.'],
    explanation:
      'Setting the gravitational force equal to the required centripetal force for a circular orbit fixes a strict algebraic relationship between kinetic and potential energy, which in turn fixes the total energy.',
    proofSketch:
      'GMm/r^2 = mv^2/r gives K = (1/2)mv^2 = GMm/(2r). Since U = -GMm/r = -2K, the total energy E = K + U = K - 2K = -K, and U/2 = -GMm/(2r) = -K = E as well.',
    misconception:
      'Students compute K and U as independent numbers without noticing that a circular orbit forces the fixed relationship U = -2K, so the three quantities E, -K, and U/2 are not independently free to differ.',
  },
  'PC-ENE-006': {
    verdict: 'sometimes',
    assumptions: ['The surface is frictionless.', 'The block stays in contact with the spring until the spring reaches its natural length.'],
    explanation:
      'An ideal, massless spring would convert all of its stored elastic potential energy into the block\'s kinetic energy. But a real spring with mass also has its own coils accelerating as it decompresses, and that motion carries some kinetic energy that never reaches the block.',
    counterexample:
      'If the spring itself has mass, some of the elastic potential energy converts into the spring\'s own kinetic energy (its coils are also moving as it decompresses), so the block receives less than the full amount.',
    misconception:
      'Students treat "ideal massless spring" as an automatic default rather than an explicit assumption — it is exactly that assumption doing the work here, and a real spring keeps some energy for itself.',
    validRewrite: 'If the spring is idealized as massless, all of its stored elastic potential energy converts into the block\'s kinetic energy.',
  },
  'PC-ENE-007': {
    verdict: 'always',
    assumptions: ['No air resistance.', 'h is the net drop in height, regardless of the path taken or the initial direction of throw.'],
    explanation:
      'Mechanical energy is conserved with gravity as the only force doing work. Dropping a net height h always releases exactly mgh of potential energy into kinetic energy, no matter which direction the ball was initially thrown.',
    proofSketch:
      'KE_f + U_f = KE_i + U_i, and U_i - U_f = mgh since the height drops by h. Rearranging gives KE_f = KE_i + mgh, which is strictly greater than KE_i since h > 0.',
    misconception:
      'Students think the initial throwing direction (straight up, straight down, or sideways) changes the final kinetic energy, when energy conservation guarantees the same gain of mgh regardless of path, as long as the net height drop is h.',
  },
  'PC-ENE-008': {
    verdict: 'sometimes',
    assumptions: ['The path is closed (start = end point).', 'Only the stated conservative force is under discussion.'],
    explanation:
      'Every conservative force does zero net work on any closed path — that is essentially the definition of "conservative," and it is true regardless of the path\'s shape or the force\'s direction along the way. So the premise carries no information about direction. Whether the conclusion (perpendicular everywhere) happens to hold depends entirely on the specific path.',
    counterexample:
      'An object moves around a vertical circle under uniform gravity. The net work over the closed loop is zero (as it is for any conservative force on any closed path), but at the top and bottom of the circle, gravity points directly along the velocity direction — parallel or antiparallel, not perpendicular.',
    misconception:
      'Students treat "zero net work on a closed path" as informative about direction, when it is true of every conservative force on every closed path regardless of geometry — it says nothing by itself about perpendicularity.',
    validRewrite: 'An object moves in a horizontal circle under uniform gravity — gravity is perpendicular to the object\'s velocity at every point along that closed path.',
    teacherNotes: 'The premise is uninformative (true of all conservative forces); the interesting content is that the conclusion is sometimes achievable (horizontal circle) and sometimes not (vertical circle).',
  },

  // ===== Momentum =====
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
    teacherNotes: 'One of the best claims in the bank for showing interval-vs-instant confusion. Worth slowing down on if a student pushes back. Ship it alongside PC-MOM-008, its always-true companion, so students see exactly which assumption flips the verdict.',
  },
  'PC-MOM-004': {
    verdict: 'always',
    assumptions: ['The system\'s total mass is constant over the interval.', 'The stated force is constant, and no other external force acts.'],
    explanation:
      'This is the impulse-momentum theorem: Newton\'s second law in the form F_net = dp/dt. Integrating a constant force over the interval gives the change in momentum directly.',
    proofSketch:
      'F_net = dp/dt. If F_net is constant over [0, Δt], integrating both sides gives p(Δt) - p(0) = F_net * Δt.',
    misconception:
      'Students think this only applies to a single point particle, forgetting it holds for the total momentum of any system — including several interacting objects — as long as every external force is accounted for.',
  },
  'PC-MOM-005': {
    verdict: 'never',
    assumptions: ['The objects have nonzero relative velocity immediately before the collision.', 'No external forces act during the brief collision (momentum is conserved).'],
    explanation:
      'Sticking together forces both objects to share one common final velocity. Momentum conservation fixes that common velocity to be the center-of-mass velocity. Because the objects had different velocities beforehand, forcing them to a common velocity necessarily removes kinetic energy associated with their relative motion — this loss is unavoidable and strictly positive whenever there is initial relative motion, regardless of the mass ratio.',
    misconception:
      'Students think a special mass ratio (e.g., very unequal masses) might avoid this loss, not realizing the loss depends on the relative velocity being absorbed, which always costs kinetic energy in a perfectly inelastic collision by definition.',
    validRewrite: 'If the two objects already share the same velocity before "colliding" (zero relative velocity), sticking together trivially conserves kinetic energy, since nothing changes.',
  },
  'PC-MOM-006': {
    verdict: 'sometimes',
    assumptions: ['The system is isolated (no external horizontal forces) during the collision.'],
    explanation:
      'Momentum conservation along both axes is automatic for any isolated collision, elastic or not — it follows from Newton\'s third law alone and says nothing about whether kinetic energy is also conserved. Elasticity is an independent, additional condition.',
    counterexample:
      'A perfectly inelastic 2D collision (the objects stick together) also conserves momentum along both the x- and y-axes — momentum conservation holds for any isolated collision — but it loses kinetic energy, so it is not elastic.',
    misconception:
      'Students treat momentum conservation, which is automatic for any isolated collision, as if it were evidence for elasticity, when elasticity specifically requires kinetic energy conservation as well.',
    validRewrite: 'If the collision also conserves total kinetic energy, it is elastic.',
  },
  'PC-MOM-007': {
    verdict: 'sometimes',
    assumptions: ['No external forces act during the explosion.', 'Exactly two fragments result.'],
    explanation:
      'Momentum conservation from rest requires m1*v1 = m2*v2 in magnitude (equal and opposite momenta), not equal speeds. Speeds are equal only when the two masses happen to be equal.',
    counterexample:
      'An object of unequal-mass fragments splits from rest: momentum conservation gives m1*v1 = m2*v2 (equal and opposite momenta), so the lighter fragment moves faster and the heavier one slower — equal speeds only occur when the masses happen to be equal.',
    misconception:
      'Students apply intuitive symmetry ("it exploded evenly") without checking whether the masses are actually equal, conflating equal-and-opposite momentum with equal speed.',
    validRewrite: 'If the two fragments have equal mass, they move off with equal speeds.',
  },
  'PC-MOM-008': {
    verdict: 'always',
    assumptions: ['The system\'s total mass is constant.', 'Truly no external forces act at any instant — a stronger condition than just zero net impulse over an interval.'],
    explanation:
      'Internal forces occur in Newton\'s-third-law pairs (equal and opposite), so they always cancel when summed over the whole system. With zero net external force at every instant, the center of mass has zero acceleration at every instant, so its velocity is constant.',
    proofSketch:
      'Summing Newton\'s second law over every particle in the system, all internal force pairs cancel (third law), leaving F_external = M * a_cm. If F_external = 0 at every instant, a_cm = 0 at every instant, so v_cm is constant.',
    misconception:
      'Students conflate this with the weaker, only-sometimes-true claim about zero net impulse over an interval (PC-MOM-003) — here the premise is much stronger (no external force at any instant), which is exactly what removes that loophole.',
    teacherNotes: 'Ship this alongside PC-MOM-003 so students see exactly which assumption (instant-by-instant vs. interval) flips the verdict from sometimes to always.',
  },

  // ===== Rotation =====
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
  'PC-ROT-005': {
    verdict: 'never',
    assumptions: ['Rolling without slipping (no sliding).', 'The body is rigid.'],
    explanation:
      'Total kinetic energy is (1/2)mv^2 + (1/2)I*omega^2, and for rolling without slipping, omega = v/R, so the rotational term becomes (1/2)I*(v/R)^2. This depends on the moment of inertia I, which depends on how mass is distributed — a solid sphere, a hollow sphere, and a hoop of the same total mass and radius all have different I, and therefore different total kinetic energy at the same v.',
    misconception:
      'Students account only for translational kinetic energy, or assume "same mass, same speed" automatically means "same energy," forgetting the rotational term depends on the body\'s shape.',
    validRewrite: 'The body\'s total kinetic energy at the bottom depends on its total mass, v, AND its moment of inertia — which encodes how its mass is distributed.',
  },

  // ===== Oscillations =====
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
  'PC-OSC-005': {
    verdict: 'never',
    assumptions: ['g is unchanged (same location).', 'The small-angle (ideal simple pendulum) approximation holds.'],
    explanation:
      'T = 2*pi*sqrt(L/g), so T is proportional to the square root of L. Doubling T requires L to increase by a factor of 2^2 = 4, not 2. A pendulum whose length only doubles would have its period increase by a factor of only sqrt(2), not 2.',
    misconception:
      'Students apply linear proportional reasoning ("double the cause, double the effect") to a square-root relationship, instead of squaring the ratio of periods to find the ratio of lengths.',
    validRewrite: 'A simple pendulum\'s period is doubled (same g) only if its length has quadrupled.',
  },
  'PC-OSC-006': {
    verdict: 'sometimes',
    assumptions: ['Both are ideal mass-spring oscillators.'],
    explanation:
      'Total mechanical energy for an ideal mass-spring oscillator is E = (1/2)k*A^2, so amplitude is A = sqrt(2E/k). The same E does not force the same A unless k is also the same — a stiffer spring (larger k) stores the same energy at a smaller amplitude.',
    counterexample:
      'A stiff spring (large k) and a soft spring (small k) can be tuned to store the same total energy while having very different amplitudes, since A = sqrt(2E/k) depends on k as well as E.',
    misconception:
      'Students treat energy and amplitude as if they were locked together by a single relationship, forgetting the spring constant is a second free parameter connecting them.',
    validRewrite: 'If the two oscillators also have the same spring constant, the same total mechanical energy implies the same amplitude.',
  },
};
