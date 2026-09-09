// Content validation — see BUILD-SPEC.md §8. Exits nonzero on any failure.

import { PHYSICS_UNITS } from '../src/types';
import { physicsCourtQuestions } from '../src/activities/physicsCourt/questions';
import { physicsCourtAnswers } from '../src/activities/physicsCourt/answers';
import { experimentalDesignQuestions } from '../src/activities/experimentalDesign/questions';
import { experimentalDesignAnswers } from '../src/activities/experimentalDesign/answers';
import { getEligiblePool as getPhysicsCourtPool } from '../src/activities/physicsCourt/physicsCourtGenerator';
import { getEligiblePool as getExperimentalDesignPool } from '../src/activities/experimentalDesign/experimentalDesignGenerator';

const errors: string[] = [];

function fail(message: string): void {
  errors.push(message);
}

const ID_PATTERN = /^[A-Z]{2}-[A-Z]{3}-\d{3}$/;

function checkIdFormat(id: string): void {
  if (!ID_PATTERN.test(id)) {
    fail(`ID "${id}" does not match the XX-YYY-NNN pattern.`);
  }
}

function checkDuplicateIds(allIds: string[]): void {
  const seen = new Map<string, number>();
  for (const id of allIds) {
    seen.set(id, (seen.get(id) ?? 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count > 1) fail(`ID "${id}" is used ${count} times — IDs must be unique across the whole app.`);
  }
}

function checkDifficulty(id: string, difficulty: number): void {
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
    fail(`${id}: difficulty ${difficulty} is not an integer in 1-5.`);
  }
}

// --- Physics Court ---

const pcIds = physicsCourtQuestions.map((q) => q.id);
pcIds.forEach(checkIdFormat);

for (const q of physicsCourtQuestions) {
  checkDifficulty(q.id, q.difficulty);
  for (const unit of q.requiredUnits) {
    if (!PHYSICS_UNITS.includes(unit)) fail(`${q.id}: "${unit}" is not a valid PhysicsUnit.`);
  }
  if (!q.requiredUnits.length) fail(`${q.id}: requiredUnits must be non-empty.`);

  const answer = physicsCourtAnswers[q.id];
  if (!answer) {
    fail(`${q.id}: no matching answer record.`);
    continue;
  }
  if (!answer.assumptions || answer.assumptions.length === 0) {
    fail(`${q.id}: assumptions must be non-empty.`);
  }
  if (answer.verdict === 'sometimes' && !answer.counterexample?.trim()) {
    fail(`${q.id}: verdict is "sometimes" but counterexample is missing.`);
  }
  if (answer.verdict === 'always' && !answer.proofSketch?.trim()) {
    fail(`${q.id}: verdict is "always" but proofSketch is missing.`);
  }
  if (answer.verdict === 'always' && answer.validRewrite) {
    fail(`${q.id}: verdict is "always" but validRewrite is present.`);
  }
}

for (const id of Object.keys(physicsCourtAnswers)) {
  if (!pcIds.includes(id)) fail(`physicsCourtAnswers has "${id}" with no matching question.`);
}

// --- Experimental Design ---

const edIds = experimentalDesignQuestions.map((q) => q.id);
edIds.forEach(checkIdFormat);

for (const q of experimentalDesignQuestions) {
  checkDifficulty(q.id, q.difficulty);
  for (const unit of q.requiredUnits) {
    if (!PHYSICS_UNITS.includes(unit)) fail(`${q.id}: "${unit}" is not a valid PhysicsUnit.`);
  }
  if (!q.requiredUnits.length) fail(`${q.id}: requiredUnits must be non-empty.`);

  const answer = experimentalDesignAnswers[q.id];
  if (!answer) {
    fail(`${q.id}: no matching answer record.`);
    continue;
  }
  if (!q.singleValidApproach && answer.possibleApproaches.length < 2) {
    fail(`${q.id}: possibleApproaches must have length >= 2 unless singleValidApproach is set.`);
  }
  if (!answer.majorPitfalls || answer.majorPitfalls.length === 0) {
    fail(`${q.id}: majorPitfalls must be non-empty.`);
  }
}

for (const id of Object.keys(experimentalDesignAnswers)) {
  if (!edIds.includes(id)) fail(`experimentalDesignAnswers has "${id}" with no matching question.`);
}

// --- IDs unique across the whole app ---

checkDuplicateIds([...pcIds, ...edIds]);

// --- Graph assets resolve (every graph referenced has at least one series with points) ---

for (const q of physicsCourtQuestions) {
  if (q.graph) {
    if (!q.graph.series.length) fail(`${q.id}: graph has no series.`);
    for (const series of q.graph.series) {
      if (!series.points.length) fail(`${q.id}: graph series "${series.label}" has no points.`);
    }
  }
}

// --- Eligibility pools are non-empty ---

if (getPhysicsCourtPool(PHYSICS_UNITS).length === 0) {
  fail('Physics Court has no eligible questions when all units are selected.');
}

const ED_TARGET_COUNTS: Record<string, number> = {
  kinematics: 3,
  forces: 3,
  energy: 2,
  momentum: 2,
  rotation: 2,
  oscillations: 2,
};
for (const unit of PHYSICS_UNITS) {
  const count = getExperimentalDesignPool([unit]).length;
  if (count !== ED_TARGET_COUNTS[unit]) {
    fail(`Experimental Design: expected ${ED_TARGET_COUNTS[unit]} prompt(s) for unit "${unit}", found ${count}.`);
  }
}

// --- Report ---

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Validation passed: ${pcIds.length} Physics Court, ${edIds.length} Experimental Design questions.`);
