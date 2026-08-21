import type { AlienPhysicsQuestion } from './alienPhysicsTypes';

// Student-safe fields only. Every screen must contain every law needed to solve it —
// no real-world physics fact may be required unless its skill tag was selected.

export const alienPhysicsQuestions: AlienPhysicsQuestion[] = [
  {
    id: 'AP-DEC-001',
    questionType: 'decode',
    laws: [{ name: "Zibble's Law", statement: 'Qorf = d(Bint)/dt' }],
    prompt:
      'Bint is measured in blorns; Qorf is measured in blorns per second. The graph shows Bint versus time for a Zibble-world object. According to Zibble\'s Law, what is the constant value of Qorf over this interval?',
    graph: {
      xLabel: 'time (s)',
      yLabel: 'Bint (blorns)',
      series: [{ label: 'Bint', points: [[0, 2], [4, 10]] }],
    },
    requiredSkills: ['graph_interpretation', 'dimensional_analysis', 'derivatives'],
    topicTags: ['dimensional analysis'],
    difficulty: 2,
  },
  {
    id: 'AP-CAL-001',
    questionType: 'calculation',
    laws: [{ name: "Zibble's Law", statement: 'Q = dB/dt' }],
    prompt: 'On planet Zibble, $Q(t) = 6t^2 - 4$ and $B(0) = 7$. Using Zibble\'s Law, find $B(t)$.',
    requiredSkills: ['integrals', 'initial_conditions', 'algebra'],
    difficulty: 3,
  },
  {
    id: 'AP-ERR-001',
    questionType: 'error_analysis',
    laws: [{ name: "Zibble's Law", statement: 'Q = dB/dt' }],
    prompt:
      'George is asked to find $B(t)$ on planet Zibble, given $Q(t) = 6t^2 - 4$ and Zibble\'s Law $Q = dB/dt$. Here is his work. Which step is the first to introduce an error?',
    flawedSolution: [
      "Zibble's Law says Q = dB/dt, so Q and B are related by a derivative.",
      "To find B(t) from Q(t), I'll take the derivative of Q(t).",
      'dQ/dt = d/dt(6t^2 - 4) = 12t.',
      'So B(t) = 12t.',
    ],
    requiredSkills: ['derivatives', 'integrals'],
    difficulty: 3,
  },
  {
    id: 'AP-CAL-002',
    questionType: 'calculation',
    laws: [{ name: "Squink's Law", statement: '**F** = d**S**/dt' }],
    prompt:
      'On planet Squink, $\\vec{F}(t) = 3t^2\\hat{i} + (8 - 2t)\\hat{j}$ is related to $\\vec{S}(t)$ by Squink\'s Law, and $\\vec{S}(0) = 4\\hat{i} - 3\\hat{j}$. Find $\\vec{S}(t)$.',
    requiredSkills: ['vectors', 'integrals', 'initial_conditions'],
    difficulty: 4,
  },
  {
    id: 'AP-CAL-003',
    questionType: 'calculation',
    laws: [{ name: "Glorp's Law", statement: 'F = K q_1 q_2 / r^2' }],
    prompt:
      "On planet Glorp, two charged objects feel a force given by Glorp's Law. Both charges are doubled and the separation $r$ is halved. By what factor does the force change?",
    requiredSkills: ['proportional_reasoning', 'algebra'],
    difficulty: 3,
  },
  {
    id: 'AP-CON-001',
    questionType: 'conservation',
    laws: [{ name: "Snazzle's Conservation Law", statement: 'Z = A + B^2 is conserved' }],
    prompt:
      'On planet Snazzle, the quantity $Z = A + B^2$ is conserved. At one instant, $A = 18$ and $B = 4$. Later, $B = 2$. What is $A$ at that later instant?',
    requiredSkills: ['conservation', 'algebra'],
    difficulty: 3,
  },
  {
    id: 'AP-ERR-002',
    questionType: 'error_analysis',
    laws: [{ name: "Snazzle's Conservation Law", statement: 'Z = A + B^2 is conserved' }],
    prompt:
      'Priya is asked the same Snazzle problem: $Z = A + B^2$ is conserved, $A = 18$ when $B = 4$; find $A$ when $B = 2$. Here is her work. Which step is the first to introduce an error?',
    flawedSolution: [
      "Snazzle's Law says Z = A + B^2 is conserved.",
      "The conserved quantity is A + B, since that's what stays fixed.",
      'Initially, A + B = 18 + 4 = 22.',
      'When B = 2: A + 2 = 22, so A = 20.',
    ],
    requiredSkills: ['conservation', 'algebra'],
    difficulty: 3,
  },
  {
    id: 'AP-GPH-001',
    questionType: 'graph',
    laws: [{ name: "Blorn's Law", statement: 'Florple depends on Zonk as shown in the graph (no formula given).' }],
    prompt:
      'The graph shows Florple (measured in florns) versus Zonk (measured in zonks) for a Blorn-world experiment. At what value of Zonk is Florple at its maximum?',
    graph: {
      xLabel: 'Zonk (zonks)',
      yLabel: 'Florple (florns)',
      series: [{ label: 'Florple', points: [[0, 0], [1, 3], [2, 4], [3, 3], [4, 0]] }],
    },
    requiredSkills: ['graph_interpretation'],
    difficulty: 2,
  },
  {
    id: 'AP-SYN-001',
    questionType: 'synthesis',
    laws: [{ name: "Qorf's Law", statement: 'd^2X/dt^2 = -9X' }],
    prompt:
      "A student proposes $X(t) = 4e^{-9t}$ as a solution to Qorf's Law, $d^2X/dt^2 = -9X$. Does it work? What general fact about laws of this form does your answer reveal?",
    requiredSkills: ['differential_equations', 'derivatives'],
    difficulty: 5,
  },
];
