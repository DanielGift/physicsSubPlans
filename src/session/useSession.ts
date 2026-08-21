import { useCallback, useEffect, useState } from 'react';
import type { ActivityId } from '../types';
import { clearSession, loadSession, saveSession } from './sessionStorage';
import type { LessonSession } from './sessionTypes';

export function useSession(activityId: ActivityId) {
  const [session, setSession] = useState<LessonSession | null>(null);
  const [resumableSession, setResumableSession] = useState<LessonSession | null>(null);

  useEffect(() => {
    setResumableSession(loadSession(activityId));
  }, [activityId]);

  useEffect(() => {
    if (session) saveSession(session);
  }, [session]);

  const startSession = useCallback((next: LessonSession) => {
    setSession(next);
    setResumableSession(null);
  }, []);

  const resume = useCallback(() => {
    setResumableSession((current) => {
      if (current) setSession(current);
      return null;
    });
  }, []);

  const discardResumable = useCallback(() => {
    clearSession(activityId);
    setResumableSession(null);
  }, [activityId]);

  const endSession = useCallback(() => {
    clearSession(activityId);
    setSession(null);
  }, [activityId]);

  const updateSession = useCallback((updater: (prev: LessonSession) => LessonSession) => {
    setSession((prev) => (prev ? updater(prev) : prev));
  }, []);

  return { session, resumableSession, startSession, resume, discardResumable, endSession, updateSession };
}
