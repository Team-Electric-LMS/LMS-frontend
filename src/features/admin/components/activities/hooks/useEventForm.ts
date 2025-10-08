import { useState } from 'react';
import { IEvent } from "../types/events";

import { createModuleActivity, updateModuleActivity} from "../../../api/activities";

export function useEventForm(token: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdActivity, setCreatedActivity] = useState<IEvent | null>(null);
  const [updatedActivity, setUpdatedActivity] = useState<IEvent | null>(null);

  async function createActivity(moduleId:string, activityData: Partial<IEvent>) {
    setLoading(true);
    setError(null);
    try {
      const module = await createModuleActivity(moduleId, activityData, token);
      setCreatedActivity(module);
      return module;
    } catch (err: any) {
      setError(err.message || 'Failed to create module');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateActivity(activityData: Partial<IEvent>) {
    setLoading(true);
    setError(null);
    try {
      const module = await updateModuleActivity(activityData, token);
      setUpdatedActivity(module);
      return module;
    } catch (err: any) {
      setError(err.message || 'Failed to update module');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createActivity, updateActivity, createdActivity, updatedActivity, loading, error };
}
