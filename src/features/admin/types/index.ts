export * from './forms';
export * from './users';

export interface AdminState {
  fetch: boolean;
  display: boolean;
  register: boolean;
  editMode: boolean;
  assign: boolean
}