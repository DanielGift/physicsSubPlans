import { Link } from 'react-router-dom';
import type { ActivityId } from '../types';

interface ActivityCardProps {
  id: ActivityId;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
}

export function ActivityCard({ id, title, shortDescription, estimatedMinutes }: ActivityCardProps) {
  return (
    <Link to={`/activity/${id}`} className="card stack" style={{ textDecoration: 'none', color: 'inherit' }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p className="text-muted" style={{ margin: 0 }}>
        {shortDescription}
      </p>
      <span className="badge">~{estimatedMinutes} min</span>
    </Link>
  );
}
