# Substitute Physics — Build Spec (v1)

This supersedes the original requirements document. Where the two conflict, this file wins.
Read `CONTENT-RULES.md` before writing any question data.

**Goal:** a static React site holding several self-running AP Physics C: Mechanics substitute
activities. A substitute with no physics background opens the site, checks off what students have
learned, picks an activity, and runs an 80-minute class by following on-screen timing. The
substitute never solves, judges, or explains anything.

---

## 0. Decisions already made — do not re-open

| Question | Decision |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Routing | `HashRouter` (GitHub Pages 404s on deep links with BrowserRouter) |
| Styling | Vanilla CSS with custom-property design tokens in `src/styles/tokens.css`. No Tailwind, no CSS-in-JS. |
| Math | `katex` (direct, not `react-katex`) wrapped in one `MathContent` component |
| Charts | Hand-rolled SVG from a `GraphDefinition` object. No charting library. |
| RNG | Inline `mulberry32` + string→seed hash in `src/utilities/rng.ts`. No dependency. |
| Tests | Vitest |
| Backend | None. Static only. |
| Verdicts | **Three**: `always` / `sometimes` / `never`. "Cannot Be Determined" is dropped. |
| Content volume for v1 | Seed bank only — see §7 |

Runtime dependencies should be exactly: `react`, `react-dom`, `react-router-dom`, `katex`.
Dev: `vite`, `typescript`, `@vitejs/plugin-react`, `vitest`, `tsx`.

---

## 1. Repository and deployment

Target: GitHub Pages project page at `https://<user>.github.io/<REPO_NAME>/`.

- `vite.config.ts` must set `base: '/<REPO_NAME>/'`. Leave a clearly-commented constant at the
  top of the file so this is a one-line change.
- Ship `.github/workflows/deploy.yml` using `actions/configure-pages`,
  `actions/upload-pages-artifact`, and `actions/deploy-pages`, triggered on push to `main` plus
  `workflow_dispatch`.
- The workflow must run `npm ci`, `npm run validate`, `npm test`, then `npm run build`. A content
  validation failure should fail the deploy.
- No `.nojekyll` needed with the Actions-based deploy, but include one anyway; it is free
  insurance if the deploy method ever changes.

---

## 2. File architecture

```
src/
  main.tsx
  App.tsx
  routes.tsx

  activities/
    registry.ts                    // ActivityDefinition[] — the home page renders from this
    physicsCourt/
      PhysicsCourt.tsx
      PhysicsCourtSetup.tsx
      physicsCourtTypes.ts
      physicsCourtGenerator.ts
      questions.ts                 // student-safe fields only
      answers.ts                   // verdicts + explanations, imported only by teacher code
      index.ts
    alienPhysics/
      ... same shape ...
    experimentalDesign/
      ... same shape ...

  components/
    ActivityCard.tsx  UnitSelector.tsx  SkillSelector.tsx  AdvancedOptions.tsx
    LessonShell.tsx   LessonHeader.tsx  RoundIntro.tsx     QuestionNavigator.tsx
    ProgressBar.tsx   Timer.tsx         MathContent.tsx    Graph.tsx
    SubstituteInstructions.tsx  TeacherAnswerPanel.tsx  TagBadge.tsx
    SessionResumeDialog.tsx     ProjectorModeToggle.tsx

  session/
    sessionTypes.ts   sessionStorage.ts   useSession.ts

  utilities/
    rng.ts            balancedSample.ts   validation.ts

  teacher/
    TeacherModeContext.tsx   BankBrowser.tsx

  styles/
    tokens.css   base.css   print.css

scripts/
  validate.ts                        // npm run validate
```

Rules:
- No component file over ~250 lines. Split rather than nest deeply.
- Selection/generation logic must be pure functions with no React imports, so it is testable.
- Each activity owns its own generator and schema. Do not force a shared question interface.

---

## 3. Answer separation (§34 of the original)

Implement it structurally, not with CSS:

- `questions.ts` exports objects containing **only** what a student may see: id, claim/prompt,
  laws, graph, difficulty tags.
- `answers.ts` exports `Record<QuestionId, AnswerRecord>` containing verdict, explanation,
  counterexample, misconception, teacher notes, valid rewrite, possible approaches.
- Student-facing components must never import `answers.ts`. `TeacherAnswerPanel` and
  `BankBrowser` import it via `await import(...)` so it lands in a separate lazy chunk.
- Add a Vitest test asserting that no file under `activities/*/` other than `answers.ts`,
  `TeacherAnswerPanel.tsx`, and the teacher directory contains the string `answers`.
- Every ID in `questions.ts` must have a matching entry in `answers.ts` and vice versa —
  enforced by `npm run validate`.

---

## 4. Types

```ts
type ActivityId = 'physics-court' | 'alien-physics' | 'experimental-design';

type PhysicsUnit =
  | 'kinematics' | 'forces' | 'energy' | 'momentum'
  | 'rotation' | 'gravitation' | 'oscillations';

type ReasoningSkill =
  | 'algebra' | 'proportional_reasoning' | 'vectors' | 'graph_interpretation'
  | 'derivatives' | 'integrals' | 'initial_conditions' | 'dimensional_analysis'
  | 'conservation' | 'differential_equations' | 'limits' | 'modeling';

type Verdict = 'always' | 'sometimes' | 'never';
```

**Prerequisite fields are named explicitly.** Do not use a bare `units` array:

```ts
requiredUnits: PhysicsUnit[];   // ALL must be selected for eligibility (AND, never OR)
topicTags?: string[];           // descriptive only, never used for filtering
requiredSkills?: ReasoningSkill[];  // ALL must be selected (Alien Physics)
```

### Physics Court

```ts
interface PhysicsCourtQuestion {
  id: string;                       // PC-KIN-001
  claim: string;                    // may contain LaTeX
  setup?: string;                   // situation, stated separately from the claim
  requiredUnits: PhysicsUnit[];
  topicTags?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  requiresCalculus?: boolean;
  requiresGraph?: boolean;
  graph?: GraphDefinition;
}

interface PhysicsCourtAnswer {
  verdict: Verdict;
  assumptions: string[];            // REQUIRED — see CONTENT-RULES.md
  explanation: string;
  counterexample?: string;          // REQUIRED when verdict === 'sometimes'
  proofSketch?: string;             // REQUIRED when verdict === 'always'
  misconception: string;            // what a strong student wrongly concludes and why
  validRewrite?: string;
  teacherNotes?: string;
}
```

Round eligibility is **derived**, not hand-tagged. Delete `roundTypes` from the original spec:

| Round | Eligible questions |
|---|---|
| `verdict` | any |
| `prosecution` | `verdict === 'sometimes'` **only** |
| `defense` | `verdict === 'always'` **only** |
| `rewrite` | `verdict === 'sometimes' \|\| 'never'`, **and** `validRewrite` is present |

Prosecution excludes `never` deliberately: disproving a never-true claim is trivial because any
instance works. The pedagogical point is that a claim which is *usually* true dies to one
counterexample.

### Alien Physics

Keep the original `AlienPhysicsQuestion` / `AlienLaw` shape, with `skills` renamed
`requiredSkills`, and answer fields moved to `answers.ts`. `questionType` stays:
`decode | calculation | error_analysis | graph | conservation | synthesis`.

For `error_analysis` questions add:

```ts
flawedSolution: string[];     // numbered steps as written by the fictional student
firstBadStepIndex: number;    // 0-based; validated to be in range
```

### Experimental Design

Keep the original shape, renaming `units` → `requiredUnits`. `possibleApproaches` must have
length ≥ 2 unless `singleValidApproach: true` is explicitly set.

### Session

```ts
interface LessonSession {
  version: 1;
  activityId: ActivityId;
  seed: string;
  createdAt: string;
  selectedUnits?: PhysicsUnit[];
  selectedSkills?: ReasoningSkill[];
  rounds: { roundId: string; questionIds: string[] }[];
  currentRoundIndex: number;
  currentQuestionIndex: number;
  timer?: { roundId: string; elapsedMs: number; running: boolean };
}
```

Sessions store IDs only. Resolve against the bank at render time.

---

## 5. Generation

`generateSession({ activityId, selectedUnits, selectedSkills, options, seed })`.

- Same seed + same settings ⇒ byte-identical session. Test this.
- If no seed given, generate one as a short readable string (e.g. `k7m2-q4x9`) so it can be
  typed into Teacher Mode by hand to sync two class sections.
- No question ID repeats anywhere in a session, across rounds included.

**Balanced sampler** (`balancedSample.ts`): build one eligible pool per selected unit; assign each
multi-unit question to the pool of its *scarcest* unit; shuffle each pool with the seeded RNG;
then round-robin across pools until the target count is met or all pools are empty. Do not
shuffle the whole bank and slice.

**Shortage handling:** never throw, never duplicate. Fill what you can, shrink the round, and
surface a small note in the lesson header — worded for a substitute, e.g. *"This round has 6
questions instead of the usual 8."* If a whole round comes up empty, skip it silently in the
student view and note it in Teacher Mode. If the total eligible pool is under 4 questions, block
the Start button on the setup screen with the §48 message instead of generating a broken lesson.

---

## 6. Lesson structure

Physics Court: verdict (8–10, ~25 min) → prosecution (4, ~18 min) → defense (3, ~18 min) →
rewrite (3, ~12 min) → Write the Trap (instructions only, no data needed).

Alien Physics: decode (4–5, ~15 min) → calculation (4, ~25 min) → error_analysis (3, ~20 min) →
synthesis (2, ~15 min) → invent-your-own.

Experimental Design: warm-up (1, 15 min) → restricted (1, 20 min) → hard (1, 25 min) →
define-the-thing (1, 15–20 min). Difficulty ordering is enforced by the generator: sample the
warm-up from difficulty ≤ 2, the hard one from difficulty ≥ 4.

Navigation: Previous / Next, plus **Begin Next Round** at a round boundary with a confirm dialog.
No auto-advance, ever. Timer is opt-in with start/pause/reset and never changes the screen.

Every activity opens on a `SubstituteInstructions` panel that must be dismissed to start. Use the
wording from §29 of the original verbatim, including the line that the substitute does not need to
know physics and should never give the answer.

---

## 7. Seed content targets for v1

Enough to run one full 80-minute lesson of each activity without shortage. Quality over count —
if a claim's verdict is not airtight, drop it rather than shipping it.

**Physics Court — 28 questions**, 4 per unit across all seven units, plus 2 cross-unit questions
counted within that total. Difficulty 3–5 only.

Verdict mix matters because rounds filter on it. Per unit, aim for roughly 2 `sometimes`,
1 `always`, 1 `never`, and give every `sometimes` and `never` question a `validRewrite`. Globally
you need at least 6 `always` questions (defense pool) and at least 12 `sometimes` (prosecution +
verdict pools).

**Alien Physics — 16 problems**, at least two per `questionType`, and every `ReasoningSkill`
represented at least once.

**Experimental Design — 10 prompts**, at least two at difficulty ≤ 2 and two at difficulty ≥ 4.

Note in the README which unit selections currently support a full-length lesson. With a 28-question
bank, selecting only one unit will produce a short lesson — that is expected and handled, not a bug.

---

## 8. Validation

`npm run validate` runs `scripts/validate.ts` via tsx and exits nonzero on any failure:

- IDs unique across the whole app, and matching the `XX-YYY-NNN` pattern
- every question has an answer record and vice versa
- `difficulty` in 1–5
- every `requiredUnits` / `requiredSkills` entry is a valid union member
- `verdict === 'sometimes'` ⇒ `counterexample` present and non-empty
- `verdict === 'always'` ⇒ `proofSketch` present and non-empty
- `assumptions` non-empty on every Physics Court question
- `validRewrite` never present on an `always` question
- `firstBadStepIndex` within `flawedSolution` bounds
- `possibleApproaches.length >= 2` unless `singleValidApproach`
- every referenced graph/diagram asset resolves
- per-round eligibility pools are non-empty when all units are selected

Vitest covers: AND-semantics of `requiredUnits` (the `['energy','rotation']` case from §54),
no duplicate IDs in a generated session, seed determinism, round eligibility filters, shortage
paths with a deliberately tiny mock bank, and the answer-import isolation test from §3.

---

## 9. Teacher Mode

Enabled by `?teacher=1` in the hash route or a small link in the footer; persisted to
localStorage. Shows: the current question's full answer record in a visually distinct panel, the
session seed with a copy button, a seed input to regenerate an identical lesson, and question
metadata. Plus `BankBrowser` at `/#/teacher/bank` with filtering by activity, unit, skill,
difficulty, verdict, and free-text search, showing IDs prominently.

Projector Mode: a class on `<body>` that scales the type, hides secondary chrome, and enlarges
navigation. Must force Teacher Mode panels closed while active.

Print stylesheet: questions only, no nav, no answers unless Teacher Mode is on.

---

## 10. README

Must include: dev/build/deploy commands, the `base` path note, and a per-activity section showing
file location, the schema, a complete annotated example question, how prerequisite tags work
(especially that `requiredUnits` is AND), how round eligibility is derived from verdict, and how to
run validation. Written so it is usable without reading any React.
