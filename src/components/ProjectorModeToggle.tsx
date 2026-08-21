import { useTeacherMode } from '../teacher/TeacherModeContext';

export function ProjectorModeToggle() {
  const { projectorMode, setProjectorMode } = useTeacherMode();
  return (
    <button className="button" data-print="hide" onClick={() => setProjectorMode(!projectorMode)} aria-pressed={projectorMode}>
      {projectorMode ? 'Exit projector mode' : 'Projector mode'}
    </button>
  );
}
