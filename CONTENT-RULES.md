# Content Rules — Substitute Physics

Read this before writing any question. The whole design assumes the substitute cannot adjudicate
disputes, so a claim with a shaky verdict is worse than no claim at all.

---

## 1. Hard rules for Physics Court claims

**Claims are plain indicative statements.** No modal verbs, no embedded quantifiers. The verdict
supplies all the modality.

- Bad: *"The net force on it can nevertheless be nonzero."* → possibility claims have no
  sometimes/always reading.
- Bad: *"During SHM, velocity and acceleration always point in opposite directions."* → the
  embedded "always" makes the verdict ambiguous.
- Good: *"The net force on it is zero."* / *"At this instant, the velocity and acceleration point
  in opposite directions."*

**Separate setup from claim.** Put the situation in `setup` and the assertion under trial in
`claim`. Students should be able to point at one sentence and say "that's the thing on trial."

**Every question carries an explicit `assumptions` array.** State the domain restrictions the
verdict depends on: one-dimensional motion, point particle, rigid body about a fixed axis,
differentiable position function, ideal SHM, only gravity/normal/friction acting. Most wrong
verdicts in this domain come from an unstated assumption, not from bad physics.

**Vector vs. component language.** "Points left" and "has a leftward component" are different
claims. Say which one you mean. If a claim would be false for a force pointing up-and-left, use
component language.

**Watch these specific hazards.** They generate wrong keys more often than anything else:

- Dimensionality. A claim that is true in 1D is often false in 2D. Circular motion is the standard
  killer counterexample for kinematics claims about "must be zero at some instant."
- Instantaneous vs. interval. "Zero impulse over an interval" ≠ "zero net force at all times."
  "Derivative is zero at an instant" ≠ "constant near that instant."
- Rigid-body generality. Constant angular momentum does not give constant angular velocity, and
  zero net torque does not either unless the axis is fixed and I is constant.
- Rotational kinetic energy. Work-energy theorem in the form ΔKE = W_net is a point-particle
  statement; extended bodies can bank work as rotation.
- Zero-magnitude edge cases. A zero force has no line of action. A zero velocity vector is
  formally orthogonal to everything. Decide whether the edge case is in scope and say so in
  `assumptions`.

**`misconception` is required and must be specific.** Not "students confuse velocity and
acceleration" but "students apply Rolle's theorem without noticing the motion need not be
one-dimensional." The point of the `explanation` field is to say why the *plausible wrong*
reasoning fails, not merely why the right answer is right.

**Verdict discipline.** If you cannot write a concrete counterexample for `sometimes`, or a
two-line proof sketch for `always`, the verdict is not settled. Rewrite the claim or drop it.

---

## 2. Adjudicated verdicts for the sample claims

These are the claims from the original requirements document, with corrections. Use them as
written here. Several would otherwise ship with an inverted or oversimplified key.

### Kinematics

| Claim | Verdict | Notes |
|---|---|---|
| v and a perpendicular at an instant → speed neither increasing nor decreasing | **always** | d\|v\|/dt = (v·a)/\|v\|. Assume v ≠ 0. State that "increasing at an instant" means the derivative — at a projectile's apex the derivative is zero but speed is at a *minimum*, and a sharp student will raise this. That's a feature; put it in teacher notes. |
| Same position and same instantaneous velocity at t = 4 s → x-t graphs are tangent there | **always** | Near-definitional. Low subtlety for a difficulty 3–5 bank; consider replacing or strengthening. |
| a > 0 throughout an interval → displacement is positive | **sometimes** | v₀ = −10, a = +2 over 1 s gives negative displacement. |
| Identical a(t) → v(t) functions differ only by a constant | **always** | Requires a connected interval. In 2D/3D the constant is a vector. |
| Particle returns to its start after 10 s of continuous motion → velocity was zero at some instant | **sometimes** | Uniform circular motion returns to start with speed never zero. Rolle's theorem only applies with straight-line motion *and* a differentiable position function. Do not key this `always`. |

### Forces

| Claim | Verdict | Notes |
|---|---|---|
| Moving right while slowing → at least one force has a leftward component | **always** | If every force had a non-negative x-component the sum would too. Must be phrased as *component*. |
| Two objects exert equal-magnitude forces on each other → equal acceleration magnitudes | **sometimes** | Equal only for equal masses; other forces may also act. |
| Object is momentarily stationary → the net force on it is zero | **sometimes** | Rewritten from the modal original. |
| Block stays put while the incline angle is increased slightly → static friction increases | **always** | f = mg sin θ, increasing on 0° < θ < 90°. Assume only gravity, normal, and friction. |
| Elevator moving downward while slowing → scale reads less than the passenger's weight | **never** | Slowing while descending means acceleration points **up**, so N > mg and the scale reads **more**. Easy to invert; don't. |

### Energy

| Claim | Verdict | Notes |
|---|---|---|
| Net work is zero → every force does zero work | **sometimes** | True in the degenerate cases (no forces, or all perpendicular). |
| One particular force does negative work → the object's speed decreases | **sometimes** | Other forces can do more positive work. |
| Kinetic energy identical at two instants → velocity identical | **sometimes** | Direction can differ. |
| Two objects start from rest and receive the same net work → same final speed | **sometimes** | v = √(2W/m). Assume point particles; an extended body can store the work as rotation. |
| A conservative force does zero net work on a closed path → it was perpendicular to displacement everywhere | **sometimes** | The premise is uninformative — *every* conservative force does zero work on a closed path. But the conclusion is achievable: uniform gravity on an object moving in a horizontal circle. Do not key this `never`. |

### Momentum

| Claim | Verdict | Notes |
|---|---|---|
| Total momentum of a two-object system is constant → each object's momentum is constant | **sometimes** | True only if they don't interact. |
| Mover strikes a stationary object and stops → the collision was elastic | **sometimes** | Elastic iff the masses are equal; momentum conservation forces v₂ = m₁v₁/m₂, and KE matches only when m₁ = m₂. |
| Two objects collide and stick → exactly half the initial KE is lost | **sometimes** | Exactly half only for equal masses with one initially at rest; equal and opposite momenta lose all of it. |
| Zero net external impulse on a constant-mass system → the center-of-mass velocity is constant | **sometimes** | Zero impulse over an interval gives Δp = 0, so v_cm matches only at the *endpoints*; it can vary in between. The `always` version needs "the net external force is zero at all times." This is one of the best claims in the set — key it correctly. |

### Rotation

| Claim | Verdict | Notes |
|---|---|---|
| Zero net torque about the center of mass → angular velocity remains constant | **sometimes** | Constant **L** does not give constant **ω** for a freely rotating asymmetric body (intermediate-axis effect). Ship a companion claim restricted to a fixed axis, keyed `always`. |
| A force produces zero torque about P → its line of action passes through P | **sometimes** | A zero force has no line of action. |
| Two points on the same rotating rigid body have the same angular velocity → same linear speed | **sometimes** | v = ωr. Note in teacher notes that the premise is vacuous for a rigid body — itself worth discussing. |
| A wheel rolls without slipping → the contact point has zero acceleration | **sometimes** | Zero *velocity*, but acceleration is ω²R toward the center: a_cm and α×r cancel, the ω×(ω×r) term does not. It vanishes only at the instant ω = 0, e.g. a wheel starting from rest. Not `never`. Show the cancellation explicitly. |
| Angular momentum is conserved → rotational kinetic energy is constant | **sometimes** | Skater pulling arms in: L fixed, K = L²/2I rises. |

### Gravitation

No samples were supplied. Build from these, all of which are subtle rather than plug-and-chug:

- An astronaut in a circular orbit is accelerating (**always**) and has nonzero weight
  (**always**) — both routinely misstated as "weightless."
- The gravitational field inside a uniform spherical shell is zero (**always**) but the potential
  inside is not (so "field zero → potential zero" is **never**).
- The total mechanical energy of a circular orbit equals −K and equals U/2 (**always**).
- Escape speed is independent of the escaping object's mass and of launch direction
  (**always**, ignoring drag and terrain).
- Two satellites with the same period have the same orbital radius (**sometimes** — only around
  the same central mass; Kepler's third-law constant depends on M).
- A satellite in a higher orbit has greater total energy but lower speed (**always**).

### Oscillations

| Claim | Verdict | Notes |
|---|---|---|
| Ideal SHM passing through equilibrium → acceleration zero and speed maximum | **always** | a = −ω²x. |
| Ideal SHM momentarily at rest → acceleration magnitude is maximum | **always** | v = 0 ⇒ \|x\| = A. Assume A > 0. |
| Amplitude of an ideal mass-spring oscillator doubles → period doubles | **never** | Period is amplitude-independent. |
| Two ideal mass-spring systems have the same period → same spring constant | **sometimes** | Only k/m is fixed. |
| At a given instant during SHM, velocity and acceleration point in opposite directions | **sometimes** | Antiparallel moving away from equilibrium, parallel moving toward it. Rewritten from the original, which embedded "always" in the claim. |

---

## 3. Alien Physics rules

**The screen must contain every law needed.** No real-world physics fact may be required unless
its skill tag was selected. This is the entire point of the activity.

**Fictional names should be odd but not childish.** Qorf, Bint, Snazzle, Glorp, Zibble, Florple,
Blorn, Squink. Avoid names that telegraph a real quantity.

**Dimensional-analysis questions must define fictional units on screen** — e.g. "Bint is measured
in blorns, Qorf in blorns per second." Without that, the skill is untestable in a universe with no
familiar dimensions.

**Verified answers for the sample problems** (use these; they are correct):

- Q = dB/dt with Q(t) = 6t² − 4 and B(0) = 7 → **B(t) = 2t³ − 4t + 7**.
- Error analysis on the same law: George's B(t) = 12t is exactly dQ/dt. First error is inverting
  the relationship — Q is the rate, so B is the antiderivative. Second point: without B(0) the
  answer is determined only up to a constant.
- **F**(t) = 3t²î + (8 − 2t)ĵ with **F** = d**S**/dt and **S**(0) = 4î − 3ĵ →
  **S**(t) = (t³ + 4)î + (8t − t² − 3)ĵ.
- Z = A + B² conserved, A = 18 and B = 4 → Z = 34. When B = 2, **A = 30**. Priya's 20 comes from
  conserving A + B instead of A + B² — name that error explicitly in the answer.
- F = Kq₁q₂/r² with both charges doubled and r halved → **F increases by a factor of 16**.
- d²X/dt² = −9X with proposed X(t) = 4e^(−9t) → **cannot satisfy the law**: X'' = 81X, not −9X.
  The transferable insight is stronger than the arithmetic: for any real exponential, X''/X > 0,
  so no real exponential can ever solve X'' = −9X. Put that in the explanation.

**Error-analysis problems** should reuse the mistake catalogue from the original spec
(differentiated instead of integrated, dropped the integration constant, treated vectors as
scalars, conserved components instead of the total, read a graph's value as its slope, ignored
initial conditions, mishandled inverse-square scaling, inconsistent units, failed a limiting-case
check). Each flawed solution needs a genuinely plausible first bad step — not step 1 every time.

---

## 4. Experimental Design rules

**Restrictions must be airtight, because the substitute cannot rule on edge cases.** Two prompts
in the original are ambiguous as written:

- *Mass of the table.* State explicitly whether bathroom scales placed under individual legs are
  prohibited (they are the first thing students propose), and define "lift" as "support its full
  weight" so that torque and tipping methods are clearly legal. Recommended restriction list: no
  scale under any part of it, no supporting its full weight, no manufacturer specifications.
- *Speed of the thrown ball.* Explicitly permit measuring the launch point, the landing point, and
  the total flight time. "No measuring position while in flight" otherwise eliminates projectile
  range methods, ballistic pendulums, and catch-in-a-cart momentum methods — i.e. every good
  answer.

**Fictional properties should be honest about what they are.** M = mgh/t is average power and
students will notice; say so in the teacher notes rather than pretending otherwise. The follow-up
question — would two students carrying the same backpack get the same value? — is the real content.

**`possibleApproaches` must contain genuinely different methods**, not variations on one
measurement. For the two-methods-for-g prompt, list at least four across distinct physics:
pendulum period, free-fall timing, static spring extension, inclined-plane acceleration, Atwood
machine.

**`majorPitfalls`** should name what a weak proposal looks like — measuring the wrong quantity,
no repeatability plan, uncertainty listed as "human error," or a procedure another group could
not reproduce.
