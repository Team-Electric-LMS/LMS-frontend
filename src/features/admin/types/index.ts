export * from './forms';
export * from './users';

export interface AdminPanelState {
  fetch: boolean;
  display: boolean;
  register: boolean;
  registerCourse: boolean;
  editMode: boolean;
  assign: boolean
}