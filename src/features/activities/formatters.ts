import type { ActivityDto } from './types';

export function getDisplayActivityTitle(a: ActivityDto, index: number): string {
  const raw = (a.activityTitle ?? '').trim();
  if (raw) return raw;
  const type = (a.activityTypeName ?? '').trim() || 'Activity';
  return `${type} Activity ${index + 1}`;
}
