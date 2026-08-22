import type { ExperimentalDesignAnswer } from './experimentalDesignTypes';

// Imported only by AnswerReveal via a lazy import — see BUILD-SPEC.md §3. Never import
// this module from student-facing components.

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
};
