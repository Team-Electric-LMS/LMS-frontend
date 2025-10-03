export interface DocumentMeta {
  id: string;
  name: string;
  link: string;
}

export interface IDocument {
  name: string;
  description?: string;
  uploadedById: string;
  courseId?: string;
  moduleId?: string;
  activityId?: string;
}

export interface IActivity {
  id: string;
  name: string;
}

export interface IModule {
  id: string;
  name: string;
  activities: IActivity[];
}

export interface ICourse {
  id: string;
  name: string;
  modules: IModule[];
}

export type SelectionType = "course" | "module" | "activity";

export interface SelectionDto {
  id: string;
  type: SelectionType;
}

export interface DocumentUploadForm {
  name: string;
  description?: string;
  uploadedById: string;
  file: File | null;
}