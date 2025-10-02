import React from 'react';
import { getActivitiesByModuleId } from '../activityApi';
import type { ActivityDto } from '../types';

type Props = {
  moduleId: string;
  className?: string;
};

export default function ModuleActivities({ moduleId, className }: Props) {
  const [activities, setActivities] = React.useState<ActivityDto[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    getActivitiesByModuleId(moduleId, ctrl.signal)
      .then(setActivities)
      .catch((e) => setError(e.message ?? 'Could not load activities'))
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [moduleId]);

  if (loading) {
    return <div className={className}>Loading activities…</div>;
  }

  if (error) {
    return <div className={className} role="alert">Failed to load activities: {error}</div>;
  }

  if (!activities || activities.length === 0) {
    return <div className={className}>No activities yet for this module.</div>;
  }

  return (
    <div className={className}>
      <h4 className="font-semibold mb-2">Activities</h4>
      <ul className="space-y-2">
        {activities.map(a => (
          <li key={a.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {a.activityTitle ?? '(Untitled)'}
              </span>
              <span className="text-sm opacity-70">
                {formatDate(a.startDate)} – {formatDate(a.endDate)}
              </span>
            </div>
            <div className="text-sm opacity-80">
              {a.activityTypeName ?? 'Activity'}
            </div>
            {a.description && (
              <p className="text-sm mt-1">{a.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
