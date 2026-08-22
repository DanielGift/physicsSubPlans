import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="stack">
      <nav className="page" data-print="hide" style={{ paddingBottom: 0 }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', textDecoration: 'none' }}>
          Substitute Physics
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
