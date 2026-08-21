import { Route, Routes, useParams } from 'react-router-dom';
import { activityRegistry, getActivity } from './activities/registry';
import App from './App';
import { ActivityCard } from './components/ActivityCard';
import { BankBrowser } from './teacher/BankBrowser';

function Home() {
  return (
    <div className="page stack">
      <h1>Substitute Physics</h1>
      <p className="text-muted">
        Pick an activity, check off what the class has covered, and run an 80-minute AP Physics C: Mechanics
        lesson. No physics background required.
      </p>
      <div className="stack">
        {activityRegistry.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            title={activity.title}
            shortDescription={activity.shortDescription}
            estimatedMinutes={activity.estimatedMinutes}
          />
        ))}
      </div>
    </div>
  );
}

function ActivityPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const activity = activityId ? getActivity(activityId) : undefined;

  if (!activity) {
    return (
      <div className="page">
        <p>Unknown activity.</p>
      </div>
    );
  }

  const Component = activity.Component;
  return <Component />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="activity/:activityId" element={<ActivityPage />} />
        <Route path="teacher/bank" element={<BankBrowser />} />
      </Route>
    </Routes>
  );
}
