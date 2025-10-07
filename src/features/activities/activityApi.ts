import { BASE_URL } from '../shared/constants';
import type { ActivityDto } from './types';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Accept both our DTO and “nearby” shapes from backend
function normalizeActivity(dto: any): ActivityDto {
  return {
    id: dto.id ?? dto.activityId ?? crypto.randomUUID(),
    activityTitle:
      dto.activityTitle ??
      dto.title ??
      dto.name ??
      '(untitled)',
    description: dto.description ?? dto.details ?? '',
    startDate:
      dto.startDate ??
      dto.start ??
      dto.activityStartDate ??
      null,
    endDate:
      dto.endDate ??
      dto.finishDate ??
      dto.activityEndDate ??
      null,
    activityTypeName:
      dto.activityTypeName ??
      dto.typeName ??
      dto.activityType?.name ??
      '',
  };
}

/**
 * GET /api/modules/{moduleId}/activities
 */
export async function getActivitiesByModuleId(
  moduleId: string,
  signal?: AbortSignal
): Promise<ActivityDto[]> {
  const res = await fetch(`${BASE_URL}/modules/${moduleId}/activities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    signal,
  });

  if (res.status === 404) return [];

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `Failed to load activities (${res.status})`);
  }

  const raw = await res.json();

  // Normalize so UI gets consistent fields
  const normalized = Array.isArray(raw) ? raw.map(normalizeActivity) : [];

  // Sort by startDate ASC when available
  normalized.sort((a, b) => {
    const da = a.startDate ? new Date(a.startDate).getTime() : Number.MAX_SAFE_INTEGER;
    const db = b.startDate ? new Date(b.startDate).getTime() : Number.MAX_SAFE_INTEGER;
    return da - db;
  });

  return normalized;
}
