import type { ExperimentalDesignAnswer } from './experimentalDesignTypes';

// Validated content data only (see scripts/validate.ts) — there is no in-app reveal for
// Experimental Design, so nothing imports this at runtime. Never import this module from
// student-facing components (BUILD-SPEC.md §3).

export const experimentalDesignAnswers: Record<string, ExperimentalDesignAnswer> = {
  'ED-KIN-001': {
    possibleApproaches: [
      'Drop the filter from several different heights and time each fall. Once the average speed (distance/time) stops increasing with drop height, that plateau value is the terminal velocity — a single drop cannot show this, since you cannot tell from one trial whether it was still speeding up.',
      'Drop the filter from one large height, and mark two intervals along the fall path: one near the top and one near the bottom. Time each interval separately. If the two intervals give nearly the same speed, the fall had already reached (or nearly reached) terminal velocity by the first marked interval.',
    ],
    majorPitfalls: [
      'Timing only the whole fall and reporting that single average speed as "the" terminal velocity, without any check for whether it was still accelerating.',
      'Not accounting for the filter tumbling or changing orientation, which changes its effective drag.',
      'A single, unrepeated trial.',
    ],
  },
  'ED-KIN-002': {
    possibleApproaches: [
      'Range method: throw the ball horizontally off a table edge (or at a fixed, measured launch height) with each hand, keeping the launch height and angle as consistent as possible; measure the horizontal range each throw travels before landing, and use projectile kinematics (range and fall height) to back out each launch speed.',
      'Target-distance method: throw at a marked line on the floor from a fixed height with each hand, repeating several times per hand; measure the flight time (from release to landing) and the horizontal distance traveled, and compute launch speed from those two measurements directly.',
    ],
    majorPitfalls: [
      'Changing the throwing angle or release height between the two hands, which confounds the comparison.',
      'A single throw per hand, given how much a human throw naturally varies from attempt to attempt.',
      'Measuring only distance thrown (not accounting for launch angle) and reporting that as "speed."',
    ],
  },
  'ED-KIN-003': {
    possibleApproaches: [
      'Ruler-drop method: hold a ruler or meter stick vertically with the zero mark at the bottom, between the other person\'s open fingers, and drop it without warning; they catch it as fast as they can. Measure how far the ruler fell before being caught, and use h = (1/2)g t^2 to solve for the reaction time t.',
      'Repeated-trial averaging: repeat the ruler-drop test many times, varying the exact moment of release unpredictably so the catcher cannot anticipate it, and average the resulting reaction times to reduce the effect of any one lucky or unlucky catch.',
    ],
    majorPitfalls: [
      'Letting the catcher predict the timing of the drop (e.g., always releasing after a countdown), which measures anticipation rather than reaction time.',
      'Using only one trial, given how much reaction time naturally varies attempt to attempt.',
      'Measuring from the wrong point on the ruler (e.g., where the hand started rather than where the ruler was actually caught).',
    ],
  },
  'ED-FOR-001': {
    possibleApproaches: [
      "Coast-down shape method: spin the wheel and time it at repeated angular positions (e.g., mark the wheel and count/time passes of the mark) to build a rough angular-speed-vs-time curve for the whole coast to a stop. Constant-torque bearing friction predicts a roughly straight-line decrease in angular speed over time; air resistance (torque growing with speed) predicts a curve that drops faster at high speed and levels out more gradually near the end. Comparing the shape of the measured curve to these two predictions indicates which effect dominates.",
      'Controlled-comparison method: spin the wheel to the same initial speed multiple times, once in still air and once with airflow increased across it (e.g., a fan), keeping everything else the same. If the coast-down time changes substantially with more airflow, air resistance is a significant factor; if it barely changes, bearing friction dominates.',
    ],
    majorPitfalls: [
      'Assuming one effect dominates without any measurement at all.',
      'Not starting each trial from the same initial spin speed, which makes trials incomparable.',
      'Treating the coast-down as having only one cause acting only near the end, when both effects act throughout.',
    ],
  },
  'ED-FOR-002': {
    possibleApproaches: [
      'Simultaneous-drop method: hold both sheets at the same height and release them at the same instant; observe (and repeat several times) which one consistently lands first. The one that lands later is experiencing more air resistance relative to its weight.',
      'Timed-fall method: drop each sheet separately from the same, larger height, timing each fall with a stopwatch across several trials; compare the average fall times (or average speeds) — the sheet with the longer average fall time experienced more air resistance.',
    ],
    majorPitfalls: [
      'Dropping the two sheets from different heights or with different starting orientations, which confounds the comparison.',
      'A single trial per sheet, given how much a flat sheet\'s fall can vary with air currents and orientation.',
      'Not accounting for the flat sheet tumbling or fluttering rather than falling straight down.',
    ],
  },
  'ED-FOR-003': {
    possibleApproaches: [
      'Balance-point method: rest each block on a narrow fulcrum (like the edge of a ruler) and slide it until it balances level. The balance point sits directly above the center of mass — compare that point to the block\'s geometric center for each block; the block whose balance point is off-center is the shifted one.',
      'Tipping-angle method: slowly tilt each block on its edge and note the angle at which it just begins to tip over. A block with an off-center mass will tip at a different (typically smaller, in the direction of the shifted mass) angle than one balanced in its geometric center.',
    ],
    majorPitfalls: [
      'Assuming a block "looks" balanced without actually testing it on a fulcrum.',
      'Testing tipping in only one direction, when the mass could be shifted toward any side.',
      'Not repeating the test at least once per block to make sure the balance point is consistent.',
    ],
  },
  'ED-ENE-001': {
    possibleApproaches: [
      "Projectile-launch method: use the rubber band to launch a small object of known mass horizontally off a table edge at maximum stretch; measure the horizontal range and the fall height to reconstruct the launch speed via projectile kinematics, then compute (1/2)mv^2 as an estimate of the stored energy (assuming most of it transfers to the projectile).",
      "Force-extension method: hang a sequence of known weights from the rubber band and record the resulting stretch at each weight, building a force-vs-stretch graph (which need not be a straight line). The stored elastic energy at maximum stretch is the area under this graph, from zero stretch up to that maximum — this works whether or not the band obeys Hooke's law.",
    ],
    majorPitfalls: [
      "Assuming the rubber band is a linear (Hooke's-law) spring without checking — rubber bands are notoriously nonlinear, especially near maximum stretch.",
      'Assuming all of the stored energy transfers to the projectile with no loss, without acknowledging this as an assumption.',
      'A single, unrepeated trial for either method.',
    ],
  },
  'ED-ENE-002': {
    possibleApproaches: [
      'Two-point speed method: mark two short intervals along the ball\'s path — one right after it starts rolling, one further along — and time the ball crossing each interval to get a speed at each point. Since kinetic energy is (1/2)mv^2, the fraction of KE lost between the two points is 1 - (v2/v1)^2, which does not even require knowing the mass.',
      'Distance-to-stop method: give the ball a measured initial speed (via the two-point method above, at the very start) and measure the total distance it travels before coming to rest; use the work-energy theorem (initial KE = friction force times total stopping distance) to solve for the effective friction force, then compute how much energy was lost over any specific measured stretch.',
    ],
    majorPitfalls: [
      'Assuming a "typical" initial speed instead of actually measuring it.',
      'Not keeping the measured stretch of floor consistent between trials.',
      'A single, unrepeated trial, given how much rolling friction can vary with a carpet\'s texture and the ball\'s exact path.',
    ],
  },
  'ED-MOM-001': {
    possibleApproaches: [
      'Elastic-collision method: roll the unknown-mass object into a known-mass object initially at rest on a low-friction surface, measuring both objects\' speeds before and after (via timing over marked distances); use momentum conservation to solve for the unknown mass.',
      'Sticking-collision method: let the unknown object collide and stick to a known mass, measure the speed just before the collision and the combined speed just after, and use momentum conservation (m_unknown * v1 = (m_unknown + m_known) * v2) to solve algebraically for the unknown mass.',
    ],
    majorPitfalls: [
      'Not accounting for rolling resistance or friction affecting the "before" and "after" speed measurements.',
      'Assuming a collision is elastic (or perfectly inelastic) without designing the setup to guarantee which one actually occurred.',
      'A single, unrepeated trial.',
    ],
  },
  'ED-MOM-002': {
    possibleApproaches: [
      'Distance-in-equal-time method: mark the starting point and, at the same instant the two chairs begin rolling apart, start a single stopwatch. After a fixed time, measure how far each chair has traveled. Since the system started at rest with only an internal push (momentum conservation: m1*v1 = m2*v2), and both chairs travel for the same time, the ratio of distances traveled equals the inverse ratio of masses.',
      'Stopping-distance method: measure how far each chair rolls before friction brings it to rest, assuming both chairs experience similar friction. Since stopping distance for constant deceleration scales with v^2, and momentum conservation relates v1 and v2 to the mass ratio, the ratio of stopping distances can be used (with more assumptions about equal friction) to back out the same mass ratio.',
    ],
    majorPitfalls: [
      'Having the students push off from a wall or the floor in addition to each other, which brings in an external force and breaks momentum conservation for the two-person system.',
      'Assuming the two chairs have identical friction without checking (different chairs, different wheels, different floor contact).',
      'A single trial, given how much the push-off technique can vary person to person.',
    ],
  },
  'ED-ROT-001': {
    possibleApproaches: [
      'Spin each egg on the table with comparable effort and observe (or time) how long each keeps spinning smoothly. A hard-boiled egg is one rigid solid and spins steadily for longer; a raw egg\'s liquid interior lags behind the rotating shell (internal fluid friction), so it wobbles and stops noticeably sooner.',
      'Spin each egg, then briefly touch a finger to it to stop the shell\'s rotation, and release immediately. A hard-boiled egg stays stopped, since it is one rigid body. A raw egg\'s liquid interior keeps spinning inside the now-still shell, and that motion will often set the shell spinning again on its own after release.',
    ],
    majorPitfalls: [
      'Not spinning both eggs with comparable initial speed or effort, making the comparison unfair.',
      'Testing only once per egg, given natural variability in how a spin is started.',
      'Giving the egg too gentle a spin to see the effect clearly.',
    ],
  },
  'ED-ROT-002': {
    possibleApproaches: [
      'Race-to-the-bottom method: release both cylinders from rest at the same point on the ramp at the same time, and observe which one reaches the bottom first. Since both have equal mass and drop the same height, they have equal total energy available, but the hollow cylinder\'s larger moment of inertia means more of that energy goes into rotation and less into translation — so the solid cylinder reaches the bottom first (and faster) every time.',
      'Bottom-speed method: measure each cylinder\'s speed just after leaving the ramp (e.g., by timing it over a short marked distance on the floor beyond the ramp\'s base) across repeated trials; the cylinder with the higher measured speed is the solid one.',
    ],
    majorPitfalls: [
      'Releasing the two cylinders from different points on the ramp, or with different pushes, instead of from rest at the same point.',
      'A single trial, given that release technique can introduce small differences.',
      'Assuming friction/rolling resistance is different between the two without any evidence — the moment-of-inertia difference alone explains the result.',
    ],
  },
  'ED-OSC-001': {
    possibleApproaches: [
      'Calibration method: hang a known mass from the rubber band and measure its oscillation period to find the band\'s effective spring constant k, using T = 2*pi*sqrt(m/k). Then hang the rock from the same rubber band, measure its period, and solve for the rock\'s mass using that same k.',
      "Curve method: hang a series of known masses from the rubber band one at a time, recording each period, to build a graph of period-squared versus mass (which should be linear, since T^2 = 4*pi^2*m/k). Then measure the rock's period and read its mass off that graph, without ever solving for k explicitly.",
    ],
    majorPitfalls: [
      "Stretching the rubber band far enough that it no longer behaves consistently from trial to trial (rubber bands are nonlinear at large stretch) — keep oscillations small.",
      'A single, unrepeated trial or measurement of period.',
      'Forgetting to account for the mass of any hook or attachment used to hold the rock.',
    ],
  },
  'ED-OSC-002': {
    possibleApproaches: [
      'Same-swing, different-riders method: have a heavier and a lighter rider each swing (one at a time) with the same small amplitude and the same chain/rope length; count and time a fixed number of full swings (e.g., 10) for each rider, and compare the resulting periods — for an ideal pendulum, they should come out the same.',
      'Same-person, added-weight method: have one rider repeat the timed-swings test twice — once alone, once holding a known extra weight — to isolate mass as the only thing that changed, controlling for differences in body shape or swinging technique between different people.',
    ],
    majorPitfalls: [
      'Comparing single swings instead of timing several swings and dividing, which makes timing error much larger relative to the period.',
      'Letting the amplitude (how far back each rider starts) differ between trials.',
      'Changing the effective swing length (e.g., a taller or shorter rider sitting differently) without accounting for it.',
    ],
    teacherNotes:
      'The belief being tested is false: an ideal pendulum\'s period does not depend on the mass on the end, only on its length and g — the same "period is independent of amplitude" idea shows up again here, just for mass instead of amplitude.',
  },
};
