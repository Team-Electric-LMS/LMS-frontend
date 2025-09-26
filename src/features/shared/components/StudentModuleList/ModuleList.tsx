import React from 'react';
import styles from './StudentModuleList.module.css';
import { Module } from '../../../auth/types';

interface ModuleListProps {
  modules: Module[];
}

export const ModuleList: React.FC<ModuleListProps> = ({ modules }) => (
  <ul className={styles.moduleList}>
    {[...modules]
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .map((module) => (
        <li key={module.id} className={styles.moduleItem}>
          <div><strong>{module.name}</strong></div>
          <div>{module.description}</div>
          <div>
            <span>Start: {module.startDate}</span> | <span>End: {module.endDate}</span>
          </div>
        </li>
      ))}
  </ul>
);
