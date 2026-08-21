import { Link, Outlet } from 'react-router-dom';
import { TeacherModeProvider, useTeacherMode } from './teacher/TeacherModeContext';

function Footer() {
  const { teacherMode, setTeacherMode } = useTeacherMode();
  return (
    <footer className="page" data-print="hide">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <label className="row">
          <input type="checkbox" checked={teacherMode} onChange={(e) => setTeacherMode(e.target.checked)} />
          Teacher Mode
        </label>
        {teacherMode && <Link to="/teacher/bank">Bank Browser</Link>}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <TeacherModeProvider>
      <div className="stack">
        <nav className="page" data-print="hide" style={{ paddingBottom: 0 }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', textDecoration: 'none' }}>
            Substitute Physics
          </Link>
        </nav>
        <Outlet />
        <Footer />
      </div>
    </TeacherModeProvider>
  );
}
