import type { AlienPhysicsAnswer } from './alienPhysicsTypes';

// Imported only by TeacherAnswerPanel and BankBrowser via a lazy import — see
// BUILD-SPEC.md §3. Never import this module from student-facing components.

export const alienPhysicsAnswers: Record<string, AlienPhysicsAnswer> = {
  'AP-DEC-001': {
    answer: 'Qorf = 2 blorns/s',
    workedSolution:
      'Qorf is the rate of change of Bint, i.e. the slope of the Bint-vs-time graph. Slope = (10 - 2) / (4 - 0) = 8/4 = 2 blorns per second, constant since the graph is a straight line.',
    misconception:
      'Students may read off a single Bint value (e.g., 10) and report it as Qorf, confusing a quantity with its rate of change.',
  },
  'AP-CAL-001': {
    answer: 'B(t) = 2t^3 - 4t + 7',
    workedSolution:
      'Since Q = dB/dt, B(t) is the antiderivative of Q(t): the integral of (6t^2 - 4) dt is 2t^3 - 4t + C. Applying B(0) = 7 gives C = 7, so B(t) = 2t^3 - 4t + 7.',
  },
  'AP-ERR-001': {
    answer: 'Step 2 (index 1) is the first error.',
    workedSolution:
      "Zibble's Law states Q is the rate of B (Q = dB/dt), so B is the antiderivative of Q — not its derivative. George inverts the relationship by differentiating Q again. A second, independent issue: without B(0), correct integration only determines B(t) up to an unknown additive constant.",
    misconception:
      'Students see two related functions and default to differentiating, rather than checking which variable is declared as the rate of the other.',
    firstBadStepIndex: 1,
  },
  'AP-CAL-002': {
    answer: 'S(t) = (t^3 + 4) i-hat + (8t - t^2 - 3) j-hat',
    workedSolution:
      'Integrate each component separately. x: the integral of 3t^2 dt is t^3 + C1; S_x(0) = 4 gives C1 = 4. y: the integral of (8 - 2t) dt is 8t - t^2 + C2; S_y(0) = -3 gives C2 = -3.',
  },
  'AP-CAL-003': {
    answer: 'The force increases by a factor of 16.',
    workedSolution:
      'Doubling both charges multiplies the numerator by 2 x 2 = 4. Halving r multiplies 1/r^2 by (1/(1/2))^2 = 4. Combined factor: 4 x 4 = 16.',
  },
  'AP-CON-001': {
    answer: 'A = 30',
    workedSolution:
      'Z = 18 + 4^2 = 18 + 16 = 34, conserved. When B = 2: A + 2^2 = 34, so A + 4 = 34, giving A = 30.',
  },
  'AP-ERR-002': {
    answer: 'Step 2 (index 1) is the first error.',
    workedSolution:
      'The law explicitly states Z = A + B^2 is conserved, not A + B. Using the correct conserved quantity: 18 + 4^2 = 34; then A + 2^2 = 34 gives A = 30, not 20.',
    misconception:
      'Students substitute the simplest linear combination of the named variables rather than the exact expression stated in the law.',
    firstBadStepIndex: 1,
  },
  'AP-GPH-001': {
    answer: 'Zonk = 2',
    workedSolution:
      'Reading the graph, Florple rises to a peak value of 4 florns at Zonk = 2 and falls symmetrically on either side.',
  },
  'AP-SYN-001': {
    answer:
      "No — X(t) = 4e^{-9t} does not satisfy the law. More generally, no real exponential function can ever solve a law of this form.",
    workedSolution:
      "For X(t) = 4e^{-9t}, X''(t) = 4 * 81 * e^{-9t} = 81 X(t), not -9 X(t), so it fails. For any real exponential X = C e^{kt}, X'' = k^2 X, and k^2 is always >= 0 — it can never equal -9 (a negative number). Laws of the form X'' = -omega^2 X require oscillatory (sinusoidal) solutions, not real exponentials.",
    misconception:
      'Students check the arithmetic on the one proposed solution and stop, rather than recognizing the deeper reason: real exponentials can never produce the sign flip that an equation like this requires.',
    teacherNotes: 'The transferable insight (no real exponential can solve X\'\' = -9X) matters more than the arithmetic — steer discussion there.',
  },
};
