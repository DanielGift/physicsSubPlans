import type { ActivityId } from '../types';
import type { LessonSession } from './sessionTypes';

const KEY_PREFIX = 'physics-sub-plans:session:';

function keyFor(activityId: ActivityId): string {
  return `${KEY_PREFIX}${activityId}`;
}

export function saveSession(session: LessonSession): void {
  try {
    localStorage.setItem(keyFor(session.activityId), JSON.stringify(session));
  } catch {
    // Storage can be unavailable (e.g. private browsing quota) — the lesson still
    // runs from in-memory state, it just won't survive a refresh.
  }
}

export function loadSession(activityId: ActivityId): LessonSession | null {
  try {
    const raw = localStorage.getItem(keyFor(activityId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LessonSession;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(activityId: ActivityId): void {
  try {
    localStorage.removeItem(keyFor(activityId));
  } catch {
    // Nothing to do if storage is unavailable.
  }
}
