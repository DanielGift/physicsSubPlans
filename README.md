# Substitute Physics

A static React site holding three self-running AP Physics C: Mechanics substitute activities. A
substitute with no physics background opens the site, checks off what the class has already
learned, picks an activity, and runs an 80-minute class by following on-screen timing. The
substitute never solves, judges, or explains anything — that's by design (see `CONTENT-RULES.md`
and `BUILD-SPEC.md` for the full rationale).

This README is written so it's usable without reading any React.

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server with hot reload
npm run validate  # check the question banks for internal consistency (see "Validation" below)
npm test          # run the Vitest suite
npm run build     # type-check, then produce a production build in dist/
npm run preview   # serve the production build locally
```

`npm run build` runs `tsc -b` before `vite build`, so a type error fails the build the same way
CI does.

## Deploying to GitHub Pages

This is configured for a GitHub Pages **project page** — a site served from
`https://<user>.github.io/<REPO_NAME>/`, not from a custom domain or a user/org page.

- **`vite.config.ts`** has a `REPO_NAME` constant near the top. It must match this repository's
  actual name, because GitHub Pages serves a project page from a sub-path
  (`/<REPO_NAME>/`), and every asset URL the built site requests has to include that prefix or
  the assets 404. It is already set to `physicsSubPlans` to match this repo.
- **`.github/workflows/deploy.yml`** deploys automatically on every push to `main` (and can be
  triggered manually from the Actions tab). It runs, in order: `npm ci`, `npm run validate`,
  `npm test`, `npm run build`. A failure at any step — including a content validation failure —
  fails the deploy, so bad content data can't reach production.
- Turn on Pages once, under the repo's Settings → Pages → "Build and deployment" → **Source:
  GitHub Actions**. After that, every push to `main` redeploys automatically.
- `public/.nojekyll` is included as a no-cost safeguard. It isn't required by the Actions-based
  deploy used here, but it prevents GitHub's Jekyll processing from ever interfering if the
  deploy method changes later.

## How the site is organized

```
src/
  activities/            one folder per activity (physicsCourt, alienPhysics, experimentalDesign)
    registry.ts          the list the home page renders from
  components/            shared, activity-agnostic UI (LessonShell, Timer, MathContent, ...)
  session/               LessonSession type, localStorage persistence, and generateSession()
  utilities/             pure logic: seeded RNG, the balanced sampler
  teacher/               Teacher Mode context + the cross-activity Bank Browser
scripts/validate.ts      content consistency checks — npm run validate
```

Each activity owns its own schema and generation logic under `src/activities/<name>/`:

| File | Contents |
|---|---|
| `<name>Types.ts` | The question/answer TypeScript interfaces for this activity. |
| `questions.ts` | **Student-safe fields only.** Everything a student may see. |
| `answers.ts` | Verdicts, explanations, and every other adjudicated field. |
| `<name>Generator.ts` | Pure, React-free functions that turn a seed + selections into rounds. |
| `<Name>Setup.tsx` | The screen where a substitute checks off units/skills and hits Start. |
| `<Name>.tsx` | The activity's top-level component (setup → instructions → lesson). |

### Why questions and answers are separate files

`questions.ts` is imported by every student-facing screen. `answers.ts` is imported **only** by
`TeacherAnswerPanel` and the Bank Browser, and only via a lazy `await import(...)` — so the
answer key ships as its own JS chunk, not bundled into the code every visitor downloads. A Vitest
test (`src/activities/answerIsolation.test.ts`) enforces this by scanning the source tree for the
literal string `"answers"` and failing if it turns up anywhere it shouldn't. `answers.ts` files,
`TeacherAnswerPanel.tsx`, anything under `teacher/`, and `physicsCourtGenerator.ts` are the only
allowed exceptions — that last one is explained inline in that test file and in the Physics Court
section below.

## Prerequisite tags: `requiredUnits` and `requiredSkills` are AND, not OR

Every question lists the units (Physics Court, Experimental Design) or reasoning skills (Alien
Physics) it depends on. **Every single one of those must be checked off** for the question to be
eligible — it is not "eligible if the class has covered any of these."

```ts
requiredUnits: ['energy', 'rotation']
```

A question tagged like this needs **both** Energy *and* Rotation selected. If only Energy is
checked, this question does not show up — because rotational kinetic energy (the actual subject
of that question) hasn't been taught yet. Selecting more units only ever adds eligible questions;
it never removes any.

`topicTags` is different: it's free-text and descriptive only ("circular motion", "SHM"), shown
to the teacher for context, and **never** used to decide eligibility.

## How rounds are chosen: the balanced sampler

`src/utilities/balancedSample.ts` builds one pool per selected unit/skill, puts each question
(even a multi-unit one) into the pool for its *scarcest* required unit, shuffles each pool with a
seeded RNG, and round-robins across pools until the round's target count is filled or every pool
runs dry. It never shuffles the whole bank and slices off the top — that would let one heavily
stocked unit crowd out a thinly stocked one.

**Same seed + same selections → the identical lesson, every time.** That's what lets a teacher
type a seed from one class section into Teacher Mode on another and run the two sections in sync.
If no seed is given, a short one like `k7m2-q4x9` is generated so it's easy to read aloud and
retype.

**Shortage handling never throws and never repeats a question.** If a round can't be filled to
its usual count, it just runs shorter and a note appears in the lesson header (e.g. *"This round
has 6 questions instead of the usual 8."*). If a round comes up completely empty, it's skipped
for the student and noted in Teacher Mode. If the *total* eligible pool for an activity is under 4
questions, the Start button on the setup screen is disabled with an explanation, instead of
generating a broken lesson.

## Physics Court

**Location:** `src/activities/physicsCourt/`

Students see a `setup` (the situation) and a `claim` (the assertion under trial), and argue
whether the claim is `always`, `sometimes`, or `never` true.

```ts
// questions.ts — what a student sees
{
  id: 'PC-KIN-003',
  setup: 'A particle moves at constant speed around a circle of fixed, nonzero radius.',
  claim: "The particle's acceleration is zero at some instant.",
  requiredUnits: ['kinematics'],
  topicTags: ['circular motion'],
  difficulty: 3,
}

// answers.ts — teacher-only, lazy-loaded
'PC-KIN-003': {
  verdict: 'never',
  assumptions: ['Speed is constant and nonzero.', 'Radius is fixed and nonzero.', 'Motion is planar circular motion.'],
  explanation: 'Centripetal acceleration has magnitude v^2/r, which stays constant and nonzero ...',
  misconception: 'Students associate acceleration only with speeding up or slowing down ...',
  validRewrite: "The tangential component of the particle's acceleration is zero at every instant.",
}
```

### Round eligibility is derived from verdict, not hand-tagged

| Round | Eligible questions |
|---|---|
| `verdict` | any |
| `prosecution` | `verdict === 'sometimes'` only |
| `defense` | `verdict === 'always'` only |
| `rewrite` | `verdict === 'sometimes'` or `'never'`, **and** a `validRewrite` is present |

There is no `roundType` field anywhere in the data — a question's verdict alone determines which
rounds it can appear in. This is also the one documented exception to the answers-separation
rule above: `physicsCourtGenerator.ts` has to read `answers.ts` (via a lazy `await import`) to
know each question's verdict before it can route it into a round. It never shows a verdict to the
student directly — only which round a question landed in, which the design already reveals by
being in that round at all.

## Alien Physics

**Location:** `src/activities/alienPhysics/`

Every law needed to solve a problem is stated on screen — no real-world physics fact may be
required unless its skill tag was explicitly selected (`requiredSkills`, same AND semantics as
`requiredUnits` above). `questionType` is one of `decode | calculation | error_analysis | graph |
conservation | synthesis`. The four named rounds (Decode, Calculation, Error Analysis, Synthesis)
absorb `graph` questions into Decode and `conservation` questions into Calculation, since reading
a graph is a decoding skill and a conservation problem is fundamentally a calculation — see the
comment in `alienPhysicsGenerator.ts`.

For `error_analysis` questions, the fictional student's flawed numbered steps
(`flawedSolution: string[]`) are shown to the class — that's the whole point of the exercise. The
answer to *which* step is wrong (`firstBadStepIndex`) lives in `answers.ts`, not in `questions.ts`,
since that index **is** the answer.

## Experimental Design

**Location:** `src/activities/experimentalDesign/`

Students design — but never run — an experiment under explicit, airtight restrictions
(`restrictions: string[]`). The four rounds are Warm-up, Restricted, Hard, and Define The Thing.
Only Warm-up (`difficulty <= 2`) and Hard (`difficulty >= 4`) carry an enforced difficulty band;
"Restricted" and "Define The Thing" are presentational round labels, not a hand-tagged content
category, since `topicTags` is descriptive-only and is never used for filtering (same rule as
everywhere else in this app) — see the comment in `experimentalDesignGenerator.ts` for the full
reasoning.

`possibleApproaches` (in `answers.ts`) must list at least two genuinely different methods, unless
the question explicitly sets `singleValidApproach: true`.

## Content volume in this build

This build ships a **minimal seed bank** rather than the full v1 target volumes: 24 Physics Court
questions (vs. the 28-question target), 9 Alien Physics problems (vs. 16), and 7 Experimental
Design prompts (vs. 10). Every claim in the bank is adjudicated in `CONTENT-RULES.md` — this
build uses that pre-vetted content directly rather than authoring additional claims, on the
principle (also from `CONTENT-RULES.md`) that a claim with a shaky verdict is worse than no claim
at all.

Every unit/skill selection has enough eligible questions to clear the "block Start" threshold
(4 questions) on its own, but running a **full-length** lesson (no shortage notes) works best with
most or all units selected — with only 24 Physics Court questions across 7 units, for example,
selecting a single unit will produce a noticeably shorter verdict round. That's expected and
handled, not a bug (see "Shortage handling" above).

## Validation

```bash
npm run validate
```

Runs `scripts/validate.ts` and exits nonzero on any failure. It checks: ID uniqueness and format
(`XX-YYY-NNN`) across all three activities, that every question has a matching answer record and
vice versa, `difficulty` is an integer 1–5, every `requiredUnits`/`requiredSkills` entry is a real
union member, `sometimes` verdicts have a `counterexample`, `always` verdicts have a
`proofSketch` and never a `validRewrite`, every Physics Court question has non-empty
`assumptions`, `firstBadStepIndex` is in range, `possibleApproaches` has at least two entries
unless `singleValidApproach` is set, every referenced graph has real data, and every round has at
least one eligible question when everything is selected.

This is the same check that runs in CI before every deploy (see `.github/workflows/deploy.yml`) —
a content mistake fails the deploy, not just a local warning.
