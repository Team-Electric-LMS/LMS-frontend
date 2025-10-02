import { BASE_URL } from '../shared/constants';
import type { ActivityDto } from './types';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * GET /api/modules/{moduleId}/activities
 */
export async function getActivitiesByModuleId(moduleId: string, signal?: AbortSignal): Promise<ActivityDto[]> {
  const res = await fetch(`${BASE_URL}/modules/${moduleId}/activities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    signal
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `Failed to load activities (${res.status})`);
  }

  const data: ActivityDto[] = await res.json();
  // sort by start date ASC
  return data.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}
