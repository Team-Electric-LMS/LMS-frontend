export type ActivityDto = {
  id: string;
  moduleId: string;
  activityTypeId: string;
  activityTitle: string | null;
  description: string | null;
  startDate: string;
  endDate: string; 
  activityTypeName: string | null;
};
