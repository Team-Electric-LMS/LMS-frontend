import { useEffect } from 'react';
import { Module } from '../../../auth/types';
import { useFetchWithToken } from '../../../shared/hooks';
import { BASE_URL } from '../../../shared/constants';
import { ModuleListItem } from './ModuleListItem';
import styles from './TeacherModuleList.module.css';

interface TeacherModuleListProps {
  courseId: string;
  courseName: string;
}

export function TeacherModuleList({ courseId, courseName }: TeacherModuleListProps) {
  const endpoint = `${BASE_URL}/courses/${courseId}/modules`;
  const { data: modules, error, isLoading, requestFunc } = useFetchWithToken<Module[]>(endpoint);

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
        <h2>Moduler för kursen: {courseName}</h2>
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