import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const TEACHER_STORAGE_KEY = 'physics-sub-plans:teacher-mode';

interface TeacherModeContextValue {
  teacherMode: boolean;
  setTeacherMode: (value: boolean) => void;
  projectorMode: boolean;
  setProjectorMode: (value: boolean) => void;
}

const TeacherModeContext = createContext<TeacherModeContextValue | null>(null);

function readTeacherModeFromHash(): boolean {
  if (typeof window === 'undefined') return false;
  const queryIndex = window.location.hash.indexOf('?');
  if (queryIndex === -1) return false;
  const params = new URLSearchParams(window.location.hash.slice(queryIndex + 1));
  return params.get('teacher') === '1';
}

export function TeacherModeProvider({ children }: { children: ReactNode }) {
  const [teacherModeSetting, setTeacherModeSetting] = useState<boolean>(() => {
    if (readTeacherModeFromHash()) return true;
    try {
      return localStorage.getItem(TEACHER_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [projectorMode, setProjectorMode] = useState(false);

  function setTeacherMode(value: boolean) {
    setTeacherModeSetting(value);
    try {
      localStorage.setItem(TEACHER_STORAGE_KEY, value ? '1' : '0');
    } catch {
      // Storage may be unavailable; the in-memory setting still works for this tab.
    }
  }

  // Projector Mode forces Teacher Mode panels closed while active (BUILD-SPEC.md §9),
  // without discarding the underlying setting once projector mode is turned back off.
  const effectiveTeacherMode = teacherModeSetting && !projectorMode;

  useEffect(() => {
    document.body.classList.toggle('teacher-mode', effectiveTeacherMode);
    document.body.classList.toggle('projector-mode', projectorMode);
  }, [effectiveTeacherMode, projectorMode]);

  const value = useMemo(
    () => ({ teacherMode: effectiveTeacherMode, setTeacherMode, projectorMode, setProjectorMode }),
    [effectiveTeacherMode, projectorMode],
  );

  return <TeacherModeContext.Provider value={value}>{children}</TeacherModeContext.Provider>;
}

export function useTeacherMode(): TeacherModeContextValue {
  const ctx = useContext(TeacherModeContext);
  if (!ctx) throw new Error('useTeacherMode must be used within a TeacherModeProvider');
  return ctx;
}
