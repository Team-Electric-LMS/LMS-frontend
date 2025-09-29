import styles from './StudentModuleActivities.module.css';
import { StudentActivityCard } from '../StudentActivityCard/StudentActivityCard';
import { useEffect } from 'react';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { useFetchWithToken } from '../../hooks/useFetchWithToken';
import { BASE_URL } from '../../constants';

interface Activity {
  id: string;
  moduleId: string;
  activityTypeId: string;
  activityTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  activityTypeName: string;
}

interface StudentModuleActivitiesProps {
  moduleId: string;
  moduleTitle: string;
}

export function StudentModuleActivities({
  moduleId,
  moduleTitle,
}: StudentModuleActivitiesProps) {
  const { user } = useAuthContext();
  const studentId = user?.id;
  const endpoint = studentId
    ? `${BASE_URL}/student/${studentId}/module/${moduleId}/activities`
    : '';
  const { data, error, isLoading, requestFunc } =
    useFetchWithToken<Activity[]>(endpoint);

  useEffect(() => {
    if (moduleId && studentId) {
      console.log('Fetching activities from:', endpoint);
      requestFunc().then(() => {
        console.log('Fetched activities data:', data);
      });
    }
  }, [moduleId, studentId]);

  if (!studentId) return <p className={styles.message}>No student ID found.</p>;
  if (isLoading) return <p className={styles.message}>Loading activities...</p>;
  if (error) return <p className={styles.message}>Error: {error.message}</p>;
  if (!data)
    return (
      <p className={styles.message}>No activities found for this module.</p>
    );

  return (
    <div className={styles['student-module-activities-card']}>
      <h2 className={styles['student-module-activities-title']}>
        Activities for module {moduleTitle}
      </h2>

      {data.map((activity) => (
        <StudentActivityCard
          key={activity.id}
          activityTitle={activity.activityTitle}
          description={activity.description}
          startDate={activity.startDate}
          endDate={activity.endDate}
          activityTypeName={activity.activityTypeName}
        />
      ))}
    </div>
  );
}
