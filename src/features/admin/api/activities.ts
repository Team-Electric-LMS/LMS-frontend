import { CustomError } from "../../shared/classes";
import { IEvent } from "../../shared/components/ActivitiesCreateUpdate/types/events";
import { BASE_URL } from "../../shared/constants";
import { IModule } from "../types/modules";



export async function getActivities(activityId: string, token: string): Promise<IModule[]> {
  const url = `${BASE_URL}/activities/${activityId}`;
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

// Create a new activity for a module
export async function createModuleActivity(moduleId: string, moduleData: Partial<IEvent>, token: string): Promise<IEvent> {
  const url = `${BASE_URL}/activities/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({...moduleData, moduleId}),
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
export async function updateModuleActivity(moduleData: Partial<IEvent>, token: string): Promise<any> {
  const url = `${BASE_URL}/activities/`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(moduleData),
  });
  if (response.status !== 204) {
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
}