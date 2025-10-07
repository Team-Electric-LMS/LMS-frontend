import React from 'react';
import { Module } from '../../../auth/types';
import styles from './ModuleListItem.module.css';

interface ModuleListItemProps {
  module: Module;
  onSelectModule?: (m: { id: string; moduleTitle: string }) => void;
}

export const ModuleListItem: React.FC<ModuleListItemProps> = ({ module, onSelectModule }) => {
  return (
    <li
      className={styles.moduleCard}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelectModule?.({ id: module.id, moduleTitle: module.name })}
    >
      <div><strong>{module.name}</strong></div>
      <div>{module.description}</div>
      <div>
        <span>Start: {module.startDate}</span> | <span>End: {module.endDate}</span>
      </div>
    </li>
  );
};
