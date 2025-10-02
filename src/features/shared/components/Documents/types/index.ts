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

export interface Activity {
  id: string;
  name: string;
}

export interface Module {
  id: string;
  name: string;
  activities: Activity[];
}

export interface Course {
  id: string;
  name: string;
  modules: Module[];
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

export interface DocumentUploadFormProps {
  selections: SelectionDto[];
  uploadedById: string;
}

