import React from 'react';
import styles from './StudentModuleList.module.css';
import { Module } from '../../../auth/types';

interface ModuleListProps {
  modules: Module[];
  onSelectModule?: (moduleId: string) => void;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onSelectModule,
}) => (
  <ul className={styles.moduleList}>
    {[...modules]
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .map((module) => (
        <li
          key={module.id}
          className={styles.moduleItem}
          onClick={() => onSelectModule?.(module.id)}
          style={{ cursor: 'pointer' }}
        >
          <div>
            <strong>{module.name}</strong>
          </div>
          <div>{module.description}</div>
          <div>
            <span>Start: {module.startDate}</span> |{' '}
            <span>End: {module.endDate}</span>
          </div>
        </li>
      ))}
  </ul>
);
