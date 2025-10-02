import { BASE_URL } from '../../shared/constants';
import { CustomError } from '../../shared/classes';
import { IModule } from '../types/modules';

// Create a new module for a course
export async function createCourseModule(courseId: string, moduleData: Partial<IModule>, token: string): Promise<IModule> {
  const url = `${BASE_URL}/teachers/courses/${courseId}/modules`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(moduleData),
  });
  if (!response.ok) {
    let errorMsg = 'Failed to create module';
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMsg = errorBody.message;
        console.error('Backend error:', errorMsg);
      }
    } catch {}
    throw new CustomError(response.status, errorMsg);
  }
  return await response.json();
}

// Update an existing module
export async function updateCourseModule(courseId: string, moduleId: string, moduleData: Partial<IModule>, token: string): Promise<IModule> {
  const url = `${BASE_URL}/teachers/courses/${courseId}/modules/${moduleId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(moduleData),
  });
  if (!response.ok) {
    let errorMsg = 'Failed to update module';
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMsg = errorBody.message;
        console.error('Backend error:', errorMsg);
      }
    } catch {}
    throw new CustomError(response.status, errorMsg);
  }
  return await response.json();
}

// Fetch all modules for a course
export async function getModules(courseId: string, token: string): Promise<IModule[]> {
  const url = `${BASE_URL}/teachers/courses/${courseId}/modules`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new CustomError(response.status, 'Failed to fetch modules');
  }
  return await response.json();
}

// Delete a module by id
export async function deleteModule(moduleId: string, token: string): Promise<void> {
  const url = `${BASE_URL}/teachers/modules/${moduleId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new CustomError(response.status, 'Failed to delete module');
  }
}