import { useEffect } from 'react';
import { Module } from '../../../auth/types';
import { useFetchWithToken } from '../../../shared/hooks';
import { BASE_URL } from '../../../shared/constants';
import { ModuleListItem } from './ModuleListItem';
import styles from './TeacherModuleList.module.css';

interface TeacherModuleListProps {
  courseId: string;
  courseName: string;
  onClose: () => void;
  onSelectModule?: (m: { id: string; moduleTitle: string }) => void;
}

export function TeacherModuleList({
  courseId,
  courseName,
  onClose,
  onSelectModule,
}: TeacherModuleListProps) {
  const { data: modules, error, isLoading, requestFunc } =
    useFetchWithToken<Module[]>(`${BASE_URL}/courses/${courseId}/modules`);

  useEffect(() => { requestFunc(); }, [courseId]);

  if (isLoading) return <p className={styles.message}>Loading modules…</p>;
  if (error)     return <p className={styles.message}>Error: {error.message}</p>;
  if (!modules?.length) return <p className={styles.message}>No modules found for {courseName}</p>;

  return (
    <div className={styles.moduleListCard}>
      <h2>Modules for the course: {courseName}</h2>
      {/* Close button, calls parent handler (TeacherDashboardSection) to hide this component */}
      <button className={styles['button-close']} onClick={onClose}>Close</button>
      <ul className={styles.moduleList}>
        {modules.map((m) => (
          <ModuleListItem key={m.id} module={m} onSelectModule={onSelectModule} />
        ))}
      </ul>
    </div>
  );
}
