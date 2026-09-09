# Substitute Physics

A static React site holding two self-running AP Physics C: Mechanics substitute activities. A
substitute with no physics background opens the site, checks off what the class has already
learned, picks an activity, and runs the lesson on a projector for the whole room. There is no
separate teacher view or hidden toggle — every screen is meant to be seen by the class, and the
site always renders at projector-friendly sizing (see `CONTENT-RULES.md` and `BUILD-SPEC.md` for
the original rationale; the "Since the original build" section below covers what changed and why).

This README is written so it's usable without reading any React.

## Since the original build

`BUILD-SPEC.md` and `CONTENT-RULES.md` describe the original design — three activities, including
"Alien Physics." Since then:

- **Alien Physics was removed from the site.** A worksheet-based, math-focused activity (made-up
  laws, solved with calculus/algebra rather than real physics) turned out to fit a printed
  document better than an interactive page. Its question bank became the basis for a standalone
  `.docx` worksheet instead — see `Alien Physics Worksheet.docx` in this folder. `ActivityId` now
  has two values (`physics-court`, `experimental-design`), and the twelve-value `ReasoningSkill`
  union is gone along with it, since nothing else used it.
- **Teacher Mode is gone.** There is no hidden toggle, no separate `TeacherAnswerPanel`, and no
  Bank Browser. Answer reveals became on-demand steps in the normal flow instead of a hidden
  view — at first via a generic `AnswerReveal.tsx` used by both remaining activities, then (see
  below) removed from Experimental Design entirely, leaving `PhysicsCourtConclusion.tsx` as the
  only reveal step left in the app.
- **Projector sizing is the only mode.** There's no toggle for it — the base type scale in
  `tokens.css` *is* the projector scale, everywhere, always.
- **The "Before you start" onboarding screen is gone** for Experimental Design. Setup goes
  straight into the worksheet. Physics Court has its own two-screen intro instead (see below).
- **Gravitation is not its own unit.** It isn't a unit in the current AP Physics C: Mechanics
  framework. `PhysicsUnit` has six values now (kinematics, forces, energy, momentum, rotation,
  oscillations) — see the Physics Court section for where its content went.
- **Both remaining activities dropped their round structure**: Physics Court runs one continuous,
  non-stop cycle instead of four rounds; Experimental Design shows a fixed set of scenarios
  instead of four difficulty-banded rounds.
- **The Timer component is gone, site-wide.** Neither activity shows a clock anymore.
- **`AnswerReveal.tsx` is gone.** Experimental Design no longer has any in-app answer reveal —
  groups design on paper, and the substitute isn't shown a "correct" answer at all.
- **Experimental Design dropped seeds and session persistence, but kept unit selection.** The one
  setup screen combines instructions for the substitute with the same unit checkboxes as before —
  checking a unit includes its one scenario, in a fixed unit order, no randomization. Nothing
  about a run is remembered across a page reload; unchecking everything and reloading just goes
  back to the instructions screen.

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
  activities/            one folder per activity (physicsCourt, experimentalDesign)
    registry.ts          the list the home page renders from
  components/            shared, activity-agnostic UI (MathContent, TagBadge, ...)
  session/               LessonSession type + localStorage persistence — Physics Court only now
  utilities/             pure logic: seeded RNG, the balanced sampler
scripts/validate.ts      content consistency checks — npm run validate
```

Each activity owns its own schema and generation logic under `src/activities/<name>/`:

| File | Contents |
|---|---|
| `<name>Types.ts` | The question/answer TypeScript interfaces for this activity. |
| `questions.ts` | **Student-safe fields only.** Everything shown on screen. |
| `answers.ts` | Verdicts, explanations, and every other adjudicated field. |
| `<name>Generator.ts` | Pure, React-free functions/data that decide what shows up. |
| `<Name>Setup.tsx` | The one screen shown before the activity itself. |
| `<Name>.tsx` | The activity's top-level component. |

The two activities don't share a "lesson shell" or round-navigator component — Physics Court is a
live cycle with session persistence and a growing question list, Experimental Design is a fixed,
unconfigurable list of 5 scenarios with nothing to remember, and they ended up different enough
that a shared abstraction wasn't worth it. `session/useSession.ts` and `session/sessionTypes.ts`
(localStorage persistence and resume) are Physics-Court-only at this point.

### Why questions and answers are separate files

`questions.ts` is imported everywhere. `answers.ts` is imported **only** by
`PhysicsCourtConclusion.tsx`, Physics Court's reveal step, via a lazy `await import(...)`, so the
answer key ships as its own JS chunk rather than bundled into the code every visitor downloads on
page load. Experimental Design has no reveal step at all anymore — its `answers.ts` is validated
content data (see `npm run validate`) that nothing in the running app imports. A Vitest test
(`src/activities/answerIsolation.test.ts`) enforces the separation by scanning the source tree for
the literal string `"answers"` and failing if it turns up anywhere it shouldn't — `answers.ts`
files and `PhysicsCourtConclusion.tsx` are the only allowed exceptions.

## Prerequisite tags: `requiredUnits` is AND, not OR

Every question lists the units it depends on. **Every single one of those must be checked off**
for the question to be eligible — it is not "eligible if the class has covered any of these."

```ts
requiredUnits: ['energy', 'rotation']
```

A question tagged like this needs **both** Energy *and* Rotation selected. If only Energy is
checked, this question does not show up — because rotational kinetic energy (the actual subject
of that question) hasn't been taught yet. Selecting more units only ever adds eligible questions;
it never removes any.

`topicTags` is different: it's free-text and descriptive only ("circular motion", "SHM"), shown
on screen for context, and **never** used to decide eligibility.

Both activities use `requiredUnits` live. Physics Court balances across units every cycle (see
below); Experimental Design just includes every question tagged to a checked unit, in a fixed
bank order — no sampling, since a substitute checking a unit should see everything the bank has
for it, not a random subset.

## The balanced sampler

`src/utilities/balancedSample.ts` builds one pool per selected unit, puts each question (even a
multi-unit one) into the pool for its *scarcest* required unit, shuffles each pool with a seeded
RNG, and round-robins across pools until the target count is filled or every pool runs dry. It
never shuffles the whole bank and slices off the top — that would let one heavily stocked unit
crowd out a thinly stocked one. Only Physics Court uses it (see `shuffleLap` in
`physicsCourtGenerator.ts`) — Experimental Design's `buildWorksheet` just includes every question
for each checked unit, in the bank's declared order; there's nothing to sample or shuffle since
every question for a checked unit is shown, not a random pick from it.

**Same seed + same units → the identical Physics Court cycle, every time.** That's what lets you
type a seed from one class section into another section's Advanced Options and run the two
sections in sync. If no seed is given, a short one like `k7m2-q4x9` is generated so it's easy to
read aloud and retype — it's always shown in the header. Experimental Design has unit checkboxes
but no seed (there's nothing to randomize), so this only applies to Physics Court.

## Physics Court

**Location:** `src/activities/physicsCourt/`

Students see a `setup` — the **statement**, shown in blue — and a `claim` — shown in red — and
the class debates whether the claim is **Always**, **Maybe**, or **Never** true as a result of the
statement (that's the class-facing framing; internally the `Verdict` type is still
`'always' | 'sometimes' | 'never'`, mapped to those labels by `VERDICT_DISPLAY_LABEL` in
`physicsCourtTypes.ts`).

```ts
// questions.ts — shown during the debate
{
  id: 'PC-KIN-003',
  setup: 'A particle moves at constant speed around a circle of fixed, nonzero radius.',
  claim: "The particle's acceleration is zero at some instant.",
  requiredUnits: ['kinematics'],
  topicTags: ['circular motion'],
  difficulty: 3,
}

// answers.ts — revealed on "Reveal conclusion", lazy-loaded
'PC-KIN-003': {
  verdict: 'never',
  assumptions: ['Speed is constant and nonzero.', 'Radius is fixed and nonzero.', 'Motion is planar circular motion.'],
  explanation: 'Centripetal acceleration has magnitude v^2/r, which stays constant and nonzero ...',
  misconception: 'Students associate acceleration only with speeding up or slowing down ...',
  validRewrite: "The tangential component of the particle's acceleration is zero at every instant.",
}
```

### Units: 58 questions, gravitation folded in

`PhysicsUnit` has six values — gravitation isn't one of them in the current AP Physics C:
Mechanics framework. The bank targets a specific distribution: **12 kinematics, 12 forces, 10
energy, 10 momentum, 7 rotation, 7 oscillations** (`PC-ENE-002` is cross-tagged energy+rotation and
counts toward both, so 58 unique questions cover 59 "slots" — see the unit-distribution test in
`physicsCourtGenerator.test.ts`, which locks these exact counts in). The four former-gravitation
claims were folded into the unit their physics actually belongs to, not discarded:

- `PC-FOR-004` (astronaut in orbit is accelerating) and `PC-FOR-005` (Kepler's third law) → **Forces**,
  since both come from setting gravity equal to the required centripetal force.
- `PC-ENE-004` (shell theorem: field vs. potential) and `PC-ENE-005` (orbital energy, E = -K = U/2) →
  **Energy**, since both are fundamentally about potential/mechanical energy.

### One continuous cycle, not four rounds

Physics Court used to run four sequential rounds (Verdict/Prosecution/Defense/Rewrite), each
capped to a small count. It now runs a single, non-stop cycle instead, so a class period is never
cut short by an artificial limit:

1. **Presentation** — the statement (blue) and claim (red) appear. The class debates until it
   reaches a unanimous class vote.
2. Click **Reveal conclusion** — the actual verdict, explanation, misconception, and (if one
   exists) a valid rewrite appear, via `PhysicsCourtConclusion.tsx`.
3. Click **Next statement** — a new statement/claim appears, and the cycle repeats.

There is no round boundary and no "lesson complete" screen — `PhysicsCourt.tsx` keeps a growing,
shuffled list of question IDs in `session.rounds[0].questionIds` and tops it up automatically
(`physicsCourtGenerator.ts`'s `shuffleLap`) whenever the class is a couple of questions from
running out. Each "lap" through the eligible pool is a fresh balanced shuffle, seeded from
`` `${sessionSeed}:lap${lapIndex}` `` so a resumed session regenerates the exact same lap it was
on rather than replaying lap 0. A substitute ends the class with the **End lesson** button in the
header, whenever the period is over — there's no natural endpoint to wait for.

`PhysicsCourtConclusion.tsx` is the one exception to the answers-separation rule above: it's the
reveal step of the cycle, so it has to read `answers.ts` (via a lazy `await import`) — there's no
more separate hidden view, this is just the next screen everyone sees.

### Two intro screens, shown once per fresh start

Starting a lesson (not resuming one) shows two screens before the first statement, each its own
small component:

1. **`PhysicsCourtSubIntro.tsx`** — for the substitute. Explains the facilitation job: get the
   class to a unanimous consensus vote before revealing, let discussion run at least ~2 minutes,
   no physics knowledge required.
2. **`PhysicsCourtStudentIntro.tsx`** — meant to be read by the class (it says so on screen).
   Explains the blue statement / red claim convention, that the class needs to reach a unanimous
   consensus before asking the substitute to reveal, and that notes/devices aren't allowed.

Resuming an in-progress session skips both (the class has already seen them this lesson).

## Experimental Design

**Location:** `src/activities/experimentalDesign/`

Groups design — but never run — an experiment under explicit, airtight restrictions
(`restrictions: string[]`). The bank holds **14 prompts across six units — 3 kinematics, 3
forces, 2 each for energy, momentum, rotation, and oscillations** — each measuring something
deliberately unusual to force real thinking rather than a familiar textbook setup: determining
mass with no scale (via a two-person recoil push-off, a collision, and an oscillating rubber
band), telling a raw egg from a hard-boiled one without opening either, identifying a solid vs.
hollow cylinder by racing them down a ramp, a falling coffee filter's terminal velocity, reaction
time measured without any electronic timer, sorting out whether a coasting bicycle wheel loses
more speed to air resistance or axle friction, locating an off-center mass by balance point alone,
and testing the (false) belief that a heavier swinger completes each swing more slowly.

`ExperimentalDesignSetup.tsx` combines instructions for the substitute (groups of 3–4, paper and
pencil only, design don't run, scroll for more scenarios as groups finish, effort matters more
than finishing all of them, and turn in everyone's-name-labeled work at the end) with the same
unit checkboxes Physics Court uses. Checking a unit includes every prompt tagged to it — 2 or 3,
not just 1 — in the bank's fixed declared order; there's no seed and no randomization.
`ExperimentalDesign.tsx` then renders the selected prompts as stacked cards, each sized to roughly
half the viewport height so about two scenarios are visible on screen at a time and the rest is a
scroll away. No timer, no answer reveal, no session persistence: reloading the page (or
unchecking every unit) just goes back to the instructions screen.

`possibleApproaches` (in `answers.ts`) must list at least two genuinely different methods, unless
the question explicitly sets `singleValidApproach: true` — this is still validated content data
even though nothing in the app displays it; see "Why questions and answers are separate files"
above.

## Alien Physics Worksheet.docx

Alien Physics isn't part of the site anymore, but its question bank was strong content — made-up
laws from fictional worlds, solved with calculus/algebra/vector skills rather than real physics —
so it lives on as a standalone Word document instead of an interactive page. It's a static
worksheet of 30 problems: statements of each fictional law, the problem, and (for error-analysis
items) a fictional student's flawed numbered steps to critique — 25 mixed together, then 5 more
collected in a separately labeled **Differential Equations** section, then an answer key for all
30 at the end. Print it, or open it in Word. The source content lives in a standalone Node script
(not part of this repo's build), since it has no other consumer.

## Validation

```bash
npm run validate
```

Runs `scripts/validate.ts` and exits nonzero on any failure. It checks: ID uniqueness and format
(`XX-YYY-NNN`) across both activities, that every question has a matching answer record and vice
versa, `difficulty` is an integer 1–5, every `requiredUnits` entry is a real union member,
`sometimes` verdicts have a `counterexample`, `always` verdicts have a `proofSketch` and never a
`validRewrite`, every Physics Court question has non-empty `assumptions`, `possibleApproaches` has
at least two entries unless `singleValidApproach` is set, every referenced graph has real data,
Physics Court has a non-empty eligible pool when all units are selected, and Experimental Design
matches its target per-unit counts (3 kinematics, 3 forces, 2 each for the rest).

This is the same check that runs in CI before every deploy (see `.github/workflows/deploy.yml`) —
a content mistake fails the deploy, not just a local warning.
