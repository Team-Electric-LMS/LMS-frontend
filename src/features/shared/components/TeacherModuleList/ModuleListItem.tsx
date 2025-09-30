import React from 'react';
import { Module } from '../../../auth/types';
import styles from './ModuleListItem.module.css';

interface ModuleListItemProps {
  module: Module;
}

export const ModuleListItem: React.FC<ModuleListItemProps> = ({ module }) => {
  return (
    <div className={styles.moduleCard}>
      <div><strong>{module.name}</strong></div>
      <div>{module.description}</div>
      <div>
        <span>Start: {module.startDate}</span> | <span>End: {module.endDate}</span>
      </div>
    </div>
  );
};