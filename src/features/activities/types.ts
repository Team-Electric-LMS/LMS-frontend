export interface ActivityDto {
  id: string;
  moduleId?: string;
  activityTypeId?: string;
  activityTitle?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  activityTypeName?: string | null;
}
