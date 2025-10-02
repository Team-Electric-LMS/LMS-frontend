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
}

export function TeacherModuleList({
  courseId,
  courseName,
  onClose,
}: TeacherModuleListProps) {
  const endpoint = `${BASE_URL}/courses/${courseId}/modules`;

  // Fetch modules for the given course
  const {
    data: modules,
    error,
    isLoading,
    requestFunc,
  } = useFetchWithToken<Module[]>(endpoint);

  // Trigger data fetch on courseId change
  useEffect(() => {
    if (courseId) {
      requestFunc();
    }
  }, [courseId]);

  if (isLoading) return <p className={styles.message}>Loading modules...</p>;
  if (error) return <p className={styles.message}>Error loading modules.</p>;
  if (!modules || modules.length === 0)
    return <p className={styles.message}>No modules found.</p>;

  return (
    <div className={styles.moduleListCard}>
      <h2>Modules for the course: {courseName}</h2>
      {/* Close button, calls parent handler (TeacherDashboardSection) to hide this component */}
      <button className={styles['button-close']} onClick={onClose}>
        Close
      </button>
      {isLoading && <p className={styles.message}>Loading modules...</p>}
      {error && <p className={styles.message}>Error loading modules.</p>}
      {!modules || modules.length === 0 ? (
        <p className={styles.message}>No modules found.</p>
      ) : (
        <ul className={styles.moduleList}>
          {modules.map((module: Module) => (
            <ModuleListItem key={module.id} module={module} />
          ))}
        </ul>
      )}
    </div>
  );
}
