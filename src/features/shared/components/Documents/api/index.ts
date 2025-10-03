import { CustomError } from "../../../classes";
import { BASE_URL } from "../../../constants";
import { ICourse, DocumentMeta } from "../types";


export async function fetchDocuments(level: string, id: string, token: string): Promise<DocumentMeta[]> {
  const res = await fetch(`${BASE_URL}/documents?level=${level}&id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new CustomError(res.status, "Failed to fetch documents");
  return res.json();
}

export async function downloadDocument(documentId: string, token: string): Promise<Blob> {
  const res = await fetch(`${BASE_URL}/documents/download/${documentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new CustomError(res.status, "Download failed");
  return res.blob();
}

export async function uploadFile(formData: FormData, token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new CustomError(res.status, "Upload failed");
  return res.json();
}

export async function getCoursesExtended(token: string): Promise<ICourse[]> {
  const res = await fetch(`${BASE_URL}/courses/courses-tree`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new CustomError(res.status, "Failed to fetch courses");
  return res.json();
}