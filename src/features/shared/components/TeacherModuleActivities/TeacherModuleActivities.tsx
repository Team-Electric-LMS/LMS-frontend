import { useEffect, useState } from 'react';
import { getActivitiesByModuleId } from '../../../activities/activityApi';
import type { ActivityDto } from '../../../activities/types';
import { StudentActivityCard } from '../StudentActivityCard/StudentActivityCard';
import { getDisplayActivityTitle } from '../../../activities/formatters';
import styles from './TeacherModuleActivities.module.css';

type Props = { moduleId: string; moduleTitle: string };

export default function TeacherModuleActivities({ moduleId, moduleTitle }: Props) {
  const [activities, setActivities] = useState<ActivityDto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    getActivitiesByModuleId(moduleId, ctrl.signal)
      .then(setActivities)
      .catch(e => setError(e.message ?? 'Failed to load activities'))
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [moduleId]);

  // 👉 Overwrite titles here so the card gets the exact string we want
  const visible = (activities ?? []).map((a, idx) => {
    const displayTitle = getDisplayActivityTitle(a, idx); // "Seminar Activity 1", etc.
    const withTitle: ActivityDto = { ...a, activityTitle: displayTitle };
    // TEMP: verify in console
    // console.log('Sending title to card:', withTitle.activityTitle);
    return withTitle;
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Activities – {moduleTitle}</h3>

      {loading && <p>Loading activities…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && visible.length === 0 && <p>No activities found.</p>}

<div className={styles.list}>
  {activities?.map((a, idx) => {
        const type = (a.activityTypeName ?? 'Activity').toString().trim() || 'Activity';
        const title = `${type} Activity ${idx + 1}`;

    return (
        <StudentActivityCard
            key={a.id ?? `${moduleId}-${idx}`}
            activityTitle={title}
            description={a.description ?? ''}
            startDate={a.startDate ?? ''}
            endDate={a.endDate ?? ''}
            activityTypeName={a.activityTypeName ?? ''}
        />
    );
  })}
</div>


    </div>
  );
}
